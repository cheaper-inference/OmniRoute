import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getExecutor, DefaultExecutor } = await import("../../open-sse/executors/index.ts");
const { AGGREGATOR_PROVIDER_IDS, APIKEY_PROVIDERS } =
  await import("../../src/shared/constants/providers.ts");
const { isFreeModel } = await import("../../src/shared/utils/freeModels.ts");

test("Token Harbor is registered as a passthrough OpenAI-compatible provider", async () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).tokenharbor;

  assert.ok(entry, "Token Harbor should be present in the executor registry");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.baseUrl, "https://tokenharbor.ai/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://tokenharbor.ai/v1/models");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.passthroughModels, true);
  assert.deepEqual(entry.models, []);
  assert.ok((await getExecutor("tokenharbor")) instanceof DefaultExecutor);
});

test("Token Harbor is listed as an API-key aggregator with verified free-tier details", () => {
  const meta = (APIKEY_PROVIDERS as Record<string, Record<string, unknown>>).tokenharbor;

  assert.ok(meta, "Token Harbor should have API-key provider metadata");
  assert.equal(meta.id, "tokenharbor");
  assert.equal(meta.alias, "tokenharbor");
  assert.equal(meta.name, "Token Harbor");
  assert.equal(meta.website, "https://tokenharbor.ai");
  assert.equal(meta.hasFree, true);
  assert.equal(meta.passthroughModels, true);
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("tokenharbor"), true);
  assert.match(String(meta.apiHint), /https:\/\/tokenharbor\.ai\/v1/);
  assert.match(String(meta.freeNote), /claude-haiku-5\.5:free/);
  assert.match(String(meta.freeNote), /rolling 7-day/i);
  assert.match(String(meta.freeNote), /retained/i);
});

test("Token Harbor's explicit free model IDs are recognized, but paid IDs are not", () => {
  assert.equal(isFreeModel("tokenharbor", { id: "claude-haiku-5.5:free" }), true);
  assert.equal(isFreeModel("tokenharbor", { id: "claude-haiku-5.5" }), false);
});
