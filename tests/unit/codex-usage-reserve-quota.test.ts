/**
 * Codex "Luna Reserve" quota rows.
 *
 * ChatGPT's /backend-api/wham/usage can report a reserve bucket
 * (`limit_name: "gpt-reserve"`, `normal_model_slug: "gpt-5.6-luna"`) that keeps
 * serving requests after the primary weekly limit runs out. It arrives either
 * inside `additional_rate_limits` or under `rate_limits_by_limit_id`. The usage
 * payload must surface it as its own display rows (labeled by the real window
 * duration), without the spark matcher claiming it and without letting it leak
 * into the routing quota cache — account selection must stay exactly as before.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-codex-reserve-quota-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { buildCodexUsageQuotas } = await import("../../open-sse/services/codexUsageQuotas.ts");
const {
  CODEX_RESERVE_DISPLAY_NAME,
  CODEX_RESERVE_QUOTA_SESSION,
  CODEX_RESERVE_QUOTA_WEEKLY,
  CODEX_SPARK_QUOTA_SESSION,
  isCodexReserveQuotaKey,
  isCodexSparkQuotaKey,
} = await import("../../open-sse/config/codexQuotaScopes.ts");
const coreDb = await import("../../src/lib/db/core.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

test.after(() => {
  quotaCache.__clearForTests();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const WEEK = 604800;

function reserveRateLimit(usedPercent: number, resetAfterSeconds = 1000) {
  return {
    primary_window: {
      used_percent: usedPercent,
      limit_window_seconds: WEEK,
      reset_after_seconds: resetAfterSeconds,
    },
    secondary_window: null,
  };
}

test("additional_rate_limits gpt-reserve entry becomes a Weekly reserve row", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 100, limit_window_seconds: 18000, reset_after_seconds: 60 },
    },
    additional_rate_limits: [
      {
        limit_name: "gpt-reserve",
        normal_model_slug: "gpt-5.6-luna",
        rate_limit: reserveRateLimit(40),
      },
    ],
  });

  const reserve = quotas[CODEX_RESERVE_QUOTA_SESSION];
  assert.ok(reserve, "expected a reserve row for the primary reserve window");
  assert.equal(reserve.used, 40);
  assert.equal(reserve.remaining, 60);
  assert.equal(reserve.total, 100);
  assert.equal(reserve.windowSeconds, WEEK);
  assert.equal(reserve.displayName, "GPT-5.6 Luna Reserve Weekly");
  assert.equal(quotas.session.used, 100, "the main session window is unchanged");
});

test("rate_limits_by_limit_id['gpt-reserve'] variant yields the same reserve row", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 5, limit_window_seconds: 18000, reset_after_seconds: 60 },
    },
    rate_limits_by_limit_id: {
      "gpt-reserve": {
        limit_name: "gpt-reserve",
        normal_model_slug: "gpt-5.6-luna",
        rate_limit: reserveRateLimit(40),
      },
    },
  });

  const reserve = quotas[CODEX_RESERVE_QUOTA_SESSION];
  assert.ok(reserve, "expected a reserve row from rate_limits_by_limit_id");
  assert.equal(reserve.remaining, 60);
  assert.equal(reserve.displayName, "GPT-5.6 Luna Reserve Weekly");
});

test("by-limit-id value may be the bare rate limit; display name falls back to the constant", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limits_by_limit_id: {
      gpt_reserve: {
        ...reserveRateLimit(10),
        secondary_window: { used_percent: 20, limit_window_seconds: 30 * 86400 },
      },
    },
  });

  assert.equal(quotas[CODEX_RESERVE_QUOTA_SESSION]?.remaining, 90);
  assert.equal(
    quotas[CODEX_RESERVE_QUOTA_SESSION]?.displayName,
    `${CODEX_RESERVE_DISPLAY_NAME} Weekly`
  );
  assert.equal(quotas[CODEX_RESERVE_QUOTA_WEEKLY]?.remaining, 80);
  assert.equal(
    quotas[CODEX_RESERVE_QUOTA_WEEKLY]?.displayName,
    `${CODEX_RESERVE_DISPLAY_NAME} Monthly`
  );
});

test("a latent reserve window (0% used, reset == full window) produces no row", () => {
  const { quotas } = buildCodexUsageQuotas({
    additional_rate_limits: [
      {
        limit_name: "gpt-reserve",
        normal_model_slug: "gpt-5.6-luna",
        rate_limit: reserveRateLimit(0, WEEK),
      },
    ],
  });

  assert.equal(quotas[CODEX_RESERVE_QUOTA_SESSION], undefined);
  assert.equal(quotas[CODEX_RESERVE_QUOTA_WEEKLY], undefined);
});

test("spark and reserve buckets are matched independently when both are present", () => {
  const { quotas } = buildCodexUsageQuotas({
    additional_rate_limits: [
      {
        limit_name: "gpt-reserve",
        normal_model_slug: "gpt-5.6-luna",
        rate_limit: reserveRateLimit(40),
      },
      {
        limit_name: "GPT-5.3-Codex-Spark",
        metered_feature: "codex_bengalfox",
        rate_limit: {
          primary_window: { used_percent: 25, limit_window_seconds: 18000, reset_after_seconds: 9 },
        },
      },
    ],
  });

  assert.equal(quotas[CODEX_SPARK_QUOTA_SESSION]?.used, 25, "spark row reads the spark bucket");
  assert.equal(quotas[CODEX_SPARK_QUOTA_SESSION]?.displayName, "GPT-5.3-Codex-Spark");
  assert.equal(quotas[CODEX_RESERVE_QUOTA_SESSION]?.used, 40, "reserve row reads the reserve");
});

test("payloads without a reserve bucket produce no reserve rows", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 5, limit_window_seconds: 18000, reset_after_seconds: 60 },
    },
    additional_rate_limits: [{ limit_name: "code_review", rate_limit: reserveRateLimit(3) }],
  });

  assert.equal(quotas[CODEX_RESERVE_QUOTA_SESSION], undefined);
  assert.equal(quotas[CODEX_RESERVE_QUOTA_WEEKLY], undefined);
});

test("reserve keys are recognized as reserve and never as spark", () => {
  assert.equal(isCodexReserveQuotaKey(CODEX_RESERVE_QUOTA_SESSION), true);
  assert.equal(isCodexReserveQuotaKey(CODEX_RESERVE_QUOTA_WEEKLY), true);
  assert.equal(isCodexReserveQuotaKey("session"), false);
  assert.equal(isCodexReserveQuotaKey(CODEX_SPARK_QUOTA_SESSION), false);
  assert.equal(isCodexSparkQuotaKey(CODEX_RESERVE_QUOTA_SESSION), false);
});

test("reserve rows are display-only: they never reach the routing quota cache", () => {
  const connectionId = "conn-codex-reserve-display-only";
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 100, limit_window_seconds: 18000, reset_after_seconds: 60 },
      secondary_window: { used_percent: 100, limit_window_seconds: WEEK, reset_after_seconds: 60 },
    },
    additional_rate_limits: [
      {
        limit_name: "gpt-reserve",
        normal_model_slug: "gpt-5.6-luna",
        rate_limit: reserveRateLimit(10),
      },
    ],
  });
  assert.ok(quotas[CODEX_RESERVE_QUOTA_SESSION], "the usage payload still carries the row");

  quotaCache.setQuotaCache(connectionId, "codex", quotas);
  const entry = quotaCache.getQuotaCache(connectionId);

  assert.ok(entry, "expected a cache entry");
  assert.equal(entry.quotas[CODEX_RESERVE_QUOTA_SESSION], undefined);
  assert.deepEqual(Object.keys(entry.quotas).sort(), ["session", "weekly"]);
  assert.equal(entry.exhausted, true, "exhausted main windows still exhaust the account");
});
