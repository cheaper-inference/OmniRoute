import test from "node:test";
import assert from "node:assert/strict";

const { transformOpenAISSEToGeminiSSE } =
  await import("../../open-sse/translator/response/openai-to-gemini-sse.ts");
const { createSseHeartbeatTransform, HEARTBEAT_SHAPES } =
  await import("../../open-sse/utils/sseHeartbeat.ts");

// The OpenAI-shaped heartbeat (`choices: []`, no usage) reaches the Gemini translator when a
// stream is quiet. It used to be dropped, so a Gemini-native client with an idle-read timeout
// saw a silent socket. The @google/genai stream parser (probed 1.0.0, 1.22.0, 1.35.0, 2.0.0 against
// a loopback server) only drains `data: ...` frames: a colon comment breaks versions before 1.35 and
// a lone newline breaks versions before 1.22. The frame carries no candidates because a frame with
// an empty text part is stored by chat sessions (1.35+, 2.0) as an empty model turn per heartbeat;
// a no-candidates frame is not stored, and `chunk.text` is `undefined` (its declared type).

const KEEPALIVE_CHUNK = JSON.stringify({
  id: "chatcmpl-keepalive",
  object: "chat.completion.chunk",
  created: 0,
  model: "keepalive",
  choices: [],
});
const TEXT_CHUNK = (text: string) =>
  JSON.stringify({ id: "c", model: "m", choices: [{ index: 0, delta: { content: text } }] });
const FINISH_CHUNK = JSON.stringify({
  id: "c",
  model: "m",
  choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
});

async function transform(events: string[]): Promise<string> {
  const body = events.map((e) => `${e}\n\n`).join("");
  const upstream = new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
  return transformOpenAISSEToGeminiSSE(upstream, "gemini-test").text();
}

// Frames the way the oldest @google/genai parser (1.0.0) reads them.
const OLD_SDK_FRAME = /^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
const frames = (out: string) => out.split(/\r\n\r\n/).filter((f) => f.trim().length > 0);

test("a quiet-stream heartbeat becomes a data frame with no candidates", async () => {
  const out = await transform([
    `data: ${TEXT_CHUNK("a")}`,
    `data: ${KEEPALIVE_CHUNK}`,
    `data: ${TEXT_CHUNK("b")}`,
    `data: ${FINISH_CHUNK}`,
    "data: [DONE]",
  ]);
  const parsed = frames(out).map((f) => {
    assert.match(`${f}\r\n\r\n`, OLD_SDK_FRAME, "frame must parse in the oldest SDK");
    return JSON.parse(f.slice("data: ".length));
  });
  assert.equal(parsed.length, 4, "two text chunks, one heartbeat, one finish chunk");
  assert.deepEqual(parsed[1], { candidates: [] });
  assert.equal(parsed[0].candidates[0].content.parts[0].text, "a");
  assert.equal(parsed[2].candidates[0].content.parts[0].text, "b");
});

test("the Gemini wire never carries a colon comment or a bare newline", async () => {
  const out = await transform([
    `: upstream comment`,
    `data: ${KEEPALIVE_CHUNK}`,
    `data: ${TEXT_CHUNK("a")}`,
    `data: ${FINISH_CHUNK}`,
  ]);
  assert.doesNotMatch(out, /^:/m);
  assert.doesNotMatch(out, /(^|[^\n])\n(?!\n)(?<!\r\n)/, "no lone newline outside a frame end");
  for (const frame of frames(out)) assert.ok(frame.startsWith("data: "), frame);
});

test("a heartbeat chunk that carries usage is still the usage chunk, not a heartbeat", async () => {
  const usage = { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 };
  const out = await transform([
    `data: ${TEXT_CHUNK("a")}`,
    `data: ${JSON.stringify({ id: "c", model: "m", choices: [], usage })}`,
  ]);
  const parsed = frames(out).map((f) => JSON.parse(f.slice("data: ".length)));
  assert.equal(parsed.length, 2);
  assert.equal(parsed[1].usageMetadata.totalTokenCount, 5);
  assert.equal(parsed[1].candidates.length, 1);
});

test("a chunk without a choices array is dropped as before", async () => {
  const out = await transform([
    `data: ${JSON.stringify({ id: "c", model: "m" })}`,
    `data: ${TEXT_CHUNK("a")}`,
  ]);
  assert.equal(frames(out).length, 1);
});

test("the real mid-stream heartbeat (openai-chunk shape) reaches the Gemini client as a data frame", async () => {
  // /v1beta requests resolve to the openai client format, so the pipeline heartbeat is this shape.
  const enc = new TextEncoder();
  const upstream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(enc.encode(`data: ${TEXT_CHUNK("a")}\n\n`));
      await new Promise((resolve) => setTimeout(resolve, 120));
      controller.enqueue(enc.encode(`data: ${FINISH_CHUNK}\n\n`));
      controller.close();
    },
  });
  const beating = upstream.pipeThrough(
    createSseHeartbeatTransform({ intervalMs: 20, shape: HEARTBEAT_SHAPES.OPENAI_CHUNK })
  );
  const response = transformOpenAISSEToGeminiSSE(
    new Response(beating, { status: 200, headers: { "Content-Type": "text/event-stream" } }),
    "gemini-test"
  );
  const parsed = frames(await response.text()).map((f) => JSON.parse(f.slice("data: ".length)));
  const heartbeats = parsed.filter((c) => JSON.stringify(c) === '{"candidates":[]}');
  assert.ok(heartbeats.length >= 1, "at least one heartbeat frame reached the client");
  assert.equal(parsed[0].candidates[0].content.parts[0].text, "a");
  assert.equal(parsed.at(-1).candidates[0].finishReason, "STOP");
});
