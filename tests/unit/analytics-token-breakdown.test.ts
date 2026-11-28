import assert from "node:assert/strict";
import test from "node:test";
import { getAnalyticsTokenBreakdown } from "../../src/shared/utils/analyticsTokenBreakdown.ts";

test("splits inclusive prompt totals without double counting cache reads", () => {
  assert.deepEqual(
    getAnalyticsTokenBreakdown({
      promptTokens: 100,
      completionTokens: 10,
      cachedInputTokens: 60,
      cachedInputTokensComplete: true,
    }),
    {
      totalTokens: 110,
      totalInputTokens: 100,
      inputTokens: 40,
      inputTokensPartial: false,
      cachedInputTokens: 60,
      outputTokens: 10,
      cacheComplete: true,
    }
  );
});

test("zero reads and all-cached input are measured values", () => {
  for (const cachedInputTokens of [0, 100]) {
    const value = getAnalyticsTokenBreakdown({
      promptTokens: 100,
      completionTokens: 10,
      cachedInputTokens,
      cachedInputTokensComplete: true,
    });
    assert.equal(value.inputTokens, 100 - cachedInputTokens);
    assert.equal(value.totalTokens, 110);
  }
});

test("partial and legacy cache data cannot yield exact noncached input", () => {
  for (const metadata of [
    {},
    { cachedInputTokens: null },
    { cachedInputTokens: 0 },
    { cachedInputTokens: 60, cachedInputTokensComplete: false },
  ]) {
    const value = getAnalyticsTokenBreakdown({
      promptTokens: 100,
      completionTokens: 10,
      ...metadata,
    });
    assert.equal(value.inputTokens, null);
    assert.equal(value.totalTokens, 110);
    assert.equal(value.cacheComplete, false);
  }
});

test("inconsistent cache reads are not clamped to a fabricated zero input", () => {
  const value = getAnalyticsTokenBreakdown({
    promptTokens: 100,
    completionTokens: 10,
    cachedInputTokens: 120,
    cachedInputTokensComplete: true,
  });
  assert.equal(value.inputTokens, null);
  assert.equal(value.cachedInputTokens, 120);
  assert.equal(value.totalTokens, 110);
});

test("missing or malformed token totals are not invented", () => {
  for (const invalid of [undefined, null, NaN, Infinity, -1, 0.5]) {
    const value = getAnalyticsTokenBreakdown({
      promptTokens: invalid,
      completionTokens: 10,
      cachedInputTokens: invalid,
      cachedInputTokensComplete: true,
    });
    assert.equal(value.totalTokens, null);
    assert.equal(value.totalInputTokens, null);
    assert.equal(value.inputTokens, null);
    assert.equal(value.cachedInputTokens, null);
    assert.equal(value.cacheComplete, false);
  }
});

test("cache writes remain in input, not in the cache-read bucket", () => {
  // Normalized Anthropic prompt: 20 fresh + 20 writes + 60 reads.
  const value = getAnalyticsTokenBreakdown({
    promptTokens: 100,
    completionTokens: 10,
    cachedInputTokens: 60,
    cachedInputTokensComplete: true,
  });
  assert.equal(value.inputTokens, 40);
  assert.equal(value.cachedInputTokens, 60);
  assert.equal(
    value.inputTokens! + value.cachedInputTokens! + value.outputTokens!,
    value.totalTokens
  );
});

test("incomplete or inconsistent cache coverage retains only measured fresh input", () => {
  for (const cache of [
    { cachedInputTokens: 400, cachedInputTokensComplete: false },
    { cachedInputTokens: 2000, cachedInputTokensComplete: true },
  ]) {
    const result = getAnalyticsTokenBreakdown({
      promptTokens: 1800,
      completionTokens: 10,
      ...cache,
      knownFreshInputTokens: 550,
    });
    assert.equal(result.inputTokens, 550);
    assert.equal(result.inputTokensPartial, true);
    assert.equal(result.totalTokens, 1810);
  }
});

test("exact coverage takes precedence over a known fresh-input subtotal", () => {
  const result = getAnalyticsTokenBreakdown({
    promptTokens: 1000,
    cachedInputTokens: 400,
    cachedInputTokensComplete: true,
    knownFreshInputTokens: 550,
  });
  assert.equal(result.inputTokens, 600);
  assert.equal(result.inputTokensPartial, false);
});

test("absent, empty, and malformed known parts do not invent a fresh-input total", () => {
  for (const knownFreshInputTokens of [undefined, null, 0, -1, 0.5, NaN, Infinity]) {
    const result = getAnalyticsTokenBreakdown({
      promptTokens: 1000,
      cachedInputTokensComplete: false,
      knownFreshInputTokens,
    });
    assert.equal(result.inputTokens, null);
    assert.equal(result.inputTokensPartial, false);
  }
});

test("a known subtotal cannot exceed the inclusive input total", () => {
  const result = getAnalyticsTokenBreakdown({
    promptTokens: 100,
    cachedInputTokensComplete: false,
    knownFreshInputTokens: 110,
  });
  assert.equal(result.inputTokens, null);
  assert.equal(result.inputTokensPartial, false);
});

test("shows the known fresh-input subtotal with incomplete or missing cache totals", () => {
  for (const cachedInputTokens of [0, 400, 1250, 1300, undefined, null]) {
    const result = getAnalyticsTokenBreakdown({
      promptTokens: 1800,
      cachedInputTokens,
      knownFreshInputTokens: 550,
      cachedInputTokensComplete: false,
    });
    assert.equal(result.inputTokens, 550);
    assert.equal(result.inputTokensPartial, true);
  }
});
