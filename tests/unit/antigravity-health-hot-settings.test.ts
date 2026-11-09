import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  pruneResilienceSettingsToProvided,
  resolveResilienceSettings,
} from "../../src/lib/resilience/settings.ts";
import { updateResilienceSchema } from "../../src/shared/validation/schemas/settings.ts";
import { isAntigravityAdaptiveHealthEnabled } from "../../open-sse/services/antigravityHealth.ts";

test("adaptive health can be overridden without changing other resilience settings", () => {
  const defaults = resolveResilienceSettings(null);
  const toggled = mergeResilienceSettings(defaults, {
    antigravityAdaptiveHealth: { enabled: !defaults.antigravityAdaptiveHealth.enabled },
  });
  assert.equal(
    toggled.antigravityAdaptiveHealth.enabled,
    !defaults.antigravityAdaptiveHealth.enabled
  );
  assert.deepEqual(toggled.requestQueue, defaults.requestQueue);
  const stored = pruneResilienceSettingsToProvided(toggled, defaults);
  assert.equal(
    resolveResilienceSettings({ resilienceSettings: stored }).antigravityAdaptiveHealth.enabled,
    !defaults.antigravityAdaptiveHealth.enabled
  );
});

test("legacy fork Antigravity setting is honored until an explicit new override", () => {
  const legacy = { resilienceSettings: { antigravity: { adaptiveHealthEnabled: true } } };
  assert.equal(resolveResilienceSettings(legacy).antigravityAdaptiveHealth.enabled, true);
  const explicit = {
    resilienceSettings: {
      antigravity: { adaptiveHealthEnabled: true },
      antigravityAdaptiveHealth: { enabled: false },
    },
  };
  assert.equal(resolveResilienceSettings(explicit).antigravityAdaptiveHealth.enabled, false);
});

test("PATCH accepts only a boolean adaptive health switch", () => {
  assert.equal(
    updateResilienceSchema.safeParse({
      antigravityAdaptiveHealth: { enabled: true },
    }).success,
    true
  );
  for (const invalid of [
    { antigravityAdaptiveHealth: { enabled: "true" } },
    { antigravityAdaptiveHealth: { enabled: 1 } },
    { antigravityAdaptiveHealth: { unknown: 3 } },
  ])
    assert.equal(updateResilienceSchema.safeParse(invalid).success, false);
});

test("runtime health eligibility respects hot setting while preserving provider scope", () => {
  assert.equal(isAntigravityAdaptiveHealthEnabled("antigravity", true), true);
  assert.equal(isAntigravityAdaptiveHealthEnabled("agy", true), true);
  assert.equal(isAntigravityAdaptiveHealthEnabled("antigravity", false), false);
  assert.equal(isAntigravityAdaptiveHealthEnabled("openrouter", true), false);
  assert.equal(typeof DEFAULT_RESILIENCE_SETTINGS.antigravityAdaptiveHealth.enabled, "boolean");
});
