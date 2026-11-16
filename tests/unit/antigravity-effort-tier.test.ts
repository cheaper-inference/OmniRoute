import test from "node:test";
import assert from "node:assert/strict";

const { selectAntigravityEffortTier, isAntigravityEffortTierSelectionEnabled } =
  await import("../../open-sse/config/antigravityModelAliases.ts");

// A bare Antigravity id resolves to a fixed default tier (gemini-4-argon ->
// -medium). Opt-in, the client's reasoning_effort picks the -high/-medium/-low
// sibling instead — but only when the shared catalog actually lists that
// sibling, so unknown tiers never produce an unroutable id.

const ENV = "ANTIGRAVITY_EFFORT_TIER_SELECTION";

test.after(() => {
  delete process.env[ENV];
});

test("flag off (default): every model keeps its fixed default tier", () => {
  delete process.env[ENV];
  assert.equal(isAntigravityEffortTierSelectionEnabled(), false);
  assert.equal(selectAntigravityEffortTier("gemini-4-argon", "high"), "gemini-4-argon-medium");
  assert.equal(selectAntigravityEffortTier("gemini-3.8-flash", "low"), "gemini-3.8-flash-high");
});

test("flag on: reasoning_effort picks the tier sibling when the catalog has it", () => {
  process.env[ENV] = "true";
  assert.equal(isAntigravityEffortTierSelectionEnabled(), true);
  assert.equal(selectAntigravityEffortTier("gemini-4-argon", "high"), "gemini-4-argon-high");
  assert.equal(selectAntigravityEffortTier("gemini-3.8-flash", "low"), "gemini-3.8-flash-low");
  assert.equal(selectAntigravityEffortTier("gemini-4-argon-medium", "low"), "gemini-4-argon-low");
});

test("flag on: missing sibling, non-tier model or odd effort keeps the resolved id", () => {
  process.env[ENV] = "1";
  // gpt-oss-120b has no -high sibling in the shared catalog.
  assert.equal(selectAntigravityEffortTier("gpt-oss-120b", "high"), "gpt-oss-120b-medium");
  // Claude ids are not a tier family.
  assert.equal(selectAntigravityEffortTier("claude-sonnet-4-6", "high"), "claude-sonnet-4-6");
  // 3.7 flash resolves to the shared -tiered endpoint, not a tier id.
  assert.equal(selectAntigravityEffortTier("gemini-3.7-flash", "low"), "gemini-3.7-flash-tiered");
  // Efforts outside high/medium/low and missing effort change nothing.
  assert.equal(selectAntigravityEffortTier("gemini-4-argon", "minimal"), "gemini-4-argon-medium");
  assert.equal(selectAntigravityEffortTier("gemini-4-argon", undefined), "gemini-4-argon-medium");
  assert.equal(selectAntigravityEffortTier("", "high"), "");
});
