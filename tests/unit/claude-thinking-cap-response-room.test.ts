import assert from "node:assert/strict";
import test from "node:test";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  removeModelCapabilityOverride,
  setModelCapabilityOverride,
} from "../../src/lib/db/modelCapabilityOverrides.ts";
import { fitThinkingToMaxTokens } from "../../open-sse/translator/request/openai-to-claude/thinkingBudget.ts";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";

test.after(() => {
  resetDbInstance();
});

for (const callerMaxTokens of [64000, 128000]) {
  test(`Haiku preserves the capped output allowance for caller max_tokens=${callerMaxTokens}`, () => {
    const result = fitThinkingToMaxTokens("claude-haiku-4-5-20251001", callerMaxTokens, {
      type: "enabled",
      budget_tokens: 1024,
    });

    assert.equal(result.maxTokens, 64000);
    assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 1024 });
    assert.equal(result.maxTokens - Number(result.thinking?.budget_tokens), 62976);
  });
}

test("Haiku fits a high thinking budget while preserving the capped output allowance", () => {
  const result = fitThinkingToMaxTokens("claude-haiku-4-5-20251001", 128000, {
    type: "enabled",
    budget_tokens: 131072,
  });

  assert.equal(result.maxTokens, 64000);
  assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 62976 });
  assert.equal(result.maxTokens - Number(result.thinking?.budget_tokens), 1024);
});

test("OpenAI -> Claude preserves Haiku's capped output allowance with low effort", () => {
  const result = openaiToClaudeRequest(
    "claude-haiku-4-5-20251001",
    {
      messages: [{ role: "user", content: "Think about this" }],
      max_tokens: 128000,
      reasoning_effort: "low",
    },
    false
  );

  assert.equal(result.max_tokens, 64000);
  assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 1024 });
});

for (const cap of [2047, 2048]) {
  test(`thinking respects the minimum response room with an output cap of ${cap}`, () => {
    const target = "opencode-go/qwen3.7-plus";
    assert.ok(setModelCapabilityOverride(target, "max_output_tokens", cap));
    try {
      const result = fitThinkingToMaxTokens(
        "qwen3.7-plus",
        128000,
        { type: "enabled", budget_tokens: 1024 },
        "opencode-go"
      );

      assert.equal(result.maxTokens, cap);
      if (cap < 2048) {
        assert.equal(result.thinking, undefined);
      } else {
        assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 1024 });
        assert.equal(result.maxTokens - Number(result.thinking?.budget_tokens), 1024);
      }
    } finally {
      removeModelCapabilityOverride(target, "max_output_tokens");
    }
  });
}
