import assert from "node:assert/strict";
import test from "node:test";

import { evrenProvider } from "../../open-sse/config/providers/registry/evren/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CHAT_URL = "https://evren-llmapi.ssyz.org.tr/v1/chat/completions";
const MODELS_URL = "https://evren-llmapi.ssyz.org.tr/v1/models";

test("evren is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(evrenProvider.id, "evren");
  assert.equal(evrenProvider.alias, "evren");
  assert.equal(evrenProvider.format, "openai");
  assert.equal(evrenProvider.executor, "default");
  assert.equal(evrenProvider.authType, "apikey");
  assert.equal(evrenProvider.authHeader, "bearer");
  assert.equal(evrenProvider.baseUrl, CHAT_URL);
  assert.equal(evrenProvider.modelsUrl, MODELS_URL);
  assert.equal(evrenProvider.passthroughModels, true);
});

test("evren declares live-verified vision verdicts and passes the rest through", () => {
  const vision = Object.fromEntries(evrenProvider.models.map((m) => [m.id, m.supportsVision]));
  assert.deepEqual(vision, {
    "qwen3-vl-30b": true,
    "gemma-4-31b": true,
    "qwen3.8-flash-next": true,
    "deepseek-v4.1-flash": true,
    "glm-5.3": false,
  });
});

test("evren vision verdicts reach the resolved capability layer", async () => {
  const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
  assert.equal(getResolvedModelCapabilities("evren/gemma-4-31b")?.supportsVision, true);
  assert.equal(getResolvedModelCapabilities("evren/qwen3-vl-30b")?.supportsVision, true);
  assert.equal(getResolvedModelCapabilities("evren/glm-5.3")?.supportsVision, false);
});

test("evren is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.evren?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.evren, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.evren?.id, "evren");
  assert.equal(APIKEY_PROVIDERS.evren?.alias, "evren");
  assert.ok((await getExecutor("evren")) instanceof DefaultExecutor);
});

test("evren accepts any model name the upstream catalog returns", () => {
  // passthroughModels drives PASSTHROUGH_PROVIDERS, which is what isValidModel
  // consults -- membership of AGGREGATOR_PROVIDER_IDS is not what gates this.
  assert.equal(isValidModel("evren", "future/live-catalog-model"), true);
});

test("evren is not listed as an aggregator", () => {
  // It is an inference provider, not a router over other providers, which is
  // what that set means. Listing it there would misdescribe it in the UI.
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("evren"), false);
});

test("evren claims no provider-wide capability", () => {
  // Vision differs per model (glm-5.3 is text-only), so it is declared on the
  // registry models above, never as a blanket provider-level flag.
  const metadata = APIKEY_PROVIDERS.evren as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
