import test from "node:test";
import assert from "node:assert/strict";

const { extractUsageFromResponse } = await import("../../open-sse/handlers/usageExtractor.ts");
const { extractUsage, normalizeUsage } = await import("../../open-sse/utils/usageTracking.ts");
const { pickCacheCreationTokens } = await import("../../open-sse/utils/pickCacheCreationTokens.ts");

// Gateways built on new-api spell the cache write count
// `prompt_tokens_details.cache_creation_input_tokens`.
const promptShape = {
  prompt_tokens: 5000,
  completion_tokens: 100,
  prompt_tokens_details: { cached_tokens: 0, cache_creation_input_tokens: 1911 },
};
const responsesShape = {
  input_tokens: 5000,
  output_tokens: 100,
  input_tokens_details: { cached_tokens: 0, cache_creation_input_tokens: 1911 },
};

test("pickCacheCreationTokens reads nested cache_creation_input_tokens", () => {
  assert.equal(pickCacheCreationTokens(promptShape), 1911);
  assert.equal(pickCacheCreationTokens(responsesShape), 1911);
});

test("pickCacheCreationTokens keeps the existing key precedence", () => {
  assert.equal(
    pickCacheCreationTokens({
      prompt_tokens_details: { cache_creation_tokens: 7, cache_creation_input_tokens: 1911 },
    }),
    7
  );
  assert.equal(pickCacheCreationTokens({ prompt_tokens: 5 }), undefined);
});

test("extractUsageFromResponse keeps nested cache write on a chat body", () => {
  const usage = extractUsageFromResponse({ usage: promptShape }, "openai-compatible");
  assert.equal(usage?.cache_creation_input_tokens, 1911);
});

test("extractUsageFromResponse keeps nested cache write on a Responses body", () => {
  const usage = extractUsageFromResponse({ usage: responsesShape }, "openai-compatible");
  assert.equal(usage?.cache_creation_input_tokens, 1911);
});

test("extractUsage keeps nested cache write on a streaming chunk", () => {
  const usage = extractUsage({ usage: promptShape });
  assert.equal(usage?.cache_creation_input_tokens, 1911);
});

test("normalizeUsage keeps nested cache write", () => {
  assert.equal(normalizeUsage(promptShape)?.cache_creation_input_tokens, 1911);
});
