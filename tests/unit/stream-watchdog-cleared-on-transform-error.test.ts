import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-watchdog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

type Handle = ReturnType<typeof setInterval>;

const frame = (choice: Record<string, unknown>) =>
  `data: ${JSON.stringify({
    id: "c1",
    object: "chat.completion.chunk",
    model: "m",
    choices: [{ index: 0, ...choice }],
  })}\n\n`;

/** Run `fn` while counting the setInterval handles it leaves live. */
async function withIntervalCount<T>(fn: (liveCount: () => number) => Promise<T>): Promise<T> {
  const realSet = globalThis.setInterval;
  const realClear = globalThis.clearInterval;
  const live = new Set<Handle>();
  globalThis.setInterval = ((...args: Parameters<typeof setInterval>) => {
    const handle = realSet(...args);
    live.add(handle);
    return handle;
  }) as typeof setInterval;
  globalThis.clearInterval = ((handle: Handle) => {
    live.delete(handle);
    return realClear(handle);
  }) as typeof clearInterval;
  try {
    return await fn(() => live.size);
  } finally {
    for (const handle of live) realClear(handle);
    globalThis.setInterval = realSet;
    globalThis.clearInterval = realClear;
  }
}

function translateStream() {
  return createSSEStream({
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.CLAUDE,
    provider: "test",
    model: "m",
    body: { messages: [{ role: "user", content: "hi" }] },
  } as never);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a transform that throws leaves no live idle watchdog interval", async () => {
  await withIntervalCount(async (liveCount) => {
    const source = new ReadableStream({
      start(controller) {
        controller.enqueue(
          textEncoder.encode(frame({ delta: { role: "assistant", content: "hi" } }))
        );
        // A malformed frame makes the translator throw inside transform().
        controller.enqueue(textEncoder.encode(frame({ delta: { tool_calls: [null] } })));
        controller.close();
      },
    });
    await assert.rejects(new Response(source.pipeThrough(translateStream())).text());
    assert.equal(liveCount(), 0, "the idle watchdog must be cleared once the stream failed");
  });
});

test("a stream that is still running keeps its idle watchdog armed", async () => {
  await withIntervalCount(async (liveCount) => {
    let finish: () => void = () => {};
    const source = new ReadableStream({
      start(controller) {
        controller.enqueue(
          textEncoder.encode(frame({ delta: { role: "assistant", content: "hi" } }))
        );
        finish = () => controller.close();
      },
    });
    const reader = source.pipeThrough(translateStream()).getReader();
    await reader.read();
    assert.equal(liveCount(), 1, "a live stream needs its watchdog");
    finish();
    while (!(await reader.read()).done);
    assert.equal(liveCount(), 0, "a completed stream clears it");
  });
});
