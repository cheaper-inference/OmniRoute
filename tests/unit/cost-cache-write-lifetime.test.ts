import test from "node:test";
import assert from "node:assert/strict";

const { computeCostFromPricing } = await import("../../src/lib/usage/costCalculator.ts");

// Synthetic rates in $/1M tokens: input 10, 5m write 12.5 (1.25x input).
const PRICING = { input: 10, output: 50, cache_creation: 12.5 };
const claude = { provider: "anthropic", model: "claude-sonnet-4-5" };
const close = (actual: number, expected: number) =>
  assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} !== ${expected}`);

test("1h cache writes cost 2x input for native Claude; 5m writes keep the 5m price", () => {
  const usage = {
    input: 1_000_000,
    cache_creation_input_tokens: 1_000_000,
    cache_creation: { ephemeral_5m_input_tokens: 0, ephemeral_1h_input_tokens: 1_000_000 },
  };
  close(computeCostFromPricing(PRICING, usage, claude), 20);
  const fiveMinute = {
    ...usage,
    cache_creation: { ephemeral_5m_input_tokens: 1_000_000, ephemeral_1h_input_tokens: 0 },
  };
  close(computeCostFromPricing(PRICING, fiveMinute, claude), 12.5);
});

test("an unsplit remainder of the cache-write total is priced as 5m", () => {
  const usage = {
    input: 2_000_000,
    cache_creation_input_tokens: 2_000_000,
    cache_creation: { ephemeral_1h_input_tokens: 1_000_000 },
  };
  close(computeCostFromPricing(PRICING, usage, claude), 20 + 12.5);
});

test("an explicit cache_creation_1h price wins over the 2x default", () => {
  const usage = {
    input: 1_000_000,
    cache_creation_input_tokens: 1_000_000,
    cache_creation: { ephemeral_1h_input_tokens: 1_000_000 },
  };
  close(computeCostFromPricing({ ...PRICING, cache_creation_1h: 30 }, usage, claude), 30);
});

test("without tier evidence or a Claude route, the legacy single write price applies", () => {
  const tiered = {
    input: 1_000_000,
    cache_creation_input_tokens: 1_000_000,
    cache_creation: { ephemeral_1h_input_tokens: 1_000_000 },
  };
  close(computeCostFromPricing(PRICING, tiered, { provider: "openai", model: "gpt-x" }), 12.5);
  const flat = { input: 1_000_000, cache_creation_input_tokens: 1_000_000 };
  close(computeCostFromPricing(PRICING, flat, claude), 12.5);
});

test("inconsistent tier counters fall back to the single write price", () => {
  const usage = {
    input: 1_000_000,
    cache_creation_input_tokens: 1_000_000,
    cache_creation: { ephemeral_1h_input_tokens: 5_000_000 },
  };
  close(computeCostFromPricing(PRICING, usage, claude), 12.5);
});
