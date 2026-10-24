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

  assert.deepEqual(
    selectAntigravityQuotaWindowNames(quotaNames, "gemini-4-argon"),
    ["gemini_4_argon_weekly", "argon_weekly"]
  );
  assert.deepEqual(
    selectAntigravityQuotaWindowNames(quotaNames, "antigravity/gemini-4-argon-high"),
    ["gemini_4_argon_weekly", "argon_weekly"]
  );
});

test("selectAntigravityQuotaWindowNames isolates Argon from gemini_weekly and claude_gpt_weekly when Argon windows are absent", () => {
  const quotaNames = ["gemini-3.8-flash", "gemini_weekly", "claude_gpt_weekly"];

  assert.deepEqual(selectAntigravityQuotaWindowNames(quotaNames, "gemini-4-argon"), []);
  assert.deepEqual(
    selectAntigravityQuotaWindowNames(quotaNames, "antigravity/gemini-4-argon-high"),
    []
  );
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

  assert.deepEqual(
    selectAntigravityQuotaWindowNames(quotaNames, "antigravity/gemini-3.8-flash"),
    ["gemini-3.8-flash-tiered", "gemini_weekly"]
  );
  assert.deepEqual(
    selectAntigravityQuotaWindowNames(quotaNames, "antigravity/claude-sonnet-4-5"),
    ["claude_gpt_weekly"]
  );
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
