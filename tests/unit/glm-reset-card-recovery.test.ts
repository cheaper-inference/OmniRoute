import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "glm-card-recovery-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "synthetic-glm-recovery-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const cache = await import("../../src/lib/db/providerLimits.ts");
const cards = await import("../../src/lib/usage/glmResetCards.ts");
const recovery = await import("../../src/lib/usage/glmResetCardRecovery.ts");
const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
const originalFetch = globalThis.fetch;
let fixtureSequence = 0;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
test.beforeEach(() => {
  globalThis.fetch = originalFetch;
});

function json(body: unknown) {
  return new Response(JSON.stringify(body), { headers: { "content-type": "application/json" } });
}
async function fixture(window: "WEEK" | "FIVE_HOUR" = "WEEK", overrides = {}) {
  const fixtureId = ++fixtureSequence;
  const until = new Date(Date.now() + 86400000).toISOString();
  const connection = await providers.createProviderConnection({
    provider: "zai",
    authType: "apikey",
    apiKey: `synthetic-key-${fixtureId}`,
    name: `Synthetic recovery ${fixtureId}`,
    isActive: true,
    testStatus: "unavailable",
    errorCode: "429",
    lastErrorType: "rate_limited",
    lastErrorSource: "upstream",
    lastError: "Coding plan quota exhausted",
    lastErrorAt: new Date(Date.now() - 60000).toISOString(),
    rateLimitedUntil: until,
    backoffLevel: 2,
    ...overrides,
  });
  assert.ok(connection);
  const id = connection.id as string;
  cache.setProviderLimitsCache(id, {
    quotas: {
      session: { remainingPercentage: window === "FIVE_HOUR" ? 0 : 80, resetAt: until },
      weekly: { remainingPercentage: window === "WEEK" ? 0 : 80, resetAt: until },
    },
    plan: null,
    message: null,
    fetchedAt: new Date().toISOString(),
    source: "manual",
  });
  let uses = 0;
  let lists = 0;
  const options: {
    sessionPercent?: number;
    weeklyPercent?: number;
    missingSession?: boolean;
    failedRefresh?: boolean;
    failedUse?: boolean;
    ambiguousUse?: boolean;
    duringUse?: () => Promise<unknown>;
    duringRefresh?: () => Promise<unknown>;
  } = {};
  globalThis.fetch = async (url) => {
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      lists++;
      return json({
        code: 200,
        success: true,
        data: {
          fiveHourResets: window === "FIVE_HOUR" ? [{ recordId: 301, available: true }] : [],
          weekResets: window === "WEEK" ? [{ recordId: 302, available: true }] : [],
        },
      });
    }
    if (href.includes("/customer-package-reset/use")) {
      uses++;
      await options.duringUse?.();
      if (options.ambiguousUse && uses === 1) throw new Error("synthetic lost response");
      return json({ code: options.failedUse ? 400 : 200, success: !options.failedUse });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      await options.duringRefresh?.();
      if (options.failedRefresh)
        return json({ code: 500, success: false, msg: "synthetic unavailable" });
      return json({
        code: 200,
        success: true,
        data: {
          limits: [
            ...(!options.missingSession
              ? [
                  {
                    type: "CREDIT_LIMIT",
                    unit: 3,
                    number: 5,
                    percentage: options.sessionPercent ?? 0,
                  },
                ]
              : []),
            { type: "CREDIT_LIMIT", unit: 6, number: 1, percentage: options.weeklyPercent ?? 0 },
          ],
        },
      });
    }
    throw new Error("Unexpected synthetic URL");
  };
  return {
    id,
    until,
    options,
    counts: () => ({ uses, lists }),
    read: async () => {
      const current = await providers.getProviderConnectionById(id);
      assert.ok(current);
      return current;
    },
    redeem: () => cards.consumeGlmResetCard(id, "synthetic-recovery-request"),
  };
}

