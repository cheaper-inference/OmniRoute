import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

// Follow-up to #18006: held-back tails of an Anthropic Messages stream must come back as the
// delta type of their block (text_delta / thinking_delta / input_json_delta) on the block's
// own index, before that block's content_block_stop. A `text_delta` carrying `thinking` or
// `partial_json` is ignored by Anthropic SDK accumulators, so the end of a thinking summary
// or of a tool input was silently lost; usage/signature metadata must pass through untouched.

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-claude-stream-"));
const savedEnv = {
  DATA_DIR: process.env.DATA_DIR,
  PII_RESPONSE_SANITIZATION: process.env.PII_RESPONSE_SANITIZATION,
  PII_TEST_BYPASS_MIN_WINDOW: process.env.PII_TEST_BYPASS_MIN_WINDOW,
};
process.env.DATA_DIR = tmpDir;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_TEST_BYPASS_MIN_WINDOW = "true";

test.after(async () => {
  await cleanupTempDataDir(tmpDir);
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

const { createCredentialSseTransform } =
  await import("../../src/lib/streamingCredentialTransform.ts");
const { createPiiSseTransform } = await import("../../src/lib/streamingPiiTransform.ts");

async function runTransform(transform: TransformStream, inputChunks: string[]): Promise<string> {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of inputChunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
  return new Response(source.pipeThrough(transform)).text();
}

const ev = (type: string, payload: object) =>
  "event: " + type + "\ndata: " + JSON.stringify({ type, ...payload }) + "\n\n";

type Delta = {
  type?: string;
  text?: string;
  thinking?: string;
  signature?: string;
  partial_json?: string;
};
type ClaudeFrame = {
  type?: string;
  index?: number;
  content_block?: { type?: string; name?: string };
  delta?: Delta;
  message?: { usage?: Record<string, unknown> };
};
type Frame = { event: string; data: ClaudeFrame };

// Every data frame with the `event:` name that preceded it (empty when none).
function parseFrames(output: string): Frame[] {
  const frames: Frame[] = [];
  let event = "";
  for (const line of output.split("\n")) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    else if (line.startsWith("data: ") && !line.includes("[DONE]")) {
      frames.push({ event, data: JSON.parse(line.slice(6)) });
    } else if (line.trim() === "") event = "";
  }
  return frames;
}

function accumulate(frames: Frame[]) {
  const text = new Map<number, string>();
  const thinking = new Map<number, string>();
  const signature = new Map<number, string>();
  const partialJson = new Map<number, string>();
  const stopped = new Set<number>();
  const lateDeltas: ClaudeFrame[] = [];
  const wrongType: ClaudeFrame[] = [];
  const wrongEvent: Array<{ event: string; type?: string }> = [];
  const blockType = new Map<number, string>();
  for (const { event, data: e } of frames) {
    if (event && event !== e.type) wrongEvent.push({ event, type: e.type });
    const index = e.index ?? 0;
    if (e.type === "content_block_start") blockType.set(index, e.content_block?.type ?? "");
    if (e.type === "content_block_stop") stopped.add(index);
    if (e.type !== "content_block_delta" || !e.delta) continue;
    if (stopped.has(index)) lateDeltas.push(e);
    const d = e.delta;
    const kind = blockType.get(index);
    if (d.type === "text_delta") {
      if (kind !== "text") wrongType.push(e);
      text.set(index, (text.get(index) ?? "") + (d.text ?? ""));
    } else if (d.type === "thinking_delta") {
      if (kind !== "thinking") wrongType.push(e);
      thinking.set(index, (thinking.get(index) ?? "") + (d.thinking ?? ""));
    } else if (d.type === "signature_delta") {
      signature.set(index, (signature.get(index) ?? "") + (d.signature ?? ""));
    } else if (d.type === "input_json_delta") {
      if (kind !== "tool_use") wrongType.push(e);
      partialJson.set(index, (partialJson.get(index) ?? "") + (d.partial_json ?? ""));
    }
  }
  return { text, thinking, signature, partialJson, lateDeltas, wrongType, wrongEvent };
}

const SIGNATURE = "CAQS" + "x".repeat(996); // 1000 chars, like Opus 5.5 signatures
const usage = { input_tokens: 10, output_tokens: 1, inference_geo: "global", speed: "standard" };

const messageStart = ev("message_start", {
  message: {
    id: "msg_1",
    type: "message",
    role: "assistant",
    model: "claude-opus-5-5",
    content: [],
    stop_reason: null,
    usage,
  },
});
const messageEnd =
  ev("message_delta", {
    delta: { stop_reason: "end_turn", stop_sequence: null },
    usage: { output_tokens: 97, inference_geo: "global", speed: "standard" },
  }) + ev("message_stop", {});

const summary = ["The user says ping. ", "I will keep this short ", "and answer in Polish."];
const reply = ["Pong. ", "Działam. ", "W czym mogę pomóc?"];

function thinkingThenText(): string[] {
  return [
    messageStart,
    ev("content_block_start", {
      index: 0,
      content_block: { type: "thinking", thinking: "", signature: "" },
    }),
    ev("content_block_delta", {
      index: 0,
      delta: { type: "thinking_delta", thinking: summary[0] },
    }),
    ev("ping", {}),
    ...summary
      .slice(1)
      .map((t) =>
        ev("content_block_delta", { index: 0, delta: { type: "thinking_delta", thinking: t } })
      ),
    ev("content_block_delta", {
      index: 0,
      delta: { type: "signature_delta", signature: SIGNATURE },
    }),
    ev("content_block_stop", { index: 0 }),
    ev("content_block_start", { index: 1, content_block: { type: "text", text: "" } }),
    ...reply.map((t) =>
      ev("content_block_delta", { index: 1, delta: { type: "text_delta", text: t } })
    ),
    ev("ping", {}),
    ev("content_block_stop", { index: 1 }),
    messageEnd,
  ];
}

test("thinking + text blocks: signature untouched, thinking stays thinking, text delivered on its own block", async () => {
  const output = await runTransform(createCredentialSseTransform(), thinkingThenText());
  const frames = parseFrames(output);
  const acc = accumulate(frames);
  assert.equal(acc.signature.get(0), SIGNATURE, "signature must pass through byte-for-byte");
  assert.equal(acc.thinking.get(0), summary.join(""), "thinking summary must be complete");
  assert.equal(acc.text.get(1), reply.join(""), "text block must be delivered completely");
  assert.equal(acc.text.get(0), undefined, "no text_delta on the thinking block");
  assert.deepEqual(acc.wrongType, [], "every delta type must match its block type");
  assert.deepEqual(acc.wrongEvent, [], "every flushed frame carries its own event line");
  assert.deepEqual(acc.lateDeltas, [], "no delta after its block's content_block_stop");
  assert.ok(!output.includes("globalstandard"), "usage metadata must never leak into text");
  const start = frames.find((f) => f.data.type === "message_start")!.data;
  assert.deepEqual(start.message?.usage, usage, "message_start usage untouched");
  const order = frames.map((f) => f.data.type + (f.data.index ?? ""));
  assert.ok(order.indexOf("content_block_stop0") < order.indexOf("content_block_start1"));
  assert.equal(frames.filter((f) => f.data.type === "ping").length, 2, "ping frames pass through");
});

test("text-only block: exact text, no metadata prefix", async () => {
  const chunks = ["", "Pong! 🏓 ", "How can I help you today?"];
  const input = [
    messageStart,
    ev("content_block_start", { index: 0, content_block: { type: "text", text: "" } }),
    ...chunks.map((t) =>
      ev("content_block_delta", { index: 0, delta: { type: "text_delta", text: t } })
    ),
    ev("content_block_stop", { index: 0 }),
    messageEnd,
  ];
  const acc = accumulate(parseFrames(await runTransform(createCredentialSseTransform(), input)));
  assert.equal(acc.text.get(0), chunks.join(""));
  assert.deepEqual(acc.lateDeltas, []);
  assert.deepEqual(acc.wrongEvent, []);
});

test("tool_use block: partial_json reassembles; text credential still redacted", async () => {
  const secret = "sk-proj-" + "A1b2C3d4".repeat(6);
  const args = JSON.stringify({ emoji: "😄", note: "x".repeat(600) });
  const input = [
    messageStart,
    ev("content_block_start", { index: 0, content_block: { type: "text", text: "" } }),
    ev("content_block_delta", {
      index: 0,
      delta: { type: "text_delta", text: "Key: " + secret.slice(0, 20) },
    }),
    ev("content_block_delta", {
      index: 0,
      delta: { type: "text_delta", text: secret.slice(20) + " done." },
    }),
    ev("content_block_stop", { index: 0 }),
    ev("content_block_start", {
      index: 1,
      content_block: { type: "tool_use", id: "toolu_1", name: "react_to_message", input: {} },
    }),
    ev("content_block_delta", {
      index: 1,
      delta: { type: "input_json_delta", partial_json: args.slice(0, 300) },
    }),
    ev("content_block_delta", {
      index: 1,
      delta: { type: "input_json_delta", partial_json: args.slice(300) },
    }),
    ev("content_block_stop", { index: 1 }),
    ev("message_delta", {
      delta: { stop_reason: "tool_use", stop_sequence: null },
      usage: { output_tokens: 50 },
    }),
    ev("message_stop", {}),
  ];
  const output = await runTransform(createCredentialSseTransform(), input);
  const frames = parseFrames(output);
  const acc = accumulate(frames);
  assert.ok(!output.includes(secret), "credential must be redacted");
  assert.ok(acc.text.get(0)!.startsWith("Key: "), "redacted text keeps its prefix");
  assert.ok(acc.text.get(0)!.endsWith(" done."), "redacted text keeps its suffix");
  assert.deepEqual(
    JSON.parse(acc.partialJson.get(1)!),
    JSON.parse(args),
    "tool input JSON must reassemble"
  );
  assert.deepEqual(acc.wrongType, []);
  assert.deepEqual(acc.lateDeltas, []);
  const start = frames.find(
    (f) => f.data.type === "content_block_start" && f.data.index === 1
  )!.data;
  assert.equal(start.content_block?.name, "react_to_message");
});

test("a block without its own content_block_stop is still drained at message_delta", async () => {
  const long = "a".repeat(1302);
  const input = [
    messageStart,
    ev("content_block_start", { index: 0, content_block: { type: "text", text: "" } }),
    ev("content_block_delta", { index: 0, delta: { type: "text_delta", text: long } }),
    ev("content_block_start", { index: 1, content_block: { type: "text", text: "" } }),
    ev("content_block_stop", { index: 1 }),
    messageEnd,
  ];
  const frames = parseFrames(await runTransform(createCredentialSseTransform(), input));
  const acc = accumulate(frames);
  assert.equal(acc.text.get(0), long, "the whole text of block 0 must arrive");
  const order = frames.map((f) => f.data.type);
  assert.ok(
    order.lastIndexOf("content_block_delta") < order.indexOf("message_delta"),
    "drained before message_delta"
  );
});

test("PII transform: Claude thinking tail comes back as thinking_delta, text as text_delta", async () => {
  const output = await runTransform(createPiiSseTransform({ windowSize: 8 }), thinkingThenText());
  const acc = accumulate(parseFrames(output));
  assert.equal(acc.signature.get(0), SIGNATURE);
  assert.equal(acc.thinking.get(0), summary.join(""));
  assert.equal(acc.text.get(1), reply.join(""));
  assert.deepEqual(acc.wrongType, []);
  assert.deepEqual(acc.wrongEvent, []);
  assert.deepEqual(acc.lateDeltas, []);
});

// A `ping` right before message_delta must not hide the Claude shape from the flush: the
// tails of blocks that never got their own content_block_stop still come back typed, each
// on its own block, instead of one generic clone of the last content frame.
const THINKING_TAIL = "c".repeat(1302);
const TEXT_TAIL = "b".repeat(1302);
function pingBeforeMessageDelta(): string[] {
  return [
    messageStart,
    ev("content_block_start", { index: 0, content_block: { type: "thinking", thinking: "" } }),
    ev("content_block_delta", {
      index: 0,
      delta: { type: "thinking_delta", thinking: THINKING_TAIL },
    }),
    ev("content_block_start", { index: 1, content_block: { type: "text", text: "" } }),
    ev("content_block_delta", { index: 1, delta: { type: "text_delta", text: TEXT_TAIL } }),
    ev("ping", {}),
    messageEnd,
  ];
}

for (const [name, make] of [
  ["credential", () => createCredentialSseTransform()],
  ["PII", () => createPiiSseTransform({ windowSize: 8 })],
] as const) {
  test(`${name} transform: ping right before message_delta still flushes typed deltas`, async () => {
    const output = await runTransform(make(), pingBeforeMessageDelta());
    const frames = parseFrames(output);
    const acc = accumulate(frames);
    assert.equal(acc.thinking.get(0), THINKING_TAIL, "the whole thinking of block 0 must arrive");
    assert.equal(acc.text.get(1), TEXT_TAIL, "the whole text of block 1 must arrive");
    assert.deepEqual(acc.wrongType, []);
    assert.deepEqual(acc.wrongEvent, []);
    assert.deepEqual(acc.lateDeltas, []);
    assert.ok(
      !frames.some((f) => f.data.type === "ping" && f.data.delta),
      "no delta is grafted onto the ping frame"
    );
    const order = frames.map((f) => f.data.type);
    assert.ok(
      order.lastIndexOf("content_block_delta") < order.indexOf("message_delta"),
      "drained before message_delta"
    );
  });
}
