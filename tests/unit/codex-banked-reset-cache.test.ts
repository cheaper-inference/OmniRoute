import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-banked-reset-cache-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "synthetic-banked-reset-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const snapshots = await import("../../src/lib/db/quotaSnapshots.ts");
const cache = await import("../../src/domain/quotaCache.ts");
const { getQuotaCacheState } = await import("../../src/domain/quotaCacheState.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { isQuotaWindowBoundedParkEnabled } = await import("../../src/shared/utils/featureFlags.ts");

const NOW = Date.parse("2026-11-01T12:00:00.000Z");
const TTL = 5 * 60_000;
const NORMAL = "gpt-5.5";
const SPARK = "gpt-5.3-codex-spark";
const iso = (offset = 0) => new Date(NOW + offset).toISOString();
const quota = (remainingPercentage: number, resetAt: string | null = iso(3_600_000)) => ({
  remainingPercentage,
  resetAt,
});
const persisted = (observedAt: string | null, used = 100) => ({
  usage5h: used,
  limit5h: 100,
  resetAt5h: iso(3_600_000),
  usage7d: used,
  limit7d: 100,
  resetAt7d: iso(86_400_000),
  observedAt,
});

async function connection(policyEnabled: boolean, extra: Record<string, unknown> = {}) {
  return providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: crypto.randomUUID(),
    accessToken: "synthetic-access-token",
    refreshToken: "synthetic-refresh-token",
    expiresAt: iso(86_400_000),
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      limitPolicy: { enabled: policyEnabled, thresholdPercent: 99 },
      ...extra,
    },
  });
}

function status(id: string, name: string) {
  const result = cache.getQuotaWindowStatus(id, name);
  assert.ok(result, `expected an observed window: ${name}`);
  return result;
}

function boundedParkFlag(t: TestContext, enabled?: boolean) {
  const prior = process.env.QUOTA_WINDOW_BOUNDED_PARK;
  if (enabled === undefined) delete process.env.QUOTA_WINDOW_BOUNDED_PARK;
  else process.env.QUOTA_WINDOW_BOUNDED_PARK = String(enabled);
  t.after(() => {
    if (prior === undefined) delete process.env.QUOTA_WINDOW_BOUNDED_PARK;
    else process.env.QUOTA_WINDOW_BOUNDED_PARK = prior;
  });
  assert.equal(isQuotaWindowBoundedParkEnabled(), enabled ?? false, "confirm effective park flag");
}

function saveSnapshot(id: string, name: string, remaining: number) {
  snapshots.saveQuotaSnapshot({
    provider: "codex",
    connection_id: id,
    window_key: name,
    remaining_percentage: remaining,
    is_exhausted: remaining === 0 ? 1 : 0,
    next_reset_at: iso(3_600_000),
    window_duration_ms: null,
    raw_data: null,
  });
}

function latestSnapshot(id: string, windowKey: string) {
  const row = snapshots
    .getLatestQuotaSnapshotsForConnection(id)
    .map((snapshot) => snapshot as unknown as Record<string, unknown>)
    .find((snapshot) => (snapshot.windowKey ?? snapshot.window_key) === windowKey);
  assert.ok(row, `expected a durable snapshot for ${windowKey}`);
  return row;
}

function snapshotCount(id: string) {
  return snapshots.getQuotaSnapshots({ connectionId: id, since: iso(-86_400_000) }).length;
}

test.beforeEach((t) => {
  t.mock.timers.enable({ apis: ["Date"], now: NOW });
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("These synthetic routing tests must not call upstream");
  });
  cache.__clearForTests();
  getQuotaCacheState().healthyUntil.clear();
});

