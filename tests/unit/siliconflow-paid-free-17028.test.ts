import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  FREE_MODEL_BUDGETS,
  computeFreeModelTotals,
} from "../../open-sse/config/freeModelCatalog.ts";
import {
  isCatalogFreeModel,
  isFreeForProvider,
  isFreeModel,
  isModelFreeBadge,
  isPaidModelTarget,
  providerHasFreeModels,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";
import { hasPayloadPaidEvidence } from "../../src/shared/utils/payloadFreeEvidence.ts";

const formerlyMisclassifiedIds = [
  "deepseek-ai/DeepSeek-V3.2",
  "deepseek-ai/DeepSeek-V3.1",
  "deepseek-ai/DeepSeek-R1",
  "Qwen/Qwen3-235B-A22B-Instruct-2507",
  "Qwen/Qwen3-Coder-480B-A35B-Instruct",
  "Qwen/Qwen3-32B",
  "moonshotai/Kimi-K2.5",
  "zai-org/GLM-4.7",
  "openai/gpt-oss-120b",
  "baidu/ERNIE-4.5-300B-A47B",
];

describe("#17028 SiliconFlow pay-as-you-go model protection", () => {
  it("retains honest release catalog counts and never counts SiliconFlow as statically uncapped", () => {
    const totals = computeFreeModelTotals();
    assert.equal(totals.modelCount, 471);
    assert.equal(totals.poolCount, 34);
    assert.equal(totals.uncappedProviders.includes("siliconflow"), false);
  });

  it("vetoes any contradictory paid flag, including nested pricing and is_free badges", () => {
    const id = formerlyMisclassifiedIds[0];
    const contradictions = [
      { id, isFree: true, free: false },
      { id, isFree: true, is_free: false },
      { id, is_free: true, pricing: { isFree: false } },
      { id, free: true, pricing: { free: false } },
    ];
    for (const model of contradictions) {
      assert.equal(hasPayloadPaidEvidence(model), true);
      assert.equal(isFreeModel("siliconflow", model), false);
      assert.equal(isModelFreeBadge("siliconflow", model), false);
    }
    assert.equal(isModelFreeBadge("siliconflow", { id, is_free: true }), true);
    assert.equal(isModelFreeBadge("siliconflow", { id, is_free: false }), false);
  });

  it("removes the ten paid flagship ids from unconditional free-tier catalog decisions", () => {
    const listed = new Set(
      FREE_MODEL_BUDGETS.filter((row) => row.provider === "siliconflow").map((row) => row.modelId)
    );
    for (const id of formerlyMisclassifiedIds) {
      assert.equal(listed.has(id), false, id);
      assert.equal(isCatalogFreeModel("siliconflow", id), false, id);
      assert.equal(isFreeModel("siliconflow", { id }), false, id);
      assert.equal(isFreeForProvider("siliconflow", { id }), false, id);
      assert.equal(isPaidModelTarget(`siliconflow/${id}`), "paid", id);
    }
  });

  it("rejects explicit and price-based paid evidence even with an optimistic free hint", () => {
    const id = formerlyMisclassifiedIds[2];
    const priced = { id, pricing: { prompt: "4", completion: "16" }, isFree: true };
    assert.equal(hasPayloadPaidEvidence(priced), true);
    assert.equal(isFreeModel("siliconflow", priced), false);
    assert.equal(
      isFreeModel("siliconflow", { id, free: true, pricing: { input: 0, output: 16 } }),
      false
    );
    assert.equal(
      isFreeModel("siliconflow", { id, free: false, pricing: { prompt: 0, completion: 0 } }),
      false
    );
    assert.equal(isModelFreeBadge("siliconflow", { ...priced, name: "DeepSeek R1 Free" }), false);
    assert.equal(
      isModelFreeBadge("siliconflow", { ...priced, name: "DeepSeek R1 Free" }, { strict: true }),
      false
    );
    assert.equal(isModelFreeBadge("siliconflow", { id, name: "DeepSeek R1 Free" }), false);
  });

  it("allows only genuinely free-labelled live model rows, without static assumptions", () => {
    const verifiedLiveFree = { id: "Qwen/Qwen2-7B-Instruct", isFree: true };
    const zeroPrice = { id: "provider-free-model", pricing: { prompt: "0", completion: "0" } };
    const unknown = { id: formerlyMisclassifiedIds[1] };
    const priced = { id: formerlyMisclassifiedIds[0], pricing: { input: "4", output: "6" } };
    assert.equal(providerHasFreeModels("siliconflow"), true);
    assert.equal(isFreeModel("siliconflow", verifiedLiveFree), true);
    assert.equal(isFreeModel("siliconflow", zeroPrice), true);
    const imported = selectModelsForImport(
      "siliconflow",
      [verifiedLiveFree, zeroPrice, unknown, priced],
      true
    );
    assert.deepEqual(imported.models, [verifiedLiveFree, zeroPrice]);
    assert.equal(imported.freeFilterEmpty, false);
    assert.deepEqual(selectModelsForImport("siliconflow", [unknown, priced], true), {
      models: [],
      freeFilterEmpty: true,
    });
    assert.equal(isModelFreeBadge("siliconflow", { ...verifiedLiveFree, name: "Qwen 2 7B" }), true);
    assert.equal(isModelFreeBadge("siliconflow", { id: unknown.id, free: "true" }), false);
  });

  it("keeps other providers' static free lists intact", () => {
    const staticFree = FREE_MODEL_BUDGETS.find(
      (row) => row.provider !== "siliconflow" && row.freeType === "recurring-daily"
    );
    assert.ok(staticFree);
    assert.equal(isFreeModel(staticFree.provider, { id: staticFree.modelId }), true);
  });
});
