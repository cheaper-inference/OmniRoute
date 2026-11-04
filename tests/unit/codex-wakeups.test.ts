/**
 * Scheduled Codex account wakeups — persistence (claim/lease/recovery) and the scheduler.
 *
 * The store runs against a throwaway DATA_DIR SQLite file. The per-account ping goes
 * through injected deps (no network, no real executor), and every timer the service
 * arms is cleared before the call returns, so nothing keeps the test process alive.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { CodexWakeupDeps } from "../../src/lib/services/codexWakeups.ts";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-wakeups-"));
process.env.DATA_DIR = directory;
process.env.APP_LOG_TO_FILE = "false";

const store = await import("../../src/lib/db/codexWakeups.ts");
const service = await import("../../src/lib/services/codexWakeups.ts");
const { nextWakeupAt } = await import("../../src/lib/services/codexWakeupSchedule.ts");
const { resetDbInstance, getDbInstance } = await import("../../src/lib/db/core.ts");

test.after(async () => {
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  flushProxyLogsSync();
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test.beforeEach(() => {
  const db = getDbInstance();
  db.prepare("DELETE FROM codex_wakeup_runs").run();
  db.prepare("DELETE FROM codex_wakeup_tasks").run();
});

const T0 = Date.parse("2026-03-10T09:00:00.000Z");
const COMPLETED_SSE =
  'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n';
const RESET_AT = "2026-03-10T13:00:30.000Z";

type Conn = Record<string, unknown>;

function taskInput(overrides: Record<string, unknown> = {}) {
  return {
    name: "Warm-up",
    connectionIds: ["codex-1"],
    enabled: true,
    schedule: { kind: "interval" as const, minutes: 60 },
    ...overrides,
  };
}

function createDueTask(overrides: Record<string, unknown> = {}) {
  return store.createCodexWakeupTask(taskInput(overrides), new Date(T0 - 1000).toISOString(), T0);
}

function connection(id: string, extra: Conn = {}): Conn {
  return { id, provider: "codex", authType: "oauth", isActive: true, accessToken: "tok", ...extra };
}

function buildDeps(overrides: Record<string, unknown> = {}, connections: Conn[] = []) {
  const rows = new Map(
    (connections.length ? connections : [connection("codex-1")]).map((c) => [c.id, c])
  );
  const calls = {
    execute: [] as Record<string, unknown>[],
    update: [] as [string, Record<string, unknown>][],
    usage: 0,
  };
  const deps = {
    getSettings: async () => ({}),
    getProviderConnections: async () => [...rows.values()],
    getProviderConnectionById: async (id: string) => rows.get(id) ?? null,
    updateProviderConnection: async (id: string, data: Record<string, unknown>) => {
      calls.update.push([id, data]);
      return null;
    },
    refreshAndUpdateCredentials: async (c: Conn) => ({ connection: c }),
    getCodexUsage: async () => {
      calls.usage += 1;
      return { quotas: { session: { used: 1, total: 100, remaining: 99, resetAt: RESET_AT } } };
    },
    throttleQuotaFetch: async () => {},
    resolveProxyForConnection: async () => ({ proxy: null }),
    runWithProxyContext: async (_proxy: unknown, callback: () => Promise<unknown>) => callback(),
    getExecutor: async () => ({
      execute: async (input: Record<string, unknown>) => {
        calls.execute.push(input);
        return { response: { ok: true, text: async () => COMPLETED_SSE } };
      },
    }),
    canExecuteProvider: () => true,
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
    resolvePingModel: async () => "gpt-test-codex",
    store: service.createDbCodexWakeupStore(),
    ...overrides,
  };
  // The fixture fakes only what the service touches; cast once at the boundary.
  return { deps: deps as unknown as CodexWakeupDeps, calls };
}

// --- store --------------------------------------------------------------------

test("store round-trips a task and lists it", () => {
  const created = createDueTask({ name: "Daily", connectionIds: ["a", "b"] });
  const listed = store.listCodexWakeupTasks();
  assert.equal(listed.length, 1);
  assert.deepEqual(listed[0], created);
  assert.deepEqual(created.connectionIds, ["a", "b"]);
  assert.equal(created.enabled, true);
  assert.deepEqual(created.schedule, { kind: "interval", minutes: 60 });
});

test("a scheduled claim needs a due, enabled task and advances next_run_at", () => {
  const notDue = store.createCodexWakeupTask(taskInput(), new Date(T0 + 60_000).toISOString(), T0);
  assert.equal(store.claimCodexWakeupRun(notDue.id, "scheduled", T0, nextWakeupAt), null);
  const disabled = createDueTask({ enabled: false });
  assert.equal(store.claimCodexWakeupRun(disabled.id, "scheduled", T0, nextWakeupAt), null);

  const due = createDueTask();
  const claim = store.claimCodexWakeupRun(due.id, "scheduled", T0, nextWakeupAt);
  assert.ok(claim);
  assert.equal(claim.run.status, "running");
  assert.equal(claim.run.trigger, "scheduled");
  assert.equal(store.getCodexWakeupTask(due.id)?.nextRunAt, "2026-03-10T10:00:00.000Z");
});

test("a live run blocks a second claim of the same task (lease)", () => {
  const task = createDueTask();
  assert.ok(store.claimCodexWakeupRun(task.id, "manual", T0, nextWakeupAt));
  assert.equal(store.claimCodexWakeupRun(task.id, "manual", T0 + 1000, nextWakeupAt), null);
  assert.throws(
    () => store.updateCodexWakeupTask(task.id, taskInput(), null, T0 + 1000),
    (err: unknown) => err instanceof store.CodexWakeupStoreError && err.code === "running"
  );
  assert.throws(
    () => store.deleteCodexWakeupTask(task.id, T0 + 1000),
    (err: unknown) => err instanceof store.CodexWakeupStoreError && err.code === "running"
  );
});

test("a manual claim leaves the schedule untouched", () => {
  const task = createDueTask();
  assert.ok(store.claimCodexWakeupRun(task.id, "manual", T0, nextWakeupAt));
  assert.equal(store.getCodexWakeupTask(task.id)?.nextRunAt, task.nextRunAt);
});

test("an orphaned running run is recovered as interrupted once its lease expires", () => {
  const task = createDueTask();
  const claim = store.claimCodexWakeupRun(task.id, "manual", T0, nextWakeupAt);
  assert.ok(claim);
  assert.equal(store.recoverCodexWakeupRuns(T0 + 1000), 0, "lease still live");
  assert.equal(store.recoverCodexWakeupRuns(claim.run.leaseExpiresAt), 1);
  const [run] = store.listCodexWakeupRuns();
  assert.equal(run.status, "interrupted");
  assert.ok(run.finishedAt);
  // Results recorded after recovery are dropped: the run is no longer running.
  store.recordCodexWakeupResult(claim.run.id, {
    connectionId: "codex-1",
    status: "succeeded",
    reason: "completed",
    durationMs: 1,
  });
  assert.deepEqual(store.listCodexWakeupRuns()[0].results, []);
});

test("finishing a run derives its status from the per-account results", () => {
  const cases: [string[], string][] = [
    [["succeeded", "succeeded"], "succeeded"],
    [["succeeded", "skipped"], "partial"],
    [["failed"], "failed"],
    [[], "interrupted"],
  ];
  for (const [statuses, expected] of cases) {
    const task = createDueTask();
    const claim = store.claimCodexWakeupRun(task.id, "manual", T0, nextWakeupAt);
    assert.ok(claim);
    for (const status of statuses) {
      store.recordCodexWakeupResult(claim.run.id, {
        connectionId: "c",
        status: status as "succeeded",
        reason: "completed",
        durationMs: 5,
      });
    }
    assert.equal(store.finishCodexWakeupRun(claim.run.id, T0 + 10)?.status, expected);
  }
});

test("run history is pruned to the newest finished runs", () => {
  const task = createDueTask();
  for (let i = 0; i < store.CODEX_WAKEUP_MAX_RUNS + 5; i += 1) {
    const claim = store.claimCodexWakeupRun(task.id, "manual", T0 + i * 1000, nextWakeupAt);
    assert.ok(claim);
    store.finishCodexWakeupRun(claim.run.id, T0 + i * 1000 + 1);
  }
  const count = getDbInstance().prepare("SELECT COUNT(*) AS n FROM codex_wakeup_runs").get() as {
    n: number;
  };
  assert.equal(count.n, store.CODEX_WAKEUP_MAX_RUNS);
});

test("deleting a task removes it and its runs; unknown ids are not_found", () => {
  const task = createDueTask();
  const claim = store.claimCodexWakeupRun(task.id, "manual", T0, nextWakeupAt);
  assert.ok(claim);
  store.finishCodexWakeupRun(claim.run.id, T0 + 1);
  store.deleteCodexWakeupTask(task.id, T0 + 2);
  assert.equal(store.getCodexWakeupTask(task.id), null);
  assert.equal(store.listCodexWakeupRuns().length, 0);
  assert.throws(
    () => store.deleteCodexWakeupTask(task.id, T0 + 3),
    (err: unknown) => err instanceof store.CodexWakeupStoreError && err.code === "not_found"
  );
});

// --- per-account ping -----------------------------------------------------------

test("wakeup ping sends one Codex ping and records the quota window", async () => {
  const { deps, calls } = buildDeps();
  const result = await service.pingCodexAccountForWakeup(
    "codex-1",
    deps,
    service.createCodexWakeupState()
  );
  assert.deepEqual(result, { status: "succeeded", reason: "completed" });
  assert.equal(calls.execute.length, 1);
  assert.equal(calls.execute[0].model, "gpt-test-codex");
  assert.ok(calls.execute[0].signal instanceof AbortSignal);
  assert.equal(calls.update[0][1].lastPingedResetKey, "2026-03-10T13:00:00.000Z");
});

test("wakeup ping skips exhausted session or weekly quota without sending", async () => {
  for (const quotas of [
    { session: { remaining: 0, resetAt: RESET_AT } },
    { session: { remaining: 50, resetAt: RESET_AT }, weekly: { remaining: 0 } },
  ]) {
    const { deps, calls } = buildDeps({ getCodexUsage: async () => ({ quotas }) });
    const result = await service.pingCodexAccountForWakeup(
      "codex-1",
      deps,
      service.createCodexWakeupState()
    );
    assert.deepEqual(result, { status: "skipped", reason: "quota_exhausted" });
    assert.equal(calls.execute.length, 0);
  }
});

test("wakeup ping honours the circuit breaker, exclusive leases and connection cooldown", async () => {
  for (const [overrides, conn] of [
    [{ canExecuteProvider: () => false }, connection("codex-1")],
    [{ isConnectionUnavailableToAuxiliaryActivity: async () => true }, connection("codex-1")],
    [{}, connection("codex-1", { rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() })],
  ] as [Record<string, unknown>, Conn][]) {
    const { deps, calls } = buildDeps(overrides, [conn]);
    const result = await service.pingCodexAccountForWakeup(
      "codex-1",
      deps,
      service.createCodexWakeupState()
    );
    assert.deepEqual(result, { status: "skipped", reason: "unavailable" });
    assert.equal(calls.usage, 0);
  }
});

test("wakeup ping rejects removed, non-Codex and inactive accounts before any I/O", async () => {
  const cases: [Conn[], string, string][] = [
    [[connection("other")], "codex-1", "not_found"],
    [[connection("codex-1", { provider: "claude" })], "codex-1", "unsupported"],
    [[connection("codex-1", { authType: "apikey" })], "codex-1", "unsupported"],
    [[connection("codex-1", { isActive: false })], "codex-1", "inactive"],
  ];
  for (const [rows, id, reason] of cases) {
    const { deps, calls } = buildDeps({}, rows);
    const result = await service.pingCodexAccountForWakeup(
      id,
      deps,
      service.createCodexWakeupState()
    );
    assert.deepEqual(result, { status: "skipped", reason });
    assert.equal(calls.usage, 0);
  }
});

test("wakeup ping fails when the 200 stream never carries response.completed", async () => {
  const { deps, calls } = buildDeps({
    getExecutor: async () => ({
      execute: async () => ({
        response: { ok: true, text: async () => 'data: {"type":"error"}\n\n' },
      }),
    }),
  });
  const result = await service.pingCodexAccountForWakeup(
    "codex-1",
    deps,
    service.createCodexWakeupState()
  );
  assert.deepEqual(result, { status: "failed", reason: "not_completed" });
  assert.equal(calls.update.length, 0);
});

test("wakeup ping allows one ping per account and releases the lock after a timeout", async () => {
  const state = service.createCodexWakeupState();
  state.inFlight.add("codex-1");
  const busy = buildDeps();
  assert.deepEqual(await service.pingCodexAccountForWakeup("codex-1", busy.deps, state), {
    status: "skipped",
    reason: "busy",
  });
  state.inFlight.clear();

  state.pingTimeoutMs = 20;
  const { deps } = buildDeps({
    getExecutor: async () => ({ execute: () => new Promise(() => {}) }),
  });
  assert.deepEqual(await service.pingCodexAccountForWakeup("codex-1", deps, state), {
    status: "failed",
    reason: "timeout",
  });
  assert.equal(state.inFlight.has("codex-1"), false);
});

test("wakeup ping maps a thrown error to a fixed reason without leaking it", async () => {
  const { deps } = buildDeps({
    getCodexUsage: async () => {
      throw new Error("boom at /secret/path.ts:1:1");
    },
  });
  const result = await service.pingCodexAccountForWakeup(
    "codex-1",
    deps,
    service.createCodexWakeupState()
  );
  assert.deepEqual(result, { status: "failed", reason: "error" });
});

// --- scheduler tick ---------------------------------------------------------------

test("the tick runs only due tasks, records each account and advances the schedule", async () => {
  const due = createDueTask({ connectionIds: ["codex-1", "codex-2"] });
  const later = store.createCodexWakeupTask(
    taskInput({ name: "Later" }),
    new Date(T0 + 3_600_000).toISOString(),
    T0
  );
  const { deps, calls } = buildDeps({}, [connection("codex-1"), connection("codex-2")]);
  const state = service.createCodexWakeupState();

  assert.equal(await service.runCodexWakeupTick(deps, state, () => T0), 1);
  await service.waitForCodexWakeupRuns(state);

  assert.equal(calls.execute.length, 2);
  const runs = store.listCodexWakeupRuns();
  assert.equal(runs.length, 1);
  assert.equal(runs[0].taskId, due.id);
  assert.equal(runs[0].status, "succeeded");
  assert.deepEqual(
    runs[0].results.map((r) => [r.connectionId, r.status, r.reason]),
    [
      ["codex-1", "succeeded", "completed"],
      ["codex-2", "succeeded", "completed"],
    ]
  );
  assert.equal(store.getCodexWakeupTask(due.id)?.nextRunAt, "2026-03-10T10:00:00.000Z");
  assert.equal(store.getCodexWakeupTask(later.id)?.nextRunAt, later.nextRunAt);
});

test("a schedule missed while the server was down runs once, not once per missed slot", async () => {
  // Due 5 hours ago on an hourly interval: one run, then the next slot is counted from now.
  const task = store.createCodexWakeupTask(
    taskInput(),
    new Date(T0 - 5 * 3_600_000).toISOString(),
    T0
  );
  const { deps, calls } = buildDeps();
  const state = service.createCodexWakeupState();
  assert.equal(await service.runCodexWakeupTick(deps, state, () => T0), 1);
  await service.waitForCodexWakeupRuns(state);
  assert.equal(await service.runCodexWakeupTick(deps, state, () => T0 + 1000), 0);
  await service.waitForCodexWakeupRuns(state);
  assert.equal(calls.execute.length, 1);
  assert.equal(store.getCodexWakeupTask(task.id)?.nextRunAt, "2026-03-10T10:00:00.000Z");
});

test("a re-entrant tick is a no-op and disabled tasks never run", async () => {
  createDueTask({ enabled: false });
  const { deps, calls } = buildDeps();
  const state = service.createCodexWakeupState();
  state.ticking = true;
  createDueTask();
  assert.equal(await service.runCodexWakeupTick(deps, state, () => T0), 0);
  state.ticking = false;
  assert.equal(await service.runCodexWakeupTick(deps, state, () => T0), 1);
  await service.waitForCodexWakeupRuns(state);
  assert.equal(calls.execute.length, 1);
});

test("the tick recovers an expired orphaned run before claiming", async () => {
  const task = createDueTask();
  const orphan = store.claimCodexWakeupRun(task.id, "manual", T0 - 3_600_000, nextWakeupAt);
  assert.ok(orphan);
  const { deps } = buildDeps();
  const state = service.createCodexWakeupState();
  assert.equal(await service.runCodexWakeupTick(deps, state, () => T0), 1);
  await service.waitForCodexWakeupRuns(state);
  const statuses = store.listCodexWakeupRuns().map((run) => [run.id === orphan.run.id, run.status]);
  assert.deepEqual(statuses.sort(), [
    [false, "succeeded"],
    [true, "interrupted"],
  ]);
});

test("run now starts a manual run and refuses a second one while it is live", async () => {
  const task = createDueTask();
  const { deps } = buildDeps({
    getExecutor: async () => ({ execute: () => new Promise(() => {}) }),
  });
  const state = service.createCodexWakeupState();
  state.pingTimeoutMs = 30;
  const run = service.runCodexWakeupTaskNow(task.id, deps, state, () => T0);
  assert.ok(run);
  assert.equal(run.trigger, "manual");
  assert.equal(
    service.runCodexWakeupTaskNow(task.id, deps, state, () => T0),
    null
  );
  await service.waitForCodexWakeupRuns(state);
  assert.equal(store.listCodexWakeupRuns()[0].status, "failed");
  assert.equal(store.getCodexWakeupTask(task.id)?.nextRunAt, task.nextRunAt);
});

test("account validation reports ids that are not active Codex OAuth connections", async () => {
  const { deps } = buildDeps({}, [
    connection("ok"),
    connection("inactive", { isActive: false }),
    connection("claude", { provider: "claude" }),
  ]);
  assert.deepEqual(
    await service.findUnusableWakeupAccounts(["ok", "inactive", "claude", "missing"], deps),
    ["inactive", "claude", "missing"]
  );
});
