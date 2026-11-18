/**
 * Providers add and remove quota windows: OpenAI dropped the 5-hour Codex session window for
 * some plans, leaving a single weekly `primary_window`. A complete usage reading is the full set
 * of windows the account has now, so a window OmniRoute knew but the reading no longer reports
 * is gone. Before this, its last value lived on in four places and kept blocking routing until
 * its own (stale) reset: the snapshot rows rehydrated after a restart, the persisted Codex state
 * (sparse merge), the request-time Codex rehydration (stamped with the state's newest time) and
 * Claude's saturation buckets. Partial evidence (response headers, stale cached readings) still
 * updates only what it carries.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "quota-window-retirement-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "synthetic-quota-window-retirement-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const snapshots = await import("../../src/lib/db/quotaSnapshots.ts");
const cache = await import("../../src/domain/quotaCache.ts");
const { getQuotaCacheState } = await import("../../src/domain/quotaCacheState.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { mergeCodexQuotaObservation } = await import("../../src/lib/providers/codexQuotaDisplay.ts");
const { syncCodexQuotaObservation } =
  await import("../../src/lib/db/providers/codexAccountRecovery.ts");
const { isCompleteUsageReading } = await import("../../src/lib/usage/usageReading.ts");
const { codexUsageWindowsComplete } = await import("../../open-sse/services/codexUsageQuotas.ts");
const { claudeUsageWindowsComplete } = await import("../../open-sse/services/usage/claudeQuota.ts");
const buckets = await import("../../src/lib/quota/accountBuckets.ts");

const NOW = Date.parse("2026-11-05T15:20:00.000Z");
const iso = (offset = 0) => new Date(NOW + offset).toISOString();
const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const NORMAL = "gpt-6-astra";

/** A usage-API window as providerLimits hands it to setQuotaCache. */
const usageWindow = (used: number, resetAt: string, windowSeconds: number) => ({
  used,
  total: 100,
  remaining: 100 - used,
  remainingPercentage: 100 - used,
  resetAt,
  unlimited: false,
  windowSeconds,
});
// The incident: a weekly window misfiled as the session window earlier (reset = the old weekly
// reset), then the weekly window restarted and the plan reports no session window at all.
const OLD_WEEKLY_RESET = iso(6 * DAY - 9 * HOUR);
const NEW_WEEKLY_RESET = iso(7 * DAY - 4 * HOUR);
const staleSession = () => usageWindow(100, OLD_WEEKLY_RESET, 18000);
const freshWeekly = () => usageWindow(0, NEW_WEEKLY_RESET, 604800);

async function codexConnection(extra: Record<string, unknown> = {}) {
  return providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: crypto.randomUUID(),
    accessToken: "synthetic-access-token",
    refreshToken: "synthetic-refresh-token",
    expiresAt: iso(DAY),
    isActive: true,
    testStatus: "active",
    providerSpecificData: { limitPolicy: { enabled: true, thresholdPercent: 95 }, ...extra },
  });
}

function latestWindowKeys(id: string): string[] {
  return snapshots
    .getLatestQuotaSnapshotsForConnection(id)
    .map((row) => {
      const view = row as unknown as { windowKey?: string; window_key?: string };
      return view.windowKey ?? view.window_key ?? "";
    })
    .sort();
}

test.beforeEach((t) => {
  t.mock.timers.enable({ apis: ["Date"], now: NOW });
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("These synthetic quota tests must not call upstream");
  });
  cache.__clearForTests();
  getQuotaCacheState().healthyUntil.clear();
  buckets._clearBucketsForTest();
});

test.after(() => {
  cache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a complete reading is fresh, adapter-attested usage evidence; nothing else is", () => {
  const complete = (quotas: unknown) => ({ quotas, quotasComplete: true });
  assert.equal(isCompleteUsageReading(complete({ weekly: freshWeekly() })), true);
  assert.equal(isCompleteUsageReading(complete({})), true, "no windows at all is a reading too");
  for (const usage of [
    // A parser may have dropped a window it could not read: only the adapter can attest.
    { quotas: { weekly: freshWeekly() } },
    { ...complete({ weekly: freshWeekly() }), _stale: true },
    {
      ...complete({ weekly: freshWeekly() }),
      message: "Claude usage refresh is busy. Retry shortly.",
    },
    { message: "Usage endpoint returned HTTP 503." },
    { quotas: null },
    null,
    undefined,
  ]) {
    assert.equal(isCompleteUsageReading(usage), false, JSON.stringify(usage));
  }
});

