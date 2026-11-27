/**
 * The managed update with its REAL dependencies (process control, snapshot and restore, package
 * swap, readiness probe, durable state) driven in this process against the throwaway fixture
 * install. The detached-coordinator test spawns a child, which coverage cannot see; this one
 * runs the same code where it can be measured. Fake servers are stopped by pid.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  installedVersion,
  preflightFor,
  setup,
  startOldServer,
  teardown,
  waitForPing,
  type Env,
} from "../helpers/managedUpdateFixture.ts";

const tx = await import("../../bin/cli/updateTransaction.mjs");

const OPERATION_ID = "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f";

function planFor(targetVersion: string, readinessTimeoutMs = 10_000) {
  return {
    operationId: OPERATION_ID,
    previousVersion: "3.8.54",
    targetVersion,
    readinessTimeoutMs,
    pollIntervalMs: 100,
  };
}

async function inProcess(
  env: Env,
  targetVersion: string,
  options: {
    readinessTimeoutMs?: number;
    tweak?: (deps: ReturnType<typeof tx.createDefaultDependencies>) => void;
  } = {}
) {
  const plan = planFor(targetVersion, options.readinessTimeoutMs);
  const pre = await preflightFor(env, plan);
  assert.equal(pre.kind, "ok", JSON.stringify(pre));
  // The runtime carries the fake npm; the environment is the fake service's explicit one.
  const deps = tx.createDefaultDependencies({
    plan,
    runtime: pre.runtime,
    environment: pre.environment,
  });
  options.tweak?.(deps);
  const outcome = await tx.runManagedUpdate(plan, deps);
  return { plan, outcome, state: tx.readManagedUpdateState(env.dataDir, OPERATION_ID), pre };
}

async function withService<T>(fn: (env: Env, oldPid: number) => Promise<T>): Promise<T> {
  const env = await setup();
  try {
    const oldPid = startOldServer(env);
    assert.equal(await waitForPing(env.port), true, "the fake old service must be up first");
    return await fn(env, oldPid);
  } finally {
    teardown(env);
  }
}

test("in process: a healthy target is swapped, proven ready, and the snapshot copies are discarded", async () => {
  await withService(async (env) => {
    const { outcome, state } = await inProcess(env, "3.8.55");
    assert.equal(outcome.status, "updated");
    assert.equal(outcome.runningVersion, "3.8.55");
    assert.equal(state.status, "updated");
    assert.equal(installedVersion(env), "3.8.55");
    assert.equal(
      fs.readFileSync(path.join(env.dataDir, "storage.sqlite"), "utf8"),
      "MIGRATED-BY-3.8.55"
    );
    const opDir = tx.operationDir(env.dataDir, OPERATION_ID);
    assert.equal(fs.existsSync(path.join(opDir, "data-snapshot")), false);
    assert.equal(fs.existsSync(path.join(opDir, "previous-package")), false);
    assert.equal(fs.existsSync(path.join(opDir, "install.log")), true);
    assert.equal(tx.isLockHeld(env.dataDir), false);
  });
});

test("in process: a target that migrates the data and then dies is rolled back, data restored", async () => {
  await withService(async (env) => {
    const { outcome, state } = await inProcess(env, "3.8.56");
    assert.equal(outcome.status, "rolled-back");
    assert.equal(outcome.reason, "target-not-ready");
    assert.equal(outcome.runningVersion, "3.8.54");
    assert.equal(installedVersion(env), "3.8.54");
    assert.equal(fs.readFileSync(path.join(env.dataDir, "storage.sqlite"), "utf8"), "ORIGINAL-DB");
    assert.equal(await waitForPing(env.port), true);
    const opDir = tx.operationDir(env.dataDir, OPERATION_ID);
    assert.equal(
      fs.readFileSync(path.join(opDir, "candidate-data", "storage.sqlite"), "utf8"),
      "MIGRATED-BY-3.8.56"
    );
    assert.equal(state.status, "rolled-back");
    assert.equal(state.reason, "target-not-ready");
  });
});

test("in process: a partial npm install error restores the package and restarts the previous version", async () => {
  await withService(async (env) => {
    const { outcome } = await inProcess(env, "3.8.57");
    assert.equal(outcome.status, "rolled-back");
    assert.equal(outcome.reason, "install-failed");
    assert.equal(installedVersion(env), "3.8.54");
    assert.ok(fs.existsSync(path.join(env.packageRoot, "bin", "omniroute.mjs")));
    assert.equal(await waitForPing(env.port), true);
    const opDir = tx.operationDir(env.dataDir, OPERATION_ID);
    assert.match(fs.readFileSync(path.join(opDir, "install.log"), "utf8"), /partial install/);
  });
});

test("in process: a target the registry does not have is refused before anything stops", async () => {
  await withService(async (env, oldPid) => {
    const { outcome } = await inProcess(env, "9.9.9", { readinessTimeoutMs: 2_000 });
    assert.equal(outcome.status, "unsupported");
    assert.equal(outcome.reason, "target-unavailable");
    assert.equal(outcome.refused, true);
    process.kill(oldPid, 0); // still alive: throws if it was stopped
    assert.equal(await waitForPing(env.port), true);
  });
});

test("in process: a service that went away after the pre-flight is refused as service-changed", async () => {
  await withService(async (env, oldPid) => {
    const plan = planFor("3.8.55", 2_000);
    const pre = await preflightFor(env, plan);
    assert.equal(pre.kind, "ok");
    process.kill(oldPid, "SIGKILL");
    const deadline = Date.now() + 10_000;
    while (Date.now() < deadline) {
      try {
        process.kill(oldPid, 0);
      } catch {
        break;
      }
      await new Promise((r) => setTimeout(r, 50));
    }
    const deps = tx.createDefaultDependencies({
      plan,
      runtime: pre.runtime,
      environment: pre.environment,
    });
    const outcome = await tx.runManagedUpdate(plan, deps);
    assert.equal(outcome.status, "unsupported");
    assert.equal(outcome.reason, "service-changed");
    assert.equal(installedVersion(env), "3.8.54");
  });
});

test("in process: an installed version that moved since the pre-flight is refused as version-changed", async () => {
  await withService(async (env) => {
    const plan = planFor("3.8.55", 2_000);
    const pre = await preflightFor(env, plan);
    assert.equal(pre.kind, "ok");
    const manifest = path.join(env.packageRoot, "package.json");
    const parsed = JSON.parse(fs.readFileSync(manifest, "utf8"));
    fs.writeFileSync(manifest, JSON.stringify({ ...parsed, version: "3.8.99" }));
    const deps = tx.createDefaultDependencies({
      plan,
      runtime: pre.runtime,
      environment: pre.environment,
    });
    const outcome = await tx.runManagedUpdate(plan, deps);
    assert.equal(outcome.reason, "version-changed");
    assert.equal(outcome.refused, true);
  });
});

test("in process: a lost package copy makes the restoration fail and keeps the snapshot for manual recovery", async () => {
  await withService(async (env) => {
    const opDir = tx.operationDir(env.dataDir, OPERATION_ID);
    const { outcome, state } = await inProcess(env, "3.8.57", {
      readinessTimeoutMs: 3_000,
      tweak: (deps) => {
        const install = deps.installTarget;
        deps.installTarget = async (p) => {
          fs.rmSync(path.join(opDir, "previous-package"), { recursive: true, force: true });
          return install(p);
        };
      },
    });
    assert.equal(outcome.status, "manual-recovery");
    assert.equal(outcome.reason, "restore-failed");
    assert.equal(state.snapshotPath, path.join(opDir, "data-snapshot"));
    assert.ok(state.recovery.steps.length >= 3);
    assert.equal(
      fs.readFileSync(path.join(opDir, "data-snapshot", "storage.sqlite"), "utf8"),
      "ORIGINAL-DB",
      "the data snapshot survives"
    );
  });
});

test("in process: stopping the old service refuses to signal a process that is not this install", async () => {
  await withService(async (env, oldPid) => {
    const plan = planFor("3.8.55", 2_000);
    const pre = await preflightFor(env, plan);
    assert.equal(pre.kind, "ok");
    // The pid file now names this very test process: its command line does not name the install.
    const runtime = { ...pre.runtime, oldPids: [process.pid] };
    const deps = tx.createDefaultDependencies({
      plan,
      runtime,
      environment: pre.environment,
    });
    const stopped = await deps.stopOld(plan);
    assert.equal(stopped.stopped, false);
    process.kill(oldPid, 0);
  });
});

test("state reads and the lock agree about a running operation", async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-inproc-lock-"));
  try {
    assert.equal(tx.isLockHeld(dataDir), false);
    const lock = await tx.acquireFileLock(dataDir, OPERATION_ID);
    assert.equal(tx.isLockHeld(dataDir), true);
    assert.equal(tx.isLockHeld(dataDir, { isPidAlive: () => false }), false);
    await lock.release();
    assert.equal(tx.isLockHeld(dataDir), false);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("waiting for an outcome reports each phase once and ends as timed out when none arrives", async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-inproc-wait-"));
  try {
    const store = tx.createStateStore(dataDir, OPERATION_ID);
    store.record({ operationId: OPERATION_ID, status: "running", phase: "installing" });
    let clock = 0;
    const phases: string[] = [];
    const last = await tx.waitForManagedUpdateOutcome(dataDir, OPERATION_ID, {
      timeoutMs: 5_000,
      pollMs: 1_000,
      now: () => clock,
      sleep: async (ms: number) => {
        clock += ms;
        if (clock === 2_000) {
          store.record({ operationId: OPERATION_ID, status: "running", phase: "verifying" });
        }
      },
      onPhase: (s: { phase: string }) => phases.push(s.phase),
    });
    assert.deepEqual(phases, ["installing", "verifying"]);
    assert.equal(last.timedOut, true);
    assert.equal(last.phase, "verifying");

    store.record({ operationId: OPERATION_ID, status: "updated", phase: "finished" });
    const done = await tx.waitForManagedUpdateOutcome(dataDir, OPERATION_ID, { timeoutMs: 1_000 });
    assert.equal(done.status, "updated");
    assert.equal(done.timedOut, undefined);

    const unknown = await tx.waitForManagedUpdateOutcome(
      dataDir,
      "11111111-2222-4333-8444-555555555555",
      { timeoutMs: 10, pollMs: 5 }
    );
    assert.equal(unknown.timedOut, true);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("the default pre-flight context reports the host honestly and does not throw", async () => {
  const ctx = tx.createDefaultPreflightContext({
    dataDir: os.tmpdir(),
    packageRoot: path.join(os.tmpdir(), "no-such-install"),
    env: { ELECTRON_RUN_AS_NODE: "1", container: "podman" },
  });
  assert.equal(ctx.platform, process.platform);
  assert.equal(ctx.isElectron(), true);
  assert.equal(ctx.isContainer(), true);
  assert.equal(ctx.installedVersion(), null);
  assert.equal(ctx.realpath("/definitely/not/here"), "/definitely/not/here");
  assert.equal(ctx.realpath(os.tmpdir()), fs.realpathSync(os.tmpdir()));
  assert.equal(ctx.lockHeld(), false);
  assert.equal(await ctx.service(), null);

  const plain = tx.createDefaultPreflightContext({
    dataDir: os.tmpdir(),
    packageRoot: os.tmpdir(),
    env: {},
  });
  assert.equal(plain.isElectron(), Boolean(process.versions.electron));
});

test("the real disk check passes for a tiny tree and fails when the size cannot be read", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-inproc-disk-"));
  try {
    const dataDir = path.join(root, "data");
    const packageRoot = path.join(root, "pkg");
    fs.mkdirSync(path.join(dataDir, "managed-update"), { recursive: true });
    fs.mkdirSync(packageRoot);
    fs.writeFileSync(path.join(dataDir, "storage.sqlite"), "x".repeat(1024));
    fs.writeFileSync(path.join(packageRoot, "package.json"), "{}");
    assert.deepEqual(await tx.checkDiskHeadroom({ dataDir, packageRoot }), { ok: true });
    assert.deepEqual(
      await tx.checkDiskHeadroom({ dataDir: path.join(root, "missing"), packageRoot }),
      { ok: false }
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("a tree that cannot be measured with du falls back to walking it", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-inproc-du-"));
  const originalPath = process.env.PATH;
  try {
    fs.mkdirSync(path.join(root, "pkg", "sub"), { recursive: true });
    fs.writeFileSync(path.join(root, "pkg", "sub", "a"), "abc");
    // No du on PATH: the size comes from the walk.
    process.env.PATH = path.join(root, "empty-bin");
    assert.deepEqual(
      await tx.checkDiskHeadroom({ dataDir: root, packageRoot: path.join(root, "pkg") }),
      { ok: true }
    );
  } finally {
    process.env.PATH = originalPath;
    fs.rmSync(root, { recursive: true, force: true });
  }
});
