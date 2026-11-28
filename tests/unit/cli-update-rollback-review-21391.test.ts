/**
 * Review findings on the managed update (PR #21391): each test pins one defect the review found,
 * so it fails on the code before the fix. Everything runs against temp directories or the
 * throwaway fixture install; no real service, npm prefix or data directory is touched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  preflightFor,
  setup,
  startOldServer,
  teardown,
  waitForPing,
} from "../helpers/managedUpdateFixture.ts";

const tx = await import("../../bin/cli/updateTransaction.mjs");
const update = await import("../../bin/cli/commands/update.mjs");

const OPERATION_ID = "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f";
const OTHER_OPERATION_ID = "11111111-2222-4333-8444-555555555555";
// The fixture install reads /proc and pins a Linux pre-flight; elsewhere these cases cannot run.
const LINUX_ONLY = process.platform !== "linux" && "the managed update only runs on Linux";

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

// ---------------------------------------------------------------------------------------
// Thread 4: data the snapshot cannot capture is refused before the service stops.
// ---------------------------------------------------------------------------------------

test("data links that leave DATA_DIR are found; links that stay inside and the state dir are not", () => {
  const root = tmp("omni-tx-links-");
  try {
    const dataDir = path.join(root, "data");
    const bigDisk = path.join(root, "bigdisk");
    fs.mkdirSync(path.join(dataDir, "inner"), { recursive: true });
    fs.mkdirSync(path.join(dataDir, "managed-update"));
    fs.mkdirSync(bigDisk);
    fs.symlinkSync(bigDisk, path.join(dataDir, "storage-link"));
    fs.symlinkSync("inner", path.join(dataDir, "ok-relative"));
    fs.symlinkSync(path.join(dataDir, "inner"), path.join(dataDir, "ok-absolute"));
    fs.symlinkSync(path.join(root, "gone"), path.join(dataDir, "dangling-external"));
    fs.symlinkSync("missing-inside", path.join(dataDir, "dangling-inside"));
    fs.symlinkSync("../../bigdisk", path.join(dataDir, "inner", "deep-link"));
    fs.symlinkSync(bigDisk, path.join(dataDir, "managed-update", "ignored"));
    const found = (dir: string) =>
      tx
        .findExternalDataSymlinks(dir)
        .map((file: string) => path.relative(dir, file))
        .sort();
    const expected = ["dangling-external", "inner/deep-link", "storage-link"];
    assert.deepEqual(found(dataDir), expected);
    // A DATA_DIR that is itself reached through a link is fine: only what leaves it counts.
    const viaLink = path.join(root, "data-link");
    fs.symlinkSync(dataDir, viaLink);
    assert.deepEqual(found(viaLink), expected);
    assert.deepEqual(found(bigDisk), [], "a directory with no links has nothing to report");
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test(
  "prepare refuses an external data link before the service stops, and the CLI says why",
  {
    skip: LINUX_ONLY,
  },
  async () => {
    const env = await setup();
    try {
      const oldPid = startOldServer(env);
      assert.equal(await waitForPing(env.port), true);
      const elsewhere = path.join(env.root, "other-disk");
      fs.mkdirSync(elsewhere);
      fs.symlinkSync(elsewhere, path.join(env.dataDir, "logs"));
      const plan = makePlan({ readinessTimeoutMs: 2_500, pollIntervalMs: 100 });
      const pre = await preflightFor(env, plan);
      assert.equal(pre.kind, "ok", JSON.stringify(pre));
      const deps = tx.createDefaultDependencies({
        plan,
        runtime: pre.runtime,
        environment: pre.environment,
      });
      assert.deepEqual(await deps.prepare(plan), {
        kind: "refused",
        reason: "external-data-symlink",
      });
      process.kill(oldPid, 0); // still alive: throws if it was stopped
      assert.equal(await waitForPing(env.port), true);
    } finally {
      teardown(env);
    }
  }
);

test("the CLI explains the external-link refusal in words", async () => {
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
        wait: async () => ({
          status: "unsupported",
          reason: "external-data-symlink",
          refused: true,
        }),
      },
    });
    assert.equal(result.exitCode, 1);
    assert.match(lines.join("\n"), /symbolic link.*outside the data directory/);
  } finally {
    Object.assign(console, orig);
  }
});

// ---------------------------------------------------------------------------------------
// Thread 5: a process is signalled only when its identity is tied to THIS install.
// ---------------------------------------------------------------------------------------

test("process identity: the install root matches on a path boundary, never as a substring", () => {
  const root = "/usr/lib/node_modules/omniroute";
  const cmd = (...argv: string[]) => argv.join("\0") + "\0";
  const classify = (...argv: string[]) =>
    tx.classifyServerProcess(4100, root, { readFileSync: () => cmd(...argv) });
  assert.equal(classify("/usr/bin/node", `${root}/dist/server.js`), "ours");
  assert.equal(
    classify("/usr/bin/node", "--max-old-space-size=512", `${root}/dist/server.js`),
    "ours"
  );
  // A sibling install whose directory name starts with ours.
  assert.equal(
    classify("/usr/bin/node", "/usr/lib/node_modules/omniroute-canary/dist/server.js"),
    "foreign"
  );
  // The root named inside an option value or as a prefix of another name proves nothing.
  assert.equal(classify("/usr/bin/node", `--log=${root}/x.log`, "/srv/other/server.js"), "foreign");
  assert.equal(classify("/usr/bin/node", `${root}-old/server.js`), "foreign");
});

test("process identity: a symlinked install root is matched through its real path", () => {
  const classify = (script: string) =>
    tx.classifyServerProcess(4100, "/usr/local/lib/node_modules/omniroute", {
      readFileSync: () => ["/usr/bin/node", script].join("\0") + "\0",
      realpathSync: (p: string) =>
        p === "/usr/local/lib/node_modules/omniroute" ? "/opt/lib/node_modules/omniroute" : p,
    });
  assert.equal(classify("/opt/lib/node_modules/omniroute/dist/server.js"), "ours");
  assert.equal(classify("/opt/lib/node_modules/omniroute-canary/dist/server.js"), "foreign");
});

test("process identity: a bare omniroute title needs a working directory inside this install", () => {
  const root = "/usr/lib/node_modules/omniroute";
  const classify = (cwd: string | Error) =>
    tx.classifyServerProcess(4100, root, {
      readFileSync: () => "omniroute (v3.8.54)\0\0\0\0",
      readlinkSync: () => {
        if (cwd instanceof Error) throw cwd;
        return cwd;
      },
    });
  assert.equal(classify(`${root}/dist`), "ours");
  assert.equal(classify(root), "ours");
  assert.equal(classify("/usr/lib/node_modules/omniroute-canary/dist"), "foreign");
  assert.equal(classify("/srv/somewhere-else"), "foreign");
  // The title is all there is and the directory cannot be read: ambiguous, so never signalled.
  assert.equal(classify(new Error("EACCES")), "unknown");
});

// ---------------------------------------------------------------------------------------
// Thread 6: updates are serialized by package tree as well as by data directory.
// ---------------------------------------------------------------------------------------

test("two daemons that share one package tree cannot update at the same time", async () => {
  const root = tmp("omni-tx-pkglock-");
  try {
    const packageRoot = path.join(root, "lib", "node_modules", "omniroute");
    fs.mkdirSync(packageRoot, { recursive: true });
    const daemon = (name: string, operationId: string) => {
      const dataDir = path.join(root, name);
      fs.mkdirSync(dataDir);
      const plan = makePlan({ operationId });
      const deps = tx.createDefaultDependencies({
        plan,
        runtime: {
          dataDir,
          packageRoot,
          shape: "daemon",
          port: 20128,
          oldPids: [],
          nodePath: process.execPath,
          npmPath: "npm",
        },
        environment: {},
      });
      return { dataDir, plan, deps };
    };
    const a = daemon("data-a", OPERATION_ID);
    const b = daemon("data-b", OTHER_OPERATION_ID);
    const lockA = await a.deps.acquireLock(a.plan);
    // Refused at the lock, which is before prepare and before any service is stopped.
    await assert.rejects(
      b.deps.acquireLock(b.plan),
      (err: { code?: string }) => err.code === "update-in-progress"
    );
    assert.equal(
      fs.existsSync(path.join(b.dataDir, "managed-update", "lock")),
      false,
      "the refused update does not keep its own data lock"
    );
    // The CLI pre-flight of the second daemon already sees the package lock.
    const context = tx.createDefaultPreflightContext({ dataDir: b.dataDir, packageRoot });
    assert.equal(context.lockHeld(), true);
    await lockA.release();
    assert.equal(context.lockHeld(), false);
    assert.equal(tx.isLockHeld(a.dataDir), false);
    const lockB = await b.deps.acquireLock(b.plan);
    await lockB.release();
    assert.deepEqual(
      fs.readdirSync(path.dirname(packageRoot)),
      ["omniroute"],
      "no lock file is left next to the package"
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------------------
// Thread 7: npm must install where the pre-flight verified.
// ---------------------------------------------------------------------------------------

test(
  "prepare refuses an npm that would install somewhere else, before the service stops",
  {
    skip: LINUX_ONLY,
  },
  async () => {
    const env = await setup();
    try {
      const oldPid = startOldServer(env);
      assert.equal(await waitForPing(env.port), true);
      const plan = makePlan({ readinessTimeoutMs: 2_500, pollIntervalMs: 100 });
      const pre = await preflightFor(env, plan);
      assert.equal(pre.kind, "ok", JSON.stringify(pre));
      const cases: Array<[string, Record<string, string>]> = [
        // The daemon's own environment resolves another global prefix.
        [
          "another prefix",
          { FAKE_NPM_GLOBAL_ROOT: path.join(env.root, "other", "lib", "node_modules") },
        ],
        ["npm root cannot be read", { FAKE_NPM_ROOT_FAILS: "1" }],
      ];
      for (const [label, extra] of cases) {
        const deps = tx.createDefaultDependencies({
          plan,
          runtime: pre.runtime,
          environment: { ...pre.environment, ...extra },
        });
        assert.deepEqual(
          await deps.prepare(plan),
          { kind: "refused", reason: "npm-prefix-mismatch" },
          label
        );
      }
      // The same environment without the override passes.
      const ok = tx.createDefaultDependencies({
        plan,
        runtime: pre.runtime,
        environment: pre.environment,
      });
      assert.deepEqual(await ok.prepare(plan), { kind: "ok" });
      process.kill(oldPid, 0); // still alive: throws if it was stopped
      assert.equal(await waitForPing(env.port), true);
    } finally {
      teardown(env);
    }
  }
);

test("the global npm root can be resolved with the npm and the environment of the install", async () => {
  const root = tmp("omni-tx-npmroot-");
  try {
    const npm = path.join(root, "npm-stub");
    fs.writeFileSync(npm, '#!/bin/sh\necho "$STUB_ROOT"\n', { mode: 0o755 });
    assert.equal(
      await tx.resolveGlobalNpmRoot({
        npmPath: npm,
        env: { PATH: "/usr/bin:/bin", STUB_ROOT: "/x/lib" },
      }),
      "/x/lib"
    );
    assert.equal(
      await tx.resolveGlobalNpmRoot({
        npmPath: npm,
        env: { PATH: "/usr/bin:/bin", STUB_ROOT: "" },
      }),
      null
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("the CLI explains the npm prefix refusal in words", async () => {
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
        wait: async () => ({ status: "unsupported", reason: "npm-prefix-mismatch", refused: true }),
      },
    });
    assert.equal(result.exitCode, 1);
    assert.match(lines.join("\n"), /different global location/);
  } finally {
    Object.assign(console, orig);
  }
});

// ---------------------------------------------------------------------------------------
// Thread 8: a coordinator that cannot be spawned is a recorded launch failure.
// ---------------------------------------------------------------------------------------

class FakeChild extends EventEmitter {
  pid = 777;
  unrefs = 0;
  unref() {
    this.unrefs += 1;
  }
}

function launchInput(dataDir: string, nodePath = "/usr/bin/node") {
  return {
    plan: makePlan(),
    runtime: {
      dataDir,
      packageRoot: "/usr/lib/node_modules/omniroute",
      shape: "daemon",
      port: 20128,
      oldPids: [4100],
      nodePath,
      npmPath: "npm",
    },
    environment: { PATH: "/usr/bin" },
  };
}

test("launch reports acceptance only after the child has spawned, and detaches it then", async () => {
  const dataDir = tmp("omni-tx-launch-ok-");
  try {
    const child = new FakeChild();
    let spawnedEmitted = false;
    const launched = tx.launchManagedUpdateCoordinator(launchInput(dataDir), {
      spawn: () => {
        setTimeout(() => {
          spawnedEmitted = true;
          child.emit("spawn");
        }, 20);
        return child;
      },
    });
    const result = await launched;
    assert.equal(spawnedEmitted, true, "acceptance waited for the spawn event");
    assert.equal(result.operationId, OPERATION_ID);
    assert.equal(child.unrefs, 1);
    // A late error on a child that did start must not become an unhandled event.
    child.emit("error", new Error("late"));
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("a spawn error is recorded as a terminal launch failure and rejects the launch", async () => {
  const dataDir = tmp("omni-tx-launch-fail-");
  try {
    await assert.rejects(
      tx.launchManagedUpdateCoordinator(launchInput(dataDir), {
        spawn: () => {
          const child = new FakeChild();
          setTimeout(
            () => child.emit("error", Object.assign(new Error("spawn ENOENT"), { code: "ENOENT" })),
            10
          );
          return child;
        },
      }),
      (err: { code?: string }) => err.code === "launch-failed"
    );
    const state = tx.readManagedUpdateState(dataDir, OPERATION_ID);
    assert.equal(state.status, "unsupported");
    assert.equal(state.phase, "finished");
    assert.equal(state.reason, "launch-failed");
    assert.equal(state.refused, true);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("a node binary that does not exist is a launch failure, not an uncaught exception", async () => {
  const dataDir = tmp("omni-tx-launch-real-");
  const runtimeRoot = tmp("omni-tx-launch-real-pkg-");
  try {
    const input = launchInput(dataDir, path.join(runtimeRoot, "no-such-node"));
    input.runtime.packageRoot = runtimeRoot;
    await assert.rejects(
      tx.launchManagedUpdateCoordinator(input),
      (err: { code?: string }) => err.code === "launch-failed"
    );
    assert.equal(tx.readManagedUpdateState(dataDir, OPERATION_ID).reason, "launch-failed");
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
    fs.rmSync(runtimeRoot, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------------------
// Remaining branches of the review fixes.
// ---------------------------------------------------------------------------------------

test("lock: a reclaim guard with unreadable content belongs to nobody and is taken over", async () => {
  const dataDir = tmp("omni-tx-lock-garbage-guard-");
  try {
    const lockFile = path.join(dataDir, "managed-update", "lock");
    fs.mkdirSync(path.dirname(lockFile), { recursive: true });
    fs.writeFileSync(lockFile, lockBody(OTHER_OPERATION_ID, DEAD_PID));
    fs.writeFileSync(`${lockFile}.reclaim`, "not a pid");
    const lock = await tx.acquireFileLock(dataDir, OPERATION_ID, {
      isPidAlive: (pid: number) => pid === process.pid,
    });
    assert.equal(JSON.parse(fs.readFileSync(lockFile, "utf8")).operationId, OPERATION_ID);
    await lock.release();
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("the coordinator log line carries the recovery steps of a verdict it could not persist", async () => {
  const dir = tmp("omni-tx-main-steps-");
  try {
    const planFile = path.join(dir, `plan-${OPERATION_ID}.json`);
    fs.writeFileSync(
      planFile,
      JSON.stringify({ plan: makePlan(), runtime: { dataDir: dir, packageRoot: dir } })
    );
    const h = happyDeps(async (state) => {
      if (state.phase === "finished") throw enospc();
    });
    h.deps.installTarget = async () => {
      throw new Error("npm exited with 1");
    };
    h.deps.restorePrevious = async () => {
      throw new Error("copy back failed");
    };
    const logged: string[] = [];
    const code = await tx.coordinatorMain(planFile, dir, {
      createDependencies: () => h.deps,
      log: (line: string) => logged.push(line),
    });
    assert.equal(code, 3);
    assert.match(logged[0], /manual-recovery \(restore-failed\)/);
    assert.match(logged[0], /Recovery: Stop OmniRoute/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
