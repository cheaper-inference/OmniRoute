import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { isModelExcludedByConnection } from "../../../src/domain/connectionModelRules.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { applyAntigravityArgonEligibilityToPsd } =
  await import("../../../src/lib/usage/providerLimits.ts");

test("src/lib/usage/providerLimits.ts: statically exports applyAntigravityArgonEligibilityToPsd", () => {
  const providerLimitsSource = readFileSync(
    join(__dirname, "../../../src/lib/usage/providerLimits.ts"),
    "utf8"
  );
  assert.match(
    providerLimitsSource,
    /export\s+function\s+applyAntigravityArgonEligibilityToPsd\s*\(/
  );
  assert.match(
    providerLimitsSource,
    /applyAntigravityArgonEligibilityToPsd\s*\(\s*nextPsd\s*,\s*usage\.hasArgon\s*\)/
  );
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is false on empty psd", () => {
  const psd = {};
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["gemini-4*", "*argon*"]);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is false preserves existing operator exclusions", () => {
  const psd = {
    excludedModels: ["claude-3-haiku*", "gpt-4*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, [
    "claude-3-haiku*",
    "gpt-4*",
    "gemini-4*",
    "*argon*",
  ]);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is false is idempotent", () => {
  const psd = {
    hasArgon: false,
    excludedModels: ["claude-3-haiku*", "gemini-4*", "*argon*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, false);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*", "gemini-4*", "*argon*"]);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is true strips auto-managed patterns", () => {
  const psd = {
    hasArgon: false,
    excludedModels: ["claude-3-haiku*", "gemini-4*", "*argon*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, true);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, true);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*"]);
});

test("applyAntigravityArgonEligibilityToPsd: never writes the user-facing connectionTestModel setting", () => {
  // connectionTestModel is an operator setting read by the provider test-message route;
  // a quota sync must not silently pick it for the user.
  const unset = applyAntigravityArgonEligibilityToPsd({}, true);
  assert.equal(unset.changed, true);
  assert.equal("connectionTestModel" in unset.nextPsd, false);

  const userChosen = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: true, connectionTestModel: "gemini-3.8-flash" },
    true
  );
  assert.equal(userChosen.changed, false);
  assert.equal(userChosen.nextPsd.connectionTestModel, "gemini-3.8-flash");

  const ineligible = applyAntigravityArgonEligibilityToPsd({}, false);
  assert.equal("connectionTestModel" in ineligible.nextPsd, false);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is true is idempotent", () => {
  const psd = {
    hasArgon: true,
    connectionTestModel: "gemini-4-argon",
    excludedModels: ["claude-3-haiku*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, true);

  assert.equal(result.changed, false);
  assert.equal(result.nextPsd.hasArgon, true);
  assert.equal(result.nextPsd.connectionTestModel, "gemini-4-argon");
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*"]);
});

test("applyAntigravityArgonEligibilityToPsd: non-boolean hasArgon does not modify psd", () => {
  const psd = { hasArgon: false, excludedModels: ["gemini-4*"] };

  for (const invalid of [undefined, null, "true", 1, {}, []]) {
    const result = applyAntigravityArgonEligibilityToPsd(psd, invalid);
    assert.equal(result.changed, false);
    assert.equal(result.nextPsd.hasArgon, false);
    assert.deepEqual(result.nextPsd.excludedModels, ["gemini-4*"]);
  }
});

test("isModelExcludedByConnection: integrates correctly with applyAntigravityArgonEligibilityToPsd", () => {
  const initialPsd = {
    excludedModels: ["claude-3-haiku*"],
  };
  const { nextPsd: ineligiblePsd } = applyAntigravityArgonEligibilityToPsd(initialPsd, false);

  assert.equal(isModelExcludedByConnection("gemini-4-argon", ineligiblePsd), true);
  assert.equal(isModelExcludedByConnection("gemini-4-argon-high", ineligiblePsd), true);
  assert.equal(
    isModelExcludedByConnection("antigravity/gemini-4-argon-medium", ineligiblePsd),
    true
  );

  assert.equal(isModelExcludedByConnection("gemini-3.8-flash", ineligiblePsd), false);
  assert.equal(isModelExcludedByConnection("gemini-2.5-pro", ineligiblePsd), false);

  assert.equal(isModelExcludedByConnection("claude-3-haiku-20240307", ineligiblePsd), true);

  const { nextPsd: eligiblePsd } = applyAntigravityArgonEligibilityToPsd(ineligiblePsd, true);

  assert.equal(isModelExcludedByConnection("gemini-4-argon", eligiblePsd), false);
  assert.equal(isModelExcludedByConnection("gemini-4-argon-high", eligiblePsd), false);
  assert.equal(
    isModelExcludedByConnection("antigravity/gemini-4-argon-medium", eligiblePsd),
    false
  );

  assert.equal(isModelExcludedByConnection("claude-3-haiku-20240307", eligiblePsd), true);
});

// An operator can pin the eligibility per account (hasArgonOverride) when Google's quota
// summary under-reports it: Pro accounts list no separate Argon group yet serve Gemini 4.
test("applyAntigravityArgonEligibilityToPsd: hasArgonOverride true wins over a detected false", () => {
  const psd = {
    hasArgonOverride: true,
    hasArgon: false,
    excludedModels: ["claude-3-haiku*", "gemini-4*", "*argon*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, true);
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*"]);
  assert.equal(result.nextPsd.hasArgonOverride, true);
  assert.equal(isModelExcludedByConnection("gemini-4-neon-high", result.nextPsd), false);
  assert.equal(isModelExcludedByConnection("gemini-4-argon-high", result.nextPsd), false);
});

test("applyAntigravityArgonEligibilityToPsd: hasArgonOverride true on an eligible account is a no-op", () => {
  const psd = { hasArgonOverride: true, hasArgon: true, excludedModels: ["gpt-4*"] };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.changed, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["gpt-4*"]);
});

test("applyAntigravityArgonEligibilityToPsd: hasArgonOverride false wins over a detected true", () => {
  const psd = { hasArgonOverride: false };
  const result = applyAntigravityArgonEligibilityToPsd(psd, true);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["gemini-4*", "*argon*"]);
});

test("applyAntigravityArgonEligibilityToPsd: a cleared (null) hasArgonOverride follows detection again", () => {
  const psd = { hasArgonOverride: null, hasArgon: true };
  const result = applyAntigravityArgonEligibilityToPsd(psd, false);

  assert.equal(result.nextPsd.hasArgon, false);
  assert.deepEqual(result.nextPsd.excludedModels, ["gemini-4*", "*argon*"]);
});
