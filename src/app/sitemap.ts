import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { AREAS } from "@/lib/areas";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

/**
 * Generated from the route data rather than hand-maintained, so a new service
 * or area page can never be left out of the sitemap. lastmod comes from build
 * time — a real signal, unlike the hard-coded date the static sitemap.xml
 * carried, which had been stale since March.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/areas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const areaRoutes: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${SITE_URL}/areas/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Guides carry their own dateModified, which is a real content date rather
  // than the build timestamp — so they keep it.
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(g.dateModified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...[...staticRoutes, ...serviceRoutes, ...areaRoutes].map((r) => ({
      ...r,
      lastModified: now,
    })),
    ...guideRoutes,
  ];
}
