import { test, expect, type Locator, type Page, type Request } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

// `/dashboard/settings` has no tab strip since the Nav Restructure: it redirects to the first
// sub-route and every settings area is its own page reached from the sidebar (owner decision P1,
// KEA-7886). Each check below runs on the sub-route that now owns the control:
//   - debug mode            → /dashboard/settings/advanced (DebugModeCard)
//   - sidebar visibility    → /dashboard/settings/sidebar  (SidebarTab, one checkbox per item)
//   - clear cache / purge   → /dashboard/settings/general  (SystemStorageTab)
test.describe("Settings Toggles", () => {
  const getDebugToggle = (page: Page) => page.getByRole("switch", { name: /enable debug mode/i });

  // Sidebar visibility rows are kit checkboxes named by the item label; every section of the
  // accordion starts expanded, so the row is reachable without opening anything.
  const getSidebarVisibilityToggle = (page: Page, itemLabel: string) =>
    page.getByRole("checkbox", { name: new RegExp(`^${itemLabel}$`, "i") });

  const waitForSettingsPatch = (page: Page) =>
    page.waitForResponse(
      (response) =>
        response.url().includes("/api/settings") &&
        response.request().method() === "PATCH" &&
        response.ok()
    );

  // The controls render (server HTML) before React hydrates them and before the client has
  // loaded /api/settings, so under a cold dev server the first click can land on a control
  // that is not wired yet. Click until the control's own state flips (the UI updates
  // optimistically, so a click that did register is never repeated), then require the PATCH.
  const clickUntilFlipped = async (
    page: Page,
    control: Locator,
    readState: () => Promise<string>
  ) => {
    const initialState = await readState();
    const patch = waitForSettingsPatch(page);
    await expect(async () => {
      if ((await readState()) === initialState) await control.click();
      expect(await readState()).not.toBe(initialState);
    }).toPass({ timeout: 60_000, intervals: [1000, 2500, 5000] });
    await patch;
    return initialState;
  };

  // Same hydration race for the storage buttons: keep clicking until the request leaves
  // (a repeated DELETE /api/cache or purge is harmless), and fail if it never does.
  const clickUntilRequest = async (
    page: Page,
    control: Locator,
    matches: (req: Request) => boolean
  ) => {
    let sent: Request | null = null;
    const request = page.waitForRequest(matches).then((req) => (sent = req));
    await expect(async () => {
      if (!sent) await control.click();
      expect(sent).not.toBeNull();
    }).toPass({ timeout: 60_000, intervals: [1000, 2500, 5000] });
    return request;
  };

  test("/dashboard/settings redirects to a settings sub-route", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings");
    await expect(page).toHaveURL(/\/dashboard\/settings\/general(?:[?#].*)?$/, {
      timeout: 15000,
    });
    await expect(page.getByRole("button", { name: /clear cache/i })).toBeVisible({
      timeout: 15000,
    });
  });

  test("Debug mode toggle should work", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings/advanced");

    const debugToggle = getDebugToggle(page);

    await expect(debugToggle).toBeVisible({ timeout: 15000 });
    await expect(debugToggle).toBeEnabled({ timeout: 60_000 });

    const initialState = await clickUntilFlipped(
      page,
      debugToggle,
      async () => (await debugToggle.getAttribute("aria-checked")) ?? ""
    );
    await expect(debugToggle).toHaveAttribute(
      "aria-checked",
      initialState === "true" ? "false" : "true",
      { timeout: 15000 }
    );
  });

  test("Sidebar visibility toggle should work", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings/sidebar");

    const sidebarToggle = getSidebarVisibilityToggle(page, "Health");

    await expect(sidebarToggle).toBeVisible({ timeout: 15000 });
    await expect(sidebarToggle).toBeEnabled({ timeout: 15000 });

    // The kit checkbox input is visually hidden (1×1 px); like a user, click its label row.
    const sidebarRow = page.locator("label").filter({ has: sidebarToggle });
    const initialState = await clickUntilFlipped(page, sidebarRow, async () =>
      String(await sidebarToggle.isChecked())
    );
    if (initialState === "true") {
      await expect(sidebarToggle).not.toBeChecked({ timeout: 15000 });
    } else {
      await expect(sidebarToggle).toBeChecked({ timeout: 15000 });
    }
  });

  test("Clear Cache button calls DELETE /api/cache", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings/general");

    const clearBtn = page.getByRole("button", { name: /clear cache/i });
    await expect(clearBtn).toBeVisible({ timeout: 15000 });

    const request = await clickUntilRequest(
      page,
      clearBtn,
      (req) => req.url().includes("/api/cache") && req.method() === "DELETE"
    );
    expect(request).toBeTruthy();
  });

  test("Purge Expired Logs button calls POST /api/settings/purge-logs", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings/general");

    const purgeBtn = page.getByRole("button", { name: /purge expired logs/i });
    await expect(purgeBtn).toBeVisible({ timeout: 15000 });

    const request = await clickUntilRequest(
      page,
      purgeBtn,
      (req) => req.url().includes("/api/settings/purge-logs") && req.method() === "POST"
    );
    expect(request).toBeTruthy();
  });

  test("Debug mode should persist after page reload", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings/advanced");

    const debugToggle = getDebugToggle(page);

    await expect(debugToggle).toBeVisible({ timeout: 15000 });
    await expect(debugToggle).toBeEnabled({ timeout: 60_000 });

    const initialState = await clickUntilFlipped(
      page,
      debugToggle,
      async () => (await debugToggle.getAttribute("aria-checked")) ?? ""
    );
    const nextState = initialState === "true" ? "false" : "true";
    await expect(debugToggle).toHaveAttribute("aria-checked", nextState, { timeout: 15000 });
    await page.reload();
    await page.waitForLoadState("domcontentloaded");

    const reloadedToggle = getDebugToggle(page);
    await expect(reloadedToggle).toBeEnabled({ timeout: 60_000 });
    await expect(reloadedToggle).toHaveAttribute("aria-checked", nextState, {
      timeout: 15000,
    });
  });
});
