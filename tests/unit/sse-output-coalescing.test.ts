/**
 * Opt-in SSE frame batching (SSE_FRAME_COALESCE_MS): frames forwarded within the window reach
 * the client as ONE enqueue. The first frame and terminal frames are never held back, the
 * bytes are identical to the unbatched stream, and the default (unset) stays one enqueue per
 * frame.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sse-frame-coalesce-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createSSEOutputSink, isTerminalSSEFrame, readFrameCoalesceMs } =
  await import("../../open-sse/utils/sseOutputSink.ts");

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const ENV_NAMES = ["SSE_FRAME_COALESCE_MS", "SSE_COALESCE_MS"];

function withEnv<T>(values: Record<string, string>, fn: () => T): T {
  const saved = new Map(ENV_NAMES.map((name) => [name, process.env[name]]));
  for (const name of ENV_NAMES) delete process.env[name];
  Object.assign(process.env, values);
  try {
    return fn();
  } finally {
    for (const [name, value] of saved) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out: ${label}`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

const claudeFrame = (event: Record<string, unknown>) =>
  `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
const textDelta = (text: string) =>
  claudeFrame({ type: "content_block_delta", index: 0, delta: { type: "text_delta", text } });
const MESSAGE_START = claudeFrame({
  type: "message_start",
  message: { id: "msg_1", type: "message", role: "assistant", model: "claude-x", content: [] },
});
const BLOCK_START = claudeFrame({
  type: "content_block_start",
  index: 0,
  content_block: { type: "text", text: "" },
});
const TAIL = [
  claudeFrame({ type: "content_block_stop", index: 0 }),
  claudeFrame({
    type: "message_delta",
    delta: { stop_reason: "end_turn" },
    usage: { output_tokens: 50 },
  }),
  claudeFrame({ type: "message_stop" }),
];
const FIFTY_DELTAS = Array.from({ length: 50 }, (_, i) => textDelta(`t${i} `));

function claudePassthrough(env: Record<string, string>) {
  return withEnv(env, () =>
    createSSEStream({
      mode: "passthrough",
      provider: "anthropic",
      model: "claude-x",
      clientResponseFormat: FORMATS.CLAUDE,
      body: { messages: [{ role: "user", content: "hi" }] },
    })
  );
}

/** Feed every frame in ONE upstream chunk and collect each downstream enqueue separately. */
async function collectEnqueues(env: Record<string, string>) {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode([MESSAGE_START, BLOCK_START, ...FIFTY_DELTAS, ...TAIL].join(""))
      );
      controller.close();
    },
  });
  const reader = source.pipeThrough(claudePassthrough(env)).getReader();
  const chunks: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(decoder.decode(value));
  }
  return chunks;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("default stream keeps one enqueue per frame", async () => {
  const chunks = await collectEnqueues({});
  assert.ok(chunks.length >= 50, `expected one enqueue per frame, got ${chunks.length}`);
});

test("SSE_FRAME_COALESCE_MS batches a burst into a few enqueues with byte-identical output", async () => {
  const plain = await collectEnqueues({});
  const batched = await collectEnqueues({ SSE_FRAME_COALESCE_MS: "50" });
  assert.ok(batched.length <= 3, `expected <= 3 enqueues, got ${batched.length}`);
  assert.equal(batched[0], MESSAGE_START, "the first frame is forwarded on its own, immediately");
  assert.equal(batched.join(""), plain.join(""));
});

test("SSE_FRAME_COALESCE_MS never delays the first frame or a terminal frame", async (t) => {
  let upstream!: ReadableStreamDefaultController<Uint8Array>;
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      upstream = controller;
    },
  });
  // A 60 s window: any frame that waited for the timer would trip withTimeout below.
  const reader = source
    .pipeThrough(claudePassthrough({ SSE_FRAME_COALESCE_MS: "60000" }))
    .getReader();

  // Release the stream even when an assertion fails, or its idle timer keeps the run alive.
  t.after(() => {
    reader.cancel().catch(() => {});
  });

  upstream.enqueue(encoder.encode(MESSAGE_START));
  const first = await withTimeout(reader.read(), 2000, "first frame");
  assert.equal(decoder.decode(first.value), MESSAGE_START);

  upstream.enqueue(encoder.encode(BLOCK_START + textDelta("a") + textDelta("b") + TAIL.join("")));
  const tail = await withTimeout(reader.read(), 2000, "terminal frame");
  const text = decoder.decode(tail.value);
  assert.ok(text.startsWith(BLOCK_START), "batched frames are flushed ahead of the terminal frame");
  assert.ok(text.endsWith(TAIL[2]), "message_stop is not held back by the window");

  upstream.close();
  assert.equal((await withTimeout(reader.read(), 2000, "close")).done, true);
});

