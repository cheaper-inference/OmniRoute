import test from "node:test";
import assert from "node:assert/strict";

const { selectAntigravityEffortTier, isAntigravityEffortTierSelectionEnabled } =
  await import("../../open-sse/config/antigravityModelAliases.ts");

// selectAntigravityEffortTier takes an ALREADY-RESOLVED upstream id (what
// cleanModelName returns: account catalog, MITM alias or static alias). It must
// never resolve it again: a second static-alias pass would rewrite an
// account-catalog literal such as gemini-3.7-flash-high to the shared -tiered id,
// even with the flag unset. Opt-in, the client's reasoning_effort picks the
// -high/-medium/-low sibling — but only when the shared catalog actually lists
// that sibling, so unknown tiers never produce an unroutable id.

const ENV = "ANTIGRAVITY_EFFORT_TIER_SELECTION";

test.after(() => {
  delete process.env[ENV];
});

test("flag off (default): the resolved id is returned unchanged, whatever the effort", () => {
  delete process.env[ENV];
  assert.equal(isAntigravityEffortTierSelectionEnabled(), false);
  assert.equal(
    selectAntigravityEffortTier("gemini-4-argon-medium", "high"),
    "gemini-4-argon-medium"
  );
  assert.equal(
    selectAntigravityEffortTier("gemini-3.8-flash-high", "low"),
    "gemini-3.8-flash-high"
  );
  // An account-catalog literal is not an alias target: it must survive untouched.
  assert.equal(
    selectAntigravityEffortTier("gemini-3.7-flash-high", "low"),
    "gemini-3.7-flash-high"
  );
  assert.equal(
    selectAntigravityEffortTier("gemini-3.7-flash-medium", undefined),
    "gemini-3.7-flash-medium"
  );
});

test("flag on: reasoning_effort picks the tier sibling when the catalog has it", () => {
  process.env[ENV] = "true";
  assert.equal(isAntigravityEffortTierSelectionEnabled(), true);
  assert.equal(selectAntigravityEffortTier("gemini-4-argon-medium", "high"), "gemini-4-argon-high");
  assert.equal(selectAntigravityEffortTier("gemini-3.8-flash-high", "low"), "gemini-3.8-flash-low");
  assert.equal(selectAntigravityEffortTier("gemini-4-argon-high", "low"), "gemini-4-argon-low");
});

test("flag on: missing sibling, non-tier model or odd effort keeps the resolved id", () => {
  process.env[ENV] = "1";
  // gpt-oss-120b has no -high sibling in the shared catalog.
  assert.equal(selectAntigravityEffortTier("gpt-oss-120b-medium", "high"), "gpt-oss-120b-medium");
  // Claude ids are not a tier family.
  assert.equal(selectAntigravityEffortTier("claude-sonnet-4-6", "high"), "claude-sonnet-4-6");
  // The shared 3.7 -tiered endpoint is not a tier id.
  assert.equal(
    selectAntigravityEffortTier("gemini-3.7-flash-tiered", "low"),
    "gemini-3.7-flash-tiered"
  );
  // An account-catalog 3.7 literal has no catalog sibling: it is kept, not re-aliased to -tiered.
  assert.equal(
    selectAntigravityEffortTier("gemini-3.7-flash-high", "low"),
    "gemini-3.7-flash-high"
  );
  // Efforts outside high/medium/low and missing effort change nothing.
  assert.equal(
    selectAntigravityEffortTier("gemini-4-argon-medium", "minimal"),
    "gemini-4-argon-medium"
  );
  assert.equal(
    selectAntigravityEffortTier("gemini-4-argon-medium", undefined),
    "gemini-4-argon-medium"
  );
  assert.equal(selectAntigravityEffortTier("", "high"), "");
});
