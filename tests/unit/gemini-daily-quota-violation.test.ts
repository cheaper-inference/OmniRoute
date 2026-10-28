import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A Gemini free-tier 429 that reports a DAILY quota violation (`quotaId` ...PerDay...)
// still carries a seconds-scale RetryInfo. Honoring only the 26s hint re-burns the
// exhausted key on every rotation until Google's daily reset (midnight Pacific).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gemini-daily-quota-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "gemini-daily-quota-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const { hasGoogleDailyQuotaViolation } = await import("../../open-sse/services/retryAfterJson.ts");
const { appendGoogleDailyQuotaViolation, googleDailyQuotaCooldownMs } =
  await import("../../open-sse/services/googleDailyQuota.ts");

const HOUR_MS = 60 * 60 * 1000;
// 2026-10-15 12:00 PDT (UTC-7) → next midnight Pacific is exactly 12h away.
const NOON_PACIFIC_MS = Date.parse("2026-10-15T19:00:00.000Z");

const PROSE =
  "You exceeded your current quota, please check your plan and billing details.\n" +
  "* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 250, model: gemini-2.5-flash\n" +
  "Please retry in 26.660853464s.";

function geminiBody(quotaId: string) {
  return {
    error: {
      code: 429,
      message: PROSE,
      status: "RESOURCE_EXHAUSTED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.QuotaFailure",
          violations: [
            {
              quotaMetric: "generativelanguage.googleapis.com/generate_content_free_tier_requests",
              quotaId,
              quotaDimensions: { location: "global", model: "gemini-2.5-flash" },
              quotaValue: "250",
            },
          ],
        },
        { "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "26s" },
      ],
    },
  };
}

const DAILY_OBJ = geminiBody("GenerateRequestsPerDayPerProjectPerModel-FreeTier");
const DAILY_BODY = JSON.stringify(DAILY_OBJ);
const MINUTE_BODY = JSON.stringify(
  geminiBody("GenerateRequestsPerMinutePerProjectPerModel-FreeTier")
);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("hasGoogleDailyQuotaViolation detects a PerDay quotaId in a google.rpc.QuotaFailure", () => {
  assert.equal(hasGoogleDailyQuotaViolation(DAILY_BODY), true);
  assert.equal(hasGoogleDailyQuotaViolation(DAILY_OBJ), true, "parsed object form");
  assert.equal(hasGoogleDailyQuotaViolation(MINUTE_BODY), false, "per-minute is not daily");
  assert.equal(hasGoogleDailyQuotaViolation(PROSE), false, "prose alone carries no quotaId");
});

test("hasGoogleDailyQuotaViolation requires the Google QuotaFailure shape", () => {
  const notGoogle = JSON.stringify({
    error: {
      details: [{ "@type": "acme.QuotaInfo", violations: [{ quotaId: "RequestsPerDay" }] }],
    },
  });
  assert.equal(hasGoogleDailyQuotaViolation(notGoogle), false);
  assert.equal(
    hasGoogleDailyQuotaViolation('note: "quotaId": "RequestsPerDay" without the rpc type'),
    false
  );
});

test("hasGoogleDailyQuotaViolation tolerates garbage and stays linear on 1MB input", () => {
  for (const value of [null, undefined, 42, "", "{", "[]", {}, [], { error: { details: "x" } }]) {
    assert.equal(hasGoogleDailyQuotaViolation(value), false);
  }
  const hostile =
    "google.rpc.QuotaFailure " + '"quotaId": "'.repeat(40_000) + "a".repeat(1_000_000);
  const started = performance.now();
  assert.equal(hasGoogleDailyQuotaViolation(hostile), false);
  const elapsedMs = performance.now() - started;
  assert.ok(elapsedMs < 1_000, `regex must stay linear, took ${elapsedMs.toFixed(0)}ms`);
});

test("googleDailyQuotaCooldownMs waits for midnight Pacific unless a node clock is configured", () => {
  assert.equal(googleDailyQuotaCooldownMs({ nowMs: NOON_PACIFIC_MS }), 12 * HOUR_MS);
  assert.equal(
    googleDailyQuotaCooldownMs({ timezone: "UTC", hour: 0, nowMs: NOON_PACIFIC_MS }),
    5 * HOUR_MS,
    "an operator-configured daily reset clock wins over the Pacific default"
  );
  const unconfigured = googleDailyQuotaCooldownMs(null);
  assert.ok(unconfigured > 0 && unconfigured <= 25 * HOUR_MS, `got ${unconfigured}ms`);
});

test("parseRetryFromErrorText returns the daily window for a PerDay violation, not 26s", () => {
  const dailyMs = fallback.parseRetryFromErrorText(DAILY_BODY, "gemini", NOON_PACIFIC_MS);
  assert.equal(dailyMs, 12 * HOUR_MS);
});

