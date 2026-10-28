import test from "node:test";
import assert from "node:assert/strict";

const { parseSSEToGeminiResponse } =
  await import("../../open-sse/handlers/sseParser/geminiResponse.ts");

/**
 * #17219: the buffered Gemini parser now narrows the prompt count before resolving the
 * cached-token count (the #12775 call passed an `unknown`, which broke the open-sse
 * typecheck). These cases pin the behavior that call carries, so the narrowing cannot
 * silently change it: a valid cached count is reported, a count larger than the prompt
 * is dropped, and a later snapshot that omits the prompt count keeps the last valid one.
 */

type Usage = {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  prompt_tokens_details?: { cached_tokens?: number };
};

function frame(usageMetadata: Record<string, number>, text = "hi"): string {
  return `data: ${JSON.stringify({
    response: {
      candidates: [{ content: { parts: [{ text }] }, finishReason: "STOP" }],
      usageMetadata,
    },
  })}`;
}

function usageOf(rawSSE: string): Usage {
  const parsed = parseSSEToGeminiResponse(rawSSE, "gemini-2.5-flash");
  assert.ok(parsed, "expected a parsed response");
  return parsed.usage as Usage;
}

test("reports a cached count that fits inside the prompt", () => {
  const usage = usageOf(
    frame({ promptTokenCount: 100, candidatesTokenCount: 5, cachedContentTokenCount: 40 })
  );
  assert.equal(usage.prompt_tokens, 100);
  assert.equal(usage.prompt_tokens_details?.cached_tokens, 40);
});

test("drops a cached count larger than the prompt", () => {
  const usage = usageOf(
    frame({ promptTokenCount: 30, candidatesTokenCount: 5, cachedContentTokenCount: 40 })
  );
  assert.equal(usage.prompt_tokens, 30);
  assert.equal(usage.prompt_tokens_details?.cached_tokens, undefined);
});

test("a later snapshot without a prompt count keeps the last prompt and validates against it", () => {
  const rawSSE = [
    frame({ promptTokenCount: 100, candidatesTokenCount: 2, cachedContentTokenCount: 40 }, "he"),
    frame({ candidatesTokenCount: 5, cachedContentTokenCount: 60 }, "llo"),
  ].join("\n");
  const usage = usageOf(rawSSE);
  assert.equal(usage.prompt_tokens, 100);
  assert.equal(usage.prompt_tokens_details?.cached_tokens, 60);
});
