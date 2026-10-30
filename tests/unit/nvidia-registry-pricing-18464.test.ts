import test from "node:test";
import assert from "node:assert/strict";

import { nvidiaProvider } from "../../open-sse/config/providers/registry/nvidia/index.ts";
import { calculateCostDetailed } from "../../src/lib/usage/costCalculator.ts";
import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";

// #18464: every NVIDIA registry model runs on NVIDIA's free hosted endpoint, which is
// rate limited and has no per-token price listed. A registry model without a pricing row is
// reported unpriced, and an API key with a USD limit then fails closed (#12341)
// after a single request to it.
//
// Ids that the fix for #18418 handles instead of this one. It removes the
// first three from the registry, because NVIDIA retired them (410 end of life), and
// adds the zero row for the fourth. Once that fix is merged, this list can be emptied.
const HANDLED_BY_18418 = new Set<string>([
  "moonshotai/kimi-k3",
  "deepseek-ai/deepseek-v4-pro-0813",
  "deepseek-ai/deepseek-v4-flash-0731",
  "nvidia/nemotron-3.5-super-vl-120b-a12b",
]);

const ZERO_ROW = { input: 0, output: 0, cached: 0, reasoning: 0, cache_creation: 0 };

const checkedIds = nvidiaProvider.models
  .map((model) => model.id)
  .filter((id) => !HANDLED_BY_18418.has(id));

test("every NVIDIA registry model has a zero-price pricing row (#18464, #12341)", async () => {
  const pricing = getDefaultPricing() as Record<string, Record<string, Record<string, number>>>;
  assert.ok(checkedIds.length > 0, "the nvidia registry walk must check at least one model");
  const unpriced: string[] = [];
  for (const id of checkedIds) {
    const result = await calculateCostDetailed("nvidia", id, { input: 1000, output: 1000 });
    if (!result.priced) {
      unpriced.push(id);
      continue;
    }
    assert.equal(result.costUsd, 0, `nvidia/${id} is a free endpoint and must cost 0`);
    assert.deepEqual(pricing.nvidia?.[id], ZERO_ROW, `nvidia/${id} needs an all zero row`);
  }
  assert.deepEqual(
    unpriced,
    [],
    `NVIDIA registry models without a pricing row: ${unpriced.join(", ")}`
  );
});
