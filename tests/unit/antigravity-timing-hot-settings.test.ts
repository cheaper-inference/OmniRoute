import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  pruneResilienceSettingsToProvided,
  resolveResilienceSettings,
} from "../../src/lib/resilience/settings.ts";
import { updateResilienceSchema } from "../../src/shared/validation/schemas/settings.ts";
import { resolveAntigravityTimingTelemetryEnabled } from "../../open-sse/services/antigravityTimingConfig.ts";

test("timing telemetry persisted override applies to new physical sends", () => {
  const defaults = resolveResilienceSettings(null);
  const overridden = mergeResilienceSettings(defaults, {
    antigravityTimingTelemetry: { enabled: !defaults.antigravityTimingTelemetry.enabled },
  });
  assert.equal(overridden.antigravityTimingTelemetry.enabled,
    !defaults.antigravityTimingTelemetry.enabled);
  assert.deepEqual(overridden.requestQueue, defaults.requestQueue);
  const sparse = pruneResilienceSettingsToProvided(overridden, defaults);
  assert.equal(resolveResilienceSettings({ resilienceSettings: sparse })
    .antigravityTimingTelemetry.enabled, !defaults.antigravityTimingTelemetry.enabled);
});

test("legacy fork Antigravity setting is honored until an explicit new override", () => {
  const legacy = { resilienceSettings: { antigravity: { timingTelemetryEnabled: true } } };
  assert.equal(resolveResilienceSettings(legacy).antigravityTimingTelemetry.enabled, true);
  const explicit = { resilienceSettings: {
    antigravity: { timingTelemetryEnabled: true },
    antigravityTimingTelemetry: { enabled: false },
  } };
  assert.equal(resolveResilienceSettings(explicit).antigravityTimingTelemetry.enabled, false);
});

test("strict PATCH accepts boolean timing toggle, not strings or arbitrary keys", () => {
  assert.equal(updateResilienceSchema.safeParse({
    antigravityTimingTelemetry: { enabled: true },
  }).success, true);
  for (const invalid of [
    { antigravityTimingTelemetry: { enabled: "true" } },
    { antigravityTimingTelemetry: { enabled: 1 } },
    { antigravityTimingTelemetry: { diagnosticKey: "raw" } },
  ]) {
    assert.equal(updateResilienceSchema.safeParse(invalid).success, false);
  }
});

test("timing feature default remains an opt-in boolean", () => {
  assert.equal(typeof DEFAULT_RESILIENCE_SETTINGS.antigravityTimingTelemetry.enabled, "boolean");
});


test("physical-send flag resolver respects runtime toggle, legacy fork and env fallback", () => {
  assert.equal(resolveAntigravityTimingTelemetryEnabled({}, true), true);
  assert.equal(resolveAntigravityTimingTelemetryEnabled({}, false), false);
  const old = { resilienceSettings: { antigravity: { timingTelemetryEnabled: true } } };
  assert.equal(resolveAntigravityTimingTelemetryEnabled(old, false), true);
  const explicit = { resilienceSettings: {
    antigravity: { timingTelemetryEnabled: true },
    antigravityTimingTelemetry: { enabled: false },
  } };
  assert.equal(resolveAntigravityTimingTelemetryEnabled(explicit, true), false);
  assert.equal(resolveAntigravityTimingTelemetryEnabled({
    resilienceSettings: { antigravityTimingTelemetry: { enabled: true } },
  }, false), true);
});
