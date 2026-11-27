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

test("Antigravity automatic prefix eligibility follows Gemini mode and the connection policy", () => {
  const gemini = "gemini-4-hydrogen-high";
  assert.equal(providerUsesAutomaticPrefixCaching("antigravity", null, gemini, "implicit"), true);
  assert.equal(providerUsesAutomaticPrefixCaching("agy", null, gemini, "off"), false);
  // With the mode off, an explicit strip override keeps its existing automatic-prefix meaning.
  assert.equal(
    providerUsesAutomaticPrefixCaching(
      "agy",
      { supportsPromptCaching: true, cacheControlPassthrough: "strip" },
      gemini,
      "off"
    ),
    true
  );
  assert.equal(
    providerUsesAutomaticPrefixCaching(
      "antigravity",
      { supportsPromptCaching: false },
      gemini,
      "implicit"
    ),
    false
  );
  assert.equal(
    providerUsesAutomaticPrefixCaching(
      "antigravity",
      { cacheControlPassthrough: "claude-format" },
      gemini,
      "implicit"
    ),
    false
  );
  assert.equal(providerUsesAutomaticPrefixCaching("agy", null, "claude-sonnet-4-6"), false);
  assert.equal(
    providerUsesAutomaticPrefixCaching(
      "agy",
      { supportsPromptCaching: true, cacheControlPassthrough: "strip" },
      "claude-sonnet-4-6",
      "implicit"
    ),
    true
  );
});

test("an omitted or null Gemini mode stays off for Antigravity automatic prefix caching", () => {
  const model = "gemini-4-hydrogen-high";
  assert.equal(providerUsesAutomaticPrefixCaching("antigravity", null, model, null), false);
  assert.equal(providerUsesAutomaticPrefixCaching("agy", null, model), false);
  assert.equal(
    providerUsesAutomaticPrefixCaching("agy", { supportsPromptCaching: false }, model, null),
    false
  );
  assert.equal(
    providerUsesAutomaticPrefixCaching(
      "agy",
      { cacheControlPassthrough: "claude-format" },
      model,
      null
    ),
    false
  );
  assert.equal(
    providerUsesAutomaticPrefixCaching("antigravity", null, "claude-sonnet-4-6", null),
    false
  );
});
