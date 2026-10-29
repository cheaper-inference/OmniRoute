import { expect, test } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

// Layout-level RTL contract of the kit shell (ar, fa, he, ur): the desktop sidebar sits on the
// inline end (the visual RIGHT), the rail sits on the edge that faces the content, and nothing
// overflows the clipped aside. Class-string tests cannot see this — the kit's physical
// `.ci-sidebar[data-side="right"] { order: 2 }` used to lay the aside out on the LEFT.
test("desktop sidebar stays on the right under dir=rtl, rail on the content edge", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await gotoDashboardRoute(page, "/home");
  const sidebar = page.locator('aside[data-slot="sidebar"]');
  await expect(sidebar).toBeVisible();

  await page.evaluate(() => {
    document.documentElement.dir = "rtl";
  });
  await expect(sidebar).toHaveAttribute("data-side", "right");

  const measure = () =>
    page.evaluate(() => {
      const aside = document.querySelector('aside[data-slot="sidebar"]') as HTMLElement;
      const main = document.querySelector("main#main-content") as HTMLElement;
      const rail = aside.querySelector('[data-slot="sidebar-rail"]') as HTMLElement;
      const a = aside.getBoundingClientRect();
      const m = main.getBoundingClientRect();
      const r = rail.getBoundingClientRect();
      return {
        viewport: document.documentElement.clientWidth,
        asideLeft: a.left,
        asideRight: a.right,
        mainRight: m.right,
        railLeft: r.left,
        railRight: r.right,
        order: getComputedStyle(aside).order,
        fits: aside.scrollWidth <= aside.clientWidth,
      };
    });
  // The kit animates width/transform on the side switch: wait for the row to settle.
  await expect
    .poll(async () => {
      const l = await measure();
      return l.order === "0" && l.mainRight <= l.asideLeft + 1;
    })
    .toBe(true);
  const layout = await measure();

  expect(layout.order).toBe("0");
  // Aside flush with the right edge of the viewport; the content to its left.
  expect(Math.abs(layout.asideRight - layout.viewport)).toBeLessThanOrEqual(1);
  expect(layout.mainRight).toBeLessThanOrEqual(layout.asideLeft + 1);
  // Rail inside the aside, on its left (content-facing) edge.
  expect(layout.railLeft).toBeGreaterThanOrEqual(layout.asideLeft - 0.5);
  expect(layout.railRight).toBeLessThanOrEqual(layout.asideLeft + 16);
  expect(layout.fits).toBe(true);
});