test.after(() => {
  cache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const policyEnabled of [true, false]) {
  const gate = policyEnabled ? "configured policy" : "automatic exhaustion";
  for (const source of ["usage", "snapshot"] as const) {
    test(`${gate}: newer healthy ${source} outranks persisted child exhaustion`, async () => {
      const c = await connection(policyEnabled, {
        codexQuotaStateByScope: { codex: persisted(iso(-60_000)) },
        codexExhaustedWindowByScope: { codex: "7d" },
      });
      if (source === "usage") {
        cache.setQuotaCache(c.id, "codex", { session: quota(100), weekly: quota(100) });
      } else {
        saveSnapshot(c.id, "session", 100);
        saveSnapshot(c.id, "weekly", 100);
        cache.__clearForTests();
      }
      const selected = await auth.getProviderCredentials("codex", null, [c.id], NORMAL);
      assert.equal(selected.connectionId, c.id, "older child metadata must not reject selection");
      assert.equal(status(c.id, "session").remainingPercentage, 100);
      assert.equal(status(c.id, "weekly").remainingPercentage, 100);
      assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), false);
      assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, NORMAL).blocked, false);
    });
  }

  for (const resetAt of [iso(3_600_000), null, "invalid-reset"]) {
    test(`${gate}: five-minute-old exhaustion is unknown (reset ${resetAt})`, async (t) => {
      const c = await connection(policyEnabled);
      t.mock.timers.setTime(NOW - TTL - 1);
      cache.setQuotaCache(c.id, "codex", { session: quota(0, resetAt), weekly: quota(0, resetAt) });
      t.mock.timers.setTime(NOW);
      const selected = await auth.getProviderCredentials("codex", null, [c.id], NORMAL);
      assert.equal(selected.connectionId, c.id, "stale evidence must permit an upstream attempt");
      assert.equal(cache.getQuotaWindowStatus(c.id, "session"), null);
      assert.equal(cache.getQuotaWindowObservation(c.id, "session"), null);
      assert.equal(cache.getQuotaCache(c.id)?.quotas.session.remainingPercentage, 0);
      assert.equal(getQuotaCacheState().healthyUntil.has(c.id), false, "unknown is not recovery");
    });
  }

  for (const resetAt of [null, "invalid-reset"]) {
    test(`${gate}: fresh exhaustion still blocks without a valid reset (${resetAt})`, async () => {
      const c = await connection(policyEnabled);
      cache.setQuotaCache(c.id, "codex", {
        session: quota(0, resetAt),
        weekly: quota(0, resetAt),
      });
      const selected = await auth.getProviderCredentials("codex", null, [c.id], NORMAL);
      assert.equal(selected.allRateLimited, true);
      assert.equal(status(c.id, "weekly").reachedThreshold, true);
      assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), true);
    });
  }

  test(`${gate}: fresh persisted denial still blocks over older health`, async (t) => {
    const c = await connection(policyEnabled, {
      codexQuotaStateByScope: { codex: persisted(iso()) },
      codexExhaustedWindowByScope: { codex: "7d" },
    });
    t.mock.timers.setTime(NOW - 60_000);
    saveSnapshot(c.id, "session", 100);
    saveSnapshot(c.id, "weekly", 100);
    t.mock.timers.setTime(NOW);
    cache.__clearForTests();
    const selected = await auth.getProviderCredentials("codex", null, [c.id], NORMAL);
    assert.equal(selected.allRateLimited, true);
    assert.equal(status(c.id, "weekly").reachedThreshold, true);
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), true);
  });
}

