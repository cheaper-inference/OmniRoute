import test from "node:test";
import assert from "node:assert/strict";

// #CO-402: routerai-style gateways answer 402 with {"error":{"message":"... reset
// after Xm Ys","retry_after":<seconds>,"reset_at":"<ISO>"}}. The structured fields
// must be honored from the JSON body (previously only prose parsing fired), and a
// NEW authoritative hint must SHORTEN an existing longer model lock instead of
// being silently dropped by "preserve the longer cooldown".

const retryAfterJson = await import("../../open-sse/services/retryAfterJson.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { parseDetailedRetryHintFromJsonBody, parseRetryHintFromJsonBody } = retryAfterJson;
const { lockExactModel, isModelLocked, getModelLockoutInfo, evictModelLockoutOverflow } =
  accountFallback;

routerai_body: {
  const body = JSON.stringify({
    error: {
      message: "Token Plan usage limit reached for more usage. (reset after 51m 35s)",
      retry_after: 3095,
      reset_at: new Date(Date.now() + 3_095_000).toISOString(),
    },
  });

  test("parseDetailedRetryHintFromJsonBody reads routerai reset_at (ISO) as a structured body hint", () => {
    const hint = parseDetailedRetryHintFromJsonBody(body, 30 * 24 * 60 * 60 * 1000);
    assert.ok(hint, "expected a structured hint");
    // "body" = structured JSON branch (upstream-mapped to body_structured provenance);
    // prose-only parsing would return the same value but never through this field.
    assert.equal(hint!.provenance, "body");
    assert.ok(
      hint!.retryAfterMs > 3_000_000 && hint!.retryAfterMs <= 3_095_000,
      `expected ~3095s, got ${hint!.retryAfterMs}`
    );
  });

  test("parseRetryHintFromJsonBody reads retry_after whole seconds", () => {
    const ms = parseRetryHintFromJsonBody(JSON.stringify({ retry_after: 3095 }), 3_600_000);
    assert.equal(ms, 3_095_000);
  });

  test("parseRetryHintFromJsonBody prefers earlier reset_at over later prose", () => {
    const ms = parseRetryHintFromJsonBody(body, 30 * 24 * 60 * 60 * 1000);
    assert.ok(ms !== null && ms <= 3_100_000, `expected structured hint, got ${ms}`);
  });
}

test("a new authoritative reset SHORTENS an existing longer exact-model lock", () => {
  evictModelLockoutOverflow();
  const provider = "routerai-shorten";
  const connection = "conn-shorten";
  const model = "test-model";
  const longLockUntil = Date.now() + 24 * 60 * 60 * 1000;

  // First failure: long (guessed) lock, e.g. synthetic until-midnight estimate.
  lockExactModel(provider, connection, model, "credits", longLockUntil - Date.now(), {
    failureCount: 1,
    lastFailureAt: Date.now(),
  });
  const before = getModelLockoutInfo(provider, connection, model);
  assert.ok(before, "expected an active lock");
  assert.ok(before!.remainingMs > 23 * 60 * 60 * 1000, "expected ~24h lock");

  // Provider later reports a much shorter authoritative reset — must win.
  lockExactModel(
    provider,
    connection,
    model,
    "credits",
    5 * 60 * 1000,
    { failureCount: 2, lastFailureAt: Date.now(), resetAfterMs: 5 * 60 * 1000 },
    { authoritativeReset: true }
  );
  const after = getModelLockoutInfo(provider, connection, model);
  assert.ok(after, "lock must survive shortening");
  assert.ok(
    after!.remainingMs < 6 * 60 * 1000,
    `expected shortened lock ~5m, got remainingMs=${after!.remainingMs}`
  );

  accountFallback.clearModelLock(provider, connection, model);
  assert.equal(isModelLocked(provider, connection, model), false, "lock must be clearable");
});

test("non-authoritative hint still never shortens an existing lock (old behavior)", () => {
  evictModelLockoutOverflow();
  const provider = "routerai-noauthor";
  const connection = "conn-noauthor";
  const model = "test-model";
  lockExactModel(provider, connection, model, "credits", 60 * 60 * 1000, {
    failureCount: 1,
  });
  lockExactModel(
    provider,
    connection,
    model,
    "credits",
    60 * 1000,
    { failureCount: 2, lastFailureAt: Date.now() },
    { authoritativeReset: false }
  );
  const info = getModelLockoutInfo(provider, connection, model);
  assert.ok(info!.remainingMs > 55 * 60 * 1000, "long lock must be preserved");
  accountFallback.clearModelLock(provider, connection, model);
});

// ── CodeRabbit review follow-up (PR #19027) ──────────────────────────────────

const { buildSubscriptionQuotaFallback } = await import(
  "../../open-sse/services/quotaTextCooldowns.ts"
);

const REVIEW_PROFILE_DISABLED = {
  baseCooldownMs: 125,
  useUpstreamRetryHints: false,
  maxCooldownMs: 60000,
  maxBackoffSteps: 3,
  failureThreshold: 60,
  resetTimeoutMs: 5000,
  transientCooldown: 125,
  rateLimitCooldown: 125,
  maxBackoffLevel: 3,
  circuitBreakerThreshold: 60,
  circuitBreakerReset: 5000,
  providerFailureThreshold: 5,
  providerFailureWindowMs: 300000,
  providerCooldownMs: 60000,
};

const REVIEW_PROFILE_ENABLED = {
  ...REVIEW_PROFILE_DISABLED,
  useUpstreamRetryHints: true,
};

test("subscription-quota fallback preserves the upstream hint provenance", () => {
  const sub = buildSubscriptionQuotaFallback(
    "You've reached your usage limit",
    () => ({ retryAfterMs: 900_000, provenance: "header" }),
    () => null
  );
  assert.ok(sub, "expected a subscription-quota fallback");
  assert.equal(sub.usedUpstreamRetryHint, true);
  assert.equal(sub.retryHintSource, "header", "applied hint provenance must reach callers");
  assert.equal(sub.cooldownMs, 900_000);

  const local = buildSubscriptionQuotaFallback(
    "You've reached your usage limit",
    () => null,
    () => null
  );
  assert.ok(local);
  assert.equal(local.usedUpstreamRetryHint, false);
  assert.equal(local.retryHintSource, undefined, "a locally scaled cooldown carries no provenance");
});

test("a per-model 402 with subscription-quota text + structured body carries authoritative provenance", async () => {
  const body = JSON.stringify({
    error: {
      message: "You've reached your plan's set usage limit",
      retry_after: 3095,
      reset_at: new Date(Date.now() + 3_095_000).toISOString(),
    },
  });
  const { checkFallbackError } = accountFallback;
  const result = checkFallbackError(
    402,
    body,
    0,
    "test-model",
    "routerai-review",
    null,
    REVIEW_PROFILE_ENABLED
  );
  assert.ok(result.shouldFallback, "expected a fallback verdict");
  assert.equal(result.usedUpstreamRetryHint, true, "the structured hint was applied");
  assert.equal(
    accountFallback.isAuthoritativeRetryHintSource(result.retryHintSource),
    true,
    `expected an authoritative provenance, got ${result.retryHintSource}`
  );
});

routerai_review_disabled: {
  const body = JSON.stringify({
    error: {
      message: "You've reached your plan's set usage limit",
      retry_after: 3095,
      reset_at: new Date(Date.now() + 3_095_000).toISOString(),
    },
  });
  const { checkFallbackError } = accountFallback;

  test("with hints disabled the quota verdict stays locally scaled (never an applied hint)", () => {
    const result = checkFallbackError(
      402,
      body,
      0,
      "test-model",
      "routerai-review",
      null,
      REVIEW_PROFILE_DISABLED
    );
    assert.ok(result.shouldFallback, "expected a fallback verdict");
    // The auth.ts per-model 402/403 branch shortens a stale lock ONLY when
    // usedUpstreamRetryHint === true AND the source is authoritative. With hints
    // disabled the cooldown is the locally scaled one, so the guard must be false
    // even though the body itself carries a structured hint that was not applied.
    assert.notEqual(
      result.usedUpstreamRetryHint,
      true,
      `usedUpstreamRetryHint=${result.usedUpstreamRetryHint}, source=${result.retryHintSource}`
    );
    const qualifiesAsAuthoritative =
      result.usedUpstreamRetryHint === true &&
      accountFallback.isAuthoritativeRetryHintSource(result.retryHintSource);
    assert.equal(
      qualifiesAsAuthoritative,
      false,
      "a locally scaled cooldown must not qualify as an authoritative upstream hint"
    );
  });
}

test("subscription-quota import surface: buildSubscriptionQuotaFallback re-exported type stays aligned", async () => {
  const mod = await import("../../open-sse/services/quotaTextCooldowns.ts");
  assert.equal(typeof mod.buildSubscriptionQuotaFallback, "function");
  // Shorten-order guarantee stays intact at the lock layer: a provenance-only
  // local result must not flip the authoritative flag (regression pin for the
  // auth.ts guard: provenance without an applied hint is not enough).
  const withLocalOnly = mod.buildSubscriptionQuotaFallback(
    "You've reached your usage limit",
    () => null,
    () => 999_999
  );
  assert.ok(withLocalOnly);
  assert.notEqual(withLocalOnly.usedUpstreamRetryHint, true);
});
