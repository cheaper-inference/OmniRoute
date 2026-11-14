/**
 * A reply cut by the output-token limit (`finish_reason: "length"`) must stay visible as
 * cut, and must never be written to the semantic cache.
 *
 * - The T18 tool-call normalization upgraded every non-`tool_calls` reason to
 *   `tool_calls`, so a `length` stop with a half-written tool call looked complete.
 * - The cache-store guard did not see the Responses `status: "incomplete"` shape, and it
 *   did not see a cut tool call after a later normalization relabelled the turn.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { normalizeOpenAIToolFinishReasons } =
  await import("../../open-sse/handlers/chatCore/passthroughToolNames.ts");
const { isTruncatedCompletion, isTruncatedStreamBody } = await import("@/lib/semanticCache");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");

const toolCall = (args: string) => ({
  id: "call_1",
  type: "function",
  function: { name: "write_file", arguments: args },
});
const chatBody = (finishReason: string, args: string) => ({
  choices: [
    {
      index: 0,
      finish_reason: finishReason,
      message: { role: "assistant", content: null, tool_calls: [toolCall(args)] },
    },
  ],
});

test("normalizeOpenAIToolFinishReasons keeps length when the turn was cut", () => {
  const body = chatBody("length", '{"path":"a.txt","content":"par');
  normalizeOpenAIToolFinishReasons(body);
  assert.equal(body.choices[0].finish_reason, "length");
  assert.equal(isTruncatedCompletion(body), true);
});

test("normalizeOpenAIToolFinishReasons still upgrades stop to tool_calls", () => {
  const body = chatBody("stop", '{"path":"a.txt"}');
  normalizeOpenAIToolFinishReasons(body);
  assert.equal(body.choices[0].finish_reason, "tool_calls");
});

test("isTruncatedCompletion sees a Responses reply with status incomplete", () => {
  assert.equal(
    isTruncatedCompletion({
      object: "response",
      status: "incomplete",
      incomplete_details: { reason: "max_output_tokens" },
      output: [],
    }),
    true
  );
  assert.equal(isTruncatedCompletion({ object: "response", status: "completed" }), false);
});

test("isTruncatedCompletion sees a cut tool call that a later step relabelled tool_calls", () => {
  assert.equal(isTruncatedCompletion(chatBody("tool_calls", '{"path":"a.txt","con')), true);
  assert.equal(isTruncatedCompletion(chatBody("tool_calls", '{"path":"a.txt"}')), false);
  assert.equal(isTruncatedCompletion(chatBody("tool_calls", "")), false);
});

test("the streaming store does not cache an assembled body with a cut tool call", () => {
  const stored: unknown[] = [];
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: chatBody("tool_calls", '{"path":"a.txt","con'),
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0 },
      headers: undefined,
      model: "m",
    },
    {
      isCacheableForWrite: () => true,
      isTruncatedStreamBody,
      isSmallEnoughForSemanticCache: () => true,
      generateSignature: () => "sig",
      setCachedResponse: (...a: unknown[]) => stored.push(a),
    } as never
  );
  assert.equal(stored.length, 0);
});
