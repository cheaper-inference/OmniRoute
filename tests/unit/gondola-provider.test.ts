import assert from "node:assert/strict";
import test from "node:test";

import { gondolaProvider } from "../../open-sse/config/providers/registry/gondola/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

const CHAT_URL = "https://api.gondola-ai.com/v1/chat/completions";
const MODELS_URL = "https://api.gondola-ai.com/v1/models";

test("gondola is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(gondolaProvider.id, "gondola");
  assert.equal(gondolaProvider.alias, "gondola");
  assert.equal(gondolaProvider.format, "openai");
  assert.equal(gondolaProvider.executor, "default");
  assert.equal(gondolaProvider.authType, "apikey");
  assert.equal(gondolaProvider.authHeader, "bearer");
  assert.equal(gondolaProvider.baseUrl, CHAT_URL);
  assert.equal(gondolaProvider.modelsUrl, MODELS_URL);
  assert.equal(gondolaProvider.passthroughModels, true);
});

test("gondola leaves model discovery to the live upstream catalog", () => {
  // The public /v1/models catalog changes as models are listed and retired,
  // so nothing is hardcoded.
  assert.deepEqual(gondolaProvider.models, []);
});

test("gondola is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.gondola?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.gondola, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.gondola?.id, "gondola");
  assert.equal(APIKEY_PROVIDERS.gondola?.alias, "gondola");
  assert.ok((await getExecutor("gondola")) instanceof DefaultExecutor);
});

test("gondola accepts any model name the upstream catalog returns", () => {
  assert.equal(isValidModel("gondola", "future/live-catalog-model"), true);
});

test("gondola advertises no free inference allowance", () => {
  // Credit is prepaid, and hasFree drives a "Free" badge in the picker.
  assert.equal(APIKEY_PROVIDERS.gondola?.hasFree, false);
});

test("gondola declares no per-model capability", () => {
  // Tool calling and vision vary by model in the live catalog, so the entry
  // declares neither.
  const metadata = APIKEY_PROVIDERS.gondola as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared provider-wide`);
  }
});
