// End to end tests for core/gateway.mjs with the fake gateway as the managed child.
import { after, test } from "node:test";
import type { TestContext } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import {
  CORE,
  FAKE,
  PROBE,
  acquireOverrides,
  createPidTracker,
  fakeGatewayPids,
  freePort,
  gatewayJson,
  healthy,
  listen404,
  makeTempDir,
  pidAlive,
  reaperPids,
  removeDir,
  sleep,
  snapshotPids,
  spawnFakeGateway,
  waitFor,
} from "./_fixtures/gateway/harness.mjs";

const gw = await import(pathToFileURL(join(CORE, "gateway.mjs")).href);
const stateMod = await import(pathToFileURL(join(CORE, "gateway", "state.mjs")).href);

const allPids = createPidTracker();
const usedPorts = new Set<number>();

type Handle = { baseUrl: string; owned: boolean; release: () => Promise<void> };

async function setup(t: TestContext) {
  const dir = makeTempDir("launch-gw-");
  const port = await freePort();
  usedPorts.add(port);
  const tracker = createPidTracker();
  const handles: Handle[] = [];
  const extraKill: Array<() => void> = [];
  t.after(async () => {
    for (const h of handles) await h.release().catch(() => {});
    snapshotPids(dir, tracker);
    for (const pid of reaperPids(dir)) tracker.track(pid);
    tracker.killAll();
    for (const fn of extraKill) fn();
    for (const pid of tracker.seen) allPids.track(pid);
    await waitFor(() => tracker.alive().length === 0, { timeoutMs: 5000 });
    removeDir(dir);
  });
  const acquire = async (opts: Record<string, unknown> = {}) => {
    const { flags, overrides, ...rest } = opts as {
      flags?: Record<string, unknown>;
      overrides?: Record<string, unknown>;
    };
    const handle: Handle = await gw.acquireGateway({
      target: { kind: "local" },
      flags: { port, startTimeoutMs: 15_000, ...flags },
      stateDir: dir,
      overrides: acquireOverrides(overrides),
      ...rest,
    });
    handles.push(handle);
    snapshotPids(dir, tracker);
    return handle;
  };
  return { dir, port, tracker, acquire, extraKill };
}

const readyRecord = (dir: string) =>
  waitFor(() => {
    const g = gatewayJson(dir);
    return g && g.state === "ready" ? g : null;
  });

test("starts a gateway when down: owned, healthy, gateway.json reaches ready", async (t) => {
  const { dir, port, tracker, acquire } = await setup(t);
  const handle = await acquire();
  assert.equal(handle.owned, true);
  assert.equal(handle.baseUrl, `http://127.0.0.1:${port}`);
  assert.equal(await healthy(port), true);
  const g = await readyRecord(dir);
  assert.ok(g, "gateway.json reached ready");
  assert.equal(g.port, port);
  assert.ok(Number.isInteger(g.serverPid) && Number.isInteger(g.reaperPid));
  tracker.track(g.serverPid);
  const status = await gw.gatewayStatus({ stateDir: dir, port, overrides: acquireOverrides() });
  assert.equal(status.running, true);
  assert.equal(status.owned, true);
  assert.equal(status.pid, g.serverPid);
  assert.equal(status.leases, 1);
  assert.equal(status.kept, false);
  assert.equal(status.state, "ready");
});

test("the gateway child gets OMNIROUTE_SERVER_HOST=127.0.0.1, the test process does not", async (t) => {
  const { dir, port, acquire } = await setup(t);
  const before = process.env.OMNIROUTE_SERVER_HOST;
  const envFile = join(dir, "child-env.json");
  await acquire({
    overrides: {
      gatewayCommand: [process.execPath, PROBE, "--port", "{port}", "--out", envFile],
    },
  });
  const seen = await waitFor(() => {
    try {
      return JSON.parse(readFileSync(envFile, "utf8"));
    } catch {
      return null;
    }
  });
  assert.equal(seen.OMNIROUTE_SERVER_HOST, "127.0.0.1");
  assert.equal(process.env.OMNIROUTE_SERVER_HOST, before);
  assert.equal(await healthy(port), true);
});

