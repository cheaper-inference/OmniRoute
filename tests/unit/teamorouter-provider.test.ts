import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getExecutor, DefaultExecutor } = await import("../../open-sse/executors/index.ts");
const { AGGREGATOR_PROVIDER_IDS, APIKEY_PROVIDERS } =
  await import("../../src/shared/constants/providers.ts");

test("TeamoRouter is registered as a passthrough OpenAI-compatible provider", async () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).teamorouter;

  assert.ok(entry, "TeamoRouter should be present in the executor registry");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.baseUrl, "https://api.teamorouter.com/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://api.teamorouter.com/v1/models");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.passthroughModels, true);
  assert.deepEqual(entry.models, []);
  assert.ok((await getExecutor("teamorouter")) instanceof DefaultExecutor);
});

test("TeamoRouter is listed as an API-key aggregator", () => {
  const meta = (APIKEY_PROVIDERS as Record<string, Record<string, unknown>>).teamorouter;

  assert.ok(meta, "TeamoRouter should have API-key provider metadata");
  assert.equal(meta.id, "teamorouter");
  assert.equal(meta.alias, "teamorouter");
  assert.equal(meta.name, "TeamoRouter");
  assert.equal(meta.website, "https://teamorouter.com");
  assert.equal(meta.passthroughModels, true);
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("teamorouter"), true);
  assert.match(String(meta.apiHint), /https:\/\/api\.teamorouter\.com\/v1/);
});
