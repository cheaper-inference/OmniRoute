import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// OpenRouter's default model listing hides decisions models (System One: TypeSafe Jev,
// Inception Mercury Decide, ...); they only appear with `output_modalities=decisions`.
// GET /v1/systemone/models reads the unified catalog, so those models must reach it
// as `openrouter/<vendor>/<model>` rows of type "decisions".

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "openrouter-decision-models-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  API_KEY_SECRET: "openrouter-decisions-fixture-secret",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
});

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const decisionCatalog = await import("../../src/app/api/v1/_shared/decisionCatalog.ts");
const { getOpenRouterModelType } = await import("../../src/app/api/v1/models/catalogOpenrouter.ts");
const { refreshOpenRouterCatalog } = await import("../../src/lib/catalog/openrouterCatalog.ts");
const { aiHordeImageCatalog } = await import("../../open-sse/services/aihordeImageCatalog.ts");

const originalFetch = globalThis.fetch;

const CHAT_MODEL = {
  id: "fixture/chat-model",
  name: "Fixture Chat",
  architecture: { input_modalities: ["text"], output_modalities: ["text"] },
  pricing: { prompt: "0.000001", completion: "0.000002" },
};
const DECISIONS_MODEL = {
  id: "typesafe/jev-1.13",
  name: "TypeSafe: Jev 1.13",
  architecture: { input_modalities: ["text"], output_modalities: ["decisions"] },
  pricing: { prompt: "0.0000001", completion: "0" },
};

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function decisionsCatalogRequest() {
  return new Request("http://localhost/v1/systemone/models");
}

test("an OpenRouter decisions model is typed as decisions", () => {
  assert.equal(getOpenRouterModelType(["text"], ["decisions"]), "decisions");
  assert.equal(getOpenRouterModelType(["text"], ["text"]), "chat");
  assert.equal(getOpenRouterModelType(["text"], ["image"]), "image");
});

test("the OpenRouter catalog refresh also fetches the decisions listing", async () => {
  const requested: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    requested.push(url.search);
    const data =
      url.searchParams.get("output_modalities") === "decisions" ? [DECISIONS_MODEL] : [CHAT_MODEL];
    return Response.json({ data });
  }) as typeof fetch;
  try {
    const result = await refreshOpenRouterCatalog();
    assert.equal(result.ok, true);
    assert.deepEqual(
      result.data.map((model) => model.id),
      ["fixture/chat-model", "typesafe/jev-1.13"]
    );
    assert.deepEqual(requested.sort(), ["", "?output_modalities=decisions"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a failing decisions listing keeps the default OpenRouter catalog", async () => {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    if (url.searchParams.get("output_modalities") === "decisions") {
      return new Response("unavailable", { status: 503 });
    }
    return Response.json({ data: [CHAT_MODEL] });
  }) as typeof fetch;
  try {
    const result = await refreshOpenRouterCatalog();
    assert.equal(result.ok, true);
    assert.deepEqual(
      result.data.map((model) => model.id),
      ["fixture/chat-model"]
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GET /v1/systemone/models lists OpenRouter decisions models", async () => {
  aiHordeImageCatalog.setFetch(async () => Response.json([]));
  await aiHordeImageCatalog.ensureFresh();
  await settings.updateSettings({
    requireLogin: false,
    requireAuthForModels: false,
    hideAutoCombos: true,
    hideNoThinkVariants: true,
  });
  const connection = await providers.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    apiKey: "fixture-not-a-provider-key",
    name: "decisions fixture",
    isActive: true,
    providerSpecificData: {},
  });
  fs.mkdirSync(path.join(dataDir, "cache"), { recursive: true });
  fs.writeFileSync(
    path.join(dataDir, "cache/openrouter-catalog.json"),
    JSON.stringify({ fetchedAt: new Date().toISOString(), data: [CHAT_MODEL, DECISIONS_MODEL] })
  );
  globalThis.fetch = (async () => {
    throw new Error("the catalog must come from the cache fixture");
  }) as typeof fetch;

  try {
    catalog.__resetCatalogBuilderRunsForTest();
    const listed = await decisionCatalog.getDecisionCatalog(decisionsCatalogRequest());
    assert.equal(listed.status, 200);
    const body = (await listed.json()) as { data: { id: string; api_format: string }[] };
    assert.deepEqual(
      body.data.map((row) => [row.id, row.api_format]),
      [["openrouter/typesafe/jev-1.13", "systemone"]]
    );

    // Synced OpenRouter models come from the default listing, which never contains
    // decisions models: they must still be added from the catalog.
    await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", connection.id, [
      { id: "fixture/chat-model", name: "Fixture Chat" },
    ]);
    catalog.__resetCatalogBuilderRunsForTest();
    const synced = await decisionCatalog.getDecisionCatalog(decisionsCatalogRequest());
    const syncedBody = (await synced.json()) as { data: { id: string }[] };
    assert.deepEqual(
      syncedBody.data.map((row) => row.id),
      ["openrouter/typesafe/jev-1.13"]
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
