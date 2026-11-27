// Regression: a truncated upstream response (finish_reason "length") must never be
// written to the semantic cache. A partial completion cached under a temperature:0
// signature is served to every subsequent identical request, permanently returning
// a mid-sentence answer that no retry can clear (only a cache flush).
// Observed live on OmniRoute against github/gemini-3.5-flash: temperature:0 returned
// finish_reason "length" at 93 completion tokens on every call, while the same request
// with x-omniroute-no-cache:true returned a complete 239-token response.
import { test } from "node:test";
import assert from "node:assert/strict";

const { storeSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");
// Real truncation predicates — only the cache backend and the temperature/size
// gates are stubbed, so these tests exercise the actual detection logic.
const { isTruncatedCompletion, isTruncatedStreamBody } = await import("@/lib/semanticCache");

function deps(stored: unknown[]) {
  return {
    isCacheableForWrite: () => true,
    isTruncatedCompletion,
    isTruncatedStreamBody,
    isSmallEnoughForSemanticCache: () => true,
    generateSignature: () => "sig",
    setCachedResponse: (_s: unknown, _m: string, r: unknown, t: number) => stored.push({ r, t }),
  } as never;
}

test("does not cache a non-streaming response truncated by max_tokens", () => {
  const stored: unknown[] = [];
  storeSemanticCacheResponse(
    {
      enabled: true,
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0 },
      headers: undefined,
      translatedResponse: {
        choices: [{ finish_reason: "length", message: { content: "partial answ" } }],
      },
      model: "gemini-3.5-flash",
      usage: { prompt_tokens: 10, completion_tokens: 93 },
    },
    deps(stored)
  );
  assert.equal(stored.length, 0, "truncated response must not be cached");
});

test("still caches a complete non-streaming response", () => {
  const stored: unknown[] = [];
  storeSemanticCacheResponse(
    {
      enabled: true,
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0 },
      headers: undefined,
      translatedResponse: {
        choices: [{ finish_reason: "stop", message: { content: "complete answer" } }],
      },
      model: "gemini-3.5-flash",
      usage: { prompt_tokens: 10, completion_tokens: 239 },
    },
    deps(stored)
  );
  assert.equal(stored.length, 1, "complete response must still be cached");
});

test("does not cache a streaming response truncated by max_tokens", () => {
  const stored: unknown[] = [];
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody:
        'data: {"choices":[{"finish_reason":"length","delta":{"content":"partial"}}]}\n\ndata: [DONE]\n\n',
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0 },
      headers: undefined,
      model: "gemini-3.5-flash",
      streamUsage: { prompt_tokens: 10, completion_tokens: 93 },
    } as never,
    deps(stored)
  );
  assert.equal(stored.length, 0, "truncated streaming response must not be cached");
});

// #14159 (re-land of #12630): chatCore hands the streaming store the *assembled*
// body (an object with `choices[].finish_reason`), not raw SSE text. The guard must
// therefore also work on that shape — otherwise the streaming half of #12885 is a
// no-op in production. The SSE-string case above is kept as-is (tip contract).
test("does not cache an assembled streaming body truncated by max_tokens", () => {
  const stored: unknown[] = [];
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: {
        choices: [{ finish_reason: "length", message: { content: "partial" } }],
      },
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0 },
      headers: undefined,
      model: "gemini-3.5-flash",
      streamUsage: { prompt_tokens: 10, completion_tokens: 93 },
    },
    deps(stored)
  );
  assert.equal(stored.length, 0, "truncated assembled streaming body must not be cached");
});

test("still caches a complete assembled streaming body", () => {
  const stored: unknown[] = [];
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: {
        choices: [{ finish_reason: "stop", message: { content: "complete" } }],
      },
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0 },
      headers: undefined,
      model: "gemini-3.5-flash",
      streamUsage: { prompt_tokens: 10, completion_tokens: 239 },
    },
    deps(stored)
  );
  assert.equal(stored.length, 1, "complete streaming response must still be cached");
});

// A moderation block is re-asked upstream, where a false-positive can clear. Pinned for the
// cache TTL at temperature 0 it is the same trap as a truncated reply.
test("does not cache a non-streaming content_filter completion", () => {
  const stored: unknown[] = [];
  storeSemanticCacheResponse(
    {
      enabled: true,
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0 },
      headers: undefined,
      translatedResponse: {
        choices: [{ finish_reason: "content_filter", message: { content: "blocked" } }],
      },
      model: "gemini-3.5-flash",
      usage: { prompt_tokens: 10, completion_tokens: 3 },
    },
    deps(stored)
  );
  assert.equal(stored.length, 0, "content_filter response must not be cached");
});

test("does not cache a Claude-format refusal (the Claude spelling of content_filter)", () => {
  const stored: unknown[] = [];
  storeSemanticCacheResponse(
    {
      enabled: true,
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0 },
      headers: undefined,
      translatedResponse: { type: "message", stop_reason: "refusal", content: [] },
      model: "claude-sonnet-4-5",
      usage: { prompt_tokens: 10, completion_tokens: 0 },
    },
    deps(stored)
  );
  assert.equal(stored.length, 0, "refusal response must not be cached");
});

test("does not cache an assembled streaming body that ended in content_filter", () => {
  const stored: unknown[] = [];
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: {
        choices: [{ finish_reason: "content_filter", message: { content: "blocked" } }],
      },
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0 },
      headers: undefined,
      model: "gemini-3.5-flash",
      streamUsage: { prompt_tokens: 10, completion_tokens: 3 },
    },
    deps(stored)
  );
  assert.equal(stored.length, 0, "content_filter streaming body must not be cached");
});
