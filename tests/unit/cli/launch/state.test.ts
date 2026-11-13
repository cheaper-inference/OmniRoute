// Unit tests for the gateway state helpers (core/gateway/state.mjs) and leases (core/lease.mjs).
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { CORE, makeTempDir, removeDir, sleep } from "./_fixtures/gateway/harness.mjs";

const state = await import(pathToFileURL(join(CORE, "gateway", "state.mjs")).href);
const lease = await import(pathToFileURL(join(CORE, "lease.mjs")).href);

const dirs: string[] = [];
function tmp(): string {
  const dir = makeTempDir("launch-state-");
  dirs.push(dir);
  return dir;
}
after(() => {
  for (const dir of dirs) removeDir(dir);
});

function deadPid(): number {
  const res = spawnSync(process.execPath, ["-e", ""]);
  assert.ok(res.pid > 0);
  return res.pid as number;
}

function writeLock(dir: string, body: unknown) {
  state.ensureStateDir(dir);
  writeFileSync(state.statePaths(dir).lock, JSON.stringify(body));
}

function writeLease(dir: string, id: string, record: Record<string, unknown>) {
  state.ensureStateDir(dir);
  writeFileSync(state.leasePath(dir, id), JSON.stringify({ leaseId: id, ...record }));
}

test("takeLock is exclusive: a second taker waits and gets it after release", async () => {
  const dir = tmp();
  const release1 = await state.takeLock(dir, { timeoutMs: 2000 });
  let got = false;
  const second = state.takeLock(dir, { timeoutMs: 5000 }).then((r: () => void) => {
    got = true;
    return r;
  });
  await sleep(200);
  assert.equal(got, false, "second taker must wait while the lock is held");
  release1();
  const release2 = await second;
  assert.equal(got, true);
  release2();
  assert.equal(existsSync(state.statePaths(dir).lock), false);
});

test("a stale lock with a dead pid is stolen", async () => {
  const dir = tmp();
  writeLock(dir, { pid: deadPid(), at: Date.now(), token: "dead" });
  const release = await state.takeLock(dir, { timeoutMs: 2000 });
  const holder = JSON.parse(readFileSync(state.statePaths(dir).lock, "utf8"));
  assert.equal(holder.pid, process.pid);
  assert.notEqual(holder.token, "dead");
  release();
});

test("a lock held by a live pid yields StateLocked after the timeout", async () => {
  const dir = tmp();
  writeLock(dir, { pid: process.pid, at: Date.now(), token: "x" });
  const started = Date.now();
  await assert.rejects(
    () => state.takeLock(dir, { timeoutMs: 300 }),
    (err: { code?: string }) => err.code === "StateLocked"
  );
  assert.ok(Date.now() - started >= 250);
  // The foreign lock is untouched.
  assert.equal(JSON.parse(readFileSync(state.statePaths(dir).lock, "utf8")).token, "x");
});

test("release only removes the lock it owns (matching token)", async () => {
  const dir = tmp();
  const release = await state.takeLock(dir, { timeoutMs: 1000 });
  // Someone else replaced the lock file: our release must leave it alone.
  writeLock(dir, { pid: process.pid, at: Date.now(), token: "other" });
  release();
  assert.equal(existsSync(state.statePaths(dir).lock), true);
  assert.equal(JSON.parse(readFileSync(state.statePaths(dir).lock, "utf8")).token, "other");
  // Idempotent.
  release();
  assert.equal(existsSync(state.statePaths(dir).lock), true);
});

test("withLock runs under the lock and releases it even when fn throws", async () => {
  const dir = tmp();
  await assert.rejects(
    () =>
      state.withLock(dir, { timeoutMs: 1000 }, () => {
        assert.equal(existsSync(state.statePaths(dir).lock), true);
        throw new Error("boom");
      }),
    /boom/
  );
  assert.equal(existsSync(state.statePaths(dir).lock), false);
});

test(
  "state files are written atomically with mode 0600",
  { skip: process.platform === "win32" },
  async () => {
    const dir = tmp();
    state.writeGatewayRecord(dir, { generation: "g1", state: "ready", port: 1 });
    const release = await state.takeLock(dir, { timeoutMs: 1000 });
    const lock = statSync(state.statePaths(dir).lock).mode & 0o777;
    release();
    const gw = statSync(state.statePaths(dir).gateway).mode & 0o777;
    const l = lease.createLease(dir, { heartbeatMs: 60_000 });
    const lf = statSync(state.leasePath(dir, l.leaseId)).mode & 0o777;
    l.release();
    assert.equal(gw, 0o600);
    assert.equal(lock, 0o600);
    assert.equal(lf, 0o600);
    // No temp leftovers next to the atomic write.
    assert.deepEqual(
      readdirSync(dir).filter((n) => n !== "leases" && n !== "gateway.json"),
      []
    );
  }
);

