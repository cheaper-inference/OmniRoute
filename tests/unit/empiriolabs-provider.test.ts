import assert from "node:assert/strict";
import test from "node:test";

import { empiriolabsProvider } from "../../open-sse/config/providers/registry/empiriolabs/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_MODELS_CONFIG, parseEmpirioLabsChatModels } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts");
const { NAMED_OPENAI_STYLE_PROVIDERS } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const CHAT_URL = "https://api.empiriolabs.ai/v1/chat/completions";
const MODELS_URL = "https://api.empiriolabs.ai/v1/models";
const KEY_CHECK_URL = "https://api.empiriolabs.ai/v1/account/usage?limit=1";
const GOOD_KEY = "empirio-valid-key";
const BAD_KEY = "empirio-invalid-key";

const CHAT_ENDPOINTS = ["POST /v1/chat/completions", "POST /v1/responses", "POST /v1/messages"];

/**
 * Stub fetch with the live API behavior: /v1/models is public (200 for any or no
 * key), /v1/account/usage answers 200 for a valid key and 401 otherwise.
 */
function stubEmpirioLabsApi() {
  const calls: string[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const headers = new Headers(
      init?.headers ?? (input instanceof Request ? input.headers : undefined)
    );
    calls.push(url);
    if (url.startsWith("https://api.empiriolabs.ai/v1/account/usage")) {
      if (headers.get("authorization") === `Bearer ${GOOD_KEY}`) {
        return new Response(
          JSON.stringify({ object: "account_usage", balance: { amount: 1, currency: "USD" } }),
          { status: 200 }
        );
      }
      return new Response(
        JSON.stringify({ error: { code: "invalid_api_key", message: "Invalid API key." } }),
        { status: 401 }
      );
    }
    if (url.startsWith(MODELS_URL)) {
      return new Response(JSON.stringify({ object: "list", data: [] }), { status: 200 });
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

test("empiriolabs is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(empiriolabsProvider.id, "empiriolabs");
  assert.equal(empiriolabsProvider.alias, "empiriolabs");
  assert.equal(empiriolabsProvider.format, "openai");
  assert.equal(empiriolabsProvider.executor, "default");
  assert.equal(empiriolabsProvider.authType, "apikey");
  assert.equal(empiriolabsProvider.authHeader, "bearer");
  assert.equal(empiriolabsProvider.baseUrl, CHAT_URL);
  assert.equal(empiriolabsProvider.testKeyModelsUrl, KEY_CHECK_URL);
  assert.equal(empiriolabsProvider.passthroughModels, true);
});

test("empiriolabs seeds its chat models as the offline fallback", () => {
  assert.deepEqual(
    empiriolabsProvider.models.map((m) => [m.id, m.contextLength, m.supportsVision === true]),
    [
      ["qwen3-8-flash", 1000000, true],
      ["qwen3-7-max", 1000000, false],
      ["glm-5-3", 1000000, false],
      ["kimi-k2-7-code", 256000, true],
      ["deepseek-v4-pro", 1000000, false],
      ["deepseek-v4-1-flash", 1000000, true],
      ["minimax-m3", 1000000, true],
    ]
  );
});

test("empiriolabs is wired through registry, metadata, endpoint, discovery and executor", async () => {
  assert.equal(REGISTRY.empiriolabs, empiriolabsProvider);
  assert.equal(PROVIDER_ENDPOINTS.empiriolabs, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.empiriolabs?.id, "empiriolabs");
  assert.equal(APIKEY_PROVIDERS.empiriolabs?.alias, "empiriolabs");
  assert.equal(APIKEY_PROVIDERS.empiriolabs?.name, "EmpirioLabs AI");
  assert.deepEqual(APIKEY_PROVIDERS.empiriolabs?.serviceKinds, ["llm"]);
  assert.equal(PROVIDER_MODELS_CONFIG.empiriolabs?.url, MODELS_URL);
  assert.equal(PROVIDER_MODELS_CONFIG.empiriolabs?.parseResponse, parseEmpirioLabsChatModels);
  // The generic OpenAI-style discovery path lists every catalog id unfiltered.
  assert.equal(NAMED_OPENAI_STYLE_PROVIDERS.has("empiriolabs"), false);
  assert.ok((await getExecutor("empiriolabs")) instanceof DefaultExecutor);
});

test("empiriolabs accepts any model name the live catalog returns", () => {
  assert.equal(isValidModel("empiriolabs", "future/live-catalog-model"), true);
});

test("empiriolabs discovery keeps chat completions models with their limits", () => {
  const models = parseEmpirioLabsChatModels({
    object: "list",
    data: [
      {
        id: "qwen3-8-flash",
        display_name: "Qwen3.8 Flash",
        supported_endpoints: CHAT_ENDPOINTS,
        input_modalities: ["text", "image", "video"],
        output_modalities: ["text"],
        context_window: 1000000,
        max_output_tokens: 131072,
      },
      {
        id: "deepseek-v4-pro",
        display_name: "DeepSeek V4 Pro",
        supported_endpoints: CHAT_ENDPOINTS,
        input_modalities: ["text"],
        output_modalities: ["text"],
        context_window: 1000000,
        max_output_tokens: 393216,
      },
      {
        id: "qwen-image-3-0",
        display_name: "Qwen Image 3.0",
        supported_endpoints: ["POST /v1/images/generations"],
        input_modalities: ["text", "image"],
        output_modalities: ["image"],
      },
      {
        id: "text-embedding-v4",
        display_name: "Text Embedding v4",
        supported_endpoints: ["POST /v1/embeddings"],
        input_modalities: ["text"],
        output_modalities: ["embedding"],
        context_window: 8192,
      },
      { id: "no-endpoint-metadata" },
    ],
  });

  assert.deepEqual(models, [
    {
      id: "qwen3-8-flash",
      name: "Qwen3.8 Flash",
      contextLength: 1000000,
      outputTokenLimit: 131072,
      supportsVision: true,
    },
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      contextLength: 1000000,
      outputTokenLimit: 393216,
    },
  ]);
});

test("empiriolabs discovery returns nothing for an unexpected payload", () => {
  assert.deepEqual(parseEmpirioLabsChatModels(null), []);
  assert.deepEqual(parseEmpirioLabsChatModels({ models: [{ id: "x" }] }), []);
  assert.deepEqual(
    parseEmpirioLabsChatModels({ data: [{ supported_endpoints: CHAT_ENDPOINTS }] }),
    []
  );
});

test("empiriolabs marks a bad key invalid even though the public /v1/models answers 200", async () => {
  const stub = stubEmpirioLabsApi();
  try {
    const result = await validateProviderApiKey({ provider: "empiriolabs", apiKey: BAD_KEY });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
    assert.deepEqual(stub.calls, [KEY_CHECK_URL]);
  } finally {
    stub.restore();
  }
});

test("empiriolabs marks a good key valid on the account usage endpoint", async () => {
  const stub = stubEmpirioLabsApi();
  try {
    const result = await validateProviderApiKey({ provider: "empiriolabs", apiKey: GOOD_KEY });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    assert.deepEqual(stub.calls, [KEY_CHECK_URL]);
  } finally {
    stub.restore();
  }
});

test("empiriolabs is not listed as an aggregator", () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("empiriolabs"), false);
});

test("empiriolabs advertises no free tier", () => {
  assert.equal(APIKEY_PROVIDERS.empiriolabs?.hasFree, false);
  assert.equal(APIKEY_PROVIDERS.empiriolabs?.freeNote, undefined);
});

test("empiriolabs claims no capability that was not exercised", () => {
  const metadata = APIKEY_PROVIDERS.empiriolabs as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