test("reuses a user gateway that is already up: owned false, never signalled", async (t) => {
  const { dir, port, tracker, acquire, extraKill } = await setup(t);
  const user = spawnFakeGateway(port);
  tracker.track(user.pid);
  extraKill.push(() => user.kill("SIGKILL"));
  assert.ok(await waitFor(() => healthy(port)), "user gateway up");

  const handle = await acquire();
  assert.equal(handle.owned, false);
  assert.equal(gatewayJson(dir), null, "no gateway.json for a user gateway");
  assert.equal(reaperPids(dir).length, 0);
  await handle.release();
  await sleep(1000); // well past grace (300) and several scans
  assert.equal(pidAlive(user.pid as number), true, "user gateway still running");
  assert.equal(await healthy(port), true);
});

test("two concurrent acquires share one child and one reaper", async (t) => {
  const { dir, port, tracker, acquire } = await setup(t);
  const [a, b] = await Promise.all([acquire(), acquire()]);
  assert.equal(a.owned, true);
  assert.equal(b.owned, true);
  const g = await readyRecord(dir);
  assert.ok(g);
  tracker.track(g.serverPid);
  const status = await gw.gatewayStatus({ stateDir: dir, port, overrides: acquireOverrides() });
  assert.equal(status.pid, g.serverPid);
  assert.equal(status.leases, 2);
  assert.equal(reaperPids(dir).length, 1, "exactly one reaper");
  assert.equal(fakeGatewayPids(`--port ${port}`).length, 1, "exactly one gateway child");
});

test("last release stops the gateway after grace, not while another lease is live", async (t) => {
  const { dir, port, tracker, acquire } = await setup(t);
  const a = await acquire();
  const b = await acquire();
  const g = await readyRecord(dir);
  assert.ok(g);
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);

  await a.release();
  await sleep(1200); // 4x grace
  assert.equal(pidAlive(g.serverPid), true, "still running while b holds a lease");
  assert.equal(await healthy(port), true);

  await b.release();
  assert.ok(await waitFor(() => !pidAlive(g.serverPid)), "gateway stopped after last release");
  assert.ok(await waitFor(() => gatewayJson(dir) === null), "gateway.json removed");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper exited");
  assert.equal(await healthy(port), false);
});

test("flags.keepGateway: gateway outlives the launch, status kept, stopOwnedGateway refuses", async (t) => {
  const { dir, port, tracker, acquire } = await setup(t);
  const handle = await acquire({ flags: { keepGateway: true } });
  assert.equal(handle.owned, true);
  const g = gatewayJson(dir);
  assert.ok(g);
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);
  await handle.release();
  await sleep(1200);
  assert.equal(pidAlive(g.serverPid), true, "kept gateway keeps running");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper detached");
  const status = await gw.gatewayStatus({ stateDir: dir, port, overrides: acquireOverrides() });
  assert.equal(status.kept, true);
  assert.equal(status.running, true);
  assert.equal(status.owned, false);
  await assert.rejects(
    () => gw.stopOwnedGateway({ stateDir: dir, overrides: acquireOverrides() }),
    (err: { code?: string }) => err.code === "UsageError"
  );
  assert.equal(pidAlive(g.serverPid), true);
});

test("keepGateway() on a running owned gateway keeps it after release", async (t) => {
  const { dir, tracker, acquire } = await setup(t);
  const handle = await acquire();
  assert.deepEqual(await gw.keepGateway({ stateDir: dir }), { kept: true });
  assert.equal(gatewayJson(dir)?.state, "kept");
  const g = gatewayJson(dir);
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);
  await handle.release();
  await sleep(1200);
  assert.equal(pidAlive(g.serverPid), true);
  const status = await gw.gatewayStatus({ stateDir: dir, overrides: acquireOverrides() });
  assert.equal(status.kept, true);
});

