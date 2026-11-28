import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { trustedrouterProvider } from "../../open-sse/config/providers/registry/trustedrouter/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { getEmbeddingDimension, getEmbeddingProvider, parseEmbeddingModel } =
  await import("../../open-sse/config/embeddingRegistry.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_MODELS_CONFIG, parseTrustedRouterChatModels } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts");
const { HARDCODED_MODELS_CONFIG_IDS } =
  await import("../../src/lib/providerModels/hardcodedModelsConfigIds.ts");
const { NAMED_OPENAI_STYLE_PROVIDERS } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const CHAT_URL = "https://api.trustedrouter.com/v1/chat/completions";
const RESPONSES_URL = "https://api.trustedrouter.com/v1/responses";
const EMBEDDINGS_URL = "https://api.trustedrouter.com/v1/embeddings";
const MODELS_URL = "https://api.trustedrouter.com/v1/models";
const KEY_CHECK_URL = "https://api.trustedrouter.com/v1/key";
const GOOD_KEY = "tr-valid-test-key";
const BAD_KEY = "tr-invalid-test-key";

/**
 * Stub fetch with live TrustedRouter API behavior: /v1/models is public (200 for
 * any or no key), while /v1/key answers 200 for a valid key and 401 otherwise.
 */
function stubTrustedRouterApi() {
  const calls: string[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const headers = new Headers(
      init?.headers ?? (input instanceof Request ? input.headers : undefined)
    );
    calls.push(url);
    if (url.startsWith(KEY_CHECK_URL)) {
      if (headers.get("authorization") === `Bearer ${GOOD_KEY}`) {
        return new Response(JSON.stringify({ data: { label: "test-key", limit: null } }), {
          status: 200,
        });
      }
      return new Response(
        JSON.stringify({
          error: { code: 401, message: "Invalid API key", type: "invalid_api_key" },
        }),
        { status: 401 }
      );
    }
    if (url.startsWith(MODELS_URL)) {
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }
    return new Response("{}", { status: 404 });
  }) as typeof fetch;
  return {
    calls,
    restore: () => {
      globalThis.fetch = originalFetch;
    },
  };
}

test("trustedrouter is an OpenAI-compatible Bearer registry entry with Responses and key validation", () => {
  assert.equal(trustedrouterProvider.id, "trustedrouter");
  assert.equal(trustedrouterProvider.alias, "trustedrouter");
  assert.equal(trustedrouterProvider.format, "openai");
  assert.equal(trustedrouterProvider.executor, "default");
  assert.equal(trustedrouterProvider.authType, "apikey");
  assert.equal(trustedrouterProvider.authHeader, "bearer");
  assert.equal(trustedrouterProvider.baseUrl, CHAT_URL);
  assert.equal(trustedrouterProvider.responsesBaseUrl, RESPONSES_URL);
  assert.equal(trustedrouterProvider.testKeyModelsUrl, KEY_CHECK_URL);
  assert.equal(trustedrouterProvider.passthroughModels, true);
  assert.equal(trustedrouterProvider.defaultContextLength, 128000);
});

test("trustedrouter seeds routing presets and flagship fallback models without shadowing direct vendors", () => {
  const ids = trustedrouterProvider.models.map((m) => m.id);
  for (const requiredId of [
    "trustedrouter/auto",
    "trustedrouter/zdr",
    "trustedrouter/e2e",
    "trustedrouter/trusted",
    "trustedrouter/confidential",
    "trustedrouter/free",
    "deepseek/deepseek-v4-flash",
    "anthropic/claude-sonnet-4.6",
  ]) {
    assert.ok(ids.includes(requiredId), `expected seed model ${requiredId}`);
  }

  for (const model of trustedrouterProvider.models) {
    if (!model.id.startsWith("trustedrouter/")) {
      assert.equal(
        model.requiresProviderPrefix,
        true,
        `${model.id} must require provider prefix so it never shadows a direct vendor`
      );
    }
  }
});

test("trustedrouter is wired through registry, metadata, endpoint, discovery, embeddings, icon, and executor", async () => {
  assert.equal(REGISTRY.trustedrouter, trustedrouterProvider);
  assert.equal(PROVIDER_ENDPOINTS.trustedrouter, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.trustedrouter?.id, "trustedrouter");
  assert.equal(APIKEY_PROVIDERS.trustedrouter?.alias, "trustedrouter");
  assert.equal(APIKEY_PROVIDERS.trustedrouter?.name, "TrustedRouter");
  assert.equal(APIKEY_PROVIDERS.trustedrouter?.website, "https://trustedrouter.com");
  assert.equal(APIKEY_PROVIDERS.trustedrouter?.passthroughModels, true);
  assert.equal(APIKEY_PROVIDERS.trustedrouter?.hasFree, true);
  assert.deepEqual(APIKEY_PROVIDERS.trustedrouter?.serviceKinds, ["llm", "embedding"]);
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("trustedrouter"), true);

  assert.equal(PROVIDER_MODELS_CONFIG.trustedrouter?.url, MODELS_URL);
  assert.equal(PROVIDER_MODELS_CONFIG.trustedrouter?.parseResponse, parseTrustedRouterChatModels);
  assert.equal(HARDCODED_MODELS_CONFIG_IDS.has("trustedrouter"), true);
  // Uses PROVIDER_MODELS_CONFIG custom parser rather than unfiltered NAMED_OPENAI_STYLE_PROVIDERS.
  assert.equal(NAMED_OPENAI_STYLE_PROVIDERS.has("trustedrouter"), false);

  assert.ok((await getExecutor("trustedrouter")) instanceof DefaultExecutor);
  assert.equal(
    new DefaultExecutor("trustedrouter").buildUrl("trustedrouter/auto", false),
    CHAT_URL
  );

  assert.equal(
    existsSync(join(process.cwd(), "public/providers/trustedrouter.svg")),
    true,
    "expected bundled public/providers/trustedrouter.svg"
  );
});