for (const policyEnabled of [true, false]) {
  test(`unknown weekly observation cannot clear fresh child denial (policy ${policyEnabled})`, async (t) => {
    boundedParkFlag(t);
    const observedAt = iso(-30_000);
    const c = await connection(policyEnabled, {
      codexQuotaStateByScope: { codex: persisted(observedAt) },
      codexExhaustedWindowByScope: { codex: "7d" },
    });
    cache.hydrateCodexQuotaCacheForRequest(c, NORMAL);
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), true);
    for (const offset of [0, 60_000]) {
      t.mock.timers.setTime(NOW + offset);
      cache.setQuotaCache(c.id, "codex", {
        weekly: { ...quota(0), fractionReported: false },
      });
      cache.hydrateCodexQuotaCacheForRequest(c, NORMAL);
      assert.equal(
        cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL),
        true,
        "unknown quota observation must not clear a fresh denial"
      );
      assert.equal(status(c.id, "weekly").reachedThreshold, true);
      assert.equal(cache.getQuotaWindowObservation(c.id, "weekly")?.observedAt, observedAt);
      assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, NORMAL).blocked, policyEnabled);
      const selected = await auth.getProviderCredentials("codex", null, [c.id], NORMAL);
      assert.equal(selected.allRateLimited, true);
    }
    t.mock.timers.setTime(NOW + TTL - 30_000);
    assert.equal(cache.getQuotaWindowStatus(c.id, "weekly"), null);
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), false);
    assert.equal(getQuotaCacheState().healthyUntil.has(c.id), false, "expiry is not recovery");
    cache.setQuotaCache(c.id, "codex", { weekly: quota(0) });
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), true);
    cache.setQuotaCache(c.id, "codex", { weekly: quota(100) });
    cache.hydrateCodexQuotaCacheForRequest(c, NORMAL);
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), false);
  });
}

for (const restartBeforeUnknown of [false, true]) {
  test(`unknown refresh cannot redate denial snapshots (restart first ${restartBeforeUnknown})`, async (t) => {
    const c = await connection(false);
    t.mock.timers.setTime(NOW - 30_000);
    cache.setQuotaCache(c.id, "codex", {
      weekly: quota(0),
      gpt_5_3_codex_spark_session: quota(100),
    });
    t.mock.timers.setTime(NOW);
    if (restartBeforeUnknown) cache.__clearForTests();
    cache.setQuotaCache(c.id, "codex", { weekly: { ...quota(0), fractionReported: false } });
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), true);
    assert.equal(cache.getQuotaWindowObservation(c.id, "weekly")?.observedAt, iso(-30_000));
    cache.__clearForTests();
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), true);
    assert.equal(cache.getQuotaWindowObservation(c.id, "weekly")?.observedAt, iso(-30_000));
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", SPARK), false);
    t.mock.timers.setTime(NOW + TTL - 30_000);
    assert.equal(cache.getQuotaWindowStatus(c.id, "weekly"), null);
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), false);
  });
}

for (const enabled of [false, true]) {
  for (const expiredSpark of [true, false]) {
    test(`park flag ${enabled}: expired ${expiredSpark ? "Spark" : "normal"} cannot release sibling`, async (t) => {
      boundedParkFlag(t, enabled);
      const c = await connection(true);
      const expiredWindow = expiredSpark ? "gpt_5_3_codex_spark_session" : "session";
      const freshWindow = expiredSpark ? "weekly" : "gpt_5_3_codex_spark_weekly";
      const freshModel = expiredSpark ? NORMAL : SPARK;
      const expiredModel = expiredSpark ? SPARK : NORMAL;
      cache.setQuotaCache(c.id, "codex", {
        [expiredWindow]: quota(0, iso(-1_000)),
        [freshWindow]: quota(0),
      });
      assert.equal(status(c.id, expiredWindow).reachedThreshold, false);
      assert.equal(
        status(c.id, freshWindow).reachedThreshold,
        true,
        "another scope's expired park must not release this fresh denial"
      );
      assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", freshModel), true);
      assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", expiredModel), false);
      assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, freshModel).blocked, true);
      assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, expiredModel).blocked, false);
      t.mock.timers.setTime(NOW + TTL);
      assert.equal(cache.getQuotaWindowStatus(c.id, freshWindow), null);
      assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", freshModel), false);
    });
  }

  test(`park flag ${enabled}: non-Codex unknown and shared park behavior stay unchanged`, (t) => {
    boundedParkFlag(t, enabled);
    const id = `synthetic-non-codex-park-${enabled}`;
    cache.setQuotaCache(id, "openai", {
      session: quota(0, iso(-1_000)),
      weekly: quota(0),
    });
    assert.equal(status(id, "weekly").reachedThreshold, !enabled);
    cache.setQuotaCache(id, "openai", { weekly: { ...quota(0), fractionReported: false } });
    assert.equal(status(id, "weekly").reachedThreshold, false);
    assert.equal(cache.isQuotaExhaustedForRequest(id, "openai"), false);
  });
}

