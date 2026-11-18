/**
 * Relative-prose quota reset ("Resets in 76h25m43s") must not become a 30-minute
 * relock loop nor a 76h permanent lock.
 *
 * Antigravity (HTTP) returns 429 bodies like:
 *   "[429]: Individual quota reached. ... Resets in 76h25m43s."
 *
 * recordCoreOwnedAntigravityQuotaState() feeds this prose into
 * recordModelLockoutFailure() as exactCooldownMs (via quotaResetHintMs). Today
 * the relative countdown carries provenance "body", which does NOT bypass the
 * maxCooldownMs clamp (default 30m), so the account relocks every 30m for the
 * whole 76h window — or, if the operator raises maxCooldownMs to 1h, relocks
 * hourly. Both are wrong: the upstream told us the true reset window.
 *
 * The fix gives relative-prose countdowns a dedicated provenance
 * ("body_relative_countdown") honored as an upstream reset but bounded by a
 * separate operator ceiling (quotaProseMaxCooldownMs, default 6h), so a 76h
 * window locks for 6h (not 30m, not 76h) and a 5h window is honored exactly
 * (under the ceiling), ending the relock loop for subscription windows.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  checkFallbackError,
  parseRetryFromErrorText,
  recordModelLockoutFailure,
  retryHintBypassesMaxCooldownMs,
} from "../../open-sse/services/accountFallback.ts";
import { DEFAULT_MODEL_LOCKOUT_SETTINGS } from "../../src/lib/resilience/modelLockoutSettings.ts";

const QUOTA_RESET_76H =
  "[429]: Individual quota reached. Contact your administrator to enable overages. Resets in 76h25m43s.";
const QUOTA_RESET_5H =
  "[429]: Individual quota reached. Contact your administrator to enable overages. Resets in 5h.";

test("relative prose reset parses to the full window", () => {
  assert.equal(
    parseRetryFromErrorText(QUOTA_RESET_76H),
    76 * 3600 * 1000 + 25 * 60 * 1000 + 43 * 1000
  );
  assert.equal(parseRetryFromErrorText(QUOTA_RESET_5H), 5 * 3600 * 1000);
});

test("relative-prose countdown is not a bare body hint (provenance is distinguishable)", () => {
  // The whole point: callers must be able to tell "Resets in XhYmZs" apart from
  // a generic body retry hint so it can be honored as an upstream reset.
  const { retryHintSource } = checkFallbackError(
    429,
    QUOTA_RESET_5H,
    0,
    "gemini-3.8-flash",
    "antigravity",
    null
  );
  assert.equal(retryHintSource, "body_relative_countdown");
});

test("relative-prose reset bypasses the generic maxCooldownMs clamp", () => {
  assert.equal(retryHintBypassesMaxCooldownMs("body_relative_countdown"), true);
  // Generic body hints stay clamped.
  assert.equal(retryHintBypassesMaxCooldownMs("body"), false);
});

test("a 5h subscription window is honored exactly (under the prose ceiling)", () => {
  const res = checkFallbackError(429, QUOTA_RESET_5H, 0, "gemini-3.8-flash", "antigravity", null);
  // quotaResetHintMs carries the precise upstream window for the lockout path.
  assert.equal(res.quotaResetHintMs, 5 * 3600 * 1000);
});

test("default prose ceiling is 6h (bounded, not 76h)", () => {
  // Operator ceiling for relative-prose resets — new setting, default 6h.
  const settings = DEFAULT_MODEL_LOCKOUT_SETTINGS;
  assert.equal(
    settings.quotaProseMaxCooldownMs,
    6 * 3600 * 1000,
    "quotaProseMaxCooldownMs must default to 6h so a 76h window cannot lock for days"
  );
  // And it must be strictly above the generic maxCooldownMs (30m), otherwise the
  // dedicated ceiling is meaningless.
  assert.ok(settings.quotaProseMaxCooldownMs > settings.maxCooldownMs);
});

const HOUR = 3600 * 1000;
const MAX_30M = 30 * 60 * 1000;
const PROSE_CEILING_6H = 6 * HOUR;

// Unique connection ids per case: the module-level lockout map is shared across
// tests in this file, so each assertion locks a distinct tuple.
test("a 76h relative-prose reset locks for 6h (prose ceiling), not 30m nor 76h", () => {
  const res = recordModelLockoutFailure(
    "antigravity",
    "conn-76h-prose",
    "gemini-3.8-flash",
    "quota_exhausted",
    429,
    120_000,
    null,
    {
      exactCooldownMs: 76 * HOUR + 25 * 60 * 1000 + 43 * 1000,
      maxCooldownMs: MAX_30M,
      quotaProseMaxCooldownMs: PROSE_CEILING_6H,
      scope: "exact",
      exactCooldownIsUpstreamReset: true, // prose is "verified" via bypass helper
      exactCooldownIsRelativeProseReset: true,
    }
  );
  assert.equal(res.cooldownMs, PROSE_CEILING_6H);
});

test("a 5h relative-prose reset is honored exactly (under the 6h prose ceiling)", () => {
  const res = recordModelLockoutFailure(
    "antigravity",
    "conn-5h-prose",
    "gemini-3.8-flash",
    "quota_exhausted",
    429,
    120_000,
    null,
    {
      exactCooldownMs: 5 * HOUR,
      maxCooldownMs: MAX_30M,
      quotaProseMaxCooldownMs: PROSE_CEILING_6H,
      scope: "exact",
      exactCooldownIsUpstreamReset: true,
      exactCooldownIsRelativeProseReset: true,
    }
  );
  assert.equal(res.cooldownMs, 5 * HOUR);
});

test("a 92h Retry-After header stays honored exactly (no #6863 regression)", () => {
  // Header hints bypass maxCooldownMs but are NOT relative prose — the prose
  // ceiling must not silently cap a transport-level authoritative reset.
  const res = recordModelLockoutFailure(
    "antigravity",
    "conn-92h-header",
    "gemini-3.8-flash",
    "quota_exhausted",
    429,
    120_000,
    null,
    {
      exactCooldownMs: 92 * HOUR,
      maxCooldownMs: MAX_30M,
      quotaProseMaxCooldownMs: PROSE_CEILING_6H,
      scope: "exact",
      exactCooldownIsUpstreamReset: true,
      exactCooldownIsRelativeProseReset: false,
    }
  );
  assert.equal(res.cooldownMs, 92 * HOUR);
});

test("a generic body hint stays clamped to maxCooldownMs (30m relock loop preserved)", () => {
  const res = recordModelLockoutFailure(
    "antigravity",
    "conn-body-30m",
    "gemini-3.8-flash",
    "quota_exhausted",
    429,
    120_000,
    null,
    {
      exactCooldownMs: 131 * HOUR,
      maxCooldownMs: MAX_30M,
      quotaProseMaxCooldownMs: PROSE_CEILING_6H,
      scope: "exact",
      exactCooldownIsUpstreamReset: false,
      exactCooldownIsRelativeProseReset: false,
    }
  );
  assert.equal(res.cooldownMs, MAX_30M);
});