test("trustedrouter accepts any live catalog model via passthrough", () => {
  assert.equal(isValidModel("trustedrouter", "trustedrouter/auto"), true);
  assert.equal(isValidModel("trustedrouter", "nyte/zdr"), true);
  assert.equal(isValidModel("trustedrouter", "future-vendor/live-catalog-model"), true);
});

test("trustedrouter discovery keeps visible chat models with limits and capabilities and filters non-chat rows", () => {
  const models = parseTrustedRouterChatModels({
    data: [
      {
        id: "trustedrouter/auto",
        name: "TrustedRouter Auto",
        context_length: 1048576,
        architecture: { input_modalities: ["text", "image"], output_modalities: ["text"] },
        top_provider: { context_length: 1048576, max_completion_tokens: null },
        supported_parameters: ["tools", "max_tokens", "response_format"],
        trustedrouter: {
          supports_chat: true,
          supports_responses: true,
          supports_embeddings: false,
          configuration_hidden: false,
          internal_only: false,
          synthetic_monitor: false,
        },
      },
      {
        id: "anthropic/claude-sonnet-4.6",
        name: "Anthropic: Claude Sonnet 4.6",
        context_length: 1000000,
        architecture: { input_modalities: ["text", "image"], output_modalities: ["text"] },
        top_provider: { context_length: 1000000, max_completion_tokens: 128000 },
        supported_parameters: ["tools", "reasoning", "max_tokens"],
        trustedrouter: {
          supports_chat: true,
          supports_responses: true,
          supports_embeddings: false,
          configuration_hidden: false,
          internal_only: false,
          synthetic_monitor: false,
        },
      },
      {
        id: "trustedrouter/athena-1.0",
        name: "Hidden Preset",
        context_length: 200000,
        trustedrouter: { supports_chat: true, configuration_hidden: true },
      },
      {
        id: "trustedrouter/internal-probe",
        name: "Internal Probe",
        context_length: 128000,
        trustedrouter: { supports_chat: true, internal_only: true },
      },
      {
        id: "trustedrouter/synthetic-probe",
        name: "Synthetic Probe",
        context_length: 128000,
        trustedrouter: { supports_chat: true, synthetic_monitor: true },
      },
      {
        id: "openai/text-embedding-3-small",
        name: "OpenAI Text Embedding 3 Small",
        context_length: 8191,
        trustedrouter: { supports_chat: false, supports_embeddings: true },
      },
      {
        id: "decisionmodelsio/s1-fast",
        name: "Decision Model",
        trustedrouter: { supports_chat: false, supports_decide: true },
      },
      { id: "missing-metadata" },
    ],
  });

  assert.deepEqual(models, [
    {
      id: "trustedrouter/auto",
      name: "TrustedRouter Auto",
      contextLength: 1048576,
      supportsVision: true,
      supportsTools: true,
    },
    {
      id: "anthropic/claude-sonnet-4.6",
      name: "Anthropic: Claude Sonnet 4.6",
      contextLength: 1000000,
      outputTokenLimit: 128000,
      supportsVision: true,
      supportsTools: true,
      supportsThinking: true,
    },
  ]);
});

test("trustedrouter discovery returns empty array for malformed payloads", () => {
  assert.deepEqual(parseTrustedRouterChatModels(null), []);
  assert.deepEqual(parseTrustedRouterChatModels({ models: [{ id: "x" }] }), []);
  assert.deepEqual(
    parseTrustedRouterChatModels({ data: [{ trustedrouter: { supports_chat: true } }] }),
    []
  );
});

test("trustedrouter marks a bad key invalid via /v1/key even though /v1/models is public", async () => {
  const stub = stubTrustedRouterApi();
  try {
    const result = await validateProviderApiKey({ provider: "trustedrouter", apiKey: BAD_KEY });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
    assert.deepEqual(stub.calls, [KEY_CHECK_URL]);
  } finally {
    stub.restore();
  }
});

test("trustedrouter marks a good key valid via /v1/key", async () => {
  const stub = stubTrustedRouterApi();
  try {
    const result = await validateProviderApiKey({ provider: "trustedrouter", apiKey: GOOD_KEY });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    assert.deepEqual(stub.calls, [KEY_CHECK_URL]);
  } finally {
    stub.restore();
  }
});

test("trustedrouter resolves in the embedding registry", () => {
  const embedding = getEmbeddingProvider("trustedrouter");
  assert.ok(embedding, "trustedrouter must be registered in EMBEDDING_PROVIDERS");
  assert.equal(embedding.baseUrl, EMBEDDINGS_URL);
  assert.equal(embedding.authType, "apikey");
  assert.equal(embedding.authHeader, "bearer");
  assert.equal(getEmbeddingDimension("trustedrouter/openai/text-embedding-3-small"), 1536);
  assert.equal(getEmbeddingDimension("trustedrouter/qwen/qwen3-embedding-8b"), 4096);
  assert.deepEqual(parseEmbeddingModel("trustedrouter/openai/text-embedding-3-small"), {
    provider: "trustedrouter",
    model: "openai/text-embedding-3-small",
  });
  assert.deepEqual(parseEmbeddingModel("trustedrouter/cohere/embed-v4.0"), {
    provider: "trustedrouter",
    model: "cohere/embed-v4.0",
  });
});
