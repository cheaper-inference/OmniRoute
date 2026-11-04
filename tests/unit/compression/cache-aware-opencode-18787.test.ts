import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

import {
  providerHonorsOpenAIFormatCacheControl,
  providerSupportsCaching,
  providerUsesAutomaticPrefixCaching,
} from "../../../open-sse/utils/cacheControlPolicy.ts";
import {
  detectCachingContext,
  getCacheAwareStrategy,
  mustKeepOpenCodeHistoryVerbatim,
} from "../../../open-sse/services/compression/cachingAware.ts";
import { selectCompressionPlan } from "../../../open-sse/services/compression/strategySelector.ts";
import {
  applyLiveZoneCompression,
  resetLiveZoneCache,
} from "../../../open-sse/services/compression/liveZone.ts";
import type {
  CompressionConfig,
  CompressionResult,
} from "../../../open-sse/services/compression/types.ts";

const model = "deepseek-v4.1-flash";
const provider = "opencode-go";
const config = {
  enabled: true,
  defaultMode: "stacked",
  autoTriggerTokens: 0,
  stackedPipeline: [
    { engine: "session-dedup" },
    { engine: "lite" },
    { engine: "ccr" },
    { engine: "headroom" },
  ],
  preserveSystemPrompt: false,
  comboOverrides: {},
} as CompressionConfig;

const options = {
  principalId: "synthetic-user",
  sessionId: "synthetic-opencode-session",
  variant: { mode: "stacked", provider, model, config },
  preserveRawPrefixOnMiss: true,
};

const baseMessages = [
  { role: "system", content: "Stable instructions" },
  { role: "user", content: "Inspect the file" },
];
const firstBody = { model: `opencode-go/${model}`, messages: baseMessages };

beforeEach(resetLiveZoneCache);

test("#18787: OpenCode providers use implicit prefix caching, not explicit cache_control", () => {
  for (const providerId of ["opencode", "opencode-go"]) {
    assert.equal(providerSupportsCaching(providerId, "openai", null, model), true);
    assert.equal(providerUsesAutomaticPrefixCaching(providerId, null, model), true);
    assert.equal(providerHonorsOpenAIFormatCacheControl(providerId), false);
    assert.equal(
      providerSupportsCaching(providerId, "openai", { supportsPromptCaching: false }, model),
      false
    );
    assert.equal(
      providerUsesAutomaticPrefixCaching(providerId, { supportsPromptCaching: false }, model),
      false
    );
    assert.equal(
      providerUsesAutomaticPrefixCaching(providerId, { cacheControlPassthrough: "openai-format" }),
      false
    );
  }
});

test("#18787: automatic cache detection preserves system prompt and retains selected mode", () => {
  const ctx = detectCachingContext(firstBody, { provider, model });
  assert.equal(ctx.isCachingProvider, true);
  assert.equal(ctx.usesAutomaticPrefixCaching, true);
  assert.equal(ctx.hasCacheControl, false);
  assert.deepEqual(getCacheAwareStrategy("ultra", ctx), {
    strategy: "standard",
    skipSystemPrompt: true,
    deterministicOnly: true,
  });
  assert.equal(mustKeepOpenCodeHistoryVerbatim(firstBody, { provider, model }), true);
  // Do not globally disable the compression plan: only the live-zone prefix is frozen.
  assert.equal(selectCompressionPlan(config, null, 4096, firstBody, { provider, model }).mode, "stacked");
});

test("#18787: a cold request sends the original history, then only new tool output is transformed", async () => {
  let calls = 0;
  const compress = async (input: Record<string, unknown>): Promise<CompressionResult> => {
    calls += 1;
    const messages = (input.messages as Array<Record<string, unknown>>).map((message) => ({
      ...message,
      content: message.role === "tool" ? "compressed new tool result" : "retroactive edit",
    }));
    return { body: { ...input, messages }, compressed: true, stats: null };
  };
  const cold = await applyLiveZoneCompression(firstBody, options, compress);
  assert.strictEqual(cold.body, firstBody);
  assert.equal(cold.compressed, false);
  assert.equal(cold.stats, null);
  assert.equal(calls, 0, "a cold cache must not rewrite any previously submitted message");

  const newAssistant = { role: "assistant", content: "Calling inspect" };
  const tool = { role: "tool", tool_call_id: "call-1", content: "tool output ".repeat(300) };
  const secondBody = { ...firstBody, messages: [...baseMessages, newAssistant, tool] };
  const originalSecond = structuredClone(secondBody);
  const warm = await applyLiveZoneCompression(secondBody, options, compress);
  assert.equal(calls, 1);
  const warmMessages = warm.body.messages as Array<Record<string, unknown>>;
  assert.deepEqual(warmMessages.slice(0, 2), baseMessages);
  assert.deepEqual(warmMessages[2], newAssistant);
  assert.deepEqual(warmMessages[3], { ...tool, content: "compressed new tool result" });
  assert.equal(warm.stats?.liveZone?.cacheHit, true);
  assert.deepEqual(secondBody, originalSecond, "the source body must never be modified");

  const thirdBody = {
    ...firstBody,
    messages: [...secondBody.messages, { role: "user", content: "Continue" }],
  };
  const third = await applyLiveZoneCompression(thirdBody, options, compress);
  assert.equal(calls, 1, "a turn without new tools must not recompress the frozen prefix");
  assert.deepEqual(
    (third.body.messages as unknown[]).slice(0, warmMessages.length),
    warmMessages
  );
  assert.deepEqual((third.body.messages as unknown[]).at(-1), thirdBody.messages.at(-1));
});

test("#18787: a new session after eviction also begins from an unmodified prefix", async () => {
  let calls = 0;
  const compress = async (body: Record<string, unknown>): Promise<CompressionResult> => {
    calls += 1;
    return { body: { ...body, messages: [] }, compressed: true, stats: null };
  };
  const first = await applyLiveZoneCompression(firstBody, options, compress);
  assert.equal(first.body, firstBody);
  resetLiveZoneCache();
  const afterEviction = await applyLiveZoneCompression(firstBody, options, compress);
  assert.equal(afterEviction.body, firstBody);
  assert.equal(calls, 0);
});

test("#18787: opt-out and unrelated providers preserve their existing compression behavior", async () => {
  const override = { supportsPromptCaching: false };
  assert.equal(
    mustKeepOpenCodeHistoryVerbatim(firstBody, { provider, connectionCacheOverride: override }),
    false
  );
  assert.equal(mustKeepOpenCodeHistoryVerbatim({ ...firstBody, model: "unknown/model" }), false);
  assert.equal(
    selectCompressionPlan(config, null, 4096, firstBody, {
      provider,
      connectionCacheOverride: override,
    }).mode,
    "stacked"
  );
  let calls = 0;
  const compress = async (body: Record<string, unknown>): Promise<CompressionResult> => {
    calls += 1;
    return { body: { ...body, messages: [] }, compressed: true, stats: null };
  };
  const legacy = await applyLiveZoneCompression(
    firstBody,
    { ...options, preserveRawPrefixOnMiss: false, sessionId: "opt-out" },
    compress
  );
  assert.equal(calls, 1);
  assert.deepEqual(legacy.body.messages, []);
});

test("#18787: missing session identity fails safely without changing cached history", async () => {
  let calls = 0;
  const cold = await applyLiveZoneCompression(
    firstBody,
    { ...options, principalId: undefined },
    async (body) => {
      calls += 1;
      return { body: { ...body, messages: [] }, compressed: true, stats: null };
    }
  );
  assert.equal(cold.body, firstBody);
  assert.equal(calls, 0);
});
