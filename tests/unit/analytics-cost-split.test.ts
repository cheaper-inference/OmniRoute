import assert from "node:assert/strict";
import test from "node:test";
import { computeUsageRowCost, splitUsageRowCost } from "../../src/lib/usage/analyticsPricing.ts";

// Token-aware stand-in for the catalog calculator: input $0.01 per token,
// output $0.02, so a row whose cost tokens were excluded upstream prices at 0.
const calculate = (_pricing: unknown, tokens: Record<string, number>) =>
  (tokens.input + tokens.cacheRead) * 0.01 + tokens.output * 0.02;
const pricingByProvider = { fixture: { "fixture-model": {} } };
const near = (actual: number, expected: number) =>
  assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);

test("a token-priced row is reported as estimated cost only", () => {
  const row = {
    provider: "fixture",
    model: "fixture-model",
    promptTokens: 100,
    completionTokens: 10,
  };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  near(split.total, 1.2);
  near(split.estimated, 1.2);
  assert.equal(split.reported, 0);
  assert.equal(split.unknown, 0);
});

test("a provider-reported cost is billed, and the row adds no estimate", () => {
  // Rows carrying provider_cost_usd have their cost tokens excluded upstream;
  // reportedCost is the provider_cost_usd share of the stored cost.
  const row = { provider: "fixture", model: "fixture-model", storedCost: 2.5, reportedCost: 2.5 };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  assert.deepEqual(split, { total: 2.5, reported: 2.5, estimated: 0, unknown: 0 });
});

test("a stored calculated_cost_usd snapshot is a catalog estimate, not a bill", () => {
  // Only calculated_cost_usd (migration 237) is set: the stored cost was priced
  // from the catalog at request time, so nothing of it was reported upstream.
  const row = { provider: "fixture", model: "fixture-model", storedCost: 2.5, reportedCost: 0 };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  assert.deepEqual(split, { total: 2.5, reported: 0, estimated: 2.5, unknown: 0 });
  const noProvenance = { provider: "fixture", model: "fixture-model", storedCost: 2.5 };
  assert.deepEqual(
    splitUsageRowCost(noProvenance, pricingByProvider, {}, (m) => m, calculate),
    {
      total: 2.5,
      reported: 0,
      estimated: 2.5,
      unknown: 0,
    }
  );
});

test("a grouped row splits its stored cost between reported and calculated parts", () => {
  // One provider-reported request ($1), one calculated snapshot ($2) and one
  // unpriced request whose 100 input tokens are priced now ($1).
  const row = {
    provider: "fixture",
    model: "fixture-model",
    storedCost: 3,
    reportedCost: 1,
    costPromptTokens: 100,
  };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  near(split.total, 4);
  near(split.reported, 1);
  near(split.estimated, 3);
  assert.equal(split.unknown, 0);
});

test("a reported cost survives when the model has no catalog pricing", () => {
  const row = { provider: "fixture", model: "unpriced-model", storedCost: 3, reportedCost: 3 };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  assert.deepEqual(split, { total: 3, reported: 3, estimated: 0, unknown: 0 });
  const calculated = { provider: "fixture", model: "unpriced-model", storedCost: 3 };
  assert.deepEqual(
    splitUsageRowCost(calculated, pricingByProvider, {}, (m) => m, calculate),
    {
      total: 3,
      reported: 0,
      estimated: 3,
      unknown: 0,
    }
  );
});

test("rows without a provider or model contribute nothing", () => {
  const noProvider = { model: "fixture-model", promptTokens: 100 };
  const noModel = { provider: "fixture", promptTokens: 100 };
  for (const row of [noProvider, noModel]) {
    assert.deepEqual(
      splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate),
      {
        total: 0,
        reported: 0,
        estimated: 0,
        unknown: 0,
      }
    );
  }
});

test("cache-read tokens are priced through the catalog calculator", () => {
  const row = {
    provider: "fixture",
    model: "fixture-model",
    promptTokens: 20,
    cacheReadTokens: 80,
  };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  near(split.estimated, 1);
  assert.equal(split.reported, 0);
});

test("an archived rollup's stored cost has unknown provenance", () => {
  // daily_usage_summary.total_cost mixes provider-reported and catalog-priced
  // requests with no record of which was which, so it is neither a bill nor
  // an estimate we can vouch for.
  const row = {
    provider: "fixture",
    model: "fixture-model",
    isAggregated: 1,
    storedCost: 4,
    promptTokens: 100,
  };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  assert.deepEqual(split, { total: 4, reported: 0, estimated: 0, unknown: 4 });
});

test("a legacy zero-cost rollup is priced from its tokens as an estimate", () => {
  const row = {
    provider: "fixture",
    model: "fixture-model",
    isAggregated: 1,
    storedCost: 0,
    promptTokens: 100,
  };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  near(split.total, 1);
  near(split.estimated, 1);
  assert.equal(split.reported, 0);
  assert.equal(split.unknown, 0);
});

test("flat-rate providers read as zero unless estimates are requested", () => {
  const row = { provider: "claude", model: "fixture-model", promptTokens: 100 };
  assert.deepEqual(
    splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate),
    {
      total: 0,
      reported: 0,
      estimated: 0,
      unknown: 0,
    }
  );
  const priced = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate, false);
  near(priced.total, 1);
  near(priced.estimated, 1);
  assert.equal(priced.reported, 0);
});

test("the split always adds up to the cost the summary already shows", () => {
  const rows = [
    { provider: "fixture", model: "fixture-model", promptTokens: 100 },
    { provider: "fixture", model: "fixture-model", storedCost: 2.5 },
    { provider: "fixture", model: "fixture-model", storedCost: 2.5, reportedCost: 2.5 },
    {
      provider: "fixture",
      model: "fixture-model",
      storedCost: 3,
      reportedCost: 1,
      promptTokens: 9,
    },
    { provider: "fixture", model: "fixture-model", isAggregated: 1, storedCost: 4 },
    { provider: "fixture", model: "fixture-model", isAggregated: 1, promptTokens: 7 },
    { provider: "claude", model: "fixture-model", promptTokens: 100 },
  ];
  for (const row of rows) {
    for (const flatRateAsZero of [true, false]) {
      const split = splitUsageRowCost(
        row,
        pricingByProvider,
        {},
        (m) => m,
        calculate,
        flatRateAsZero
      );
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        {},
        (m) => m,
        calculate,
        flatRateAsZero
      );
      near(split.total, cost);
      near(split.reported + split.estimated + split.unknown, split.total);
    }
  }
});

test("the split prices summed rows without the per-request long-context tier (#19429)", async () => {
  const { computeCostFromPricing } = await import("../../src/lib/usage/costCalculator.ts");
  const pricing = {
    fixture: {
      "fixture-model": {
        input: 1,
        output: 5,
        cached: 0.1,
        long_context: { threshold: 100_000, input: 5, output: 25, cached: 0.5 },
      },
    },
  };
  // An analytics row sums many requests, so its 150k input must not trip the tier.
  const row = {
    provider: "fixture",
    model: "fixture-model",
    promptTokens: 150_000,
    completionTokens: 1_000,
  };
  const split = splitUsageRowCost(row, pricing, {}, (m) => m, computeCostFromPricing);
  const cost = computeUsageRowCost(row, pricing, {}, (m) => m, computeCostFromPricing);
  near(cost, 0.155);
  near(split.total, cost);
  near(split.estimated, 0.155);
  assert.equal(split.reported, 0);
  assert.equal(split.unknown, 0);
});
