/**
 * Review findings on the managed update (PR #21391): each test pins one defect the review found,
 * so it fails on the code before the fix. Everything runs against temp directories or the
 * throwaway fixture install; no real service, npm prefix or data directory is touched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tx = await import("../../bin/cli/updateTransaction.mjs");
const update = await import("../../bin/cli/commands/update.mjs");

const OPERATION_ID = "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f";
const OTHER_OPERATION_ID = "11111111-2222-4333-8444-555555555555";

function makePlan(overrides: Record<string, unknown> = {}) {
  return {
    operationId: OPERATION_ID,
    previousVersion: "3.8.54",
    targetVersion: "3.8.55",
    readinessTimeoutMs: 5_000,
    pollIntervalMs: 500,
    ...overrides,
  };
}

function tmp(prefix: string) {
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), prefix)));
}

function makePreflightContext(overrides: Record<string, unknown> = {}) {
  return {
    platform: "linux",
    isContainer: () => false,
    isElectron: () => false,
    packageRoot: "/usr/lib/node_modules/omniroute",
    globalRoot: async () => "/usr/lib/node_modules",
    realpath: (p: string) => p,
    installedVersion: () => "3.8.54",
    dataDir: "/data/omniroute",
    service: async () => ({
      shape: "daemon",
      serverPid: 4100,
      supervisorPid: null,
      environment: { DATA_DIR: "/data/omniroute", PORT: "20128", HOME: "/home/x" },
    }),
    lockHeld: () => false,
    diskHeadroom: async () => ({ ok: true }),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------------------
// Thread 1: an update in progress is refused even when the service is already stopped.
// ---------------------------------------------------------------------------------------

test("pre-flight refuses a held lock before it looks at the service, the version or the install", async () => {
  // While a managed update runs, its coordinator has stopped the service (no pid file) and may
  // be replacing the package. None of the "unsupported" answers may win over the lock: they
  // would send the command down the standard flow and install outside the transaction.
  const during: Array<[string, Record<string, unknown>]> = [
    ["service already stopped", { service: async () => null }],
    ["package being replaced", { installedVersion: () => "3.8.55" }],
    ["global root briefly unreadable", { globalRoot: async () => null }],
  ];
  for (const [label, overrides] of during) {
    const result = await tx.preflightManagedUpdate(
      makePreflightContext({ lockHeld: () => true, ...overrides }),
      makePlan()
    );
    assert.deepEqual(result, { kind: "refused", reason: "update-in-progress" }, label);
  }
  // Without a lock the same environments keep the standard flow.
  const free = await tx.preflightManagedUpdate(
    makePreflightContext({ service: async () => null }),
    makePlan()
  );
  assert.deepEqual(free, { kind: "unsupported", reason: "no-managed-service" });
});

test("the CLI stops on a held lock instead of running the standard install", async () => {
  const lines: string[] = [];
  const orig = { log: console.log, error: console.error, warn: console.warn };
  const push = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  console.log = push;
  console.error = push;
  console.warn = push;
  try {
    const result = await update.runManagedUpdateFromCli({
      current: "3.8.54",
      latest: "3.8.55",
      deps: {
        preflight: async (plan: unknown) =>
          tx.preflightManagedUpdate(
            makePreflightContext({ lockHeld: () => true, service: async () => null }),
            plan
          ),
      },
    });
    assert.deepEqual(result, { handled: true, exitCode: 1 });
    assert.match(lines.join("\n"), /another managed update is already running/);
  } finally {
    Object.assign(console, orig);
  }
});

// ---------------------------------------------------------------------------------------
// Thread 2: the terminal verdict has to be durable, or the failure has to be visible.
// ---------------------------------------------------------------------------------------

type FakeState = { status: string; phase: string };

function happyDeps(record: (state: FakeState) => Promise<void> | void) {
  let clock = 0;
  const calls = { discard: 0, sleeps: [] as number[] };
  const deps = {
    now: () => clock,
    sleep: async (ms: number) => {
      calls.sleeps.push(ms);
      clock += ms;
    },
    record,
    acquireLock: async () => ({ release: async () => {} }),
    prepare: async () => ({ kind: "ok" }),
    stopOld: async () => ({ stopped: true, pids: [4100] }),
    snapshot: async () => ({ id: "s", path: "/snap/data", packagePath: "/snap/package" }),
    installTarget: async () => {},
    start: async () => ({ pid: 5200 }),
    probe: async (e: { expectedVersion: string }) => ({
      status: "ready" as const,
      pid: 5200,
      version: e.expectedVersion,
    }),
    stopCandidate: async () => ({ stopped: true, pids: [5200] }),
    restorePrevious: async () => {},
    discardSnapshot: async () => {
      calls.discard += 1;
    },
  };
  return { deps, calls };
}

const enospc = () =>
  Object.assign(new Error("ENOSPC: no space left on device"), { code: "ENOSPC" });

test("a terminal write that fails is retried within a bound and then succeeds", async () => {
  const stored: FakeState[] = [];
  let terminalFailures = 2;
  const h = happyDeps(async (state) => {
    if (state.phase === "finished" && terminalFailures-- > 0) throw enospc();
    stored.push(state);
  });
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "updated");
  assert.equal(outcome.persisted, undefined, "a durable verdict carries no warning");
  assert.equal(stored.at(-1)?.status, "updated");
  assert.equal(stored.at(-1)?.phase, "finished");
});

test("a terminal write that never succeeds is reported as not persisted, after a bounded number of tries", async () => {
  let terminalAttempts = 0;
  const stored: FakeState[] = [];
  const h = happyDeps(async (state) => {
    if (state.phase === "finished") {
      terminalAttempts += 1;
      throw enospc();
    }
    stored.push(state);
  });
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  // The verdict is still the real one; what changed is that nobody can read it from the file.
  assert.equal(outcome.status, "updated");
  assert.equal(outcome.persisted, false);
  assert.equal(terminalAttempts, 3);
  assert.equal(stored.at(-1)?.status, "running", "the last durable record is the interim one");
});

test("a failed manual-recovery write keeps the recovery steps on the in-memory outcome", async () => {
  const h = happyDeps(async (state) => {
    if (state.phase === "finished") throw enospc();
  });
  h.deps.installTarget = async () => {
    throw new Error("npm exited with 1");
  };
  h.deps.restorePrevious = async () => {
    throw new Error("copy back failed");
  };
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "manual-recovery");
  assert.equal(outcome.persisted, false);
  assert.ok(outcome.recovery.steps.length > 0, "the operator can still be told what to do");
  assert.equal(h.calls.discard, 0, "recovery data is never discarded on this path");
});

test("interim records stay best effort", async () => {
  const stored: FakeState[] = [];
  let first = true;
  const h = happyDeps(async (state) => {
    if (first) {
      first = false;
      stored.push(state);
      return;
    }
    if (state.phase !== "finished") throw enospc();
    stored.push(state);
  });
  const outcome = await tx.runManagedUpdate(makePlan(), h.deps);
  assert.equal(outcome.status, "updated");
  assert.equal(outcome.persisted, undefined);
  assert.equal(stored.at(-1)?.phase, "finished");
});

test("the state store removes its partial temp file when the write fails, so a retry has room", () => {
  const dataDir = tmp("omni-tx-state-fail-");
  try {
    const store = tx.createStateStore(dataDir, OPERATION_ID);
    store.record({ operationId: OPERATION_ID, status: "running", phase: "installing" });
    // A directory where the file belongs makes the final rename fail after the temp file exists.
    const file = path.join(store.dir, "state.json");
    fs.rmSync(file);
    fs.mkdirSync(path.join(file, "keep"), { recursive: true });
    assert.throws(() => store.record({ operationId: OPERATION_ID, status: "updated" }));
    const leftovers = fs.readdirSync(store.dir).filter((name) => name.endsWith(".tmp"));
    assert.deepEqual(leftovers, []);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("the coordinator exits 3 and logs the verdict when it could not be persisted", async () => {
  const dir = tmp("omni-tx-main-");
  try {
    const planFile = path.join(dir, `plan-${OPERATION_ID}.json`);
    fs.writeFileSync(
      planFile,
      JSON.stringify({ plan: makePlan(), runtime: { dataDir: dir, packageRoot: dir } })
    );
    const logged: string[] = [];
    const run = (failTerminal: boolean) => {
      const h = happyDeps(async (state) => {
        if (failTerminal && state.phase === "finished") throw enospc();
      });
      return tx.coordinatorMain(planFile, dir, {
        createDependencies: () => h.deps,
        log: (line: string) => logged.push(line),
      });
    };
    assert.equal(await run(false), 0);
    assert.deepEqual(logged, []);
    assert.equal(await run(true), 3);
    assert.equal(logged.length, 1);
    assert.match(logged[0], new RegExp(OPERATION_ID));
    assert.match(logged[0], /updated/);
    assert.match(logged[0], /could not be written/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the CLI points at the coordinator log when the wait ends without a verdict", async () => {
  const lines: string[] = [];
  const orig = { log: console.log, error: console.error, warn: console.warn };
  const push = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  console.log = push;
  console.error = push;
  console.warn = push;
  try {
    const result = await update.runManagedUpdateFromCli({
      current: "3.8.54",
      latest: "3.8.55",
      deps: {
        preflight: async () => ({ kind: "ok", runtime: {}, environment: {} }),
        launch: async () => ({}),
        wait: async () => ({ status: "running", phase: "verifying", timedOut: true }),
      },
    });
    assert.equal(result.exitCode, 1);
    assert.match(lines.join("\n"), /coordinator\.log/);
  } finally {
    Object.assign(console, orig);
  }
});

// ---------------------------------------------------------------------------------------
// Thread 3: reclaiming a stale lock must never remove a replacement lock.
// ---------------------------------------------------------------------------------------

const DEAD_PID = 999_999;

function lockBody(operationId: string, pid: number) {
  return JSON.stringify({ operationId, pid, at: new Date().toISOString() });
}

test("lock: a coordinator that read a dead holder cannot remove the lock another one put in its place", async () => {
  const dataDir = tmp("omni-tx-lock-race-");
  try {
    const lockFile = path.join(dataDir, "managed-update", "lock");
    fs.mkdirSync(path.dirname(lockFile), { recursive: true });
    fs.writeFileSync(lockFile, lockBody("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", DEAD_PID));
    let replaced = false;
    // The check on the dead holder is the interleaving point: right after this coordinator
    // learned the holder is dead, another one reclaims the lock and writes its own.
    const isPidAlive = (pid: number) => {
      if (pid === DEAD_PID) {
        if (!replaced) {
          replaced = true;
          fs.unlinkSync(lockFile);
          fs.writeFileSync(lockFile, lockBody(OTHER_OPERATION_ID, process.pid), { flag: "wx" });
        }
        return false;
      }
      return pid === process.pid;
    };
    await assert.rejects(
      tx.acquireFileLock(dataDir, OPERATION_ID, { isPidAlive }),
      (err: { code?: string }) => err.code === "update-in-progress"
    );
    assert.equal(JSON.parse(fs.readFileSync(lockFile, "utf8")).operationId, OTHER_OPERATION_ID);
    assert.equal(fs.existsSync(`${lockFile}.reclaim`), false, "the reclaim guard is released");
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("lock: a dead holder is still reclaimed, and an unreadable lock file counts as dead", async () => {
  const dataDir = tmp("omni-tx-lock-reclaim-");
  try {
    const lockFile = path.join(dataDir, "managed-update", "lock");
    fs.mkdirSync(path.dirname(lockFile), { recursive: true });
    const alive = (pid: number) => pid === process.pid;
    fs.writeFileSync(lockFile, lockBody(OTHER_OPERATION_ID, DEAD_PID));
    const first = await tx.acquireFileLock(dataDir, OPERATION_ID, { isPidAlive: alive });
    assert.equal(JSON.parse(fs.readFileSync(lockFile, "utf8")).operationId, OPERATION_ID);
    await first.release();
    fs.writeFileSync(lockFile, "{ not json");
    const second = await tx.acquireFileLock(dataDir, OPERATION_ID, { isPidAlive: alive });
    await second.release();
    assert.equal(fs.existsSync(lockFile), false);
    assert.deepEqual(
      fs.readdirSync(path.dirname(lockFile)).filter((name) => name.endsWith(".tmp")),
      [],
      "no temp file is left next to the lock"
    );
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("lock: another coordinator reclaiming right now is a refusal, and its dead guard is taken over", async () => {
  const dataDir = tmp("omni-tx-lock-guard-");
  try {
    const lockFile = path.join(dataDir, "managed-update", "lock");
    const guard = `${lockFile}.reclaim`;
    fs.mkdirSync(path.dirname(lockFile), { recursive: true });
    fs.writeFileSync(lockFile, lockBody(OTHER_OPERATION_ID, DEAD_PID));
    // A live process holds the reclaim guard: this one must not touch the lock.
    fs.writeFileSync(guard, String(process.pid));
    const alive = (pid: number) => pid === process.pid;
    await assert.rejects(
      tx.acquireFileLock(dataDir, OPERATION_ID, { isPidAlive: alive }),
      (err: { code?: string }) => err.code === "update-in-progress"
    );
    assert.equal(JSON.parse(fs.readFileSync(lockFile, "utf8")).operationId, OTHER_OPERATION_ID);
    // The guard's own holder died inside the critical section: the guard is taken over.
    fs.writeFileSync(guard, String(DEAD_PID));
    const lock = await tx.acquireFileLock(dataDir, OPERATION_ID, { isPidAlive: alive });
    assert.equal(JSON.parse(fs.readFileSync(lockFile, "utf8")).operationId, OPERATION_ID);
    assert.equal(fs.existsSync(guard), false);
    await lock.release();
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});
