import assert from "node:assert/strict";
import test from "node:test";
import {
  computeUsageRowCost,
  computeUsageRowStandardCost,
} from "../../src/lib/usage/analyticsPricing.ts";

test(
  "analytics pricing extraction retains provider fallback order and archive semantics",
  { timeout: 1000 },
  () => {
    const row = {
      provider: "fixture",
      model: "fixture-model",
      promptTokens: 100,
      completionTokens: 10,
      cacheReadTokens: 60,
    };
    const pricing = { marker: 7 };
    const calculate = (resolved: Record<string, unknown>, tokens: Record<string, number>) => {
      assert.equal(tokens.input, 100);
      assert.equal(tokens.cacheRead, 60);
      return Number(resolved.marker);
    };
    assert.equal(
      computeUsageRowCost(row, { fixture: { "fixture-model": pricing } }, {}, (m) => m, calculate),
      7
    );
    assert.equal(
      computeUsageRowCost(
        row,
        { alias: { "fixture-model": pricing } },
        { fixture: "alias" },
        (m) => m,
        calculate
      ),
      7
    );
    assert.equal(
      computeUsageRowCost(
        { ...row, provider: "shared" },
        { second: { "fixture-model": pricing } },
        { first: "shared", second: "shared" },
        (m) => m,
        calculate
      ),
      7
    );
    assert.equal(
      computeUsageRowCost(
        { ...row, provider: "fixture-cn" },
        { fixture: { "fixture-model": pricing } },
        {},
        (m) => m,
        calculate
      ),
      7
    );
    assert.equal(
      computeUsageRowCost({ ...row, isAggregated: 1, storedCost: 3 }, {}, {}, (m) => m, calculate),
      3
    );
    assert.equal(
      computeUsageRowCost(
        { ...row, isAggregated: 1, storedCost: 0 },
        { fixture: { "fixture-model": pricing } },
        {},
        (m) => m,
        calculate
      ),
      7
    );
    assert.equal(
      computeUsageRowCost(
        { ...row, model: "fixture-model:free" },
        { fixture: { "fixture-model": pricing } },
        {},
        (m) => m,
        calculate
      ),
      0
    );
  }
);

test("analytics keeps reported cost separate from token-priced usage", { timeout: 1000 }, () => {
  const row = {
    provider: "fixture",
    model: "fixture-model",
    serviceTier: "flex",
    promptTokens: 100,
    completionTokens: 10,
    cacheReadTokens: 60,
    storedCost: 0.25,
    costPromptTokens: 20,
    costCompletionTokens: 2,
    costCacheReadTokens: 12,
    costCacheCreationTokens: 0,
    costReasoningTokens: 0,
  };
  const pricing = { fixture: { "fixture-model": { input: 1 } } };
  const calculate = (
    _pricing: Record<string, unknown>,
    tokens: Record<string, number>,
    options?: Record<string, unknown>
  ) => {
    assert.equal(tokens.input, 20);
    assert.equal(tokens.output, 2);
    assert.equal(tokens.cacheRead, 12);
    return options?.serviceTier === "flex" ? 0.02 : 0.04;
  };
  assert.equal(
    computeUsageRowCost(row, pricing, {}, (m) => m, calculate),
    0.27
  );
  assert.equal(
    computeUsageRowStandardCost(row, pricing, {}, (m) => m, calculate),
    0.29
  );
  assert.equal(
    computeUsageRowCost(row, {}, {}, (m) => m, calculate),
    0.25
  );
  assert.equal(
    computeUsageRowCost({ ...row, provider: "claude" }, {}, {}, (m) => m, calculate),
    0
  );
});

test("historical Moonshot rows use Kimi prices before unrelated model fallback", () => {
  const prices = {
    foreign: { shared: { marker: 99 } },
    moonshot: { shared: { marker: 3, legacy: true }, "moonshot/raw": { marker: 4 } },
    kimi: { shared: { marker: 7 }, "kimi/raw": { marker: 5 } },
  };
  const historical = {
    provider: "moonshot",
    model: "shared",
    promptTokens: 1,
    completionTokens: 0,
  };
  assert.equal(
    computeUsageRowCost(
      historical,
      { foreign: prices.foreign, kimi: prices.kimi },
      {},
      (m) => m,
      (price) => Number(price.marker)
    ),
    7
  );
  for (const provider of ["moonshot", "kimi"]) {
    for (const [model, expected] of [
      ["shared", 7],
      ["moonshot/raw", 4],
      ["kimi/raw", 5],
    ] as const) {
      const row = { provider, model, promptTokens: 1, completionTokens: 0 };
      const calculate = (price: Record<string, unknown>) => {
        if (model === "shared") assert.equal(price.legacy, true);
        return Number(price.marker);
      };
      assert.equal(
        computeUsageRowCost(row, prices, {}, (m) => m, calculate),
        expected
      );
      assert.equal(
        computeUsageRowStandardCost(row, prices, {}, (m) => m, calculate),
        expected
      );
    }
  }
});
