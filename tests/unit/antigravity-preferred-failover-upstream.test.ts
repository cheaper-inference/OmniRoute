import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_PREFERRED_FAILOVER_SETTINGS,
  normalizePreferredFailoverSettings,
  resolvePreferredConnectionUpstreamStartTimeoutMs,
} from "../../src/sse/services/preferredConnectionFailover.ts";

const preferred = { selectedByApiKeyPreference: true, preferredFallbackAvailable: true };
const on = { ...DEFAULT_PREFERRED_FAILOVER_SETTINGS, enabled: true };

test("defaults are opt-in; no public or non-preferred request changes", () => {
  assert.equal(DEFAULT_PREFERRED_FAILOVER_SETTINGS.enabled, false);
  assert.deepEqual(
    resolvePreferredConnectionUpstreamStartTimeoutMs("antigravity", preferred, 4000,
      "gemini-3.8-flash-high", DEFAULT_PREFERRED_FAILOVER_SETTINGS),
    { timeoutMs: 4000, mayRotateOnRequestTimeout: false }
  );
  assert.deepEqual(
    resolvePreferredConnectionUpstreamStartTimeoutMs("codex", preferred, undefined,
      "gemini-3.8-flash-high", on),
    { timeoutMs: undefined, mayRotateOnRequestTimeout: false }
  );
});

test("eligible preferred Antigravity accounts use 5s or Gemini 3.8 12s", () => {
  for (const provider of ["antigravity", "agy"]) {
    assert.deepEqual(
      resolvePreferredConnectionUpstreamStartTimeoutMs(provider, preferred, undefined,
        "gemini-3.7-flash-low", on),
      { timeoutMs: 5000, mayRotateOnRequestTimeout: true }
    );
    for (const model of ["gemini-3.8-flash-low", "agy/gemini-3.8-flash-tiered"]) {
      assert.deepEqual(
        resolvePreferredConnectionUpstreamStartTimeoutMs(provider, preferred, undefined, model, on),
        { timeoutMs: 12000, mayRotateOnRequestTimeout: true }
      );
    }
  }
});

test("trusted request hints win and never accidentally rotate a shared account", () => {
  for (const hint of [3000, 12000]) {
    assert.deepEqual(
      resolvePreferredConnectionUpstreamStartTimeoutMs("agy", preferred, hint,
        "gemini-3.8-flash-tiered", on),
      { timeoutMs: hint, mayRotateOnRequestTimeout: false }
    );
  }
  assert.deepEqual(
    resolvePreferredConnectionUpstreamStartTimeoutMs("agy", preferred, 15000,
      "gemini-3.8-flash-high", on),
    { timeoutMs: 12000, mayRotateOnRequestTimeout: true }
  );
});

test("a forced/only/suppressed preference never shortens a deadline", () => {
  for (const cred of [
    { selectedByApiKeyPreference: true, preferredFallbackAvailable: false },
    { selectedByApiKeyPreference: false, preferredFallbackAvailable: true },
    null,
  ]) {
    assert.deepEqual(
      resolvePreferredConnectionUpstreamStartTimeoutMs("antigravity", cred, 16000,
        "gemini-3.8-flash-high", on),
      { timeoutMs: 16000, mayRotateOnRequestTimeout: false }
    );
  }
});

test("invalid runtime values fall back to bounded defaults", () => {
  assert.deepEqual(
    normalizePreferredFailoverSettings({
      enabled: true, preferredTimeoutMs: -1, gemini38PreferredTimeoutMs: 130_000,
    }),
    on
  );
});