test("a forced reaper stop (SIGTERM) never stops a kept gateway", async (t) => {
  const { dir, port, tracker, acquire } = await setup(t);
  const handle = await acquire();
  const g = await readyRecord(dir);
  assert.ok(g);
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);
  assert.deepEqual(await gw.keepGateway({ stateDir: dir }), { kept: true });
  // Before the reaper's next scan notices "kept", force it to stop.
  process.kill(g.reaperPid, "SIGTERM");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper exited");
  await handle.release();
  assert.equal(pidAlive(g.serverPid), true);
  assert.equal(await healthy(port), true);
  assert.equal(gatewayJson(dir)?.state, "kept");
});

test("a stop-request file makes the reaper stop its gateway (win32 control channel)", async (t) => {
  const { dir, port, tracker, acquire } = await setup(t);
  await acquire();
  const g = await readyRecord(dir);
  assert.ok(g);
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);
  writeFileSync(stateMod.stopRequestPath(dir, g.generation), "1");
  assert.ok(await waitFor(() => !pidAlive(g.serverPid)), "gateway stopped");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper exited");
  assert.equal(gatewayJson(dir), null);
  assert.equal(await healthy(port), false);
  assert.equal(
    readdirSync(dir).some((name) => name.startsWith("stop-")),
    false
  );
});

test("keepGateway() with no gateway record reports kept false", async (t) => {
  const { dir } = await setup(t);
  assert.deepEqual(await gw.keepGateway({ stateDir: dir }), { kept: false });
});

test("stopOwnedGateway stops an owned gateway", async (t) => {
  const { dir, port, tracker, acquire } = await setup(t);
  await acquire();
  const g = await readyRecord(dir);
  assert.ok(g);
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);
  assert.deepEqual(await gw.stopOwnedGateway({ stateDir: dir, overrides: acquireOverrides() }), {
    stopped: true,
  });
  assert.ok(await waitFor(() => !pidAlive(g.serverPid)), "gateway stopped");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper stopped");
  assert.equal(gatewayJson(dir), null);
  assert.equal(await healthy(port), false);
});

test("stopOwnedGateway with nothing owned throws UsageError", async (t) => {
  const { dir } = await setup(t);
  await assert.rejects(
    () => gw.stopOwnedGateway({ stateDir: dir, overrides: acquireOverrides() }),
    (err: { code?: string }) => err.code === "UsageError"
  );
});

test("a non-OmniRoute process on the port yields PortInUse", async (t) => {
  const { dir, port, acquire } = await setup(t);
  const other = await listen404(port);
  t.after(() => other.close());
  await assert.rejects(
    () => acquire(),
    (err: { code?: string }) => err.code === "PortInUse"
  );
  assert.equal(gatewayJson(dir), null);
  assert.equal(reaperPids(dir).length, 0);
});

test("readiness timeout yields GatewayStartTimeout and the child is gone", async (t) => {
  const { dir, port, tracker, acquire } = await setup(t);
  const pending = acquire({
    flags: { startTimeoutMs: 1500 },
    overrides: {
      gatewayCommand: [process.execPath, FAKE, "--port", "{port}", "--mode", "never-listen"],
    },
  }).then(
    () => null,
    (err: unknown) => err as { code?: string }
  );
  const g = await waitFor(() => {
    const rec = gatewayJson(dir);
    return rec && Number.isInteger(rec.serverPid) ? rec : null;
  });
  assert.ok(g, "child pid recorded");
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);
  const err = await pending;
  assert.equal(err?.code, "GatewayStartTimeout");
  assert.ok(await waitFor(() => !pidAlive(g.serverPid)), "child no longer running");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper no longer running");
  assert.equal(await healthy(port), false);
});

test("noStart with nothing running yields GatewayUnreachable", async (t) => {
  const { dir, acquire } = await setup(t);
  await assert.rejects(
    () => acquire({ flags: { noStart: true } }),
    (err: { code?: string }) => err.code === "GatewayUnreachable"
  );
  assert.equal(gatewayJson(dir), null);
  assert.equal(reaperPids(dir).length, 0);
});

