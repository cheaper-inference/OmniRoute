import assert from "node:assert/strict";
import test from "node:test";
import { finalizeStreamingUsage } from "../../open-sse/utils/finalizeStreamingUsage.ts";
import { createNativeClaudeUsageTracker } from "../../open-sse/utils/nativeClaudeUsage.ts";
import { mergeUsageEvidence } from "../../open-sse/utils/usageEvidence.ts";
import {
  mergeCacheCreationFields,
  readCacheWriteUsage,
} from "../../open-sse/utils/cacheWriteUsage.ts";
import { getLoggedInputTokens } from "../../src/lib/usage/tokenAccounting.ts";
const body = { messages: [{ role: "user", content: "Synthetic request" }] };
test("finalizing repaired Responses input synchronizes prompt alias", () => {
  const u = finalizeStreamingUsage(
    {
      input_tokens: 0,
      prompt_tokens: 0,
      output_tokens: 2,
      usage_evidence: {
        input: { source: "unknown" },
        output: { source: "reported" },
        cacheRead: { source: "unknown" },
        cacheCreation: { source: "unknown" },
      },
    },
    body,
    0,
    "openai-responses"
  );
  assert.ok(u.input_tokens! > 0);
  assert.equal(u.prompt_tokens, u.input_tokens);
  assert.equal(getLoggedInputTokens(u), u.input_tokens);
});
test("positive provider totals survive finalization in OpenAI and Gemini", () => {
  assert.equal(
    finalizeStreamingUsage({ prompt_tokens: 100, completion_tokens: 7, total_tokens: 109 }, body, 0)
      .total_tokens,
    109
  );
  assert.equal(
    finalizeStreamingUsage(
      { promptTokenCount: 100, candidatesTokenCount: 7, totalTokenCount: 109 },
      body,
      0,
      "gemini"
    ).totalTokenCount,
    109
  );
  for (const total of [undefined, 0, -1, NaN, Infinity])
    assert.equal(
      finalizeStreamingUsage(
        { prompt_tokens: 100, completion_tokens: 7, total_tokens: total },
        body,
        0
      ).total_tokens,
      107
    );
});
test("native tier-only receipt survives fallback with or without content", () => {
  const t = createNativeClaudeUsageTracker(body);
  t.observe({
    type: "message_start",
    message: {
      usage: { cache_creation: { ephemeral_5m_input_tokens: 5, ephemeral_1h_input_tokens: 7 } },
    },
  });
  for (const chars of [0, 35]) {
    const u = t.getUsage(chars);
    assert.ok(u);
    assert.equal(u.cache_creation_input_tokens, 12);
    assert.equal(u.usage_evidence?.cacheCreation.source, "reported");
  }
});
test("separate cumulative partial cache tiers jointly establish evidence", () => {
  const before = { cache_creation: { ephemeral_5m_input_tokens: 5 } },
    after = { cache_creation: { ephemeral_1h_input_tokens: 7 } };
  const merged = {
    ...mergeCacheCreationFields(before, after),
    usage_evidence: mergeUsageEvidence(before, after),
  };
  assert.equal(merged.usage_evidence.cacheCreation.source, "reported");
  assert.equal(readCacheWriteUsage(merged).total, 12);
  const nested = { prompt_tokens_details: { cache_creation: { ephemeral_5m_input_tokens: 5 } } };
  assert.equal(mergeUsageEvidence(nested, after).cacheCreation.source, "reported");
});
test("native reconstructed totals include a newly estimated output", () => {
  const tracker = createNativeClaudeUsageTracker(body);
  tracker.observe({
    type: "message_start",
    message: { usage: { input_tokens: 12, output_tokens: 0 } },
  });
  const usage = tracker.getUsage(35)!;
  assert.equal(usage.total_tokens, usage.prompt_tokens! + usage.completion_tokens!);
});
