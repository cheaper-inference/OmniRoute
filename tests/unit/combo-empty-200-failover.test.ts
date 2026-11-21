import test from "node:test";
import assert from "node:assert/strict";
import { validateResponseQuality } from "../../open-sse/services/combo/validateQuality.ts";

const FLAG = "OMNIROUTE_COMBO_EMPTY_200_FAILOVER";
const log = { warn: () => {} };

function json(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

async function verdict(body: unknown, flag: boolean, trusted = false) {
  const previous = process.env[FLAG];
  if (flag) process.env[FLAG] = "true";
  else delete process.env[FLAG];
  try {
    return await validateResponseQuality(json(body), false, log, null, null, trusted);
  } finally {
    if (previous === undefined) delete process.env[FLAG];
    else process.env[FLAG] = previous;
  }
}

const chatVoid = (completionTokens: number | undefined, finish = "length") => ({
  choices: [{ finish_reason: finish, message: { role: "assistant", content: null } }],
  ...(completionTokens === undefined ? {} : { usage: { completion_tokens: completionTokens } }),
});

test("chat reply cut at length with a spent budget and no output: valid by default", async () => {
  assert.equal((await verdict(chatVoid(4096), false)).valid, true);
});

test("chat reply cut at length with a spent budget and no output: failover with the flag", async () => {
  const out = await verdict(chatVoid(4096), true);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /void/);
});

test("with the flag, a tiny-budget probe and a reply without usage stay valid", async () => {
  assert.equal((await verdict(chatVoid(1), true)).valid, true);
  assert.equal((await verdict(chatVoid(undefined), true)).valid, true);
});

test("with the flag, a trusted empty chat stop that counted no token fails over", async () => {
  assert.equal((await verdict(chatVoid(0, "stop"), false, true)).valid, true);
  const out = await verdict(chatVoid(0, "stop"), true, true);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /no output token/);
});

test("with the flag, a chat reply that has text or reasoning is untouched", async () => {
  const text = { choices: [{ finish_reason: "length", message: { content: "partial" } }] };
  const thought = {
    choices: [{ finish_reason: "length", message: { content: null, reasoning_content: "hm" } }],
    usage: { completion_tokens: 10 },
  };
  assert.equal((await verdict({ ...text, usage: { completion_tokens: 4096 } }, true)).valid, true);
  assert.equal((await verdict(thought, true)).valid, true);
});

const claudeEmpty = (outputTokens: number) => ({
  type: "message",
  role: "assistant",
  content: [],
  stop_reason: "end_turn",
  usage: { input_tokens: 40, output_tokens: outputTokens },
});

test("claude message with no content and no output token: valid by default, failover with the flag", async () => {
  assert.equal((await verdict(claudeEmpty(0), false)).valid, true);
  const out = await verdict(claudeEmpty(0), true);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /no output token/);
});

test("with the flag, a claude message that counted output tokens stays valid", async () => {
  assert.equal((await verdict(claudeEmpty(300), true)).valid, true);
});

const responsesEmpty = (outputTokens: number) => ({
  object: "response",
  status: "completed",
  output: [],
  usage: { input_tokens: 40, output_tokens: outputTokens },
});

test("trusted empty responses turn with no output token: valid by default, failover with the flag", async () => {
  assert.equal((await verdict(responsesEmpty(0), false, true)).valid, true);
  const out = await verdict(responsesEmpty(0), true, true);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /no output token/);
});

test("with the flag, a trusted empty responses turn that counted output tokens stays valid", async () => {
  assert.equal((await verdict(responsesEmpty(25), true, true)).valid, true);
});

const geminiEmpty = (candidatesTokens: number) => ({
  candidates: [{ content: { role: "model", parts: [] }, finishReason: "STOP" }],
  usageMetadata: { promptTokenCount: 12, candidatesTokenCount: candidatesTokens },
});

test("gemini empty STOP: valid by default, failover with the flag; a reply with text is untouched", async () => {
  assert.equal((await verdict(geminiEmpty(0), false)).valid, true);
  const out = await verdict(geminiEmpty(0), true);
  assert.equal(out.valid, false);
  assert.match(out.reason ?? "", /empty STOP/);
  const text = { candidates: [{ content: { parts: [{ text: "hi" }] }, finishReason: "STOP" }] };
  assert.equal((await verdict(text, true)).valid, true);
});

test("with the flag, a claude turn whose only output is reasoning stays valid", async () => {
  const thinking = {
    ...claudeEmpty(0),
    content: [{ type: "thinking", thinking: "weighing the options", signature: "sig" }],
  };
  const redacted = { ...claudeEmpty(0), content: [{ type: "redacted_thinking", data: "opaque" }] };
  assert.equal((await verdict(thinking, true)).valid, true);
  assert.equal((await verdict(redacted, true)).valid, true);
  const blank = { ...claudeEmpty(0), content: [{ type: "thinking", thinking: "  " }] };
  assert.equal((await verdict(blank, true)).valid, false, "blank reasoning is still empty");
});

test("with the flag, a gemini image-only STOP keeps the generated media", async () => {
  const image = {
    candidates: [
      {
        content: { parts: [{ inlineData: { mimeType: "image/png", data: "iVBORw0KGgo=" } }] },
        finishReason: "STOP",
      },
    ],
  };
  const file = {
    candidates: [
      {
        content: { parts: [{ fileData: { mimeType: "image/png", fileUri: "gs://b/o.png" } }] },
        finishReason: "STOP",
      },
    ],
  };
  assert.equal((await verdict(image, true)).valid, true);
  assert.equal((await verdict(file, true)).valid, true);
});