test("a window a complete reading no longer reports is retired, also after a restart", async (t) => {
  const c = await codexConnection();
  t.mock.timers.setTime(NOW - 11 * HOUR);
  cache.setQuotaCache(c.id, "codex", {
    session: staleSession(),
    weekly: usageWindow(100, OLD_WEEKLY_RESET, 604800),
  });
  assert.equal(cache.getQuotaWindowStatus(c.id, "session", 95)?.reachedThreshold, true);

  t.mock.timers.setTime(NOW);
  cache.setQuotaCache(c.id, "codex", { weekly: freshWeekly() }, {}, { complete: true });
  assert.equal(cache.getQuotaWindowStatus(c.id, "session", 95), null, "the session window is gone");
  assert.equal(cache.getQuotaWindowStatus(c.id, "weekly", 95)?.reachedThreshold, false);

  cache.__clearForTests(); // restart: the cache rehydrates from quota_snapshots
  assert.deepEqual(
    latestWindowKeys(c.id),
    ["weekly"],
    "the retired window is not a current window"
  );
  assert.equal(
    cache.getQuotaWindowStatus(c.id, "session", 95),
    null,
    "a restart does not resurrect it"
  );
  assert.equal(cache.isAccountQuotaExhausted(c.id), false);
  assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, NORMAL).blocked, false);

  // History is kept: the retirement is an appended record, not a deletion.
  const history = snapshots.getQuotaSnapshots({ connectionId: c.id, since: iso(-DAY) });
  const sessionRows = history.filter((row) => {
    const view = row as unknown as { windowKey?: string; window_key?: string };
    return (view.windowKey ?? view.window_key) === "session";
  });
  assert.ok(sessionRows.length >= 2, "the old reading and its retirement are both recorded");
  assert.equal(sessionRows.filter((row) => snapshots.isUnreportedQuotaSnapshot(row)).length, 1);
});

test("a retired window that the provider reports again is a current window again", async (t) => {
  const c = await codexConnection();
  cache.setQuotaCache(c.id, "codex", { session: staleSession(), weekly: freshWeekly() });
  t.mock.timers.setTime(NOW + 60_000);
  cache.setQuotaCache(c.id, "codex", { weekly: freshWeekly() }, {}, { complete: true });
  t.mock.timers.setTime(NOW + 120_000);
  const session = usageWindow(40, iso(4 * HOUR), 18000);
  cache.setQuotaCache(c.id, "codex", { session, weekly: freshWeekly() }, {}, { complete: true });
  cache.__clearForTests();
  assert.deepEqual(latestWindowKeys(c.id), ["session", "weekly"]);
  assert.equal(cache.getQuotaWindowStatus(c.id, "session", 95)?.reachedThreshold, false);
});

test("a reading that is not complete never retires a window", async (t) => {
  const c = await codexConnection();
  cache.setQuotaCache(c.id, "codex", { session: staleSession(), weekly: freshWeekly() });
  t.mock.timers.setTime(NOW + 60_000);
  cache.setQuotaCache(c.id, "codex", { weekly: freshWeekly() });
  cache.__clearForTests();
  assert.deepEqual(latestWindowKeys(c.id), ["session", "weekly"]);
});

