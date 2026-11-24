import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const { hasArgonDecision, resolveArgonEligibility } =
  await import("../../../src/lib/usage/providerLimits/argonOverride.ts");
const { applyAntigravityArgonEligibilityToPsd } =
  await import("../../../src/lib/usage/providerLimits.ts");

test("resolveArgonEligibility: a boolean override replaces detection; null or absent follows it", () => {
  assert.equal(resolveArgonEligibility({ hasArgonOverride: true }, false), true);
  assert.equal(resolveArgonEligibility({ hasArgonOverride: false }, true), false);
  assert.equal(resolveArgonEligibility({ hasArgonOverride: null }, false), false);
  assert.equal(resolveArgonEligibility({}, undefined), undefined);
});

test("hasArgonDecision: an override counts even when the quota summary reported no Argon value", () => {
  assert.equal(hasArgonDecision({ hasArgonOverride: true }, undefined), true);
  assert.equal(hasArgonDecision({}, false), true);
  assert.equal(hasArgonDecision({}, undefined), false);
  assert.equal(hasArgonDecision({ hasArgonOverride: null }, undefined), false);
});

test("quota sync: the Argon step runs when only the override is boolean", () => {
  const source = readFileSync(join(__dirname, "../../../src/lib/usage/providerLimits.ts"), "utf8");
  assert.match(source, /hasArgonDecision\(\s*psd\s*,\s*usage\.hasArgon\s*\)/);
  assert.doesNotMatch(source, /if \(typeof usage\.hasArgon === "boolean"\)/);
});

test("applyAntigravityArgonEligibilityToPsd: override true strips the auto exclusions without a detected value", () => {
  const { nextPsd, changed } = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: false, hasArgonOverride: true, excludedModels: ["gemini-4*", "*argon*", "mine"] },
    undefined
  );
  assert.equal(changed, true);
  assert.equal(nextPsd.hasArgon, true);
  assert.deepEqual(nextPsd.excludedModels, ["mine"]);
});

test("applyAntigravityArgonEligibilityToPsd: string-form operator exclusions are kept when Argon is turned off", () => {
  const { nextPsd, changed } = applyAntigravityArgonEligibilityToPsd(
    { hasArgon: true, hasArgonOverride: false, excludedModels: "my-model, other*" },
    true
  );
  assert.equal(changed, true);
  assert.equal(nextPsd.hasArgon, false);
  assert.deepEqual(nextPsd.excludedModels, ["my-model", "other*", "gemini-4*", "*argon*"]);
});
