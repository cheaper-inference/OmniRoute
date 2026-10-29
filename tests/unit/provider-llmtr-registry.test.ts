import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS } =
  await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { parseModel } = await import("../../open-sse/services/model.ts");

const LLMTR_CHAT_URL = "https://llmtr.com/v1/chat/completions";
const LLMTR_MODELS_URL = "https://llmtr.com/v1/models";

test("llmtr is registered as an API-key gateway provider in the UI catalog", () => {
  const entry = APIKEY_PROVIDERS.llmtr;
  assert.ok(entry, "APIKEY_PROVIDERS.llmtr must be defined");
  assert.equal(entry.id, "llmtr");
  assert.equal(entry.alias, "llmtr");
  assert.equal(entry.name, "LLMTR");
  assert.equal(entry.website, "https://llmtr.com");
  assert.equal(entry.passthroughModels, true);
  assert.notEqual(entry.hasFree, true, "no free-tier claim for a reseller gateway");
  assert.equal(
    entry.apiHint,
    "Create an API key at https://llmtr.com, then paste it here as a Bearer token. " +
      "OpenAI-compatible base URL: https://llmtr.com/v1."
  );
});

test("llmtr registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.llmtr;
  assert.ok(entry, "providerRegistry.llmtr must be defined");
  assert.equal(entry.id, "llmtr");
  assert.equal(entry.alias, "llmtr");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, LLMTR_CHAT_URL);
  assert.equal(entry.modelsUrl, LLMTR_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("llmtr seeds a small chat catalog and accepts other ids via passthrough", () => {
  const ids = providerRegistry.llmtr.models.map((m: { id: string }) => m.id);
  assert.ok(ids.includes("qwen/qwen3.8-27b-free"));
  assert.ok(ids.includes("llmtr/qwen3-8-27b"));
  assert.equal(new Set(ids).size, ids.length, "seed ids must be unique");
  assert.equal(isValidModel("llmtr", "qwen/qwen3.8-27b-free"), true);
  assert.equal(isValidModel("llmtr", "llmtr/qwen3-8-27b"), true);
  assert.equal(isValidModel("llmtr", "some-account-scoped-model"), true);
});

test("llmtr keeps upstream ids that already start with the provider name", () => {
  const hosted = parseModel("llmtr/llmtr/qwen3-8-27b");
  assert.equal(hosted.provider, "llmtr");
  assert.equal(hosted.model, "llmtr/qwen3-8-27b");

  const free = parseModel("llmtr/qwen/qwen3.8-27b-free");
  assert.equal(free.provider, "llmtr");
  assert.equal(free.model, "qwen/qwen3.8-27b-free");
});

test("llmtr default executor targets the LLMTR chat completions endpoint", async () => {
  assert.ok((await getExecutor("llmtr")) instanceof DefaultExecutor);
  const executor = new DefaultExecutor("llmtr");
  assert.equal(executor.buildUrl("qwen/qwen3.8-27b-free", false), LLMTR_CHAT_URL);
  assert.equal(executor.buildUrl("qwen/qwen3.8-27b-free", true), LLMTR_CHAT_URL);
  assert.equal(executor.buildUrl("llmtr/qwen3-8-27b", false), LLMTR_CHAT_URL);
});

test("llmtr is on the aggregator list and display endpoint", () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("llmtr"), true);
  assert.equal(PROVIDER_ENDPOINTS.llmtr, LLMTR_CHAT_URL);
});
