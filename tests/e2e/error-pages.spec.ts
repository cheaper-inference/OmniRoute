import { expect, test } from "@playwright/test";
import { JSDOM } from "jsdom";

const errorPages = [
  {
    path: "/400",
    heading: "Bad Request",
    primaryHref: "/docs",
    secondaryHref: "/dashboard/translator",
  },
  {
    path: "/401",
    heading: "Unauthorized",
    primaryHref: "/login",
    secondaryHref: "/dashboard/api-manager",
  },
  {
    path: "/403",
    heading: "Forbidden",
    primaryHref: "/forbidden",
    secondaryHref: "/dashboard/settings?tab=security",
  },
  {
    path: "/408",
    heading: "Request Timeout",
    primaryHref: "/dashboard/endpoint",
    secondaryHref: "/status",
  },
  {
    path: "/429",
    heading: "Too Many Requests",
    primaryHref: "/dashboard/settings?tab=resilience",
    secondaryHref: "/dashboard/combos",
  },
  {
    path: "/500",
    heading: "Internal Server Error",
    primaryHref: "/dashboard/health",
    secondaryHref: "/dashboard/logs",
  },
  {
    path: "/502",
    heading: "Bad Gateway",
    primaryHref: "/dashboard/providers",
    secondaryHref: "/dashboard/translator",
  },
  {
    path: "/503",
    heading: "Service Unavailable",
    primaryHref: "/maintenance",
    secondaryHref: "/status",
  },
];

test.describe("Error and Resilience Pages", () => {
  for (const pageSpec of errorPages) {
    test(`${pageSpec.path} renders actionable recovery actions`, async ({ page }) => {
      const response = await page.goto(pageSpec.path);
      expect(response).toBeTruthy();
      const expectedHttpStatus = Number.parseInt(pageSpec.path.slice(1), 10);
      expect([200, expectedHttpStatus]).toContain(response?.status());

      await expect(page.getByRole("heading", { name: pageSpec.heading })).toBeVisible();
      await expect(page.locator(`a[href="${pageSpec.primaryHref}"]`).first()).toBeVisible();
      await expect(page.locator(`a[href="${pageSpec.secondaryHref}"]`).first()).toBeVisible();
    });
  }

  test("missing route renders not-found recovery actions", async ({ page }) => {
    await page.goto("/route-that-does-not-exist");

    await expect(page.getByRole("heading", { name: /Page not found/i })).toBeVisible();
    await expect(page.locator('a[href="/dashboard"]')).toBeVisible();
    await expect(page.locator('a[href="/status"]')).toBeVisible();
  });

  test("/offline explains connectivity and offers recovery actions", async ({ page }) => {
    const response = await page.goto("/offline");
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { name: "Connectivity Issue" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Retry Connection" })).toBeVisible();
    await expect(page.locator('a[href="/status"]')).toBeVisible();
  });

  test("/maintenance provides maintenance guidance and status action", async ({ page }) => {
    const response = await page.goto("/maintenance");
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { name: "Scheduled Maintenance" })).toBeVisible();
    await expect(page.locator('a[href="/status"]')).toBeVisible();
    await expect(page.locator('a[href="/dashboard/health"]')).toBeVisible();
  });

  test("/status shows monitoring shell and refresh control", async ({ page }) => {
    const response = await page.goto("/status");
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { name: "System Status" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Refresh" })).toBeVisible();
  });
});

// Exercise the real RSC boundary: jsdom rendering alone does not reject calls to client exports.
// Parse actual server HTML without executing scripts, so hydration cannot hide missing recovery UI.
test.describe("Server-rendered error recovery", () => {
  for (const pageSpec of errorPages) {
    test(`${pageSpec.path} serves accessible styled recovery links without JavaScript`, async ({
      request,
    }) => {
      const response = await request.get(pageSpec.path);
      expect([200, Number.parseInt(pageSpec.path.slice(1), 10)]).toContain(response.status());
      const dom = new JSDOM(await response.text());
      try {
        const main = dom.window.document.querySelector("main");
        expect(main, "server HTML must contain the recovery main landmark").not.toBeNull();
        const heading = main!.querySelector("h1");
        expect(heading?.textContent).toBe(pageSpec.heading);
        expect(heading?.id).toMatch(/\S/);
        expect(main!.getAttribute("aria-labelledby")).toBe(heading?.id);
        expect(main!.querySelector('ul[aria-label="Recommended actions"]')).not.toBeNull();

        expect(main!.querySelectorAll("a")).toHaveLength(2);
        const primary = main!.querySelector(`a[href="${pageSpec.primaryHref}"]`);
        const secondary = main!.querySelector(`a[href="${pageSpec.secondaryHref}"]`);
        for (const link of [primary, secondary]) {
          expect(link?.textContent?.trim()).toMatch(/\S/);
          expect(link?.classList.contains("ci-button--size-lg")).toBe(true);
        }
        expect(primary?.classList.contains("ci-button--default")).toBe(true);
        expect(secondary?.classList.contains("ci-button--outline")).toBe(true);
        expect(main!.querySelector("button")).toBeNull();
      } finally {
        dom.window.close();
      }
    });
  }
});
