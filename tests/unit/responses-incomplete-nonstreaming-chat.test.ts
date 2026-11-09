import test from "node:test";
import assert from "node:assert/strict";

const { translateNonStreamingResponse } = await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function chatFinishReason(response: Record<string, unknown>): unknown {
  const body = {
    id: "resp_incomplete",
    object: "response",
    model: "gpt-test",
    output: [{ type: "message", role: "assistant", content: [{ type: "output_text", text: "partial" }] }],
    usage: { input_tokens: 3, output_tokens: 2, total_tokens: 5 },
    ...response,
  };
  const chat = translateNonStreamingResponse(body, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI) as {
    choices: Array<{ finish_reason: unknown }>;
  };
  return chat.choices[0].finish_reason;
}

test("Responses to Chat, non-streaming: a turn cut by max_output_tokens finishes with length", () => {
  assert.equal(
    chatFinishReason({ status: "incomplete", incomplete_details: { reason: "max_output_tokens" } }),
    "length"
  );
});

test("Responses to Chat, non-streaming: a turn stopped by the content filter finishes with content_filter", () => {
  assert.equal(
    chatFinishReason({ status: "incomplete", incomplete_details: { reason: "content_filter" } }),
    "content_filter"
  );
});

test("Responses to Chat, non-streaming: a completed turn still finishes with stop", () => {
  assert.equal(chatFinishReason({ status: "completed", incomplete_details: null }), "stop");
});

test("Responses to Chat, non-streaming: a function call still finishes with tool_calls", () => {
  assert.equal(
    chatFinishReason({
      status: "completed",
      output: [{ type: "function_call", call_id: "call_1", name: "lookup", arguments: "{}" }],
    }),
    "tool_calls"
  );
});
