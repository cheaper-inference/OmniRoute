import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

for (const theme of ["light", "dark"] as const) {
  test(`sidebar groups work with a keyboard and search in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ colorScheme: theme });
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    const settingsLoaded = page.waitForResponse(
      (response) => new URL(response.url()).pathname === "/api/settings"
    );
    await gotoDashboardRoute(page, "/home");
    await settingsLoaded;
    await expect(page.getByRole("heading", { name: "Quick Start", exact: true })).toBeVisible();
    // Kit shell: the kit <Sidebar> renders the <aside data-slot="sidebar">.
    const sidebar = page.locator('aside[data-slot="sidebar"]');
    await expect(sidebar.locator('a[aria-current="page"]')).toHaveAttribute("href", "/home");
    const section = sidebar.getByRole("button", { name: "OmniProxy", exact: true });
    if ((await section.getAttribute("aria-expanded")) === "false") await section.click();
    const group = sidebar.getByRole("button", { name: "Compression Context", exact: true });
    await expect(group).toHaveAttribute("aria-expanded", "false");
    await group.focus();
    await expect(group).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(group).toHaveAttribute("aria-expanded", "true");
    await expect(sidebar.getByRole("link", { name: "Caveman", exact: true })).toBeVisible();
    await page.keyboard.press("Space");
    await expect(group).toHaveAttribute("aria-expanded", "false");
    await sidebar.getByRole("searchbox").fill("Caveman");
    await expect(sidebar.getByRole("link", { name: "Caveman", exact: true })).toBeVisible();
    await sidebar.getByRole("searchbox").fill("");
    await expect(group).toHaveAttribute("aria-expanded", "false");
    // The shell Header owns the single collapse/expand trigger (trilha G).
    const shellHeader = page.locator("header.ci-sidebar-shell-header");
    const collapse = shellHeader.getByRole("button", { name: "Collapse sidebar", exact: true });
    await collapse.click();
    await expect(sidebar.getByRole("link", { name: "Home", exact: true })).toBeVisible();
    await shellHeader.getByRole("button", { name: "Expand sidebar", exact: true }).click();
    await expect(sidebar.getByRole("searchbox")).toBeVisible();
    await page.evaluate(() => window.history.pushState(null, "", "/dashboard/context/caveman"));
    await expect(sidebar.locator("a[aria-current=page]")).toHaveAttribute(
      "href",
      "/dashboard/context/caveman"
    );
    await expect(group).toHaveAttribute("aria-expanded", "true");
    await expect
      .poll(() => sidebar.evaluate((element) => element.scrollWidth <= element.clientWidth))
      .toBe(true);
  });

  for (const width of [320, 390]) {
    test(`mobile navigation fits ${width}px and closes in ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.emulateMedia({ colorScheme: theme });
      await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
      await gotoDashboardRoute(page, "/home");
      await page.getByRole("button", { name: "Open menu" }).click();
      // Below the breakpoint the kit <Sidebar> is a Sheet holding the same aside.
      const sidebar = page.locator('aside[data-slot="sidebar"]');
      await expect(sidebar).toBeInViewport();
      await expect
        .poll(() => sidebar.evaluate((element) => element.scrollWidth <= element.clientWidth))
        .toBe(true);
      await sidebar.getByRole("searchbox").fill("Caveman");
      await expect(sidebar.getByRole("link", { name: "Caveman", exact: true })).toBeVisible();
      await sidebar.evaluate((element) => element.setAttribute("data-navigation-a11y", ""));
      const results = await new AxeBuilder({ page })
        .include("[data-navigation-a11y]")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(results.violations).toEqual([]);
      await sidebar.getByRole("button", { name: "Close", exact: true }).click();
      await expect(sidebar).not.toBeInViewport();
    });
  }
}
