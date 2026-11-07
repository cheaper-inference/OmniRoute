import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  pruneResilienceSettingsToProvided,
  resolveResilienceSettings,
} from "../../src/lib/resilience/settings.ts";
import { updateResilienceSchema } from "../../src/shared/validation/schemas/settings.ts";

test("resilience settings resolve Antigravity preferred failover from a stored hot override", () => {
  const settings = {
    resilienceSettings: {
      antigravityPreferredFailover: {
        enabled: true,
        preferredTimeoutMs: 7500,
        gemini38PreferredTimeoutMs: 14000,
      },
    },
  };
  const actual = resolveResilienceSettings(settings).antigravityPreferredFailover;
  assert.deepEqual(actual, {
    enabled: true, preferredTimeoutMs: 7500, gemini38PreferredTimeoutMs: 14000,
  });
  assert.equal(resolveResilienceSettings(settings).antigravityPreferredFailover, actual);
});

test("operator can update one timeout without losing the other or the enabled flag", () => {
  const original = resolveResilienceSettings({
    resilienceSettings: {
      antigravityPreferredFailover: {
        enabled: true, preferredTimeoutMs: 6500, gemini38PreferredTimeoutMs: 13500,
      },
    },
  });
  const updated = mergeResilienceSettings(original, {
    antigravityPreferredFailover: { preferredTimeoutMs: 8500 },
  });
  assert.deepEqual(updated.antigravityPreferredFailover, {
    enabled: true, preferredTimeoutMs: 8500, gemini38PreferredTimeoutMs: 13500,
  });
  const sparse = pruneResilienceSettingsToProvided(updated, resolveResilienceSettings(null));
  assert.equal(sparse.antigravityPreferredFailover?.preferredTimeoutMs, 8500);
});

test("resilience PATCH validates preferred failover values and rejects unknown fields", () => {
  assert.equal(updateResilienceSchema.safeParse({
    antigravityPreferredFailover: {
      enabled: true,
      preferredTimeoutMs: 500,
      gemini38PreferredTimeoutMs: 120000,
    },
  }).success, true);
  for (const payload of [
    { antigravityPreferredFailover: { preferredTimeoutMs: 499 } },
    { antigravityPreferredFailover: { gemini38PreferredTimeoutMs: 120001 } },
    { antigravityPreferredFailover: { enabled: "true" } },
    { antigravityPreferredFailover: { unknown: 5000 } },
  ]) {
    assert.equal(updateResilienceSchema.safeParse(payload).success, false, JSON.stringify(payload));
  }
});

test("default remains opt-out", () => {
  assert.equal(typeof DEFAULT_RESILIENCE_SETTINGS.antigravityPreferredFailover.enabled, "boolean");
  assert.equal(DEFAULT_RESILIENCE_SETTINGS.antigravityPreferredFailover.preferredTimeoutMs, 5000);
  assert.equal(DEFAULT_RESILIENCE_SETTINGS.antigravityPreferredFailover.gemini38PreferredTimeoutMs, 12000);
});
