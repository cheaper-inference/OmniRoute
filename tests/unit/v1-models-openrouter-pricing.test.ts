/**
 * GET /v1/models: every entry carries an OpenRouter-format `pricing` object (USD per
 * token, decimal strings) next to the existing per-1M numbers, priced from the same
 * table cost accounting uses. Helpers are covered by catalog-openrouter-pricing.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1-models-pricing-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-pricing-secret";
process.env.CATALOG_BUILD_TIMEOUT_MS = process.env.CATALOG_BUILD_TIMEOUT_MS || "120000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const pricingDb = await import("../../src/lib/db/settings/pricing.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { enrichCatalogModelEntry } = await import("../../src/lib/modelMetadataRegistry.ts");

type Entry = { id: string; owned_by?: string; root?: string; pricing?: Record<string, unknown> };

const PRICED = {
  prompt: "0.000005",
  completion: "0.000025",
  input_cache_read: "0.0000005",
  input_cache_write: "0.00000625",
  input: 5,
  output: 25,
  cached: 0.5,
  cache_creation: 6.25,
};

test.before(async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-pricing-test",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  })) as { id: string };
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", connection.id, [
    { id: "pricing-test-priced", name: "Priced" },
    { id: "pricing-test-free", name: "Free" },
    { id: "pricing-test-unpriced", name: "Unpriced" },
  ]);
  await pricingDb.updatePricing({
    openai: {
      "pricing-test-priced": { input: 5, output: 25, cached: 0.5, cache_creation: 6.25 },
      "pricing-test-free": { input: 0, output: 0 },
    },
  });
  await combosDb.createCombo({
    name: "pricing-test-combo",
    strategy: "priority",
    models: ["openai/pricing-test-priced", "openai/pricing-test-unpriced"],
  });
  await combosDb.createCombo({
    name: "pricing-test-combo-unpriced",
    strategy: "priority",
    models: ["openai/pricing-test-unpriced", "openai/pricing-test-priced"],
  });
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function listModels(headers: Record<string, string> = {}) {
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models", { headers })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { object: string; data: Entry[] };
  assert.equal(body.object, "list");
  return body.data;
}

function entriesFor(data: Entry[], root: string): Entry[] {
  const found = data.filter((entry) => entry.root === root && entry.owned_by !== "combo");
  assert.ok(found.length > 0, `catalog lists ${root}`);
  return found;
}

test("a priced model carries per-token strings and the per-1M numbers", async () => {
  const data = await listModels();
  for (const entry of entriesFor(data, "pricing-test-priced")) {
    assert.deepEqual(entry.pricing, PRICED, entry.id);
  }
  // Same row as cost accounting.
  const row = await pricingDb.getPricingForModel("openai", "pricing-test-priced");
  assert.equal(row?.input, 5);
});

test("a free model is priced at zero and an unknown price omits `pricing`", async () => {
  const data = await listModels();
  for (const entry of entriesFor(data, "pricing-test-free")) {
    assert.deepEqual(entry.pricing, { prompt: "0", completion: "0", input: 0, output: 0 });
  }
  for (const entry of entriesFor(data, "pricing-test-unpriced")) {
    assert.equal("pricing" in entry, false, entry.id);
  }
});

test("a combo is priced as its first target", async () => {
  const data = await listModels();
  const combo = data.find((entry) => entry.id === "pricing-test-combo");
  assert.ok(combo);
  assert.deepEqual(combo.pricing, PRICED);

  const unpriced = data.find((entry) => entry.id === "pricing-test-combo-unpriced");
  assert.ok(unpriced);
  assert.equal("pricing" in unpriced, false);
});

test("every priced token-billed entry has the same shape and no exponent notation", async () => {
  const data = await listModels();
  // Credit-metered providers keep numeric-only pricing (covered below).
  const priced = data.filter(
    (entry) => entry.pricing && entry.owned_by !== "kiro" && entry.owned_by !== "kr"
  );
  assert.ok(priced.length > 3);
  for (const entry of priced) {
    const pricing = entry.pricing as Record<string, unknown>;
    assert.equal(typeof pricing.prompt, "string", entry.id);
    assert.equal(typeof pricing.completion, "string", entry.id);
    assert.equal(typeof pricing.input, "number", entry.id);
    assert.equal(typeof pricing.output, "number", entry.id);
    for (const key of ["prompt", "completion", "input_cache_read", "input_cache_write"]) {
      if (pricing[key] === undefined) continue;
      assert.match(String(pricing[key]), /^\d+(\.\d+)?$/, `${entry.id} ${key}`);
    }
  }
});

test("a credit-metered provider keeps its numeric pricing and gets no per-token strings", async () => {
  await providersDb.createProviderConnection({
    provider: "kiro",
    authType: "oauth",
    name: "kiro-pricing-test",
    accessToken: "token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const data = await listModels();
  const credit = data.filter(
    (entry) => (entry.owned_by === "kiro" || entry.owned_by === "kr") && entry.pricing
  );
  assert.ok(credit.length > 0, "catalog lists priced kiro models");
  for (const entry of credit) {
    // Exactly what catalog enrichment produced before per-token strings existed.
    const before = enrichCatalogModelEntry({
      id: entry.id,
      owned_by: entry.owned_by,
      root: entry.root,
    }).pricing;
    assert.deepEqual(entry.pricing, before, entry.id);
    assert.equal("prompt" in (entry.pricing ?? {}), false, entry.id);
    assert.equal("completion" in (entry.pricing ?? {}), false, entry.id);
  }
  const sonnet = credit.find((entry) => entry.root === "claude-sonnet-4.5");
  assert.deepEqual(sonnet?.pricing, {
    input: 3,
    output: 15,
    cached: 1.5,
    reasoning: 15,
    cache_creation: 3,
  });
});

test("an Anthropic-style request (x-api-key + anthropic-version) gets the same pricing", async () => {
  const key = (await apiKeysDb.createApiKey("pricing-test-key", "machine-pricing")) as {
    key: string;
  };
  const data = await listModels({ "x-api-key": key.key, "anthropic-version": "2023-06-01" });
  for (const entry of entriesFor(data, "pricing-test-priced")) {
    assert.deepEqual(entry.pricing, PRICED, entry.id);
  }
  const combo = data.find((entry) => entry.id === "pricing-test-combo");
  assert.deepEqual(combo?.pricing, PRICED);
});
