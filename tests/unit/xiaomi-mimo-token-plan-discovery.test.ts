import test from "node:test";
import assert from "node:assert/strict";

import { xiaomi_mimo_token_planProvider } from "../../open-sse/config/providers/registry/xiaomi-mimo-token-plan/index.ts";
import { getDiscoveryClass } from "../../src/lib/providerModels/discoveryClass.ts";

const SPEC_MODELS_URL = "https://token-plan-sgp.xiaomimimo.com/v1/models";

test("xiaomi-mimo-token-plan registry entry exposes its modelsUrl", () => {
  assert.equal(xiaomi_mimo_token_planProvider.id, "xiaomi-mimo-token-plan");
  assert.equal(xiaomi_mimo_token_planProvider.modelsUrl, SPEC_MODELS_URL);
});

test("getDiscoveryClass classifies xiaomi-mimo-token-plan as openai-compat", () => {
  assert.equal(getDiscoveryClass("xiaomi-mimo-token-plan"), "openai-compat");
});
