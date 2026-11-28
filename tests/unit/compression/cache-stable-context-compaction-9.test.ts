import assert from "node:assert/strict";
import { test } from "node:test";

import {
  shouldPreserveCachedHistory,
  mustKeepOpenCodeHistoryVerbatim,
} from "../../../open-sse/services/compression/cachingAware.ts";

const claudeBody = {
  system: [{ type: "text", text: "Stable system", cache_control: { type: "ephemeral" } }],
  messages: [{ role: "user", content: "Continue" }],
};

test("#9: cacheable Claude history avoids proactive context compaction even with prompt compression off", () => {
  assert.equal(
    shouldPreserveCachedHistory(claudeBody, {
      provider: "claude",
      targetFormat: "claude",
      model: "claude-opus-5-5",
    }),
    true
  );
  assert.equal(
    mustKeepOpenCodeHistoryVerbatim(claudeBody, {
      provider: "claude",
      targetFormat: "claude",
      model: "claude-opus-5-5",
    }),
    false,
    "the old OpenCode-only guard misses this cacheable request"
  );
});

test("#9: automatic prefix caching is protected without an explicit cache marker", () => {
  assert.equal(
    shouldPreserveCachedHistory(
      { model: "deepseek-flash", messages: [{ role: "user", content: "Continue" }] },
      { provider: "opencode-go", targetFormat: "openai", model: "deepseek-flash" }
    ),
    true
  );
});

test("#9: per-connection opt-out and non-caching upstreams keep proactive compaction", () => {
  assert.equal(
    shouldPreserveCachedHistory(claudeBody, {
      provider: "claude",
      targetFormat: "claude",
      connectionCacheOverride: { supportsPromptCaching: false },
    }),
    false
  );
  assert.equal(
    shouldPreserveCachedHistory(
      { model: "uncached", messages: [{ role: "user", content: "Continue" }] },
      { provider: "custom-uncached", targetFormat: "openai" }
    ),
    false
  );
});
