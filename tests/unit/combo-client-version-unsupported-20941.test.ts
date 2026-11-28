import test, { after } from "node:test";
import assert from "node:assert/strict";
import { validateResponseQuality } from "../../open-sse/services/combo/validateQuality.ts";
import { handleComboChat } from "../../open-sse/services/combo.ts";
import { shutdownDbInstance } from "../../src/lib/db/core.ts";

after(async () => {
  await shutdownDbInstance();
});

const enc = new TextEncoder();
const noopLog = { warn: () => {}, info: () => {}, debug: () => {}, error: () => {} };

const NOTICE =
  "This version of Antigravity is no longer supported. Please download and install the latest version from https://antigravity.google/download.";
const PYTHON_ANSWER = "This version of Python is no longer supported, so upgrade to 3.12.";

function openAiBody(content: string) {
  return {
    id: "x",
    object: "chat.completion",
    model: "test-model",
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    usage: { prompt_tokens: 10, completion_tokens: 69, total_tokens: 79 },
  };
}

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function sseResponse(frames: string[]): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        for (const frame of frames) controller.enqueue(enc.encode(frame));
        controller.close();
      },
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );
}

const chunk = (delta: object, finish: string | null = null) =>
  `data: ${JSON.stringify({ id: "x", object: "chat.completion.chunk", choices: [{ index: 0, delta, finish_reason: finish }] })}\n\n`;

function openAiSse(parts: string[]): Response {
  return sseResponse([
    chunk({ role: "assistant", content: "" }),
    ...parts.map((content) => chunk({ content })),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);
}

test("#20941 non-streaming: 200 client-version notice fails the quality gate with 410", async () => {
  const q = await validateResponseQuality(jsonResponse(openAiBody(NOTICE)), false, noopLog);
  assert.equal(q.valid, false);
  assert.equal(q.upstreamFailure?.status, 410);
  assert.equal(q.upstreamFailure?.type, "model_unavailable");
  assert.equal(q.upstreamFailure?.code, "client_version_unsupported");
  assert.equal(q.upstreamFailure?.requestScoped, false);
  assert.equal(q.upstreamFailure?.retryable, false);
});

test("#20941 non-streaming: Claude content[].text shape and the agy name fail too", async () => {
  const claude = await validateResponseQuality(
    jsonResponse({
      id: "msg_1",
      type: "message",
      role: "assistant",
      content: [{ type: "text", text: NOTICE }],
      stop_reason: "end_turn",
    }),
    false,
    noopLog
  );
  assert.equal(claude.valid, false);
  assert.equal(claude.upstreamFailure?.code, "client_version_unsupported");

  const agy = await validateResponseQuality(
    jsonResponse(openAiBody("This version of agy is no longer supported. Please update.")),
    false,
    noopLog
  );
  assert.equal(agy.valid, false);
});

test("#20941 streaming: notice in one delta after a role chunk fails the quality gate", async () => {
  const q = await validateResponseQuality(openAiSse([NOTICE]), true, noopLog);
  assert.equal(q.valid, false);
  assert.equal(q.upstreamFailure?.status, 410);
  assert.equal(q.upstreamFailure?.code, "client_version_unsupported");
});

test("#20941 streaming: notice split across SSE chunks still fails over", async () => {
  const q = await validateResponseQuality(
    openAiSse(["This ", "version of Anti", "gravity is no lon", "ger supported. Please download"]),
    true,
    noopLog
  );
  assert.equal(q.valid, false);
  assert.equal(q.upstreamFailure?.code, "client_version_unsupported");
});

test("#20941 guard: normal answers stay valid and replay intact", async () => {
  assert.equal(
    (await validateResponseQuality(jsonResponse(openAiBody("Hello there")), false, noopLog)).valid,
    true
  );
  const q = await validateResponseQuality(openAiSse(["Hello ", "there"]), true, noopLog);
  assert.equal(q.valid, true);
  const replay = await q.clonedResponse?.text();
  assert.match(replay ?? "", /Hello/);
  assert.match(replay ?? "", /there/);
});

test("#20941 guard: a real answer about another product's version stays valid", async () => {
  const nonStreaming = await validateResponseQuality(
    jsonResponse(openAiBody(PYTHON_ANSWER)),
    false,
    noopLog
  );
  assert.equal(nonStreaming.valid, true);

  const frames = ["This version of ", "Python is no longer ", "supported, so upgrade to 3.12."];
  const q = await validateResponseQuality(openAiSse(frames), true, noopLog);
  assert.equal(q.valid, true);
  const replay = (await q.clonedResponse?.text()) ?? "";
  for (const frame of frames) assert.ok(replay.includes(frame), `replay lost "${frame}"`);
});

test("#20941 guard: mid-text mention of the notice is not a provider notice", async () => {
  const text = `The tool printed: "${NOTICE}" - update your client.`;
  const q = await validateResponseQuality(jsonResponse(openAiBody(text)), false, noopLog);
  assert.equal(q.valid, true);
});

test("#20941 integration: handleComboChat fails over from the version-notice target to its sibling", async () => {
  const tried: string[] = [];
  const res = await handleComboChat({
    body: { model: "ver-combo", stream: false, messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "ver-combo",
      strategy: "priority",
      models: [{ model: "openai/outdated-client-model" }, { model: "openai/healthy-model" }],
    },
    handleSingleModel: async (_body, modelStr) => {
      tried.push(modelStr);
      if (modelStr.includes("outdated-client-model")) return jsonResponse(openAiBody(NOTICE));
      return jsonResponse(openAiBody("Healthy reply"));
    },
    log: noopLog,
    settings: {},
    allCombos: [],
  });

  assert.equal(res.status, 200);
  const json = (await res.json()) as { choices: Array<{ message: { content: string } }> };
  assert.equal(json.choices[0].message.content, "Healthy reply");
  assert.deepEqual(tried, ["openai/outdated-client-model", "openai/healthy-model"]);
});
