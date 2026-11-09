import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS } =
  await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");

const CHAT_URL = "https://api.demonroute.com/v1/chat/completions";
const MODELS_URL = "https://api.demonroute.com/v1/models";

test("#16979 Demon Route is available on the API-key provider dashboard", () => {
  const entry = APIKEY_PROVIDERS.demonroute;
  assert.ok(entry);
  assert.equal(entry.id, "demonroute");
  assert.equal(entry.alias, "demonroute");
  assert.equal(entry.website, "https://demonroute.com");
  assert.equal(entry.passthroughModels, true);
  assert.ok(entry.serviceKinds.includes("llm"));
  // No embedding model is verified for this gateway yet, so it must not be
  // advertised as an embedding provider.
  assert.equal(entry.serviceKinds.includes("embedding"), false);
  // Free-lane access requires an account deposit; it is not an unconditional free tier.
  assert.notEqual(entry.hasFree, true);
  assert.match(entry.apiHint, /api\.demonroute\.com\/v1/);
});

test("#16979 Demon Route uses OpenAI-compatible bearer auth and key-gated discovery", () => {
  const entry = REGISTRY.demonroute;
  assert.ok(entry);
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, CHAT_URL);
  assert.equal(entry.modelsUrl, MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("#16979 Demon Route preserves slash-qualified model IDs", () => {
  const ids = REGISTRY.demonroute.models.map((model: { id: string }) => model.id);
  assert.ok(ids.includes("TheDrummer/Cydonia-24B-v4.3"));
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(isValidModel("demonroute", "TheDrummer/Cydonia-24B-v4.3"), true);
  assert.equal(isValidModel("demonroute", "vendor/new-uncatalogued-model"), true);
});

test("#16979 Demon Route uses the default chat executor", async () => {
  assert.ok((await getExecutor("demonroute")) instanceof DefaultExecutor);
  assert.equal(
    new DefaultExecutor("demonroute").buildUrl("TheDrummer/Cydonia-24B-v4.3", false),
    CHAT_URL
  );
  assert.equal(
    new DefaultExecutor("demonroute").buildUrl("TheDrummer/Cydonia-24B-v4.3", true),
    CHAT_URL
  );
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("demonroute"), true);
  assert.equal(PROVIDER_ENDPOINTS.demonroute, CHAT_URL);
});

test("#16979 seed model IDs remain case-sensitive and unique", () => {
  const ids = REGISTRY.demonroute.models.map((model: { id: string }) => model.id);
  for (const id of [
    "dphn/Dolphin3.0-Llama3.1-8B",
    "dphn/Dolphin-Mistral-24B-Venice-Edition",
    "TheDrummer/Artemis-31B-v1.2",
    "huihui-ai/Huihui-Qwen3.6-35B-A3B-abliterated",
    "huihui-ai/Huihui-gemma-4-31B-it-abliterated-v2",
  ])
    assert.ok(ids.includes(id), `missing model id: ${id}`);
  assert.equal(new Set(ids).size, ids.length);
});

test("#16979 gateway timeout respects documented slow model behavior", () => {
  assert.equal(REGISTRY.demonroute.timeoutMs, 120_000);
  assert.equal(REGISTRY.demonroute.fetchStartTimeoutCapMs, 120_000);
});

test("#16979 derives embeddings without adding specialty models to chat seeds", async () => {
  const { deriveEmbeddingProviderForChatProvider, parseEmbeddingModel } =
    await import("../../open-sse/config/embeddingRegistry.ts");
  const embedding = deriveEmbeddingProviderForChatProvider("demonroute", REGISTRY.demonroute);
  assert.ok(embedding);
  assert.equal(embedding.baseUrl, "https://api.demonroute.com/v1/embeddings");
  assert.equal(embedding.authHeader, "bearer");
  assert.deepEqual(parseEmbeddingModel("demonroute/org/namespaced-embedding"), {
    provider: "demonroute",
    model: "org/namespaced-embedding",
  });
});

test("#16979 model passthrough keeps exact nested upstream IDs in request payload", () => {
  const executor = new DefaultExecutor("demonroute");
  const model = "huihui-ai/Huihui-Qwen3.6-35B-A3B-abliterated";
  const credential = { apiKey: "unit-test-only" };
  const input = { model, messages: [{ role: "user", content: "hello" }], stream: true };
  const result = executor.transformRequest(model, input, true, credential);
  assert.equal((result as { model: string }).model, model);
  assert.equal(input.model, model);
  assert.equal(executor.buildUrl(model, true), CHAT_URL);
  assert.equal(executor.buildUrl(model, false), CHAT_URL);
});

test("#16979 dashboard model import uses the authenticated live OpenAI-style path", async () => {
  const { isNamedOpenAIStyleProvider } =
    await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");
  const { buildNamedOpenAiStyleHeaders } =
    await import("../../src/app/api/providers/[id]/models/discovery/helpers.ts");
  const { normalizeOpenAiLikeModelsResponse } =
    await import("../../src/app/api/providers/[id]/models/discovery/normalizers.ts");
  const { deriveConfigFromRegistryModelsUrl } =
    await import("../../src/app/api/providers/[id]/models/discoveryConfig.ts");
  const { assembleProviderModelsHeaders } =
    await import("../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts");

  assert.equal(isNamedOpenAIStyleProvider("demonroute"), true);
  const headers = buildNamedOpenAiStyleHeaders("demonroute", "fake-unit-test-key");
  assert.equal(headers.Authorization, "Bearer fake-unit-test-key");
  assert.equal(buildNamedOpenAiStyleHeaders("demonroute", null).Authorization, undefined);

  // The same registry URL remains usable by the ordinary discovery-config fallback.
  const config = deriveConfigFromRegistryModelsUrl("demonroute");
  assert.ok(config);
  assert.equal(config.url, MODELS_URL);
  assert.equal(config.method, "GET");
  assert.equal(
    assembleProviderModelsHeaders(config, "fake-unit-test-key").Authorization,
    "Bearer fake-unit-test-key"
  );

  const model = "huihui-ai/Huihui-Qwen3.6-35B-A3B-abliterated";
  const normalized = normalizeOpenAiLikeModelsResponse(
    {
      object: "list",
      data: [
        { id: model, object: "model", owned_by: "huihui-ai" },
        { id: "TheDrummer/Cydonia-24B-v4.3", name: "Cydonia", owned_by: "TheDrummer" },
        { object: "model", name: "" },
      ],
    },
    "demonroute"
  );
  assert.deepEqual(normalized, [
    { id: model, name: model, owned_by: "huihui-ai" },
    { id: "TheDrummer/Cydonia-24B-v4.3", name: "Cydonia", owned_by: "TheDrummer" },
  ]);
  assert.deepEqual(config.parseResponse({ data: [{ id: model }] }), [{ id: model }]);
});

test("#16979 executor sends Bearer auth and has independent stream/nonstream URL policy", () => {
  const executor = new DefaultExecutor("demonroute");
  const credentials = { apiKey: "fake-unit-test-key" };
  const headersStream = executor.buildHeaders(credentials, true);
  const headersJson = executor.buildHeaders(credentials, false);
  assert.equal(headersStream.Authorization, "Bearer fake-unit-test-key");
  assert.equal(headersJson.Authorization, "Bearer fake-unit-test-key");
  assert.equal(executor.getTimeoutMs(), 120_000);
  assert.equal(executor.buildUrl("vendor/deep/model", true), CHAT_URL);
  assert.equal(executor.buildUrl("vendor/deep/model", false), CHAT_URL);
});
