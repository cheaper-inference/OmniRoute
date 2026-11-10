import test from "node:test";
import assert from "node:assert/strict";

import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";
import { computeUsageRowCost } from "../../src/lib/usage/analyticsPricing.ts";

const HAIKU_LIKE_PRICING = {
  input: 1,
  output: 5,
  cached: 0.1,
  long_context: {
    threshold: 100_000,
    input: 5,
    output: 25,
    cached: 0.5,
  },
};

test("computeCostFromPricing: single request crossing threshold applies long_context tier", () => {
  const singleRequestCost = computeCostFromPricing(
    HAIKU_LIKE_PRICING,
    {
      prompt_tokens: 150_000,
      completion_tokens: 1_000,
    },
    { aggregatedTokens: false }
  );
  // Tier rates: input 5, output 25 -> (150_000 * 5 + 1_000 * 25) / 1e6 = 0.775
  assert.ok(Math.abs(singleRequestCost - 0.775) < 1e-12);
});

test("computeCostFromPricing: aggregatedTokens true skips long_context tier (#19429)", () => {
  const aggregatedDayCost = computeCostFromPricing(
    HAIKU_LIKE_PRICING,
    {
      prompt_tokens: 150_000,
      completion_tokens: 1_000,
    },
    { aggregatedTokens: true }
  );
  // Flat rates: input 1, output 5 -> (150_000 * 1 + 1_000 * 5) / 1e6 = 0.155
  assert.ok(Math.abs(aggregatedDayCost - 0.155) < 1e-12);
});

test("computeUsageRowCost: skips long_context tier for aggregated daily rows (#19429)", () => {
  const row = {
    provider: "anthropic",
    model: "claude-haiku-5-5",
    promptTokens: 150_000,
    completionTokens: 1_000,
    costPromptTokens: 150_000,
    costCompletionTokens: 1_000,
  };

  const pricingByProvider = {
    anthropic: {
      "claude-haiku-5-5": HAIKU_LIKE_PRICING,
    },
  };

  const cost = computeUsageRowCost(
    row,
    pricingByProvider,
    {},
    (m) => m,
    computeCostFromPricing,
    false
  );

  // Flat rates: (150_000 * 1 + 1_000 * 5) / 1e6 = 0.155
  // Overstated long_context cost would be 0.775 (~5x higher)
  assert.ok(
    Math.abs(cost - 0.155) < 1e-12,
    `Expected flat rate cost 0.155 but got ${cost} (overstated by long_context tier)`
  );
});
