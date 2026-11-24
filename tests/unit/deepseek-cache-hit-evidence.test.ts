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
] as const) {
  test(`${label} DeepSeek cache-hit values remain unknown`, () => {
    const reported = usage as UsageLike;
    const receipt = extractUsage({ usage: reported });
    assert.equal(receipt?.usage_evidence?.cacheRead.source, "unknown");
    assert.equal(getPromptCacheReadTokensOrNull(receipt), null);
    const partial = resolvePartialStreamUsage({ reported, contentLength: 0, body: {} });
    assert.equal(partial?.cache_read_input_tokens, undefined);
    assert.equal(partial?.usage_evidence?.cacheRead.source, "unknown");
  });
}

for (const key of ["cached_tokens", "cache_read_input_tokens"] as const) {
  test(`normalization keeps an explicit zero in ${key} before the DeepSeek alias`, () => {
    const receipt = normalizeUsage({ ...counts, [key]: 0, prompt_cache_hit_tokens: 3584 });
    assert.equal(getPromptCacheReadTokensOrNull(receipt), 0);
  });
}

test("normalization keeps the existing nested cache read before the DeepSeek alias", () => {
  const receipt = normalizeUsage({
    ...counts,
    prompt_tokens_details: { cached_tokens: 13 },
    prompt_cache_hit_tokens: 3584,
  });
  assert.equal(getPromptCacheReadTokensOrNull(receipt), 13);
});
