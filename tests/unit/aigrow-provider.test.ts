import test from "node:test";
import assert from "node:assert/strict";

import { aigrowProvider } from "../../open-sse/config/providers/registry/aigrow/index.ts";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS } =
  await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { getExecutor, DefaultExecutor } = await import("../../open-sse/executors/index.ts");
const { NAMED_OPENAI_STYLE_PROVIDERS, isNamedOpenAIStyleProvider } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");

const SPEC = {
  id: "aigrow",
  alias: "aigrow",
  name: "AIGROW",
  website: "https://aigrow.gg/ai-api",
  chatUrl: "https://aigrow.gg/v1/chat/completions",
  modelsUrl: "https://aigrow.gg/v1/models",
};

test("AIGROW registry entry uses the standard OpenAI-compatible path", async () => {
  assert.equal(aigrowProvider.id, SPEC.id);
  assert.equal(aigrowProvider.alias, SPEC.alias);
  assert.equal(aigrowProvider.format, "openai");
  assert.equal(aigrowProvider.executor, "default");
  assert.equal(aigrowProvider.authType, "apikey");
  assert.equal(aigrowProvider.authHeader, "bearer");
  assert.equal(aigrowProvider.baseUrl, SPEC.chatUrl);
  assert.equal(aigrowProvider.modelsUrl, SPEC.modelsUrl);
  assert.equal(aigrowProvider.passthroughModels, true);
  assert.deepEqual(aigrowProvider.models, []);
  assert.ok((await getExecutor(SPEC.id)) instanceof DefaultExecutor);
});

test("AIGROW is registered in the provider catalog and endpoint map", () => {
  const entry = APIKEY_PROVIDERS[SPEC.id];
  assert.ok(entry, `APIKEY_PROVIDERS.${SPEC.id} must be defined`);
  assert.equal(entry.id, SPEC.id);
  assert.equal(entry.alias, SPEC.alias);
  assert.equal(entry.name, SPEC.name);
  assert.equal(entry.website, SPEC.website);
  assert.equal(entry.passthroughModels, true);
  assert.equal(entry.hasFree, undefined);
  assert.equal(PROVIDER_ENDPOINTS[SPEC.id], SPEC.chatUrl);
  assert.equal(providerRegistry[SPEC.id], aigrowProvider);
});

test("AIGROW is classified for aggregator UI and live model discovery", () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has(SPEC.id), true);
  assert.equal(NAMED_OPENAI_STYLE_PROVIDERS.has(SPEC.id), true);
  assert.equal(isNamedOpenAIStyleProvider(SPEC.id), true);
});