test("old persisted-only metadata is not redated by repeated request hydration", async () => {
  const c = await connection(true, {
    codexQuotaStateByScope: { codex: persisted(iso(-TTL - 1)) },
    codexExhaustedWindowByScope: { codex: "7d" },
  });
  for (let i = 0; i < 2; i++) {
    cache.hydrateCodexQuotaCacheForRequest(c, NORMAL);
    assert.equal(cache.getQuotaWindowStatus(c.id, "weekly"), null);
    assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, NORMAL).blocked, false);
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), false);
  }
});

for (const observedAt of [null, "invalid-observation"]) {
  test(`undated persisted metadata cannot replace known health (${observedAt})`, async () => {
    const c = await connection(true, {
      codexQuotaStateByScope: { codex: persisted(observedAt) },
      codexExhaustedWindowByScope: { codex: "7d" },
    });
    cache.setQuotaCache(c.id, "codex", { session: quota(100), weekly: quota(100) });
    cache.hydrateCodexQuotaCacheForRequest(c, NORMAL);
    assert.equal(status(c.id, "weekly").remainingPercentage, 100);
  });
}

test("fresh actual 429 reblocks after stale evidence was admitted as unknown", async (t) => {
  const c = await connection(false, {
    codexQuotaStateByScope: { codex: persisted(iso(-TTL - 1), 0) },
  });
  t.mock.timers.setTime(NOW - TTL - 1);
  cache.setQuotaCache(c.id, "codex", { session: quota(0), weekly: quota(0) });
  t.mock.timers.setTime(NOW);
  assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), false);
  cache.markAccountExhaustedFrom429(c.id, "codex");
  cache.hydrateCodexQuotaCacheForRequest(c, NORMAL);
  assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), true);
  assert.equal(getQuotaCacheState().healthyUntil.has(c.id), false);
  t.mock.timers.setTime(NOW + TTL);
  assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), false);
});

for (const [freshModel, oldModel, oldWindow, freshWindow] of [
  [NORMAL, SPARK, "gpt_5_3_codex_spark_session", "session"],
  [SPARK, NORMAL, "session", "gpt_5_3_codex_spark_session"],
]) {
  test(`new ${freshModel} snapshot cannot renew stale ${oldModel} evidence`, async (t) => {
    const c = await connection(true);
    t.mock.timers.setTime(NOW - TTL - 1);
    saveSnapshot(c.id, oldWindow, 0);
    t.mock.timers.setTime(NOW);
    saveSnapshot(c.id, freshWindow, 0);
    cache.__clearForTests();
    assert.equal(cache.getQuotaWindowStatus(c.id, oldWindow), null);
    assert.equal(status(c.id, freshWindow).reachedThreshold, true);
    assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, oldModel).blocked, false);
    assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, freshModel).blocked, true);
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", oldModel), false);
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", freshModel), true);
  });
}

test("hydrating a healthy sibling cannot clear a fresh denial in the requested scope", async () => {
  const c = await connection(true, {
    codexQuotaStateByScope: { codex: persisted(iso(), 0), spark: persisted(iso()) },
    codexExhaustedWindowByScope: { spark: "7d" },
  });
  for (const model of [SPARK, NORMAL, SPARK]) cache.hydrateCodexQuotaCacheForRequest(c, model);
  assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, NORMAL).blocked, false);
  assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, SPARK).blocked, true);
  assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), false);
  assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", SPARK), true);
});

