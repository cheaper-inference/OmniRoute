import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-unparsable-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

type Completion = { status: number };

const chunk = (content: string, finish: string | null = null) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-unparsable1",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta: content ? { content } : {}, finish_reason: finish }],
  })}\n\n`;

async function run(parts: string[]) {
  const completes: Completion[] = [];
  const failures: Array<{ status: number; code?: string }> = [];
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const part of parts) controller.enqueue(textEncoder.encode(part));
      controller.close();
    },
  });
  const stream = createSSEStream({
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    clientResponseFormat: FORMATS.OPENAI,
    provider: "openai",
    model: "m",
    body: { messages: [{ role: "user", content: "hi" }] },
    onComplete: (payload: Completion) => {
      completes.push(payload);
    },
    onFailure: (payload: { status: number; code?: string }) => {
      failures.push(payload);
      return false;
    },
  } as never);

  const reader = source.pipeThrough(stream).getReader();
  const decoder = new TextDecoder();
  let text = "";
  let readerError: Error | null = null;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
  } catch (error) {
    readerError = error as Error;
  }
  const frames = text.split("\n\n").filter((frame) => frame.startsWith("data: "));
  const invalidFrames = frames.filter((frame) => {
    const payload = frame.slice(6);
    if (payload === "[DONE]") return false;
    try {
      JSON.parse(payload);
      return false;
    } catch {
      return true;
    }
  });
  const errorFrames = frames.filter((frame) => frame.includes('"error"'));
  return { text, readerError, completes, failures, invalidFrames, errorFrames };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a terminated plain-text data line that ends the stream becomes one error frame and a failure outcome", async () => {
  const r = await run([
    chunk("Hello "),
    "data: Internal Server Error: backend crashed mid-generation\n\n",
  ]);

  assert.match(r.text, /Hello /, "content sent before the bad line stays delivered");
  assert.equal(r.errorFrames.length, 1, `one error frame, got:\n${r.text}`);
  assert.equal(r.invalidFrames.length, 0, "no unparsable frame reaches the client");
  assert.ok(!r.text.includes("backend crashed"), "the upstream text is not echoed");
  assert.equal(r.failures.length, 1);
  assert.equal(r.failures[0].code, "invalid_sse_payload");
  assert.equal(r.completes.length, 1);
  assert.equal(r.completes[0].status, 502, "the call log must not record success");
});

test("an unterminated cut JSON tail gives the same one error frame, not a raw invalid frame", async () => {
  const cut = chunk("cut mid-frame").slice(0, 60); // `data: {...` with no closing brace, no newline
  const r = await run([chunk("Hi "), cut]);

  assert.equal(r.invalidFrames.length, 0, `raw garbage must not be forwarded:\n${r.text}`);
  assert.equal(r.errorFrames.length, 1, `one error frame, got:\n${r.text}`);
  assert.equal(r.failures.length, 1);
  assert.equal(r.failures[0].code, "invalid_sse_payload");
  assert.equal(r.completes.length, 1);
  assert.equal(r.completes[0].status, 502);
});

test("a bad data line followed by a valid frame is still dropped as noise and the stream succeeds", async () => {
  const r = await run([
    chunk("Hello "),
    "data: not json at all\n\n",
    chunk("world"),
    chunk("", "stop"),
    "data: [DONE]\n\n",
  ]);

  assert.equal(r.readerError, null);
  assert.match(r.text, /world/);
  assert.equal(r.errorFrames.length, 0);
  assert.equal(r.failures.length, 0);
  assert.equal(r.completes.length, 1);
  assert.equal(r.completes[0].status, 200);
});

test("a bad data line after the finish chunk does not turn a finished answer into a failure", async () => {
  const r = await run([chunk("Done"), chunk("", "stop"), "data: trailing noise\n\n"]);

  assert.equal(r.errorFrames.length, 0);
  assert.equal(r.failures.length, 0);
  assert.equal(r.completes.length, 1);
  assert.equal(r.completes[0].status, 200);
});
