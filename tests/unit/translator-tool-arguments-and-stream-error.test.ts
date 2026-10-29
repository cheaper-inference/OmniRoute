import test from "node:test";
import assert from "node:assert/strict";
import { parseSSEToResponsesOutput } from "../../open-sse/handlers/sseParser.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";

// Two request-scoped failures that used to be reported as provider outages:
//
// 1. A Responses stream that aborts with a bare error frame and never sends a
//    terminal snapshot produced `null` out of parseSSEToResponsesOutput, so the
//    caller synthesised an empty successful response.
// 2. A tool call whose `arguments` string is valid JSON but not an object (or is
//    not JSON at all) threw a raw JSON.parse/SyntaxError out of the non-streaming
//    translator, which the caller classified as an upstream provider failure.

const sse = (frames: unknown[]) =>
  frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("");

test("a Responses stream that only carries an error frame reports failed with that error", () => {
  const raw = sse([
    { type: "response.created", response: { id: "resp_err", object: "response", output: [] } },
    { type: "error", error: { type: "server_error", message: "upstream boom" } },
  ]);

  const parsed = parseSSEToResponsesOutput(raw, "gpt-test") as {
    status?: string;
    error?: unknown;
  } | null;

  assert.ok(parsed, "the stream must not collapse to null when it carried an error");
  assert.equal(parsed.status, "failed");
  assert.deepEqual(parsed.error, { type: "server_error", message: "upstream boom" });
});

test("an error-only payload with no Responses snapshot stays null for the generic SSE path (#3324)", () => {
  // A CLI executor that always answers text/event-stream signals failure with a bare
  // `data: {"error":{...}}` chunk: no response.created, no choices. That is not a Responses
  // stream, so the Responses parser must not synthesize a failed snapshot for it — the
  // non-streaming leg surfaces the message as a 502 `invalid_sse_payload` instead.
  const raw = sse([{ error: { message: "Devin CLI not found" } }]);

  assert.equal(parseSSEToResponsesOutput(raw, "gpt-test"), null);
});

test("a normal terminal snapshot still reports completed and carries no error", () => {
  const raw = sse([
    { type: "response.created", response: { id: "resp_ok", object: "response", output: [] } },
    {
      type: "response.completed",
      response: {
        id: "resp_ok",
        object: "response",
        status: "completed",
        output: [
          {
            type: "message",
            id: "msg_1",
            role: "assistant",
            content: [{ type: "output_text", text: "done" }],
          },
        ],
      },
    },
  ]);

  const parsed = parseSSEToResponsesOutput(raw, "gpt-test") as {
    status?: string;
    error?: unknown;
  } | null;

  assert.ok(parsed);
  assert.equal(parsed.status, "completed");
  assert.equal(parsed.error, undefined);
});

const toolCallResponse = (args: unknown) =>
  ({
    id: "chatcmpl-tools",
    object: "chat.completion",
    model: "gpt-test",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "read_file", arguments: args } },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
    usage: { prompt_tokens: 10, completion_tokens: 2 },
  }) as const;

test("tool arguments that are valid JSON but not an object fail with a typed error", () => {
  assert.throws(
    () => translateNonStreamingResponse(toolCallResponse("[1,2]"), "openai", "claude", null, null),
    (err: unknown) =>
      err instanceof SyntaxError && err.message === "Tool-call arguments must be a JSON object"
  );
});

test("tool arguments that are not JSON fail with the typed message, not a raw parse crash", () => {
  assert.throws(
    () =>
      translateNonStreamingResponse(toolCallResponse("{not json"), "openai", "claude", null, null),
    (err: unknown) =>
      err instanceof SyntaxError && err.message === "Tool-call arguments must be a JSON object"
  );
});

test("well-formed tool arguments still translate into a tool_use block", () => {
  const translated = translateNonStreamingResponse(
    toolCallResponse('{"path":"a.txt"}'),
    "openai",
    "claude",
    null,
    null
  ) as { content?: Array<{ type?: string; input?: unknown }> };

  const toolUse = (translated.content ?? []).find((block) => block.type === "tool_use");
  assert.ok(toolUse, "a valid tool call must still produce a tool_use block");
  assert.deepEqual(toolUse.input, { path: "a.txt" });
});

// Zero-argument tool calls commonly arrive with empty, missing or null `arguments`.
// That must keep translating to `input: {}` (only non-empty unparseable strings and
// non-object JSON are malformed).
for (const [label, args] of [
  ["an empty string", ""],
  ["undefined", undefined],
  ["null", null],
] as const) {
  test(`tool arguments that are ${label} still translate to an empty input object`, () => {
    const translated = translateNonStreamingResponse(
      toolCallResponse(args),
      "openai",
      "claude",
      null,
      null
    ) as { content?: Array<{ type?: string; input?: unknown }> };

    const toolUse = (translated.content ?? []).find((block) => block.type === "tool_use");
    assert.ok(toolUse, "a zero-argument tool call must still produce a tool_use block");
    assert.deepEqual(toolUse.input, {});
  });
}

test("an error frame next to a completed snapshot does not override the completed status", () => {
  const raw = sse([
    { type: "response.created", response: { id: "resp_mix", object: "response", output: [] } },
    { type: "error", error: { type: "server_error", message: "transient noise" } },
    {
      type: "response.completed",
      response: {
        id: "resp_mix",
        object: "response",
        status: "completed",
        output: [
          {
            type: "message",
            id: "msg_1",
            role: "assistant",
            content: [{ type: "output_text", text: "done" }],
          },
        ],
      },
    },
  ]);

  const parsed = parseSSEToResponsesOutput(raw, "gpt-test") as {
    status?: string;
    error?: unknown;
  } | null;

  assert.ok(parsed);
  assert.equal(parsed.status, "completed");
  assert.equal(parsed.error, undefined);
});
