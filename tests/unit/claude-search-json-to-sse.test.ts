import test from "node:test";
import assert from "node:assert/strict";
import { maybeWrapForcedNonStreamingResponsesJson } from "../../open-sse/handlers/chatCore/responsesJsonToSse.ts";

function message() {
  return {
    id: "msg_search",
    type: "message",
    role: "assistant",
    model: "claude-opus-5",
    content: [
      { type: "thinking", thinking: "Checked the source.", signature: "signature-test" },
      {
        type: "text",
        text: "Guido van Rossum. https://www.python.org/",
        citations: [
          {
            type: "web_search_result_location",
            url: "https://www.python.org/",
            title: "Python",
            cited_text: "Guido van Rossum",
            encrypted_index: "test-index",
          },
        ],
      },
      { type: "tool_use", id: "call_custom", name: "save_note", input: { text: "Guido" } },
      { type: "redacted_thinking", data: "opaque-test" },
    ],
    stop_reason: "tool_use",
    stop_sequence: null,
    usage: { input_tokens: 30, output_tokens: 15, cache_read_input_tokens: 10 },
  };
}

function events(sse: string) {
  return sse
    .trim()
    .split("\n\n")
    .map((block) => JSON.parse(block.split("\ndata: ")[1]));
}

test("replays a completed Claude search as Messages SSE with content and usage intact", async () => {
  const body = message();
  const snapshot = structuredClone(body);
  const response = maybeWrapForcedNonStreamingResponsesJson({
    clientRequestedResponsesStream: true,
    body,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "900",
      "X-Request-Id": "test-search",
    },
  });
  assert.equal(response.headers.get("content-type"), "text/event-stream");
  assert.equal(response.headers.get("content-length"), null);
  assert.equal(response.headers.get("x-request-id"), "test-search");
  const frames = events(await response.text());
  assert.equal(frames[0].type, "message_start");
  assert.deepEqual(frames[0].message.content, []);
  assert.equal(frames[0].message.usage.output_tokens, 0);
  assert.equal(frames[0].message.usage.cache_read_input_tokens, 10);
  assert.equal(frames[0].message.stop_reason, null);
  assert.equal(frames.at(-1).type, "message_stop");
  assert.deepEqual(frames.at(-2).delta, { stop_reason: "tool_use", stop_sequence: null });
  assert.equal(frames.at(-2).usage.output_tokens, 15);
  const starts = frames.filter((frame) => frame.type === "content_block_start");
  assert.deepEqual(
    starts.map((frame) => frame.index),
    [0, 1, 2, 3]
  );
  assert.deepEqual(starts[1].content_block.citations, body.content[1].citations);
  assert.deepEqual(starts[3].content_block, body.content[3]);
  const deltas = frames.filter((frame) => frame.type === "content_block_delta");
  assert.deepEqual(
    deltas.map((frame) => frame.delta.type),
    ["thinking_delta", "signature_delta", "text_delta", "input_json_delta"]
  );
  assert.equal(deltas[0].delta.thinking, body.content[0].thinking);
  assert.equal(deltas[1].delta.signature, body.content[0].signature);
  assert.equal(deltas[2].delta.text, body.content[1].text);
  assert.deepEqual(JSON.parse(deltas[3].delta.partial_json), body.content[2].input);
  assert.equal(frames.filter((frame) => frame.type === "content_block_stop").length, 4);
  assert.deepEqual(body, snapshot);
});

test("Claude JSON stays JSON when no streaming was requested", async () => {
  const body = message();
  const response = maybeWrapForcedNonStreamingResponsesJson({
    clientRequestedResponsesStream: false,
    body,
    headers: { "Content-Type": "application/json" },
  });
  assert.equal(response.headers.get("content-type"), "application/json");
  assert.deepEqual(await response.json(), body);
});

test("empty and max_tokens Claude responses still terminate the stream", async () => {
  for (const stop_reason of ["end_turn", "max_tokens"]) {
    const response = maybeWrapForcedNonStreamingResponsesJson({
      clientRequestedResponsesStream: true,
      body: { ...message(), content: [], stop_reason },
      headers: {},
    });
    const frames = events(await response.text());
    assert.deepEqual(
      frames.map((frame) => frame.type),
      ["message_start", "message_delta", "message_stop"]
    );
    assert.equal(frames[1].delta.stop_reason, stop_reason);
  }
});
