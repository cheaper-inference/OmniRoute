import test from "node:test";
import assert from "node:assert/strict";

import { buildCacheUsageLogMeta } from "../../open-sse/handlers/chatCore/cacheUsageMeta.ts";

test("cache keys that hold undefined are not cache usage", () => {
  const usage = {
    prompt_tokens: 10,
    completion_tokens: 2,
    cached_tokens: undefined,
    cache_read_input_tokens: undefined,
    cache_creation_input_tokens: undefined,
    cache_write_tokens: undefined,
  };
  assert.equal(buildCacheUsageLogMeta(usage), null);
});

test("nested cache keys that hold undefined are not cache usage", () => {
  const usage = {
    prompt_tokens: 10,
    prompt_tokens_details: {
      cached_tokens: undefined,
      cache_creation_tokens: undefined,
      cache_write_tokens: undefined,
    },
  };
  assert.equal(buildCacheUsageLogMeta(usage), null);
});

test("Gemini evidence is unreported, not invalid, when the keys hold undefined", () => {
  const meta = buildCacheUsageLogMeta({ prompt_tokens: 10, cached_tokens: undefined }, {
    mode: "implicit",
    model: "gemini-2.5-pro",
  } as never);
  assert.equal(
    (meta as { geminiPromptCache?: { evidence?: string } })?.geminiPromptCache?.evidence,
    "unreported"
  );
});

test("a reported zero is still cache usage", () => {
  assert.deepEqual(buildCacheUsageLogMeta({ prompt_tokens: 10, cached_tokens: 0 }), {
    cacheReadTokens: 0,
    cacheCreationTokens: 0,
  });
  assert.deepEqual(buildCacheUsageLogMeta({ cache_read_input_tokens: 7 }), {
    cacheReadTokens: 7,
    cacheCreationTokens: 0,
  });
  assert.deepEqual(buildCacheUsageLogMeta({ prompt_tokens_details: { cached_tokens: 3 } }), {
    cacheReadTokens: 3,
    cacheCreationTokens: 0,
  });
});
