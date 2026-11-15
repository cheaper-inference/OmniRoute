import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { deepseekProvider } from "../../open-sse/config/providers/registry/deepseek/index.ts";

// Issue #20260: DeepSeek's thinking-mode models (deepseek-flash, deepseek-reasoner, deepseek-v4-flash, etc.)
// return HTTP 400 "The `reasoning_content` in the thinking mode must be passed back to the API"
// when a prior assistant turn lacks reasoning_content.
// This happens notably on Anthropic /v1/messages turns where assistant turns only carry tool_use blocks,
// or when standard OpenAI-shaped clients replay history without reasoning_content.

test("deepseekProvider declares requiresReasoningContentEcho: true (#20260)", () => {
  assert.equal(deepseekProvider.requiresReasoningContentEcho, true);
});

test("DefaultExecutor injects reasoning_content for deepseek/deepseek-flash with tool_calls (issue #20260)", () => {
  const executor = new DefaultExecutor("deepseek");
  const body = {
    model: "ds/deepseek-flash",
    stream: false,
    messages: [
      { role: "user", content: "read a.txt" },
      // Assistant turn with only tool calls (translated from Claude format or raw OpenAI):
      {
        role: "assistant",
        tool_calls: [
          {
            id: "call_fresh123",
            type: "function",
            function: { name: "read_file", arguments: '{"path":"a.txt"}' },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_fresh123", content: "hello" },
      { role: "user", content: "continue" },
    ],
  };

  const transformed = executor.transformRequest("ds/deepseek-flash", body, false, {
    apiKey: "sk-deepseek-test",
  }) as { messages: Array<Record<string, unknown>> };

  const assistantTurn = transformed.messages.find((m) => m.role === "assistant");
  assert.ok(assistantTurn, "expected an assistant message in the transformed body");
  assert.ok(
    typeof assistantTurn!.reasoning_content === "string" &&
      (assistantTurn!.reasoning_content as string).length > 0,
    "expected DefaultExecutor to inject a non-empty reasoning_content placeholder"
  );
  assert.equal(assistantTurn!.reasoning_content, " ");
});

test("DefaultExecutor injects reasoning_content for plain text assistant turn on deepseek thinking model", () => {
  const executor = new DefaultExecutor("deepseek");
  const body = {
    model: "deepseek-flash",
    stream: false,
    messages: [
      { role: "user", content: "What is 2+2?" },
      { role: "assistant", content: "4" },
      { role: "user", content: "Multiply by 10" },
    ],
  };

  const transformed = executor.transformRequest("deepseek-flash", body, false, {
    apiKey: "sk-deepseek-test",
  }) as { messages: Array<Record<string, unknown>> };

  const assistantTurn = transformed.messages.find((m) => m.role === "assistant");
  assert.ok(assistantTurn);
  assert.equal(assistantTurn!.reasoning_content, " ");
});

test("DefaultExecutor preserves existing authentic reasoning_content on deepseek assistant turns", () => {
  const executor = new DefaultExecutor("deepseek");
  const body = {
    model: "deepseek-flash",
    stream: false,
    messages: [
      { role: "user", content: "Solve math" },
      {
        role: "assistant",
        content: "Result: 42",
        reasoning_content: "Authentic thinking steps here...",
      },
      { role: "user", content: "Next step" },
    ],
  };

  const transformed = executor.transformRequest("deepseek-flash", body, false, {
    apiKey: "sk-deepseek-test",
  }) as { messages: Array<Record<string, unknown>> };

  const assistantTurn = transformed.messages.find((m) => m.role === "assistant");
  assert.ok(assistantTurn);
  assert.equal(assistantTurn!.reasoning_content, "Authentic thinking steps here...");
});