test("a complete Codex observation drops the persisted slots it does not report; headers do not", () => {
  const previous = {
    observedAt: iso(-11 * HOUR),
    usage5h: 100,
    limit5h: 100,
    resetAt5h: OLD_WEEKLY_RESET,
    usage7d: 100,
    limit7d: 100,
    resetAt7d: OLD_WEEKLY_RESET,
    observedAtByWindow: { "5h": iso(-11 * HOUR), "7d": iso(-11 * HOUR) },
  };
  const next = { observedAt: iso(), usage7d: 0, limit7d: 100, resetAt7d: NEW_WEEKLY_RESET };

  const complete = mergeCodexQuotaObservation(previous, next, { complete: true });
  assert.ok(complete);
  for (const key of ["usage5h", "limit5h", "resetAt5h"]) assert.equal(key in complete, false, key);
  assert.deepEqual(complete.observedAtByWindow, { "7d": iso() });
  assert.equal(complete.usage7d, 0);

  const partial = mergeCodexQuotaObservation(previous, next);
  assert.ok(partial);
  assert.equal(partial.usage5h, 100, "a header observation still keeps the sibling it omits");
});

test("the usage sync retires the missing Codex window and lifts a one-window plan's cooldown", async () => {
  const exhausted = {
    codexQuotaStateByScope: {
      codex: {
        observedAt: iso(-11 * HOUR),
        usage5h: 100,
        limit5h: 100,
        resetAt5h: OLD_WEEKLY_RESET,
        usage7d: 100,
        limit7d: 100,
        resetAt7d: OLD_WEEKLY_RESET,
        observedAtByWindow: { "5h": iso(-11 * HOUR), "7d": iso(-11 * HOUR) },
      },
    },
    codexExhaustedWindowByScope: { codex: "5h" },
    codexScopeRateLimitedUntil: { codex: OLD_WEEKLY_RESET },
  };
  const c = await codexConnection(exhausted);
  const usage = { plan: "prolite", quotas: { weekly: freshWeekly() }, quotasComplete: true };
  const data = (await syncCodexQuotaObservation(c.id, usage, c.providerSpecificData)) as Record<
    string,
    Record<string, unknown>
  > | null;
  assert.ok(data, "the observation is accepted");
  const state = data.codexQuotaStateByScope.codex as Record<string, unknown>;
  assert.equal(state.usage5h, undefined, "the session slot is retired");
  assert.equal(state.usage7d, 0);
  assert.equal((data.codexExhaustedWindowByScope ?? {}).codex, undefined, "exhaustion cleared");
  assert.equal((data.codexScopeRateLimitedUntil ?? {}).codex, undefined, "scope cooldown lifted");

  const stored = await providers.getProviderConnectionById(c.id);
  assert.equal(auth.evaluateQuotaLimitPolicy("codex", stored as never, NORMAL).blocked, false);
});

test("request-time rehydration dates each persisted window by its own observation", async (t) => {
  // Persisted state still holding the old session slot (written before this fix), with a newer
  // top-level time from a later weekly-only observation.
  const c = await codexConnection({
    codexQuotaStateByScope: {
      codex: {
        observedAt: iso(),
        usage5h: 100,
        limit5h: 100,
        resetAt5h: OLD_WEEKLY_RESET,
        usage7d: 0,
        limit7d: 100,
        resetAt7d: NEW_WEEKLY_RESET,
        observedAtByWindow: { "5h": iso(-11 * HOUR), "7d": iso() },
      },
    },
  });
  t.mock.timers.setTime(NOW - 60_000);
  cache.setQuotaCache(c.id, "codex", { weekly: freshWeekly() }, {}, { complete: true });
  t.mock.timers.setTime(NOW + 60_000);
  cache.hydrateCodexQuotaCacheForRequest(c, NORMAL);
  assert.equal(
    cache.getQuotaWindowStatus(c.id, "session", 95),
    null,
    "a window last seen before the latest complete reading must not come back"
  );
  assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, NORMAL).blocked, false);
  const selected = await auth.getProviderCredentials("codex", null, [c.id], NORMAL);
  assert.notEqual(selected.allRateLimited, true, "the account is selectable");
});

