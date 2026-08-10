import { test, expect } from "@playwright/test";

/**
 * Layout and conversion-path checks on real viewports. These are the failures
 * that never show up in source review: overflow, sticky-header occlusion, and
 * tap targets that measure fine in isolation but collide once rendered.
 */

const PAGES = [
  "/",
  "/services",
  "/services/root-canal-treatment-mirpur",
  "/areas",
  "/areas/dadyal",
  "/guides",
  "/guides/dental-treatment-cost-in-pakistan-2026",
  "/contact",
  "/about",
];

for (const path of PAGES) {
  test(`${path} — no horizontal overflow`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;

      // The symptom that actually matters is a scrollable document. Bounding
      // boxes alone give false positives: the decorative blur blobs are wider
      // than the viewport by design and are clipped by an ancestor's
      // overflow-hidden, so they never produce a scrollbar.
      const isClipped = (el: HTMLElement) => {
        let n: HTMLElement | null = el.parentElement;
        while (n) {
          const o = getComputedStyle(n).overflowX;
          if (o === "hidden" || o === "clip" || o === "auto" || o === "scroll") return true;
          n = n.parentElement;
        }
        return false;
      };

      const offenders: string[] = [];
      for (const el of document.querySelectorAll<HTMLElement>("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > docWidth + 1 && !isClipped(el)) {
          const cls = typeof el.className === "string" ? el.className.slice(0, 60) : "";
          offenders.push(`${el.tagName.toLowerCase()}.${cls} → right ${Math.round(r.right)} > ${docWidth}`);
        }
      }
      return { scrollW: document.documentElement.scrollWidth, docWidth, offenders: offenders.slice(0, 5) };
    });

    // Primary assertion: the page must not scroll sideways.
    expect(
      overflow.scrollW,
      `document scrolls horizontally. Unclipped offenders:\n  ${overflow.offenders.join("\n  ")}`,
    ).toBeLessThanOrEqual(overflow.docWidth + 1);
    expect(overflow.offenders, overflow.offenders.join("\n  ")).toEqual([]);
  });
}

test("sticky header does not cover the H1", async ({ page }) => {
  await page.goto("/services/root-canal-treatment-mirpur");
  const header = await page.locator("header").boundingBox();
  const h1 = await page.locator("h1").boundingBox();
  expect(h1!.y).toBeGreaterThanOrEqual(header!.y + header!.height - 1);
});

/**
 * The fixed header is cleared once, by `body { padding-top: 80px }`. Anything
 * that clears it a second time stacks dead whitespace under it — which is
 * exactly what Breadcrumbs' `pt-28` used to do, for 111px of empty band on
 * every page but the homepage. The occlusion test above passed throughout,
 * because too much clearance is not occlusion. This bounds the other side.
 */
for (const path of ["/about", "/services", "/services/root-canal-treatment-mirpur", "/areas/dadyal", "/guides/dental-treatment-cost-in-pakistan-2026", "/contact"]) {
  test(`${path} — content starts directly below the header, no dead band`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const gap = await page.evaluate(() => {
      const header = document.querySelector("header")!;
      const main = document.querySelector("main#main")!;

      // Measure the first *painted text*, not the first element box. The
      // breadcrumb nav's box starts at the body padding edge, so its own top
      // is ~0 no matter how much padding sits inside it — measuring the box
      // would report a healthy gap even with 112px of padding in there.
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (!node.textContent?.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        const rect = range.getBoundingClientRect();
        if (rect.height > 0) {
          return Math.round(rect.top - header.getBoundingClientRect().bottom);
        }
      }
      throw new Error("no painted text found in <main>");
    });

    expect(gap, `first content sits ${gap}px below the header`).toBeGreaterThanOrEqual(0);
    expect(gap, `${gap}px of empty space under the fixed header — likely a duplicated header offset`).toBeLessThanOrEqual(64);
  });
}

/**
 * The homepage LCP element is the hero subheading. It used to be a framer-motion
 * entrance starting at opacity 0, so it stayed invisible until the client bundle
 * hydrated — LCP 3.2s against FCP 0.8s on throttled mobile, for text that was
 * already in the server HTML.
 *
 * Rendering with JS disabled is the sharpest form of the invariant: if the hero
 * text is opaque and positioned without a single line of JavaScript running,
 * nothing can gate it behind hydration.
 */
test("hero text renders without JavaScript — LCP is not gated on hydration", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: testInfo.project.use.baseURL,
    viewport: testInfo.project.use.viewport,
  });
  const page = await context.newPage();
  await page.goto("/");

  for (const locator of [page.locator("h1"), page.getByText(/A modern dental clinic at Sardar Plaza/)]) {
    const el = locator.first();
    await expect(el).toBeVisible();

    const { opacity, visibility } = await el.evaluate((n) => {
      const s = getComputedStyle(n as HTMLElement);
      return { opacity: Number(s.opacity), visibility: s.visibility };
    });
    expect(opacity, "above-the-fold text must not start transparent").toBe(1);
    expect(visibility).toBe("visible");

    // And it must be inside the viewport, not translated off-screen.
    const box = (await el.boundingBox())!;
    expect(box.y).toBeGreaterThan(0);
  }

  await context.close();
});

test("primary conversion paths are present and correctly formed", async ({ page }) => {
  await page.goto("/");

  // E.164 everywhere — a 0345 number is undiallable from a UK handset.
  const telHrefs = await page.locator('a[href^="tel:"]').evaluateAll((els) =>
    els.map((e) => e.getAttribute("href")),
  );
  expect(telHrefs.length).toBeGreaterThan(0);
  for (const h of telHrefs) expect(h).toBe("tel:+923453081698");

  const waHrefs = await page.locator('a[href*="wa.me"]').evaluateAll((els) =>
    els.map((e) => e.getAttribute("href")),
  );
  expect(waHrefs.length).toBeGreaterThan(0);

  // Google rating must link to the real listing, with no session tokens.
  const review = page.locator('a[href*="cid=6305457667354308914"]').first();
  await expect(review).toHaveCount(1);
  const html = await page.content();
  for (const token of ["rlz=", "sxsrf=", "sca_esv=", "sei="]) {
    expect(html, `leaked session param ${token}`).not.toContain(token);
  }
});

test("mobile: tappable controls in the header meet 44px", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile viewport only");
  await page.goto("/");

  const controls = page.locator("header a, header button");
  const n = await controls.count();
  const small: string[] = [];
  for (let i = 0; i < n; i++) {
    const el = controls.nth(i);
    if (!(await el.isVisible())) continue;
    const box = await el.boundingBox();
    if (!box) continue;
    if (box.height < 44 || box.width < 24) {
      small.push(`${(await el.textContent())?.trim().slice(0, 24) || (await el.getAttribute("aria-label"))} → ${Math.round(box.width)}×${Math.round(box.height)}`);
    }
  }
  expect(small, small.join("\n  ")).toEqual([]);
});

test("contact form fields are labelled and use the right mobile keyboards", async ({ page }) => {
  await page.goto("/contact");

  const name = page.getByLabel(/name/i).first();
  const phone = page.getByLabel(/phone/i).first();
  await expect(name).toBeVisible();
  await expect(phone).toBeVisible();

  // Correct keyboard on mobile is a real conversion factor.
  await expect(phone).toHaveAttribute("type", "tel");
  const email = page.getByLabel(/email/i).first();
  if (await email.count()) await expect(email).toHaveAttribute("type", "email");
});
