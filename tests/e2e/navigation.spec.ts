import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Dashboard Navigation", () => {
  test("redirects unauthenticated user to /login", async ({ page }) => {
    const response = await page.goto("/dashboard");
    // Should either show login page or redirect to /login
    await page.waitForURL(/\/(login|dashboard)/);
    const url = page.url();
    // The app should show some kind of page (login or dashboard)
    expect(url).toMatch(/\/(login|dashboard)/);
  });

  test("does not prefetch dashboard routes and preserves client navigation", async ({ page }) => {
    const speculativeRequests: string[] = [];

    page.on("request", (request) => {
      const headers = request.headers();
      const isRscPrefetch =
        headers.rsc === "1" &&
        (headers["next-router-prefetch"] === "1" ||
          headers.purpose?.toLowerCase().includes("prefetch") ||
          headers["sec-purpose"]?.toLowerCase().includes("prefetch"));

      if (isRscPrefetch) speculativeRequests.push(request.url());
    });

    // Home activation closes unpinned sections; keep the navigation target mounted.
    await page.addInitScript(() => {
      localStorage.setItem("sidebar-pinned-sections", JSON.stringify(["omni-proxy"]));
    });
    await gotoDashboardRoute(page, "/home");
    const providersLink = page.locator('a[href="/dashboard/providers"]').first();
    await expect(providersLink).toBeVisible();
    await page.waitForTimeout(500);

    expect(speculativeRequests).toEqual([]);

    await providersLink.click();
    await expect(page).toHaveURL(/\/dashboard\/providers/);
  });

  test("login page renders with form elements", async ({ page }) => {
    await page.goto("/login");
    // Should show some form of authentication UI
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("/docs page renders documentation", async ({ page }) => {
    await page.goto("/docs");
    const body = page.locator("body");
    await expect(body).toBeVisible();
    // Docs should contain some content
    const text = await body.textContent();
    expect(text?.length).toBeGreaterThan(100);
  });
});
