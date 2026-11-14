// Unit tests for gatewayStatus / stopOwnedGateway / acquireGateway branches (core/gateway.mjs),
// driven by hand-written gateway.json records and an injected pid classifier.
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import type { ChildProcess } from "node:child_process";
import http from "node:http";
import { existsSync } from "node:fs";

import { freePort, makeTempDir, removeDir, waitFor } from "./_fixtures/gateway/harness.mjs";
import {
  acquireGateway,
  gatewayStatus,
  stopOwnedGateway,
} from "../../../../bin/cli/launch/core/gateway.mjs";
import { statePaths, writeGatewayRecord } from "../../../../bin/cli/launch/core/gateway/state.mjs";
import { createLease } from "../../../../bin/cli/launch/core/lease.mjs";

const dirs: string[] = [];
const children: ChildProcess[] = [];
const servers: http.Server[] = [];

function tmp(): string {
  const dir = makeTempDir("launch-gw-status-");
  dirs.push(dir);
  return dir;
}

after(async () => {
  for (const child of children) {
    try {
      child.kill("SIGKILL");
    } catch {}
  }
  for (const server of servers) {
    server.closeAllConnections?.();
    await new Promise((resolve) => server.close(() => resolve(undefined)));
  }
  for (const dir of dirs) removeDir(dir);
});

const ours = { classifyPidIdentity: () => "ours" };
const foreign = { classifyPidIdentity: () => "foreign" };

async function healthServer(): Promise<number> {
  const port = await freePort();
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end("{}");
  });
  await new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(undefined)));
  servers.push(server);
  return port;
}

function record(port: number, extra: Record<string, unknown> = {}) {
  return {
    generation: "g1",
    state: "ready",
    reaperPid: process.pid,
    serverPid: 4242,
    port,
    ...extra,
  };
}

test("gatewayStatus with no record and nothing listening", async () => {
  const dir = tmp();
  const port = await freePort();
  const status = await gatewayStatus({ stateDir: dir, port, overrides: ours });
  assert.deepEqual(Object.keys(status), ["running", "owned", "leases", "kept", "baseUrl"]);
  assert.deepEqual(status, {
    running: false,
    owned: false,
    leases: 0,
    kept: false,
    baseUrl: `http://127.0.0.1:${port}`,
  });
});

test("gatewayStatus reports an owned record with pid and state, port taken from the record", async () => {
  const dir = tmp();
  const port = await freePort();
  writeGatewayRecord(dir, record(port, { state: "starting" }));
  const status = await gatewayStatus({ stateDir: dir, overrides: ours });
  assert.deepEqual(Object.keys(status), [
    "running",
    "owned",
    "leases",
    "kept",
    "baseUrl",
    "pid",
    "state",
  ]);
  assert.equal(status.owned, true);
  assert.equal(status.kept, false);
  assert.equal(status.pid, 4242);
  assert.equal(status.state, "starting");
  assert.equal(status.baseUrl, `http://127.0.0.1:${port}`);
});

test("gatewayStatus: owned record without an integer serverPid has no pid", async () => {
  const dir = tmp();
  const port = await freePort();
  writeGatewayRecord(dir, record(port, { serverPid: null, state: "stopping" }));
  const status = await gatewayStatus({ stateDir: dir, port, overrides: ours });
  assert.equal(status.owned, true);
  assert.equal("pid" in status, false);
  assert.equal(status.state, "stopping");
});

test("gatewayStatus: a foreign reaper pid is not owned", async () => {
  const dir = tmp();
  const port = await freePort();
  writeGatewayRecord(dir, record(port));
  const status = await gatewayStatus({ stateDir: dir, port, overrides: foreign });
  assert.equal(status.owned, false);
  assert.equal("pid" in status, false);
  assert.equal("state" in status, false);
});

test("gatewayStatus: a live reaper in a non-owned state is not owned", async () => {
  const dir = tmp();
  const port = await freePort();
  writeGatewayRecord(dir, record(port, { state: "stopped" }));
  const status = await gatewayStatus({ stateDir: dir, port, overrides: ours });
  assert.equal(status.owned, false);
  assert.equal(status.kept, false);
});

