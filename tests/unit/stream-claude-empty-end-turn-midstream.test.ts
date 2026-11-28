import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-empty-end-turn-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

type JsonRecord = Record<string, unknown>;

const frame = (event: JsonRecord, terminator = "\n\n") =>
  `event: ${event.type}\ndata: ${JSON.stringify(event)}${terminator}`;

const messageStart = frame({
  type: "message_start",
  message: {
    id: "msg_empty",
    type: "message",
    role: "assistant",
    model: "claude-sonnet-4",
    content: [],
    stop_reason: null,
    usage: { input_tokens: 7, output_tokens: 0 },
  },
});

const messageDelta = (stopReason: string | null) =>
  frame({
    type: "message_delta",
    delta: stopReason ? { stop_reason: stopReason, stop_sequence: null } : {},
    usage: { output_tokens: 1 },
  });

const messageStop = (terminator = "\n\n") => frame({ type: "message_stop" }, terminator);

async function run(chunks: string[]) {
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
    sourceFormat: FORMATS.CLAUDE,
    clientResponseFormat: FORMATS.CLAUDE,
    provider: "claude",
    model: "claude-sonnet-4",
    body: { messages: [{ role: "user", content: "hello" }] },
    onComplete: (payload: JsonRecord) => completions.push(payload),
    onFailure: (payload: JsonRecord) => {
      failures.push(payload);
      return true;
    },
  } as never);
  try {
    const text = await new Response(source.pipeThrough(stream)).text();
    return { text, completions, failures, rejected: null as unknown };
  } catch (error) {
    return { text: "", completions, failures, rejected: error };
  }
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const stopReason of ["end_turn", "stop_sequence"]) {
  test(`a clean empty Claude ${stopReason} with no content block finishes without an empty_response error`, async () => {
    const result = await run([messageStart, messageDelta(stopReason), messageStop()]);
    assert.equal(result.rejected, null, String(result.rejected));
    assert.equal(result.failures.length, 0, JSON.stringify(result.failures));
    assert.match(result.text, /event: message_stop/);
    assert.equal(result.completions[0]?.status, 200);
  });
}

test("a clean empty Claude end_turn whose message_stop has no trailing newline finishes cleanly", async () => {
  const result = await run([messageStart, messageDelta("end_turn"), messageStop("")]);
  assert.equal(result.rejected, null, String(result.rejected));
  assert.equal(result.failures.length, 0, JSON.stringify(result.failures));
  assert.match(result.text, /event: message_stop/);
  assert.equal(result.completions[0]?.status, 200);
});

test("an empty Claude stream that stops with content_filter is still an empty_response error", async () => {
  const result = await run([messageStart, messageDelta("content_filter"), messageStop()]);
  assert.ok(result.rejected, "stream must reject");
  assert.equal(result.failures[0]?.code, "empty_response");
});

test("an empty Claude stream with no stop_reason is still an empty_response error", async () => {
  const result = await run([messageStart, messageStop()]);
  assert.ok(result.rejected, "stream must reject");
  assert.equal(result.failures[0]?.code, "empty_response");
});

test("an empty Claude end_turn that never reaches message_stop is still an error", async () => {
  const result = await run([messageStart, messageDelta("end_turn")]);
  assert.ok(result.rejected, "stream must reject");
  assert.equal(result.failures[0]?.code, "empty_response");
});
