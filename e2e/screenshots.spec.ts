import { test } from "@playwright/test";

/**
 * Not assertions — these produce reviewable images of both themes at both
 * viewports, so a human can eyeball what the automated checks cannot judge.
 * Output lands in screenshots/.
 */
const PAGES = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "service-detail", path: "/services/root-canal-treatment-mirpur" },
  { name: "area", path: "/areas/dadyal" },
  { name: "guide", path: "/guides/dental-treatment-cost-in-pakistan-2026" },
  { name: "contact", path: "/contact" },
];

for (const scheme of ["light", "dark"] as const) {
  for (const p of PAGES) {
    test(`shot — ${p.name} (${scheme})`, async ({ page }, testInfo) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
      await page.goto(p.path, { waitUntil: "networkidle" });
      await page.screenshot({
        path: `screenshots/${testInfo.project.name}-${p.name}-${scheme}.png`,
        fullPage: true,
      });
    });
  }
}
