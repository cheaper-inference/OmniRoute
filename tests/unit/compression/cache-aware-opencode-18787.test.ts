import assert from "node:assert/strict";
import test from "node:test";
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
import {
  applyCompression,
  applyCompressionAsync,
  resolveCacheAwareConfig,
  selectCompressionPlan,
} from "../../../open-sse/services/compression/strategySelector.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

const model = "deepseek-v4.1-flash";
const body = {
  model: `opencode-go/${model}`,
  messages: [
    { role: "system", content: "Keep the agent instructions stable" },
    { role: "user", content: "Run the command" },
    { role: "tool", content: "Previously sent tool output ".repeat(110) },
    { role: "user", content: "Continue using the previous result" },
  ],
};
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

test("#18787: OpenCode and OpenCode Go participate in automatic prefix caching", () => {
  for (const provider of ["opencode", "opencode-go"]) {
    assert.equal(providerSupportsCaching(provider, "openai", null, model), true);
    assert.equal(providerUsesAutomaticPrefixCaching(provider), true);
    assert.equal(providerHonorsOpenAIFormatCacheControl(provider), false);
    assert.equal(
      providerSupportsCaching(provider, "openai", { supportsPromptCaching: false }, model),
      false
    );
    assert.equal(
      providerUsesAutomaticPrefixCaching(provider, { supportsPromptCaching: false }),
      false
    );
    assert.equal(
      providerUsesAutomaticPrefixCaching(provider, { cacheControlPassthrough: "openai-format" }),
      false
    );
  }
});

test("#18787: the resolved OpenCode model activates the cache-aware strategy", () => {
  const ctx = detectCachingContext(body, { provider: "opencode-go", model });
  assert.equal(ctx.hasCacheControl, false);
  assert.equal(ctx.isCachingProvider, true);
  assert.equal(ctx.usesAutomaticPrefixCaching, true);
  assert.deepEqual(getCacheAwareStrategy("ultra", ctx), {
    strategy: "standard",
    skipSystemPrompt: true,
    deterministicOnly: true,
  });
  assert.equal(mustKeepOpenCodeHistoryVerbatim(body), true);
  assert.equal(
    resolveCacheAwareConfig(config, body, { provider: "opencode-go", model })
      .preserveSystemPrompt,
    true
  );
});

test("#18787: stacked compression is bypassed before it can rewrite cached tool history", async () => {
  for (const provider of ["opencode", "opencode-go"]) {
    const plan = selectCompressionPlan(config, null, 6000, body, { provider, model });
    assert.equal(plan.mode, "off");
    assert.deepEqual(plan.stackedPipeline, []);

    const resolved = applyCompression(body, "lite", {
      config,
      cachingContext: { provider, model },
    });
    assert.equal(resolved.body, body);
    assert.equal(resolved.compressed, false);

    const asyncResult = await applyCompressionAsync(body, "stacked", {
      config,
      cachingContext: { provider, model },
    });
    assert.equal(asyncResult.body, body);
    assert.equal(asyncResult.compressed, false);
    assert.equal(asyncResult.stats, null);
  }
});

test("#18787: an explicit cache opt-out restores the configured stacked plan", () => {
  const ctx = {
    provider: "opencode-go",
    model,
    connectionCacheOverride: { supportsPromptCaching: false },
  };
  assert.equal(mustKeepOpenCodeHistoryVerbatim(body, ctx), false);
  assert.equal(selectCompressionPlan(config, null, 6000, body, ctx).mode, "stacked");
});

test("#18787: non-OpenCode providers keep their existing compression plans", () => {
  const plain = { ...body, model: "unknown/model" };
  assert.equal(
    mustKeepOpenCodeHistoryVerbatim(plain, { provider: "unknown" }),
    false
  );
  assert.equal(
    selectCompressionPlan(config, null, 6000, plain, { provider: "unknown" }).mode,
    "stacked"
  );
});