test("ignored older metadata cannot change a fresh denial's park deadline", async () => {
  const c = await connection(true, {
    codexQuotaStateByScope: { codex: persisted(iso(-60_000)) },
    codexExhaustedWindowByScope: { codex: "7d" },
  });
  cache.setQuotaCache(c.id, "codex", { session: quota(0), weekly: quota(0) });
  const deadline = cache.getQuotaCache(c.id)?.nextResetAt;
  assert.ok(deadline, "fresh exhausted windows must have a park deadline");
  cache.hydrateCodexQuotaCacheForRequest(c, NORMAL);
  assert.equal(cache.getQuotaCache(c.id)?.nextResetAt, deadline);
});

test("future-dated Codex observations are unknown rather than an indefinite denial", (t) => {
  t.mock.timers.setTime(NOW + 60_000);
  cache.setQuotaCache("synthetic-future-clock", "codex", { weekly: quota(0) });
  t.mock.timers.setTime(NOW);
  assert.equal(cache.getQuotaWindowStatus("synthetic-future-clock", "weekly"), null);
  assert.equal(cache.isQuotaExhaustedForRequest("synthetic-future-clock", "codex", NORMAL), false);
});

test("windowless actual 429 uses the same bounded observation age", (t) => {
  cache.markAccountExhaustedFrom429("synthetic-windowless-age", "codex");
  assert.equal(cache.isQuotaExhaustedForRequest("synthetic-windowless-age", "codex", NORMAL), true);
  t.mock.timers.setTime(NOW + TTL);
  assert.equal(
    cache.isQuotaExhaustedForRequest("synthetic-windowless-age", "codex", NORMAL),
    false
  );
  t.mock.timers.setTime(NOW - 1);
  assert.equal(
    cache.isQuotaExhaustedForRequest("synthetic-windowless-age", "codex", NORMAL),
    false
  );
});

test("Codex exhaustion expires at exactly the existing five-minute boundary", (t) => {
  cache.setQuotaCache("synthetic-ttl-boundary", "codex", { session: quota(0), weekly: quota(0) });
  t.mock.timers.setTime(NOW + TTL - 1);
  assert.equal(cache.isAccountQuotaExhausted("synthetic-ttl-boundary"), true);
  assert.equal(status("synthetic-ttl-boundary", "weekly").reachedThreshold, true);
  t.mock.timers.setTime(NOW + TTL);
  assert.equal(cache.isAccountQuotaExhausted("synthetic-ttl-boundary"), false);
  assert.equal(cache.getQuotaWindowStatus("synthetic-ttl-boundary", "weekly"), null);
});

test("newer authoritative exhaustion replaces older healthy usage in either scope", async (t) => {
  const c = await connection(false, {
    codexQuotaStateByScope: { codex: persisted(iso()), spark: persisted(iso()) },
    codexExhaustedWindowByScope: { codex: "7d", spark: "7d" },
  });
  t.mock.timers.setTime(NOW - 60_000);
  cache.setQuotaCache(c.id, "codex", {
    session: quota(100),
    weekly: quota(100),
    gpt_5_3_codex_spark_session: quota(100),
    gpt_5_3_codex_spark_weekly: quota(100),
  });
  t.mock.timers.setTime(NOW);
  for (const model of [NORMAL, SPARK]) {
    cache.hydrateCodexQuotaCacheForRequest(c, model);
    assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", model), true);
  }
});

