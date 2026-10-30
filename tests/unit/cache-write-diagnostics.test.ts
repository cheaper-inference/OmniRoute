import assert from "node:assert/strict";
import { test } from "node:test";
import { cacheCreationFields, readCacheWriteUsage } from "../../open-sse/utils/cacheWriteUsage.ts";
import { estimateApiEquivalentCacheWrite } from "../../src/lib/usage/cacheWriteEstimate.ts";
import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";
import { normalizeUsage } from "../../open-sse/utils/usageTracking.ts";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";

const cases = [
  {
    name: "missing",
    total: undefined,
    five: undefined,
    hour: undefined,
    status: "unknown",
    unknown: null,
  },
  { name: "legacy", total: 100, five: undefined, hour: undefined, status: "unknown", unknown: 100 },
  { name: "zero", total: 0, five: 0, hour: 0, status: "reported", unknown: 0 },
  { name: "mixed", total: 100, five: 30, hour: 70, status: "reported", unknown: 0 },
  { name: "tier sum only", total: undefined, five: 30, hour: 70, status: "reported", unknown: 0 },
  { name: "partial", total: 100, five: 30, hour: undefined, status: "partial", unknown: 70 },
  {
    name: "partial without total",
    total: undefined,
    five: 30,
    hour: undefined,
    status: "partial",
    unknown: null,
  },
  { name: "conflict greater", total: 10, five: 30, hour: 70, status: "inconsistent", unknown: 10 },
  {
    name: "conflict smaller",
    total: 200,
    five: 30,
    hour: 70,
    status: "inconsistent",
    unknown: 200,
  },
  {
    name: "explicit zero conflict",
    total: 0,
    five: 30,
    hour: 70,
    status: "inconsistent",
    unknown: 0,
  },
  { name: "negative", total: 100, five: -1, hour: 70, status: "invalid", unknown: 100 },
  { name: "nonfinite", total: 100, five: Infinity, hour: 70, status: "invalid", unknown: 100 },
  { name: "NaN", total: 100, five: NaN, hour: 70, status: "invalid", unknown: 100 },
  { name: "string counter", total: 100, five: "30", hour: 70, status: "invalid", unknown: 100 },
] as const;
for (const row of cases) {
  test(`tier diagnostics: ${row.name}`, () => {
    const raw = {
      cache_creation_input_tokens: row.total,
      cache_creation: { ephemeral_5m_input_tokens: row.five, ephemeral_1h_input_tokens: row.hour },
    };
    const result = readCacheWriteUsage(raw);
    assert.equal(result.status, row.status);
    assert.equal(result.unknown, row.unknown);
    const normalized = readCacheWriteUsage(normalizeUsage(raw));
    assert.equal(normalized.status, row.status);
    assert.equal(normalized.unknown, row.unknown);
    for (const container of [
      { ...raw, prompt_tokens: 110, completion_tokens: 2 },
      {
        input_tokens: 110,
        output_tokens: 2,
        input_tokens_details: {
          cache_creation_tokens: row.total,
          cache_creation: raw.cache_creation,
        },
      },
    ]) {
      const extracted = extractUsageFromResponse({ usage: container }, "compatible");
      assert.equal(readCacheWriteUsage(extracted).status, row.status);
    }
  });
}

test("unknown provider fields survive rebuilding without double counting aliases", () => {
  const raw = {
    cache_creation_input_tokens: 100,
    cache_creation: {
      ephemeral_5m_input_tokens: 30,
      ephemeral_1h_input_tokens: 70,
      provider_field: "retained",
    },
    prompt_tokens_details: { cache_creation_tokens: 100 },
  };
  assert.equal(readCacheWriteUsage(raw).total, 100);
  assert.equal(
    (cacheCreationFields(raw).cache_creation as Record<string, unknown>).provider_field,
    "retained"
  );
});

test("diagnostic pricing distinguishes tiers while legacy quota cost is unchanged", () => {
  const pricing = { input: 1, output: 2, cache_creation: 1.25 };
  const options = { provider: "anthropic", model: "claude-synthetic" };
  const usage = {
    prompt_tokens: 110,
    completion_tokens: 2,
    cache_creation_input_tokens: 100,
    cache_creation: { ephemeral_5m_input_tokens: 30, ephemeral_1h_input_tokens: 70 },
  };
  const diagnostic = estimateApiEquivalentCacheWrite(pricing, readCacheWriteUsage(usage), options);
  assert.equal(diagnostic.pricedTokens, 100);
  assert.ok(Math.abs(diagnostic.knownTierCostUsd! - 0.0001775) < 1e-12);
  const { cache_creation: _tiers, ...legacy } = usage;
  assert.equal(
    computeCostFromPricing(pricing, usage, options),
    computeCostFromPricing(pricing, legacy, options)
  );
  assert.ok(Math.abs(computeCostFromPricing(pricing, usage, options) - 0.000139) < 1e-12);
  assert.equal(computeCostFromPricing(pricing, { ...usage, cost_usd: 0.42 }, options), 0.42);
  assert.equal(
    computeCostFromPricing(pricing, { ...usage, cost_in_usd_ticks: 100000000 }, options),
    0.01
  );
  assert.equal(
    computeCostFromPricing(pricing, usage, { provider: "claude", flatRateAsZero: true }),
    0
  );
  assert.equal(
    estimateApiEquivalentCacheWrite(pricing, readCacheWriteUsage(usage), {
      ...options,
      provider: "unsupported",
    }).knownTierCostUsd,
    null
  );
  assert.equal(
    estimateApiEquivalentCacheWrite(
      pricing,
      readCacheWriteUsage({ cache_creation_input_tokens: 100 }),
      options
    ).knownTierCostUsd,
    null
  );
  const partial = estimateApiEquivalentCacheWrite(
    pricing,
    readCacheWriteUsage({
      cache_creation_input_tokens: 100,
      cache_creation: { ephemeral_5m_input_tokens: 30 },
    }),
    options
  );
  assert.equal(partial.pricedTokens, 30);
  assert.ok(Math.abs(partial.knownTierCostUsd! - 0.0000375) < 1e-12);
});
