import test from "node:test";
import assert from "node:assert/strict";

import { estimateInputTokens, estimateOutputTokens } from "../../open-sse/utils/usageEstimation.ts";

test("estimateInputTokens memoizes calculation on the same body object reference", () => {
  const body = {
    messages: [
      { role: "user", content: "Hello world" },
      { role: "assistant", content: "Hi there!" },
    ],
  };

  const first = estimateInputTokens(body);
  assert.ok(first > 0);

  const second = estimateInputTokens(body);
  assert.equal(first, second, "memoized call must return identical result");
});

test("estimateInputTokens on large text (>32KB) returns in linear time without regex freeze", () => {
  const largeText = "const a = 1;\n".repeat(10_000); // ~130 KB
  const body = {
    messages: [{ role: "user", content: largeText }],
  };

  const t0 = performance.now();
  const tokens = estimateInputTokens(body);
  const elapsed = performance.now() - t0;

  assert.ok(tokens > 20_000, `expected >20k tokens, got ${tokens}`);
  assert.ok(
    elapsed < 20,
    `large text token estimation must take <20ms, took ${elapsed.toFixed(2)}ms`
  );
});

test("estimateInputTokens accounts for tool definitions separately", () => {
  const bodyWithTools = {
    messages: [{ role: "user", content: "run tool" }],
    tools: [
      {
        name: "test_tool",
        description: "a test tool",
        parameters: { type: "object", properties: { x: { type: "string" } } },
      },
    ],
  };

  const tokens = estimateInputTokens(bodyWithTools);
  assert.ok(tokens > 10, "must count both messages and tools");
});

test("estimateOutputTokens returns proportional count", () => {
  assert.equal(estimateOutputTokens(0), 0);
  assert.equal(estimateOutputTokens(undefined), 0);
  assert.equal(estimateOutputTokens(35), 10);
});