test("a fresh scope cannot redate an old hydrated sibling's exhaustion", async () => {
  const c = await connection(true, {
    codexQuotaStateByScope: {
      codex: persisted(iso(-TTL - 1)),
      spark: persisted(iso()),
    },
    codexExhaustedWindowByScope: { codex: "7d", spark: "7d" },
  });
  for (const model of [NORMAL, SPARK, NORMAL]) cache.hydrateCodexQuotaCacheForRequest(c, model);
  assert.equal(cache.getQuotaWindowStatus(c.id, "weekly"), null);
  assert.equal(status(c.id, "gpt_5_3_codex_spark_weekly").reachedThreshold, true);
  assert.equal(
    cache.getQuotaWindowObservation(c.id, "gpt_5_3_codex_spark_weekly")?.observedAt,
    iso()
  );
  assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), false);
  assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", SPARK), true);
});

test("non-Codex cached quota policy retains its existing behavior after five minutes", (t) => {
  t.mock.timers.setTime(NOW - TTL - 1);
  cache.setQuotaCache("synthetic-other-provider", "openai", { weekly: quota(0) });
  t.mock.timers.setTime(NOW);
  assert.equal(status("synthetic-other-provider", "weekly").reachedThreshold, true);
  assert.equal(
    cache.isQuotaExhaustedForRequest("synthetic-other-provider", "openai", NORMAL),
    true
  );
  assert.equal(
    auth.evaluateQuotaLimitPolicy("openai", {
      id: "synthetic-other-provider",
      providerSpecificData: {
        limitPolicy: { enabled: true, thresholdPercent: 99, windows: ["weekly"] },
      },
    }).blocked,
    true
  );
});

for (const policyEnabled of [true, false]) {
  for (const [scope, model, session, weekly] of [
    ["codex", NORMAL, "session", "weekly"],
    ["spark", SPARK, "gpt_5_3_codex_spark_session", "gpt_5_3_codex_spark_weekly"],
  ] as const) {
    test(`unknown-first ${scope} cannot outrank a fresh denial (policy ${policyEnabled})`, async (t) => {
      boundedParkFlag(t);
      const c = await connection(policyEnabled, {
        codexQuotaStateByScope: { [scope]: persisted(iso(-30_000)) },
        codexExhaustedWindowByScope: { [scope]: "7d" },
      });
      assert.equal(cache.getQuotaCache(c.id), null);
      cache.setQuotaCache(c.id, "codex", {
        [session]: { ...quota(0), fractionReported: false },
        [weekly]: { ...quota(0), fractionReported: false },
      });
      assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", model), false);
      cache.hydrateCodexQuotaCacheForRequest(c, model);
      assert.equal(
        cache.isQuotaExhaustedForRequest(c.id, "codex", model),
        true,
        "newer unknown timestamps must not outrank an actual fresh denial"
      );
      assert.equal(status(c.id, session).reachedThreshold, true);
      assert.equal(status(c.id, weekly).reachedThreshold, true);
      assert.equal(cache.getQuotaWindowObservation(c.id, weekly)?.observedAt, iso(-30_000));
      assert.equal(auth.evaluateQuotaLimitPolicy("codex", c, model).blocked, policyEnabled);
      assert.equal(
        (await auth.getProviderCredentials("codex", null, [c.id], model)).allRateLimited,
        true
      );
      t.mock.timers.setTime(NOW + TTL - 30_000);
      assert.equal(cache.getQuotaWindowStatus(c.id, weekly), null);
      assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", model), false);
      assert.equal(getQuotaCacheState().healthyUntil.has(c.id), false);
    });
  }
}

