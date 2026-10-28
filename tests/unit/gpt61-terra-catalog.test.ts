import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels";
import { getPricingForModel } from "../../src/shared/constants/pricing";
import { getCodexFastCostMultiplier } from "../../src/lib/usage/costCalculator";
import { getModelSpec } from "../../src/shared/constants/modelSpecs";
import { splitCodexReasoningSuffix } from "../../open-sse/executors/codex/reasoningSuffix";
import { CODEX_NATIVE_UNPREFIXED_MODELS } from "../../open-sse/services/model";

const MODEL = "gpt-6.1-terra";
const EFFORTS = ["ultra", "max", "xhigh", "high", "medium", "low"];
const IDS = [MODEL, ...EFFORTS.map((effort) => `${MODEL}-${effort}`)];

test("GPT-6.1 Terra is catalogued for codex and openai with public API limits", () => {
  const codexIds = getModelsByProviderId("codex")
    .map((entry) => entry.id)
    .filter((id) => id.startsWith(MODEL));
  assert.deepEqual(codexIds.sort(), [...IDS].sort());

  const apiIds = getModelsByProviderId("openai")
    .map((entry) => entry.id)
    .filter((id) => id.startsWith(MODEL));
  assert.deepEqual(apiIds, [MODEL]);
  for (const id of IDS) {
    const spec = getModelSpec(id);
    assert.equal(spec?.contextWindow, 1050000);
    assert.equal(spec?.maxOutputTokens, 128000);
  }
});

test("GPT-6.1 Terra pricing uses Standard rates and the >272k long-context tier", () => {
  const api = getPricingForModel("openai", MODEL);
  assert.ok(api);
  assert.equal(api.input, 1);
  assert.equal(api.output, 5);
  assert.equal(api.cached, 0.05);
  assert.equal(api.cache_creation, 1.25);
  assert.equal(api.long_context?.threshold, 272000);
  assert.equal(api.long_context?.input, 2);
  assert.equal(api.long_context?.output, 7.5);

  const codex = getPricingForModel("cx", MODEL);
  assert.ok(codex);
  assert.equal(codex.input, 1);
  assert.equal(codex.output, 5);
  assert.equal(codex.cached, 0.1);
});

test("GPT-6.1 Terra uses the GPT-6 Codex Fast multiplier", () => {
  assert.equal(getCodexFastCostMultiplier("codex", `${MODEL}-ultra`, "fast"), 2.5);
  assert.equal(getCodexFastCostMultiplier("codex", MODEL, "fast"), 2.5);
  assert.equal(getCodexFastCostMultiplier("codex", MODEL, "default"), 1);
});

test("GPT-6.1 Terra keeps Codex native bare ids and effort suffixes", () => {
  for (const id of IDS) {
    assert.ok(CODEX_NATIVE_UNPREFIXED_MODELS.has(id), id);
  }
  for (const effort of EFFORTS) {
    const split = splitCodexReasoningSuffix(`${MODEL}-${effort}`);
    assert.equal(split.baseModel, MODEL);
    assert.equal(split.effort, effort);
  }
  assert.deepEqual(splitCodexReasoningSuffix(MODEL), { baseModel: MODEL, effort: null });
});
