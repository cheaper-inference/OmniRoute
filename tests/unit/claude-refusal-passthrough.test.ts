/**
 * A Claude `stop_reason: "refusal"` turn carries no content block by design: the
 * model declined under the provider's usage policy. It is the Claude twin of the
 * OpenAI `content_filter` finish, so the empty-content guards must pass it through
 * instead of rewriting it into a retried 502 "empty content" that hides the
 * refusal (and its `stop_details`) from the client.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-refusal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { createDisconnectAwareStream, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { shouldAbortEmptyClaudeStream } =
  await import("../../open-sse/utils/streamClaudeEmptyBody.ts");
const { isEmptyContentResponse } = await import("../../open-sse/services/errorClassifier.ts");
const { detectMalformedNonStream } = await import("../../open-sse/utils/diagnostics.ts");
const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { isTrustedEmptyTurn } = await import("../../open-sse/services/combo/emptyTurnTrust.ts");
const { markEmptyTurnExecution } = await import("../../open-sse/utils/emptyTurnPolicy.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { sanitizeResponsesApiResponse } =
  await import("../../open-sse/handlers/responseSanitizer.ts");
const { finalizeResponsesTerminalStatus } =
  await import("../../open-sse/translator/helpers/responsesTerminalStatus.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const enc = new TextEncoder();
const stopDetails = { type: "refusal", category: "cyber", explanation: "blocked" };
const refusalFrames = [
  `event: message_start\ndata: ${JSON.stringify({
    type: "message_start",
    message: {
      id: "msg_refusal",
      type: "message",
      role: "assistant",
      model: "claude-opus-5-5",
      content: [],
      stop_reason: null,
      stop_sequence: null,
      usage: { input_tokens: 5, output_tokens: 0 },
    },
  })}\n\n`,
  `event: message_delta\ndata: ${JSON.stringify({
    type: "message_delta",
    delta: { stop_reason: "refusal", stop_sequence: null, stop_details: stopDetails },
    usage: { output_tokens: 0 },
  })}\n\n`,
  `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
];

function source(frames: string[]): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(c) {
      for (const frame of frames) c.enqueue(enc.encode(frame));
      c.close();
    },
  });
}

test("non-streaming: an empty Claude refusal is not an empty-content failure", () => {
  assert.equal(
    isEmptyContentResponse({ type: "message", content: [], stop_reason: "refusal" }),
    false
  );
});

test("non-streaming: an empty Claude refusal is not a malformed 200", () => {
  assert.equal(
    detectMalformedNonStream({
      type: "message",
      content: [],
      stop_reason: "refusal",
      stop_details: stopDetails,
    }),
    null
  );
});

test("flush guard: a finished empty refusal stream is not aborted", () => {
  const lifecycle = {
    hasError: false,
    hasContentBlock: false,
    hasMessageStart: true,
    hasMessageDelta: true,
    hasMessageStop: true,
    stopReason: "refusal",
  };
  assert.equal(shouldAbortEmptyClaudeStream(lifecycle, true), false);
});

test("passthrough stream forwards the refusal instead of an empty-response error", async () => {
  const text = await new Response(
    source(refusalFrames).pipeThrough(
      createSSEStream({
        mode: "passthrough",
        sourceFormat: FORMATS.CLAUDE,
        provider: "anthropic",
        model: "claude-opus-5-5",
        body: { messages: [{ role: "user", content: "hello" }] },
      } as Parameters<typeof createSSEStream>[0])
    )
  ).text();
  assert.match(text, /"stop_reason":"refusal"/);
  assert.match(text, /"category":"cyber"/);
  assert.doesNotMatch(text, /event: error/);
});

test("client stream guard does not rewrite an empty refusal", async () => {
  const sc = createStreamController({
    provider: "anthropic",
    model: "claude-opus-5-5",
    clientResponseFormat: FORMATS.CLAUDE,
  });
  const reader = createDisconnectAwareStream(
    {
      readable: source(refusalFrames),
      writable: { getWriter: () => ({ abort: () => Promise.resolve() }) },
    } as Parameters<typeof createDisconnectAwareStream>[0],
    sc
  ).getReader();
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    text += new TextDecoder().decode(value);
  }
  assert.match(text, /"stop_reason":"refusal"/);
  assert.doesNotMatch(text, /empty content|event: error/i);
});

test("combo quality check accepts an empty refusal as a final answer", async () => {
  const response = new Response(source(refusalFrames), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const result = await validateResponseQuality(response, true, { warn: () => {} });
  assert.equal(result.valid, true, "reason" in result ? String(result.reason) : undefined);
});

const nativeRefusal = {
  id: "msg_refusal",
  type: "message",
  role: "assistant",
  model: "claude-opus-5-5",
  content: [],
  stop_reason: "refusal",
  stop_details: stopDetails,
  usage: { input_tokens: 5, output_tokens: 0 },
};

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/** What a combo holds once chatCore has read a native non-streaming Claude reply. */
async function nativeTrust(body: unknown): Promise<() => boolean> {
  const response = markEmptyTurnExecution(
    jsonResponse(body),
    "https://api.anthropic.com/v1/messages",
    { connectionId: "selected", apiKey: "synthetic-key" }
  );
  const permission = await isTrustedEmptyTurn(null, response);
  await response.text();
  return permission;
}

