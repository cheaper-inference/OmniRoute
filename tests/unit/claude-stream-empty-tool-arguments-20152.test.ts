import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIResponse } =
  await import("../../open-sse/translator/response/claude-to-openai.ts");

function createState() {
  return {
    toolCalls: new Map(),
    toolNameMap: new Map(),
  };
}

test("Claude stream: zero-argument tool call emits '{}' arguments upon content_block_stop (#20152)", () => {
  const state = createState();

  const start = claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg_20152_1", model: "claude-3-5-sonnet" } },
    state
  );
  assert.ok(start);

  const blockStart = claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "tool_use", id: "tool_zero_1", name: "get_screen_size" },
    },
    state
  );
  assert.ok(blockStart);
  assert.equal(blockStart[0].choices[0].delta.tool_calls[0].function.name, "get_screen_size");
  assert.equal(blockStart[0].choices[0].delta.tool_calls[0].function.arguments, "");

  // Upstream sends no input_json_delta for tools with no parameters, going directly to content_block_stop.
  const blockStop = claudeToOpenAIResponse(
    {
      type: "content_block_stop",
      index: 0,
    },
    state
  );

  assert.ok(blockStop, "content_block_stop must emit a chunk for empty tool arguments");
  assert.equal(blockStop.length, 1);
  const tc = blockStop[0].choices[0].delta.tool_calls[0];
  assert.equal(tc.index, 0);
  assert.equal(tc.function.arguments, "{}");

  const msgDelta = claudeToOpenAIResponse(
    {
      type: "message_delta",
      delta: { stop_reason: "tool_use" },
    },
    state
  );
  assert.ok(msgDelta);
  assert.equal(msgDelta[0].choices[0].finish_reason, "tool_calls");

  const msgStop = claudeToOpenAIResponse({ type: "message_stop" }, state);
  assert.equal(msgStop, null);
});

test("Claude stream: tool call with arguments does not emit extra '{}' chunk (#20152)", () => {
  const state = createState();

  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg_20152_2", model: "claude-3-5-sonnet" } },
    state
  );

  claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "tool_use", id: "tool_args_1", name: "lookup_user" },
    },
    state
  );

  const delta = claudeToOpenAIResponse(
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "input_json_delta", partial_json: '{"user_id":123}' },
    },
    state
  );
  assert.equal(delta[0].choices[0].delta.tool_calls[0].function.arguments, '{"user_id":123}');

  const blockStop = claudeToOpenAIResponse(
    {
      type: "content_block_stop",
      index: 0,
    },
    state
  );
  assert.equal(
    blockStop,
    null,
    "content_block_stop must not emit chunk when arguments are already present"
  );

  const msgDelta = claudeToOpenAIResponse(
    {
      type: "message_delta",
      delta: { stop_reason: "tool_use" },
    },
    state
  );
  assert.equal(msgDelta[0].choices[0].finish_reason, "tool_calls");
});

test("Claude stream: multiple tool calls in stream handle zero and non-zero arguments independently (#20152)", () => {
  const state = createState();

  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg_20152_3", model: "claude-3-5-sonnet" } },
    state
  );

  // Block 0: zero-parameter tool
  claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "tool_use", id: "call_0", name: "get_time" },
    },
    state
  );
  const stop0 = claudeToOpenAIResponse(
    {
      type: "content_block_stop",
      index: 0,
    },
    state
  );
  assert.ok(stop0);
  assert.equal(stop0[0].choices[0].delta.tool_calls[0].index, 0);
  assert.equal(stop0[0].choices[0].delta.tool_calls[0].function.arguments, "{}");

  // Block 1: tool with parameter
  claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 1,
      content_block: { type: "tool_use", id: "call_1", name: "format_time" },
    },
    state
  );
  claudeToOpenAIResponse(
    {
      type: "content_block_delta",
      index: 1,
      delta: { type: "input_json_delta", partial_json: '{"fmt":"iso"}' },
    },
    state
  );
  const stop1 = claudeToOpenAIResponse(
    {
      type: "content_block_stop",
      index: 1,
    },
    state
  );
  assert.equal(stop1, null);
});
