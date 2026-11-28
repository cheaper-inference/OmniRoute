import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-eof-no-terminal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

type JsonRecord = Record<string, unknown>;

function chatChunk(delta: JsonRecord, finishReason: string | null = null) {
  return `data: ${JSON.stringify({
    id: "chatcmpl-eof",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

async function run(chunks: string[], extra: JsonRecord = {}) {
  const completions: JsonRecord[] = [];
  const failures: JsonRecord[] = [];
  const source = new ReadableStream({
    start(controller) {
      for (const text of chunks) controller.enqueue(textEncoder.encode(text));
      controller.close();
    },
  });
  const stream = createSSEStream({
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "openai",
    model: "m",
    body: { messages: [{ role: "user", content: "hi" }] },
    ...extra,
    onComplete: (payload: JsonRecord) => completions.push(payload),
    onFailure: (payload: JsonRecord) => {
      failures.push(payload);
      return true;
    },
  } as never);
  const text = await new Response(source.pipeThrough(stream)).text();
  return { text, completions, failures };
}

const finishReasons = (text: string) =>
  [...text.matchAll(/"finish_reason":"([a-z_]+)"/g)].map((match) => match[1]);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("chat stream that hits EOF after content with no finish_reason and no [DONE] is a failure, not a 200 stop", async () => {
  const result = await run([chatChunk({ role: "assistant", content: "partial answer" })]);
  assert.deepEqual(finishReasons(result.text), [], "no fabricated finish_reason");
  assert.match(result.text, /terminal marker/);
  assert.equal(result.failures.length, 1, "one failure callback");
  assert.equal(result.failures[0].code, "stream_early_eof");
  assert.equal(result.completions.filter((c) => c.status === 200).length, 0, "no 200 completion");
  assert.equal(result.completions[0]?.status, 502);
});

test("chat stream that hits EOF after a tool call with no finish_reason is a failure", async () => {
  const toolDelta = {
    tool_calls: [
      { index: 0, id: "call_1", type: "function", function: { name: "f", arguments: '{"a":' } },
    ],
  };
  const result = await run([chatChunk(toolDelta)]);
  assert.deepEqual(finishReasons(result.text), []);
  assert.equal(result.failures.length, 1);
  assert.equal(result.completions.filter((c) => c.status === 200).length, 0);
});

test("a bare [DONE] without finish_reason still gets the stop frame strict clients need", async () => {
  const result = await run([
    chatChunk({ role: "assistant", content: "hello" }),
    "data: [DONE]\n\n",
  ]);
  assert.deepEqual(finishReasons(result.text), ["stop"]);
  assert.equal(result.failures.length, 0);
  assert.equal(result.completions[0]?.status, 200);
});

test("a stream with an upstream finish_reason and no [DONE] still completes as 200", async () => {
  const result = await run([
    chatChunk({ role: "assistant", content: "hello" }),
    chatChunk({}, "stop"),
  ]);
  assert.deepEqual(finishReasons(result.text), ["stop"]);
  assert.equal(result.failures.length, 0);
  assert.equal(result.completions[0]?.status, 200);
});

test("an empty stream with no content keeps its previous handling (no new failure here)", async () => {
  const result = await run([chatChunk({ role: "assistant" })]);
  assert.equal(result.failures.length, 0);
});

test("Responses stream that hits EOF after text with no terminal event is a failure, not a 200", async () => {
  const delta = `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "partial" })}\n\n`;
  const result = await run([delta], { clientResponseFormat: FORMATS.OPENAI_RESPONSES });
  assert.match(result.text, /response\.failed/);
  assert.equal(result.failures.length, 1);
  assert.equal(result.completions.filter((c) => c.status === 200).length, 0);
});

test("Responses stream with response.completed still completes as 200", async () => {
  const delta = `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "ok" })}\n\n`;
  const done = `data: ${JSON.stringify({
    type: "response.completed",
    response: { id: "resp_1", status: "completed", output: [] },
  })}\n\n`;
  const result = await run([delta, done], { clientResponseFormat: FORMATS.OPENAI_RESPONSES });
  assert.equal(result.failures.length, 0);
  assert.equal(result.completions[0]?.status, 200);
});

test("the failure completion of a cut stream keeps the usage the provider already reported", async () => {
  const usageChunk = `data: ${JSON.stringify({
    id: "chatcmpl-eof",
    object: "chat.completion.chunk",
    model: "m",
    choices: [{ index: 0, delta: { content: "partial" }, finish_reason: null }],
    usage: { prompt_tokens: 111, completion_tokens: 22, total_tokens: 133 },
  })}\n\n`;
  const result = await run([usageChunk]);
  assert.equal(result.completions[0]?.status, 502);
  const usage = result.completions[0]?.usage as JsonRecord;
  assert.equal(usage?.prompt_tokens, 111, JSON.stringify(usage));
  assert.equal(usage?.completion_tokens, 22, JSON.stringify(usage));
});
