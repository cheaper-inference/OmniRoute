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
test.describe("API key model scope", () => {
  test.setTimeout(600_000);
  test("Restrict mode provider scope: selects ollama-cloud/* dynamically plus exact OpenAI model", async ({
    page,
  }) => {
    // R4 acceptance: selecting the Ollama Cloud provider must PATCH canonical
    // ollama-cloud/* (not alias-prefixed snapshot IDs), with modelAccessMode restricted;
    // reopening restores the provider checkbox and leaves children non-toggleable.
    const state: {
      keys: ApiKeyRecord[];
      nextId: number;
      patchPayloads: Array<Record<string, unknown>>;
    } = {
      keys: [],
      nextId: 1,
      patchPayloads: [],
    };

    const catalogModels = [
      {
        id: "ollamacloud/llama3",
        owned_by: "ollama-cloud",
        name: "llama3",
      },
      {
        id: "ollamacloud/qwen",
        owned_by: "ollama-cloud",
        name: "qwen",
      },
      {
        id: "openai/gpt-4.1",
        owned_by: "openai",
        name: "gpt-4.1",
      },
    ];

    // Override catalog fetches in-page. page.route alone can miss the early client
    // catalog load against a reused Playwright server; this keeps the fixture deterministic.
    // Note: init-script body is browser-serialized — keep it plain JS (no TS types).
    await page.addInitScript((models) => {
      const originalFetch = window.fetch.bind(window);
      window.fetch = async (input, init) => {
        const raw =
          typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        const path = String(raw).replace(/^https?:\/\/[^/]+/, "");

        if (path.startsWith("/v1/models")) {
          return new Response(JSON.stringify({ data: models }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (path.startsWith("/api/models")) {
          return new Response(
            JSON.stringify({
              models: models.map((m) => ({
                provider: m.owned_by,
                model: m.id.split("/").slice(1).join("/"),
                fullModel: m.id,
                alias: m.name,
              })),
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        if (path.startsWith("/api/combos")) {
          return new Response(JSON.stringify({ combos: [] }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        return originalFetch(input, init);
      };
    }, catalogModels);

    // Defense in depth: also stub network for non-init-script navigations.
    await page.route(/\/v1\/models(?:\?|$)/, async (route) => {
      await fulfillJson(route, { data: catalogModels });
    });
    await page.route(/\/api\/models(?:\?|$)/, async (route) => {
      await fulfillJson(route, {
        models: catalogModels.map((m) => ({
          provider: m.owned_by,
          model: m.id.split("/").slice(1).join("/"),
          fullModel: m.id,
          alias: m.name,
        })),
      });
    });
    await page.route(/\/api\/combos(?:\?|$)/, async (route) => {
      await fulfillJson(route, { combos: [] });
    });

    await page.route("**/api/settings", async (route) => {
      await fulfillJson(route, {});
    });

    await page.route("**/api/providers", async (route) => {
      await fulfillJson(route, {
        connections: [
          {
            id: "conn-ollama-cloud",
            name: "Ollama Cloud",
            provider: "ollama-cloud",
            isActive: true,
          },
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
        const payload = (await route.request().postDataJSON()) as {
          name?: string;
          allowedModels?: string[];
          modelAccessMode?: "all" | "restricted";
        };
        state.patchPayloads.push(payload);
        const record = state.keys.find((key) => key.id === keyId);
        if (!record) {
          await fulfillJson(route, { error: "Key not found" }, 404);
          return;
        }
        if (payload.name) record.name = payload.name;
        if (Array.isArray(payload.allowedModels)) {
          record.allowedModels = payload.allowedModels;
        }
        if (payload.modelAccessMode === "all" || payload.modelAccessMode === "restricted") {
          record.modelAccessMode = payload.modelAccessMode;
        }
        await fulfillJson(route, {
          message: "API key settings updated successfully",
          ...payload,
        });
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
          modelAccessMode: null,
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

    const createFirstKeyButton = page.getByRole("button", {
      name: /create (your )?first key/i,
    });
    await expect(createFirstKeyButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createFirstKeyButton.click();

    const createDialog = page.getByRole("dialog", { name: /create api key/i });
    await expect(createDialog).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await createDialog.locator("input").first().fill("Provider Scope Key");
    await createDialog.getByRole("button", { name: /create api key/i }).click({ force: true });

    const createdDialog = page.getByRole("dialog", { name: /api key created/i });
    await createdDialog.getByRole("button", { name: /done/i }).click();
    await waitForPageToSettle(page);
    await waitForNextDevCompileToFinish(page);
    await expect(page.getByText("Provider Scope Key")).toBeVisible({
      timeout: UI_STABILITY_TIMEOUT_MS,
    });

    const permissionsEditor = await openKeyAccessEditor(page, "Provider Scope Key");
    await permissionsEditor.getByRole("tab", { name: "Models", exact: true }).click();

    // Enter Restrict mode via the primary Access Mode toggle (accessible name includes the lock icon text).
    const accessModeRestrict = permissionsEditor.getByRole("button", {
      name: /^lock\s+restrict$/i,
    });
    await expect(accessModeRestrict).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await accessModeRestrict.click();

    // Wait for the mocked catalog to render (search box appears only in Restrict mode).
    const modelSearch = permissionsEditor.getByPlaceholder(/search models/i);
    await expect(modelSearch).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await expect(permissionsEditor.getByText(/ollama[- ]?cloud/i).first()).toBeVisible({
      timeout: UI_STABILITY_TIMEOUT_MS,
    });

    const ollamaProviderCheckbox = permissionsEditor.getByRole("checkbox", {
      name: /ollama[- ]?cloud/i,
    });
    await expect(ollamaProviderCheckbox).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await ollamaProviderCheckbox.check();

    // Exact OpenAI model selection coexists with the provider scope.
    await modelSearch.fill("openai/gpt-4.1");
    const openaiModelButton = permissionsEditor.getByRole("button", {
      name: "openai/gpt-4.1",
    });
    await expect(openaiModelButton).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
    await openaiModelButton.click();
    await modelSearch.fill("");

    const saveButton = permissionsEditor.getByRole("button", { name: /save changes/i });
    await saveButton.click();

    await expect.poll(() => state.patchPayloads.length).toBeGreaterThan(0);
    const patch = state.patchPayloads[state.patchPayloads.length - 1]!;
    const allowedModels = Array.isArray(patch.allowedModels)
      ? (patch.allowedModels as string[])
      : [];

    expect(patch.modelAccessMode).toBe("restricted");
    expect(allowedModels).toEqual(expect.arrayContaining(["ollama-cloud/*", "openai/gpt-4.1"]));
    expect(allowedModels).toContain("ollama-cloud/*");
    expect(allowedModels).toContain("openai/gpt-4.1");
    // Must not snapshot current Ollama catalog IDs (including alias-prefixed ones).
    expect(allowedModels).not.toContain("ollamacloud/llama3");
    expect(allowedModels).not.toContain("ollamacloud/qwen");
    expect(allowedModels).not.toContain("ollama-cloud/llama3");
    expect(allowedModels).not.toContain("ollama-cloud/qwen");

    await returnToKeyList(page);
    const reopened = await openKeyAccessEditor(page, "Provider Scope Key");
    await reopened.getByRole("tab", { name: "Models", exact: true }).click();

    // Restrict mode should remain selected after reopen.
    await expect(reopened.getByRole("button", { name: /^lock\s+restrict$/i })).toHaveClass(
      /bg-primary/
    );

    const reopenedProviderCheckbox = reopened.getByRole("checkbox", {
      name: /ollama[- ]?cloud/i,
    });
    await expect(reopenedProviderCheckbox).toBeChecked();

    // Child models under the provider scope are inherited and not individually toggleable.
    for (const childId of ["ollamacloud/llama3", "ollamacloud/qwen"]) {
      const child = reopened.getByRole("button", { name: childId });
      await expect(child).toBeVisible({ timeout: UI_STABILITY_TIMEOUT_MS });
      await expect(child).toBeDisabled();
    }

    // Exact OpenAI selection remains individually selected/toggleable.
    const reopenedOpenAiModel = reopened.getByRole("button", { name: "openai/gpt-4.1" });
    await expect(reopenedOpenAiModel).toBeEnabled();

    // Explicit Restrict with no provider/model selections is a persistent deny-all state.
    await reopenedProviderCheckbox.uncheck();
    await reopenedOpenAiModel.click();
    await reopened.getByRole("button", { name: /save changes/i }).click();
    await expect.poll(() => state.patchPayloads.length).toBeGreaterThan(1);
    const denyAllPatch = state.patchPayloads[state.patchPayloads.length - 1]!;
    expect(denyAllPatch.modelAccessMode).toBe("restricted");
    expect(denyAllPatch.allowedModels).toEqual([]);

    await returnToKeyList(page);
    const denyAllReopened = await openKeyAccessEditor(page, "Provider Scope Key");
    await denyAllReopened.getByRole("tab", { name: "Models", exact: true }).click();
    await expect(denyAllReopened.getByRole("button", { name: /^lock\s+restrict$/i })).toHaveClass(
      /bg-primary/
    );
    await expect(
      denyAllReopened.getByRole("checkbox", { name: /ollama[- ]?cloud/i })
    ).not.toBeChecked();
  });
});
