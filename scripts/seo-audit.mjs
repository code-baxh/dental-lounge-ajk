#!/usr/bin/env node
/**
 * Local-SEO audit for The Dental Lounge, Mirpur AJK.
 *
 * Crawls the live site, extracts every SEO-critical element, and scores it
 * against a ruleset weighted for one goal: ranking for dental searches in
 * Mirpur city and the towns around it (Dadyal, Chakswari, Khari Sharif,
 * Islamgarh, Bhimber, Kotli, Dina/Jhelum).
 *
 * Zero dependencies — Node 18+ (global fetch).
 *
 *   node scripts/seo-audit.mjs
 *   node scripts/seo-audit.mjs --url http://localhost:3000 --max-pages 30
 *   node scripts/seo-audit.mjs --quiet --out seo-reports
 *
 * Scores are this script's own heuristics modelled on Google's public
 * documentation. They are not Google-internal ranking signals. Search Console
 * remains the only first-party source of truth.
 */

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const opts = {
    url: null,
    maxPages: 50,
    out: "seo-reports",
    config: join(__dirname, "seo-audit.config.json"),
    timeout: 20000,
    quiet: false,
    json: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--url") opts.url = next();
    else if (a === "--max-pages") opts.maxPages = Number(next());
    else if (a === "--out") opts.out = next();
    else if (a === "--config") opts.config = next();
    else if (a === "--timeout") opts.timeout = Number(next());
    else if (a === "--quiet") opts.quiet = true;
    else if (a === "--json") opts.json = true;
    else if (a === "--help" || a === "-h") {
      console.log(
        [
          "Usage: node scripts/seo-audit.mjs [options]",
          "",
          "  --url <url>         Site to audit (default: config.site)",
          "  --max-pages <n>     Crawl limit (default 50)",
          "  --out <dir>         Report directory (default seo-reports)",
          "  --config <file>     Geo/NAP/keyword config JSON",
          "  --timeout <ms>      Per-request timeout (default 20000)",
          "  --quiet             Suppress the console report",
          "  --json              Print the JSON report to stdout",
        ].join("\n"),
      );
      process.exit(0);
    }
  }
  return opts;
}

const OPTS = parseArgs(process.argv.slice(2));
const CFG = JSON.parse(readFileSync(OPTS.config, "utf8"));
const BASE = (OPTS.url || CFG.site).replace(/\/+$/, "");
const ORIGIN = new URL(BASE).origin;

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

const UA =
  "Mozilla/5.0 (compatible; seo-audit/1.0; +https://thedentalloungemirpur.com.pk)";

