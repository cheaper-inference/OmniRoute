import test from "node:test";
import assert from "node:assert/strict";

import {
  parseDetailedRetryFromErrorText,
  parseRetryFromErrorText,
  checkFallbackError,
  retryHintBypassesMaxCooldownMs,
  isAuthoritativeRetryHintSource,
  recordModelLockoutFailure,
  getModelLockoutInfo,
  clearAllModelLockouts,
} from "../../open-sse/services/accountFallback.ts";
import { buildWeeklyQuotaFallback } from "../../open-sse/services/quotaTextCooldowns.ts";

// Regression test for #20281:
// On subscription-quota 429s whose upstream reset time is stated in error body prose
// as an ISO 8601 calendar timestamp (e.g. Z.ai: "Usage limit reached for 5 hour. Your limit will reset at ..."),
// model lockout must NOT be clamped to maxCooldownMs (e.g. 1800s / 30m), preventing 30-min relock loops.

const NOW = Date.UTC(2026, 10, 15, 2, 2, 0); // 2026-11-15 02:02:00 UTC
const RESET_5H_UTC = Date.UTC(2026, 10, 15, 7, 2, 0); // 2026-11-15 07:02:00 UTC (5 hours later)
const EXPECTED_WAIT_MS = RESET_5H_UTC - NOW; // 18,000,000 ms (5 hours)

const ZAI_5H_ERROR =
  "Usage limit reached for 5 hour. Your limit will reset at 2026-11-15T07:02:00.000Z";
const RELATIVE_PROSE_ERROR = "Individual quota reached. Resets in 131h.";

test.beforeEach(() => {
  clearAllModelLockouts();
});

test.after(() => {
  clearAllModelLockouts();
});

test("parseDetailedRetryFromErrorText marks ISO-8601 prose reset as body_iso_reset (#20281)", () => {
  const detailed = parseDetailedRetryFromErrorText(ZAI_5H_ERROR, "zai", NOW);
  assert.ok(detailed, "expected a parsed detailed retry hint");
  assert.equal(detailed.retryAfterMs, EXPECTED_WAIT_MS);
  assert.equal(detailed.provenance, "body_iso_reset");

  // Backwards compatibility with parseRetryFromErrorText
  const numeric = parseRetryFromErrorText(ZAI_5H_ERROR, "zai", NOW);
  assert.equal(numeric, EXPECTED_WAIT_MS);
});

test("relative countdown prose preserves provenance 'body' (#20281)", () => {
  const detailed = parseDetailedRetryFromErrorText(RELATIVE_PROSE_ERROR, "antigravity", NOW);
  assert.ok(detailed, "expected a parsed detailed retry hint");
  assert.equal(detailed.provenance, "body");
});

test("retryHintBypassesMaxCooldownMs and isAuthoritativeRetryHintSource include body_iso_reset (#20281)", () => {
  assert.equal(retryHintBypassesMaxCooldownMs("body_iso_reset"), true);
  assert.equal(retryHintBypassesMaxCooldownMs("body"), false);
  assert.equal(retryHintBypassesMaxCooldownMs("body_structured"), false);
  assert.equal(retryHintBypassesMaxCooldownMs("header"), true);
  assert.equal(retryHintBypassesMaxCooldownMs("google_rpc_retry_info"), true);

  assert.equal(isAuthoritativeRetryHintSource("body_iso_reset"), true);
  assert.equal(isAuthoritativeRetryHintSource("body"), false);
});

test("checkFallbackError sets retryHintSource to body_iso_reset for subscription ISO reset (#20281)", () => {
  const realNow = Date.now;
  Date.now = () => NOW;
  try {
    const fallback = checkFallbackError(429, ZAI_5H_ERROR, 0, "glm-5.3", "zai", null, {
      baseCooldownMs: 5 * 60_000,
      maxCooldownMs: 1800_000,
      maxBackoffSteps: 3,
      useExponentialBackoff: true,
      useUpstreamRetryHints: true,
    });

    assert.equal(fallback.shouldFallback, true);
    assert.equal(fallback.retryHintSource, "body_iso_reset");
    assert.equal(fallback.cooldownMs, EXPECTED_WAIT_MS);
    assert.equal(fallback.quotaResetHintMs, EXPECTED_WAIT_MS);
  } finally {
    Date.now = realNow;
  }
});

