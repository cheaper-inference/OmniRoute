import assert from "node:assert/strict";
import test from "node:test";
import { resolvePartialStreamUsage } from "../../open-sse/utils/streamPartialUsage.ts";
import {
  extractUsage,
  normalizeUsage,
  type UsageLike,
} from "../../open-sse/utils/usageTracking.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { getPromptCacheReadTokensOrNull } from "../../src/lib/usage/tokenAccounting.ts";

test.after(() => resetDbInstance());

const counts = { prompt_tokens: 4000, completion_tokens: 1 };

for (const cacheHits of [3584, 0]) {
  const usage = { ...counts, prompt_cache_hit_tokens: cacheHits };

  test(`Chat receipts preserve a reported DeepSeek cache-hit count of ${cacheHits}`, () => {
    const receipt = extractUsage({ usage });
    assert.equal(receipt?.cached_tokens, cacheHits);
    assert.equal(receipt?.usage_evidence?.cacheRead.source, "reported");
    assert.equal(getPromptCacheReadTokensOrNull(receipt), cacheHits);
  });

  test(`partial streaming usage records ${cacheHits} reported DeepSeek cache hits`, () => {
    const receipt = resolvePartialStreamUsage({ reported: usage, contentLength: 0, body: {} });
    assert.equal(receipt?.cache_read_input_tokens, cacheHits);
    assert.equal(receipt?.usage_evidence?.cacheRead.source, "reported");
  });
}

for (const [label, usage] of [
  ["omitted", counts],
  ["negative", { ...counts, prompt_cache_hit_tokens: -1 }],
  ["nonfinite", { ...counts, prompt_cache_hit_tokens: Infinity }],
  ["string", { ...counts, prompt_cache_hit_tokens: "0" }],
  ["boolean", { ...counts, prompt_cache_hit_tokens: false }],
] as const) {
  test(`${label} DeepSeek cache-hit values remain unknown`, () => {
    const reported = usage as UsageLike;
    const normalized = normalizeUsage(reported);
    assert.equal(normalized?.cached_tokens, undefined);
    assert.equal(normalized?.usage_evidence?.cacheRead.source, "unknown");
    assert.equal(getPromptCacheReadTokensOrNull(normalized), null);

    const receipt = extractUsage({ usage: reported });
    assert.equal(receipt?.usage_evidence?.cacheRead.source, "unknown");
    assert.equal(getPromptCacheReadTokensOrNull(receipt), null);
    const partial = resolvePartialStreamUsage({ reported, contentLength: 0, body: {} });
    assert.equal(partial?.cache_read_input_tokens, undefined);
    assert.equal(partial?.usage_evidence?.cacheRead.source, "unknown");

    const extractedPartial = resolvePartialStreamUsage({
      reported: receipt,
      contentLength: 0,
      body: {},
    });
    assert.equal(extractedPartial?.usage_evidence?.cacheRead.source, "unknown");
    assert.equal(getPromptCacheReadTokensOrNull(extractedPartial), null);
    assert.deepEqual(
      { cached: receipt?.cached_tokens, partial: extractedPartial?.cache_read_input_tokens },
      { cached: undefined, partial: undefined }
    );
  });
}

for (const [key, canonical, cacheHits, extractedCachedTokens] of [
  ["cached_tokens", { cached_tokens: 0 }, 0, 0],
  ["cache_read_input_tokens", { cache_read_input_tokens: 0 }, 0, undefined],
  ["prompt_tokens_details", { prompt_tokens_details: { cached_tokens: 13 } }, 13, 13],
  ["input_tokens_details", { input_tokens_details: { cached_tokens: 0 } }, 0, 0],
] as const) {
  test(`${key} takes precedence over the DeepSeek alias through partial usage`, () => {
    const usage = { ...counts, ...canonical, prompt_cache_hit_tokens: 3584 };
    const normalized = normalizeUsage(usage);
    assert.equal(getPromptCacheReadTokensOrNull(normalized), cacheHits);
    assert.equal(normalized?.usage_evidence?.cacheRead.source, "reported");

    const receipt = extractUsage({ usage });
    const partial = resolvePartialStreamUsage({ reported: receipt, contentLength: 0, body: {} });
    assert.equal(receipt?.usage_evidence?.cacheRead.source, "reported");
    assert.equal(partial?.usage_evidence?.cacheRead.source, "reported");
    assert.deepEqual(
      {
        cached: receipt?.cached_tokens,
        consumed: getPromptCacheReadTokensOrNull(receipt),
        partial: partial?.cache_read_input_tokens,
        consumedPartial: getPromptCacheReadTokensOrNull(partial),
      },
      {
        cached: extractedCachedTokens,
        consumed: cacheHits,
        partial: cacheHits,
        consumedPartial: cacheHits,
      }
    );
  });
}