test("remote target with a gateway up: probe only, no state written", async (t) => {
  const { dir, port, tracker, extraKill } = await setup(t);
  const user = spawnFakeGateway(port);
  tracker.track(user.pid);
  extraKill.push(() => user.kill("SIGKILL"));
  assert.ok(await waitFor(() => healthy(port)));
  const handle = await gw.acquireGateway({
    target: { kind: "remote", rootUrl: `http://127.0.0.1:${port}` },
    flags: {},
    stateDir: dir,
  });
  assert.equal(handle.owned, false);
  assert.equal(handle.baseUrl, `http://127.0.0.1:${port}`);
  await handle.release();
  assert.equal(gatewayJson(dir), null);
  assert.deepEqual(readdirSync(dir), [], "no lease or lock files written");
  assert.equal(pidAlive(user.pid as number), true);
});

test("remote target with nothing listening yields GatewayUnreachable", async (t) => {
  const { dir, port } = await setup(t);
  await assert.rejects(
    () =>
      gw.acquireGateway({
        target: { kind: "remote", rootUrl: `http://127.0.0.1:${port}` },
        flags: {},
        stateDir: dir,
      }),
    (err: { code?: string }) => err.code === "GatewayUnreachable"
  );
  assert.deepEqual(readdirSync(dir), []);
});

test("a stale gateway.json pointing at a foreign live pid is dropped, the pid is not killed", async (t) => {
  const { dir, port, tracker, acquire, extraKill } = await setup(t);
  const sleeper = spawn("sleep", ["30"], { stdio: "ignore" });
  sleeper.on("error", () => {});
  tracker.track(sleeper.pid);
  extraKill.push(() => sleeper.kill("SIGKILL"));
  const user = spawnFakeGateway(port);
  tracker.track(user.pid);
  extraKill.push(() => user.kill("SIGKILL"));
  assert.ok(await waitFor(() => healthy(port)));

  stateMod.ensureStateDir(dir);
  stateMod.writeGatewayRecord(dir, {
    generation: "stale-gen",
    state: "ready",
    reaperPid: sleeper.pid,
    serverPid: sleeper.pid,
    supervisorPid: sleeper.pid,
    port,
    host: "127.0.0.1",
    startedAt: Date.now(),
  });
  const handle = await acquire();
  assert.equal(handle.owned, false);
  assert.equal(gatewayJson(dir), null, "stale record deleted");
  assert.equal(pidAlive(sleeper.pid as number), true, "foreign pid not signalled");
  await handle.release();
  await sleep(800);
  assert.equal(pidAlive(sleeper.pid as number), true);
  sleeper.kill("SIGKILL");
});

test("lock held by a live pid yields StateLocked", async (t) => {
  const { dir, acquire } = await setup(t);
  stateMod.ensureStateDir(dir);
  writeFileSync(
    stateMod.statePaths(dir).lock,
    JSON.stringify({ pid: process.pid, at: Date.now(), token: "x" })
  );
  await assert.rejects(
    () => acquire({ overrides: { lockTimeoutMs: 300 } }),
    (err: { code?: string }) => err.code === "StateLocked"
  );
  assert.equal(gatewayJson(dir), null);
});

test("gatewayStatus with nothing running", async (t) => {
  const { dir, port } = await setup(t);
  const status = await gw.gatewayStatus({ stateDir: dir, port, overrides: acquireOverrides() });
  assert.deepEqual(status, {
    running: false,
    owned: false,
    leases: 0,
    kept: false,
    baseUrl: `http://127.0.0.1:${port}`,
  });
});

after(async () => {
  await waitFor(() => allPids.alive().length === 0, { timeoutMs: 10_000 });
  assert.deepEqual(allPids.alive(), [], "every pid seen is dead");
  for (const port of usedPorts) {
    assert.deepEqual(fakeGatewayPids(`--port ${port}`), [], `no fake gateway left on ${port}`);
  }
});