test("recordModelLockoutFailure with fallback result does not clamp ISO prose reset to maxCooldownMs (#20281)", () => {
  const realNow = Date.now;
  Date.now = () => NOW;
  try {
    const maxCooldownMs = 1800_000; // 30 min ceiling
    const fallback = checkFallbackError(429, ZAI_5H_ERROR, 0, "glm-5.3", "zai", null, {
      baseCooldownMs: 5 * 60_000,
      maxCooldownMs,
      maxBackoffSteps: 3,
      useExponentialBackoff: true,
      useUpstreamRetryHints: true,
    });

    const lockout = recordModelLockoutFailure(
      "zai",
      "conn-zai-1",
      "glm-5.3",
      "quota_exhausted",
      429,
      5 * 60_000,
      null,
      {
        exactCooldownMs:
          fallback.usedUpstreamRetryHint === true
            ? fallback.cooldownMs
            : (fallback.quotaResetHintMs ?? null),
        maxCooldownMs,
        scope: "exact",
        exactCooldownIsUpstreamReset: retryHintBypassesMaxCooldownMs(fallback.retryHintSource),
      }
    );

    // Cooldown must be full 5h window (~18,000,000 ms), NOT clamped to 30 min (1,800,000 ms)
    assert.equal(lockout.cooldownMs, EXPECTED_WAIT_MS);

    const info = getModelLockoutInfo("zai", "conn-zai-1", "glm-5.3");
    assert.ok(info, "expected active model lockout");
    assert.ok(
      info.remainingMs > 4 * 3600 * 1000,
      `expected lockout ~5h (>4h), got ${Math.round(info.remainingMs / 3600_000)}h`
    );
  } finally {
    Date.now = realNow;
  }
});

test("recordModelLockoutFailure clamps relative prose countdown to maxCooldownMs (#20281)", () => {
  const realNow = Date.now;
  Date.now = () => NOW;
  try {
    const maxCooldownMs = 1800_000; // 30 min ceiling
    const fallback = checkFallbackError(
      429,
      RELATIVE_PROSE_ERROR,
      0,
      "claude-sonnet-4-6",
      "antigravity",
      null,
      {
        baseCooldownMs: 5 * 60_000,
        maxCooldownMs,
        maxBackoffSteps: 3,
        useExponentialBackoff: true,
        useUpstreamRetryHints: true,
      }
    );

    assert.equal(fallback.retryHintSource, "body");
    assert.equal(retryHintBypassesMaxCooldownMs(fallback.retryHintSource), false);

    const lockout = recordModelLockoutFailure(
      "antigravity",
      "conn-ag-1",
      "claude-sonnet-4-6",
      "quota_exhausted",
      429,
      5 * 60_000,
      null,
      {
        exactCooldownMs:
          fallback.usedUpstreamRetryHint === true
            ? fallback.cooldownMs
            : (fallback.quotaResetHintMs ?? null),
        maxCooldownMs,
        scope: "exact",
        exactCooldownIsUpstreamReset: retryHintBypassesMaxCooldownMs(fallback.retryHintSource),
      }
    );

    // Relative prose MUST remain clamped to maxCooldownMs (1,800,000 ms)
    assert.equal(lockout.cooldownMs, maxCooldownMs);
  } finally {
    Date.now = realNow;
  }
});

test("an impossible calendar date in ISO reset prose is rejected, not exempted (#20281)", () => {
  // Date.parse rolls 2026-11-31 over to 2026-12-01: honoring it would exempt a
  // ~16-day lock from the operator's maxCooldownMs cap.
  const invalidDate =
    "Usage limit reached for 5 hour. Your limit will reset at 2026-11-31T07:02:00.000Z";
  const detailed = parseDetailedRetryFromErrorText(invalidDate, "zai", NOW);
  assert.notEqual(detailed?.provenance, "body_iso_reset");
  assert.equal(parseRetryFromErrorText(invalidDate, "zai", NOW), null);
});

test("weekly fallback keeps capped provenance when a relative day countdown is selected (#20281)", () => {
  // parseDayGranularityResetMs prefers the "resets in N days" countdown; the ISO
  // instant elsewhere in the text must not relabel that relative duration.
  const mixed =
    "Weekly quota exhausted. Resets in 7 days. Your limit will reset at 2026-11-15T07:02:00.000Z";
  const fallback = buildWeeklyQuotaFallback(mixed, NOW, "zai");
  assert.ok(fallback, "expected a weekly quota fallback");
  assert.equal(fallback.quotaResetHintMs, 7 * 24 * 3600 * 1000);
  assert.equal(fallback.retryHintSource, "body");
  assert.equal(retryHintBypassesMaxCooldownMs(fallback.retryHintSource), false);
});

test("weekly fallback marks a selected ISO reset as body_iso_reset (#20281)", () => {
  const isoOnly = "Weekly quota exhausted. Your limit will reset at 2026-11-15T07:02:00.000Z";
  const fallback = buildWeeklyQuotaFallback(isoOnly, NOW, "zai");
  assert.ok(fallback, "expected a weekly quota fallback");
  assert.equal(fallback.quotaResetHintMs, EXPECTED_WAIT_MS);
  assert.equal(fallback.retryHintSource, "body_iso_reset");
});
