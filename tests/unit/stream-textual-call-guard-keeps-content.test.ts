import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-textual-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();

type JsonRecord = Record<string, unknown>;

const chunk = (delta: JsonRecord, finishReason: string | null = null) =>
  `data: ${JSON.stringify({
    id: "c1",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;

async function run(chunks: string[]) {
  const source = new ReadableStream({
    start(controller) {
      for (const text of chunks) controller.enqueue(textEncoder.encode(text));
      controller.close();
    },
  });
  const stream = createSSEStream({
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "test",
    model: "m",
    body: {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "terminal", parameters: { type: "object" } } }],
    },
  } as never);
  const text = await new Response(source.pipeThrough(stream)).text();
  return text
    .split("\n")
    .filter((line) => line.startsWith("data:") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(5)) as JsonRecord);
}

const choiceOf = (frame: JsonRecord) => ((frame.choices as JsonRecord[]) ?? [])[0] ?? {};
const contentOf = (frame: JsonRecord) => {
  const content = (choiceOf(frame).delta as JsonRecord | undefined)?.content;
  return typeof content === "string" ? content : "";
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a held textual-call header that never completes is sent before the finish frame, not after", async () => {
  const held = '[Tool call: terminal]\nArguments: {"command":';
  const frames = await run([
    chunk({ role: "assistant", content: held }),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);
  const finishAt = frames.findIndex((frame) => choiceOf(frame).finish_reason);
  assert.ok(finishAt >= 0, "a finish frame is sent");
  const lateContent = frames
    .slice(finishAt + 1)
    .map(contentOf)
    .join("");
  assert.equal(lateContent, "", "no content after the finish frame");
  assert.equal(
    frames
      .slice(0, finishAt + 1)
      .map(contentOf)
      .join(""),
    held
  );
});

test("a long unparseable textual-call header keeps every content character", async () => {
  const head = '[Tool call: terminal]\nArguments: {"command":"';
  const filler = "x".repeat(8 * 1024);
  const pieces = [head, ...Array.from({ length: 10 }, () => filler)]; // ~80 KiB, over the 64 KiB hold
  const frames = await run([
    ...pieces.map((piece, i) =>
      chunk(i === 0 ? { role: "assistant", content: piece } : { content: piece })
    ),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);
  assert.equal(frames.map(contentOf).join(""), pieces.join(""));
});

test("a complete declared textual call is still converted to a tool call", async () => {
  const frames = await run([
    chunk({ role: "assistant", content: '[Tool call: terminal]\nArguments: {"command":"ls"}' }),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);
  const calls = frames.flatMap((frame) => {
    const delta = choiceOf(frame).delta as JsonRecord | undefined;
    return (delta?.tool_calls as JsonRecord[] | undefined) ?? [];
  });
  assert.equal(calls.length, 1);
  assert.equal(frames.map(contentOf).join(""), "");
});

test("prose that mentions a tool call and then continues is passed through unchanged", async () => {
  const frames = await run([
    chunk({ role: "assistant", content: "Use [" }),
    chunk({ content: "Tool call: terminal] to run it." }),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);
  assert.equal(frames.map(contentOf).join(""), "Use [Tool call: terminal] to run it.");
});