for (const window of ["WEEK", "FIVE_HOUR"] as const) {
  test(`${window} card recovers a cooldown created by the real chat 429 writer`, async () => {
    const f = await fixture(window, {
      testStatus: "active",
      rateLimitedUntil: null,
      lastError: null,
      lastErrorAt: null,
      lastErrorType: null,
      lastErrorSource: null,
      errorCode: null,
      backoffLevel: 0,
    });
    const resetAt = new Date(Date.now() + (window === "WEEK" ? 86400000 : 7200000)).toISOString();
    const error =
      window === "WEEK"
        ? `[1310][Weekly/Monthly Limit Exhausted. Your limit will reset at ${resetAt}]`
        : `[1308][Usage limit reached for 5 hour. Your limit will reset at ${resetAt}]`;
    await markAccountUnavailable(f.id, 429, error, "zai", "glm-5.3");
    const cooling = await f.read();
    assert.equal(cooling.testStatus, "unavailable");
    assert.equal(cooling.lastErrorSource ?? null, null);
    assert.equal(Number(cooling.errorCode), 429);
    assert.ok(Math.abs(Date.parse(String(cooling.rateLimitedUntil)) - Date.parse(resetAt)) < 1000);
    const entry = cache.getProviderLimitsCache(f.id)!;
    entry.fetchedAt = new Date().toISOString();
    entry.quotas![window === "WEEK" ? "weekly" : "session"] = { remainingPercentage: 0, resetAt };
    cache.setProviderLimitsCache(f.id, entry);

    assert.equal((await f.redeem()).outcome, "reset");
    const after = await f.read();
    assert.equal(after.testStatus, "active");
    assert.equal(after.rateLimitedUntil ?? null, null);
    assert.equal(after.lastError ?? null, null);
    assert.equal(after.errorCode ?? null, null);
    assert.equal(after.backoffLevel, 0);
  });

  test(`${window} card releases its old upstream cooldown after fresh recovery`, async () => {
    const f = await fixture(window);
    const result = await f.redeem();
    assert.equal(result.outcome, "reset");
    const after = await f.read();
    assert.equal(after.testStatus, "active");
    assert.equal(after.rateLimitedUntil ?? null, null);
    assert.equal(after.lastError ?? null, null);
    assert.equal(after.errorCode ?? null, null);
    assert.equal(after.backoffLevel, 0);
    assert.equal(f.counts().uses, 1);
  });
}

test("a missing source does not relax the exhausted-window evidence requirement", async () => {
  const f = await fixture("WEEK", { lastErrorSource: null });
  const entry = cache.getProviderLimitsCache(f.id)!;
  entry.quotas!.weekly = { remainingPercentage: 80, resetAt: f.until };
  cache.setProviderLimitsCache(f.id, entry);
  await f.redeem();
  assert.equal((await f.read()).rateLimitedUntil, f.until);
});

for (const scenario of [
  "other-window-exhausted",
  "target-still-exhausted",
  "missing-window",
  "refresh-failed",
  "wrong-window",
  "no-cache",
  "wrong-reset",
] as const) {
  test(`preserves cooldown when reset recovery is unproven: ${scenario}`, async () => {
    const f = await fixture();
    if (scenario === "other-window-exhausted") f.options.sessionPercent = 100;
    if (scenario === "target-still-exhausted") f.options.weeklyPercent = 100;
    if (scenario === "missing-window") f.options.missingSession = true;
    if (scenario === "refresh-failed") f.options.failedRefresh = true;
    if (["wrong-window", "no-cache", "wrong-reset"].includes(scenario)) {
      const entry = cache.getProviderLimitsCache(f.id)!;
      entry.quotas =
        scenario === "no-cache"
          ? null
          : {
              session: { remainingPercentage: 0, resetAt: f.until },
              weekly: {
                remainingPercentage: scenario === "wrong-window" ? 80 : 0,
                resetAt:
                  scenario === "wrong-reset"
                    ? new Date(Date.now() + 7200000).toISOString()
                    : f.until,
              },
            };
      cache.setProviderLimitsCache(f.id, entry);
    }
    assert.equal((await f.redeem()).outcome, "reset");
    assert.equal((await f.read()).rateLimitedUntil, f.until);
  });
}

for (const overrides of [
  { lastErrorSource: "extra_usage" },
  { lastErrorType: "capacity" },
  { errorCode: "503" },
  { testStatus: "banned" },
  { testStatus: "expired" },
  { isActive: false },
]) {
  test(`preserves unrelated or terminal state ${JSON.stringify(overrides)}`, async () => {
    const f = await fixture("WEEK", overrides);
    await f.redeem();
    assert.equal((await f.read()).rateLimitedUntil, f.until);
  });
}

