import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * axe-core sweep over one page of every template, in both themes.
 * Catches the whole WCAG 2.1 A/AA rule set, not just the things I thought to
 * look for by hand.
 */

const PAGES = [
  { name: "home", path: "/" },
  { name: "service", path: "/services/root-canal-treatment-mirpur" },
  { name: "area", path: "/areas/dadyal" },
  { name: "guide", path: "/guides/dental-treatment-cost-in-pakistan-2026" },
  { name: "contact", path: "/contact" },
  { name: "about", path: "/about" },
];

for (const scheme of ["light", "dark"] as const) {
  test.describe(`axe — ${scheme} mode`, () => {
    for (const p of PAGES) {
      test(`${p.name} has no WCAG A/AA violations`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(p.path);
        await page.waitForLoadState("networkidle");

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          // The Google Maps iframe is third-party markup we cannot fix.
          .exclude("iframe")
          .analyze();

        const summary = results.violations.map(
          (v) => `${v.id} (${v.impact}) ×${v.nodes.length}: ${v.help}\n    ${v.nodes[0]?.target}`,
        );
        expect(summary, summary.join("\n  ")).toEqual([]);
      });
    }
  });
}

test.describe("keyboard", () => {
  test("skip link is the first stop and jumps to main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveText(/skip to content/i);
    await focused.press("Enter");
    await expect(page.locator("#main")).toBeVisible();
  });

  test("card links show a visible focus indicator", async ({ page }) => {
    await page.goto("/services");
    const card = page.getByRole("link", { name: /Root Canal Treatment/i }).first();
    await card.focus();

    const outline = await card.evaluate((el) => {
      const s = getComputedStyle(el);
      return { width: s.outlineWidth, style: s.outlineStyle, color: s.outlineColor };
    });
    expect(outline.style).not.toBe("none");
    expect(parseFloat(outline.width)).toBeGreaterThanOrEqual(2);
  });
});

test.describe("motion", () => {
  test("respects prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // The hero blobs are framer-motion infinite loops; MotionConfig stops
    // those. The CSS override collapses any remaining animation to ~0s.
    //
    // Durations must be parsed, not string-matched: the browser serialises
    // the 0.01ms override as "1e-05s", which a naive !== "0.01ms" check reads
    // as a still-running animation.
    const running = await page.evaluate(() => {
      const toSeconds = (v: string) =>
        v.trim().endsWith("ms") ? parseFloat(v) / 1000 : parseFloat(v);
      const out: string[] = [];
      for (const el of document.querySelectorAll("*")) {
        const s = getComputedStyle(el);
        if (!s.animationName || s.animationName === "none") continue;
        const dur = toSeconds(s.animationDuration);
        const infinite = s.animationIterationCount === "infinite";
        if (dur > 0.05 || infinite) {
          out.push(`${s.animationName} dur=${s.animationDuration} iter=${s.animationIterationCount}`);
        }
      }
      return [...new Set(out)];
    });
    expect(running, `animations still running under reduced motion:\n  ${running.join("\n  ")}`).toEqual([]);
  });
});
