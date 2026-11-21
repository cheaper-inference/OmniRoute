/**
 * #18641: /v1/models keeps first-source pricing unless CATALOG_PRICING_FIELD_MERGE_ENABLED
 * is on. On, it resolves the way cost tracking does: defaults < LiteLLM < models.dev < user.
 * The OpenCode Go alias fix itself does not depend on the flag.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const FLAG = "CATALOG_PRICING_FIELD_MERGE_ENABLED";
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "catalog-pricing-merge-"));
process.env.DATA_DIR = directory;
delete process.env[FLAG];

const { enrichCatalogModelEntry } = await import("../../src/lib/modelMetadataRegistry.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");

const GPT_4O_MODELS_DEV = { openai: { "gpt-4o": { input: 0, output: 2, cached: 0.25 } } };

function catalogPricing(
  provider: string,
  model: string,
  snapshot: Record<string, unknown> = { modelsDevPricing: {}, userPricing: {} }
) {
  return enrichCatalogModelEntry(
    { id: `${provider}/${model}`, owned_by: provider, root: model },
    undefined,
    snapshot
  ).pricing as Record<string, number> | undefined;
}

function seedSynced(bucket: string, models: Record<string, Record<string, number>>) {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("pricing_synced", bucket, JSON.stringify(models));
  invalidateDbCache("pricing");
}

test.beforeEach(() => {
  delete process.env[FLAG];
  getDbInstance().prepare("DELETE FROM key_value WHERE namespace = 'pricing_synced'").run();
  invalidateDbCache("pricing");
});

test.after(() => {
  delete process.env[FLAG];
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("the flag is defined, off by default and invalidates the catalog", async () => {
  const { FEATURE_FLAG_DEFINITIONS } =
    await import("../../src/shared/constants/featureFlagDefinitions.ts");
  const definition = FEATURE_FLAG_DEFINITIONS.find((entry) => entry.key === FLAG);
  assert.equal(definition?.defaultValue, "false");
  assert.equal(definition?.type, "boolean");
  const source = fs.readFileSync(new URL("../../src/lib/db/featureFlags.ts", import.meta.url));
  assert.match(String(source), new RegExp(`CATALOG_RELEVANT_FEATURE_FLAGS[\\s\\S]*"${FLAG}"`));
});

test("flag off: the first source wins and nothing leaks from the layers below", () => {
  seedSynced("openai", { "gpt-4o": { input: 9, output: 9, cache_creation: 9 } });
  const pricing = catalogPricing("openai", "gpt-4o", {
    modelsDevPricing: GPT_4O_MODELS_DEV,
    userPricing: {},
  });
  assert.deepEqual(pricing, { input: 0, output: 2, cached: 0.25 });
});

test("flag off: synced and user reasoning rates stay out of the catalog", () => {
  const pricing = catalogPricing("openai", "gpt-4o", {
    modelsDevPricing: { openai: { "gpt-4o": { input: 1, output: 2, reasoning: 7 } } },
    userPricing: { openai: { "gpt-4o": { output: 3, reasoning: 8 } } },
  });
  assert.deepEqual(pricing, { input: 1, output: 3 });
});

test("flag off: a model no source above prices still shows its defaults", () => {
  const pricing = catalogPricing("openai", "gpt-4o");
  assert.equal(typeof pricing?.input, "number");
  assert.equal(pricing?.reasoning, 15);
});

test("flag off: the OpenCode Go alias still reaches the catalog", () => {
  seedSynced("opencode_go", { "glm-5.2": { input: 1.4, output: 4.4, cached: 0.26 } });
  assert.deepEqual(catalogPricing("opencode-go", "glm-5.2"), {
    input: 1.4,
    output: 4.4,
    cached: 0.26,
  });
});

test("flag on: fields merge per field, defaults below LiteLLM below models.dev", () => {
  process.env[FLAG] = "true";
  seedSynced("openai", { "gpt-4o": { input: 9, output: 9, cache_creation: 3 } });
  const pricing = catalogPricing("openai", "gpt-4o", {
    modelsDevPricing: GPT_4O_MODELS_DEV,
    userPricing: {},
  });
  assert.equal(pricing?.input, 0, "models.dev beats LiteLLM");
  assert.equal(pricing?.output, 2, "models.dev beats LiteLLM");
  assert.equal(pricing?.cached, 0.25, "models.dev beats defaults");
  assert.equal(pricing?.cache_creation, 3, "LiteLLM fills a field models.dev lacks");
  assert.equal(pricing?.reasoning, 15, "defaults fill a field neither source prices");
});

test("flag on: a user reasoning override wins, including an explicit zero", () => {
  process.env[FLAG] = "true";
  const pricing = catalogPricing("openai", "gpt-4o", {
    modelsDevPricing: { openai: { "gpt-4o": { input: 1, output: 2, reasoning: 7 } } },
    userPricing: { openai: { "gpt-4o": { reasoning: 0 } } },
  });
  assert.equal(pricing?.reasoning, 0);
});

test("flag values other than enabled ones keep the first-source catalog", () => {
  process.env[FLAG] = "off";
  const pricing = catalogPricing("openai", "gpt-4o", {
    modelsDevPricing: GPT_4O_MODELS_DEV,
    userPricing: {},
  });
  assert.deepEqual(pricing, { input: 0, output: 2, cached: 0.25 });
});
