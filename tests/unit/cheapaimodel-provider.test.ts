import assert from "node:assert/strict";
import test from "node:test";

import { cheapaimodelProvider } from "../../open-sse/config/providers/registry/cheapaimodel/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CHAT_URL = "https://api.cheapaimodel.ai/v1/chat/completions";
const MODELS_URL = "https://api.cheapaimodel.ai/v1/models";

test("cheapaimodel is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(cheapaimodelProvider.id, "cheapaimodel");
  assert.equal(cheapaimodelProvider.alias, "cheapaimodel");
  assert.equal(cheapaimodelProvider.format, "openai");
  assert.equal(cheapaimodelProvider.executor, "default");
  assert.equal(cheapaimodelProvider.authType, "apikey");
  assert.equal(cheapaimodelProvider.authHeader, "bearer");
  assert.equal(cheapaimodelProvider.baseUrl, CHAT_URL);
  assert.equal(cheapaimodelProvider.modelsUrl, MODELS_URL);
  assert.equal(cheapaimodelProvider.passthroughModels, true);
});

test("cheapaimodel leaves its catalog to live discovery", () => {
  // /v1/models needs the key and the roster changes, so nothing is hardcoded.
  assert.deepEqual(cheapaimodelProvider.models, []);
});

test("cheapaimodel is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.cheapaimodel?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.cheapaimodel, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.cheapaimodel?.id, "cheapaimodel");
  assert.equal(APIKEY_PROVIDERS.cheapaimodel?.alias, "cheapaimodel");
  assert.ok((await getExecutor("cheapaimodel")) instanceof DefaultExecutor);
  assert.equal(isValidModel("cheapaimodel", "future/live-catalog-model"), true);
});

test("cheapaimodel is listed as an aggregator", () => {
  // It resells models served by third-party upstreams rather than running its own inference.
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("cheapaimodel"), true);
});

test("cheapaimodel has no free tier", () => {
  // Prepaid balance only, so the dashboard must not show a Free badge.
  assert.equal(APIKEY_PROVIDERS.cheapaimodel?.hasFree, false);
  assert.equal((APIKEY_PROVIDERS.cheapaimodel as Record<string, unknown>).freeNote, undefined);
});

test("cheapaimodel's hint names the base URL and the key page", () => {
  const hint = String(APIKEY_PROVIDERS.cheapaimodel?.apiHint ?? "");
  assert.match(hint, /https:\/\/api\.cheapaimodel\.ai\/v1 /);
  assert.match(hint, /https:\/\/console\.cheapaimodel\.ai\/keys/);
  assert.match(hint, /Chat Completions only/);
});

test("cheapaimodel claims no capability that was not exercised", () => {
  const metadata = APIKEY_PROVIDERS.cheapaimodel as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