for (const start of ["cold", "warm", "warm repeated"] as const) {
  for (const remaining of [0, 50]) {
    test(`reported Codex ${remaining}% survives restart with ${start} stale snapshot`, async (t) => {
      const c = await connection(false);
      t.mock.timers.setTime(NOW - TTL * 2);
      if (start === "cold") saveSnapshot(c.id, "weekly", remaining);
      else cache.setQuotaCache(c.id, "codex", { weekly: quota(remaining) });
      if (start === "warm repeated") {
        for (let time = NOW - TTL * 2 + 60_000; time < NOW; time += 60_000) {
          t.mock.timers.setTime(time);
          cache.setQuotaCache(c.id, "codex", { weekly: quota(remaining) });
        }
      }
      t.mock.timers.setTime(NOW);
      if (start === "cold") cache.__clearForTests();
      cache.setQuotaCache(c.id, "codex", { weekly: quota(remaining) });
      assert.equal(status(c.id, "weekly").reachedThreshold, remaining === 0);
      const saved = latestSnapshot(c.id, "weekly");
      assert.equal(
        saved.createdAt ?? saved.created_at,
        iso(),
        "a fresh reported observation must renew an expired durable snapshot"
      );
      cache.__clearForTests();
      assert.equal(status(c.id, "weekly").remainingPercentage, remaining);
      assert.equal(cache.getQuotaWindowObservation(c.id, "weekly")?.observedAt, iso());
      assert.equal(cache.isQuotaExhaustedForRequest(c.id, "codex", NORMAL), remaining === 0);
      t.mock.timers.setTime(NOW + TTL);
      assert.equal(cache.getQuotaWindowStatus(c.id, "weekly"), null);
    });
  }
}

test("unchanged Codex snapshots deduplicate until exactly the freshness boundary", async (t) => {
  const c = await connection(false);
  cache.setQuotaCache(c.id, "codex", { weekly: quota(0) });
  t.mock.timers.setTime(NOW + TTL - 1);
  cache.setQuotaCache(c.id, "codex", { weekly: quota(0) });
  assert.equal(snapshotCount(c.id), 1, "fresh same-reset snapshots must remain deduplicated");
  t.mock.timers.setTime(NOW + TTL);
  cache.setQuotaCache(c.id, "codex", { weekly: quota(0) });
  assert.equal(snapshotCount(c.id), 2, "expired same-percentage snapshots need a fresh row");
  cache.__clearForTests();
  assert.equal(status(c.id, "weekly").reachedThreshold, true);
  assert.equal(cache.getQuotaWindowObservation(c.id, "weekly")?.observedAt, iso(TTL));
  t.mock.timers.setTime(NOW + TTL + 1);
  cache.setQuotaCache(c.id, "codex", { weekly: quota(0) });
  assert.equal(snapshotCount(c.id), 2);
});

for (const provider of ["codex", "openai"]) {
  test(`${provider}: same percentage with changed reset preserves provider-specific dedup`, async (t) => {
    const c = await connection(false);
    cache.setQuotaCache(c.id, provider, { weekly: quota(0) });
    t.mock.timers.setTime(NOW + 60_000);
    cache.setQuotaCache(c.id, provider, { weekly: quota(0) });
    assert.equal(snapshotCount(c.id), 1, "same percentage and reset must still deduplicate");
    t.mock.timers.setTime(NOW + 120_000);
    const changedReset = iso(7_200_000);
    cache.setQuotaCache(c.id, provider, { weekly: quota(0, changedReset) });
    const saved = latestSnapshot(c.id, "weekly");
    assert.equal(
      saved.nextResetAt ?? saved.next_reset_at,
      provider === "codex" ? changedReset : iso(3_600_000),
      "Codex reset changes must survive restart without changing generic dedup"
    );
    assert.equal(snapshotCount(c.id), provider === "codex" ? 2 : 1);
    cache.__clearForTests();
    assert.equal(
      status(c.id, "weekly").resetAt,
      provider === "codex" ? changedReset : iso(3_600_000)
    );
  });
}

test("non-Codex same-percentage snapshots keep the global no-op dedup after five minutes", async (t) => {
  const c = await connection(false);
  cache.setQuotaCache(c.id, "openai", { weekly: quota(0) });
  t.mock.timers.setTime(NOW + TTL * 2);
  cache.setQuotaCache(c.id, "openai", { weekly: quota(0) });
  assert.equal(snapshotCount(c.id), 1);
  const saved = latestSnapshot(c.id, "weekly");
  assert.equal(saved.createdAt ?? saved.created_at, iso());
});
