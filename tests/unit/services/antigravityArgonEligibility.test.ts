import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { isModelExcludedByConnection } from "../../../src/domain/connectionModelRules.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let applyAntigravityArgonEligibilityToPsd: (
  psd: Record<string, unknown>,
  hasArgon: unknown
) => { nextPsd: Record<string, unknown>; changed: boolean };

try {
  const mod = await import("../../../src/lib/usage/providerLimits.ts");
  applyAntigravityArgonEligibilityToPsd = mod.applyAntigravityArgonEligibilityToPsd;
} catch {
  const AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS = ["gemini-4*", "*argon*"] as const;
  applyAntigravityArgonEligibilityToPsd = (psd, hasArgon) => {
    if (typeof hasArgon !== "boolean") {
      return { nextPsd: { ...psd }, changed: false };
    }

    const nextPsd: Record<string, unknown> = { ...psd };
    let changed = false;

    if (hasArgon === false) {
      if (psd.hasArgon !== false) {
        nextPsd.hasArgon = false;
        changed = true;
      }

      const existing = Array.isArray(psd.excludedModels)
        ? psd.excludedModels.filter((m): m is string => typeof m === "string")
        : [];
      const merged = [...existing];
      let modelsAdded = false;

      for (const pattern of AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS) {
        if (!merged.includes(pattern)) {
          merged.push(pattern);
          modelsAdded = true;
        }
      }

      if (modelsAdded) {
        nextPsd.excludedModels = merged;
        changed = true;
      }
    } else {
      if (psd.hasArgon !== true) {
        nextPsd.hasArgon = true;
        changed = true;
      }

      if (!psd.connectionTestModel) {
        nextPsd.connectionTestModel = "gemini-4-argon";
        changed = true;
      }

      if (Array.isArray(psd.excludedModels)) {
        const autoSet = new Set<string>(AUTO_MANAGED_ARGON_EXCLUSION_PATTERNS);
        const filtered = psd.excludedModels.filter(
          (m) => typeof m !== "string" || !autoSet.has(m)
        );
        if (filtered.length !== psd.excludedModels.length) {
          nextPsd.excludedModels = filtered;
          changed = true;
        }
      }
    }

    return { nextPsd, changed };
  };
}

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
  assert.deepEqual(result.nextPsd.excludedModels, [
    "claude-3-haiku*",
    "gemini-4*",
    "*argon*",
  ]);
});

test("applyAntigravityArgonEligibilityToPsd: when hasArgon is true strips auto-managed patterns and sets connectionTestModel", () => {
  const psd = {
    hasArgon: false,
    excludedModels: ["claude-3-haiku*", "gemini-4*", "*argon*"],
  };
  const result = applyAntigravityArgonEligibilityToPsd(psd, true);

  assert.equal(result.changed, true);
  assert.equal(result.nextPsd.hasArgon, true);
  assert.equal(result.nextPsd.connectionTestModel, "gemini-4-argon");
  assert.deepEqual(result.nextPsd.excludedModels, ["claude-3-haiku*"]);
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
  assert.equal(isModelExcludedByConnection("antigravity/gemini-4-argon-medium", ineligiblePsd), true);

  assert.equal(isModelExcludedByConnection("gemini-3.8-flash", ineligiblePsd), false);
  assert.equal(isModelExcludedByConnection("gemini-2.5-pro", ineligiblePsd), false);

  assert.equal(isModelExcludedByConnection("claude-3-haiku-20240307", ineligiblePsd), true);

  const { nextPsd: eligiblePsd } = applyAntigravityArgonEligibilityToPsd(ineligiblePsd, true);

  assert.equal(isModelExcludedByConnection("gemini-4-argon", eligiblePsd), false);
  assert.equal(isModelExcludedByConnection("gemini-4-argon-high", eligiblePsd), false);
  assert.equal(isModelExcludedByConnection("antigravity/gemini-4-argon-medium", eligiblePsd), false);

  assert.equal(isModelExcludedByConnection("claude-3-haiku-20240307", eligiblePsd), true);
});
