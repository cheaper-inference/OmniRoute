/**
 * A mid-stream upstream failure after client-visible content keeps its queued
 * error terminal for a slow reader (controller.error() would discard it), and
 * still ends the stream there: no synthetic finish_reason / [DONE], no 200
 * onComplete, and nothing forwarded after the terminal. A failure before any
 * content still rejects the stream.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { FORMATS } from "../../open-sse/translator/formats.ts";

// The SSE transform persists usage through the usage DB: isolate it in a
// throwaway DATA_DIR and release the handle in `after` so the runner exits.
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-stream-terminal-"));
process.env.DATA_DIR = dataDir;
const dbCore = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

test.after(() => {
  dbCore.resetDbInstance();
  if (existsSync(dataDir)) {
    rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

const encoder = new TextEncoder();
const FAILURE_MESSAGE = "Upstream cut the stream after partial content";

const contentFrame = (content: string) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-terminal",
    object: "chat.completion.chunk",
    created: 1,
    model: "test-model",
    choices: [{ delta: { content }, index: 0 }],
  })}\n\n`;
const failureFrame = `data: ${JSON.stringify({
  error: { message: FAILURE_MESSAGE, code: "stream_terminated" },
})}\n\n`;

type RunResult = {
  output: string;
  readErrored: boolean;
  writeErrored: boolean;
  failures: number;
  completes: Array<{ status: number }>;
};

async function run(frames: string[], { slowReader }: { slowReader: boolean }): Promise<RunResult> {
  let failures = 0;
  const completes: Array<{ status: number }> = [];
  const transform = createSSEStream({
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "test",
    model: "test-model",
    body: { messages: [{ role: "user", content: "hi" }] },
    // Mark the failure handled so the aborter does not also clear the pending
    // request; the terminal decision stays in production code.
    onFailure: () => {
      failures++;
      return true;
    },
    onComplete: (payload: { status: number }) => {
      completes.push({ status: payload.status });
    },
  });
  const writer = transform.writable.getWriter();
  let writeErrored = false;
  const writing = (async () => {
    try {
      for (const frame of frames) await writer.write(encoder.encode(frame));
      await writer.close();
    } catch {
      writeErrored = true;
    }
  })();
  // A slow reader lets the whole upstream be written before the first read.
  if (slowReader) await new Promise((resolve) => setTimeout(resolve, 300));

  const reader = transform.readable.getReader();
  const decoder = new TextDecoder();
  let output = "";
  let readErrored = false;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      output += decoder.decode(value, { stream: true });
    }
  } catch {
    readErrored = true;
  }
  await writing;
  return { output, readErrored, writeErrored, failures, completes };
}

function assertEndsAtTerminal(result: RunResult) {
  assert.equal(result.readErrored, false, "the reader is not cut off by a rejected readable side");
  assert.ok(result.output.includes("Hello"), "content queued before the failure survives");
  assert.equal(
    result.output.split(FAILURE_MESSAGE).length - 1,
    1,
    "the queued failure terminal is delivered exactly once"
  );
  const afterTerminal = result.output.slice(result.output.indexOf(FAILURE_MESSAGE));
  assert.equal(afterTerminal.includes("finish_reason"), false, "no synthetic finish after it");
  assert.equal(result.output.includes("[DONE]"), false, "no [DONE] after a failure");
  assert.equal(
    result.completes.some((entry) => entry.status === 200),
    false,
    "a failed stream is never reported as a 200 completion"
  );
  assert.equal(result.failures, 1);
}

test("slow reader: a failure after content keeps the terminal and ends the stream there", async () => {
  assertEndsAtTerminal(await run([contentFrame("Hello"), failureFrame], { slowReader: true }));
});

test("fast reader: a failure after content ends the stream at the terminal", async () => {
  assertEndsAtTerminal(await run([contentFrame("Hello"), failureFrame], { slowReader: false }));
});

test("nothing upstream sends after the terminal is forwarded, and the upstream side errors", async () => {
  const result = await run(
    [contentFrame("Hello"), failureFrame, contentFrame("AFTER-FAIL"), "data: [DONE]\n\n"],
    { slowReader: true }
  );
  assertEndsAtTerminal(result);
  assert.equal(result.output.includes("AFTER-FAIL"), false);
  assert.equal(result.writeErrored, true, "the writable side errors so the upstream is cancelled");
});

test("a failure before any content still rejects the stream", async () => {
  const result = await run([failureFrame], { slowReader: true });
  assert.equal(result.readErrored, true);
  assert.equal(
    result.completes.some((entry) => entry.status === 200),
    false
  );
});
