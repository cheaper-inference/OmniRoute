import test from "node:test";
import assert from "node:assert/strict";

// End to end through the production stream factory: this is the exact call
// open-sse/handlers/chatCore/streamingTail.ts makes (translate mode, provider
// format OPENAI, client format ANTIGRAVITY after POST /v1/antigravity, or GEMINI
// for a body detected as Gemini). Nothing is mocked: the real translator
// registry, the real usage accounting and the real SSE serializer run.
await import("../../open-sse/translator/bootstrap.ts");
const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const encoder = new TextEncoder();

const USAGE = {
  prompt_tokens: 11,
  completion_tokens: 5,
  total_tokens: 16,
  prompt_tokens_details: { cached_tokens: 4 },
  completion_tokens_details: { reasoning_tokens: 2 },
};
const EXPECTED_USAGE_METADATA = {
  promptTokenCount: 11,
  candidatesTokenCount: 5,
  totalTokenCount: 16,
  thoughtsTokenCount: 2,
  cachedContentTokenCount: 4,
};

const textChunk = {
  id: "chatcmpl-su1",
  object: "chat.completion.chunk",
  model: "gpt-4.1",
  choices: [{ index: 0, delta: { role: "assistant", content: "hello" }, finish_reason: null }],
};
const finishChunk = {
  id: "chatcmpl-su1",
  object: "chat.completion.chunk",
  model: "gpt-4.1",
  choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
};
const usageOnlyChunk = {
  id: "chatcmpl-su1",
  object: "chat.completion.chunk",
  model: "gpt-4.1",
  choices: [],
  usage: USAGE,
};

function sse(payload: unknown) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

async function run(clientFormat: string, events: string[]) {
  const source = new ReadableStream({
    start(controller) {
      for (const event of events) controller.enqueue(encoder.encode(event));
      controller.close();
    },
  });
  let completed: { status?: number; usage?: unknown } | null = null;
  const transform = createSSETransformStreamWithLogger(
    FORMATS.OPENAI,
    clientFormat,
    "openai",
    null,
    null,
    "gpt-4.1",
    null,
    { messages: [{ role: "user", content: "hi" }] },
    (payload) => {
      completed = payload;
    }
  );
  const text = await new Response(source.pipeThrough(transform)).text();
  return { text, completed };
}

// Every SSE event the client receives must be `data: <json>` (or a `:` comment),
// so a strict JSON.parse client never hits a malformed or `[DONE]` line.
function parseWellFormed(text: string, clientFormat: string = FORMATS.ANTIGRAVITY) {
  const payloads: Array<{
    response: {
      candidates: Array<{ finishReason?: string; content: { parts: Array<{ text?: string }> } }>;
      usageMetadata?: Record<string, number>;
      modelVersion?: string;
      responseId?: string;
    };
  }> = [];
  const blocks = text.split("\n\n").filter((b) => b.trim() !== "");
  // Gemini-format clients still get the OpenAI-style [DONE] terminator (existing
  // behavior, independent of usage); it must be the very last event. Antigravity
  // gets none: the Go IDE client fails to parse it.
  if (clientFormat === FORMATS.GEMINI) {
    assert.equal(blocks[blocks.length - 1], "data: [DONE]");
    blocks.pop();
  } else {
    assert.doesNotMatch(text, /\[DONE\]/, "Antigravity/cloudcode clients get no [DONE] sentinel");
  }
  for (const block of blocks) {
    if (block.startsWith(":")) continue;
    assert.match(block, /^data: \{.*\}$/s, `malformed SSE event: ${block}`);
    payloads.push(JSON.parse(block.slice("data: ".length)));
  }
  return payloads;
}

for (const clientFormat of [FORMATS.ANTIGRAVITY, FORMATS.GEMINI]) {
  test(`SSE stream OPENAI -> ${clientFormat}: a trailing usage-only chunk reaches the client as exactly one usageMetadata event`, async () => {
    const { text } = await run(clientFormat, [
      sse(textChunk),
      sse(finishChunk),
      sse(usageOnlyChunk),
      "data: [DONE]\n\n",
    ]);
    const events = parseWellFormed(text, clientFormat);

    const withUsage = events.filter((e) => e.response.usageMetadata);
    assert.equal(withUsage.length, 1, `expected one usageMetadata event, got: ${text}`);
    assert.deepEqual(withUsage[0].response.usageMetadata, EXPECTED_USAGE_METADATA);
    assert.equal(withUsage[0].response.modelVersion, "gpt-4.1");
    assert.equal(withUsage[0].response.responseId, "chatcmpl-su1");
    assert.equal(withUsage[0].response.candidates[0].finishReason, undefined);
    assert.deepEqual(withUsage[0].response.candidates[0].content.parts, [{ text: "" }]);

    // The usage event comes after the single finish event; the text arrived first.
    const finishIdx = events.findIndex((e) => e.response.candidates[0].finishReason === "STOP");
    assert.equal(events.filter((e) => e.response.candidates[0].finishReason).length, 1);
    assert.equal(events.indexOf(withUsage[0]), events.length - 1);
    assert.ok(finishIdx >= 0 && finishIdx < events.length - 1);
    assert.equal(events[0].response.candidates[0].content.parts[0].text, "hello");
  });
}

test("SSE stream OPENAI -> ANTIGRAVITY: usage already on the finish chunk is reported once, not again by a trailing usage-only chunk", async () => {
  const { text } = await run(FORMATS.ANTIGRAVITY, [
    sse(textChunk),
    sse({ ...finishChunk, usage: USAGE }),
    sse(usageOnlyChunk),
    "data: [DONE]\n\n",
  ]);
  const events = parseWellFormed(text);

  const withUsage = events.filter((e) => e.response.usageMetadata);
  assert.equal(withUsage.length, 1, `expected one usageMetadata event, got: ${text}`);
  assert.deepEqual(withUsage[0].response.usageMetadata, EXPECTED_USAGE_METADATA);
  assert.equal(withUsage[0].response.candidates[0].finishReason, "STOP");
});

test("SSE stream OPENAI -> ANTIGRAVITY: usage sent before the finish chunk rides on the finish chunk once", async () => {
  const { text } = await run(FORMATS.ANTIGRAVITY, [
    sse(textChunk),
    sse(usageOnlyChunk),
    sse(finishChunk),
    "data: [DONE]\n\n",
  ]);
  const events = parseWellFormed(text);

  const withUsage = events.filter((e) => e.response.usageMetadata);
  assert.equal(withUsage.length, 1, `expected one usageMetadata event, got: ${text}`);
  assert.deepEqual(withUsage[0].response.usageMetadata, EXPECTED_USAGE_METADATA);
  assert.equal(withUsage[0].response.candidates[0].finishReason, "STOP");
});
