/**
 * Opt-in SSE frame batching (SSE_FRAME_COALESCE_MS) must not eat the tail of a failed stream:
 * when a preserved upstream failure terminates the transform, flush() never runs, so the
 * sink has to drain the queued delta and the failure frame itself.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sse-coalesce-terminate-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const chunk = (delta: Record<string, unknown>) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-abcdefgh1",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta, finish_reason: null }],
  })}\n\n`;
// A bare OpenAI error envelope: no `event: error` line, no `"type":"error"` marker.
const BARE_ERROR = `data: ${JSON.stringify({
  error: { message: "upstream exploded", type: "server_error", code: "500" },
})}\n\n`;

async function run(frameCoalesceMs: string | undefined) {
  const saved = process.env.SSE_FRAME_COALESCE_MS;
  if (frameCoalesceMs === undefined) delete process.env.SSE_FRAME_COALESCE_MS;
  else process.env.SSE_FRAME_COALESCE_MS = frameCoalesceMs;
  try {
    const stream = createSSEStream({
      mode: "passthrough",
      provider: "openai",
      model: "m",
      clientResponseFormat: FORMATS.OPENAI,
      body: { messages: [{ role: "user", content: "hi" }] },
    });
    const frames = [
      chunk({ role: "assistant", content: "A" }),
      chunk({ content: "B" }),
      BARE_ERROR,
    ];
    const source = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(frames.join("")));
        controller.close();
      },
    });
    const reader = source.pipeThrough(stream).getReader();
    let out = "";
    let error: unknown = null;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        out += decoder.decode(value);
      }
    } catch (err) {
      error = err;
    }
    return { out, error };
  } finally {
    if (saved === undefined) delete process.env.SSE_FRAME_COALESCE_MS;
    else process.env.SSE_FRAME_COALESCE_MS = saved;
  }
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("unbatched stream delivers the queued delta and the upstream failure frame", async () => {
  const { out } = await run(undefined);
  assert.ok(out.includes('"content":"B"'), "queued delta B reaches the client");
  assert.ok(out.includes("upstream exploded"), "upstream failure frame reaches the client");
});

test("batched stream delivers the queued delta and the upstream failure frame on terminate", async () => {
  const plain = await run(undefined);
  const batched = await run("200");
  assert.ok(batched.out.includes('"content":"B"'), "queued delta B survives the terminate");
  assert.ok(batched.out.includes("upstream exploded"), "upstream failure frame survives");
  assert.equal(batched.out, plain.out, "batching changes enqueue grouping, not bytes");
});
