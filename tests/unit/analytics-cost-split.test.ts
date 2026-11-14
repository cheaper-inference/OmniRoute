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
});

test("a provider-reported cost is billed, and the row adds no estimate", () => {
  // Rows carrying provider_cost_usd have their cost tokens excluded upstream.
  const row = { provider: "fixture", model: "fixture-model", storedCost: 2.5 };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  assert.deepEqual(split, { total: 2.5, reported: 2.5, estimated: 0 });
});

test("a reported cost survives when the model has no catalog pricing", () => {
  const row = { provider: "fixture", model: "unpriced-model", storedCost: 3 };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  assert.deepEqual(split, { total: 3, reported: 3, estimated: 0 });
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

test("an archived rollup keeps its stored cost on the reported side", () => {
  const row = {
    provider: "fixture",
    model: "fixture-model",
    isAggregated: 1,
    storedCost: 4,
    promptTokens: 100,
  };
  const split = splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate);
  assert.deepEqual(split, { total: 4, reported: 4, estimated: 0 });
});

test("flat-rate providers read as zero unless estimates are requested", () => {
  const row = { provider: "claude", model: "fixture-model", promptTokens: 100 };
  assert.deepEqual(
    splitUsageRowCost(row, pricingByProvider, {}, (m) => m, calculate),
    {
      total: 0,
      reported: 0,
      estimated: 0,
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
    { provider: "fixture", model: "fixture-model", isAggregated: 1, storedCost: 4 },
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
      near(split.reported + split.estimated, split.total);
    }
  }
});
