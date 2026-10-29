import assert from "node:assert/strict";
import test from "node:test";

import { paraloncloudProvider } from "../../open-sse/config/providers/registry/paraloncloud/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
const { NAMED_OPENAI_STYLE_PROVIDERS } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");

const CHAT_URL = "https://paraloncloud.com/v1/chat/completions";
const RESPONSES_URL = "https://paraloncloud.com/v1/responses";
const MODELS_URL = "https://paraloncloud.com/v1/models";

test("paraloncloud is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(paraloncloudProvider.id, "paraloncloud");
  assert.equal(paraloncloudProvider.alias, "paraloncloud");
  assert.equal(paraloncloudProvider.format, "openai");
  assert.equal(paraloncloudProvider.executor, "default");
  assert.equal(paraloncloudProvider.authType, "apikey");
  assert.equal(paraloncloudProvider.authHeader, "bearer");
  assert.equal(paraloncloudProvider.baseUrl, CHAT_URL);
  assert.equal(paraloncloudProvider.responsesBaseUrl, RESPONSES_URL);
  assert.equal(paraloncloudProvider.modelsUrl, MODELS_URL);
  assert.equal(paraloncloudProvider.passthroughModels, true);
});

test("paraloncloud seeds its two chat models as the offline fallback", () => {
  assert.deepEqual(
    paraloncloudProvider.models.map((m) => [m.id, m.contextLength]),
    [
      ["qwen3.8-27b", 131072],
      ["qwen3-3b", 16384],
    ]
  );
});

test("paraloncloud is wired through registry, metadata, endpoint, discovery and executor", async () => {
  assert.equal(REGISTRY.paraloncloud, paraloncloudProvider);
  assert.equal(PROVIDER_ENDPOINTS.paraloncloud, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.paraloncloud?.id, "paraloncloud");
  assert.equal(APIKEY_PROVIDERS.paraloncloud?.passthroughModels, true);
  assert.equal(NAMED_OPENAI_STYLE_PROVIDERS.has("paraloncloud"), true);
  assert.ok((await getExecutor("paraloncloud")) instanceof DefaultExecutor);
});

test("paraloncloud accepts any model name the live catalog returns", () => {
  assert.equal(isValidModel("paraloncloud", "future/live-catalog-model"), true);
});

test("paraloncloud is not listed as an aggregator", () => {
  // It serves its own models on its own GPU network; it does not route to other APIs.
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("paraloncloud"), false);
});
