import test from "node:test";
import assert from "node:assert/strict";

const { parseSSEToGeminiResponse } =
  await import("../../open-sse/handlers/sseParser/geminiResponse.ts");

// The buffered Gemini SSE parser only trusts cachedContentTokenCount when the prompt count it is a
// breakdown of is a real number (open-sse typecheck fix on release/v3.8.53, #17219): a cached count
// can never be validated against a missing or string prompt count, so it is not exposed.

const sse = (...chunks: unknown[]) => chunks.map((c) => `data: ${JSON.stringify(c)}`).join("\n\n");
const part = { candidates: [{ content: { parts: [{ text: "hi" }] }, finishReason: "STOP" }] };
const usageOf = (usageMetadata: Record<string, unknown>) =>
  parseSSEToGeminiResponse(sse({ ...part, usageMetadata }), "gemini-2.5-flash")?.usage as
    Record<string, unknown> | undefined;

test("a numeric prompt count exposes the cached breakdown", () => {
  assert.deepEqual(
    usageOf({ promptTokenCount: 100, candidatesTokenCount: 5, cachedContentTokenCount: 40 }),
    {
      prompt_tokens: 100,
      completion_tokens: 5,
      total_tokens: 105,
      prompt_tokens_details: { cached_tokens: 40 },
    }
  );
});

test("a non-numeric prompt count never validates a cached count", () => {
  const usage = usageOf({
    promptTokenCount: "100",
    candidatesTokenCount: 5,
    cachedContentTokenCount: 40,
  });
  assert.equal(usage?.prompt_tokens, undefined);
  assert.equal(usage?.prompt_tokens_details, undefined);
  assert.equal(usage?.completion_tokens, 5);
});

test("a missing prompt count does not throw and keeps cached tokens out", () => {
  const usage = usageOf({ candidatesTokenCount: 5, cachedContentTokenCount: 40 });
  assert.equal(usage?.prompt_tokens_details, undefined);
  assert.equal(usage?.completion_tokens, 5);
});

test("a cached count above the prompt count is rejected", () => {
  const usage = usageOf({
    promptTokenCount: 10,
    candidatesTokenCount: 5,
    cachedContentTokenCount: 40,
  });
  assert.equal(usage?.prompt_tokens, 10);
  assert.equal(usage?.prompt_tokens_details, undefined);
});
