import { expect, type Page, type Route } from "@playwright/test";

export const NAVIGATION_TIMEOUT_MS = 300_000;

export const UI_STABILITY_TIMEOUT_MS = 120_000;

export async function openKeyAccessEditor(page: Page, keyName: string) {
  await page.getByTitle("Edit permissions", { exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard\/api-manager\/[^/]+\/access/);
  await expect(
    page.getByRole("heading", { name: `Access & Permissions: ${keyName}`, exact: true })
  ).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
  return page.getByRole("main");
}

export async function returnToKeyList(page: Page) {
  await expect(page.locator('fieldset[aria-busy="false"]')).toBeVisible();
  await page
    .getByRole("main")
    .getByRole("link", { name: "API Key Management", exact: true })
    .click();
  await expect(page).toHaveURL(/\/dashboard\/api-manager$/);
}

export type ApiKeyRecord = {
  id: string;
  name: string;
  key: string;
  fullKey: string;
  allowedModels: string[] | null;
  allowedCombos: string[] | null;
  allowedConnections: string[] | null;
  /** Public shape: "all" | "restricted". Absent on legacy keys. */
  modelAccessMode?: "all" | "restricted" | null;
  createdAt: string;
};

export async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

export async function waitForPageToSettle(page: Page) {
  try {
    await page.waitForLoadState("networkidle", { timeout: 15_000 });
  } catch {
    // Some dashboard pages keep background requests alive; visibility assertions below
    // are the authoritative readiness check for these E2E flows.
  }
}

export async function waitForNextDevCompileToFinish(page: Page) {
  const nextDevToolsButton = page.getByRole("button", { name: /open next\.js dev tools/i });
  if ((await nextDevToolsButton.count()) === 0) return;
  await expect(nextDevToolsButton).not.toContainText(/compiling/i, { timeout: 120_000 });
}