test("gatewayStatus: a record for another port is ignored", async () => {
  const dir = tmp();
  const port = await freePort();
  writeGatewayRecord(dir, record(port + 1));
  const status = await gatewayStatus({ stateDir: dir, port, overrides: ours });
  assert.equal(status.owned, false);
  assert.equal(status.kept, false);
  assert.equal("pid" in status, false);
});

test("gatewayStatus: kept and running reports kept with pid, no state", async () => {
  const dir = tmp();
  const port = await healthServer();
  writeGatewayRecord(dir, record(port, { state: "kept" }));
  const status = await gatewayStatus({ stateDir: dir, port, overrides: foreign });
  assert.deepEqual(status, {
    running: true,
    owned: false,
    leases: 0,
    kept: true,
    baseUrl: `http://127.0.0.1:${port}`,
    pid: 4242,
  });
});

test("gatewayStatus: kept but not running is not kept", async () => {
  const dir = tmp();
  const port = await freePort();
  writeGatewayRecord(dir, record(port, { state: "kept" }));
  const status = await gatewayStatus({ stateDir: dir, port, overrides: ours });
  assert.equal(status.kept, false);
  assert.equal("pid" in status, false);
});

test("gatewayStatus counts live leases", async () => {
  const dir = tmp();
  const port = await freePort();
  const lease = createLease(dir, { heartbeatMs: 60_000 });
  try {
    const status = await gatewayStatus({ stateDir: dir, port, overrides: ours });
    assert.equal(status.leases, 1);
  } finally {
    lease.release();
  }
});

test("stopOwnedGateway without a record throws UsageError with the generic hint", async () => {
  const dir = tmp();
  await assert.rejects(
    () => stopOwnedGateway({ stateDir: dir, overrides: ours }),
    (err: { code?: string; message?: string; hint?: string }) =>
      err.code === "UsageError" &&
      err.message === "No launcher-started gateway is running" &&
      err.hint === "Use `omniroute stop` for a gateway you started yourself"
  );
});

test("stopOwnedGateway on a kept record throws UsageError with the kept hint", async () => {
  const dir = tmp();
  writeGatewayRecord(dir, record(1, { state: "kept" }));
  await assert.rejects(
    () => stopOwnedGateway({ stateDir: dir, overrides: ours }),
    (err: { code?: string; hint?: string }) =>
      err.code === "UsageError" &&
      err.hint === "It was kept, so it is a normal gateway now: use `omniroute stop`"
  );
});

test("stopOwnedGateway refuses an owned-state record whose reaper is foreign", async () => {
  const dir = tmp();
  writeGatewayRecord(dir, record(1));
  await assert.rejects(
    () => stopOwnedGateway({ stateDir: dir, overrides: foreign }),
    (err: { code?: string }) => err.code === "UsageError"
  );
  assert.equal(existsSync(statePaths(dir).gateway), true);
});

test("stopOwnedGateway stops the reaper and clears its leftover record", async () => {
  const dir = tmp();
  const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
    stdio: "ignore",
  });
  children.push(child);
  assert.ok(Number.isInteger(child.pid));
  writeGatewayRecord(dir, record(1, { reaperPid: child.pid }));
  const result = await stopOwnedGateway({ stateDir: dir, overrides: ours });
  assert.deepEqual(result, { stopped: true });
  assert.equal(existsSync(statePaths(dir).gateway), false);
  assert.ok(await waitFor(() => child.exitCode !== null || child.signalCode !== null));
});

test("acquireGateway: a remote target without a URL is a UsageError", async () => {
  await assert.rejects(
    () => acquireGateway({ target: { kind: "remote" } }),
    (err: { code?: string; message?: string }) =>
      err.code === "UsageError" && err.message === "Remote target has no URL"
  );
});

test("acquireGateway: a reachable remote target is probed, never owned", async () => {
  const port = await healthServer();
  const logged: string[] = [];
  const handle = await acquireGateway({
    target: { origin: "remote", rootUrl: `http://127.0.0.1:${port}/v1/` },
    log: { info: (m: string) => logged.push(m) },
  });
  assert.equal(handle.baseUrl, `http://127.0.0.1:${port}`);
  assert.equal(handle.owned, false);
  assert.equal(handle.origin, "remote");
  await handle.release();
  assert.deepEqual(logged, []);
});