test("the window timer flushes a batch while the upstream is idle", async () => {
  const enqueued: string[] = [];
  const controller = {
    enqueue: (bytes: Uint8Array) => enqueued.push(decoder.decode(bytes)),
  } as unknown as TransformStreamDefaultController<Uint8Array>;
  const timing = { markForward() {}, observeOutput() {} };
  const sink = withEnv({ SSE_FRAME_COALESCE_MS: "20" }, () =>
    createSSEOutputSink(timing, { claudeClient: false })
  );
  sink.forward(controller, encoder.encode("data: 1\n\n"));
  sink.forward(controller, encoder.encode("data: 2\n\n"));
  sink.forward(controller, encoder.encode("data: 3\n\n"));
  assert.deepEqual(enqueued, ["data: 1\n\n"]);
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.deepEqual(enqueued, ["data: 1\n\n", "data: 2\n\ndata: 3\n\n"]);
});

test("a closed stream disposes the sink instead of throwing from a timer", async () => {
  let calls = 0;
  const controller = {
    enqueue: () => {
      calls += 1;
      if (calls > 1) throw new TypeError("Invalid state: Controller is already closed");
    },
  } as unknown as TransformStreamDefaultController<Uint8Array>;
  const sink = withEnv({ SSE_FRAME_COALESCE_MS: "10" }, () =>
    createSSEOutputSink({ markForward() {}, observeOutput() {} }, { claudeClient: false })
  );
  sink.forward(controller, encoder.encode("data: 1\n\n"));
  sink.forward(controller, encoder.encode("data: 2\n\n"));
  await new Promise((resolve) => setTimeout(resolve, 40));
  sink.forward(controller, encoder.encode("data: 3\n\n"));
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(calls, 2, "after the failed enqueue the sink stays inert");
});

test("terminal frame detection and env parsing", () => {
  assert.equal(isTerminalSSEFrame("data: [DONE]\n\n"), true);
  assert.equal(isTerminalSSEFrame(TAIL[2]), true);
  assert.equal(isTerminalSSEFrame('event: error\ndata: {"type":"error"}\n\n'), true);
  assert.equal(isTerminalSSEFrame("event: response.completed\ndata: {}\n\n"), true);
  assert.equal(isTerminalSSEFrame('data: {"type":"response.failed"}\n\n'), true);
  assert.equal(isTerminalSSEFrame(textDelta("message_stop")), false);
  assert.equal(isTerminalSSEFrame(MESSAGE_START), false);
  assert.equal(withEnv({}, readFrameCoalesceMs), 0);
  assert.equal(withEnv({ SSE_FRAME_COALESCE_MS: "2" }, readFrameCoalesceMs), 2);
  assert.equal(withEnv({ SSE_FRAME_COALESCE_MS: "-1" }, readFrameCoalesceMs), 0);
});

test("delta coalescing and frame batching compose losslessly", async () => {
  const plain = (await collectEnqueues({})).join("");
  const both = await collectEnqueues({ SSE_FRAME_COALESCE_MS: "50", SSE_COALESCE_MS: "400" });
  const deltaTexts = (text: string) =>
    text
      .split("\n")
      .filter((line) => line.startsWith("data: ") && line.includes("content_block_delta"))
      .map((line) => JSON.parse(line.slice(6)).delta.text)
      .join("");
  assert.ok(both.length <= 3);
  assert.equal(deltaTexts(both.join("")), deltaTexts(plain));
  assert.equal(both.join("").split("event: content_block_delta").length - 1, 1);
});
