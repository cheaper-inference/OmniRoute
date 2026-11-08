import test from "node:test";
import assert from "node:assert/strict";

import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";
import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";
import { pricingFieldsSchema } from "../../src/shared/validation/schemas/pricing.ts";

// Long-context pricing tiers: OpenAI bills prompts with >272K input tokens at 2x input/cache
// and 1.5x output for the full request; xAI bills prompts with >=200K tokens at the long-context
// rate. The tier is an optional `long_context` override on a pricing row.

const OPENAI_LIKE_ROW = {
  input: 2.5,
  output: 15,
  cached: 0.25,
  long_context: { threshold: 272_000, input: 5, output: 22.5, cached: 0.5 },
};

test("long-context tier rates apply above the threshold (cache-inclusive prompt)", () => {
  const cost = computeCostFromPricing(OPENAI_LIKE_ROW, {
    prompt_tokens: 300_000,
    completion_tokens: 1_000,
    cached_tokens: 100_000,
  });
  assert.ok(Math.abs(cost - (200_000 * 5 + 100_000 * 0.5 + 1_000 * 22.5) / 1e6) < 1e-12);
});

test("flat rates apply at or below an exclusive threshold", () => {
  const atThreshold = computeCostFromPricing(OPENAI_LIKE_ROW, {
    prompt_tokens: 272_000,
    completion_tokens: 1_000,
  });
  assert.ok(Math.abs(atThreshold - (272_000 * 2.5 + 1_000 * 15) / 1e6) < 1e-12);

  const below = computeCostFromPricing(OPENAI_LIKE_ROW, {
    prompt_tokens: 1_000,
    completion_tokens: 1_000,
  });
  assert.ok(Math.abs(below - (1_000 * 2.5 + 1_000 * 15) / 1e6) < 1e-12);
});

test("inclusive threshold uses the tier when the prompt exactly reaches it", () => {
  const row = {
    input: 2,
    output: 6,
    long_context: { threshold: 200_000, inclusive: true, input: 4, output: 12 },
  };
  const cost = computeCostFromPricing(row, { prompt_tokens: 200_000, completion_tokens: 1_000 });
  assert.ok(Math.abs(cost - (200_000 * 4 + 1_000 * 12) / 1e6) < 1e-12);

  const below = computeCostFromPricing(row, { prompt_tokens: 199_999, completion_tokens: 1_000 });
  assert.ok(Math.abs(below - (199_999 * 2 + 1_000 * 6) / 1e6) < 1e-12);
});

test("tier keeps flat fields it does not override and the fast multiplier stays last", () => {
  const row = {
    input: 5,
    output: 30,
    cached: 0.5,
    reasoning: 30,
    cache_creation: 5,
    long_context: { threshold: 272_000, input: 10, output: 45 },
  };
  const tokens = {
    prompt_tokens: 300_000,
    completion_tokens: 1_000,
    cached_tokens: 100_000,
    cache_creation_input_tokens: 10_000,
  };
  const standard = computeCostFromPricing(row, tokens);
  const expected = (190_000 * 10 + 100_000 * 0.5 + 1_000 * 45 + 10_000 * 5) / 1e6;
  assert.ok(Math.abs(standard - expected) < 1e-12);

  const fast = computeCostFromPricing(row, tokens, {
    provider: "codex",
    model: "gpt-5.5",
    serviceTier: "priority",
  });
  assert.ok(Math.abs(fast - expected * 2.5) < 1e-12);
});

test("malformed long_context is ignored (flat rates)", () => {
  const cost = computeCostFromPricing(
    { input: 1, output: 2, long_context: { input: 100 } },
    { prompt_tokens: 1_000_000, completion_tokens: 0 }
  );
  assert.equal(cost, 1);
});

test("OpenAI default rows carry the documented >272K tier (2x input/cache, 1.5x output)", () => {
  const openai = getDefaultPricing().openai;
  for (const model of [
    "gpt-6-astra",
    "gpt-6-sol",
    "gpt-6-luna",
    "gpt-6.1-sol",
    "gpt-5.6",
    "gpt-5.6-sol",
    "gpt-5.6-terra",
    "gpt-5.6-luna",
    "gpt-5.5",
    "gpt-5.4",
  ]) {
    const row = openai[model];
    const tier = row.long_context;
    assert.ok(tier, `${model} has a long_context tier`);
    assert.equal(tier.threshold, 272_000, model);
    assert.notEqual(tier.inclusive, true, model);
    assert.equal(tier.input, row.input * 2, model);
    assert.equal(tier.cached, row.cached * 2, model);
    assert.equal(tier.cache_creation, row.cache_creation * 2, model);
    assert.equal(tier.output, row.output * 1.5, model);
    assert.equal(tier.reasoning, row.reasoning * 1.5, model);
  }
  // Short-context models without a long-context price stay flat.
  assert.equal(openai["gpt-5.4-mini"].long_context, undefined);
});

test("openai/gpt-5.4 matches the published standard rates", () => {
  const row = getDefaultPricing().openai["gpt-5.4"];
  assert.equal(row.input, 2.5);
  assert.equal(row.cached, 0.25);
  assert.equal(row.output, 15);
  assert.deepEqual(row.long_context, {
    threshold: 272_000,
    input: 5,
    cached: 0.5,
    cache_creation: 5,
    output: 22.5,
    reasoning: 22.5,
  });
});

test("xai/grok-4.6 carries the inclusive >=200K tier", () => {
  const row = getDefaultPricing().xai["grok-4.6"];
  assert.deepEqual(row.long_context, {
    threshold: 200_000,
    inclusive: true,
    input: 4,
    cached: 1,
    cache_creation: 4,
    output: 12,
    reasoning: 12,
  });
});

test("anthropic Claude Haiku 4.5 rows use the published cache rates", () => {
  const anthropic = getDefaultPricing().anthropic;
  for (const model of ["claude-haiku-4.5", "claude-haiku-4-5-20251001"]) {
    assert.equal(anthropic[model].cached, 0.1, model);
    assert.equal(anthropic[model].cache_creation, 1.25, model);
  }
});

test("pricing PATCH schema accepts the long_context tier echoed by the dashboard", () => {
  const entry = { input: 5, output: 30, long_context: { threshold: 272_000, input: 10 } };
  assert.deepEqual(pricingFieldsSchema.parse(entry), entry);
  assert.equal(
    pricingFieldsSchema.safeParse({ input: 1, long_context: { input: 2 } }).success,
    false,
    "threshold is required"
  );
  assert.equal(
    pricingFieldsSchema.safeParse({ input: 1, long_context: { threshold: 1, nope: 1 } }).success,
    false,
    "tier stays strict"
  );
});
