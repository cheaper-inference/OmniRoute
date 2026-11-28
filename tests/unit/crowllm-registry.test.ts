import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");

// Endpoint facts from a live probe on 2026-11-23: GET /v1/models answers 200
// without a key but 401s "Invalid token" on a wrong Bearer, and
// /v1/chat/completions 401s without a key.
const CROWLLM_CHAT_URL = "https://crowllm.com/v1/chat/completions";

test("crowllm is registered as an API-key gateway provider", () => {
  const entry = APIKEY_PROVIDERS.crowllm;
  assert.ok(entry, "APIKEY_PROVIDERS.crowllm must be defined");
  assert.equal(entry.id, "crowllm");
  assert.equal(entry.alias, "crowllm");
  assert.equal(entry.name, "CrowLLM");
  assert.equal(entry.website, "https://crowllm.com");
  assert.equal(entry.passthroughModels, true);
});

test("crowllm registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.crowllm;
  assert.ok(entry, "providerRegistry.crowllm must be defined");
  assert.equal(entry.id, "crowllm");
  assert.equal(entry.alias, "crowllm");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, CROWLLM_CHAT_URL);
  assert.equal(entry.passthroughModels, true);
});

test("crowllm discovers models live via passthrough (no static seed list)", () => {
  assert.deepEqual(providerRegistry.crowllm.models, []);
  assert.equal(providerRegistry.crowllm.passthroughModels, true);
  assert.equal(providerRegistry.crowllm.modelsUrl, "https://crowllm.com/v1/models");
});

test("crowllm accepts any model id via passthrough", () => {
  assert.equal(isValidModel("crowllm", "grok-4.7:free"), true);
  assert.equal(isValidModel("crowllm", "glm-5.3"), true);
});
