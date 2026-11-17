import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getExecutor, DefaultExecutor } = await import("../../open-sse/executors/index.ts");
const { AGGREGATOR_PROVIDER_IDS, APIKEY_PROVIDERS } =
  await import("../../src/shared/constants/providers.ts");

test("TeaPotRouter is registered as a passthrough OpenAI-compatible provider", async () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).teapotrouter;

  assert.ok(entry, "TeaPotRouter should be present in the executor registry");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.baseUrl, "https://api.teapotrouter.com/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://api.teapotrouter.com/v1/models");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.passthroughModels, true);
  assert.deepEqual(entry.models, []);
  assert.ok((await getExecutor("teapotrouter")) instanceof DefaultExecutor);
});

test("TeaPotRouter is listed as an API-key aggregator gateway", () => {
  const meta = (APIKEY_PROVIDERS as Record<string, Record<string, unknown>>).teapotrouter;

  assert.ok(meta, "TeaPotRouter should have API-key provider metadata");
  assert.equal(meta.id, "teapotrouter");
  assert.equal(meta.alias, "teapotrouter");
  assert.equal(meta.name, "TeaPotRouter");
  assert.equal(meta.website, "https://teapotrouter.com");
  assert.equal(meta.passthroughModels, true);
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("teapotrouter"), true);
  assert.match(String(meta.apiHint), /https:\/\/api\.teapotrouter\.com\/v1/);
});
