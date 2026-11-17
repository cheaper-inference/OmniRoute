import test from "node:test";
import assert from "node:assert/strict";

import {
  MAX_PENDING_SSE_LINE_BYTES,
  advancePendingLineBytes,
  mergeNativeToolCalls,
  summaryTextTailMarker,
  trackClaudeNativeToolCall,
  type StreamToolCall,
} from "../../open-sse/utils/streamSummaryHelpers.ts";

const bytes = (text: string) => new TextEncoder().encode(text);

test("advancePendingLineBytes counts only the unfinished line after the last newline", () => {
  assert.equal(advancePendingLineBytes(0, bytes("data: a\ndata: bc")), 8);
  assert.equal(advancePendingLineBytes(8, bytes("def")), 11);
  assert.equal(advancePendingLineBytes(11, bytes("g\n")), 0);
});

test("advancePendingLineBytes returns null once the pending line passes the cap", () => {
  const chunk = new Uint8Array(16);
  assert.equal(
    advancePendingLineBytes(MAX_PENDING_SSE_LINE_BYTES - 16, chunk),
    MAX_PENDING_SSE_LINE_BYTES
  );
  assert.equal(advancePendingLineBytes(MAX_PENDING_SSE_LINE_BYTES - 15, chunk), null);
  // A newline inside the chunk closes the oversized line before the cap is reached.
  const closing = bytes("ab\ncd");
  assert.equal(advancePendingLineBytes(MAX_PENDING_SSE_LINE_BYTES - 2, closing), 2);
});

test("summaryTextTailMarker flags text at or past the 64 KiB window", () => {
  assert.deepEqual(summaryTextTailMarker("short", undefined), {});
  assert.deepEqual(summaryTextTailMarker(undefined, "x".repeat(64 * 1024)), {
    _summary_text_tail: true,
  });
});

test("trackClaudeNativeToolCall records tool_use blocks and appends input_json deltas", () => {
  const calls = new Map<string, StreamToolCall>();
  trackClaudeNativeToolCall(calls, {
    type: "content_block_start",
    index: 1,
    content_block: { type: "tool_use", id: "toolu_1", name: "Read", input: {} },
  });
  trackClaudeNativeToolCall(calls, {
    type: "content_block_delta",
    index: 1,
    delta: { type: "input_json_delta", partial_json: '{"path":' },
  });
  trackClaudeNativeToolCall(calls, {
    type: "content_block_delta",
    index: 1,
    delta: { type: "input_json_delta", partial_json: '"a.ts"}' },
  });
  trackClaudeNativeToolCall(calls, {
    type: "content_block_start",
    index: 0,
    content_block: { type: "text", text: "" },
  });
  assert.deepEqual(
    [...calls.values()],
    [
      {
        id: "toolu_1",
        index: 0,
        type: "function",
        function: { name: "Read", arguments: '{"path":"a.ts"}' },
      },
    ]
  );
});

test("mergeNativeToolCalls appends Claude and Responses calls once per call id", () => {
  const chat: StreamToolCall = {
    id: "call_a",
    index: 0,
    type: "function",
    function: { name: "a", arguments: "{}" },
  };
  const claude: StreamToolCall = { ...chat, id: "toolu_b", function: { name: "b", arguments: "" } };
  const merged = mergeNativeToolCalls(
    [chat],
    [claude, { ...claude }],
    [{ type: "function_call", call_id: "fc_c", name: "c", arguments: '{"x":1}' }],
    [{ type: "message" }, { type: "function_call", call_id: "call_a", name: "a" }]
  );
  assert.deepEqual(
    merged.map((call) => [call.index, call.id, call.function.name, call.function.arguments]),
    [
      [0, "call_a", "a", "{}"],
      [1, "toolu_b", "b", ""],
      [2, "fc_c", "c", '{"x":1}'],
    ]
  );
});
