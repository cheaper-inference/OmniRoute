import { test } from "node:test";
import assert from "node:assert/strict";

const { storeSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");
const { isRefusalOrUnavailableCompletion, setCachedResponse, getCachedResponse } =
  await import("@/lib/semanticCache");

function makeDeps(stored: unknown[]) {
  return {
    isCacheableForWrite: () => true,
    isTruncatedCompletion: () => false,
    isTruncatedStreamBody: () => false,
    isRefusalOrUnavailableCompletion,
    isSmallEnoughForSemanticCache: () => true,
    generateSignature: () => "sig-test-refusal",
    setCachedResponse: (_s: unknown, _m: string, r: unknown, t: number) => stored.push({ r, t }),
  } as never;
}

test("does not cache a 200 non-streaming response with Antigravity obsolescence refusal (#19619)", () => {
  const stored: unknown[] = [];
  storeSemanticCacheResponse(
    {
      enabled: true,
      body: { messages: [{ role: "user", content: "hello" }], temperature: 0 },
      headers: undefined,
      translatedResponse: {
        choices: [
          {
            finish_reason: "stop",
            message: {
              role: "assistant",
              content:
                "This version of Antigravity is no longer supported. Please update to the latest version of Antigravity to continue.",
            },
          },
        ],
      },
      model: "gemini-3.5-flash",
      usage: { prompt_tokens: 5, completion_tokens: 22 },
    },
    makeDeps(stored)
  );
  assert.equal(stored.length, 0, "upstream obsolescence refusal must not be cached");
});

test("does not cache a 200 non-streaming response with model deprecated/retired notice (#19619)", () => {
  const stored: unknown[] = [];
  storeSemanticCacheResponse(
    {
      enabled: true,
      body: { messages: [{ role: "user", content: "summarize" }], temperature: 0 },
      headers: undefined,
      translatedResponse: {
        choices: [
          {
            finish_reason: "stop",
            message: {
              role: "assistant",
              content: "The requested model gemini-1.0-pro is deprecated and no longer supported.",
            },
          },
        ],
      },
      model: "gemini-1.0-pro",
      usage: { prompt_tokens: 10, completion_tokens: 15 },
    },
    makeDeps(stored)
  );
  assert.equal(stored.length, 0, "deprecated model notice must not be cached");
});

test("does not cache a response with explicit refusal or content_filter", () => {
  const stored: unknown[] = [];
  storeSemanticCacheResponse(
    {
      enabled: true,
      body: { messages: [{ role: "user", content: "unsafe prompt" }], temperature: 0 },
      headers: undefined,
      translatedResponse: {
        choices: [
          {
            finish_reason: "content_filter",
            message: {
              role: "assistant",
              content: "I cannot fulfill this request.",
              refusal: "Safety policy violation",
            },
          },
        ],
      },
      model: "gpt-4o",
      usage: { prompt_tokens: 8, completion_tokens: 6 },
    },
    makeDeps(stored)
  );
  assert.equal(stored.length, 0, "content_filter / refusal must not be cached");
});

test("does not cache an assembled streaming response with refusal text (#19619)", () => {
  const stored: unknown[] = [];
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: {
        choices: [
          {
            finish_reason: "stop",
            message: {
              role: "assistant",
              content:
                "This version of Kiro is no longer supported. Please update to the latest version of Kiro to continue.",
            },
          },
        ],
      },
      body: { messages: [{ role: "user", content: "test" }], temperature: 0 },
      headers: undefined,
      model: "kr/claude-sonnet-4.5",
      streamUsage: { prompt_tokens: 5, completion_tokens: 22 },
    },
    makeDeps(stored)
  );
  assert.equal(stored.length, 0, "streaming refusal response must not be cached");
});

test("direct setCachedResponse rejects refusal completions", () => {
  const sig = `sig-refusal-direct-${Date.now()}`;
  setCachedResponse(sig, "antigravity", {
    choices: [
      {
        message: {
          content:
            "This version of Antigravity is no longer supported. Please update to the latest version of Antigravity to continue.",
        },
      },
    ],
  });
  const cached = getCachedResponse(sig);
  assert.equal(cached, null, "refusal response must not be stored in memory or SQLite");
});

test("still caches a normal, valid completion response", () => {
  const stored: unknown[] = [];
  storeSemanticCacheResponse(
    {
      enabled: true,
      body: { messages: [{ role: "user", content: "hello" }], temperature: 0 },
      headers: undefined,
      translatedResponse: {
        choices: [
          {
            finish_reason: "stop",
            message: {
              role: "assistant",
              content: "Hello! How can I help you today?",
            },
          },
        ],
      },
      model: "gemini-3.5-flash",
      usage: { prompt_tokens: 5, completion_tokens: 10 },
    },
    makeDeps(stored)
  );
  assert.equal(stored.length, 1, "valid completion response must be cached");
});
