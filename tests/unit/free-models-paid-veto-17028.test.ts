import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isFreeModel,
  isModelFreeBadge,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

// Synthetic evidence on a catalogued identity; these are not assertions of live Baidu prices.
const catalogId = "ernie-4.0-8k";
const paid = { id: catalogId, pricing: { prompt: "4", completion: "16" } };

test("#17028 positive payload price vetoes a catalogued free model", () => {
  assert.equal(isFreeModel("baidu", paid), false);
});
test("#17028 free-only import excludes the catalogued paid payload", () => {
  assert.deepEqual(selectModelsForImport("baidu", [paid], true), {
    models: [],
    freeFilterEmpty: true,
  });
});
test("#17028 normal and strict Free badges respect the paid payload", () => {
  assert.equal(isModelFreeBadge("baidu", paid), false);
  assert.equal(isModelFreeBadge("baidu", paid, { strict: true }), false);
});

for (const evidence of [
  { pricing: { prompt: 1, completion: 0 } },
  { pricing: { input: 0, output: "1" } },
  { pricing: { prompt: 0, completion: 0, request: "0.01" } },
  { pricing: { prompt: 0, completion: 0, audio: { input: "0.1" } } },
  { isFree: true, free: false },
  { isFree: true, is_free: false },
  { isFree: true, pricing: { free: false } },
]) {
  test(`#17028 paid evidence overrides catalog/labels: ${JSON.stringify(evidence)}`, () => {
    const model = { id: catalogId, name: "Free promotional model", ...evidence };
    assert.equal(isFreeModel("baidu", model), false);
    assert.equal(isModelFreeBadge("baidu", model), false);
    assert.equal(isModelFreeBadge("baidu", model, { strict: true }), false);
    assert.deepEqual(selectModelsForImport("baidu", [model], true).models, []);
  });
}

test("#17028 a paid suffix or explicit optimistic flag cannot regain a Free badge", () => {
  for (const provider of ["openrouter", "ollamacloud", "openai-compatible-fixture"]) {
    const model = { id: "fixture:free", free: true, pricing: { prompt: 1, completion: 0 } };
    assert.equal(isFreeModel(provider, model), false);
    assert.equal(isModelFreeBadge(provider, model), false);
    assert.equal(isModelFreeBadge(provider, model, { strict: true }), false);
  }
});

test("#17028 zero and unknown evidence preserve their existing provider gates", () => {
  assert.equal(isFreeModel("baidu", { id: catalogId }), true);
  assert.equal(isFreeModel("baidu", { id: catalogId, pricing: {} }), true);
  const zero = { id: "fixture", pricing: { input: 0, output: "0", discount: 2 } };
  assert.equal(isFreeModel("openrouter", zero), true);
  assert.equal(isFreeModel("ollamacloud", zero), true);
  assert.equal(isFreeModel("anthropic", zero), false);
  assert.equal(isFreeModel("openrouter", { id: "unknown-fixture" }), false);
  assert.equal(isFreeModel("siliconflow", { id: catalogId }), false);
});

test("#17028 disabling free-only still imports the untouched fetched list", () => {
  const list = [paid];
  assert.equal(selectModelsForImport("baidu", list, false).models, list);
});
