import test from "node:test";
import assert from "node:assert/strict";

import { providerUsesAutomaticPrefixCaching } from "../../open-sse/utils/cacheControlPolicy.ts";

test("built-in automatic-prefix providers do not require cache_control", () => {
  assert.equal(providerUsesAutomaticPrefixCaching("openai"), true);
  assert.equal(providerUsesAutomaticPrefixCaching("codex"), true);
  assert.equal(providerUsesAutomaticPrefixCaching("azure"), true);
  assert.equal(providerUsesAutomaticPrefixCaching("anthropic"), false);
});

test("custom caching requires marker stripping to claim automatic prefix semantics", () => {
  assert.equal(
    providerUsesAutomaticPrefixCaching("custom-cache", { supportsPromptCaching: true }),
    false
  );
  assert.equal(
    providerUsesAutomaticPrefixCaching("custom-cache", {
      supportsPromptCaching: true,
      cacheControlPassthrough: "strip",
    }),
    true
  );
});

test("explicit marker modes and opt-out override built-in automatic behavior", () => {
  assert.equal(
    providerUsesAutomaticPrefixCaching("openai", { cacheControlPassthrough: "openai-format" }),
    false
  );
  assert.equal(
    providerUsesAutomaticPrefixCaching("openai", { supportsPromptCaching: false }),
    false
  );
});
