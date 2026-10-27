/**
 * OpenRouter provider-reported `usage.cost` passthrough.
 *
 * OpenRouter (and compatible resellers) report the exact billed USD cost of a
 * chat completion as a bare number in `usage.cost`. OmniRoute used to drop it
 * in three places: the usage extractors (so cost accounting fell back to the
 * token × pricing estimate), the OpenAI response sanitizer and the client
 * usage filter (so clients that read `usage.cost` never received it).
 *
 * Contract pinned here:
 * - the internal normalized field is `cost_usd` (distinct from xAI's
 *   `cost_in_usd_ticks`); precedence is ticks > cost_usd > token × pricing;
 * - clients receive `usage.cost` as a bare number on OpenAI-format responses,
 *   only when the upstream sent it — no estimate is ever injected into the body;
 * - Claude / Gemini / Responses usage shapes are untouched.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateCostDetailed,
  computeCostFromPricing,
} from "../../src/lib/usage/costCalculator.ts";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";
import {
  sanitizeOpenAIResponse,
  sanitizeStreamingChunk,
} from "../../open-sse/handlers/responseSanitizer.ts";
import { applyClientUsageBuffer } from "../../open-sse/handlers/chatCore/clientUsageBuffer.ts";
import {
  extractUsage,
  filterUsageForFormat,
  normalizeUsage,
} from "../../open-sse/utils/usageTracking.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const OPENROUTER_COST = 0.0042;

test("extractUsage keeps OpenRouter usage.cost as the normalized cost_usd field", () => {
  const usage = extractUsage({
    usage: { prompt_tokens: 100, completion_tokens: 20, cost: OPENROUTER_COST },
  });
  assert.ok(usage);
  assert.equal(usage.cost_usd, OPENROUTER_COST);
  assert.equal(usage.prompt_tokens, 100);
  assert.equal(usage.completion_tokens, 20);
});

test("normalizeUsage accepts a bare number, a { total } object and an existing cost_usd", () => {
  assert.equal(normalizeUsage({ prompt_tokens: 1, cost: 0.5 })?.cost_usd, 0.5);
  assert.equal(normalizeUsage({ prompt_tokens: 1, cost: { total: 0.25 } })?.cost_usd, 0.25);
  assert.equal(normalizeUsage({ prompt_tokens: 1, cost_usd: 0.125 })?.cost_usd, 0.125);
  assert.equal(normalizeUsage({ prompt_tokens: 1, cost: 0 })?.cost_usd, 0);
});

test("normalizeUsage ignores non-number, negative and non-finite cost values", () => {
  for (const cost of ["0.0042", -1, Number.NaN, Number.POSITIVE_INFINITY, null, { total: "x" }]) {
    const usage = normalizeUsage({ prompt_tokens: 1, cost });
    assert.ok(usage);
    assert.equal("cost_usd" in usage, false, `cost=${String(cost)} must be ignored`);
  }
});

test("extractUsageFromResponse carries OpenRouter usage.cost for non-streaming cost accounting", () => {
  const usage = extractUsageFromResponse(
    {
      object: "chat.completion",
      usage: { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12, cost: OPENROUTER_COST },
    },
    "openrouter"
  );
  assert.ok(usage);
  assert.equal(usage.cost_usd, OPENROUTER_COST);
  const normalized = normalizeUsage(usage);
  assert.equal(normalized?.cost_usd, OPENROUTER_COST);
});

test("extractUsageFromResponse omits cost_usd when the provider sent no cost", () => {
  const usage = extractUsageFromResponse(
    { usage: { prompt_tokens: 10, completion_tokens: 2 } },
    "openai"
  );
  assert.ok(usage);
  assert.equal("cost_usd" in usage, false);
});

test("filterUsageForFormat forwards usage.cost unchanged to OpenAI-format clients", () => {
  const out = filterUsageForFormat(
    { prompt_tokens: 1, completion_tokens: 1, cost: OPENROUTER_COST },
    FORMATS.OPENAI
  ) as Record<string, unknown>;
  assert.equal(out.cost, OPENROUTER_COST);
  assert.equal(out.prompt_tokens, 1);
});

test("filterUsageForFormat re-emits the normalized cost_usd as a bare-number usage.cost", () => {
  const out = filterUsageForFormat(
    { prompt_tokens: 1, completion_tokens: 1, cost_usd: OPENROUTER_COST },
    FORMATS.OPENAI
  ) as Record<string, unknown>;
  assert.equal(out.cost, OPENROUTER_COST);
  assert.equal(typeof out.cost, "number");
  assert.equal("cost_usd" in out, false, "internal field must not leak to clients");
});

test("filterUsageForFormat never injects a cost when the upstream sent none", () => {
  const out = filterUsageForFormat(
    { prompt_tokens: 1, completion_tokens: 1 },
    FORMATS.OPENAI
  ) as Record<string, unknown>;
  assert.equal("cost" in out, false);
});

test("filterUsageForFormat drops a malformed usage.cost instead of forwarding it", () => {
  const out = filterUsageForFormat(
    { prompt_tokens: 1, completion_tokens: 1, cost: "free" },
    FORMATS.OPENAI
  ) as Record<string, unknown>;
  assert.equal("cost" in out, false);
});

test("filterUsageForFormat leaves Claude, Gemini and Responses usage shapes untouched", () => {
  const usage = { prompt_tokens: 1, completion_tokens: 1, cost: OPENROUTER_COST };
  for (const format of [FORMATS.CLAUDE, FORMATS.GEMINI, FORMATS.OPENAI_RESPONSES]) {
    const out = filterUsageForFormat(usage, format) as Record<string, unknown>;
    assert.equal("cost" in out, false, `${format} must not gain a cost field`);
  }
});

test("sanitizeOpenAIResponse keeps a numeric usage.cost and drops a malformed one", () => {
  const kept = sanitizeOpenAIResponse({
    id: "gen-1",
    choices: [{ index: 0, message: { role: "assistant", content: "hi" }, finish_reason: "stop" }],
    usage: { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12, cost: OPENROUTER_COST },
  }) as { usage: Record<string, unknown> };
  assert.equal(kept.usage.cost, OPENROUTER_COST);

  const dropped = sanitizeOpenAIResponse({
    id: "gen-2",
    choices: [],
    usage: { prompt_tokens: 10, completion_tokens: 2, cost: { total: "x" } },
  }) as { usage: Record<string, unknown> };
  assert.equal("cost" in dropped.usage, false);
});

test("sanitizeStreamingChunk keeps usage.cost on the final OpenRouter usage chunk", () => {
  const chunk = sanitizeStreamingChunk({
    id: "gen-1",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12, cost: OPENROUTER_COST },
  }) as { usage: Record<string, unknown> };
  assert.equal(chunk.usage.cost, OPENROUTER_COST);
});

test("non-streaming client path (sanitize → client usage buffer) delivers usage.cost", () => {
  const response = sanitizeOpenAIResponse({
    id: "gen-1",
    choices: [{ index: 0, message: { role: "assistant", content: "hi" }, finish_reason: "stop" }],
    usage: { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12, cost: OPENROUTER_COST },
  }) as { usage?: unknown; choices?: Array<{ message?: { content?: unknown } }> };
  applyClientUsageBuffer(response, { messages: [{ role: "user", content: "hi" }] }, FORMATS.OPENAI);
  assert.equal((response.usage as Record<string, unknown>).cost, OPENROUTER_COST);
});

test("computeCostFromPricing trusts cost_usd over the token × pricing estimate", () => {
  const pricing = { input: 1, output: 2 };
  const tokens = { input: 1_000_000, output: 1_000_000 };
  assert.equal(computeCostFromPricing(pricing, tokens), 3, "control: token estimate");
  assert.equal(computeCostFromPricing(pricing, { ...tokens, cost_usd: OPENROUTER_COST }), 0.0042);
  assert.equal(computeCostFromPricing(null, { ...tokens, cost_usd: OPENROUTER_COST }), 0.0042);
});

test("calculateCostDetailed prices an unpriced OpenRouter model from cost_usd", async () => {
  const result = await calculateCostDetailed("openrouter", "x/unpriced", {
    prompt_tokens: 10,
    cost_usd: OPENROUTER_COST,
  });
  assert.deepEqual(result, { costUsd: OPENROUTER_COST, priced: true });
});

test("cost_in_usd_ticks still wins over cost_usd when both are present", () => {
  const cost = computeCostFromPricing(null, {
    prompt_tokens: 10,
    cost_in_usd_ticks: 37_756_000,
    cost_usd: 1,
  });
  assert.ok(Math.abs(cost - 0.0037756) < 1e-12, `expected ticks-derived cost, got ${cost}`);
});

test("negative or non-finite cost_usd is ignored by the cost calculator", () => {
  const pricing = { input: 1, output: 2 };
  const tokens = { input: 1_000_000, output: 1_000_000 };
  assert.equal(computeCostFromPricing(pricing, { ...tokens, cost_usd: -1 }), 3);
  assert.equal(computeCostFromPricing(pricing, { ...tokens, cost_usd: Number.NaN }), 3);
});
