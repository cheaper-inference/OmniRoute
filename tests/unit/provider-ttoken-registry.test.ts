// TTOken (https://ttoken.dev) — Indonesian pay-per-token gateway, OpenAI-compatible `/v1`:
// chat on /v1/chat/completions and a key-scoped /v1/models list.
import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS, resolveProviderId } =
  await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { parseModel } = await import("../../open-sse/services/model.ts");
const { isNamedOpenAIStyleProvider } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");

const TTOKEN_CHAT_URL = "https://api.ttoken.dev/v1/chat/completions";
const TTOKEN_MODELS_URL = "https://api.ttoken.dev/v1/models";

test("ttoken is registered as an API-key gateway provider in the UI catalog", () => {
  const entry = APIKEY_PROVIDERS.ttoken;
  assert.ok(entry, "APIKEY_PROVIDERS.ttoken must be defined");
  assert.equal(entry.id, "ttoken");
  assert.equal(entry.alias, "ttoken");
  assert.equal(entry.name, "TTOken");
  assert.equal(entry.website, "https://ttoken.dev");
  assert.equal(entry.textIcon, "TT");
  assert.deepEqual(entry.serviceKinds, ["llm"]);
  assert.equal(entry.passthroughModels, true);
  assert.equal(entry.notice?.apiKeyUrl, "https://ttoken.dev/dashboard/keys");
  assert.notEqual(
    (entry as Record<string, unknown>).hasFree,
    true,
    "no free-tier claim for a pay-per-token gateway"
  );
});

test("ttoken registry entry uses OpenAI format with bearer API-key auth and live discovery", () => {
  const entry = providerRegistry.ttoken;
  assert.ok(entry, "providerRegistry.ttoken must be defined");
  assert.equal(entry.id, "ttoken");
  assert.equal(entry.alias, "ttoken");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, TTOKEN_CHAT_URL);
  assert.equal(entry.modelsUrl, TTOKEN_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
  assert.equal(isNamedOpenAIStyleProvider("ttoken"), true);
});

test("ttoken seeds vendor-prefixed chat ids and accepts other ids via passthrough", () => {
  const ids = providerRegistry.ttoken.models.map((m: { id: string }) => m.id);
  assert.ok(ids.includes("deepseek/deepseek-v4.1-flash"));
  assert.ok(ids.includes("ttoken/auto"));
  assert.equal(new Set(ids).size, ids.length, "seed ids must be unique");
  assert.equal(
    ids.some((id: string) => id.includes("uncensored")),
    false,
    "the approval-gated model is not seeded"
  );
  assert.equal(isValidModel("ttoken", "deepseek/deepseek-v4.1-flash"), true);
  assert.equal(isValidModel("ttoken", "some/key-scoped-model"), true);
});

test("a full ttoken id splits on the first slash and keeps the vendor prefix", () => {
  const parsed = parseModel("ttoken/deepseek/deepseek-v4.1-flash");
  assert.equal(parsed.provider, "ttoken");
  assert.equal(parsed.model, "deepseek/deepseek-v4.1-flash");
  assert.equal(parseModel("ttoken/ttoken/auto").model, "ttoken/auto");
  assert.equal(resolveProviderId("ttoken"), "ttoken");
});

test("ttoken default executor targets the TTOken chat completions endpoint", async () => {
  assert.ok((await getExecutor("ttoken")) instanceof DefaultExecutor);
  assert.equal(
    new DefaultExecutor("ttoken").buildUrl("deepseek/deepseek-v4.1-flash", false),
    TTOKEN_CHAT_URL
  );
  assert.equal(
    new DefaultExecutor("ttoken").buildUrl("deepseek/deepseek-v4.1-flash", true),
    TTOKEN_CHAT_URL
  );
});

test("ttoken is on the aggregator list and display endpoint", () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("ttoken"), true);
  assert.equal(PROVIDER_ENDPOINTS.ttoken, TTOKEN_CHAT_URL);
});
