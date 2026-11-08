import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS } =
  await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");

const GISOO_CHAT_URL = "https://gisoo.pro/api/v1/chat/completions";
const GISOO_MODELS_URL = "https://gisoo.pro/api/v1/models";

test("gisoo is registered as an API-key gateway provider in the UI catalog", () => {
  const entry = APIKEY_PROVIDERS.gisoo;
  assert.ok(entry, "APIKEY_PROVIDERS.gisoo must be defined");
  assert.equal(entry.id, "gisoo");
  assert.equal(entry.alias, "gisoo");
  assert.equal(entry.name, "Gisoo");
  assert.equal(entry.website, "https://gisoo.pro");
  assert.equal(entry.passthroughModels, true);
  assert.notEqual(
    (entry as Record<string, unknown>).hasFree,
    true,
    "no free-tier claim for a prepaid relay"
  );
  assert.equal(
    entry.apiHint,
    "Create an API key in your Gisoo account, then paste it here as a Bearer token. " +
      "OpenAI-compatible base URL: https://gisoo.pro/api/v1. Prepaid credit; no free tier."
  );
});

test("gisoo registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.gisoo;
  assert.ok(entry, "providerRegistry.gisoo must be defined");
  assert.equal(entry.id, "gisoo");
  assert.equal(entry.alias, "gisoo");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, GISOO_CHAT_URL);
  assert.equal(entry.modelsUrl, GISOO_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("gisoo seeds a small chat catalog and accepts other ids via passthrough", () => {
  const ids = providerRegistry.gisoo.models.map((m: { id: string }) => m.id);
  assert.ok(ids.includes("claude-sonnet-5-5"));
  assert.ok(ids.includes("gpt-5.5"));
  assert.equal(new Set(ids).size, ids.length, "seed ids must be unique");
  assert.equal(isValidModel("gisoo", "claude-sonnet-5-5"), true);
  assert.equal(isValidModel("gisoo", "some-account-scoped-model"), true);
});

test("gisoo default executor targets the Gisoo chat completions endpoint", async () => {
  assert.ok((await getExecutor("gisoo")) instanceof DefaultExecutor);
  assert.equal(new DefaultExecutor("gisoo").buildUrl("gpt-5.5", false), GISOO_CHAT_URL);
  assert.equal(new DefaultExecutor("gisoo").buildUrl("gpt-5.5", true), GISOO_CHAT_URL);
});

test("gisoo is on the aggregator list and display endpoint", () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("gisoo"), true);
  assert.equal(PROVIDER_ENDPOINTS.gisoo, GISOO_CHAT_URL);
});
