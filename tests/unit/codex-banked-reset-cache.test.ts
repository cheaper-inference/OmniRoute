import test from "node:test";
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