async function request(url, { method = "GET", redirect = "follow" } = {}) {
  const started = Date.now();
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), OPTS.timeout);
  try {
    const res = await fetch(url, {
      method,
      redirect,
      signal: ac.signal,
      headers: { "user-agent": UA, accept: "text/html,*/*" },
    });
    const body = method === "HEAD" ? "" : await res.text();
    return {
      ok: true,
      url,
      finalUrl: res.url || url,
      status: res.status,
      headers: Object.fromEntries(res.headers.entries()),
      body,
      bytes: Buffer.byteLength(body),
      ms: Date.now() - started,
    };
  } catch (err) {
    return {
      ok: false,
      url,
      status: 0,
      error: err.name === "AbortError" ? `timeout after ${OPTS.timeout}ms` : String(err.message || err),
      headers: {},
      body: "",
      bytes: 0,
      ms: Date.now() - started,
    };
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// HTML parsing (regex-based; adequate for server-rendered markup)
// ---------------------------------------------------------------------------

const NON_CONTENT = /<(script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/\1>/gi;

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/gi, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
}

function visibleText(html) {
  return decodeEntities(
    html
      .replace(NON_CONTENT, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? decodeEntities(m[2] ?? m[3] ?? m[4] ?? "") : null;
}

function metaContent(html, key, kind = "name") {
  const re = new RegExp(`<meta\\b[^>]*${kind}\\s*=\\s*["']${key}["'][^>]*>`, "i");
  const tag = html.match(re);
  return tag ? attr(tag[0], "content") : null;
}

function parsePage(url, res) {
  const html = res.body || "";
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: visibleText(m[2]),
  }));

  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => ({
    src: attr(m[0], "src"),
    alt: attr(m[0], "alt"),
    loading: attr(m[0], "loading"),
    width: attr(m[0], "width"),
    height: attr(m[0], "height"),
  }));

  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => ({
    href: attr(`<a ${m[1]}>`, "href"),
    text: visibleText(m[2]),
    rel: attr(`<a ${m[1]}>`, "rel"),
    target: attr(`<a ${m[1]}>`, "target"),
  }));

  const jsonLd = [];
  for (const m of html.matchAll(
    /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      // The escaping applied when embedding JSON-LD in a <script> has to be
      // undone before parsing.
      const parsed = JSON.parse(decodeEntities(m[1].trim()).replace(/\\u003c/gi, "<"));
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) {
        // Flatten @graph — the canonical way to publish cross-referenced
        // entities. Without this the wrapper object is all we see, and every
        // entity check reports "not found" against a page that has them all.
        if (node && Array.isArray(node["@graph"])) jsonLd.push(...node["@graph"]);
        else jsonLd.push(node);
      }
    } catch {
      jsonLd.push({ __parseError: true, raw: m[1].slice(0, 200) });
    }
  }

  const canonicalTag = html.match(/<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/i);
  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const htmlTag = html.match(/<html\b[^>]*>/i);

  const text = visibleText(html);

  return {
    url,
    finalUrl: res.finalUrl,
    status: res.status,
    ms: res.ms,
    bytes: res.bytes,
    headers: res.headers,
    html,
    text,
    words: text ? text.split(/\s+/).length : 0,
    lang: htmlTag ? attr(htmlTag[0], "lang") : null,
    title: titleTag ? visibleText(titleTag[1]) : null,
    description: metaContent(html, "description"),
    keywords: metaContent(html, "keywords"),
    robots: metaContent(html, "robots"),
    viewport: metaContent(html, "viewport"),
    canonical: canonicalTag ? attr(canonicalTag[0], "href") : null,
    og: {
      title: metaContent(html, "og:title", "property") || metaContent(html, "og:title"),
      description:
        metaContent(html, "og:description", "property") || metaContent(html, "og:description"),
      image: metaContent(html, "og:image", "property") || metaContent(html, "og:image"),
      url: metaContent(html, "og:url", "property") || metaContent(html, "og:url"),
      type: metaContent(html, "og:type", "property") || metaContent(html, "og:type"),
    },
    twitterCard: metaContent(html, "twitter:card"),
    headings,
    h1: headings.filter((h) => h.level === 1).map((h) => h.text),
    images,
    anchors,
    jsonLd,
    hasMapEmbed: /google\.com\/maps\/embed/i.test(html),
    hasTelLink: /href\s*=\s*["']tel:/i.test(html),
    hasWhatsApp: /wa\.me\/|api\.whatsapp\.com/i.test(html),
    hasMailto: /href\s*=\s*["']mailto:/i.test(html),
  };
}

// ---------------------------------------------------------------------------
// Crawl
// ---------------------------------------------------------------------------

function normalizeUrl(href, from) {
  try {
    const u = new URL(href, from);
    if (u.origin !== ORIGIN) return null;
    if (!/^https?:$/.test(u.protocol)) return null;
    u.hash = "";
    u.search = "";
    let p = u.pathname.replace(/\/+$/, "");
    if (p === "") p = "/";
    if (/\.(png|jpe?g|gif|svg|webp|avif|ico|pdf|css|js|xml|txt|json|webmanifest)$/i.test(p)) return null;
    u.pathname = p;
    return u.toString();
  } catch {
    return null;
  }
}

async function crawl(start, limit) {
  const queue = [start];
  const seen = new Set([start]);
  const pages = [];
  while (queue.length && pages.length < limit) {
    const url = queue.shift();
    const res = await request(url);
    if (!res.ok) {
      pages.push({ url, status: 0, fetchError: res.error, anchors: [], headings: [], images: [], jsonLd: [] });
      continue;
    }
    const page = parsePage(url, res);
    pages.push(page);
    for (const a of page.anchors) {
      if (!a.href) continue;
      const n = normalizeUrl(a.href, url);
      if (n && !seen.has(n)) {
        seen.add(n);
        queue.push(n);
      }
    }
  }
  return pages;
}

// ---------------------------------------------------------------------------
// Check harness
// ---------------------------------------------------------------------------

const CATEGORIES = {
  local: { label: "Local SEO (Mirpur & surrounding areas)", weight: 30 },
  onpage: { label: "On-page & metadata", weight: 20 },
  technical: { label: "Technical & indexability", weight: 18 },
  content: { label: "Content depth & E-E-A-T", weight: 17 },
  schema: { label: "Structured data", weight: 10 },
  geo_ai: { label: "AI search / GEO readiness", weight: 5 },
};

const results = [];

/**
 * @param status 'pass' | 'warn' | 'fail' | 'info'
 *   pass = full points, warn = half points, fail/info = zero.
 *   'info' checks carry 0 points and never affect the score.
 */
function check({ id, category, title, points, status, finding, fix = null, evidence = [], impact = null }) {
  const earned = status === "pass" ? points : status === "warn" ? points / 2 : 0;
  results.push({ id, category, title, points, earned, status, finding, fix, evidence, impact });
}

const pct = (n, d) => (d === 0 ? 0 : Math.round((n / d) * 100));
const lc = (s) => (s || "").toLowerCase();
const hasAny = (text, terms) => terms.some((t) => lc(text).includes(lc(t)));
const found = (text, terms) => terms.filter((t) => lc(text).includes(lc(t)));

function pathOf(u) {
  try {
    return new URL(u).pathname;
  } catch {
    return u;
  }
}

function pageType(url) {
  const p = pathOf(url);
  if (p === "/") return "home";
  if (/^\/about/.test(p)) return "about";
  if (/^\/contact/.test(p)) return "contact";

  // A section index (/services, /guides, /areas) is a hub, not an instance of
  // the thing it lists — judging /guides against a 1,200-word blog-post floor
  // is a category error. Only the /section/slug pages get the deeper floor.
  const isSectionIndex = /^\/(services?|guides?|blog|articles?|locations?|areas?)$/.test(p);
  if (isSectionIndex) return "hub";

  if (/^\/services?\//.test(p)) return "service";
  if (/^\/(blog|articles?|guides?)\//.test(p)) return "blog";
  if (/^\/(locations?|areas?)\//.test(p)) return "location";
  return "other";
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const log = OPTS.quiet ? () => {} : (...a) => console.error(...a);

  log(`\n  Auditing ${BASE}\n  Goal: local visibility in ${CFG.geo.primaryCity}, ${CFG.geo.regionShort} + surrounding areas\n`);

  // -- fetch site assets ----------------------------------------------------
  log("  · crawling…");
  const pages = await crawl(BASE + "/", OPTS.maxPages);
  const live = pages.filter((p) => p.status === 200);

  log(`  · ${pages.length} URLs discovered, ${live.length} returned 200`);
  log("  · fetching robots.txt, sitemap.xml, redirects…");

  const [robotsRes, sitemapRes, notFoundRes, httpRes, wwwRes] = await Promise.all([
    request(`${ORIGIN}/robots.txt`),
    request(`${ORIGIN}/sitemap.xml`),
    request(`${ORIGIN}/__seo_audit_missing_page__`),
    request(ORIGIN.replace("https://", "http://") + "/", { redirect: "manual" }),
    request(ORIGIN.replace("https://", "https://www."), { redirect: "manual" }),
  ]);

  const robots = robotsRes.status === 200 ? robotsRes.body : null;
  const sitemapUrls =
    sitemapRes.status === 200
      ? [...sitemapRes.body.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)].map((m) => m[1].trim())
      : [];

  // OG image resolution
  const ogImageUrls = [...new Set(live.map((p) => p.og.image).filter(Boolean))];
  const ogImageChecks = await Promise.all(
    ogImageUrls.map(async (u) => ({ url: u, res: await request(new URL(u, BASE).toString(), { method: "HEAD" }) })),
  );

  // Trust pages (privacy / terms)
  const trustChecks = await Promise.all(
    (CFG.trustPages || []).map(async (t) => ({ ...t, res: await request(ORIGIN + t.path, { method: "HEAD" }) })),
  );

  const allText = live.map((p) => p.text).join(" ");
  const allJsonLd = live.flatMap((p) => p.jsonLd);
  const geoAll = [...CFG.geo.cityTerms, ...CFG.geo.regionTerms];

  // =========================================================================
  // TECHNICAL & INDEXABILITY
  // =========================================================================

  check({
    id: "tech.https",
    category: "technical",
    title: "HTTP redirects to HTTPS",
    points: 3,
    status:
      httpRes.status >= 300 && httpRes.status < 400 && /^https:/.test(httpRes.headers.location || "")
        ? "pass"
        : httpRes.status === 0
          ? "warn"
          : "fail",
    finding: `http:// returned ${httpRes.status}${httpRes.headers.location ? ` → ${httpRes.headers.location}` : ""}`,
    fix: "Force a 301 from http:// to https:// at the host/CDN layer so link equity consolidates on one protocol.",
  });

  const wwwOk =
    (wwwRes.status >= 300 && wwwRes.status < 400) || wwwRes.status === 0 || wwwRes.status === 404;
  check({
    id: "tech.www",
    category: "technical",
    title: "www / non-www consolidated to one canonical host",
    points: 2,
    status: wwwRes.status === 200 ? "fail" : wwwOk ? "pass" : "warn",
    finding:
      wwwRes.status === 200
        ? "www. serves a 200 — the site is reachable on two hostnames, splitting signals."
        : `www. returned ${wwwRes.status || "no response"} (not a duplicate 200).`,
    fix: "Serve one hostname and 301 the other. Keep canonicals pointing at the chosen host.",
  });

  check({
    id: "tech.robots",
    category: "technical",
    title: "robots.txt present and permits crawling",
    points: 2,
    status: robots ? (/Disallow:\s*\/\s*$/m.test(robots) ? "fail" : "pass") : "fail",
    finding: robots
      ? `robots.txt served (${robots.length} bytes), no site-wide Disallow.`
      : `robots.txt returned ${robotsRes.status}.`,
    evidence: robots ? [robots.trim().slice(0, 400)] : [],
    fix: "Serve a robots.txt that allows crawling and declares the sitemap.",
  });

  check({
    id: "tech.robots.sitemap",
    category: "technical",
    title: "robots.txt declares the sitemap",
    points: 1,
    status: robots && /^\s*Sitemap:/im.test(robots) ? "pass" : "fail",
    finding:
      robots && /^\s*Sitemap:/im.test(robots)
        ? "Sitemap directive present."
        : "No Sitemap: directive in robots.txt.",
    fix: "Add `Sitemap: <origin>/sitemap.xml` as a standalone line.",
  });

  const sitemapLive = sitemapUrls.length;
  const crawledPaths = new Set(live.map((p) => pathOf(p.finalUrl || p.url)));
  const sitemapPaths = new Set(sitemapUrls.map(pathOf));
  const missingFromSitemap = [...crawledPaths].filter((p) => !sitemapPaths.has(p));

  check({
    id: "tech.sitemap",
    category: "technical",
    title: "XML sitemap present and complete",
    points: 3,
    status: sitemapLive === 0 ? "fail" : missingFromSitemap.length ? "warn" : "pass",
    finding: sitemapLive
      ? `${sitemapLive} URLs listed; ${missingFromSitemap.length} crawled page(s) absent.`
      : `sitemap.xml returned ${sitemapRes.status}.`,
    evidence: missingFromSitemap.map((p) => `missing from sitemap: ${p}`),
    fix: "Generate the sitemap from the route table (Next.js app/sitemap.ts) so new pages are never missed, and emit real lastmod values.",
  });

  const staticSitemap = sitemapRes.status === 200 && /lastmod>\s*\d{4}-\d{2}-\d{2}/.test(sitemapRes.body);
  const sitemapLastmods = [...sitemapRes.body.matchAll(/<lastmod>\s*([^<]+)\s*<\/lastmod>/gi)].map((m) => m[1].trim());
  const staleLastmod = sitemapLastmods.filter((d) => {
    const t = Date.parse(d);
    return Number.isFinite(t) && Date.now() - t > 1000 * 60 * 60 * 24 * 120;
  });
  check({
    id: "tech.sitemap.lastmod",
    category: "technical",
    title: "Sitemap lastmod values are current",
    points: 1,
    status: !staticSitemap ? "warn" : staleLastmod.length === sitemapLastmods.length ? "warn" : "pass",
    finding: sitemapLastmods.length
      ? `lastmod values: ${[...new Set(sitemapLastmods)].join(", ")} — ${staleLastmod.length}/${sitemapLastmods.length} older than 120 days.`
      : "No lastmod values found.",
    fix: "Derive lastmod from the build/deploy date rather than hard-coding it, or omit it entirely — a permanently stale lastmod is worse than none.",
  });

  const sitemapStatuses = await Promise.all(
    sitemapUrls.slice(0, 30).map(async (u) => ({ u, res: await request(u, { method: "HEAD" }) })),
  );
  const badSitemapUrls = sitemapStatuses.filter((s) => s.res.status !== 200);
  check({
    id: "tech.sitemap.status",
    category: "technical",
    title: "Every sitemap URL returns 200",
    points: 2,
    status: sitemapUrls.length === 0 ? "fail" : badSitemapUrls.length ? "fail" : "pass",
    finding: badSitemapUrls.length
      ? `${badSitemapUrls.length} sitemap URL(s) do not return 200.`
      : `All ${sitemapStatuses.length} checked sitemap URLs return 200.`,
    evidence: badSitemapUrls.map((s) => `${s.res.status || s.res.error} ${s.u}`),
    fix: "Remove or fix non-200 sitemap entries; they waste crawl budget and erode sitemap trust.",
  });

  check({
    id: "tech.404",
    category: "technical",
    title: "Unknown URLs return a real 404 status",
    points: 2,
    status: notFoundRes.status === 404 ? "pass" : notFoundRes.status === 200 ? "fail" : "warn",
    finding: `/__seo_audit_missing_page__ returned HTTP ${notFoundRes.status}.`,
    fix: "A soft-404 (200 on a missing page) lets Google index junk URLs. Ensure not-found renders with a 404 status.",
  });

  const noindexed = live.filter((p) => /noindex/i.test(p.robots || ""));
  check({
    id: "tech.noindex",
    category: "technical",
    title: "No unintended noindex directives",
    points: 2,
    status: noindexed.length ? "fail" : "pass",
    finding: noindexed.length ? `${noindexed.length} page(s) carry noindex.` : "No noindex directives found.",
    evidence: noindexed.map((p) => pathOf(p.url)),
    fix: "Remove noindex from pages you want ranking.",
  });

  const secHeaders = live[0]?.headers || {};
  const wantHeaders = {
    "strict-transport-security": "HSTS",
    "x-content-type-options": "MIME-sniff protection",
    "referrer-policy": "Referrer-Policy",
    "content-security-policy": "CSP",
  };
  const missingHeaders = Object.entries(wantHeaders)
    .filter(([h]) => !secHeaders[h])
    .map(([, label]) => label);
  check({
    id: "tech.headers",
    category: "technical",
    title: "Security headers present",
    points: 1,
    status: missingHeaders.length === 0 ? "pass" : missingHeaders.length <= 2 ? "warn" : "fail",
    finding: missingHeaders.length ? `Missing: ${missingHeaders.join(", ")}.` : "All checked headers present.",
    fix: "Add security headers in netlify.toml [[headers]] — a trust signal for a YMYL medical site and cheap to ship.",
  });

  const slow = live.filter((p) => p.ms > 1500);
  const heavy = live.filter((p) => p.bytes > 250_000);
  check({
    id: "tech.ttfb",
    category: "technical",
    title: "HTML response time under 1.5s",
    points: 2,
    status: slow.length === 0 ? "pass" : slow.length <= 1 ? "warn" : "fail",
    finding: `Slowest: ${Math.max(...live.map((p) => p.ms))}ms; median ${
      live.map((p) => p.ms).sort((a, b) => a - b)[Math.floor(live.length / 2)]
    }ms.`,
    evidence: slow.map((p) => `${p.ms}ms ${pathOf(p.url)}`),
    fix: "Mirpur traffic is heavily mobile on 3G/4G. Slow TTFB compounds. Check Netlify edge caching for static routes.",
  });

  check({
    id: "tech.htmlweight",
    category: "technical",
    title: "HTML document under 250KB",
    points: 1,
    status: heavy.length === 0 ? "pass" : "warn",
    finding: heavy.length
      ? `${heavy.length} page(s) ship >250KB of HTML.`
      : `Largest document ${Math.round(Math.max(...live.map((p) => p.bytes)) / 1024)}KB.`,
    evidence: heavy.map((p) => `${Math.round(p.bytes / 1024)}KB ${pathOf(p.url)}`),
    fix: "Trim inline RSC payload where possible; every KB counts on mobile data in AJK.",
  });

  const noViewport = live.filter((p) => !p.viewport);
  check({
    id: "tech.viewport",
    category: "technical",
    title: "Mobile viewport meta on every page",
    points: 2,
    status: noViewport.length ? "fail" : "pass",
    finding: noViewport.length ? `${noViewport.length} page(s) lack a viewport meta tag.` : "Viewport set on all pages.",
    evidence: noViewport.map((p) => pathOf(p.url)),
    fix: "Export `viewport` from app/layout.tsx. Without it mobile rendering breaks — and this audience is mobile-first.",
  });

  const noLang = live.filter((p) => !p.lang);
  check({
    id: "tech.lang",
    category: "technical",
    title: "html lang attribute set",
    points: 1,
    status: noLang.length ? "fail" : "pass",
    finding: noLang.length ? `${noLang.length} page(s) missing lang.` : `lang="${live[0]?.lang}" on all pages.`,
    fix: 'Consider lang="en-PK" to reinforce the Pakistan market signal.',
  });

  // =========================================================================
  // ON-PAGE & METADATA
  // =========================================================================

  const titles = live.map((p) => ({ path: pathOf(p.url), title: p.title || "" }));
  const dupTitles = titles.filter((t, i) => titles.findIndex((x) => x.title === t.title) !== i);
  const badLenTitles = titles.filter((t) => !t.title || t.title.length < 30 || t.title.length > 60);

  check({
    id: "onpage.title.present",
    category: "onpage",
    title: "Every page has a unique title",
    points: 4,
    status: titles.some((t) => !t.title) ? "fail" : dupTitles.length ? "fail" : "pass",
    finding: dupTitles.length ? `${dupTitles.length} duplicate title(s).` : "All titles unique.",
    evidence: titles.map((t) => `${t.path} → "${t.title}" (${t.title.length} chars)`),
    fix: "Duplicate titles make Google pick its own — you lose control of the SERP snippet.",
  });

  check({
    id: "onpage.title.length",
    category: "onpage",
    title: "Title length in the 30–60 char display window",
    points: 2,
    status: badLenTitles.length === 0 ? "pass" : badLenTitles.length <= live.length / 2 ? "warn" : "fail",
    finding: badLenTitles.length
      ? `${badLenTitles.length}/${titles.length} title(s) outside 30–60 chars.`
      : "All titles well-sized.",
    evidence: badLenTitles.map((t) => `${t.path} → ${t.title.length} chars: "${t.title}"`),
    fix: "Titles beyond ~60 chars truncate on mobile SERPs, cutting the geo modifier that wins the click.",
  });

  const descs = live.map((p) => ({ path: pathOf(p.url), d: p.description || "" }));
  const missingDesc = descs.filter((d) => !d.d);
  const dupDesc = descs.filter((d, i) => d.d && descs.findIndex((x) => x.d === d.d) !== i);
  const badLenDesc = descs.filter((d) => d.d && (d.d.length < 70 || d.d.length > 160));

  check({
    id: "onpage.desc",
    category: "onpage",
    title: "Every page has a unique meta description",
    points: 4,
    status: missingDesc.length ? "fail" : dupDesc.length ? "warn" : "pass",
    finding: `${missingDesc.length} missing, ${dupDesc.length} duplicated, ${badLenDesc.length} outside 70–160 chars.`,
    evidence: [
      ...missingDesc.map((d) => `MISSING: ${d.path}`),
      ...dupDesc.map((d) => `DUPLICATE: ${d.path}`),
      ...badLenDesc.map((d) => `${d.d.length} chars: ${d.path}`),
    ],
    fix: "Write a description per page with the service + Mirpur + a call to action. Descriptions are the click-through lever in a local pack-adjacent SERP.",
  });

  const h1Problems = live.filter((p) => p.h1.length !== 1);
  check({
    id: "onpage.h1",
    category: "onpage",
    title: "Exactly one H1 per page",
    points: 3,
    status: h1Problems.length === 0 ? "pass" : "fail",
    finding: `${h1Problems.length}/${live.length} page(s) do not have exactly one H1.`,
    evidence: live.map((p) => `${pathOf(p.url)} → ${p.h1.length} H1: ${JSON.stringify(p.h1)}`),
    fix: "Multiple or zero H1s blur the page's topic. One H1 that states service + city.",
  });

  const skips = [];
  for (const p of live) {
    let prev = 0;
    for (const h of p.headings) {
      if (prev && h.level > prev + 1) skips.push(`${pathOf(p.url)}: H${prev} → H${h.level} ("${h.text.slice(0, 40)}")`);
      prev = h.level;
    }
  }
  check({
    id: "onpage.hierarchy",
    category: "onpage",
    title: "Heading hierarchy has no skipped levels",
    points: 1,
    status: skips.length === 0 ? "pass" : skips.length <= 3 ? "warn" : "fail",
    finding: skips.length ? `${skips.length} skipped heading level(s).` : "Clean H1→H2→H3 flow.",
    evidence: skips,
    fix: "AI search engines and screen readers both walk the heading tree; keep it contiguous.",
  });

  const allImages = live.flatMap((p) => p.images.map((i) => ({ ...i, page: pathOf(p.url) })));
  const noAlt = allImages.filter((i) => i.alt === null || i.alt.trim() === "");
  const genericAlt = allImages.filter(
    (i) => i.alt && !hasAny(i.alt, geoAll) && i.alt.split(/\s+/).length <= 3,
  );
  check({
    id: "onpage.alt",
    category: "onpage",
    title: "Images have descriptive alt text",
    points: 3,
    status: noAlt.length ? "fail" : genericAlt.length > allImages.length / 2 ? "warn" : "pass",
    finding: `${allImages.length} images: ${noAlt.length} with no alt, ${genericAlt.length} with terse/generic alt.`,
    evidence: [
      ...noAlt.map((i) => `NO ALT: ${i.page} ${i.src}`),
      ...genericAlt.slice(0, 12).map((i) => `GENERIC: ${i.page} alt="${i.alt}"`),
    ],
    fix: 'Alt text is a free local-relevance slot: "Dental implant treatment at The Dental Lounge, Fazal Chowk Mirpur AJK" rather than "Dental Implants".',
  });

  const unsizedImages = allImages.filter((i) => !i.width || !i.height);
  check({
    id: "onpage.cls",
    category: "onpage",
    title: "Images declare width/height (CLS protection)",
    points: 1,
    status: unsizedImages.length === 0 ? "pass" : unsizedImages.length <= 3 ? "warn" : "fail",
    finding: `${unsizedImages.length}/${allImages.length} images have no intrinsic dimensions.`,
    evidence: unsizedImages.slice(0, 10).map((i) => `${i.page} ${i.src}`),
    fix: "Raw <img> without width/height causes layout shift. Use next/image, which also handles responsive srcset.",
  });

  const missingOg = ogImageChecks.filter((c) => c.res.status !== 200);
  check({
    id: "onpage.ogimage",
    category: "onpage",
    title: "Open Graph image resolves",
    points: 2,
    status: ogImageUrls.length === 0 ? "fail" : missingOg.length ? "fail" : "pass",
    finding: ogImageUrls.length
      ? missingOg.length
        ? `${missingOg.length} og:image URL(s) do not return 200.`
        : "All og:image URLs resolve."
      : "No og:image declared.",
    evidence: missingOg.map((c) => `${c.res.status || c.res.error} ${c.url}`),
    fix: "A broken OG image means every WhatsApp/Facebook share of the clinic renders as a bare grey link — the main referral channel in Mirpur.",
  });

  const internalLinkCounts = live.map((p) => ({
    path: pathOf(p.url),
    n: new Set(p.anchors.map((a) => normalizeUrl(a.href, p.url)).filter(Boolean)).size,
  }));
  check({
    id: "onpage.internallinks",
    category: "onpage",
    title: "Internal linking depth",
    points: 0,
    status: "info",
    finding: internalLinkCounts.map((c) => `${c.path}: ${c.n} unique internal links`).join("; "),
    fix: null,
  });

  // =========================================================================
  // LOCAL SEO — the weighted core
  // =========================================================================

  const cityInTitle = live.filter((p) => hasAny(p.title || "", CFG.geo.cityTerms));
  check({
    id: "local.title.city",
    category: "local",
    title: "City name in every page title",
    points: 5,
    status:
      cityInTitle.length === live.length ? "pass" : cityInTitle.length >= live.length / 2 ? "warn" : "fail",
    finding: `${cityInTitle.length}/${live.length} titles contain "${CFG.geo.primaryCity}".`,
    evidence: live
      .filter((p) => !hasAny(p.title || "", CFG.geo.cityTerms))
      .map((p) => `${pathOf(p.url)} → "${p.title}"`),
    fix: `Every indexable page should carry "${CFG.geo.primaryCity}" (and usually "${CFG.geo.regionShort}") in the title. This is the single highest-leverage change for local rankings.`,
    impact: "high",
  });

  const cityInH1 = live.filter((p) => hasAny(p.h1.join(" "), CFG.geo.cityTerms));
  check({
    id: "local.h1.city",
    category: "local",
    title: "City name in the H1",
    points: 4,
    status: cityInH1.length === live.length ? "pass" : cityInH1.length ? "warn" : "fail",
    finding: `${cityInH1.length}/${live.length} H1s mention ${CFG.geo.primaryCity}.`,
    evidence: live.map((p) => `${pathOf(p.url)} → H1: ${JSON.stringify(p.h1)}`),
    fix: `H1s like "The Dental Lounge" carry no geographic or service intent. "Dentist in Mirpur, AJK — The Dental Lounge" targets the actual query.`,
    impact: "high",
  });

  const cityInDesc = live.filter((p) => hasAny(p.description || "", CFG.geo.cityTerms));
  check({
    id: "local.desc.city",
    category: "local",
    title: "City name in every meta description",
    points: 2,
    status: cityInDesc.length === live.length ? "pass" : cityInDesc.length ? "warn" : "fail",
    finding: `${cityInDesc.length}/${live.length} descriptions mention ${CFG.geo.primaryCity}.`,
    fix: "Bolded query terms in the SERP snippet drive clicks for local intent.",
  });

  const napOnEveryPage = live.filter(
    (p) =>
      lc(p.text).includes(lc(CFG.nap.street.split(",")[0])) &&
      p.text.replace(/\D/g, "").includes(CFG.nap.phoneLocal.replace(/\D/g, "")),
  );
  check({
    id: "local.nap",
    category: "local",
    title: "Full NAP visible on every page",
    points: 3,
    status: napOnEveryPage.length === live.length ? "pass" : napOnEveryPage.length ? "warn" : "fail",
    finding: `${napOnEveryPage.length}/${live.length} pages carry the complete street + phone.`,
    evidence: live.filter((p) => !napOnEveryPage.includes(p)).map((p) => pathOf(p.url)),
    fix: "Footer NAP on every page, byte-identical to the Google Business Profile listing.",
  });

  const napHasRegion = hasAny(allText, ["Azad Jammu", "Azad Kashmir", "AJK"]);
  const napHasPostal = new RegExp(CFG.geo.postalCode).test(allText);
  check({
    id: "local.nap.complete",
    category: "local",
    title: "Address includes region and postal code",
    points: 2,
    status: napHasRegion && napHasPostal ? "pass" : napHasRegion ? "warn" : "fail",
    finding: `Region mentioned: ${napHasRegion}. Postal code ${CFG.geo.postalCode} present: ${napHasPostal}.`,
    fix: `Use the full postal form everywhere: "${CFG.nap.street}, ${CFG.nap.locality}, ${CFG.nap.region} ${CFG.geo.postalCode}, Pakistan". Incomplete addresses weaken NAP matching across citation sites.`,
  });

  const intlPhone = new RegExp(CFG.nap.phoneIntl.replace("+", "\\+?")).test(allText.replace(/[\s-]/g, ""));
  check({
    id: "local.phone.intl",
    category: "local",
    title: "Phone number in international E.164 format",
    points: 2,
    status: intlPhone ? "pass" : "fail",
    finding: intlPhone
      ? "International format present."
      : `Only the local format (${CFG.nap.phoneLocal}) appears. tel: links use the local form too.`,
    fix: `Show and link "${CFG.nap.phoneIntl}". Mirpur has a large UK-based diaspora — a 0345 number is undiallable from a British handset, and Google matches E.164 across citations.`,
    impact: "high",
  });

  check({
    id: "local.maps",
    category: "local",
    title: "Google Maps embed present",
    points: 2,
    status: live.some((p) => p.hasMapEmbed) ? "pass" : "fail",
    finding: live.some((p) => p.hasMapEmbed)
      ? `Map embedded on ${live.filter((p) => p.hasMapEmbed).map((p) => pathOf(p.url)).join(", ")}.`
      : "No Google Maps embed found.",
    fix: "Embed the map from the Business Profile listing itself so the CID matches.",
  });

  const gbpLink = /maps\.app\.goo\.gl|google\.[a-z.]+\/maps|goo\.gl\/maps/i.test(
    live.map((p) => p.html).join(" "),
  );
  check({
    id: "local.gbp.link",
    category: "local",
    title: "Link out to the Google Business Profile",
    points: 1,
    status: gbpLink ? "pass" : "fail",
    finding: gbpLink ? "Maps link found." : "No link to the GBP listing.",
    fix: 'Add a "Get directions" and a "Leave a review" link pointing at the GBP CID.',
  });

  // Nearby-area coverage — the biggest expansion lever
  const areasMentioned = found(allText, CFG.geo.nearbyAreas);
  check({
    id: "local.areas.mentioned",
    category: "local",
    title: "Surrounding towns named in content",
    points: 4,
    status:
      areasMentioned.length >= 6 ? "pass" : areasMentioned.length >= 2 ? "warn" : "fail",
    finding: areasMentioned.length
      ? `Mentions ${areasMentioned.length}/${CFG.geo.nearbyAreas.length}: ${areasMentioned.join(", ")}.`
      : `No mention of any surrounding town (${CFG.geo.nearbyAreas.slice(0, 6).join(", ")}…).`,
    fix: `Patients travel to Mirpur from ${CFG.geo.nearbyAreas.slice(0, 6).join(", ")}. If those names never appear on the site, the site cannot rank for them.`,
    impact: "high",
  });

  const locationPages = live.filter((p) => pageType(p.url) === "location");
  check({
    id: "local.areas.pages",
    category: "local",
    title: "Dedicated location pages for surrounding areas",
    points: 4,
    status: locationPages.length >= 3 ? "pass" : locationPages.length ? "warn" : "fail",
    finding: `${locationPages.length} location page(s) found.`,
    fix: `Build /areas/dadyal, /areas/chakswari, /areas/khari-sharif, /areas/bhimber, /areas/kotli — each 500+ words of genuinely local content (travel time, landmarks, why patients from there come in), not a template with the town name swapped.`,
    impact: "high",
  });

  const landmarksMentioned = found(allText, CFG.geo.landmarks);
  check({
    id: "local.landmarks",
    category: "local",
    title: "Local landmarks and sectors referenced",
    points: 2,
    status: landmarksMentioned.length >= 4 ? "pass" : landmarksMentioned.length >= 1 ? "warn" : "fail",
    finding: landmarksMentioned.length
      ? `References: ${landmarksMentioned.join(", ")}.`
      : "No local landmarks referenced.",
    fix: 'Mirpur residents navigate by chowk and sector. Copy like "two minutes from Kachehri Chowk, opposite Sardar Plaza" earns proximity relevance no generic text can.',
  });

  // Service × location matrix
  const servicePages = live.filter((p) => pageType(p.url) === "service");
  check({
    id: "local.service.pages",
    category: "local",
    title: "One indexable page per money service",
    points: 4,
    status: servicePages.length >= 6 ? "pass" : servicePages.length >= 2 ? "warn" : "fail",
    finding: `${servicePages.length} service page(s); the site advertises ${CFG.services.length} distinct treatments.`,
    evidence: servicePages.map((p) => pathOf(p.url)),
    fix: `One /services page listing ten treatments can realistically rank for one query. Split into /services/root-canal-mirpur, /services/dental-implants-mirpur, /services/braces-mirpur, … Each becomes an entry point for a separate search.`,
    impact: "high",
  });

  // Google's review-snippet policy is explicit on two points:
  //   "If the entity that's being reviewed controls the reviews about itself,
  //    their pages that use LocalBusiness or any other type of Organization
  //    structured data are ineligible for star review feature."
  //   "Don't aggregate reviews or ratings from other websites."
  // So self-declared aggregateRating on a LocalBusiness is a policy violation,
  // not a win. This check rewards a real, attributed, linked rating on the page
  // and FLAGS self-serving markup rather than asking for it.
  const selfServingRating = allJsonLd.some(
    (n) =>
      n &&
      n.aggregateRating &&
      /LocalBusiness|Organization|Dentist|MedicalBusiness/.test([].concat(n["@type"] || "").join(" ")),
  );
  const linkedGbpRating =
    /google\.com\/maps\?cid=|maps\.app\.goo\.gl|g\.page\/r\//i.test(live.map((p) => p.html).join(" ")) &&
    /\b[0-5](\.\d)?\s*(out of 5|\/\s*5|star)/i.test(allText) &&
    /\b\d+\s+(google\s+)?reviews?\b/i.test(allText);
  const hasTestimonials = /testimonial|what our patients say/i.test(allText);

  check({
    id: "local.reviews",
    category: "local",
    title: "Real rating shown, attributed and linked (not self-marked-up)",
    points: 3,
    status: selfServingRating ? "fail" : linkedGbpRating ? "pass" : hasTestimonials ? "warn" : "fail",
    finding: selfServingRating
      ? "aggregateRating is declared on the business's own LocalBusiness node — self-serving markup, ineligible for stars and a manual-action risk."
      : linkedGbpRating
        ? "Google rating displayed on-page with a review count and a link to the source listing."
        : hasTestimonials
          ? "Only unattributed on-page testimonials — no verifiable rating linked to a source."
          : "No review or rating content found.",
    fix: selfServingRating
      ? "Remove aggregateRating from your own LocalBusiness node. Display the Google rating as attributed, linked social proof instead."
      : "Show the Google Business Profile rating and review count on-page, attributed to Google and linked to the listing. Google surfaces the real rating in the local pack itself, so there is nothing to gain from marking it up — and a policy breach if you do.",
  });

  const hoursMachine = allJsonLd.some((n) => n && n.openingHoursSpecification);
  check({
    id: "local.hours",
    category: "local",
    title: "Opening hours machine-readable",
    points: 2,
    status: hoursMachine ? "pass" : /10\s*AM|10:00/i.test(allText) ? "warn" : "fail",
    finding: hoursMachine
      ? "openingHoursSpecification present."
      : `Hours shown as plain text ("${CFG.nap.hours}") with no structured equivalent.`,
    fix: "Add openingHoursSpecification with dayOfWeek arrays, plus any Friday/Jummah or Ramadan variation. Hours consistency between site and GBP is a ranking input for the local pack.",
  });

  const urduSignal = /[\u0600-\u06FF]/.test(allText);
  check({
    id: "local.language",
    category: "local",
    title: "Urdu-language signals for local searchers",
    points: 1,
    status: urduSignal ? "pass" : "warn",
    finding: urduSignal ? "Urdu script present." : "Site is English-only.",
    fix: "A share of Mirpur searches are Urdu or romanised Urdu (\"Mirpur mein dentist\", \"دانتوں کا ڈاکٹر میرپور\"). Even a bilingual services list or an Urdu FAQ block captures queries the English site cannot.",
  });

  // =========================================================================
  // CONTENT & E-E-A-T
  // =========================================================================

  const thin = live.filter((p) => p.words < (CFG.pageTypeWordFloors[pageType(p.url)] ?? 300));
  check({
    id: "content.depth",
    category: "content",
    title: "Pages meet topical-coverage floors for their type",
    points: 4,
    status: thin.length === 0 ? "pass" : thin.length <= 1 ? "warn" : "fail",
    finding: `${thin.length}/${live.length} page(s) below the coverage floor for their page type.`,
    evidence: live.map(
      (p) => `${pathOf(p.url)} (${pageType(p.url)}): ${p.words} words / floor ${CFG.pageTypeWordFloors[pageType(p.url)] ?? 300}`,
    ),
    fix: "Word count is not a ranking factor; thin coverage is. These pages do not answer what a patient actually wants to know (cost, duration, pain, aftercare, what to bring).",
  });

  const blogPages = live.filter((p) => pageType(p.url) === "blog");
  check({
    id: "content.blog",
    category: "content",
    title: "Informational content targeting research-stage queries",
    points: 3,
    status: blogPages.length >= 5 ? "pass" : blogPages.length ? "warn" : "fail",
    finding: `${blogPages.length} informational page(s).`,
    fix: 'No blog means no visibility for "root canal cost in Pakistan", "braces price Mirpur", "wisdom tooth pain remedy" — the queries patients search weeks before they search "dentist near me".',
    impact: "high",
  });

  const credentialTerms = ["BDS", "PMDC", "PM&DC", "registration no", "reg. no", "licence", "license"];
  const credentials = found(allText, credentialTerms);
  check({
    id: "content.eeat.credentials",
    category: "content",
    title: "Practitioner credentials stated (YMYL requirement)",
    points: 4,
    status: credentials.length >= 2 ? "pass" : credentials.length ? "warn" : "fail",
    finding: credentials.length
      ? `Found: ${credentials.join(", ")}.`
      : `${CFG.practitioner} is named with a training institution, but no degree, PMDC registration number, or licence detail appears anywhere.`,
    fix: "Dental care is YMYL. Publish the qualification (BDS), the PMDC registration number, years qualified, and any post-graduate training. This is the strongest single E-E-A-T lever available here.",
    impact: "high",
  });

  const authorBio = live.some((p) => /about/i.test(pathOf(p.url)) && lc(p.text).includes(lc(CFG.practitioner)));
  check({
    id: "content.eeat.who",
    category: "content",
    title: 'Google "Who" test — visible, attributable author',
    points: 2,
    status: authorBio ? "pass" : "fail",
    finding: authorBio ? "Practitioner bio present on the about page." : "No identifiable practitioner bio.",
    fix: "Bio exists but is not connected to content — no bylines, no Person schema, no link from service pages back to the practitioner.",
  });

  const trustMissing = trustChecks.filter((t) => t.res.status !== 200);
  check({
    id: "content.eeat.trust",
    category: "content",
    title: "Trust pages present (privacy, terms, medical disclaimer)",
    points: 3,
    status: trustMissing.length === 0 ? "pass" : trustMissing.length < trustChecks.length ? "warn" : "fail",
    finding: trustMissing.length
      ? `Missing: ${trustMissing.map((t) => t.label + " (" + t.path + ")").join(", ")}.`
      : "All trust pages resolve.",
    fix: "A medical site collecting appointment enquiries with no privacy policy is a trust gap for both users and quality raters — and the contact form collects personal health-adjacent data.",
    impact: "high",
  });

  const experienceSignals = found(allText, [
    "case study",
    "before and after",
    "before & after",
    "results",
    "we treated",
    "patients treated",
    "our clinic",
  ]);
  check({
    id: "content.eeat.experience",
    category: "content",
    title: "First-hand experience signals (own photos, cases, results)",
    points: 2,
    status: experienceSignals.length >= 3 ? "pass" : experienceSignals.length ? "warn" : "fail",
    finding: experienceSignals.length
      ? `Signals: ${experienceSignals.join(", ")}.`
      : "No case studies, before/after work, or clinic-specific evidence.",
    fix: "Service images look like stock. Real photos of the Mirpur clinic, the chair, the team, and consented before/after cases are Experience signals stock imagery can never provide.",
  });

  const dates = /datePublished|dateModified|Last updated|Published on/i.test(live.map((p) => p.html).join(" "));
  check({
    id: "content.freshness",
    category: "content",
    title: "Freshness signals (published / updated dates)",
    points: 1,
    status: dates ? "pass" : "fail",
    finding: dates ? "Date signals present." : "No published or updated dates anywhere.",
    fix: "Add dateModified to schema and a visible 'Last reviewed by Dr. …' line on clinical content.",
  });

  const stuffedKeywords = live.filter((p) => p.keywords);
  check({
    id: "content.metakeywords",
    category: "content",
    title: "No obsolete meta keywords tag",
    points: 1,
    status: stuffedKeywords.length ? "warn" : "pass",
    finding: stuffedKeywords.length
      ? `meta keywords present on ${stuffedKeywords.length} page(s) — ignored by Google since 2009, and a keyword-stuffing tell.`
      : "No meta keywords tag.",
    evidence: stuffedKeywords.map((p) => `${pathOf(p.url)}: ${p.keywords}`),
    fix: "Remove the keywords field from the Next.js metadata export.",
  });

  const faqPresent = /frequently asked|FAQ|how much does|how long does/i.test(allText);
  check({
    id: "content.faq",
    category: "content",
    title: "FAQ / answer-first content answering patient questions",
    points: 2,
    status: faqPresent ? "pass" : "fail",
    finding: faqPresent ? "Question-style content found." : "No FAQ or question-answering content.",
    fix: 'Patients search "how much is a root canal in Mirpur", "does scaling hurt", "braces cost Pakistan". Answer-first blocks win both featured snippets and AI citations.',
  });

  // =========================================================================
  // SCHEMA
  // =========================================================================

  const typesFound = allJsonLd.flatMap((n) => (n && n["@type"] ? [].concat(n["@type"]) : []));
  const lb = allJsonLd.find((n) => n && /LocalBusiness|Dentist|MedicalBusiness|MedicalClinic/.test([].concat(n["@type"] || "").join(" ")));

  check({
    id: "schema.present",
    category: "schema",
    title: "Structured data present and parseable",
    points: 2,
    status: allJsonLd.some((n) => n.__parseError) ? "fail" : allJsonLd.length ? "pass" : "fail",
    finding: allJsonLd.length ? `Types: ${[...new Set(typesFound)].join(", ")}.` : "No JSON-LD found.",
  });

  check({
    id: "schema.type",
    category: "schema",
    title: "Most specific business type used (Dentist, not LocalBusiness)",
    points: 2,
    status: /Dentist/.test(typesFound.join(" ")) ? "pass" : lb ? "warn" : "fail",
    finding: lb
      ? `Declared as "${[].concat(lb["@type"]).join(", ")}".`
      : "No LocalBusiness-family node.",
    fix: 'Use `"@type": ["Dentist", "MedicalBusiness"]`. Dentist is a recognised subtype and communicates the entity far more precisely than the generic LocalBusiness.',
  });

  const lbFields = {
    geo: lb?.geo,
    openingHoursSpecification: lb?.openingHoursSpecification,
    areaServed: lb?.areaServed,
    hasMap: lb?.hasMap,
    "address.addressLocality": lb?.address?.addressLocality,
    "address.addressRegion": lb?.address?.addressRegion,
    "address.postalCode": lb?.address?.postalCode,
    currenciesAccepted: lb?.currenciesAccepted,
    hasOfferCatalog: lb?.hasOfferCatalog,
    founder: lb?.founder || lb?.employee,
  };
  const missingLbFields = Object.entries(lbFields)
    .filter(([, v]) => v === undefined || v === null)
    .map(([k]) => k);

  check({
    id: "schema.localbusiness.fields",
    category: "schema",
    title: "LocalBusiness node is complete",
    points: 3,
    status: missingLbFields.length === 0 ? "pass" : missingLbFields.length <= 3 ? "warn" : "fail",
    finding: lb ? `Missing: ${missingLbFields.join(", ")}.` : "No LocalBusiness node to evaluate.",
    fix: `geo coordinates (${CFG.geo.latitude}, ${CFG.geo.longitude}), openingHoursSpecification, an areaServed array naming ${CFG.geo.nearbyAreas.slice(0, 5).join(", ")}, addressLocality/Region/postalCode, and hasOfferCatalog for the treatment list.`,
    impact: "high",
  });

  const areaServedList = []
    .concat(lb?.areaServed || [])
    .map((a) => (typeof a === "string" ? a : a?.name))
    .filter(Boolean);
  check({
    id: "schema.areaserved",
    category: "schema",
    title: "areaServed enumerates the surrounding towns",
    points: 2,
    status: areaServedList.length >= 5 ? "pass" : areaServedList.length ? "warn" : "fail",
    finding: areaServedList.length
      ? `areaServed: ${areaServedList.join(", ")}.`
      : lb?.serviceArea
        ? `Only serviceArea is set (${JSON.stringify(lb.serviceArea).slice(0, 120)}) — a single City node.`
        : "No areaServed.",
    fix: `Replace the single-city serviceArea with an areaServed array: ${CFG.geo.primaryCity} plus ${CFG.geo.nearbyAreas.slice(0, 6).join(", ")}.`,
  });

  const personSchema = allJsonLd.some((n) => /Person|Physician|Dentist/.test([].concat(n?.["@type"] || "").join(" ")) && n?.name);
  check({
    id: "schema.person",
    category: "schema",
    title: "Person / Physician schema for the practitioner",
    points: 1,
    status: personSchema ? "pass" : "fail",
    finding: personSchema ? "Practitioner entity marked up." : `${CFG.practitioner} has no Person schema.`,
    fix: "Add a Person node with name, jobTitle, alumniOf, hasCredential and worksFor → the clinic. This is how the practitioner becomes a resolvable entity in the knowledge graph.",
  });

  const breadcrumbs = allJsonLd.some((n) => /BreadcrumbList/.test([].concat(n?.["@type"] || "").join(" ")));
  check({
    id: "schema.breadcrumbs",
    category: "schema",
    title: "BreadcrumbList on inner pages",
    points: 0,
    status: breadcrumbs ? "pass" : "info",
    finding: breadcrumbs ? "Breadcrumbs present." : "No BreadcrumbList (low priority at 4 pages; required once service/location pages ship).",
  });

  // =========================================================================
  // GEO / AI SEARCH
  // =========================================================================

  const blockedAi = (CFG.aiCrawlers || []).filter((bot) => {
    if (!robots) return false;
    const block = robots.match(new RegExp(`User-agent:\\s*${bot}[\\s\\S]*?(?=User-agent:|$)`, "i"));
    return block && /Disallow:\s*\/\s*$/m.test(block[0]);
  });
  check({
    id: "geo.crawlers",
    category: "geo_ai",
    title: "AI crawlers not blocked",
    points: 2,
    status: blockedAi.length === 0 ? "pass" : "fail",
    finding: blockedAi.length ? `Blocked: ${blockedAi.join(", ")}.` : "No AI crawler is disallowed.",
    fix: "Keep GPTBot / PerplexityBot / OAI-SearchBot allowed if you want the clinic cited in AI answers.",
  });

  // Concrete figures an AI answer can lift and attribute: prices, durations,
  // distances, counts. Prose like "lasts ten years" is not counted — it has to
  // be a figure to be quotable as a fact.
  const quotable = (
    allText.match(
      /\b(?:PKR\s?[\d,]+|\d[\d,]*\+?\s?(?:years?|months?|weeks?|days?|hours?|minutes?|patients?|treatments?|km|%))\b/gi,
    ) || []
  ).length;
  check({
    id: "geo.quotable",
    category: "geo_ai",
    title: "Quotable, attributable facts for AI citation",
    points: 2,
    status: quotable >= 6 ? "pass" : quotable >= 2 ? "warn" : "fail",
    finding: `${quotable} quotable statistic-style statements found.`,
    fix: 'Statements like "200+ Happy Patients" are unattributed. Concrete, sourced facts ("Open 10am–9pm, seven days, at Fazal Chowk Mirpur") are what AI answers lift.',
  });

  check({
    id: "geo.ssr",
    category: "geo_ai",
    title: "Content server-rendered (readable without JS)",
    points: 1,
    status: live.every((p) => p.words > 150) ? "pass" : "fail",
    finding: `Word counts in raw HTML: ${live.map((p) => `${pathOf(p.url)}=${p.words}`).join(", ")}.`,
    fix: "Most AI crawlers do not execute JavaScript. Server-rendered text is a prerequisite for citation.",
  });

  // =========================================================================
  // Keyword coverage report (informational)
  // =========================================================================

  const kwCoverage = CFG.moneyKeywords.map((kw) => {
    const parts = kw.split(/\s+/).filter((w) => !["in", "near", "me"].includes(w));
    const hits = live.filter((p) => parts.every((w) => lc(p.text).includes(w)));
    return { kw, pages: hits.map((p) => pathOf(p.url)) };
  });
  const uncovered = kwCoverage.filter((k) => k.pages.length === 0);

  check({
    id: "local.keywords",
    category: "local",
    title: "Target keyword coverage",
    points: 3,
    status: uncovered.length === 0 ? "pass" : uncovered.length <= CFG.moneyKeywords.length / 3 ? "warn" : "fail",
    finding: `${CFG.moneyKeywords.length - uncovered.length}/${CFG.moneyKeywords.length} target keywords have any supporting page.`,
    evidence: kwCoverage.map((k) => `${k.pages.length ? "✓" : "✗"} ${k.kw}${k.pages.length ? ` → ${k.pages.join(", ")}` : ""}`),
    fix: "Each uncovered keyword needs a page whose title, H1 and body address it directly.",
    impact: "high",
  });

  // =========================================================================
  // Scoring
  // =========================================================================

  const byCategory = {};
  for (const [key, meta] of Object.entries(CATEGORIES)) {
    const cs = results.filter((r) => r.category === key && r.points > 0);
    const possible = cs.reduce((s, r) => s + r.points, 0);
    const earned = cs.reduce((s, r) => s + r.earned, 0);
    byCategory[key] = {
      ...meta,
      key,
      possible,
      earned: Math.round(earned * 10) / 10,
      score: pct(earned, possible),
      checks: cs.length,
      failed: cs.filter((r) => r.status === "fail").length,
      warned: cs.filter((r) => r.status === "warn").length,
    };
  }
  const overall = Math.round(
    Object.values(byCategory).reduce((s, c) => s + (c.score * c.weight) / 100, 0),
  );

  const report = {
    generatedAt: new Date().toISOString(),
    site: BASE,
    goal: `Local organic + map-pack visibility in ${CFG.geo.primaryCity}, ${CFG.geo.regionShort} and surrounding areas`,
    disclaimer:
      "Heuristic scores modelled on Google's public documentation. Not Google-internal ranking signals. Validate against Search Console.",
    crawl: {
      pagesDiscovered: pages.length,
      pagesOk: live.length,
      pages: live.map((p) => ({
        path: pathOf(p.url),
        type: pageType(p.url),
        status: p.status,
        ms: p.ms,
        kb: Math.round(p.bytes / 1024),
        words: p.words,
        title: p.title,
        titleLen: (p.title || "").length,
        description: p.description,
        descLen: (p.description || "").length,
        canonical: p.canonical,
        h1: p.h1,
        images: p.images.length,
        imagesNoAlt: p.images.filter((i) => !i.alt).length,
        jsonLdTypes: p.jsonLd.flatMap((n) => [].concat(n?.["@type"] || [])),
      })),
    },
    overall,
    categories: byCategory,
    results,
    keywordCoverage: kwCoverage,
  };

  // -- write ----------------------------------------------------------------
  const outDir = resolve(ROOT, OPTS.out);
  mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const jsonPath = join(outDir, `seo-audit-${stamp}.json`);
  const mdPath = join(outDir, `seo-audit-${stamp}.md`);
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  writeFileSync(mdPath, renderMarkdown(report));

  if (OPTS.json) console.log(JSON.stringify(report, null, 2));
  if (!OPTS.quiet) renderConsole(report, jsonPath, mdPath);

  const criticalFails = results.filter((r) => r.status === "fail" && r.impact === "high").length;
  process.exitCode = criticalFails > 0 ? 1 : 0;
}

// ---------------------------------------------------------------------------
// Reporters
// ---------------------------------------------------------------------------

const ICON = { pass: "✓", warn: "!", fail: "✗", info: "·" };

function renderConsole(r, jsonPath, mdPath) {
  const line = (s = "") => console.error(s);
  line();
  line(`  ${r.site}`);
  line(`  Overall local-SEO score: ${r.overall}/100   (${r.crawl.pagesOk} pages crawled)`);
  line();
  for (const c of Object.values(r.categories)) {
    const bar = "█".repeat(Math.round(c.score / 5)).padEnd(20, "░");
    line(`  ${bar} ${String(c.score).padStart(3)}%  ${c.label} (weight ${c.weight})`);
  }
  line();
  const fails = r.results.filter((x) => x.status === "fail").sort((a, b) => b.points - a.points);
  const warns = r.results.filter((x) => x.status === "warn").sort((a, b) => b.points - a.points);
  if (fails.length) {
    line(`  FAILING (${fails.length})`);
    for (const f of fails) line(`   ✗ [${f.category}] ${f.title} — ${f.finding}`);
    line();
  }
  if (warns.length) {
    line(`  NEEDS WORK (${warns.length})`);
    for (const w of warns) line(`   ! [${w.category}] ${w.title} — ${w.finding}`);
    line();
  }
  line(`  Reports written:`);
  line(`    ${mdPath}`);
  line(`    ${jsonPath}`);
  line();
}

function renderMarkdown(r) {
  const out = [];
  const p = (s = "") => out.push(s);

  p(`# SEO Audit — ${r.site}`);
  p();
  p(`**Generated:** ${r.generatedAt}  `);
  p(`**Goal:** ${r.goal}  `);
  p(`**Pages crawled:** ${r.crawl.pagesOk} of ${r.crawl.pagesDiscovered} discovered`);
  p();
  p(`> ${r.disclaimer}`);
  p();
  p(`## Overall score: ${r.overall}/100`);
  p();
  p(`| Category | Weight | Score | Checks | Failing | Warning |`);
  p(`|---|---:|---:|---:|---:|---:|`);
  for (const c of Object.values(r.categories)) {
    p(`| ${c.label} | ${c.weight} | **${c.score}%** | ${c.checks} | ${c.failed} | ${c.warned} |`);
  }
  p();

  const order = ["fail", "warn", "pass", "info"];
  const highImpact = r.results.filter((x) => x.impact === "high" && x.status !== "pass");
  if (highImpact.length) {
    p(`## Highest-impact gaps`);
    p();
    highImpact.forEach((x, i) => {
      p(`${i + 1}. **${x.title}** — ${x.finding}`);
      if (x.fix) p(`   > ${x.fix}`);
    });
    p();
  }

  for (const [key, meta] of Object.entries(CATEGORIES)) {
    const cs = r.results
      .filter((x) => x.category === key)
      .sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status) || b.points - a.points);
    if (!cs.length) continue;
    p(`## ${meta.label} — ${r.categories[key].score}%`);
    p();
    for (const c of cs) {
      p(`### ${ICON[c.status]} ${c.title}  \`${c.status.toUpperCase()}\`${c.points ? ` · ${c.earned}/${c.points} pts` : ""}`);
      p();
      p(c.finding);
      if (c.fix) {
        p();
        p(`**Fix:** ${c.fix}`);
      }
      if (c.evidence?.length) {
        p();
        p("<details><summary>Evidence</summary>");
        p();
        p("```");
        c.evidence.slice(0, 40).forEach((e) => p(e));
        if (c.evidence.length > 40) p(`… ${c.evidence.length - 40} more`);
        p("```");
        p();
        p("</details>");
      }
      p();
    }
  }

  p(`## Page inventory`);
  p();
  p(`| Path | Type | Words | Title (len) | Desc len | H1 | Imgs (no alt) | ms |`);
  p(`|---|---|---:|---|---:|---|---|---:|`);
  for (const pg of r.crawl.pages) {
    p(
      `| ${pg.path} | ${pg.type} | ${pg.words} | ${(pg.title || "—").slice(0, 45)} (${pg.titleLen}) | ${pg.descLen} | ${
        pg.h1.join(" / ") || "—"
      } | ${pg.images} (${pg.imagesNoAlt}) | ${pg.ms} |`,
    );
  }
  p();

  p(`## Target keyword coverage`);
  p();
  p(`| Keyword | Supporting page |`);
  p(`|---|---|`);
  for (const k of r.keywordCoverage) {
    p(`| ${k.kw} | ${k.pages.length ? k.pages.join(", ") : "**none**"} |`);
  }
  p();

  return out.join("\n");
}

main().catch((err) => {
  console.error("\n  Audit failed:", err);
  process.exit(2);
});
