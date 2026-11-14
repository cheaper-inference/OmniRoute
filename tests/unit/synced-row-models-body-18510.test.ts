/**
 * #18510 must not change what /v1/models serves for a synced row, other than the Mistral
 * context window it fixes. Each expected row is the full body the release tip serves,
 * `created` aside, through the real discovery and catalog paths. Enrichment overwrites
 * capabilities.tool_calling on these rows, so the helper tests pin the sync layer itself.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18510-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { normalizeDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { buildSyncedCapabilities, mergeSyncedCapabilities } =
  await import("../../src/app/api/v1/models/syncedCapabilities.ts");
const { resolveModelDisplayName } = await import("../../src/shared/utils/modelDisplayName.ts");

const TOOL_CARD = { completion_chat: true, function_calling: true };

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedSynced(provider: string, rows: unknown[]) {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-body-conn`,
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    provider,
    (connection as { id: string }).id,
    normalizeDiscoveredModels(rows, provider)
  );
}

async function catalogRow(id: string) {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const row = body.data.find((model) => model.id === id);
  assert.ok(row, `expected ${id} in /v1/models`);
  const { created: _created, ...rest } = row;
  return rest;
}

function syncedRowBody(provider: string, model: string, contextLength = 128000) {
  return {
    id: `${provider}/${model}`,
    object: "model",
    owned_by: provider,
    permission: [],
    root: model,
    parent: null,
    capabilities: { tool_calling: true, reasoning: true },
    // The tip publishes a readable name for a synced row that has none (#18354).
    name: resolveModelDisplayName(model),
    // Every named row advertises its name for codex-registry clients (#19477).
    metadata: { display_name: resolveModelDisplayName(model) },
    context_length: contextLength,
  };
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("another provider's synced rows keep the tip's body, whatever they declare", async () => {
  await seedSynced("openrouter", [
    { id: "probe/declared-18510", supportsTools: true },
    { id: "probe/card-18510", capabilities: TOOL_CARD },
    { id: "probe/refused-18510", supportsTools: false },
  ]);
  for (const model of ["probe/declared-18510", "probe/card-18510", "probe/refused-18510"]) {
    assert.deepEqual(await catalogRow(`openrouter/${model}`), syncedRowBody("openrouter", model));
  }
});

test("a synced row cannot turn on tools for a model the registry refuses them", async () => {
  await seedSynced("adapta-web", [{ id: "adapta-one", name: "One", supportsTools: true }]);
  const row = await catalogRow("adapta-web/adapta-one");
  assert.deepEqual(row.capabilities, { tool_calling: false, reasoning: true });
});

test("a Mistral card differs from the tip only by its context window", async () => {
  await seedSynced("mistral", [{ id: "mistral-synced-18510", capabilities: TOOL_CARD }]);
  assert.deepEqual(
    await catalogRow("mistral/mistral-synced-18510"),
    syncedRowBody("mistral", "mistral-synced-18510", 262144)
  );
});

test("the sync layer does not publish tool_calling from supportsTools", () => {
  const row = { id: "probe-18510", supportsTools: true };
  assert.equal(buildSyncedCapabilities(row, "openrouter"), undefined);
  assert.equal(mergeSyncedCapabilities(undefined, row, "openrouter"), undefined);
  assert.deepEqual(mergeSyncedCapabilities({ tool_calling: false }, row, "openrouter"), {
    tool_calling: false,
  });
});

test("defaulted custom row does not mask declared/inferred endpoints from synced row", async () => {
  await seedSynced("mistral", [
    {
      id: "mistral-embed-18510",
      capabilities: { completion_chat: false },
      supportedEndpoints: ["embeddings"],
      endpointCapabilitySource: "inferred",
      apiFormat: "embeddings",
      modelType: "embedding",
    },
  ]);

  // Simulate "Import from /models" or legacy defaulted custom row
  await modelsDb.addCustomModel(
    "mistral",
    "mistral-embed-18510",
    "mistral-embed-18510",
    "imported",
    "chat-completions",
    ["chat"],
    undefined,
    {},
    undefined,
    undefined,
    undefined,
    { endpointCapabilitySource: "defaulted" }
  );

  const row = await catalogRow("mistral/mistral-embed-18510");
  assert.deepEqual(row.supported_endpoints, ["embeddings"]);
  assert.equal(row.type, "embedding");
  assert.equal(row.api_format, "embeddings");
});

test("an operator custom row still overrides discovered endpoints in /v1/models", async () => {
  await seedSynced("mistral", [
    {
      id: "mistral-embed-op-18510",
      capabilities: { completion_chat: false },
      supportedEndpoints: ["embeddings"],
      endpointCapabilitySource: "inferred",
      apiFormat: "embeddings",
      modelType: "embedding",
    },
  ]);
  await modelsDb.addCustomModel(
    "mistral",
    "mistral-embed-op-18510",
    "mistral-embed-op-18510",
    "manual",
    "chat-completions",
    ["chat"]
  );

  const row = await catalogRow("mistral/mistral-embed-op-18510");
  assert.deepEqual(row.supported_endpoints, ["chat"]);
  assert.equal(row.api_format, "chat-completions");
});

test("an unmarked legacy custom row keeps its explicit non-placeholder endpoint list", async () => {
  await seedSynced("mistral", [
    {
      id: "mistral-embed-legacy-18510",
      capabilities: { completion_chat: false },
      supportedEndpoints: ["embeddings"],
      endpointCapabilitySource: "inferred",
      apiFormat: "embeddings",
      modelType: "embedding",
    },
  ]);
  // Rows written before #16929 carry no provenance; every current write path stamps one.
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(
      "customModels",
      "mistral",
      JSON.stringify([
        { id: "mistral-embed-legacy-18510", source: "manual", supportedEndpoints: ["rerank"] },
      ])
    );

  const row = await catalogRow("mistral/mistral-embed-legacy-18510");
  assert.deepEqual(row.supported_endpoints, ["rerank"]);
  assert.equal(row.type, "rerank");
});