test("Claude saturation buckets drop a window a complete reading no longer reports", () => {
  const id = "claude-retire-buckets";
  buckets.updateAccountBuckets(
    id,
    {
      quotas: {
        "session (5h)": { used: 100, resetAt: iso(2 * HOUR) },
        "weekly (7d)": { used: 10, resetAt: iso(DAY) },
      },
    } as never,
    NOW
  );
  assert.equal(buckets.isBucketSaturated(id, "5h", NOW), true);

  const weeklyOnly = { "weekly (7d)": { used: 10, resetAt: iso(DAY) } };
  buckets.updateAccountBuckets(id, { quotas: weeklyOnly } as never, NOW);
  assert.equal(
    buckets.isBucketSaturated(id, "5h", NOW),
    true,
    "an unattested reading changes nothing"
  );
  buckets.updateAccountBuckets(
    id,
    { quotas: weeklyOnly, quotasComplete: true, _stale: true } as never,
    NOW
  );
  assert.equal(buckets.isBucketSaturated(id, "5h", NOW), true, "a stale reading changes nothing");

  buckets.updateAccountBuckets(id, { quotas: weeklyOnly, quotasComplete: true } as never, NOW);
  assert.equal(buckets.isBucketSaturated(id, "5h", NOW), false, "the session window is gone");
});

// Payload shapes as the providers returned them on 2026-11-05, trimmed to the rate-limit fields.
const CODEX_ONE_WINDOW_PLAN = {
  plan_type: "prolite",
  rate_limit: {
    allowed: true,
    limit_reached: false,
    primary_window: {
      used_percent: 0,
      limit_window_seconds: 604800,
      reset_after_seconds: 590814,
      reset_at: 1794482985,
    },
    secondary_window: null,
  },
  code_review_rate_limit: null,
  additional_rate_limits: null,
};

/** A copy of the one-window plan payload with its rate-limit block edited. */
function codexVariant(
  edit: (rateLimit: Record<string, unknown>, payload: Record<string, unknown>) => void
): Record<string, unknown> {
  const payload = structuredClone(CODEX_ONE_WINDOW_PLAN) as Record<string, unknown>;
  edit(payload.rate_limit as Record<string, unknown>, payload);
  return payload;
}

test("the Codex adapter attests completeness only when the payload names every window", () => {
  assert.equal(codexUsageWindowsComplete(CODEX_ONE_WINDOW_PLAN), true, "a removed window is null");
  const twoWindows = codexVariant((rateLimit) => {
    rateLimit.secondary_window = {
      used_percent: 10,
      limit_window_seconds: 18000,
      reset_at: 1794000000,
    };
  });
  assert.equal(codexUsageWindowsComplete(twoWindows), true);

  const omitted = codexVariant((rateLimit) => delete rateLimit.secondary_window);
  assert.equal(codexUsageWindowsComplete(omitted), false, "an omitted window is not a removed one");
  const unparseable = codexVariant((rateLimit) => {
    rateLimit.primary_window = { ...(rateLimit.primary_window as object), used_percent: "lots" };
  });
  assert.equal(codexUsageWindowsComplete(unparseable), false, "a dropped window is not gone");
  const noAdditional = codexVariant((_, payload) => delete payload.additional_rate_limits);
  assert.equal(codexUsageWindowsComplete(noAdditional), false, "Spark windows are unaccounted for");
  assert.equal(codexUsageWindowsComplete({ plan_type: "prolite" }), false);
});

test("the Claude adapter attests completeness only when the payload names every window", () => {
  const payload: Record<string, unknown> = {
    five_hour: null,
    seven_day: { utilization: 33, resets_at: "2026-11-08T00:59:59.636707+00:00" },
    seven_day_opus: null,
    seven_day_sonnet: null,
    seven_day_breakdown: { as_of: "2026-11-05T15:15:40Z", rows: [] },
  };
  assert.equal(claudeUsageWindowsComplete(payload), true, "no open session is an explicit null");
  assert.equal(claudeUsageWindowsComplete({ ...payload, five_hour: { utilization: 12 } }), true);
  const withoutSession = { ...payload };
  delete withoutSession.five_hour;
  assert.equal(claudeUsageWindowsComplete(withoutSession), false, "an omitted window is not gone");
  assert.equal(
    claudeUsageWindowsComplete({ ...payload, seven_day: { utilization: "n/a" } }),
    false
  );
  assert.equal(
    claudeUsageWindowsComplete({ ...payload, seven_day_opus: { utilization: "n/a" } }),
    false
  );
});