for (const stage of ["duringUse", "duringRefresh"] as const) {
  test(`preserves a new cooldown written ${stage}`, async () => {
    const f = await fixture();
    const newer = new Date(Date.now() + 172800000).toISOString();
    f.options[stage] = () =>
      providers.updateProviderConnection(f.id, {
        lastErrorAt: new Date().toISOString(),
        rateLimitedUntil: newer,
        lastError: "New quota error",
      });
    await f.redeem();
    assert.equal((await f.read()).rateLimitedUntil, newer);
  });
}

test("ambiguous retry retains the original recovery snapshot instead of clearing a later error", async () => {
  const f = await fixture();
  f.options.ambiguousUse = true;
  await assert.rejects(f.redeem);
  const laterError = new Date().toISOString();
  await providers.updateProviderConnection(f.id, {
    lastErrorAt: laterError,
    lastError: "Later 429",
  });
  await f.redeem();
  assert.equal((await f.read()).lastErrorAt, laterError);
  assert.equal((await f.read()).rateLimitedUntil, f.until);
  assert.equal(f.counts().uses, 2);
});

test("rejected redemption never clears cooldown", async () => {
  const f = await fixture();
  f.options.failedUse = true;
  await assert.rejects(f.redeem);
  assert.equal((await f.read()).rateLimitedUntil, f.until);
});

test("ambiguous retry can recover the unchanged original cooldown", async () => {
  const f = await fixture();
  f.options.ambiguousUse = true;
  await assert.rejects(f.redeem);
  await f.redeem();
  assert.equal((await f.read()).testStatus, "active");
  assert.equal(f.counts().uses, 2);
});

test("stale positive cached quotas cannot prove recovery after a failed refresh", async () => {
  const f = await fixture();
  f.options.duringUse = async () => {
    const entry = cache.getProviderLimitsCache(f.id)!;
    entry.quotas = { session: { remainingPercentage: 90 }, weekly: { remainingPercentage: 90 } };
    cache.setProviderLimitsCache(f.id, entry);
  };
  f.options.failedRefresh = true;
  const result = await f.redeem();
  assert.equal(result.usage?._stale, true);
  assert.equal((await f.read()).rateLimitedUntil, f.until);
});

for (const invalid of [
  "old-snapshot",
  "unknown-percent",
  "invalid-reset",
  "cache-error",
] as const) {
  test(`does not bind a reset to insufficient previous quota evidence: ${invalid}`, async () => {
    const f = await fixture();
    const entry = cache.getProviderLimitsCache(f.id)!;
    if (invalid === "old-snapshot") entry.fetchedAt = new Date(Date.now() - 120000).toISOString();
    if (invalid === "unknown-percent") entry.quotas!.weekly = { resetAt: f.until };
    if (invalid === "invalid-reset")
      entry.quotas!.weekly = { remainingPercentage: 0, resetAt: "invalid" };
    if (invalid === "cache-error") entry.message = "synthetic unavailable";
    cache.setProviderLimitsCache(f.id, entry);
    await f.redeem();
    assert.equal((await f.read()).rateLimitedUntil, f.until);
  });
}

test("another exhausted quota prevents recovery even when session and weekly recovered", async () => {
  const f = await fixture();
  const expected = recovery.captureGlmResetRecovery(await f.read(), "WEEK");
  assert.ok(expected);
  assert.equal(
    await recovery.recoverGlmResetCooldown(f.id, expected, {
      quotas: {
        session: { remainingPercentage: 100 },
        weekly: { remainingPercentage: 100 },
        mcp_monthly: { remainingPercentage: 0 },
      },
    }),
    false
  );
  assert.equal((await f.read()).rateLimitedUntil, f.until);
});

test("an account disabled while redeeming stays disabled and cooling", async () => {
  const f = await fixture();
  f.options.duringUse = () => providers.updateProviderConnection(f.id, { isActive: false });
  await f.redeem();
  assert.equal((await f.read()).rateLimitedUntil, f.until);
  assert.equal((await f.read()).isActive, false);
});

test("replaying a committed reset neither spends again nor clears a later error", async () => {
  const f = await fixture();
  await f.redeem();
  const later = new Date(Date.now() + 172800000).toISOString();
  await providers.updateProviderConnection(f.id, {
    testStatus: "unavailable",
    rateLimitedUntil: later,
    lastErrorAt: new Date().toISOString(),
  });
  await f.redeem();
  assert.equal((await f.read()).rateLimitedUntil, later);
  assert.equal(f.counts().uses, 1);
});
