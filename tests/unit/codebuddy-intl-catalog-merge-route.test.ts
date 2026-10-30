/**
 * I4 — the `/v3/config` merge must reach the ROUTE, not just the parser.
 *
 * The catalog merge (`mergeCatalogWithCurated`) existed and was unit-tested, but
 * nothing called it: `discoverCodeBuddyIntlModels` mapped the gateway list
 * straight through, so the first successful fetch REPLACED the curated rows in
 * the synced store with gateway-only rows. Every curated context window, output
 * cap and vision/reasoning flag was lost from then on, and curated models the
 * gateway omitted disappeared from the picker.
 *
 * These tests drive the real route handler with a stubbed `/v3/config` and then
 * read back the PERSISTED synced rows, which is what the rest of the app sees.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cbai-merge-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const { clearCodeBuddyIntlModelCache } =
  await import("../../open-sse/services/codebuddyIntlCatalog.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");

const originalFetch = globalThis.fetch;

/** The gateway serves one curated id (with NO metadata) plus one it alone knows. */
const GATEWAY_MODELS = [
  { id: "glm-5.2", name: "GLM-5.2" },
  { id: "gateway-only-model", name: "Gateway Only" },
];

function catalogStub() {
  return async (url: string | URL | Request) => {
    if (String(url).includes("/v3/config")) {
      return Response.json({ code: 0, data: { models: GATEWAY_MODELS } });
    }
    return new Response("unexpected", { status: 500 });
  };
}

async function discoverAndReadBack() {
  const connection = await providersDb.createProviderConnection({
    provider: "codebuddy-intl",
    authType: "oauth",
    name: "cbai-merge",
    accessToken: "cbai-access",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });

  globalThis.fetch = catalogStub() as typeof fetch;
  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as {
    source: string;
    models: Array<{ id: string; contextLength?: number; maxOutputTokens?: number }>;
  };
  assert.equal(response.status, 200);
  assert.equal(body.source, "api", "discovery must come from the stubbed live catalog");

  // What the rest of the app reads afterwards: the persisted synced rows.
  const synced = await modelsDb.getSyncedAvailableModelsForConnection(
    "codebuddy-intl",
    connection.id
  );
  return { body, synced };
}

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  clearCodeBuddyIntlModelCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  clearCodeBuddyIntlModelCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the route keeps curated context windows the gateway does not publish", async () => {
  const { body, synced } = await discoverAndReadBack();

  const curatedWindow = (getModelsByProviderId("codebuddy-intl") || []).find(
    (model) => model.id === "glm-5.2"
  )?.contextLength;
  assert.equal(typeof curatedWindow, "number", "the curated registry must declare a window");

  const served = body.models.find((model) => model.id === "glm-5.2");
  assert.equal(served?.contextLength, curatedWindow, "the response must carry the curated window");

  const persisted = synced.find((model) => model.id === "glm-5.2");
  assert.ok(persisted, "the curated id must be persisted");
  assert.equal(
    persisted?.inputTokenLimit ?? persisted?.contextWindow,
    curatedWindow,
    "the persisted row must carry the curated window, not lose it on the first fetch"
  );
});

test("the route persists curated capabilities instead of dropping them", async () => {
  const { synced } = await discoverAndReadBack();
  const persisted = synced.find((model) => model.id === "glm-5.2");

  // glm-5.2 is declared `supportsReasoning` in the curated registry; the
  // gateway payload above declares nothing.
  assert.equal(persisted?.supportsThinking, true, "reasoning capability must survive");
});

test("the route keeps curated-only models the gateway omits", async () => {
  const { body, synced } = await discoverAndReadBack();
  const curatedIds = (getModelsByProviderId("codebuddy-intl") || []).map((model) => model.id);
  const omitted = curatedIds.find((id) => id !== "glm-5.2" && id !== "gateway-only-model");
  assert.ok(omitted, "the curated registry must have more than the two stubbed ids");

  // Dropping a curated model the gateway no longer lists would break routing
  // for a model the user may already have configured.
  assert.ok(
    synced.some((model) => model.id === omitted),
    `${omitted} is curated and must stay in the synced catalog`
  );
  assert.ok(
    body.models.some((model) => model.id === omitted),
    `${omitted} must still be offered by the route`
  );
});

test("the route still adds models only the gateway knows", async () => {
  const { body, synced } = await discoverAndReadBack();
  assert.ok(body.models.some((model) => model.id === "gateway-only-model"));
  assert.ok(synced.some((model) => model.id === "gateway-only-model"));
});