function toChatCompletion(body: unknown) {
  return translateNonStreamingResponse(structuredClone(body), FORMATS.CLAUDE, FORMATS.OPENAI);
}

/** Same steps as nonStreamingClientTranslate.ts for a Responses client. */
function toResponsesBody(body: unknown) {
  const chat = toChatCompletion(body) as { choices: { finish_reason: string }[] };
  const responses = sanitizeResponsesApiResponse(chat) as Record<string, unknown>;
  finalizeResponsesTerminalStatus(responses, chat.choices[0].finish_reason);
  return responses;
}

test("combo keeps a native non-streaming refusal translated to Chat Completions", async () => {
  const chat = toChatCompletion(nativeRefusal) as { choices: { finish_reason: string }[] };
  assert.equal(chat.choices[0].finish_reason, "content_filter");
  const result = await validateResponseQuality(
    jsonResponse(chat),
    false,
    { warn: () => {} },
    null,
    null,
    await nativeTrust(nativeRefusal)
  );
  assert.equal(result.valid, true, "reason" in result ? String(result.reason) : undefined);
});

test("a native non-streaming refusal reaches a Responses client as incomplete", async () => {
  const responses = toResponsesBody(nativeRefusal);
  assert.equal(responses.status, "incomplete");
  assert.deepEqual(responses.incomplete_details, { reason: "content_filter" });
  const permission = await nativeTrust(nativeRefusal);
  assert.equal(detectMalformedNonStream(responses, "claude", permission()), null);
  const result = await validateResponseQuality(
    jsonResponse(responses),
    false,
    { warn: () => {} },
    null,
    null,
    permission
  );
  assert.equal(result.valid, true, "reason" in result ? String(result.reason) : undefined);
});

test("an empty filter stop without native trust still fails the combo target over", async () => {
  const chat = await validateResponseQuality(jsonResponse(toChatCompletion(nativeRefusal)), false, {
    warn: () => {},
  });
  assert.equal(chat.valid, false);
  const responses = toResponsesBody(nativeRefusal);
  assert.equal(detectMalformedNonStream(responses, "claude", false), "empty_choices");
  const result = await validateResponseQuality(jsonResponse(responses), false, { warn: () => {} });
  assert.equal(result.valid, false);
});

test("trust does not excuse an empty Responses body cut off by the token limit", async () => {
  const truncated = {
    object: "response",
    status: "incomplete",
    incomplete_details: { reason: "max_output_tokens" },
    output: [],
  };
  assert.equal(detectMalformedNonStream(truncated, "claude", true), "empty_choices");
  const result = await validateResponseQuality(
    jsonResponse(truncated),
    false,
    { warn: () => {} },
    null,
    null,
    true
  );
  assert.equal(result.valid, false);
});
