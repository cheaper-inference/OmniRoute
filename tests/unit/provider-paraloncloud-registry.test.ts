// ParalonCloud (https://paraloncloud.com) — OpenAI-compatible API-key host covering chat
// (/v1/chat/completions), embeddings (/v1/embeddings) and a key-gated /v1/models list.
import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, resolveProviderId } =
  await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { resolveProviderAlias } = await import("../../open-sse/services/providerAlias.ts");
const { getEmbeddingProvider, getEmbeddingDimension, parseEmbeddingModel } =
  await import("../../open-sse/config/embeddingRegistry.ts");
const { isNamedOpenAIStyleProvider } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");

const PARALON_API = "https://paraloncloud.com/v1";

test("paraloncloud is registered as an API-key provider in the UI catalog", () => {
  const entry = APIKEY_PROVIDERS.paraloncloud;
  assert.ok(entry, "APIKEY_PROVIDERS.paraloncloud must be defined");
  assert.equal(entry.id, "paraloncloud");
  assert.equal(entry.alias, "paralon");
  assert.equal(entry.name, "ParalonCloud");
  assert.equal(entry.website, "https://paraloncloud.com");
  assert.equal(entry.textIcon, "PC");
  assert.deepEqual(entry.serviceKinds, ["llm", "embedding"]);
  assert.equal(entry.notice?.apiKeyUrl, "https://paraloncloud.com/console");
});

test("paraloncloud chat registry entry is OpenAI-compatible with live model discovery", () => {
  const entry = providerRegistry.paraloncloud;
  assert.ok(entry, "providerRegistry.paraloncloud must be defined");
  assert.equal(entry.id, "paraloncloud");
  assert.equal(entry.alias, "paralon");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, `${PARALON_API}/chat/completions`);
  assert.equal(entry.modelsUrl, `${PARALON_API}/models`);
  assert.equal(PROVIDER_ENDPOINTS.paraloncloud, `${PARALON_API}/chat/completions`);
  const ids = entry.models.map((m: { id: string }) => m.id);
  assert.deepEqual(ids, ["qwen3.8-27b", "qwen3-3b"]);
  assert.equal(isNamedOpenAIStyleProvider("paraloncloud"), true);
});

test("paralon alias resolves to the paraloncloud provider id", () => {
  assert.equal(resolveProviderId("paralon"), "paraloncloud");
  assert.equal(resolveProviderAlias("paralon"), "paraloncloud");
  assert.equal(resolveProviderAlias("paraloncloud"), "paraloncloud");
});

test("paraloncloud default executor targets the chat completions endpoint", async () => {
  assert.ok((await getExecutor("paraloncloud")) instanceof DefaultExecutor);
  assert.equal(
    new DefaultExecutor("paraloncloud").buildUrl("qwen3-3b", false),
    `${PARALON_API}/chat/completions`
  );
});

test("paraloncloud resolves in the embedding registry", () => {
  const embedding = getEmbeddingProvider("paraloncloud");
  assert.equal(embedding?.baseUrl, `${PARALON_API}/embeddings`);
  assert.equal(embedding?.authHeader, "bearer");
  assert.equal(getEmbeddingDimension("paraloncloud/multilingual-e5-small"), 384);
  assert.deepEqual(parseEmbeddingModel("paraloncloud/multilingual-e5-small"), {
    provider: "paraloncloud",
    model: "multilingual-e5-small",
  });
  assert.deepEqual(parseEmbeddingModel("paralon/multilingual-e5-small"), {
    provider: "paraloncloud",
    model: "multilingual-e5-small",
  });
});
