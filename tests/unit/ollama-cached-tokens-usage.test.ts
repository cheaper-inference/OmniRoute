import test from "node:test";
import assert from "node:assert/strict";

// Ollama reports prompt_eval_cached_count on the final (done: true) chunk: the
// prompt tokens read from the cache, a subset of prompt_eval_count
// (https://docs.ollama.com/api/usage).
const { extractUsage } = await import("../../open-sse/utils/usageTracking.ts");
const { getPromptCacheReadTokens } = await import("../../src/lib/usage/tokenAccounting.ts");

test("extractUsage maps Ollama prompt_eval_cached_count to cached_tokens", () => {
  const usage = extractUsage({
    model: "gemma4",
    done: true,
    prompt_eval_count: 11,
    prompt_eval_cached_count: 8,
    eval_count: 18,
  });

  assert.ok(usage);
  assert.equal(usage.prompt_tokens, 11);
  assert.equal(usage.completion_tokens, 18);
  assert.equal(usage.total_tokens, 29);
  assert.equal(usage.cached_tokens, 8);
  assert.equal(getPromptCacheReadTokens(usage), 8);
});

test("extractUsage leaves cached_tokens unset when Ollama does not report it", () => {
  const usage = extractUsage({
    model: "llama3.1",
    done: true,
    prompt_eval_count: 26,
    eval_count: 2,
  });

  assert.ok(usage);
  assert.equal(usage.cached_tokens, undefined);
});
