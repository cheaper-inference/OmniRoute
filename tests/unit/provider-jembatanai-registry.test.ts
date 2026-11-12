import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS } =
  await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { isNamedOpenAIStyleProvider } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");

const JEMBATANAI_CHAT_URL = "https://freeai.jembatanai.com/v1/chat/completions";
const JEMBATANAI_MODELS_URL = "https://freeai.jembatanai.com/v1/models";

test("jembatanai is registered as an API-key gateway provider in the UI catalog", () => {
  const entry = APIKEY_PROVIDERS.jembatanai;
  assert.ok(entry, "APIKEY_PROVIDERS.jembatanai must be defined");
  assert.equal(entry.id, "jembatanai");
  assert.equal(entry.alias, "jembatanai");
  assert.equal(entry.name, "JembatanAI");
  assert.equal(entry.website, "https://jembatanai.com");
  assert.equal(entry.passthroughModels, true);
  assert.notEqual(
    (entry as Record<string, unknown>).hasFree,
    true,
    "a trial key is not a free tier; no hasFree flag"
  );
  assert.match(entry.apiHint, /https:\/\/freeai\.jembatanai\.com\/v1/);
});

test("jembatanai registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.jembatanai;
  assert.ok(entry, "providerRegistry.jembatanai must be defined");
  assert.equal(entry.id, "jembatanai");
  assert.equal(entry.alias, "jembatanai");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, JEMBATANAI_CHAT_URL);
  assert.equal(entry.modelsUrl, JEMBATANAI_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("jembatanai seeds the base catalog and accepts other ids via passthrough", () => {
  const ids = providerRegistry.jembatanai.models.map((m: { id: string }) => m.id);
  assert.ok(ids.includes("anthropic/claude-sonnet-5"));
  assert.ok(ids.includes("deepseek/deepseek-v4.1-flash"));
  for (const id of [
    "deepseek/deepseek-v4-pro-0813",
    "minimax/minimax-m3.1-flash",
    "z-ai/glm-5.3-flash",
  ]) {
    assert.ok(ids.includes(id), `offline seed must list ${id}`);
  }
  assert.equal(new Set(ids).size, ids.length, "seed ids must be unique");
  assert.equal(isValidModel("jembatanai", "z-ai/glm-5.2"), true);
  assert.equal(isValidModel("jembatanai", "some-key-scoped-model"), true);
});

test("jembatanai default executor targets the JembatanAI chat completions endpoint", async () => {
  assert.ok((await getExecutor("jembatanai")) instanceof DefaultExecutor);
  assert.equal(
    new DefaultExecutor("jembatanai").buildUrl("z-ai/glm-5.2", false),
    JEMBATANAI_CHAT_URL
  );
  assert.equal(
    new DefaultExecutor("jembatanai").buildUrl("z-ai/glm-5.2", true),
    JEMBATANAI_CHAT_URL
  );
});

test("jembatanai is on the aggregator list, display endpoint and key-scoped discovery set", () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("jembatanai"), true);
  assert.equal(PROVIDER_ENDPOINTS.jembatanai, JEMBATANAI_CHAT_URL);
  assert.equal(isNamedOpenAIStyleProvider("jembatanai"), true);
});
