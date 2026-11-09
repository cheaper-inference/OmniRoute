import test from "node:test";
import assert from "node:assert/strict";
import {
  getAntigravityQuotaFamily,
  selectAntigravityQuotaWindowNames,
  quotaWindowNamesForScope,
  remainingPercentFromQuotaWindows,
} from "../../../open-sse/services/antigravityQuotaFamily.ts";

test("getAntigravityQuotaFamily classifies Argon models and weekly window keys as argon", () => {
  assert.equal(getAntigravityQuotaFamily("gemini-4-argon"), "argon");
  assert.equal(getAntigravityQuotaFamily("antigravity/gemini-4-argon-high"), "argon");
  assert.equal(getAntigravityQuotaFamily("agy/gemini-4-argon-medium"), "argon");
  assert.equal(getAntigravityQuotaFamily("gemini_4_argon_weekly"), "argon");
  assert.equal(getAntigravityQuotaFamily("argon_weekly"), "argon");
  assert.equal(getAntigravityQuotaFamily("gemini-3.8-flash"), "gemini");
  assert.equal(getAntigravityQuotaFamily("gemini_weekly"), "gemini");
  assert.equal(getAntigravityQuotaFamily("claude-opus-4-6-thinking"), "claude");
  assert.equal(getAntigravityQuotaFamily("claude-sonnet-4-5"), "claude");
});

test("selectAntigravityQuotaWindowNames includes gemini_4_argon_weekly and argon_weekly for Argon requests", () => {
  const quotaNames = [
    "gemini-3.8-flash",
    "gemini_weekly",
    "claude_gpt_weekly",
    "gemini_4_argon_weekly",
    "argon_weekly",
  ];

  assert.deepEqual(selectAntigravityQuotaWindowNames(quotaNames, "gemini-4-argon"), [
    "gemini_4_argon_weekly",
    "argon_weekly",
  ]);
  assert.deepEqual(
    selectAntigravityQuotaWindowNames(quotaNames, "antigravity/gemini-4-argon-high"),
    ["gemini_4_argon_weekly", "argon_weekly"]
  );
});

test("selectAntigravityQuotaWindowNames falls back to gemini_* buckets for Argon when dedicated Argon windows are absent (Ultra plan)", () => {
  const quotaNames = ["gemini-3.8-flash", "gemini_weekly", "gemini_session", "claude_gpt_weekly"];

  assert.deepEqual(selectAntigravityQuotaWindowNames(quotaNames, "gemini-4-argon"), [
    "gemini_session",
    "gemini_weekly",
  ]);
  assert.deepEqual(
    selectAntigravityQuotaWindowNames(quotaNames, "antigravity/gemini-4-argon-high"),
    ["gemini_session", "gemini_weekly"]
  );
  assert.deepEqual(
    quotaWindowNamesForScope(quotaNames, {
      provider: "antigravity",
      requestedModel: "antigravity/gemini-4-argon",
    }),
    ["gemini_session", "gemini_weekly"]
  );
});

test("selectAntigravityQuotaWindowNames returns empty array for Argon when both Argon and Gemini windows are absent", () => {
  const quotaNames = ["claude_gpt_weekly", "claude_gpt_session"];

  assert.deepEqual(selectAntigravityQuotaWindowNames(quotaNames, "gemini-4-argon"), []);
  assert.deepEqual(
    quotaWindowNamesForScope(quotaNames, {
      provider: "antigravity",
      requestedModel: "antigravity/gemini-4-argon",
    }),
    []
  );
});

test("selectAntigravityQuotaWindowNames isolates Gemini and Claude requests from gemini_4_argon_weekly", () => {
  const quotaNames = [
    "gemini-3.8-flash-tiered",
    "gemini_weekly",
    "claude_gpt_weekly",
    "gemini_4_argon_weekly",
    "argon_weekly",
  ];

  assert.deepEqual(selectAntigravityQuotaWindowNames(quotaNames, "antigravity/gemini-3.8-flash"), [
    "gemini-3.8-flash-tiered",
    "gemini_weekly",
  ]);
  assert.deepEqual(selectAntigravityQuotaWindowNames(quotaNames, "antigravity/claude-sonnet-4-5"), [
    "claude_gpt_weekly",
  ]);
});

test("remainingPercentFromQuotaWindows computes Argon remaining percent from gemini_4_argon_weekly", () => {
  const rawWindows = {
    gemini_weekly: { percentUsed: 1 },
    gemini_4_argon_weekly: { percentUsed: 0.25 },
  };

  assert.equal(
    remainingPercentFromQuotaWindows(rawWindows, {
      provider: "antigravity",
      requestedModel: "antigravity/gemini-4-argon",
    }),
    75
  );
});

