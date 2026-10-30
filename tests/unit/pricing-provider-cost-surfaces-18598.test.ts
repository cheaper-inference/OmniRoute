import assert from "node:assert/strict";
import test from "node:test";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import { invalidateDbCache } from "../../src/lib/db/readCache.ts";
import { getPricingForModel, getPricingWithSources } from "../../src/lib/db/settings/pricing.ts";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";
import { saveModelsDevPricing } from "../../src/lib/modelsDevSync.ts";
import { getSyncedPricing, syncPricingFromSources } from "../../src/lib/pricingSync.ts";
import { pricingFieldsSchema } from "../../src/shared/validation/schemas/pricing.ts";

const GLM = { input: 1.4, output: 4.4, cached: 0.26 };

function seedLegacy() {
  const db = getDbInstance();
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing_synced",
    "opencode_go",
    JSON.stringify({ "glm-5.2": GLM })
  );
  invalidateDbCache("pricing");
}

function catalogPricing(model = "glm-5.2", provider = "opencode-go") {
  return pricingFieldsSchema.parse(
    enrichCatalogModelEntry({ id: `${provider}/${model}`, owned_by: provider, root: model }).pricing
  );
}

test.beforeEach(() => {
  getDbInstance()
    .prepare(
      "DELETE FROM key_value WHERE namespace IN ('pricing', 'pricing_synced', 'models_dev_pricing')"
    )
    .run();
  invalidateDbCache("pricing");
});
test.after(() => resetDbInstance());

test("legacy source resolves with a nonempty canonical higher-layer bucket without rewriting storage", async () => {
  seedLegacy();
  saveModelsDevPricing({ "opencode-go": { other: { input: 7, output: 8 } } });
  const db = getDbInstance();
  const before = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing_synced'")
    .all();
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), GLM);
  assert.deepEqual(catalogPricing(), GLM);
  assert.deepEqual(getSyncedPricing()["opencode-go"]["glm-5.2"], GLM);
  assert.deepEqual(
    db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing_synced'").all(),
    before
  );
});

test("legacy and canonical source rows have stable per-field precedence", async () => {
  seedLegacy();
  getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(
      "pricing_synced",
      "opencode-go",
      JSON.stringify({ "glm-5.2": { input: 0 }, other: { input: 7 } })
    );
  invalidateDbCache("pricing");
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), {
    input: 0,
    output: 4.4,
    cached: 0.26,
  });
  assert.deepEqual(catalogPricing(), { input: 0, output: 4.4, cached: 0.26 });
});

test("pricing sources report the normalized model as litellm", async () => {
  seedLegacy();
  const { pricing, sourceMap } = await getPricingWithSources();
  assert.deepEqual(pricing["opencode-go"]["glm-5.2"], GLM);
  assert.equal(sourceMap["opencode-go"]["glm-5.2"], "litellm");
  assert.equal(pricing.opencode_go, undefined);
  assert.equal(sourceMap.opencode_go, undefined);
});

test("subsequent sync replaces legacy storage with canonical output without changing user namespace", async (t) => {
  seedLegacy();
  const db = getDbInstance();
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing",
    "opencode_go",
    JSON.stringify({ untouched: { input: 11 } })
  );
  invalidateDbCache("pricing");
  const before = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all();
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({
      "opencode_go/glm-5.2": {
        litellm_provider: "opencode_go",
        input_cost_per_token: 0.0000014,
        output_cost_per_token: 0.0000044,
        cache_read_input_token_cost: 0.00000026,
      },
    })
  );
  assert.equal((await syncPricingFromSources({ sources: ["litellm"] })).success, true);
  assert.deepEqual(
    db.prepare("SELECT key FROM key_value WHERE namespace = 'pricing_synced'").all(),
    [{ key: "opencode-go" }]
  );
  assert.deepEqual(
    db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all(),
    before
  );
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), GLM);
});
