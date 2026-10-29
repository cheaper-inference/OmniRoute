import test from "node:test";
import assert from "node:assert/strict";

// Some clients send a tool result without its id (`role:"tool"` without
// `tool_call_id`, or a Claude-shaped `tool_result` part without `tool_use_id`).
// Dropping it loses the real tool output and leaves the call unanswered; pair it
// with the oldest still-unanswered tool_use of the preceding assistant turn instead.

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

type Block = Record<string, unknown>;

function toolResults(result: { messages: Array<{ content: unknown }> }): Block[] {
  const blocks: Block[] = [];
  for (const msg of result.messages) {
    if (!Array.isArray(msg.content)) continue;
    for (const block of msg.content as Block[]) {
      if (block.type === "tool_result") blocks.push(block);
    }
  }
  return blocks;
}

function assistantWithCalls(ids: string[]) {
  return {
    role: "assistant",
    content: null,
    tool_calls: ids.map((id) => ({
      id,
      type: "function",
      function: { name: `fn_${id}`, arguments: "{}" },
    })),
  };
}

test("openaiToClaudeRequest: id-less tool messages pair with pending calls in order", () => {
  const body = {
    _disableToolPrefix: true,
    messages: [
      { role: "user", content: "run both" },
      assistantWithCalls(["call_a", "call_b"]),
      { role: "tool", content: "result A" },
      { role: "tool", content: "result B" },
    ],
  };
  const results = toolResults(openaiToClaudeRequest("claude-sonnet-4", body, false));
  assert.deepEqual(
    results.map((block) => [block.tool_use_id, block.content]),
    [
      ["call_a", "result A"],
      ["call_b", "result B"],
    ]
  );
});

test("openaiToClaudeRequest: id-less result takes the call not yet answered", () => {
  const body = {
    _disableToolPrefix: true,
    messages: [
      { role: "user", content: "run both" },
      assistantWithCalls(["call_a", "call_b"]),
      { role: "tool", tool_call_id: "call_b", content: "result B" },
      { role: "tool", content: "result A" },
    ],
  };
  const results = toolResults(openaiToClaudeRequest("claude-sonnet-4", body, false));
  // Adjacency enforcement re-orders results to the tool_use order.
  assert.deepEqual(
    results.map((block) => [block.tool_use_id, block.content]),
    [
      ["call_a", "result A"],
      ["call_b", "result B"],
    ]
  );
});

test("openaiToClaudeRequest: Claude-shaped tool_result part without tool_use_id is paired", () => {
  const body = {
    _disableToolPrefix: true,
    messages: [
      { role: "user", content: "run it" },
      assistantWithCalls(["call_x"]),
      { role: "user", content: [{ type: "tool_result", content: "x output" }] },
    ],
  };
  const results = toolResults(openaiToClaudeRequest("claude-sonnet-4", body, false));
  assert.equal(results.length, 1);
  assert.equal(results[0].tool_use_id, "call_x");
  assert.equal(results[0].content, "x output");
});

test("openaiToClaudeRequest: id-less result with nothing pending is still dropped", () => {
  const body = {
    _disableToolPrefix: true,
    messages: [
      { role: "user", content: "run it" },
      assistantWithCalls(["call_a"]),
      { role: "tool", tool_call_id: "call_a", content: "result A" },
      { role: "tool", content: "stray" },
    ],
  };
  const results = toolResults(openaiToClaudeRequest("claude-sonnet-4", body, false));
  assert.deepEqual(
    results.map((block) => block.tool_use_id),
    ["call_a"]
  );
});

test("openaiToClaudeRequest: pairing uses the sanitized tool_use id (#7705 guard)", () => {
  const body = {
    _disableToolPrefix: true,
    messages: [
      { role: "user", content: "run both" },
      assistantWithCalls(["call.with:bad/chars", "call.two:x"]),
      { role: "tool", content: "paired" },
      { role: "tool", tool_call_id: "call.two:x", content: "explicit" },
    ],
  };
  const result = openaiToClaudeRequest("claude-sonnet-4", body, false);
  const toolUseIds = (result.messages as Array<{ content: unknown }>)
    .flatMap((msg) => (Array.isArray(msg.content) ? (msg.content as Block[]) : []))
    .filter((block) => block.type === "tool_use")
    .map((block) => block.id);
  assert.deepEqual(toolUseIds, ["call_with_bad_chars", "call_two_x"]);
  assert.deepEqual(
    toolResults(result).map((block) => [block.tool_use_id, block.content]),
    [
      ["call_with_bad_chars", "paired"],
      // A present-but-invalid id keeps the existing sanitization path.
      ["call_two_x", "explicit"],
    ]
  );
});
