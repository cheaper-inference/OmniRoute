import { expect, test, type Page } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";
import {
  NAVIGATION_TIMEOUT_MS,
  UI_STABILITY_TIMEOUT_MS,
  type ApiKeyRecord,
  fulfillJson,
  waitForPageToSettle,
  waitForNextDevCompileToFinish,
} from "./helpers/apiKeyFlow";
async function installClipboardMock(page: Page) {
  await page.addInitScript(() => {
    let clipboardValue = "";
    Object.defineProperty(window, "__clipboardValue", {
      configurable: true,
      get: () => clipboardValue,
      set: (value) => {
        clipboardValue = typeof value === "string" ? value : String(value ?? "");
      },
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          (window as Window & { __clipboardValue?: string }).__clipboardValue = value;
        },
        readText: async () => clipboardValue,
      },
    });
  });
}
async function readClipboard(page: Page) {
  return page.evaluate(() => (window as Window & { __clipboardValue?: string }).__clipboardValue);
}
test.describe("API keys flow", () => {
  test.setTimeout(600_000);
  test("creates, copies, reveals, revokes, and returns to the empty state", async ({ page }) => {
    const state: {
      keys: ApiKeyRecord[];
      nextId: number;
      revealCalls: number;
      deleteCalls: number;
    } = {
      keys: [],
      nextId: 1,
      revealCalls: 0,
      deleteCalls: 0,
    };

    await installClipboardMock(page);

    await page.route("**/v1/models", async (route) => {
      await fulfillJson(route, { data: [] });
    });

    await page.route("**/api/settings", async (route) => {
      await fulfillJson(route, {});
    });

    await page.route("**/api/providers", async (route) => {
      await fulfillJson(route, {
        connections: [
          { id: "conn-openai", name: "OpenAI Main", provider: "openai", isActive: true },
        ],
      });
    });

    await page.route(/\/api\/usage\/call-logs(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, []);
    });

    await page.route("**/api/sessions", async (route) => {
      await fulfillJson(route, { byApiKey: {} });
    });

    await page.route(/\/api\/keys\/[^/]+\/reveal$/, async (route) => {
      state.revealCalls += 1;
      const keyId = route.request().url().split("/").slice(-2)[0];
      const record = state.keys.find((key) => key.id === keyId);
      await fulfillJson(route, { key: record?.fullKey ?? "" });
    });

    await page.route(/\/api\/keys\/[^/]+$/, async (route) => {
      if (route.request().method() === "DELETE") {
        state.deleteCalls += 1;
        const keyId = route.request().url().split("/").pop() || "";
        state.keys = state.keys.filter((key) => key.id !== keyId);
        await fulfillJson(route, { success: true });
        return;
      }

      if (route.request().method() === "PATCH") {
        const keyId = route.request().url().split("/").pop() || "";
        const payload = (await route.request().postDataJSON()) as { name?: string };
        const record = state.keys.find((key) => key.id === keyId);
        if (!record) {
          await fulfillJson(route, { error: "Key not found" }, 404);
          return;
        }
        if (payload.name) {
          record.name = payload.name;
        }
        await fulfillJson(route, { message: "API key settings updated successfully", ...payload });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed in api key detail stub" }, 405);
    });

    await page.route("**/api/keys", async (route) => {
      const method = route.request().method();

      if (method === "GET") {
        await fulfillJson(route, {
          keys: state.keys.map(({ fullKey, ...record }) => record),
          allowKeyReveal: true,
        });
        return;
      }

      if (method === "POST") {
        const payload = (route.request().postDataJSON() as { name?: string }) || {};
        const id = `key-${state.nextId++}`;
        const suffix = String(1000 + state.nextId);
        const fullKey = `sk-live-${suffix}-demo-secret`;
        const maskedKey = `sk-live-****${suffix}`;
        state.keys.push({
          id,
          name: payload.name || "New Key",
          key: maskedKey,
          fullKey,
          allowedModels: null,
          allowedCombos: ["combo/*"],
          allowedConnections: null,
          createdAt: new Date("2026-04-05T20:00:00.000Z").toISOString(),
        });

        await fulfillJson(route, { key: fullKey, id });
        return;
      }

      await fulfillJson(route, { error: "Method not allowed in api keys stub" }, 405);
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createDialog.locator("input").first().fill("Team Key");
    const createKeyButton = createDialog.getByRole("button", { name: /create api key/i });
    await expect(createKeyButton).toBeEnabled({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createKeyButton.click({ force: true });
    await expect.poll(() => state.keys.length).toBe(1);

    const createdDialog = page.getByRole("dialog", { name: /api key created/i });
    const createdKeyInput = createdDialog.locator("input[readonly]").first();
    await expect(createdKeyInput).toHaveValue(/sk-live-/);
    await createdDialog.getByRole("button", { name: /copy/i }).click();

    await expect.poll(() => readClipboard(page)).toBeTruthy();
    const createdClipboardValue = await readClipboard(page);
    await expect(createdKeyInput).toHaveValue(createdClipboardValue || "");

    await createdDialog.getByRole("button", { name: /done/i }).click();

    await expect(page.getByText("Team Key")).toBeVisible();
    await expect(page.getByText("sk-live-****1002")).toBeVisible();

    const keyRow = page
      .locator("div")
      .filter({ has: page.getByText("Team Key", { exact: true }) })
      .filter({ has: page.getByText("sk-live-****1002", { exact: true }) })
      .first();

    await keyRow.getByRole("button", { name: /copy/i }).click();
    await expect.poll(() => state.revealCalls).toBe(1);
    await expect.poll(() => readClipboard(page)).toBe("sk-live-1002-demo-secret");

    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await keyRow.locator("button[title]").last().click({ force: true });

    await expect.poll(() => state.deleteCalls).toBe(1);
    await expect(page.getByText("Team Key")).toHaveCount(0);
    await expect(createFirstKeyButton).toBeVisible();
  });

  test("validation error appears inside the create key modal, not behind the backdrop", async ({
    page,
  }) => {
    const state = {
      keys: [] as ApiKeyRecord[],
      nextId: 1,
    };

    // Stub all API routes
    await page.route("**/v1/models", async (route) => {
      await fulfillJson(route, { data: [] });
    });
    await page.route("**/api/connections", async (route) => {
      await fulfillJson(route, {
        connections: [
          { id: "conn-openai", name: "OpenAI Main", provider: "openai", isActive: true },
        ],
      });
    });
    await page.route(/\/api\/usage\/call-logs(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, []);
    });
    await page.route("**/api/sessions", async (route) => {
      await fulfillJson(route, { byApiKey: {} });
    });
    await page.route("**/api/keys", async (route) => {
      const method = route.request().method();
      if (method === "GET") {
        await fulfillJson(route, {
          keys: state.keys.map(({ fullKey, ...record }) => record),
          allowKeyReveal: true,
        });
        return;
      }
      if (method === "POST") {
        const payload = (route.request().postDataJSON() as { name?: string }) || {};
        const id = `key-${state.nextId++}`;
        const suffix = String(1000 + state.nextId);
        const fullKey = `sk-live-${suffix}-demo-secret`;
        const maskedKey = `sk-live-****${suffix}`;
        state.keys.push({
          id,
          name: payload.name || "New Key",
          key: maskedKey,
          fullKey,
          allowedModels: null,
          allowedCombos: ["combo/*"],
          allowedConnections: null,
          createdAt: new Date().toISOString(),
        });
        await fulfillJson(route, { key: fullKey, id });
        return;
      }
      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });
    await page.route(/\/api\/keys\/[^/]+$/, async (route) => {
      await fulfillJson(route, { error: "Not found" }, 404);
    });
    await page.route(/\/api\/keys\/[^/]+\/reveal$/, async (route) => {
      await fulfillJson(route, { key: "" });
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    // Open the create key modal
    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // Fill an invalid name (special characters) and submit
    const nameInput = createDialog.locator("input").first();
    await nameInput.fill("bad@name!");
    const createKeyButton = createDialog.getByRole("button", { name: /create api key/i });
    await createKeyButton.click({ force: true });

    // The validation error must appear as an inline role="alert" message INSIDE the modal
    // (KEA-7886: the Input adapter renders it in the kit Field message slot).
    const inlineError = createDialog.locator("[data-slot='field'] [role='alert']");
    await expect(inlineError).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });

    // The error must be visible — i.e. not obscured by the backdrop.
    // A covered element has box visibility but fails the check below because
    // pointer events and paint are blocked by the overlay div.
    await expect(inlineError).toBeInViewport();

    // No page-level error banner should appear behind the modal
    // KEA-7886: the page-level banner is the kit Alert (critical variant).
    const pageErrorBanner = page.locator('.flex.flex-col.gap-8 > [data-slot="alert"]');
    await expect(pageErrorBanner).not.toBeVisible();

    // Typing should clear the error
    await nameInput.fill("valid-name");
    await expect(inlineError).not.toBeVisible();

    // A valid name should succeed without errors
    await createKeyButton.click({ force: true });
    await expect.poll(() => state.keys.length).toBe(1);
  });
});
