import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tail-usage-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

type JsonRecord = Record<string, unknown>;

function chunk(delta: JsonRecord, finishReason: string | null = null, extra: JsonRecord = {}) {
  return `data: ${JSON.stringify({
    id: "chatcmpl-tail",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
    ...extra,
  })}\n\n`;
}

async function run(chunks: string[], extra: JsonRecord = {}) {
  const completions: JsonRecord[] = [];
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
  } as never);
  const text = await new Response(source.pipeThrough(stream)).text();
  const frames = text
    .split("\n")
    .filter((line) => line.startsWith("data:") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(5)) as JsonRecord);
  return { text, frames, completions };
}

const usageFrame = (tail: string) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-tail",
    object: "chat.completion.chunk",
    model: "m",
    choices: [],
    usage: { prompt_tokens: 111, completion_tokens: 22, total_tokens: 133 },
  })}${tail}`;

const usageFrames = (frames: JsonRecord[]) => frames.filter((frame) => frame.usage != null);
const finishFrames = (frames: JsonRecord[]) =>
  frames.filter((frame) =>
    ((frame.choices as JsonRecord[]) ?? []).some((choice) => choice.finish_reason != null)
  );

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const [name, tail] of [
  ["blank-line terminated", "\n\n"],
  ["one newline", "\n"],
  ["no newline", ""],
] as const) {
  test(`final trailing usage frame (${name}) is billed, not replaced by an estimate`, async () => {
    const result = await run([
      chunk({ role: "assistant", content: "hello world" }),
      chunk({}, "stop"),
      usageFrame(tail),
    ]);
    const usage = result.completions[0]?.usage as JsonRecord;
    assert.equal(usage?.prompt_tokens, 111, JSON.stringify(usage));
    assert.equal(usage?.completion_tokens, 22, JSON.stringify(usage));
    assert.equal(usageFrames(result.frames).length, 1, "one usage frame, no estimate on top");
    assert.equal(finishFrames(result.frames).length, 1, "one finish frame");
  });
}

test("finish chunk with usage in an unterminated tail adds no second finish or usage frame", async () => {
  const tailFrame = chunk({}, "stop", {
    usage: { prompt_tokens: 111, completion_tokens: 22, total_tokens: 133 },
  }).trimEnd();
  const result = await run([chunk({ role: "assistant", content: "hello world" }), tailFrame]);
  const usage = result.completions[0]?.usage as JsonRecord;
  assert.equal(usage?.prompt_tokens, 111, JSON.stringify(usage));
  assert.equal(usage?.completion_tokens, 22, JSON.stringify(usage));
  assert.equal(finishFrames(result.frames).length, 1, "the tail finish is the only finish");
  assert.equal(usageFrames(result.frames).length, 1, "the tail usage is the only usage");
});

test("a clean stream with an estimate-only ending still gets one estimated usage frame", async () => {
  const result = await run([
    chunk({ role: "assistant", content: "hello world" }),
    chunk({}, "stop"),
  ]);
  assert.equal(usageFrames(result.frames).length, 1);
  assert.equal(finishFrames(result.frames).length, 1);
});

test("a finish-only chunk in an unterminated tail is the only finish frame", async () => {
  const tailFrame = chunk({}, "stop").trimEnd();
  const result = await run([chunk({ role: "assistant", content: "hello world" }), tailFrame]);
  assert.equal(finishFrames(result.frames).length, 1, "no synthetic finish on top of the tail");
});

test("a Responses completed event without a trailing newline is billed with its own usage", async () => {
  const completed = `data: ${JSON.stringify({
    type: "response.completed",
    response: {
      id: "resp_1",
      status: "completed",
      output: [],
      usage: { input_tokens: 111, output_tokens: 22, total_tokens: 133 },
    },
  })}`;
  const delta = `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "hello world" })}\n\n`;
  const result = await run([delta, completed], {
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
  });
  const usage = result.completions[0]?.usage as JsonRecord;
  assert.equal(usage?.input_tokens ?? usage?.prompt_tokens, 111, JSON.stringify(usage));
  assert.equal(usage?.output_tokens ?? usage?.completion_tokens, 22, JSON.stringify(usage));
});

test("a finish chunk held by the line normalizer (one newline) is the only finish frame", async () => {
  const tailFrame = chunk({}, "stop").trimEnd() + "\n";
  const result = await run([chunk({ role: "assistant", content: "hello world" }), tailFrame]);
  assert.equal(finishFrames(result.frames).length, 1, "no synthetic finish on top of the tail");
});

for (const tail of ["\n", ""]) {
  test(`a Claude message_delta usage in the tail (${JSON.stringify(tail)}) is billed`, async () => {
    const claude = (event: JsonRecord) => `data: ${JSON.stringify(event)}\n\n`;
    const delta = `data: ${JSON.stringify({
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: { output_tokens: 22 },
    })}${tail}`;
    const result = await run(
      [
        claude({
          type: "message_start",
          message: {
            id: "msg_1",
            role: "assistant",
            usage: { input_tokens: 111, output_tokens: 1 },
          },
        }),
        claude({
          type: "content_block_start",
          index: 0,
          content_block: { type: "text", text: "" },
        }),
        claude({
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text: "hello" },
        }),
        claude({ type: "content_block_stop", index: 0 }),
        delta,
        ...(tail === "" ? [] : []),
      ],
      { clientResponseFormat: FORMATS.CLAUDE }
    );
    const usage = result.completions[0]?.usage as JsonRecord;
    assert.equal(usage?.prompt_tokens ?? usage?.input_tokens, 111, JSON.stringify(usage));
    assert.equal(usage?.completion_tokens ?? usage?.output_tokens, 22, JSON.stringify(usage));
  });
}
