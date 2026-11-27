/**
 * Regression tests for #21250:
 *   1. Anthropic 400 credit balance exhaustion (bare, `[400]: `-prefixed, or JSON envelope)
 *      reaches the terminal quota/credit exhaustion path.
 *   2. HTTP 403 free-quota exhaustion ("The free quota has been exhausted...") classifies
 *      as QUOTA_EXHAUSTED with fallback cooldown instead of falling through generic 403.
 *   3. HTTP 400 API usage limit exhaustion ("You have reached your specified API usage
 *      limits. You will regain access on YYYY-MM-DD at HH:MM UTC.") reaches the quota
 *      exhaustion path and retains the provider-supplied UTC reset timestamp.
 *   4. Unrelated 400/403 validation, permission, or caller-echoed 400 errors stay unaffected.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-21250-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "21250-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { checkFallbackError, parseDetailedRetryFromErrorText } =
  await import("../../open-sse/services/accountFallback.ts");
const { isCreditsExhaustedForStatus } =
  await import("../../open-sse/services/accountFallback/creditsExhaustedForStatus.ts");
const { parseIsoDateTimeResetMs } = await import("../../open-sse/services/quotaResetParsing.ts");
const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { resolveTerminalConnectionStatus } =
  await import("../../src/sse/services/authTerminalStatus.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");

const ANTHROPIC_CREDIT_400_PREFIXED =
  "[400]: Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits.";

const FREE_QUOTA_403_PREFIXED =
  '[403]: The free quota has been exhausted. To continue accessing the model on a paid basis, please complete your payment information （or disable the "use free tier only" mode in the management console if already completed）.';

function buildFutureUsageLimit400(daysAhead = 3) {
  const target = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000);
  target.setUTCSeconds(0, 0);
  const yyyy = target.getUTCFullYear();
  const mm = String(target.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(target.getUTCDate()).padStart(2, "0");
  const hh = String(target.getUTCHours()).padStart(2, "0");
  const mi = String(target.getUTCMinutes()).padStart(2, "0");
  const message = `You have reached your specified API usage limits. You will regain access on ${yyyy}-${mm}-${dd} at ${hh}:${mi} UTC.`;
  return {
    targetMs: target.getTime(),
    prefixed: `[400]: ${message}`,
    envelope: JSON.stringify({
      type: "error",
      error: {
        type: "invalid_request_error",
        message,
      },
    }),
  };
}

test.after(() => {
  core.resetDbInstance?.();
});

test("#21250 Anthropic [400]: prefixed credit balance message reaches terminal credit exhaustion", () => {
  for (const provider of ["anthropic", "anthropic-compatible-node1", "claude"]) {
    assert.equal(
      isCreditsExhaustedForStatus(400, provider, ANTHROPIC_CREDIT_400_PREFIXED),
      true,
      provider
    );
    assert.equal(
      classifyProviderError(400, ANTHROPIC_CREDIT_400_PREFIXED, provider),
      PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED,
      provider
    );
    const fb = checkFallbackError(
      400,
      ANTHROPIC_CREDIT_400_PREFIXED,
      0,
      "claude-sonnet-4-5",
      provider
    );
    assert.equal(fb.shouldFallback, true, provider);
    assert.equal(fb.reason, RateLimitReason.QUOTA_EXHAUSTED, provider);
    assert.equal(fb.creditsExhausted, true, provider);
    assert.equal(
      resolveTerminalConnectionStatus(
        400,
        fb,
        PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED,
        provider,
        false,
        ANTHROPIC_CREDIT_400_PREFIXED
      ),
      "credits_exhausted",
      provider
    );
  }
});

test("#21250 403 free quota exhaustion classifies as QUOTA_EXHAUSTED and triggers fallback cooldown", () => {
  for (const provider of ["alibaba", "qwen", "openai-compatible-free"]) {
    assert.equal(
      isCreditsExhaustedForStatus(403, provider, FREE_QUOTA_403_PREFIXED),
      true,
      provider
    );
    assert.equal(
      classifyProviderError(403, FREE_QUOTA_403_PREFIXED, provider),
      PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED,
      provider
    );
    const fb = checkFallbackError(403, FREE_QUOTA_403_PREFIXED, 0, "qwen-max", provider);
    assert.equal(fb.shouldFallback, true, provider);
    assert.equal(fb.reason, RateLimitReason.QUOTA_EXHAUSTED, provider);
    assert.ok(
      fb.cooldownMs >= 60 * 1000,
      `expected cooldown >= 1m for ${provider}, got ${fb.cooldownMs}`
    );
  }
});

test("#21250 parseIsoDateTimeResetMs parses 'regain access on YYYY-MM-DD at HH:MM UTC'", () => {
  const nowMs = Date.UTC(2026, 10, 28, 0, 0, 0);
  const text =
    "[400]: You have reached your specified API usage limits. You will regain access on 2026-12-01 at 00:00 UTC.";
  const expectedMs = Date.UTC(2026, 11, 1, 0, 0, 0) - nowMs;

  assert.equal(parseIsoDateTimeResetMs(text, 30 * 24 * 3600 * 1000, nowMs), expectedMs);
  const detailed = parseDetailedRetryFromErrorText(text, "anthropic", nowMs);
  assert.deepEqual(detailed, {
    retryAfterMs: expectedMs,
    provenance: "body_iso_reset",
  });
});

test("#21250 Anthropic 400 specified API usage limits pauses connection and retains reset timestamp", () => {
  const { targetMs, prefixed, envelope } = buildFutureUsageLimit400(3);
  const expectedWaitMs = targetMs - Date.now();

  for (const body of [prefixed, envelope]) {
    for (const provider of ["anthropic", "anthropic-compatible-team", "claude"]) {
      assert.equal(isCreditsExhaustedForStatus(400, provider, body), true, `${provider}: ${body}`);
      assert.equal(
        classifyProviderError(400, body, provider),
        PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED,
        provider
      );
      const fb = checkFallbackError(400, body, 0, "claude-opus-4-6", provider);
      assert.equal(fb.shouldFallback, true, provider);
      assert.equal(fb.reason, RateLimitReason.QUOTA_EXHAUSTED, provider);
      assert.equal(fb.creditsExhausted, true, provider);
      assert.equal(fb.retryHintSource, "body_iso_reset", provider);
      assert.ok(
        typeof fb.quotaResetHintMs === "number" &&
          Math.abs(fb.quotaResetHintMs - expectedWaitMs) < 5_000,
        `expected quotaResetHintMs ~${expectedWaitMs}ms, got ${fb.quotaResetHintMs}`
      );
      assert.equal(fb.cooldownMs, fb.quotaResetHintMs, "cooldownMs must honor parsed reset date");
    }
  }
});

test("#21250 unrelated 400 validation, 403 permission, and caller-echoed 400 errors are not classified as quota exhaustion", () => {
  const unrelated400 = JSON.stringify({
    type: "error",
    error: {
      type: "invalid_request_error",
      message: "messages.0.content: Field required",
    },
  });
  const echoedUsageLimit400 = JSON.stringify({
    type: "error",
    error: {
      type: "invalid_request_error",
      message: "Unknown parameter: 'you have reached your specified api usage limits'",
    },
  });
  const unrelated403 = JSON.stringify({
    error: {
      type: "permission_error",
      message: "Your API key does not have permission to access this resource.",
    },
  });

  assert.equal(isCreditsExhaustedForStatus(400, "anthropic", unrelated400), false);
  assert.notEqual(
    classifyProviderError(400, unrelated400, "anthropic"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );

  assert.equal(isCreditsExhaustedForStatus(400, "anthropic", echoedUsageLimit400), false);
  assert.notEqual(
    classifyProviderError(400, echoedUsageLimit400, "anthropic"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );

  assert.equal(isCreditsExhaustedForStatus(403, "openai", unrelated403), false);
  assert.notEqual(
    classifyProviderError(403, unrelated403, "openai"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
});
