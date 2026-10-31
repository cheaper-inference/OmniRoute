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
