import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * AI crawlers are deliberately allowed. For a local clinic, being cited in an
 * AI Overview or a ChatGPT answer for "dentist in Mirpur AJK" is a channel,
 * not a threat — there is no content here worth withholding.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next.js build internals; no crawl value.
        disallow: ["/_next/static/chunks/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
