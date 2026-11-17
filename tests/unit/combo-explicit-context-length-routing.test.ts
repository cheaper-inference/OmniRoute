/**
 * Regression guard: an operator-set `context_length` on a combo record must be
 * honored by the request-time context resolution, not just by the /v1/models
 * catalog advertisement.
 *
 * Before this fix `resolveComboContextLimit()` had no notion of the combo's own
 * `context_length`, so a combo whose members carry no per-model window fell
 * through to the provider's generic `defaultContextLength` (e.g. openrouter's
 * 128000, command-code's 200000) and rejected large requests with
 * "Input exceeds context window ... limit 128000" even though the operator had
 * explicitly configured a much larger window on the combo.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { resolveComboContextLimit } = await import("../../open-sse/services/contextManager.ts");

test("explicit combo context_length wins over an unknown provider/model fallback", () => {
  // openrouter/<custom alias> has no per-model window → resolveTokenLimit()
  // would return the provider default (128000) as a non-specific fallback.
  const resolved = resolveComboContextLimit({
    provider: "openrouter",
    model: "zdr-glm-5.3-flash-max",
    comboTargetLimits: [],
    comboContextLength: 960000,
  });

  assert.equal(resolved.limit, 960000);
  assert.equal(resolved.source, "combo-explicit");
});

test("explicit combo context_length outranks a registry-specific target window", () => {
  // The operator's declaration is authoritative: it must win even when the
  // concrete target resolves a specific (registry-known) window.
  const resolved = resolveComboContextLimit({
    provider: "openai",
    model: "gpt-4",
    comboTargetLimits: [200000],
    comboContextLength: 512000,
  });

  assert.equal(resolved.limit, 512000);
  assert.equal(resolved.source, "combo-explicit");
});

test("absent combo context_length preserves the pre-existing resolution order", () => {
  const resolved = resolveComboContextLimit({
    provider: "openrouter",
    model: "zdr-glm-5.3-flash-max",
    comboTargetLimits: [777000],
  });

  // No explicit value → the previous combo-min / target behavior is unchanged.
  assert.notEqual(resolved.source, "combo-explicit");
  assert.equal(resolved.limit, 128000);
  assert.equal(resolved.source, "target");
});

test("combo-min fallback still applies when no explicit value is set", () => {
  const resolved = resolveComboContextLimit({
    provider: "definitely-not-a-registered-provider",
    model: "unknown-model",
    comboTargetLimits: [640000, 900000],
    comboContextLength: null,
  });

  assert.equal(resolved.limit, 640000);
  assert.equal(resolved.source, "combo-min");
});

const INVALID_EXPLICIT_VALUES: Array<number | null | undefined> = [
  0,
  -1,
  Number.NaN,
  Number.POSITIVE_INFINITY,
  null,
  undefined,
];

for (const value of INVALID_EXPLICIT_VALUES) {
  test(`invalid combo context_length (${String(value)}) is ignored, not trusted`, () => {
    const resolved = resolveComboContextLimit({
      provider: "definitely-not-a-registered-provider",
      model: "unknown-model",
      comboTargetLimits: [640000],
      comboContextLength: value as number | null,
    });

    assert.notEqual(resolved.source, "combo-explicit");
    assert.equal(resolved.limit, 640000);
  });
}

test("explicit combo context_length is capped at the executing target's smaller window", () => {
  // The combo declares 1M, but codex/gpt-6.1-sol has 872k. A combo cannot give a
  // request more room than the model it routes to.
  const resolved = resolveComboContextLimit({
    provider: "codex",
    model: "gpt-6.1-sol",
    comboTargetLimits: [872000, 1000000],
    comboContextLength: 1_000_000,
    targetContextWindow: 872_000,
  });

  assert.equal(resolved.limit, 872_000);
  assert.equal(resolved.source, "combo-explicit-capped");
});

test("explicit combo context_length below the target window still wins", () => {
  const resolved = resolveComboContextLimit({
    provider: "kiro",
    model: "claude-opus-5.5",
    comboTargetLimits: [1_000_000],
    comboContextLength: 200_000,
    targetContextWindow: 1_000_000,
  });

  assert.equal(resolved.limit, 200_000);
  assert.equal(resolved.source, "combo-explicit");
});

for (const value of [null, undefined, 0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
  test(`unknown target window (${String(value)}) keeps the explicit combo context_length`, () => {
    const resolved = resolveComboContextLimit({
      provider: "openrouter",
      model: "zdr-glm-5.3-flash-max",
      comboTargetLimits: [],
      comboContextLength: 960_000,
      targetContextWindow: value as number | null,
    });

    assert.equal(resolved.limit, 960_000);
    assert.equal(resolved.source, "combo-explicit");
  });
}
