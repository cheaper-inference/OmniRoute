import { test } from "node:test";
import assert from "node:assert/strict";
import {
  sanitizeProviderUsageForRequest,
  normalizeUsage,
  filterUsageForFormat,
  extractUsage,
} from "../../open-sse/utils/usageTracking.ts";
import { createNativeClaudeUsageTracker } from "../../open-sse/utils/nativeClaudeUsage.ts";
import { finalizeStreamingUsage } from "../../open-sse/utils/finalizeStreamingUsage.ts";
import { mergeUsageEvidence } from "../../src/lib/usage/usageEvidence.ts";
const body = { messages: [{ role: "user", content: "Synthetic request" }] };
test("repaired input is estimated and absent cache unknown", () => {
  const u = sanitizeProviderUsageForRequest({ input_tokens: 0, output_tokens: 0 }, body, "claude")!;
  assert.equal(u.usage_evidence?.input.source, "estimated");
  assert.equal(u.cache_read_input_tokens, undefined);
  assert.equal(u.cache_creation_input_tokens, undefined);
  assert.equal(u.estimated, true);
  assert.deepEqual(normalizeUsage(u)?.usage_evidence, u.usage_evidence);
  assert.deepEqual(filterUsageForFormat(u, "claude")?.usage_evidence, u.usage_evidence);
});
test("native cumulative counters replace and positive final output supersedes fallback", () => {
  const t = createNativeClaudeUsageTracker(body);
  t.observe({ type: "message_start", message: { usage: { input_tokens: 12, output_tokens: 0 } } });
  assert.equal(t.getUsage()?.usage_evidence?.output.source, "unknown");
  assert.equal(t.getUsage(35)?.completion_tokens, 10);
  t.observe({ type: "message_delta", usage: { output_tokens: 4 } });
  t.observe({ type: "message_delta", usage: { output_tokens: 7 } });
  assert.equal(t.getUsage(35)?.completion_tokens, 7);
  assert.equal(t.getUsage()?.cache_read_input_tokens, undefined);
  t.observe({ type: "message_delta", usage: { output_tokens: 0 } });
  assert.equal(t.getUsage()?.completion_tokens, 0);
});
test("only output is estimated when input is reported", () => {
  const u = finalizeStreamingUsage(
    { prompt_tokens: 12, completion_tokens: 0, cache_read_input_tokens: 0 },
    body,
    35
  );
  assert.equal(u.prompt_tokens, 12);
  assert.equal(u.completion_tokens, 10);
  assert.equal(u.usage_evidence?.input.source, "reported");
  assert.equal(u.usage_evidence?.output.source, "estimated");
  assert.equal(u.usage_evidence?.cacheRead.source, "reported");
  assert.equal(u.usage_evidence?.cacheCreation.source, "unknown");
});
test("cache-only raw identity and normalized fresh Claude wire count", () => {
  const raw = {
    input_tokens: 0,
    cache_read_input_tokens: 8,
    cache_creation_input_tokens: 2,
    output_tokens: 3,
  };
  assert.equal(sanitizeProviderUsageForRequest(raw, body, "claude"), raw);
  const t = createNativeClaudeUsageTracker(body);
  t.observe({ type: "message_start", message: { usage: raw } });
  assert.equal(t.getUsage()?.prompt_tokens, 10);
  assert.equal(filterUsageForFormat(t.getUsage(), "claude")?.input_tokens, 0);
});
test("rejected raw tiers cannot reenter native receipt", () => {
  const t = createNativeClaudeUsageTracker(body);
  t.observe({
    type: "message_start",
    message: {
      usage: {
        input_tokens: 2,
        output_tokens: 0,
        cache_creation_input_tokens: 300000,
        cache_creation: { ephemeral_5m_input_tokens: 300000, ephemeral_1h_input_tokens: 0 },
      },
    },
  });
  const u = t.getUsage(10)!;
  assert.equal(u.cache_creation_input_tokens, undefined);
  assert.equal(u.cache_creation, undefined);
  assert.equal(u.usage_evidence?.cacheCreation.source, "unknown");
});
test("reasoning diagnostics survive and malformed Gemini cache stays unknown", () => {
  const t = createNativeClaudeUsageTracker(body);
  t.observe({ type: "message_start", message: { usage: { input_tokens: 10, output_tokens: 0 } } });
  t.observe({
    type: "message_delta",
    usage: { output_tokens: 8, output_tokens_details: { thinking_tokens: 5 } },
  });
  assert.equal(t.getUsage()?.reasoning_tokens, 5);
  const u = extractUsage({
    usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 5, cachedContentTokenCount: 20 },
  })!;
  assert.equal(u.cached_tokens, undefined);
  assert.equal(u.usage_evidence?.cacheRead.source, "unknown");
});
test("explicit cache zero survives repair, malformed caches with valid input are unknown", () => {
  const u = sanitizeProviderUsageForRequest(
    {
      input_tokens: 0,
      output_tokens: 0,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 0,
    },
    body,
    "claude"
  )!;
  assert.equal(u.cache_read_input_tokens, 0);
  assert.equal(u.usage_evidence?.cacheRead.source, "reported");
  for (const v of [-1, Infinity, NaN]) {
    const m = sanitizeProviderUsageForRequest(
      { input_tokens: 10, output_tokens: 0, cache_read_input_tokens: v },
      body,
      "claude"
    )!;
    assert.equal(m.cache_read_input_tokens, undefined);
    assert.equal(m.usage_evidence?.cacheRead.source, "unknown");
  }
});
test("numeric cache placeholders never become known through nullable helpers", async () => {
  const { readCacheWriteUsage } = await import("../../open-sse/utils/cacheWriteUsage.ts");
  const { getPromptCacheReadTokensOrNull, getPromptCacheCreationTokensOrNull } =
    await import("../../src/lib/usage/tokenAccounting.ts");
  const u = {
    cache_read_input_tokens: 0,
    cache_creation_input_tokens: 0,
    usage_evidence: {
      input: { source: "reported" },
      output: { source: "reported" },
      cacheRead: { source: "unknown" },
      cacheCreation: { source: "unknown" },
    },
  };
  assert.equal(getPromptCacheReadTokensOrNull(u), null);
  assert.equal(getPromptCacheCreationTokensOrNull(u), null);
  assert.equal(readCacheWriteUsage(u).total, null);
});
test("invalid cumulative final cache snapshot is not omission", () => {
  const before = extractUsage({
    usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 2, cachedContentTokenCount: 5 },
  });
  const after = extractUsage({
    usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 3, cachedContentTokenCount: 20 },
  });
  assert.equal(mergeUsageEvidence(before, after).cacheRead.source, "unknown");
  assert.equal(mergeUsageEvidence(before, { prompt_tokens: 10 }).cacheRead.source, "reported");
});
