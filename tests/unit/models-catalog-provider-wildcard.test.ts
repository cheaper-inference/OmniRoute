import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";
import type { ModelCapabilityEntry } from "../../src/lib/modelsDevSync.ts";
import { unexpectedCatalogNetworkRequests } from "../_helpers/catalogNetworkGuard13389.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-wildcard-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "wildcard-catalog-test-secret";
process.env.JWT_SECRET = "wildcard-catalog-test-jwt-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { upsertSyncedCapabilities } = await import("../../src/lib/modelsDevSync.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { aiHordeImageCatalog } = await import("../../open-sse/services/aihordeImageCatalog.ts");
const { mintDashboardSessionToken, DASHBOARD_SESSION_COOKIE } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");

const catalogSchema = z.object({
  object: z.literal("list"),
  data: z.array(
    z.looseObject({
      id: z.string(),
      owned_by: z.string(),
      capabilities: z.looseObject({ effort_tiers: z.array(z.string()).optional() }).optional(),
    })
  ),
});

const smallCapabilities: ModelCapabilityEntry = {
  tool_call: true,
  reasoning: true,
  attachment: true,
  structured_output: true,
  temperature: true,
  modalities_input: '["text","image"]',
  modalities_output: '["text"]',
  knowledge_cutoff: null,
  release_date: null,
  last_updated: null,
  status: null,
  family: null,
  open_weights: false,
  limit_context: 32000,
  limit_input: 30000,
  limit_output: 2048,
  interleaved_field: null,
};
const largeCapabilities: ModelCapabilityEntry = {
  ...smallCapabilities,
  modalities_input: '["text","image","audio"]',
  modalities_output: '["text","audio"]',
  limit_context: 128000,
  limit_input: 120000,
  limit_output: 8192,
};

let dashboardHeaders: Headers;

test.beforeEach(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  catalog.__resetCatalogBuilderRunsForTest();
  // Isolate unrelated anonymous image discovery at its HTTP boundary.
  aiHordeImageCatalog.setFetch(async () => Response.json([]));
  await aiHordeImageCatalog.ensureFresh();
  await settingsDb.updateSettings({
    password: "wildcard-catalog-test-password",
    requireLogin: true,
    requireAuthForModels: true,
    hideAutoCombos: true,
    hideNoThinkVariants: true,
  });
  const token = await mintDashboardSessionToken(new TextEncoder().encode(process.env.JWT_SECRET));
  dashboardHeaders = new Headers({ cookie: `${DASHBOARD_SESSION_COOKIE}=${token}` });
});

test.afterEach(() => {
  assert.deepEqual(unexpectedCatalogNetworkRequests, [], "catalog tests must not use the network");
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedGroq(
  models: Parameters<typeof modelsDb.replaceSyncedAvailableModelsForConnection>[2]
) {
  const { id } = await providersDb.createProviderConnection({
    provider: "groq",
    authType: "apikey",
    name: "wildcard-catalog-groq",
    apiKey: "groq-wildcard-test-key",
    isActive: true,
    testStatus: "active",
  });
  assert.ok(typeof id === "string");
  await modelsDb.replaceSyncedAvailableModelsForConnection("groq", id, models);
  return id;
}

async function readCatalog(headers: HeadersInit = dashboardHeaders) {
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { headers })
  );
  assert.equal(response.status, 200);
  const body: unknown = await response.json();
  return catalogSchema.parse(body).data;
}

function entryFor(data: Awaited<ReturnType<typeof readCatalog>>, id: string) {
  const entry = data.find((model) => model.id === id);
  assert.ok(entry, `catalog must include ${id}`);
  return entry;
}

function metadataFor(entry: ReturnType<typeof entryFor>) {
  return {
    context_length: entry.context_length,
    max_input_tokens: entry.max_input_tokens,
    max_output_tokens: entry.max_output_tokens,
    input_modalities: entry.input_modalities,
    output_modalities: entry.output_modalities,
    capabilities: entry.capabilities,
    pricing: entry.pricing,
  };
}