test("parseRetryFromErrorText keeps the 26s RetryInfo for a per-minute violation (#7940)", () => {
  const minuteMs = fallback.parseRetryFromErrorText(MINUTE_BODY, "gemini", NOON_PACIFIC_MS);
  assert.notEqual(minuteMs, null);
  assert.ok(minuteMs! >= 25_000 && minuteMs! <= 28_000, `expected ~26000ms, got ${minuteMs}ms`);
});

test("checkFallbackError parks a PerDay violation until the daily reset", () => {
  const result = fallback.checkFallbackError(
    429,
    DAILY_BODY,
    0,
    "gemini-2.5-flash",
    "gemini",
    null,
    null,
    null,
    null,
    { nowMs: NOON_PACIFIC_MS }
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "quota_exhausted");
  assert.equal(result.dailyQuotaExhausted, true);
  assert.equal(result.cooldownMs, 12 * HOUR_MS);
  assert.equal(result.quotaResetHintMs, 12 * HOUR_MS);
  assert.ok(!result.permanent && !result.creditsExhausted, "a daily park is never terminal");
});

test("checkFallbackError keeps a per-minute violation short (#7940 regression guard)", () => {
  const result = fallback.checkFallbackError(
    429,
    MINUTE_BODY,
    0,
    "gemini-2.5-flash",
    "gemini",
    null,
    null,
    null,
    null,
    { nowMs: NOON_PACIFIC_MS }
  );
  assert.equal(result.shouldFallback, true);
  assert.notEqual(result.dailyQuotaExhausted, true);
  assert.ok(result.cooldownMs < HOUR_MS, `expected a short cooldown, got ${result.cooldownMs}ms`);
});

test("appendGoogleDailyQuotaViolation carries the PerDay signal next to the prose message", () => {
  assert.equal(appendGoogleDailyQuotaViolation(PROSE, MINUTE_BODY), PROSE, "no-op without PerDay");
  assert.equal(appendGoogleDailyQuotaViolation(PROSE, null), PROSE);
  const enriched = appendGoogleDailyQuotaViolation(PROSE, DAILY_OBJ);
  assert.ok(enriched.startsWith(PROSE), "the original message is preserved verbatim");
  assert.equal(hasGoogleDailyQuotaViolation(enriched), true);
  assert.equal(appendGoogleDailyQuotaViolation(enriched, DAILY_OBJ), enriched, "idempotent");

  const proseOnly = fallback.checkFallbackError(429, PROSE, 0, "gemini-2.5-flash", "gemini");
  assert.notEqual(proseOnly.dailyQuotaExhausted, true, "prose alone cannot see the quotaId");
  const result = fallback.checkFallbackError(429, enriched, 0, "gemini-2.5-flash", "gemini");
  assert.equal(result.dailyQuotaExhausted, true);
  assert.ok(result.cooldownMs > 0);
});

test("a PerDay violation locks only the model, not the whole Gemini connection", async () => {
  fallback.clearAllModelLockouts();
  const connection = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "gemini-daily-quota",
    apiKey: "gemini-daily-quota-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  assert.equal(fallback.hasPerModelQuota("gemini", "gemini-2.5-flash"), true);

  const enriched = appendGoogleDailyQuotaViolation(PROSE, DAILY_OBJ);
  const result = await auth.markAccountUnavailable(
    connection.id,
    429,
    enriched,
    "gemini",
    "gemini-2.5-flash"
  );
  assert.equal(result.shouldFallback, true);

  const lock = fallback.getModelLockoutInfo("gemini", connection.id, "gemini-2.5-flash");
  assert.ok(lock, "expected a model lockout for the exhausted model");
  assert.equal(lock!.reason, "quota_exhausted");
  // Bounded by the operator's model-lockout cap (default 30 min), but far beyond the 26s throttle.
  assert.ok(lock!.remainingMs > 10 * 60 * 1000, `expected a long lock, got ${lock!.remainingMs}ms`);
  assert.equal(
    fallback.getModelLockoutInfo("gemini", connection.id, "gemini-2.5-pro"),
    null,
    "other models on the same key keep serving"
  );

  const after = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(after?.rateLimitedUntil ?? null, null, "no connection-wide cooldown");
  fallback.clearAllModelLockouts();
});

test("the streaming leg carries the PerDay signal into its classification message", async () => {
  // The streaming leg cannot be driven standalone in a unit test (see
  // upstream-status-restatement.test.ts R10); assert the wiring at the parse site.
  const { readFile } = await import("node:fs/promises");
  const src = await readFile(
    new URL("../../open-sse/handlers/chatCore/streamingResponse.ts", import.meta.url),
    "utf8"
  );
  assert.match(
    src,
    /message = appendGoogleDailyQuotaViolation\(details\.message, details\.responseBody\);/
  );
});
