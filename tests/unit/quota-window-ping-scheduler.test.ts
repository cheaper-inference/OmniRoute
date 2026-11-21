/**
 * Quota window ping scheduler: lazy boot, kill switch,
 * due-target claiming, in-flight/fingerprint dedupe, failure cooldown, and the reused
 * daily/interval schedule helper including a DST gap.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qwp-scheduler-"));

const {
  runQuotaWindowPingTick,
  startQuotaWindowPingScheduler,
  stopQuotaWindowPingScheduler,
  refreshQuotaWindowPingScheduler,
  isQuotaWindowPingSchedulerArmed,
  createQuotaWindowPingSchedulerState,
} = await import("../../src/lib/services/quotaWindowPingScheduler.ts");
const { nextWakeupAt } = await import("../../src/lib/services/codexWakeupSchedule.ts");
const { normalizeResetKey } = await import("../../src/lib/services/quotaAutoPing.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  stopQuotaWindowPingScheduler(createQuotaWindowPingSchedulerState());
  resetDbInstance();
});

const NOW_MS = Date.parse("2026-01-01T12:00:00.000Z");
const NOW_ISO = new Date(NOW_MS).toISOString();
const FAR_RESET = new Date(NOW_MS + 5 * 60 * 60 * 1000).toISOString();
const FAR_FINGERPRINT = normalizeResetKey(FAR_RESET);
const COMPLETED_SSE =
  'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n';

const iso = (ms: number) => new Date(ms).toISOString();

function makeTarget(id, overrides = {}) {
  return {
    id,
    connectionId: `conn-${id}`,
    provider: "codex",
    model: null,
    windowId: "session",
    descriptorId: "codex:session",
    enabled: true,
    schedule: { kind: "interval", minutes: 5 },
    minLongerWindowRemainingPct: 0,
    dryRun: false,
    claudeBillableConfirmed: false,
    lastPingedFingerprint: null,
    lastPingAt: null,
    failureAt: null,
    nextRunAt: NOW_ISO,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
    ...overrides,
  };
}

function makeConnection(id) {
  return {
    id,
    provider: "codex",
    authType: "oauth",
    accessToken: "access-token",
    isActive: true,
    testStatus: null,
    providerSpecificData: {},
  };
}

function makeReading(resetAt = FAR_RESET) {
  return {
    provider: "codex",
    complete: true,
    stale: false,
    message: null,
    windows: {
      session: {
        reported: true,
        resetAt,
        remainingPct: 40,
        exhausted: false,
        windowSeconds: 18000,
      },
      weekly: {
        reported: true,
        resetAt,
        remainingPct: 100,
        exhausted: false,
        windowSeconds: 604800,
      },
    },
  };
}

function makeRun(fields) {
  return {
    id: fields.id,
    targetId: fields.targetId,
    connectionId: fields.connectionId,
    descriptorId: fields.descriptorId,
    windowId: fields.windowId,
    trigger: fields.trigger,
    status: fields.status,
    reason: fields.reason ?? null,
    fingerprint: fields.fingerprint ?? null,
    dryRun: fields.dryRun ?? false,
    detail: fields.detail ?? null,
    startedAt: fields.startedAt ?? NOW_ISO,
    finishedAt: fields.finishedAt ?? null,
    leaseExpiresAt: fields.leaseExpiresAt ?? NOW_MS + 75_000,
  };
}

function makeStore(targets) {
  const map = new Map(targets.map((target) => [target.id, { ...target }]));
  const live = new Set();
  const runs = [];
  const calls = { list: 0, claims: [], recovered: 0, finished: 0, pinged: [], failed: [] };
  let seq = 0;

  return {
    map,
    live,
    runs,
    calls,
    targets: map,
    listWindowPingTargets() {
      calls.list += 1;
      return [...map.values()].map((target) => ({ ...target }));
    },
    getWindowPingTarget(id) {
      const target = map.get(id);
      return target ? { ...target } : null;
    },
    countEnabledWindowPingTargets() {
      return [...map.values()].filter((target) => target.enabled).length;
    },
    claimWindowPingRun(targetId, trigger, nowMs, computeNextRunAt) {
      calls.claims.push([targetId, trigger]);
      const target = map.get(targetId);
      if (!target) {
        const error = new Error("not_found");
        error.code = "not_found";
        throw error;
      }
      if (trigger === "scheduled") {
        const dueMs = target.nextRunAt ? Date.parse(target.nextRunAt) : NaN;
        if (!target.enabled || !target.schedule || !Number.isFinite(dueMs) || dueMs > nowMs) {
          return { kind: "not_due" };
        }
        target.nextRunAt = computeNextRunAt(target.schedule, nowMs);
      }
      if (live.has(targetId)) {
        const run = makeRun({
          id: `run-${++seq}`,
          targetId,
          connectionId: target.connectionId,
          descriptorId: target.descriptorId,
          windowId: target.windowId,
          trigger,
          status: "skipped",
          reason: "in_flight",
          dryRun: target.dryRun,
          startedAt: iso(nowMs),
          finishedAt: iso(nowMs),
          leaseExpiresAt: nowMs,
        });
        runs.push(run);
        return { kind: "in_flight", run: { ...run } };
      }
      const run = makeRun({
        id: `run-${++seq}`,
        targetId,
        connectionId: target.connectionId,
        descriptorId: target.descriptorId,
        windowId: target.windowId,
        trigger,
        status: "running",
        dryRun: target.dryRun,
        startedAt: iso(nowMs),
        leaseExpiresAt: nowMs + 75_000,
      });
      runs.push(run);
      live.add(targetId);
      return { kind: "claimed", claim: { run: { ...run }, target: { ...target } } };
    },
    finishWindowPingRun(runId, nowMs, outcome) {
      calls.finished += 1;
      const run = runs.find((entry) => entry.id === runId);
      if (!run) return null;
      run.status = outcome.status;
      run.reason = outcome.reason;
      run.fingerprint = outcome.fingerprint;
      run.dryRun = outcome.dryRun === undefined ? run.dryRun : outcome.dryRun;
      run.detail = outcome.detail ?? null;
      run.finishedAt = iso(nowMs);
      live.delete(run.targetId);
      return { ...run };
    },
    renewWindowPingRunLease(runId, nowMs) {
      const run = runs.find((entry) => entry.id === runId);
      if (!run || run.status !== "running") return false;
      run.leaseExpiresAt = nowMs + 75_000;
      return true;
    },
    recoverWindowPingRuns() {
      calls.recovered += 1;
      return 0;
    },
    listWindowPingRuns() {
      return runs.map((run) => ({ ...run }));
    },
    markWindowPingTargetPinged(targetId, fingerprint, nowMs) {
      calls.pinged.push([targetId, fingerprint]);
      const target = map.get(targetId);
      if (!target) return;
      target.lastPingedFingerprint = fingerprint;
      target.lastPingAt = iso(nowMs);
      target.failureAt = null;
    },
    markWindowPingTargetFailed(targetId, nowMs) {
      calls.failed.push(targetId);
      const target = map.get(targetId);
      if (target) target.failureAt = iso(nowMs);
    },
  };
}

function makeDeps(options = {}) {
  const store = options.store ?? makeStore([makeTarget("a")]);
  const calls = {
    settings: 0,
    execute: [],
    saveCallLog: 0,
    usage: 0,
    throttles: 0,
    updates: [],
  };
  const state = options.settingsState ?? { settings: { quotaWindowPing: { enabled: true } } };
  const deps = {
    getSettings: async () => {
      calls.settings += 1;
      return state.settings;
    },
    getProviderConnectionById: async (connectionId) => makeConnection(connectionId),
    updateProviderConnection: async (id, data) => {
      calls.updates.push([id, data]);
      return null;
    },
    refreshAndUpdateCredentials: async (connection) => ({ connection }),
    fetchUsage: async () => {
      calls.usage += 1;
      return options.reading ?? makeReading(options.resetAt ?? FAR_RESET);
    },
    throttleQuotaFetch: async () => {
      calls.throttles += 1;
    },
    resolveProxyForConnection: async () => ({ proxy: null }),
    runWithProxyContext: async (_proxy, callback) => callback(),
    getExecutor: async () => ({
      execute: async (input) => {
        calls.execute.push(input);
        if (options.executorResult) return options.executorResult;
        return {
          status: 200,
          response: { ok: true, status: 200, text: async () => COMPLETED_SSE },
          url: "https://upstream.example/ping",
        };
      },
    }),
    resolvePingModel: async () => "gpt-5.1-codex",
    canExecuteProvider: () => true,
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
    saveCallLog: async () => {
      calls.saveCallLog += 1;
    },
    store,
  };
  return { deps, calls, store, state };
}

test("kill switch off: no interval, no tick, no target query", async () => {
  const store = makeStore([makeTarget("a")]);
  const { deps, calls } = makeDeps({
    store,
    settingsState: { settings: { quotaWindowPing: { enabled: false } } },
  });
  const state = createQuotaWindowPingSchedulerState();

  await startQuotaWindowPingScheduler(deps, state, () => NOW_MS);

  assert.equal(state.interval, null);
  assert.equal(isQuotaWindowPingSchedulerArmed(state), false);
  assert.equal(calls.settings, 1, "one settings read is the entire startup cost");
  assert.equal(store.calls.list, 0);
  assert.equal(store.calls.recovered, 0);
  assert.equal(calls.execute.length, 0);
});

test("switch on with zero enabled targets: lazy no-op, no interval", async () => {
  const store = makeStore([makeTarget("a", { enabled: false })]);
  const { deps, calls } = makeDeps({ store });
  const state = createQuotaWindowPingSchedulerState();

  await startQuotaWindowPingScheduler(deps, state, () => NOW_MS);

  assert.equal(state.interval, null);
  assert.equal(calls.settings, 1);
  assert.equal(store.calls.list, 0, "no target query when the count is zero");
  assert.equal(calls.execute.length, 0);
});

test("one enabled target arms the interval and stop clears it", async () => {
  const store = makeStore([makeTarget("a", { nextRunAt: iso(NOW_MS + 60 * 60 * 1000) })]);
  const { deps } = makeDeps({ store });
  const state = createQuotaWindowPingSchedulerState();

  await startQuotaWindowPingScheduler(deps, state, () => NOW_MS);
  assert.notEqual(state.interval, null);
  assert.equal(isQuotaWindowPingSchedulerArmed(state), true);

  stopQuotaWindowPingScheduler(state);
  assert.equal(state.interval, null);
  assert.equal(isQuotaWindowPingSchedulerArmed(state), false);
});

test("a tick re-reads the switch and self-stops a process that missed the write", async () => {
  const store = makeStore([makeTarget("a")]);
  const { deps, state: settings } = makeDeps({ store });
  const state = createQuotaWindowPingSchedulerState();
  state.interval = setInterval(() => {}, 60_000);
  state.interval.unref?.();

  settings.settings = { quotaWindowPing: { enabled: false } };
  await runQuotaWindowPingTick(deps, state, () => NOW_MS);

  assert.equal(state.interval, null);
  assert.equal(store.calls.recovered, 1, "orphans are recovered before the switch is read");
  assert.equal(store.calls.claims.length, 0);
});

test("refresh disarms after the last target is disabled and re-arms on enable", async () => {
  const target = makeTarget("a", { nextRunAt: iso(NOW_MS + 60 * 60 * 1000) });
  const store = makeStore([target]);
  const { deps } = makeDeps({ store });
  const state = createQuotaWindowPingSchedulerState();

  await refreshQuotaWindowPingScheduler(deps, state, () => NOW_MS);
  assert.equal(isQuotaWindowPingSchedulerArmed(state), true);

  store.map.get("a").enabled = false;
  await refreshQuotaWindowPingScheduler(deps, state, () => NOW_MS);
  assert.equal(isQuotaWindowPingSchedulerArmed(state), false);

  store.map.get("a").enabled = true;
  await refreshQuotaWindowPingScheduler(deps, state, () => NOW_MS);
  assert.equal(isQuotaWindowPingSchedulerArmed(state), true);

  stopQuotaWindowPingScheduler(state);
});

test("tick claims only enabled and due targets and advances next_run_at", async () => {
  const due = makeTarget("a");
  const future = makeTarget("b", { nextRunAt: iso(NOW_MS + 60 * 60 * 1000) });
  const disabled = makeTarget("c", { enabled: false });
  const store = makeStore([due, future, disabled]);
  const { deps, calls } = makeDeps({ store });

  const started = await runQuotaWindowPingTick(
    deps,
    createQuotaWindowPingSchedulerState(),
    () => NOW_MS
  );

  assert.equal(started, 1);
  assert.deepEqual(
    store.calls.claims.map(([id]) => id),
    ["a"]
  );
  assert.equal(calls.execute.length, 1);
  assert.equal(store.map.get("a").nextRunAt, iso(NOW_MS + 5 * 60 * 1000));
  assert.equal(store.map.get("b").nextRunAt, iso(NOW_MS + 60 * 60 * 1000));
  assert.equal(store.map.get("c").nextRunAt, NOW_ISO, "a disabled target is never touched");
});

test("a missed slot runs once and is never replayed", async () => {
  const target = makeTarget("a", { nextRunAt: iso(NOW_MS - 24 * 60 * 60 * 1000) });
  target.schedule = { kind: "interval", minutes: 60 };
  const store = makeStore([target]);
  const { deps, calls } = makeDeps({ store });
  const state = createQuotaWindowPingSchedulerState();

  const first = await runQuotaWindowPingTick(deps, state, () => NOW_MS);
  assert.equal(first, 1);
  assert.equal(calls.execute.length, 1);
  assert.equal(store.map.get("a").nextRunAt, iso(NOW_MS + 60 * 60 * 1000));

  const second = await runQuotaWindowPingTick(deps, state, () => NOW_MS);
  assert.equal(second, 0);
  assert.equal(calls.execute.length, 1);
});

test("two due targets with one live run: only the free target pings", async () => {
  const first = makeTarget("a");
  const second = makeTarget("b");
  const store = makeStore([first, second]);
  store.live.add("a");
  const { deps, calls } = makeDeps({ store });

  const started = await runQuotaWindowPingTick(
    deps,
    createQuotaWindowPingSchedulerState(),
    () => NOW_MS
  );

  assert.equal(started, 1, "the in_flight claim is not counted as a started ping");
  assert.equal(calls.execute.length, 1);
  const inFlightRun = store.runs.find((run) => run.targetId === "a");
  assert.equal(inFlightRun.status, "skipped");
  assert.equal(inFlightRun.reason, "in_flight");
  const pingedRun = store.runs.find((run) => run.targetId === "b");
  assert.equal(pingedRun.status, "succeeded");
});

test("the same reset is pinged once across two ticks", async () => {
  const target = makeTarget("a");
  const store = makeStore([target]);
  const { deps, calls } = makeDeps({ store });

  const first = await runQuotaWindowPingTick(
    deps,
    createQuotaWindowPingSchedulerState(),
    () => NOW_MS
  );
  assert.equal(first, 1);
  assert.equal(store.map.get("a").lastPingedFingerprint, FAR_FINGERPRINT);

  store.map.get("a").nextRunAt = NOW_ISO;
  const second = await runQuotaWindowPingTick(
    deps,
    createQuotaWindowPingSchedulerState(),
    () => NOW_MS
  );

  assert.equal(second, 1, "the second tick still claims (and audits) the due target");
  assert.equal(calls.execute.length, 1, "but no second request is sent");
  const last = store.runs[store.runs.length - 1];
  assert.equal(last.status, "skipped");
  assert.equal(last.reason, "already_pinged_reset");
});

test("a failed ping sets failure_at and blocks the retry for 15 minutes", async () => {
  const target = makeTarget("a");
  const store = makeStore([target]);
  const callCount = { executed: 0 };
  const { deps, calls } = makeDeps({
    store,
    executorResult: {
      status: 500,
      response: { ok: false, status: 500, body: { cancel: async () => {} } },
      url: "https://upstream.example/ping",
    },
  });
  const state = createQuotaWindowPingSchedulerState();

  const first = await runQuotaWindowPingTick(deps, state, () => NOW_MS);
  assert.equal(first, 1);
  callCount.executed += calls.execute.length;
  assert.equal(store.map.get("a").failureAt, NOW_ISO);
  const failedRun = store.runs[store.runs.length - 1];
  assert.equal(failedRun.status, "failed");
  assert.equal(failedRun.reason, "not_completed");

  store.map.get("a").nextRunAt = NOW_ISO;
  const second = await runQuotaWindowPingTick(deps, state, () => NOW_MS);
  assert.equal(second, 1);
  assert.equal(calls.execute.length, 1, "the cooldown retry sends no request");
  const coolingRun = store.runs[store.runs.length - 1];
  assert.equal(coolingRun.status, "skipped");
  assert.equal(coolingRun.reason, "breaker_cooling");
});

test("daily HH:mm weekday in an IANA zone, including a DST spring-forward gap", () => {
  const mondayTokyo = nextWakeupAt(
    { kind: "daily", time: "08:30", timezone: "Asia/Tokyo", days: [1] },
    Date.parse("2026-03-02T00:00:00.000Z")
  );
  assert.equal(mondayTokyo, "2026-03-08T23:30:00.000Z");

  // 2026-03-08 02:30 America/New_York does not exist (spring forward); the slot is
  // skipped, not shifted, and the next Sunday is used.
  const dstGap = nextWakeupAt(
    { kind: "daily", time: "02:30", timezone: "America/New_York", days: [0] },
    Date.parse("2026-03-07T12:00:00.000Z")
  );
  assert.equal(dstGap, "2026-03-15T06:30:00.000Z");

  const interval = nextWakeupAt({ kind: "interval", minutes: 5 }, NOW_MS);
  assert.equal(interval, new Date(NOW_MS + 5 * 60 * 1000).toISOString());
});

test("a daily target's claim advances to the next zoned wall-clock slot", async () => {
  const after = Date.parse("2026-03-02T00:00:00.500Z"); // Monday 09:00 Asia/Tokyo
  const target = makeTarget("a", {
    schedule: { kind: "daily", time: "08:30", timezone: "Asia/Tokyo", days: [1] },
    nextRunAt: "2026-03-02T00:00:00.000Z",
  });
  const store = makeStore([target]);
  const { deps } = makeDeps({ store });

  const started = await runQuotaWindowPingTick(
    deps,
    createQuotaWindowPingSchedulerState(),
    () => after
  );

  assert.equal(started, 1);
  assert.equal(store.map.get("a").nextRunAt, "2026-03-08T23:30:00.000Z");
});
