import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or9r-readiness-budget-"));

const { ensureStreamReadiness } = await import("../../open-sse/utils/streamReadiness.ts");

const encoder = new TextEncoder();
const CHUNK_BYTES = 16 * 1024;
const READY_FRAME = 'data: {"choices":[{"delta":{"content":"hi"}}]}\n\n';

// Pull-driven source: `junk` chunks first, then one real frame, then close.
function junkThenReady(junk: () => string, junkChunks: number) {
  const state = { pulled: 0, cancelled: false };
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      state.pulled += 1;
      if (state.pulled <= junkChunks) controller.enqueue(encoder.encode(junk()));
      else if (state.pulled === junkChunks + 1) controller.enqueue(encoder.encode(READY_FRAME));
      else controller.close();
    },
    cancel() {
      state.cancelled = true;
    },
  });
  return {
    state,
    response: new Response(body, { headers: { "Content-Type": "text/event-stream" } }),
  };
}

const commentChunk = () => `:${"x".repeat(CHUNK_BYTES)}\n\n`;
const invalidDataChunk = () => `data: ${"y".repeat(CHUNK_BYTES)}\n\n`;

for (const [name, junk] of [
  ["comment-only", commentChunk],
  ["invalid-data", invalidDataChunk],
] as const) {
  test(`${name} body is rejected once the pre-signal byte budget is spent`, async () => {
    const { state, response } = junkThenReady(junk, 200);
    const result = await ensureStreamReadiness(response, { timeoutMs: 5000 });

    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
    assert.equal(result.response.status, 504);
    assert.equal(typeof result.anyByteAt, "number");
    assert.equal(state.cancelled, true, "upstream reader is cancelled");
    assert.ok(state.pulled < 100, `stopped reading early, pulled ${state.pulled} chunks`);
  });
}

test("a few heartbeat comments before the first real frame still pass", async () => {
  const { response } = junkThenReady(commentChunk, 5);
  const result = await ensureStreamReadiness(response, { timeoutMs: 5000 });
  assert.equal(result.ok, true);
});

// A Responses `response.created` frame echoes instructions and tools, so a real first
// frame can pass 64 KiB. The budget must stay well above that.
test("one large first frame split over many chunks still passes", async () => {
  const big = `data: {"choices":[{"delta":{"content":"${"z".repeat(100 * 1024)}"}}]}\n\n`;
  const parts: string[] = [];
  for (let i = 0; i < big.length; i += CHUNK_BYTES) parts.push(big.slice(i, i + CHUNK_BYTES));
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      const next = parts.shift();
      if (next === undefined) controller.close();
      else controller.enqueue(encoder.encode(next));
    },
  });
  const result = await ensureStreamReadiness(new Response(body), { timeoutMs: 5000 });
  assert.equal(result.ok, true);
});

test("a single unterminated line cannot grow without bound before the first signal", async () => {
  const state = { pulled: 0, cancelled: false };
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      state.pulled += 1;
      if (state.pulled <= 300) controller.enqueue(encoder.encode("y".repeat(CHUNK_BYTES)));
      else if (state.pulled === 301) controller.enqueue(encoder.encode(`\n\n${READY_FRAME}`));
      else controller.close();
    },
    cancel() {
      state.cancelled = true;
    },
  });
  const result = await ensureStreamReadiness(new Response(body), { timeoutMs: 5000 });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.code, "STREAM_READINESS_TIMEOUT");
  assert.equal(state.cancelled, true);
  assert.ok(state.pulled < 100, `stopped reading early, pulled ${state.pulled} chunks`);
});