for (const client of ["dashboard cookie", "API key"]) {
  test(`wildcard-only combos are discoverable with ${client} authentication`, async () => {
    await seedGroq([
      { id: "openai/gpt-oss-20b", name: "GPT OSS 20B" },
      { id: "openai/gpt-oss-120b", name: "GPT OSS 120B" },
    ]);
    const wildcard = await combosDb.createCombo({
      name: "groq-wildcard-catalog",
      strategy: "priority",
      models: ["groq/openai/gpt-oss-*"],
    });
    const savedModels = structuredClone(wildcard.models);
    await combosDb.createCombo({
      name: "groq-explicit-catalog",
      strategy: "priority",
      models: ["groq/openai/gpt-oss-20b", "groq/openai/gpt-oss-120b"],
    });
    const { key } = await apiKeysDb.createApiKey("wildcard-catalog", "wildcard-catalog-test", [], {
      allowedCombos: ["groq-wildcard-catalog", "groq-explicit-catalog"],
    });
    const anonymous = await catalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    assert.equal(anonymous.status, 401, "the fixture must require authentication");

    const headers =
      client === "dashboard cookie"
        ? dashboardHeaders
        : new Headers({ authorization: `Bearer ${key}` });
    const data = await readCatalog(headers);
    assert.ok(data.some((entry) => entry.id === "groq-explicit-catalog"));
    assert.ok(
      data.some((entry) => entry.id === "groq-wildcard-catalog" && entry.owned_by === "combo"),
      "the wildcard-only combo must be listed alongside its explicit-member equivalent"
    );

    assert.ok(typeof wildcard.id === "string");
    const saved = await combosDb.getComboById(wildcard.id);
    assert.deepEqual(
      saved?.models,
      savedModels,
      "catalog discovery must not persist expanded targets"
    );
  });
}

