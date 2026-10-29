import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import {
  isCatalogFreeModel,
  isFreeModel,
  isModelFreeBadge,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

// Official Ollama PAYG sources checked 2026-10-27/28 name these exact API IDs.
// gemma4:31b is bound by https://ollama.com/library/gemma4:31b-cloud.
// This removes a static grant; it does not infer a legacy account's entitlement.
const pricedCloudIds = [
  "deepseek-v4-pro",
  "kimi-k2.6",
  "minimax-m2.7",
  "nemotron-3-super",
  "gemma4:31b",
];

for (const id of pricedCloudIds) {
  test(`#17028 Ollama ${id} needs live free evidence, not a static grant`, () => {
    const model = { id };
    assert.equal(isCatalogFreeModel("ollama-cloud", id), false);
    assert.equal(isFreeModel("ollama-cloud", model), false);
    assert.equal(isModelFreeBadge("ollama-cloud", model), false);
    assert.deepEqual(selectModelsForImport("ollama-cloud", [model], true).models, []);
    assert.deepEqual(selectModelsForImport("ollama-cloud", [model], false), {
      models: [model],
      freeFilterEmpty: false,
    });
    // Account-specific affirmative evidence remains usable; contradictory prices still veto it.
    assert.equal(isFreeModel("ollama-cloud", { id, isFree: true }), true);
    assert.equal(isFreeModel("ollama-cloud", { id, isFree: true, pricing: { input: 1 } }), false);
  });
}

test("#17028 seven exact free offers have evidence while regional and account gaps remain debt", () => {
  const policy = JSON.parse(
    readFileSync(
      new URL("../../config/quality/free-catalog-evidence.json", import.meta.url),
      "utf8"
    )
  );
  const evidence = new Set(
    policy.evidence.map(
      (row: { provider: string; modelId: string }) => `${row.provider}/${row.modelId}`
    )
  );
  for (const key of [
    "agnes/agnes-2.5-flash",
    "agnes/agnes-3.0-flash",
    "gemini/gemini-2.5-flash",
    "gemini/gemini-2.5-flash-lite",
    "glm-cn/glm-4.5-flash",
    "requesty/mistral/leanstral-1-5",
    "requesty/nvidia/nemotron-3-nano-30b-a3b",
  ]) {
    assert.ok(evidence.has(key), key);
    assert.equal(policy.debt.includes(key), false, key);
  }
  for (const key of [
    "agnes-cn/agnes-2.5-flash",
    "aion/aion-labs/aion-3.0",
    "ollama-cloud/qwen3.5:397b",
  ]) {
    assert.equal(evidence.has(key), false, key);
    assert.ok(policy.debt.includes(key), key);
  }
});

test("#17028 Requesty NVIDIA trial retains its published training and use restrictions", () => {
  const row = FREE_MODEL_BUDGETS.find(
    (model) => model.provider === "requesty" && model.modelId === "nvidia/nemotron-3-nano-30b-a3b"
  );
  assert.ok(row);
  assert.equal(row.trainsOnPrompts, true);
  assert.equal(row.tos, "caution");
});
