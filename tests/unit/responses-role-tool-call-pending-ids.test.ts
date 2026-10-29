import assert from "node:assert/strict";
import test from "node:test";
import { openaiResponsesToOpenAIRequest } from "../../open-sse/translator/request/openai-responses.ts";
import { toRecord } from "../../open-sse/translator/request/openai-responses/helpers.ts";

function translate(input: unknown[]) {
  return toRecord(openaiResponsesToOpenAIRequest("gpt-4o", { input }, false, null)).messages;
}

function toolCall(id: unknown, name = "read") {
  return { id, type: "function", function: { name, arguments: "{}" } };
}

test("role-based tool calls retain normalized string ids when pairing id-less outputs", () => {
  assert.deepEqual(
    translate([
      {
        role: "assistant",
        content: null,
        tool_calls: [toolCall(" call-first "), toolCall("call-second", "search")],
      },
      { type: "function_call_output", output: "first result" },
      { type: "function_call_output", output: "second result" },
    ]),
    [
      {
        role: "assistant",
        content: null,
        tool_calls: [toolCall("call-first"), toolCall("call-second", "search")],
      },
      { role: "tool", tool_call_id: "call-first", content: "first result" },
      { role: "tool", tool_call_id: "call-second", content: "second result" },
    ]
  );
});

test("invalid role-based call ids never enter the pending string-id queue", () => {
  assert.deepEqual(
    translate([
      {
        role: "assistant",
        content: null,
        tool_calls: [
          toolCall(42),
          toolCall(null),
          toolCall({ id: "not-a-string" }),
          toolCall("   "),
          toolCall("invalid-name", ""),
          toolCall("valid-call"),
        ],
      },
      { type: "function_call_output", output: "valid result" },
    ]),
    [
      { role: "assistant", content: null, tool_calls: [toolCall("valid-call")] },
      { role: "tool", tool_call_id: "valid-call", content: "valid result" },
    ]
  );
});

test("an explicit role-tool result claims its id before the next id-less result", () => {
  assert.deepEqual(
    translate([
      {
        role: "assistant",
        content: null,
        tool_calls: [toolCall("call-first"), toolCall("call-second")],
      },
      { role: "tool", tool_call_id: "call-second", content: "second result" },
      { role: "tool", content: "first result" },
    ]),
    [
      {
        role: "assistant",
        content: null,
        tool_calls: [toolCall("call-first"), toolCall("call-second")],
      },
      { role: "tool", tool_call_id: "call-second", content: "second result" },
      { role: "tool", tool_call_id: "call-first", content: "first result" },
    ]
  );
});
