/** Buffered Gemini/Antigravity SSE usage must match streaming usage contracts. */
import test from "node:test";
import assert from "node:assert/strict";

import { parseSSEToGeminiResponse } from "../../open-sse/handlers/sseParser/geminiResponse.ts";

type BufferedCompletion = {
  choices: Array<{ message: { content: string | null } }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details?: { cached_tokens: number };
    completion_tokens_details?: { reasoning_tokens: number };
  };
};

function parse(events: Record<string, unknown>[]) {
  const raw =
    events.map((event) => "data: " + JSON.stringify(event)).join("\n") + "\ndata: [DONE]\n";
  return parseSSEToGeminiResponse(raw, "gemini-3.8-flash") as unknown as BufferedCompletion;
}

test("Cloud Code nested metadata preserves cache and reasoning without double counting", () => {
  const response = parse([
    {
      response: {
        candidates: [{ content: { parts: [{ text: "reply" }] }, finishReason: "STOP" }],
        usageMetadata: {
          promptTokenCount: 18000,
          candidatesTokenCount: 84,
          thoughtsTokenCount: 16,
          cachedContentTokenCount: 8175,
          totalTokenCount: 18100,
        },
      },
    },
  ]);
  assert.equal(response.choices[0].message.content, "reply");
  assert.deepEqual(response.usage, {
    prompt_tokens: 18000,
    completion_tokens: 100,
    total_tokens: 18100,
    prompt_tokens_details: { cached_tokens: 8175 },
    completion_tokens_details: { reasoning_tokens: 16 },
  });
});

test("a final metadata-only event can report the cache without erasing prior counters", () => {
  const response = parse([
    {
      response: {
        candidates: [{ content: { parts: [{ text: "Hi" }] } }],
        usageMetadata: { promptTokenCount: 9000, candidatesTokenCount: 10, totalTokenCount: 9010 },
      },
    },
    { response: { usageMetadata: { cachedContentTokenCount: 4096 } } },
  ]);
  assert.equal(response.choices[0].message.content, "Hi");
  assert.deepEqual(response.usage, {
    prompt_tokens: 9000,
    completion_tokens: 10,
    total_tokens: 9010,
    prompt_tokens_details: { cached_tokens: 4096 },
  });
});

// release/v3.8.53 (#12775) pins the buffered contract: a reported zero keeps the plain usage
// shape, exactly like absent cache metadata (this object is returned to clients as-is).
test("explicit zero cache keeps the same plain shape as absent cache metadata", () => {
  const withZero = parse([
    {
      response: {
        candidates: [{ content: { parts: [{ text: "ok" }] } }],
        usageMetadata: { promptTokenCount: 5000, cachedContentTokenCount: 0 },
      },
    },
  ]);
  const withoutCache = parse([
    {
      response: {
        candidates: [{ content: { parts: [{ text: "ok" }] } }],
        usageMetadata: { promptTokenCount: 5000 },
      },
    },
  ]);
  assert.equal(Object.hasOwn(withZero.usage, "prompt_tokens_details"), false);
  assert.equal(Object.hasOwn(withoutCache.usage, "prompt_tokens_details"), false);
  assert.deepEqual(withZero.usage, withoutCache.usage);
});

test("top-level Gemini usageMetadata is also normalized", () => {
  const response = parse([
    {
      response: { candidates: [{ content: { parts: [{ text: "reply" }] } }] },
      usageMetadata: {
        promptTokenCount: 6000,
        candidatesTokenCount: 2,
        cachedContentTokenCount: 4096,
      },
    },
  ]);
  assert.equal(response.usage.prompt_tokens, 6000);
  assert.equal(response.usage.prompt_tokens_details?.cached_tokens, 4096);
});

test("an upstream totalTokenCount of 0 falls back to prompt + completion without cache", () => {
  const response = parse([
    {
      response: {
        candidates: [{ content: { parts: [{ text: "reply" }] }, finishReason: "STOP" }],
        usageMetadata: { promptTokenCount: 1200, candidatesTokenCount: 30, totalTokenCount: 0 },
      },
    },
  ]);
  assert.deepEqual(response.usage, {
    prompt_tokens: 1200,
    completion_tokens: 30,
    total_tokens: 1230,
  });
});
