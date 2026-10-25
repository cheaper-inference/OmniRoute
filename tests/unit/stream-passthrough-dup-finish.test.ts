import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dup-finish-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

type JsonRecord = Record<string, unknown>;

function sourceOf(chunks: string[]) {
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(textEncoder.encode(chunk));
      controller.close();
    },
  });
}

function passthroughOptions(extra: JsonRecord = {}) {
  return {
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "openrouter",
    model: "stealth/ox-alpha",
    body: { messages: [{ role: "user", content: "hi" }] },
    ...extra,
  };
}

async function readTransformed(chunks: string[], options: JsonRecord) {
  return new Response(sourceOf(chunks).pipeThrough(createSSEStream(options as never))).text();
}

function dataPayloads(text: string): JsonRecord[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("data:") && line.slice(5).trim() !== "[DONE]")
    .map((line) => JSON.parse(line.slice(5).trim()) as JsonRecord);
}

function finishReasons(payloads: JsonRecord[]): unknown[] {
  return payloads
    .flatMap((payload) => (Array.isArray(payload.choices) ? payload.choices : []))
    .map((choice) => (choice as JsonRecord).finish_reason)
    .filter((reason) => reason !== null && reason !== undefined);
}

function chunk(choice: JsonRecord, extra: JsonRecord = {}) {
  return `data: ${JSON.stringify({
    id: "gen-dup",
    object: "chat.completion.chunk",
    created: 1,
    model: "stealth/ox-alpha",
    choices: [{ index: 0, ...choice }],
    ...extra,
  })}\n\n`;
}

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("passthrough drops a duplicate finish chunk and keeps its usage", async () => {
  let completed: JsonRecord | null = null;
  const text = await readTransformed(
    [
      chunk({ delta: { role: "assistant", content: "hi" }, finish_reason: null }),
      chunk({ delta: {}, finish_reason: "stop" }),
      chunk(
        { delta: {}, finish_reason: "stop" },
        { usage: { prompt_tokens: 3, completion_tokens: 5, total_tokens: 8 } }
      ),
      "data: [DONE]\n\n",
    ],
    passthroughOptions({
      onComplete: (payload: JsonRecord) => {
        completed = payload;
      },
    })
  );

  const payloads = dataPayloads(text);
  assert.deepEqual(
    finishReasons(payloads),
    ["stop"],
    "exactly one finish_reason reaches the client"
  );
  const usageChunks = payloads.filter((payload) => payload.usage);
  assert.equal(usageChunks.length, 1, "the dropped duplicate's usage is still reported once");
  const usage = usageChunks[0].usage as JsonRecord;
  assert.equal(usage.completion_tokens, 5);
  assert.equal(usage.prompt_tokens, 3);
  assert.equal(text.match(/data: \[DONE\]/g)?.length, 1);
  assert.ok(completed, "onComplete still fires");
});

test("passthrough keeps the first finish chunk's usage when the duplicate repeats it", async () => {
  const text = await readTransformed(
    [
      chunk({ delta: { role: "assistant", content: "hello" }, finish_reason: null }),
      chunk(
        { delta: {}, finish_reason: "stop" },
        { usage: { prompt_tokens: 3, completion_tokens: 7, total_tokens: 10 } }
      ),
      chunk(
        { delta: {}, finish_reason: "stop" },
        { usage: { prompt_tokens: 3, completion_tokens: 7, total_tokens: 10 } }
      ),
      "data: [DONE]\n\n",
    ],
    passthroughOptions()
  );

  const payloads = dataPayloads(text);
  assert.deepEqual(finishReasons(payloads), ["stop"]);
  assert.equal(payloads.filter((payload) => payload.usage).length, 1);
});

test("native_finish_reason error with an empty completion fails the stream", async () => {
  const failures: JsonRecord[] = [];
  const stream = sourceOf([
    chunk({ delta: {}, finish_reason: "stop", native_finish_reason: "network_error" }),
    "data: [DONE]\n\n",
  ]).pipeThrough(
    createSSEStream(
      passthroughOptions({
        onFailure: (payload: JsonRecord) => {
          failures.push(payload);
        },
      }) as never
    )
  );

  await assert.rejects(
    () => new Response(stream).text(),
    (error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      assert.match(message, /network_error/);
      assert.ok(!message.includes("at /"), "no stack trace leaks into the stream error");
      return true;
    }
  );
  assert.equal(failures.length, 1, "the failure is reported so the account loop can fall back");
  assert.equal(failures[0].status, 502);
  assert.equal(failures[0].code, "upstream_native_finish_error");
});

test("native_finish_reason error after real content passes through untouched", async () => {
  const text = await readTransformed(
    [
      chunk({ delta: { role: "assistant", content: "partial answer" }, finish_reason: null }),
      chunk({ delta: {}, finish_reason: "stop", native_finish_reason: "network_error" }),
      "data: [DONE]\n\n",
    ],
    passthroughOptions()
  );

  const payloads = dataPayloads(text);
  assert.match(text, /partial answer/);
  assert.deepEqual(finishReasons(payloads), ["stop"]);
  assert.equal(text.match(/data: \[DONE\]/g)?.length, 1);
});

test("native_finish_reason error after a tool call passes through untouched", async () => {
  const text = await readTransformed(
    [
      chunk({
        delta: {
          role: "assistant",
          tool_calls: [
            {
              index: 0,
              id: "call_1",
              type: "function",
              function: { name: "lookup", arguments: "{}" },
            },
          ],
        },
        finish_reason: null,
      }),
      chunk({ delta: {}, finish_reason: "tool_calls", native_finish_reason: "error" }),
      "data: [DONE]\n\n",
    ],
    passthroughOptions()
  );

  assert.deepEqual(finishReasons(dataPayloads(text)), ["tool_calls"]);
});

test("benign native_finish_reason with an empty completion is not treated as a failure", async () => {
  const text = await readTransformed(
    [chunk({ delta: {}, finish_reason: "stop", native_finish_reason: "stop" }), "data: [DONE]\n\n"],
    passthroughOptions()
  );

  assert.deepEqual(finishReasons(dataPayloads(text)), ["stop"]);
});
