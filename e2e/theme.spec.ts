import { test, expect } from "@playwright/test";

/**
 * Dark mode. The risk with this feature is not "does the class toggle" — it is
 * that a surface somewhere stays light and blinds the user, or that text loses
 * contrast against a flipped background. These tests check the rendered pixels.
 */

const relativeLuminance = (rgb: string) => {
  const [r, g, b] = (rgb.match(/\d+(\.\d+)?/g) ?? ["255", "255", "255"])
    .slice(0, 3)
    .map((v) => {
      const c = Number(v) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (fg: string, bg: string) => {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

test.describe("theme toggle", () => {
  test("defaults to the OS preference", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("toggles and persists across navigation", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /switch to dark theme/i });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Choice must survive a real page load, not just a client transition.
    await page.goto("/services");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.getByRole("button", { name: /switch to light theme/i })).toBeVisible();
  });

  test("toggle meets the 44px touch target minimum", async ({ page }) => {
    await page.goto("/");
    const box = await page.getByRole("button", { name: /switch to (dark|light) theme/i }).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  });
});

test.describe("dark mode surfaces", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
  });

  test("no surface stays light in dark mode", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);

    // The footer and CTA band are the ones at risk: they used bg-primary,
    // which inverts to cream in the dark palette.
    const surfaces = [
      { name: "body", locator: page.locator("body") },
      { name: "footer", locator: page.locator("footer") },
      { name: "header", locator: page.locator("header") },
    ];

    for (const s of surfaces) {
      const bg = await s.locator.evaluate((el) => getComputedStyle(el).backgroundColor);
      const lum = relativeLuminance(bg);
      expect(lum, `${s.name} background should be dark, got ${bg}`).toBeLessThan(0.3);
    }
  });

  test("footer text keeps AA contrast against the footer surface", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    const bg = await footer.evaluate((el) => getComputedStyle(el).backgroundColor);
    const fg = await footer
      .getByRole("link", { name: /Dental Services/i })
      .evaluate((el) => getComputedStyle(el).color);

    expect(contrast(fg, bg), `footer link ${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
  });

  test("body copy keeps AA contrast in dark mode", async ({ page }) => {
    await page.goto("/services/root-canal-treatment-mirpur");
    const para = page.locator("article p").first();
    const { fg, bg } = await para.evaluate((el) => {
      let node: HTMLElement | null = el as HTMLElement;
      let background = "rgba(0, 0, 0, 0)";
      while (node && (background === "rgba(0, 0, 0, 0)" || background === "transparent")) {
        background = getComputedStyle(node).backgroundColor;
        node = node.parentElement;
      }
      return { fg: getComputedStyle(el).color, bg: background };
    });
    expect(contrast(fg, bg), `body ${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
  });
});
