import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "messages-error-closure-"));
process.env.DATA_DIR = dir;
const { createDisconnectAwareStream, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
const frame = (value: Record<string, unknown>) =>
  `event: ${String(value.type)}\ndata: ${JSON.stringify(value)}\n\n`;
function packets(wire: string): Array<Record<string, unknown>> {
  return wire
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(5)));
}
async function run(wire: string, ending: "error" | "eof", fragment: boolean, onError?: () => void) {
  const encoded = new TextEncoder().encode(wire);
  const chunks = fragment ? [...encoded].map((byte) => Uint8Array.of(byte)) : [encoded];
  let cursor = 0;
  const readable = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (cursor < chunks.length) controller.enqueue(chunks[cursor++]);
        else if (ending === "error") controller.error(new Error("synthetic source error"));
        else controller.close();
      },
    },
    { highWaterMark: 0 }
  );
  const response = createDisconnectAwareStream(
    { readable, writable: new WritableStream() },
    createStreamController({ clientResponseFormat: FORMATS.CLAUDE, onError }),
    { highWaterMark: 0 }
  );
  return packets(await new Response(response).text());
}
for (const ending of ["error", "eof"] as const)
  for (const fragmented of [false, true])
    test(`Messages already delivered error closes once without a replacement error/success / ${ending} fragmented=${fragmented}`, async () => {
      const original = {
        type: "error",
        error: {
          type: "invalid_request_error",
          code: "context_length_exceeded",
          message: "fixture rejection",
        },
      };
      const events = await run(
        frame({
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text: "partial" },
        }) + frame(original),
        ending,
        fragmented
      );
      assert.deepEqual(
        events.filter((event) => event.type === "error"),
        [original]
      );
      assert.ok(
        events.filter((event) => event.type === "message_stop").length <= 1,
        "an error may close directly or receive one compatibility stop, never duplicate closure"
      );
      assert.equal(
        events.filter((event) => event.type === "message_delta").length,
        0,
        "an explicit refusal cannot become graceful max_tokens truncation"
      );
    });

test("error-looking text is not an already-delivered error and cannot suppress a real transport failure", async () => {
  const events = await run(
    frame({
      type: "content_block_delta",
      index: 0,
      delta: {
        type: "text_delta",
        text: 'event: error\n{"error":{"code":"context_length_exceeded"}}',
      },
    }),
    "error",
    true
  );
  assert.equal(events.filter((event) => event.type === "error").length, 1);
  assert.ok(events.filter((event) => event.type === "message_stop").length <= 1);
  assert.equal(events.filter((event) => event.type === "message_delta").length, 0);
});

test("complete error plus message_stop is not finalized twice when the source errors next", async () => {
  const wire =
    frame({
      type: "error",
      error: { type: "invalid_request_error", message: "fixture rejection" },
    }) + frame({ type: "message_stop" });
  const events = await run(wire, "error", true);
  assert.equal(events.filter((event) => event.type === "error").length, 1);
  assert.equal(events.filter((event) => event.type === "message_stop").length, 1);
});

test("closing a delivered Messages error at EOF does not invent a second provider failure callback", async () => {
  let extraFailures = 0;
  const events = await run(
    frame({
      type: "error",
      error: {
        type: "invalid_request_error",
        code: "context_length_exceeded",
        message: "request rejection already handled upstream",
      },
    }),
    "eof",
    true,
    () => {
      extraFailures++;
    }
  );
  assert.ok(events.filter((event) => event.type === "message_stop").length <= 1);
  assert.equal(events.filter((event) => event.type === "error").length, 1);
  assert.equal(events.filter((event) => event.type === "message_delta").length, 0);
  assert.equal(
    extraFailures,
    0,
    "protocol closure must not reclassify a known request error as an extra 502/cooldown"
  );
});
