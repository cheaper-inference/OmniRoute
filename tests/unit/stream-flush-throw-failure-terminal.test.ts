import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-flush-throw-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

type Completion = { status: number; error?: string; errorCode?: string };

const chunk = (delta: Record<string, unknown>, finish: string | null = null) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-flushthrow1",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta, finish_reason: finish }],
  })}\n\n`;

// Valid JSON that the OpenAI -> Responses translator cannot read: `choices: [null]`.
const MALFORMED_FRAME = `data: ${JSON.stringify({
  id: "chatcmpl-flushthrow1",
  object: "chat.completion.chunk",
  choices: [null],
})}`;

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
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    provider: "openai",
    model: "m",
    body: { input: "hi" },
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
  return { text, readerError, completes, failures };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a throw while translating the unterminated EOF tail ends with one failure outcome and a failure terminal", async () => {
  const { text, readerError, completes, failures } = await run([
    chunk({ role: "assistant", content: "Hello" }),
    MALFORMED_FRAME, // no trailing newline: the frame is only seen by flush()
  ]);

  assert.equal(readerError, null, "content was already sent, so the failure terminal is queued");
  assert.match(text, /Hello/, "content sent before the throw stays delivered");
  assert.match(text, /event: response\.failed/, "the client gets a failure terminal");
  assert.equal(failures.length, 1, `onFailure must fire once, got ${failures.length}`);
  assert.equal(completes.length, 1, `onComplete must fire once, got ${completes.length}`);
  assert.equal(completes[0].status, 502);
  assert.ok(!/choices|TypeError|Cannot read/i.test(completes[0].error ?? ""), "no internal detail");
  assert.ok(!/Cannot read|TypeError/.test(text), "no internal detail reaches the client");
});

test("the same throw before any content rejects the stream and still records one failure", async () => {
  const { readerError, completes, failures } = await run([MALFORMED_FRAME]);

  assert.ok(readerError, "no content was sent, so the stream errors");
  assert.equal(failures.length, 1);
  assert.equal(completes.length, 1);
  assert.equal(completes[0].status, 502);
});

test("a clean translated stream still completes once with status 200", async () => {
  const { text, readerError, completes, failures } = await run([
    chunk({ role: "assistant", content: "Hello" }),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);

  assert.equal(readerError, null);
  assert.match(text, /response\.completed/);
  assert.equal(failures.length, 0);
  assert.equal(completes.length, 1);
  assert.equal(completes[0].status, 200);
});
