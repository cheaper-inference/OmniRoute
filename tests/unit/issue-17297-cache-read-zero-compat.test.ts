import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatUsageLog,
  getPromptCacheReadTokens,
  getPromptCacheReadTokensOrNull,
} from "../../src/lib/usage/tokenAccounting.ts";

const reportedUsage = {
  prompt_tokens: 3590,
  completion_tokens: 5,
  prompt_tokens_details: { cached_tokens: 3584 },
  cache_read_input_tokens: 0,
  cached_tokens: 0,
};

test("#17297: compatibility zeros do not hide reported nested cache reads", () => {
  assert.equal(getPromptCacheReadTokens(reportedUsage), 3584);
});

test("#17297: nullable accounting preserves the reported positive cache reads", () => {
  assert.equal(getPromptCacheReadTokensOrNull(reportedUsage), 3584);
});

test("#17297: formatted usage includes the recovered cache-read count", () => {
  assert.equal(formatUsageLog(reportedUsage), "in=3590 | out=5 | CR=3584");
});

const positiveCases = [
  {
    name: "normalized cacheRead keeps precedence over larger later fields",
    usage: { cacheRead: 12, cache_read_input_tokens: 24, cached_tokens: 48 },
    expected: 12,
  },
  {
    name: "Anthropic field keeps precedence over larger later fields",
    usage: { cache_read_input_tokens: 24, cached_tokens: 48 },
    expected: 24,
  },
  {
    name: "flat cached_tokens keeps precedence over nested fields",
    usage: { cached_tokens: 48, prompt_tokens_details: { cached_tokens: 96 } },
    expected: 48,
  },
  {
    name: "normalized zero falls through to positive Anthropic count",
    usage: { cacheRead: 0, cache_read_input_tokens: 24, cached_tokens: 48 },
    expected: 24,
  },
  {
    name: "Anthropic zero falls through to positive flat count",
    usage: { cache_read_input_tokens: 0, cached_tokens: 48 },
    expected: 48,
  },
  {
    name: "flat zero falls through to positive nested count",
    usage: { cached_tokens: 0, prompt_tokens_details: { cached_tokens: 96 } },
    expected: 96,
  },
  {
    name: "Responses API details retain their existing fallback",
    usage: { input_tokens_details: { cached_tokens: 96 } },
    expected: 96,
  },
  {
    name: "numeric-string zero falls through to finite positive numeric string",
    usage: { cacheRead: "0", cached_tokens: "48" },
    expected: 48,
  },
];

for (const { name, usage, expected } of positiveCases) {
  test(`#17297: ${name}`, () => {
    assert.equal(getPromptCacheReadTokens(usage), expected);
    assert.equal(getPromptCacheReadTokensOrNull(usage), expected);
  });
}

test("#17297: explicit zero remains measured zero", () => {
  const usage = {
    cacheRead: 0,
    cache_read_input_tokens: 0,
    cached_tokens: 0,
    prompt_tokens_details: { cached_tokens: 0 },
  };
  assert.equal(getPromptCacheReadTokens(usage), 0);
  assert.equal(getPromptCacheReadTokensOrNull(usage), 0);
});

test("#17297: absent or null cache-read fields remain unmeasured", () => {
  for (const usage of [{}, null, { cacheRead: null, cached_tokens: undefined }]) {
    assert.equal(getPromptCacheReadTokens(usage), 0);
    assert.equal(getPromptCacheReadTokensOrNull(usage), null);
  }
});

test("#17297: non-finite values without a positive candidate remain zero", () => {
  for (const value of [NaN, Infinity, "Infinity", "invalid", ""]) {
    const usage = { cacheRead: value };
    assert.equal(getPromptCacheReadTokens(usage), 0);
    assert.equal(getPromptCacheReadTokensOrNull(usage), 0);
  }
});
