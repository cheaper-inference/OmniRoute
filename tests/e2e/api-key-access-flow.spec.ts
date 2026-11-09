import { expect, test } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";
import {
  NAVIGATION_TIMEOUT_MS,
  UI_STABILITY_TIMEOUT_MS,
  type ApiKeyRecord,
  fulfillJson,
  waitForPageToSettle,
  waitForNextDevCompileToFinish,
  openKeyAccessEditor,
  returnToKeyList,
} from "./helpers/apiKeyFlow";
test.describe("API key access flow", () => {
  test.setTimeout(600_000);
  test("renames a key through the access editor", async ({ page }) => {
    const state: {
      keys: ApiKeyRecord[];
      nextId: number;
    } = {
      keys: [],
      nextId: 1,
    };

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

    await page.route(/\/api\/keys\/[^/]+$/, async (route) => {
      if (route.request().method() === "GET") {
        const id = route.request().url().split("/").pop();
        const record = state.keys.find((key) => key.id === id);
        await fulfillJson(route, { ...record, fullKey: undefined });
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

      await fulfillJson(route, { error: "Method not allowed" }, 405);
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

      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    // --- Create a key ---
    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createDialog.locator("input").first().fill("Original Name");
    const createKeyButton = createDialog.getByRole("button", { name: /create api key/i });
    await expect(createKeyButton).toBeEnabled({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createKeyButton.click({ force: true });
    await expect.poll(() => state.keys.length).toBe(1);

    // Dismiss the "key created" dialog
    const createdDialog = page.getByRole("dialog", { name: /api key created/i });
    await createdDialog.getByRole("button", { name: /done/i }).click();

    // Wait for the key list to settle after re-fetch
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    // Verify the key appears in the list
    await expect(page.getByText("Original Name")).toBeVisible({
      timeout: UI_STABILITY_TIMEOUT_MS,
    });

    const permissionsEditor = await openKeyAccessEditor(page, "Original Name");
    const nameInput = permissionsEditor.getByPlaceholder("e.g. Production Key", { exact: true });
    await expect(nameInput).toHaveValue("Original Name");
    await nameInput.clear();
    await nameInput.fill("Renamed Key");

    // Save
    await permissionsEditor.getByRole("button", { name: /save changes/i }).click();

    // Verify the mock state was updated
    await expect.poll(() => state.keys[0]?.name).toBe("Renamed Key");

    await expect(
      page.getByRole("heading", { name: "Access & Permissions: Renamed Key", exact: true })
    ).toBeVisible();
    await returnToKeyList(page);
    await expect(page.getByText("Renamed Key")).toBeVisible();
  });

  test("saves Restrict with no allowed Combos", async ({ page }) => {
    const state = {
      key: {
        id: "key-combo-restricted",
        name: "No Combos Key",
        key: "sk-live-****combo",
        fullKey: "sk-live-combo-secret",
        allowedModels: null,
        allowedCombos: ["combo/*"],
        allowedConnections: null,
        createdAt: new Date("2026-04-05T20:00:00.000Z").toISOString(),
      } satisfies ApiKeyRecord,
      patchPayload: null as Record<string, unknown> | null,
    };

    await page.route("**/v1/models", async (route) => {
      await fulfillJson(route, { data: [] });
    });
    await page.route("**/api/settings", async (route) => {
      await fulfillJson(route, {});
    });
    await page.route("**/api/providers", async (route) => {
      await fulfillJson(route, { connections: [] });
    });
    await page.route("**/api/combos", async (route) => {
      await fulfillJson(route, {
        combos: [{ id: "combo-fast", name: "fast-chat", models: ["openai/gpt-4.1"] }],
      });
    });
    await page.route(/\/api\/usage\/call-logs(?:\?.*)?$/, async (route) => {
      await fulfillJson(route, []);
    });
    await page.route("**/api/sessions", async (route) => {
      await fulfillJson(route, { byApiKey: {} });
    });
    await page.route(/\/api\/keys\/key-combo-restricted$/, async (route) => {
      if (route.request().method() === "GET") {
        await fulfillJson(route, { ...state.key, fullKey: undefined });
        return;
      }
      if (route.request().method() !== "PATCH") {
        await fulfillJson(route, { error: "Method not allowed" }, 405);
        return;
      }
      state.patchPayload = (await route.request().postDataJSON()) as Record<string, unknown>;
      state.key.allowedCombos = state.patchPayload.allowedCombos as string[];
      await fulfillJson(route, {
        message: "API key settings updated successfully",
        ...state.patchPayload,
      });
    });
    await page.route("**/api/keys", async (route) => {
      await fulfillJson(route, {
        keys: [{ ...state.key, fullKey: undefined }],
        allowKeyReveal: true,
      });
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    const keyRow = page
      .locator("div")
      .filter({ has: page.getByText("No Combos Key", { exact: true }) })
      .first();
    await expect(keyRow.getByText("1 combos", { exact: true })).toHaveCount(0);
    const permissionsEditor = await openKeyAccessEditor(page, "No Combos Key");
    await permissionsEditor.getByRole("tab", { name: "Combos", exact: true }).click();
    await permissionsEditor.getByRole("button", { name: /restrict/i }).click();
    await expect(permissionsEditor.getByText(/restricted to 0 combos/i)).toBeVisible();
    await permissionsEditor.getByRole("button", { name: /save changes/i }).click();

    await expect.poll(() => state.patchPayload?.allowedCombos).toEqual([]);
    await returnToKeyList(page);
    await expect(page.getByRole("link", { name: /0 combos/i })).toBeVisible({
      timeout: UI_STABILITY_TIMEOUT_MS,
    });
    const reopened = await openKeyAccessEditor(page, "No Combos Key");
    await reopened.getByRole("tab", { name: "Combos", exact: true }).click();
    await expect(reopened.getByText(/restricted to 0 combos/i)).toBeVisible();
  });

  test("invalid rename stays inline in the access editor and blocks saving", async ({ page }) => {
    const state: {
      keys: ApiKeyRecord[];
      nextId: number;
    } = {
      keys: [],
      nextId: 1,
    };

    // Stub all API routes
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

    await page.route(/\/api\/keys\/[^/]+$/, async (route) => {
      if (route.request().method() === "GET") {
        const id = route.request().url().split("/").pop();
        const record = state.keys.find((key) => key.id === id);
        await fulfillJson(route, { ...record, fullKey: undefined });
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

      await fulfillJson(route, { error: "Method not allowed" }, 405);
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

      await fulfillJson(route, { error: "Method not allowed" }, 405);
    });

    await gotoDashboardRoute(page, "/dashboard/api-manager", {
      timeoutMs: NAVIGATION_TIMEOUT_MS,
    });
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);

    // Create a key first
    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createDialog.locator("input").first().fill("Original Name");
    await createDialog.getByRole("button", { name: /create api key/i }).click({ force: true });

    // Dismiss the created dialog
    const createdDialog = page.getByRole("dialog", { name: /api key created/i });
    await createdDialog.getByRole("button", { name: /done/i }).click();
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);
    await expect(page.getByText("Original Name")).toBeVisible({
      timeout: UI_STABILITY_TIMEOUT_MS,
    });

    const permissionsEditor = await openKeyAccessEditor(page, "Original Name");
    const nameInput = permissionsEditor.getByPlaceholder("e.g. Production Key", { exact: true });
    await nameInput.clear();
    await nameInput.fill("   ");
    const saveButton = permissionsEditor.getByRole("button", { name: /save changes/i });
    await expect(saveButton).toBeDisabled();
    const inlineError = permissionsEditor.locator('[id$="-error"]');
    await expect(inlineError).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    expect(state.keys[0]?.name).toBe("Original Name");

    const pageErrorBanner = page.locator('.flex.flex-col.gap-8 > [class~="bg-red-500/10"]');
    await expect(pageErrorBanner).not.toBeVisible();

    // Typing a valid name should clear the error
    await nameInput.fill("Renamed Key");
    await expect(inlineError).not.toBeVisible();

    // Save should succeed now
    await expect(saveButton).toBeEnabled();
    await saveButton.click();
    await expect.poll(() => state.keys[0]?.name).toBe("Renamed Key");
    await expect(
      page.getByRole("heading", { name: "Access & Permissions: Renamed Key", exact: true })
    ).toBeVisible();
    await returnToKeyList(page);
    await expect(page.getByText("Renamed Key")).toBeVisible();
  });
});
