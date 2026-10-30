import assert from "node:assert/strict";
import test from "node:test";

import { obscurifyProvider } from "../../open-sse/config/providers/registry/obscurify/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

const CHAT_URL = "https://obscurify.ai/v1/chat/completions";
const MODELS_URL = "https://obscurify.ai/v1/models";

test("obscurify is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(obscurifyProvider.id, "obscurify");
  assert.equal(obscurifyProvider.alias, "obscurify");
  assert.equal(obscurifyProvider.format, "openai");
  assert.equal(obscurifyProvider.executor, "default");
  assert.equal(obscurifyProvider.authType, "apikey");
  assert.equal(obscurifyProvider.authHeader, "bearer");
  assert.equal(obscurifyProvider.baseUrl, CHAT_URL);
  assert.equal(obscurifyProvider.modelsUrl, MODELS_URL);
  assert.equal(obscurifyProvider.passthroughModels, true);
});

test("obscurify leaves model discovery to the live /v1/models catalog", () => {
  // The catalog changes as models are added and retired, so nothing is
  // hardcoded: an empty list plus passthroughModels keeps the picker in sync.
  assert.deepEqual(obscurifyProvider.models, []);
});

test("obscurify is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.obscurify?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.obscurify, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.obscurify?.id, "obscurify");
  assert.equal(APIKEY_PROVIDERS.obscurify?.name, "Obscurify.ai");
  assert.ok((await getExecutor("obscurify")) instanceof DefaultExecutor);
});

test("obscurify accepts the lab/model ids its catalog returns", () => {
  assert.equal(isValidModel("obscurify", "deepseek/deepseek-v4-flash"), true);
});

test("obscurify claims no free tier and no unexercised capability", () => {
  const metadata = APIKEY_PROVIDERS.obscurify as Record<string, unknown>;
  assert.equal(metadata.hasFree, undefined);
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
