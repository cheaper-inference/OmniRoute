/**
 * #20480: the passthrough usage sanitizer must not resolve the accounting receipt per chunk.
 *
 * `repairClaudeFinalWireUsage()` only acts on Claude's final `message_delta`, but its receipt
 * argument (`getAccountingUsage()`) was evaluated for every parsed SSE payload. Until the
 * provider reports usage, that receipt re-estimates the request body (`JSON.stringify` of the
 * whole history), so a long Codex Responses stream did O(chunks x body) work on the event loop.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-gate-20480-"));
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test.after(() => core.resetDbInstance());

const DELTAS = 200;
const sse = (payload: Record<string, unknown>) =>
  `event: ${String(payload.type)}\ndata: ${JSON.stringify(payload)}\n\n`;

test("Responses passthrough resolves usage a bounded number of times, not once per delta", async () => {
  let serializations = 0;
  const body = {
    model: "gpt-test",
    input: [{ type: "message", role: "user", content: "word ".repeat(5_000) }],
    metadata: {
      toJSON() {
        serializations += 1;
        return {};
      },
    },
  };
  const events = [
    sse({
      type: "response.created",
      sequence_number: 0,
      response: { id: "r", status: "in_progress", output: [] },
    }),
  ];
  for (let i = 1; i <= DELTAS; i++)
    events.push(
      sse({
        type: "response.output_text.delta",
        sequence_number: i,
        item_id: "msg_1",
        output_index: 0,
        content_index: 0,
        delta: "x",
      })
    );
  events.push(
    sse({
      type: "response.completed",
      sequence_number: DELTAS + 1,
      response: {
        id: "r",
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
  const enc = new TextEncoder();
  const source = new ReadableStream({
    start(controller) {
      for (const event of events) controller.enqueue(enc.encode(event));
      controller.close();
    },
  });
  const wire = await new Response(
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

  assert.match(wire, /response\.completed/);
  assert.ok(
    serializations <= 10,
    `request body serialized ${serializations} times for ${DELTAS} deltas; expected a small constant`
  );
});
