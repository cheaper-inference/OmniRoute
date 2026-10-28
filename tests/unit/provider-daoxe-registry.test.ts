import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS } =
  await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");

const DAOXE_CHAT_URL = "https://api.daoxe.com/v1/chat/completions";
const DAOXE_MODELS_URL = "https://api.daoxe.com/v1/models";

test("daoxe is registered as an API-key gateway provider in the UI catalog", () => {
  const entry = APIKEY_PROVIDERS.daoxe;
  assert.ok(entry, "APIKEY_PROVIDERS.daoxe must be defined");
  assert.equal(entry.id, "daoxe");
  assert.equal(entry.alias, "daoxe");
  assert.equal(entry.name, "DaoXE");
  assert.equal(entry.website, "https://daoxe.com");
  assert.equal(entry.passthroughModels, true);
  assert.notEqual(entry.hasFree, true, "no free-tier claim for a reseller gateway");
  assert.equal(
    entry.apiHint,
    "Create an API token at https://daoxe.com/token, then paste it here as a Bearer token. " +
      "OpenAI-compatible base URL: https://api.daoxe.com/v1."
  );
});

test("daoxe registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.daoxe;
  assert.ok(entry, "providerRegistry.daoxe must be defined");
  assert.equal(entry.id, "daoxe");
  assert.equal(entry.alias, "daoxe");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, DAOXE_CHAT_URL);
  assert.equal(entry.modelsUrl, DAOXE_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("daoxe seeds a small chat catalog and accepts other ids via passthrough", () => {
  const ids = providerRegistry.daoxe.models.map((m: { id: string }) => m.id);
  assert.ok(ids.includes("claude-sonnet-4-6"));
  assert.ok(ids.includes("gpt-5.5"));
  assert.equal(new Set(ids).size, ids.length, "seed ids must be unique");
  assert.equal(isValidModel("daoxe", "claude-sonnet-4-6"), true);
  assert.equal(isValidModel("daoxe", "some-account-scoped-model"), true);
});

test("daoxe default executor targets the DaoXE chat completions endpoint", async () => {
  assert.ok((await getExecutor("daoxe")) instanceof DefaultExecutor);
  assert.equal(new DefaultExecutor("daoxe").buildUrl("gpt-5.5", false), DAOXE_CHAT_URL);
  assert.equal(new DefaultExecutor("daoxe").buildUrl("gpt-5.5", true), DAOXE_CHAT_URL);
});

test("daoxe is on the aggregator list and display endpoint", () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("daoxe"), true);
  assert.equal(PROVIDER_ENDPOINTS.daoxe, DAOXE_CHAT_URL);
});