test("quota scoping and helpers handle non-Antigravity providers and other models", async () => {
  const {
    getQuotaScopedModelForProvider,
    getQuotaScopeLabelForProvider,
    getQuotaFetchScope,
    isAntigravityQuotaProvider,
    finitePercentUsed,
  } = await import("../../../open-sse/services/antigravityQuotaFamily.ts");

  assert.equal(getQuotaScopedModelForProvider("antigravity", null), null);
  assert.equal(getQuotaScopedModelForProvider("openai", "gpt-4"), "gpt-4");
  assert.equal(getQuotaScopedModelForProvider("antigravity", "gemini-4-argon"), "family:argon");
  assert.equal(getQuotaScopedModelForProvider("agy", "gemini-3.8-flash"), "family:gemini");
  assert.equal(getQuotaScopedModelForProvider("antigravity", "custom-model"), "custom-model");

  assert.equal(getQuotaScopeLabelForProvider("openai", "gpt-4"), "model");
  assert.equal(getQuotaScopeLabelForProvider("antigravity", "gemini-4-argon"), "family");
  assert.equal(getQuotaScopeLabelForProvider("agy", "claude-sonnet-4-5"), "family");
  assert.equal(getQuotaScopeLabelForProvider("antigravity", "custom-model"), "model");

  assert.equal(getQuotaFetchScope("openai", "gpt-4"), "*");
  assert.equal(getQuotaFetchScope("antigravity", "gemini-4-argon"), "family:argon");
  assert.equal(getQuotaFetchScope("antigravity", null), "*");

  assert.equal(isAntigravityQuotaProvider("antigravity"), true);
  assert.equal(isAntigravityQuotaProvider("agy"), true);
  assert.equal(isAntigravityQuotaProvider("openai"), false);
  assert.equal(isAntigravityQuotaProvider(null), false);

  assert.equal(finitePercentUsed(0.42), 0.42);
  assert.equal(finitePercentUsed("0.75"), 0.75);
  assert.equal(finitePercentUsed(""), null);
  assert.equal(finitePercentUsed("   "), null);
  assert.equal(finitePercentUsed("invalid"), null);
  assert.equal(finitePercentUsed(null), null);
  assert.equal(finitePercentUsed(undefined), null);
  assert.equal(finitePercentUsed(NaN), null);

  const windows = {
    gemini_weekly: { percentUsed: 0.5 },
    claude_gpt_weekly: { percentUsed: null },
  };
  assert.equal(
    remainingPercentFromQuotaWindows(windows, {
      provider: "antigravity",
      requestedModel: "antigravity/claude-sonnet-4-5",
    }),
    100
  );
  assert.equal(
    remainingPercentFromQuotaWindows(
      {},
      {
        provider: "antigravity",
        requestedModel: "antigravity/gemini-3.8-flash",
      }
    ),
    null
  );
});

test("selectAntigravityQuotaWindowNames handles exact model match and other family", () => {
  const otherWindows = ["custom-model-v1", "gemini_weekly"];
  assert.deepEqual(selectAntigravityQuotaWindowNames(otherWindows, "antigravity/custom-model-v1"), [
    "custom-model-v1",
  ]);

  assert.deepEqual(selectAntigravityQuotaWindowNames(otherWindows, null), otherWindows);

  const familyOnlyWindows = ["antigravity/gemini-unknown-window"];
  assert.deepEqual(
    selectAntigravityQuotaWindowNames(familyOnlyWindows, "antigravity/gemini-3.8-flash"),
    familyOnlyWindows
  );
});

test("quotaWindowNamesForScope keeps the shipped all-windows fallback for Gemini and Claude (only Argon fails open)", () => {
  const geminiOnly = ["gemini_weekly", "gemini_session"];
  const scopedClaude = quotaWindowNamesForScope(geminiOnly, {
    provider: "antigravity",
    requestedModel: "antigravity/claude-sonnet-4-5",
  });
  assert.equal(scopedClaude, geminiOnly);

  const claudeOnly = ["claude_gpt_weekly"];
  assert.equal(
    quotaWindowNamesForScope(claudeOnly, {
      provider: "antigravity",
      requestedModel: "antigravity/gemini-3.8-flash",
    }),
    claudeOnly
  );
  assert.equal(
    remainingPercentFromQuotaWindows(
      { claude_gpt_weekly: { percentUsed: 0.5 } },
      { provider: "antigravity", requestedModel: "antigravity/gemini-3.8-flash" }
    ),
    50
  );
});

test("remainingPercentFromQuotaWindows stays unknown (null) for unreported windows on non-Antigravity providers", () => {
  assert.equal(
    remainingPercentFromQuotaWindows(
      { five_hour: { percentUsed: null } },
      { provider: "openai", requestedModel: "gpt-4" }
    ),
    null
  );
});
