import test from "node:test";
import assert from "node:assert/strict";

import { fitThinkingToMaxTokens } from "../../open-sse/translator/request/openai-to-claude/thinkingBudget.ts";

test("a budget under the Anthropic minimum drops thinking and keeps the caller's max_tokens", () => {
  const out = fitThinkingToMaxTokens("claude-sonnet-4-5", 256, {
    type: "enabled",
    budget_tokens: 512,
  });
  assert.equal(out.thinking, undefined);
  assert.equal(out.maxTokens, 256);
});

test("the kept max_tokens is still clamped to the model cap", () => {
  const out = fitThinkingToMaxTokens("claude-sonnet-4-5", 10_000_000, {
    type: "enabled",
    budget_tokens: 512,
  });
  assert.equal(out.thinking, undefined);
  assert.ok(out.maxTokens <= 128_000, `maxTokens = ${out.maxTokens}`);
  assert.ok(out.maxTokens > 1_000);
});

test("a fitting budget is unchanged", () => {
  const out = fitThinkingToMaxTokens("claude-sonnet-4-5", 4_096, {
    type: "enabled",
    budget_tokens: 2_048,
  });
  assert.equal(out.maxTokens, 6_144);
  assert.deepEqual(out.thinking, { type: "enabled", budget_tokens: 2_048 });
});
