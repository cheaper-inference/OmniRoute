import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_RESILIENCE_SETTINGS,
  mergeResilienceSettings,
  pruneResilienceSettingsToProvided,
  resolveResilienceSettings,
} from "../../src/lib/resilience/settings.ts";
import { updateResilienceSchema } from "../../src/shared/validation/schemas/settings.ts";

test("preferred account failover supports hot, all-provider settings overrides", () => {
  const settings = {
    resilienceSettings: {
      preferredAccountFailover: {
        enabled: true,
        defaultTimeoutMs: 25000,
        providerTimeoutsMs: { codex: 40000 },
        modelTimeoutsMs: { "anthropic/claude-opus-*": 60000 },
      },
    },
  };
  const actual = resolveResilienceSettings(settings).preferredAccountFailover;
  assert.deepEqual(actual, {
    enabled: true,
    defaultTimeoutMs: 25000,
    providerTimeoutsMs: { codex: 40000 },
    modelTimeoutsMs: { "anthropic/claude-opus-*": 60000 },
  });
  assert.equal(resolveResilienceSettings(settings).preferredAccountFailover, actual);
});

test("partial settings updates leave existing overrides and switch intact", () => {
  const original = resolveResilienceSettings({
    resilienceSettings: {
      preferredAccountFailover: {
        enabled: true,
        defaultTimeoutMs: 20000,
        providerTimeoutsMs: { codex: 35000 },
        modelTimeoutsMs: { "anthropic/claude-opus-*": 40000 },
      },
    },
  });
  const updated = mergeResilienceSettings(original, {
    preferredAccountFailover: { defaultTimeoutMs: 24000 },
  });
  assert.deepEqual(updated.preferredAccountFailover, {
    enabled: true,
    defaultTimeoutMs: 24000,
    providerTimeoutsMs: { codex: 35000 },
    modelTimeoutsMs: { "anthropic/claude-opus-*": 40000 },
  });
  const sparse = pruneResilienceSettingsToProvided(updated, resolveResilienceSettings(null));
  assert.equal(sparse.preferredAccountFailover?.defaultTimeoutMs, 24000);
  assert.equal(sparse.preferredAccountFailover?.providerTimeoutsMs?.codex, 35000);
});

test("removing a provider override clears the old stored value", () => {
  const original = resolveResilienceSettings({
    resilienceSettings: {
      preferredAccountFailover: {
        enabled: true,
        providerTimeoutsMs: { codex: 35000 },
      },
    },
  });
  const updated = mergeResilienceSettings(original, {
    preferredAccountFailover: { providerTimeoutsMs: {} },
  });
  const sparse = pruneResilienceSettingsToProvided(updated, resolveResilienceSettings(null));
  const reloaded = resolveResilienceSettings({ resilienceSettings: sparse });
  assert.deepEqual(reloaded.preferredAccountFailover.providerTimeoutsMs, {});
});

test("PATCH accepts safe per-provider/per-model keys and zero disables", () => {
  assert.equal(
    updateResilienceSchema.safeParse({
      preferredAccountFailover: {
        enabled: true,
        defaultTimeoutMs: 20000,
        providerTimeoutsMs: { codex: 0, openai: 35000 },
        modelTimeoutsMs: { "anthropic/claude-opus-*": 45000 },
      },
    }).success,
    true
  );

  for (const payload of [
    { preferredAccountFailover: { defaultTimeoutMs: 499 } },
    { preferredAccountFailover: { defaultTimeoutMs: 120001 } },
    { preferredAccountFailover: { enabled: "true" } },
    { preferredAccountFailover: { providerTimeoutsMs: { codex: 100 } } },
    { preferredAccountFailover: { modelTimeoutsMs: { "anthropic/no*pattern": 35000 } } },
    { preferredAccountFailover: { modelTimeoutsMs: { "anthropic/opus": -1 } } },
    { preferredAccountFailover: { unknownField: true } },
  ]) {
    assert.equal(updateResilienceSchema.safeParse(payload).success, false, JSON.stringify(payload));
  }
});

test("global default is 20s; feature remains opt-in", () => {
  const d = DEFAULT_RESILIENCE_SETTINGS.preferredAccountFailover;
  assert.equal(d.defaultTimeoutMs, 20_000);
  assert.deepEqual(d.providerTimeoutsMs, {});
  assert.deepEqual(d.modelTimeoutsMs, {});
});
