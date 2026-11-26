/**
 * A passthrough stream must not re-serialize the request body for every chunk.
 *
 * Every parsed SSE payload goes through sanitizePassthroughUsage(), which evaluates
 * getAccountingUsage() and with it estimateInputTokens(body): a JSON.stringify of the whole
 * request plus a regex split. With a ~1 MB Responses history (hundreds of tool calls) and a
 * long streamed answer, that pinned the event loop for minutes ("event loop stalled 474.9s").
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-body-serialize-"));
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test.after(() => {
  core.resetDbInstance();
});

const DELTAS = 200;
const enc = new TextEncoder();

function responsesEvent(payload: Record<string, unknown>): string {
  return `event: ${String(payload.type)}\ndata: ${JSON.stringify(payload)}\n\n`;
}

test("a Responses passthrough stream serializes the request body a bounded number of times", async () => {
  let serializations = 0;
  const body = {
    model: "gpt-test",
    input: [
      { type: "message", role: "user", content: "word ".repeat(20_000) },
      { type: "function_call", name: "exec", arguments: "{}", call_id: "call_1" },
      { type: "function_call_output", call_id: "call_1", output: "ok" },
    ],
    // JSON.stringify calls toJSON each time the request body is serialized.
    metadata: {
      toJSON() {
        serializations += 1;
        return {};
      },
    },
  };

  const events: string[] = [
    responsesEvent({
      type: "response.created",
      sequence_number: 0,
      response: { id: "resp_1", object: "response", status: "in_progress", output: [] },
    }),
  ];
  for (let i = 1; i <= DELTAS; i++) {
    events.push(
      responsesEvent({
        type: "response.output_text.delta",
        sequence_number: i,
        item_id: "msg_1",
        output_index: 0,
        content_index: 0,
        delta: "x",
      })
    );
  }
  events.push(
    responsesEvent({
      type: "response.completed",
      sequence_number: DELTAS + 1,
      response: {
        id: "resp_1",
        object: "response",
        status: "completed",
        output: [
          {
            id: "msg_1",
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "x".repeat(DELTAS) }],
          },
        ],
      },
    })
  );

  const source = new ReadableStream({
    start(controller) {
      for (const event of events) controller.enqueue(enc.encode(event));
      controller.close();
    },
  });
  const text = await new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "passthrough",
        sourceFormat: FORMATS.OPENAI_RESPONSES,
        targetFormat: FORMATS.OPENAI_RESPONSES,
        clientResponseFormat: FORMATS.OPENAI_RESPONSES,
        provider: "codex",
        model: "gpt-test",
        body,
      } as never)
    )
  ).text();

  assert.match(text, /response\.completed/);
  assert.ok(
    serializations <= 5,
    `request body serialized ${serializations} times for ${DELTAS} deltas; expected a small constant`
  );
});
