/**
 * Regression test: the MITM child (`server.cjs`) dying AFTER a successful start
 * must not leave `/etc/hosts` silently poisoned.
 *
 * Teardown already existed for a failed start, `stopMitm()`, parent
 * SIGINT/SIGTERM and Repair — but the child's own `exit` handler only cleared
 * the in-memory handle and deleted the PID file. When the proxy crashed
 * mid-session (uncaught exception, OOM kill, someone killing the PID), the
 * target hostnames kept resolving to `127.0.0.1`, every client on the machine
 * got `connect ECONNREFUSED 127.0.0.1:443`, and because the PID file was gone
 * `getMitmStatus()` never flagged the orphaned state, so the dashboard offered
 * no Repair.
 *
 * Everything privileged is injected: no test here touches the real hosts file,
 * DNS, certificates or processes. The fake child is a plain object.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ChildProcess } from "node:child_process";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mitm-child-exit-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const manager = await import("../../src/mitm/manager.ts");
const { revertHostsAfterUnexpectedExit, deriveOrphanedState } =
  await import("../../src/mitm/childExitCleanup.ts");

const MANAGED_HOSTS = ["daily-cloudcode-pa.googleapis.com", "api.individual.githubcopilot.com"];

type Recorder = {
  calls: string[];
  deps: {
    getCachedPassword: () => string | null;
    canRunPrivileged: (sudoPassword: string) => boolean;
    removeDNSEntry: (sudoPassword: string) => Promise<void>;
    removeDNSEntries: (hosts: string[], sudoPassword: string) => Promise<void>;
    collectManagedHosts: () => string[];
  };
};

function recorder(password: string | null, canRunPrivileged = Boolean(password)): Recorder {
  const calls: string[] = [];
  return {
    calls,
    deps: {
      getCachedPassword: () => password,
      canRunPrivileged: () => canRunPrivileged,
      removeDNSEntry: async (pw) => {
        calls.push(`removeDNSEntry:${pw}`);
      },
      removeDNSEntries: async (hosts, pw) => {
        calls.push(`removeDNSEntries:${hosts.join(",")}:${pw}`);
      },
      collectManagedHosts: () => MANAGED_HOSTS,
    },
  };
}

function fakeChild(): ChildProcess {
  const proc = {
    killed: false,
    kill() {
      proc.killed = true;
      return true;
    },
  };
  return proc as unknown as ChildProcess;
}

test.after(() => {
  manager.__setServerProcessForTest(null, null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── leaf helper ─────────────────────────────────────────────────────────────

test("revertHostsAfterUnexpectedExit: with a cached password reverts default + managed hosts", async () => {
  const r = recorder("pw");
  const reverted = await revertHostsAfterUnexpectedExit(r.deps, 1);
  assert.equal(reverted, true);
  assert.deepEqual(r.calls, [
    "removeDNSEntry:pw",
    `removeDNSEntries:${MANAGED_HOSTS.join(",")}:pw`,
  ]);
});

test("revertHostsAfterUnexpectedExit: no password and sudo required → no privileged call, not reverted", async () => {
  const r = recorder(null, false);
  const reverted = await revertHostsAfterUnexpectedExit(r.deps, 1);
  assert.equal(reverted, false);
  assert.deepEqual(r.calls, [], "must never attempt (or prompt for) sudo inside an exit handler");
});

test("revertHostsAfterUnexpectedExit: passwordless privilege (root / NOPASSWD / Windows) still reverts", async () => {
  const r = recorder(null, true);
  const reverted = await revertHostsAfterUnexpectedExit(r.deps, null);
  assert.equal(reverted, true);
  assert.deepEqual(r.calls, ["removeDNSEntry:", `removeDNSEntries:${MANAGED_HOSTS.join(",")}:`]);
});

test("revertHostsAfterUnexpectedExit: a failing removal reports not-reverted and never throws", async () => {
  const r = recorder("pw");
  r.deps.removeDNSEntries = async () => {
    throw new Error("sudo: no tty present");
  };
  const reverted = await revertHostsAfterUnexpectedExit(r.deps, 1);
  assert.equal(reverted, false);
});

test("deriveOrphanedState: hosts spoofed while nothing listens is orphaned unless a start is in flight", () => {
  const base = { flagged: false, running: false, dnsConfigured: true, starting: false };
  assert.equal(deriveOrphanedState(base), true);
  assert.equal(deriveOrphanedState({ ...base, starting: true }), false);
  assert.equal(deriveOrphanedState({ ...base, running: true }), false);
  assert.equal(deriveOrphanedState({ ...base, dnsConfigured: false }), false);
  assert.equal(deriveOrphanedState({ ...base, dnsConfigured: false, flagged: true }), true);
});

// ── manager wiring ──────────────────────────────────────────────────────────

test("child exit BEFORE the start was confirmed is left to the failed-start rollback", async () => {
  const proc = fakeChild();
  manager.__setServerProcessForTest(proc, 4242);
  const r = recorder("pw");
  await manager.handleMitmChildExit(proc, 1, { startConfirmed: false }, r.deps);
  assert.deepEqual(r.calls, [], "the failed-start path already reverts — no duplicate teardown");
  const status = await manager.getMitmStatus();
  assert.equal(status.running, false, "in-memory handle must be cleared");
  assert.equal(status.orphanedStateDetected, false);
});

test("child exit after stopMitm() (intentional) does not run a second teardown", async () => {
  const proc = fakeChild();
  manager.__setServerProcessForTest(proc, 4243);
  const stopDeps = recorder("pw").deps;
  await manager.stopMitm("pw", stopDeps);
  assert.equal(proc.killed, true, "precondition: stopMitm() killed the child");

  const r = recorder("pw");
  await manager.handleMitmChildExit(proc, null, { startConfirmed: true }, r.deps);
  assert.deepEqual(r.calls, [], "intentional stop must not trigger the unexpected-exit cleanup");
  const status = await manager.getMitmStatus();
  assert.equal(status.orphanedStateDetected, false);
});

test("child exit after handleExitCleanup() (parent signal) does not run a second teardown", async () => {
  const proc = fakeChild();
  manager.__setServerProcessForTest(proc, 4244);
  const signalDeps = recorder("pw").deps;
  await manager.handleExitCleanup("SIGTERM", signalDeps);
  assert.equal(proc.killed, true, "precondition: the signal handler killed the child");

  const r = recorder("pw");
  await manager.handleMitmChildExit(proc, null, { startConfirmed: true }, r.deps);
  assert.deepEqual(r.calls, []);
});

test("an exit from a previous child never clears the handle of the current one", async () => {
  const oldProc = fakeChild();
  const currentProc = fakeChild();
  manager.__setServerProcessForTest(currentProc, 4245);
  const r = recorder("pw");
  await manager.handleMitmChildExit(oldProc, 0, { startConfirmed: false }, r.deps);
  const status = await manager.getMitmStatus();
  assert.equal(status.running, true, "a stale exit event must not orphan the live child handle");
  assert.equal(status.pid, 4245);
  manager.__setServerProcessForTest(null, null);
});

test("unexpected exit after a confirmed start with a cached password reverts managed hosts", async () => {
  const proc = fakeChild();
  manager.__setServerProcessForTest(proc, 4246);
  const r = recorder("pw");
  await manager.handleMitmChildExit(proc, 1, { startConfirmed: true }, r.deps);
  assert.deepEqual(r.calls, [
    "removeDNSEntry:pw",
    `removeDNSEntries:${MANAGED_HOSTS.join(",")}:pw`,
  ]);
  const status = await manager.getMitmStatus();
  assert.equal(status.running, false);
  assert.equal(status.orphanedStateDetected, false, "a successful revert leaves nothing to repair");
});

// Must stay LAST: the orphaned flag is sticky until repairMitm().
test("unexpected exit without any way to run sudo flags orphaned state for Repair", async () => {
  const proc = fakeChild();
  manager.__setServerProcessForTest(proc, 4247);
  const r = recorder(null, false);
  await manager.handleMitmChildExit(proc, 137, { startConfirmed: true }, r.deps);
  assert.deepEqual(r.calls, []);
  const status = await manager.getMitmStatus();
  assert.equal(status.running, false);
  assert.equal(
    status.orphanedStateDetected,
    true,
    "the dashboard must offer Repair — the hosts entries are still in place"
  );
});