test("gateway record: read, write, and the generation guard on remove", () => {
  const dir = tmp();
  assert.equal(state.readGatewayRecord(dir), null);
  const record = { generation: "gen-a", state: "starting", port: 4242, reaperPid: 1 };
  state.writeGatewayRecord(dir, record);
  assert.deepEqual(state.readGatewayRecord(dir), record);

  assert.equal(state.removeGatewayRecord(dir, "gen-b"), false, "other generation is kept");
  assert.deepEqual(state.readGatewayRecord(dir), record);
  assert.equal(state.removeGatewayRecord(dir, "gen-a"), true);
  assert.equal(state.readGatewayRecord(dir), null);

  state.writeGatewayRecord(dir, record);
  assert.equal(state.removeGatewayRecord(dir), true, "no generation: unconditional");
  assert.equal(state.readGatewayRecord(dir), null);
});

test("readGatewayRecord rejects garbage and records without a generation", () => {
  const dir = tmp();
  state.ensureStateDir(dir);
  writeFileSync(state.statePaths(dir).gateway, "{not json");
  assert.equal(state.readGatewayRecord(dir), null);
  writeFileSync(state.statePaths(dir).gateway, JSON.stringify({ state: "ready" }));
  assert.equal(state.readGatewayRecord(dir), null);
});

test("isLeaseLive: dead pid false, stale heartbeat false, fresh live pid true", () => {
  const now = Date.now();
  const fresh = { pid: process.pid, heartbeatAt: now };
  assert.equal(lease.isLeaseLive(fresh, { now }), true);
  assert.equal(lease.isLeaseLive({ pid: deadPid(), heartbeatAt: now }, { now }), false);
  assert.equal(lease.isLeaseLive({ pid: process.pid, heartbeatAt: now - 60_000 }, { now }), false);
  // Boundary: exactly staleMs old is stale.
  assert.equal(
    lease.isLeaseLive({ pid: process.pid, heartbeatAt: now - 1000 }, { now, staleMs: 1000 }),
    false
  );
  assert.equal(lease.isLeaseLive({ pid: process.pid, heartbeatAt: "x" }, { now }), false);
  assert.equal(lease.isLeaseLive({ pid: -1, heartbeatAt: now }, { now }), false);
  assert.equal(lease.isLeaseLive(null), false);
});

test("pruneLeases removes dead and stale leases and keeps live ones", () => {
  const dir = tmp();
  const now = Date.now();
  writeLease(dir, "live", { pid: process.pid, heartbeatAt: now });
  writeLease(dir, "dead", { pid: deadPid(), heartbeatAt: now });
  writeLease(dir, "stale", { pid: process.pid, heartbeatAt: now - 120_000 });
  state.ensureStateDir(dir);
  writeFileSync(state.leasePath(dir, "garbage"), "nope");
  assert.equal(lease.liveLeases(dir).length, 1);
  const removed = lease.pruneLeases(dir);
  assert.equal(removed, 3);
  assert.deepEqual(readdirSync(join(dir, "leases")), ["live.json"]);
});

test("createLease heartbeat rewrites heartbeatAt and recreates a deleted file", async () => {
  const dir = tmp();
  const handle = lease.createLease(dir, { toolId: "t", heartbeatMs: 100, owned: true });
  const file = state.leasePath(dir, handle.leaseId);
  const first = JSON.parse(readFileSync(file, "utf8"));
  assert.equal(first.pid, process.pid);
  assert.equal(first.toolId, "t");
  assert.equal(first.owned, true);
  await sleep(350);
  const later = JSON.parse(readFileSync(file, "utf8"));
  assert.ok(later.heartbeatAt > first.heartbeatAt, "heartbeat advanced");

  // A peer pruned the file while we slept: the next beat recreates it.
  state.removeFile(file);
  assert.equal(existsSync(file), false);
  await sleep(350);
  assert.equal(existsSync(file), true);
  assert.equal(JSON.parse(readFileSync(file, "utf8")).leaseId, handle.leaseId);
  handle.release();
});

test("lease release is idempotent and stops the heartbeat", async () => {
  const dir = tmp();
  const handle = lease.createLease(dir, { heartbeatMs: 50 });
  const file = state.leasePath(dir, handle.leaseId);
  assert.equal(existsSync(file), true);
  handle.release();
  handle.release();
  assert.equal(existsSync(file), false);
  await sleep(200);
  assert.equal(existsSync(file), false, "no beat resurrects a released lease");
  handle.heartbeat();
  assert.equal(existsSync(file), false);
});