test("nested and mixed wildcards retain concrete-member metadata and first-target pricing", async () => {
  await seedGroq([
    { id: "fixture-wild-a", name: "Fixture A", supportedThinkingEfforts: ["low", "high"] },
    {
      id: "fixture-wild-b",
      name: "Fixture B",
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
  ]);
  upsertSyncedCapabilities("groq", {
    "fixture-wild-a": smallCapabilities,
    "fixture-wild-b": largeCapabilities,
  });
  await updatePricing({
    groq: {
      "fixture-wild-a": { input: 1, output: 2 },
      "fixture-wild-b": { input: 10, output: 20 },
    },
  });
  for (const [name, models] of [
    ["explicit-metadata", ["groq/fixture-wild-a", "groq/fixture-wild-b"]],
    ["wildcard-metadata", ["groq/fixture-wild-*"]],
    ["mixed-metadata", ["groq/fixture-wild-a*", "groq/fixture-wild-b"]],
  ] satisfies Array<[string, string[]]>) {
    await combosDb.createCombo({ name, strategy: "priority", models });
  }
  await combosDb.createCombo({
    name: "nested-metadata",
    strategy: "priority",
    models: [{ kind: "combo-ref", comboName: "wildcard-metadata" }],
  });

  const data = await readCatalog();
  const expected = {
    context_length: 32000,
    max_input_tokens: 30000,
    max_output_tokens: 2048,
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
    capabilities: {
      tool_calling: true,
      reasoning: true,
      vision: true,
      attachment: true,
      structured_output: true,
      temperature: true,
      thinking: true,
      supportsThinking: true,
      effort_tiers: ["low", "high"],
    },
    pricing: { prompt: "0.000001", completion: "0.000002", input: 1, output: 2 },
  };
  const explicit = metadataFor(entryFor(data, "explicit-metadata"));
  assert.deepEqual(explicit, expected);
  for (const name of ["mixed-metadata", "nested-metadata", "wildcard-metadata"]) {
    assert.deepEqual(metadataFor(entryFor(data, name)), explicit, name);
  }
});

test("empty and unmatched wildcard pools are omitted without suppressing explicit targets", async () => {
  await seedGroq([{ id: "fixture-wild-a", name: "Fixture A" }]);
  await providersDb.createProviderConnection({
    provider: "fixture-empty-provider",
    authType: "apikey",
    name: "empty-catalog",
    apiKey: "empty-catalog-test-key",
    isActive: true,
  });
  for (const [name, models] of [
    ["empty-pool", ["fixture-empty-provider/*"]],
    ["unmatched-pool", ["groq/not-in-the-catalog-*"]],
    ["unmatched-mixed", ["groq/not-in-the-catalog-*", "groq/fixture-wild-a"]],
  ] satisfies Array<[string, string[]]>) {
    await combosDb.createCombo({ name, strategy: "priority", models });
  }

  const data = await readCatalog();
  assert.equal(
    data.some((model) => model.id === "empty-pool"),
    false
  );
  assert.equal(
    data.some((model) => model.id === "unmatched-pool"),
    false
  );
  entryFor(data, "unmatched-mixed");
});

test("wildcards retain static fallback when no active synced catalog is usable", async () => {
  await seedGroq([]);
  await combosDb.createCombo({
    name: "static-fallback",
    strategy: "priority",
    models: ["groq/openai/gpt-oss-*"],
  });
  entryFor(await readCatalog(), "static-fallback");
});

test("synced additions and removals refresh cached wildcard membership and limits", async () => {
  const connectionId = await seedGroq([{ id: "fixture-wild-b", name: "Fixture B" }]);
  upsertSyncedCapabilities("groq", {
    "fixture-wild-a": smallCapabilities,
    "fixture-wild-b": largeCapabilities,
  });
  const combo = await combosDb.createCombo({
    name: "changing-pool",
    strategy: "priority",
    models: ["groq/fixture-wild-*"],
  });
  const savedModels = structuredClone(combo.models);
  await combosDb.createCombo({
    name: "not-in-live-pool",
    strategy: "priority",
    models: ["groq/openai/gpt-oss-*"],
  });
  let data = await readCatalog();
  assert.equal(entryFor(data, "changing-pool").context_length, 128000);
  assert.equal(
    data.some((model) => model.id === "not-in-live-pool"),
    false
  );
  const initialBuilds = catalog.__getCatalogBuilderRunsForTest();
  await readCatalog();
  assert.equal(
    catalog.__getCatalogBuilderRunsForTest(),
    initialBuilds,
    "unchanged reads use cache"
  );

  for (const { models, context, output } of [
    {
      models: [
        { id: "fixture-wild-a", name: "Fixture A" },
        { id: "fixture-wild-b", name: "Fixture B" },
      ],
      context: 32000,
      output: 2048,
    },
    { models: [{ id: "fixture-wild-b", name: "Fixture B" }], context: 128000, output: 8192 },
  ]) {
    const builds = catalog.__getCatalogBuilderRunsForTest();
    await modelsDb.replaceSyncedAvailableModelsForConnection("groq", connectionId, models);
    data = await readCatalog();
    const entry = entryFor(data, "changing-pool");
    assert.equal(entry.context_length, context);
    assert.equal(entry.max_output_tokens, output);
    assert.ok(
      catalog.__getCatalogBuilderRunsForTest() > builds,
      "sync invalidates the cached catalog"
    );
  }

  await modelsDb.replaceSyncedAvailableModelsForConnection("groq", connectionId, [
    { id: "outside-the-pattern", name: "Outside the pattern" },
  ]);
  data = await readCatalog();
  assert.equal(
    data.some((model) => model.id === "changing-pool"),
    false
  );
  assert.equal(
    data.some((model) => model.id === "not-in-live-pool"),
    false
  );
  assert.ok(typeof combo.id === "string");
  assert.deepEqual((await combosDb.getComboById(combo.id))?.models, savedModels);
});

test("wildcard discovery preserves combo grants separately from provider-model grants", async () => {
  await seedGroq([{ id: "fixture-wild-a", name: "Fixture A" }]);
  for (const name of ["allowed-wildcard", "other-wildcard"]) {
    await combosDb.createCombo({ name, strategy: "priority", models: ["groq/fixture-wild-*"] });
  }
  await combosDb.createCombo({
    name: "allowed-explicit",
    strategy: "priority",
    models: ["groq/fixture-wild-a"],
  });
  const allowedKey = await apiKeysDb.createApiKey("combo-grant", "test", [], {
    allowedCombos: ["allowed-wildcard", "allowed-explicit"],
    modelAccessMode: "restricted",
    allowedModels: [],
  });
  const modelKey = await apiKeysDb.createApiKey("model-grant", "test", [], {
    allowedModels: ["groq/*"],
    allowedCombos: ["other-wildcard"],
  });
  const allowedHeaders = { authorization: `Bearer ${allowedKey.key}` };

  const dashboard = await readCatalog();
  entryFor(dashboard, "allowed-wildcard");
  entryFor(dashboard, "other-wildcard");
  const comboGranted = await readCatalog(allowedHeaders);
  entryFor(comboGranted, "allowed-wildcard");
  entryFor(comboGranted, "allowed-explicit");
  assert.equal(
    comboGranted.some((model) => model.id === "other-wildcard"),
    false
  );
  assert.equal(
    comboGranted.some((model) => model.id === "groq/fixture-wild-a"),
    false
  );
  const modelHeaders = { authorization: `Bearer ${modelKey.key}` };
  const modelGranted = await readCatalog(modelHeaders);
  entryFor(modelGranted, "groq/fixture-wild-a");
  entryFor(modelGranted, "other-wildcard");
  assert.equal(
    modelGranted.some((model) => model.id === "allowed-wildcard"),
    false
  );
  await apiKeysDb.updateApiKeyPermissions(modelKey.id, { blockedModels: ["groq/*"] });
  const modelBlocked = await readCatalog(modelHeaders);
  assert.equal(
    modelBlocked.some((model) => model.id === "groq/fixture-wild-a"),
    false
  );
  entryFor(modelBlocked, "other-wildcard");

  await apiKeysDb.updateApiKeyPermissions(allowedKey.id, { allowedCombos: ["other-wildcard"] });
  const updated = await readCatalog(allowedHeaders);
  assert.equal(
    updated.some((model) => model.id === "allowed-wildcard"),
    false
  );
  entryFor(updated, "other-wildcard");
});

test("hidden members are excluded while inactive and hidden combos stay absent for both clients", async () => {
  await seedGroq([
    { id: "fixture-wild-a", name: "Fixture A" },
    { id: "fixture-wild-b", name: "Fixture B" },
  ]);
  upsertSyncedCapabilities("groq", {
    "fixture-wild-a": smallCapabilities,
    "fixture-wild-b": largeCapabilities,
  });
  for (const { name, models, isHidden, isActive } of [
    { name: "visible-wildcard", models: ["groq/fixture-wild-*"], isHidden: false, isActive: true },
    {
      name: "visible-explicit",
      models: ["groq/fixture-wild-a", "groq/fixture-wild-b"],
      isHidden: false,
      isActive: true,
    },
    { name: "hidden-wildcard", models: ["groq/fixture-wild-*"], isHidden: true, isActive: true },
    {
      name: "inactive-wildcard",
      models: ["groq/fixture-wild-*"],
      isHidden: false,
      isActive: false,
    },
  ]) {
    await combosDb.createCombo({ name, models, isHidden, isActive, strategy: "priority" });
  }
  const { key } = await apiKeysDb.createApiKey("visibility", "test", [], {
    allowedCombos: ["visible-wildcard", "visible-explicit", "hidden-wildcard", "inactive-wildcard"],
  });
  const headers = [dashboardHeaders, new Headers({ authorization: `Bearer ${key}` })];
  for (const client of headers) {
    const data = await readCatalog(client);
    assert.equal(entryFor(data, "visible-explicit").context_length, 32000);
    assert.equal(entryFor(data, "visible-wildcard").context_length, 32000);
    assert.equal(
      data.some((model) => model.id === "hidden-wildcard"),
      false
    );
    assert.equal(
      data.some((model) => model.id === "inactive-wildcard"),
      false
    );
  }

  modelsDb.setModelIsHidden("groq", "fixture-wild-a", true);
  for (const client of headers) {
    const data = await readCatalog(client);
    const explicit = entryFor(data, "visible-explicit");
    assert.equal(explicit.context_length, 128000, "only the visible member determines limits");
    assert.deepEqual(metadataFor(entryFor(data, "visible-wildcard")), metadataFor(explicit));
    assert.equal(
      data.some((model) => model.id === "groq/fixture-wild-a"),
      false
    );
  }
  modelsDb.setModelIsHidden("groq", "fixture-wild-b", true);
  for (const client of headers) {
    const data = await readCatalog(client);
    assert.equal(
      data.some((model) => model.id === "visible-wildcard"),
      false
    );
    assert.equal(
      data.some((model) => model.id === "visible-explicit"),
      false
    );
  }
});

test("wildcard step connection pins and allowlists preserve scoped reasoning tiers", async () => {
  const firstId = await seedGroq([
    { id: "fixture-wild-a", name: "Fixture A", supportedThinkingEfforts: ["low", "high"] },
  ]);
  const { id: secondId } = await providersDb.createProviderConnection({
    provider: "groq",
    authType: "apikey",
    name: "narrow-reasoning-account",
    apiKey: "groq-second-test-key",
    isActive: true,
    testStatus: "active",
  });
  assert.ok(typeof secondId === "string");
  await modelsDb.replaceSyncedAvailableModelsForConnection("groq", secondId, [
    { id: "fixture-wild-a", name: "Fixture A", supportedThinkingEfforts: ["high"] },
  ]);
  upsertSyncedCapabilities("groq", { "fixture-wild-a": smallCapabilities });
  for (const { name, scope } of [
    { name: "dynamic", scope: {} },
    { name: "pinned", scope: { connectionId: firstId } },
    { name: "allowlisted", scope: { allowedConnectionIds: [firstId] } },
  ]) {
    await combosDb.createCombo({
      name: `${name}-wildcard`,
      strategy: "priority",
      models: [
        { kind: "provider-wildcard", providerId: "groq", modelPattern: "fixture-wild-*", ...scope },
      ],
    });
    await combosDb.createCombo({
      name: `${name}-explicit`,
      strategy: "priority",
      models: [{ kind: "model", model: "groq/fixture-wild-a", ...scope }],
    });
  }

  let data = await readCatalog();
  for (const [name, efforts] of [
    ["dynamic", ["high"]],
    ["pinned", ["low", "high"]],
    ["allowlisted", ["low", "high"]],
  ] satisfies Array<[string, string[]]>) {
    const wildcard = entryFor(data, `${name}-wildcard`);
    assert.deepEqual(wildcard.capabilities?.effort_tiers, efforts);
    assert.deepEqual(metadataFor(wildcard), metadataFor(entryFor(data, `${name}-explicit`)));
  }

  await providersDb.updateProviderConnection(secondId, {
    providerSpecificData: { excludedModels: ["fixture-wild-a"] },
  });
  data = await readCatalog();
  assert.deepEqual(entryFor(data, "dynamic-wildcard").capabilities?.effort_tiers, ["low", "high"]);
  assert.deepEqual(
    metadataFor(entryFor(data, "dynamic-wildcard")),
    metadataFor(entryFor(data, "dynamic-explicit"))
  );
});
