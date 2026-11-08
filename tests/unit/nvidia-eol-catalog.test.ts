import test from "node:test";
import assert from "node:assert/strict";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import reviewedLiveIds from "../../open-sse/config/nvidiaHostedModels.snapshot.json" with { type: "json" };
import { nvidiaProvider } from "../../open-sse/config/providers/registry/nvidia/index.ts";
import { EMERGENCY_FALLBACK_CONFIG } from "../../open-sse/services/emergencyFallback.ts";
import { calculateCostDetailed } from "../../src/lib/usage/costCalculator.ts";
import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";

const registryIds = new Set(nvidiaProvider.models.map((model) => model.id));

const documentedFreeIds = new Set(
  FREE_MODEL_BUDGETS.filter((model) => model.provider === "nvidia").map((model) => model.modelId)
);

const reviewedIds = new Set(reviewedLiveIds);

const RETIRED_NVIDIA_MODEL_IDS = [
  "z-ai/glm-5.1",
  "z-ai/glm-5.2",
  "deepseek-ai/deepseek-v4-pro",
  "deepseek-ai/deepseek-v4-flash",
  "minimaxai/minimax-m2.7",
  "nvidia/nemotron-3-super-120b-a12b",
  // #18418: NVIDIA answers 410 "reached its end of life" for these four.
  "openai/gpt-oss-120b",
  "moonshotai/kimi-k3",
  "deepseek-ai/deepseek-v4-pro-0813",
  "deepseek-ai/deepseek-v4-flash-0731",
];

test("NVIDIA static catalog metadata excludes superseded model ids", () => {
  for (const modelId of RETIRED_NVIDIA_MODEL_IDS) {
    assert.ok(!registryIds.has(modelId), `${modelId} must not remain in the NVIDIA registry`);
    assert.ok(
      !reviewedIds.has(modelId),
      `${modelId} must not remain in the reviewed NVIDIA hosted-model snapshot`
    );

    assert.ok(
      !documentedFreeIds.has(modelId),
      `${modelId} must not remain in the NVIDIA free-model catalog`
    );
  }
});

test("NVIDIA reviewed snapshot matches the registry and trial entries remain valid", () => {
  assert.deepEqual([...reviewedIds], [...registryIds]);
  for (const modelId of documentedFreeIds) {
    assert.ok(registryIds.has(modelId), `${modelId} must exist in the NVIDIA hosted catalog`);
  }
});

test("emergency budget fallback targets a live NVIDIA free-catalog model (#18418)", () => {
  assert.equal(EMERGENCY_FALLBACK_CONFIG.provider, "nvidia");
  const model = EMERGENCY_FALLBACK_CONFIG.model;
  assert.ok(
    !RETIRED_NVIDIA_MODEL_IDS.includes(model),
    `emergency fallback default ${model} is a retired NVIDIA model`
  );
  assert.ok(registryIds.has(model), `emergency fallback default ${model} must be in the registry`);
  assert.ok(
    documentedFreeIds.has(model),
    `emergency fallback default ${model} must be listed as free for nvidia`
  );
});

test("emergency budget fallback default has a zero-price NVIDIA pricing row (#18418, #12341)", async () => {
  const { provider, model } = EMERGENCY_FALLBACK_CONFIG;
  const pricing = getDefaultPricing() as Record<string, Record<string, Record<string, number>>>;
  assert.deepEqual(
    pricing[provider]?.[model],
    { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 },
    `${provider}/${model} needs a free (all zero) pricing row`
  );
  // Unpriced usage makes USD-limited API keys fail closed (#12341), so one served
  // emergency fallback must not leave unpriced usage behind.
  const result = await calculateCostDetailed(provider, model, { input: 1000, output: 1000 });
  assert.equal(result.priced, true);
  assert.equal(result.costUsd, 0);
});
