// Tests for the gateway reaper (core/reaper.mjs): crash sweeping, external stop, adopt, spec parsing.
import { after, test } from "node:test";
import type { TestContext } from "node:test";
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import {
  CORE,
  HERE,
  acquireOverrides,
  createPidTracker,
  fakeGatewayPids,
  freePort,
  gatewayJson,
  healthy,
  makeTempDir,
  pidAlive,
  reaperPids,
  removeDir,
  sleep,
  snapshotPids,
  waitFor,
} from "./_fixtures/gateway/harness.mjs";

const gw = await import(pathToFileURL(join(CORE, "gateway.mjs")).href);
const reaper = await import(pathToFileURL(join(CORE, "reaper.mjs")).href);
const stateMod = await import(pathToFileURL(join(CORE, "gateway", "state.mjs")).href);
const leaseMod = await import(pathToFileURL(join(CORE, "lease.mjs")).href);

const GATEWAY_URL = pathToFileURL(join(CORE, "gateway.mjs")).href;
const CRASH_LAUNCHER = join(HERE, "crash-launcher.mjs");
const FAKE_PATH = join(HERE, "fake-gateway.mjs");

const allPids = createPidTracker();
const usedPorts = new Set<number>();

type Handle = { baseUrl: string; owned: boolean; release: () => Promise<void> };

async function setup(t: TestContext) {
  const dir = makeTempDir("launch-reaper-");
  const port = await freePort();
  usedPorts.add(port);
  const tracker = createPidTracker();
  const handles: Handle[] = [];
  t.after(async () => {
    for (const h of handles) await h.release().catch(() => {});
    snapshotPids(dir, tracker);
    for (const pid of reaperPids(dir)) tracker.track(pid);
    tracker.killAll();
    for (const pid of tracker.seen) allPids.track(pid);
    await waitFor(() => tracker.alive().length === 0, { timeoutMs: 5000 });
    removeDir(dir);
  });
  const acquire = async (overrides: Record<string, unknown> = {}) => {
    const handle: Handle = await gw.acquireGateway({
      target: { kind: "local" },
      flags: { port, startTimeoutMs: 15_000 },
      stateDir: dir,
      overrides: acquireOverrides(overrides),
    });
    handles.push(handle);
    snapshotPids(dir, tracker);
    return handle;
  };
  const ready = () =>
    waitFor(() => {
      const g = gatewayJson(dir);
      return g && g.state === "ready" ? g : null;
    });
  return { dir, port, tracker, acquire, ready };
}

function deadPid(): number {
  return spawnSync(process.execPath, ["-e", ""]).pid as number;
}

function writeLease(dir: string, id: string, record: Record<string, unknown>) {
  stateMod.ensureStateDir(dir);
  stateMod.writeJsonFile(stateMod.leasePath(dir, id), { leaseId: id, ...record });
}

test("reaper ignores dead and stale leases and stops the gateway after grace", async (t) => {
  const { dir, port, tracker, acquire, ready } = await setup(t);
  const handle = await acquire();
  const g = await ready();
  assert.ok(g);
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);

  const now = Date.now();
  writeLease(dir, "dead-pid", {
    pid: deadPid(),
    heartbeatAt: now,
    createdAt: now,
    generation: g.generation,
    owned: true,
  });
  writeLease(dir, "stale-beat", {
    pid: process.pid,
    heartbeatAt: now - 60_000,
    createdAt: now - 60_000,
    generation: g.generation,
    owned: true,
  });
  assert.equal(leaseMod.liveLeases(dir).length, 1, "only the real lease is live");

  await handle.release();
  assert.ok(await waitFor(() => !pidAlive(g.serverPid)), "gateway stopped despite stale leases");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper exited");
  assert.equal(gatewayJson(dir), null);
  assert.equal(await healthy(port), false);
});

test("a crashed launcher is swept: gateway stops once its lease is dead", async (t) => {
  const { dir, port, tracker } = await setup(t);
  const launcher = spawn(
    process.execPath,
    [CRASH_LAUNCHER, GATEWAY_URL, dir, String(port), FAKE_PATH],
    { stdio: ["ignore", "pipe", "inherit"] }
  );
  tracker.track(launcher.pid);
  let out = "";
  launcher.stdout.on("data", (chunk: Buffer) => (out += chunk));
  const line = await waitFor(() => /READY (\d+) (\d+) (\w+)/.exec(out), { timeoutMs: 20_000 });
  assert.ok(line, `launcher acquired a gateway (output: ${out})`);
  const serverPid = Number(line[1]);
  assert.equal(line[3], "true");
  tracker.track(serverPid);
  const g = gatewayJson(dir);
  assert.ok(g);
  tracker.track(g.reaperPid);
  assert.equal(pidAlive(serverPid), true);

  // While the launcher lives and heartbeats, the gateway stays up well beyond grace.
  await sleep(1200);
  assert.equal(pidAlive(serverPid), true, "alive while the launcher heartbeats");

  launcher.kill("SIGKILL");
  assert.ok(await waitFor(() => !pidAlive(launcher.pid as number)), "launcher dead");
  assert.ok(await waitFor(() => !pidAlive(serverPid)), "gateway swept after the crash");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper exited");
  assert.equal(gatewayJson(dir), null);
});

test("a frozen launcher (live pid, no heartbeat) is swept once its lease goes stale", async (t) => {
  const { dir, port, tracker } = await setup(t);
  const launcher = spawn(
    process.execPath,
    [CRASH_LAUNCHER, GATEWAY_URL, dir, String(port), FAKE_PATH],
    { stdio: ["ignore", "pipe", "inherit"] }
  );
  tracker.track(launcher.pid);
  let out = "";
  launcher.stdout.on("data", (chunk: Buffer) => (out += chunk));
  const line = await waitFor(() => /READY (\d+) (\d+) (\w+)/.exec(out), { timeoutMs: 20_000 });
  assert.ok(line, `launcher acquired a gateway (output: ${out})`);
  const serverPid = Number(line[1]);
  tracker.track(serverPid);
  const g = gatewayJson(dir);
  assert.ok(g);
  tracker.track(g.reaperPid);

  launcher.kill("SIGSTOP"); // pid stays alive, heartbeats stop
  t.after(() => launcher.kill("SIGKILL"));
  assert.equal(pidAlive(launcher.pid as number), true);
  assert.ok(await waitFor(() => !pidAlive(serverPid)), "gateway swept after the lease went stale");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper exited");
  assert.equal(gatewayJson(dir), null);
});

test("external stop: reaper removes gateway.json and exits", async (t) => {
  const { dir, tracker, acquire, ready } = await setup(t);
  await acquire();
  const g = await ready();
  assert.ok(g);
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);

  process.kill(g.serverPid, "SIGKILL");
  assert.ok(await waitFor(() => !pidAlive(g.serverPid)));
  assert.ok(await waitFor(() => gatewayJson(dir) === null), "gateway.json removed");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "reaper exited");
});

test("adopt: a killed reaper is replaced on the next acquire and still stops the gateway", async (t) => {
  const { dir, port, tracker, acquire, ready } = await setup(t);
  const first = await acquire();
  const g = await ready();
  assert.ok(g);
  tracker.track(g.serverPid);
  tracker.track(g.reaperPid);

  process.kill(g.reaperPid, "SIGKILL");
  assert.ok(await waitFor(() => !pidAlive(g.reaperPid)), "old reaper dead");
  assert.equal(pidAlive(g.serverPid), true, "gateway outlives its reaper");

  const second = await acquire();
  assert.equal(second.owned, true);
  const after = gatewayJson(dir);
  assert.ok(after);
  assert.equal(after.generation, g.generation, "same generation is adopted");
  assert.notEqual(after.reaperPid, g.reaperPid);
  tracker.track(after.reaperPid);
  assert.ok(await waitFor(() => pidAlive(after.reaperPid)), "new reaper running");
  assert.equal(after.serverPid, g.serverPid);

  await first.release();
  await sleep(800);
  assert.equal(pidAlive(g.serverPid), true, "still leased by the second acquire");
  await second.release();
  assert.ok(await waitFor(() => !pidAlive(g.serverPid)), "gateway stopped by the new reaper");
  assert.ok(await waitFor(() => !pidAlive(after.reaperPid)), "new reaper exited");
  assert.equal(gatewayJson(dir), null);
  assert.equal(await healthy(port), false);
});

test("parseReaperSpec validates and defaults", () => {
  const spec = reaper.parseReaperSpec(
    JSON.stringify({ stateDir: "/x", generation: "g", port: 1234, mode: "adopt" })
  );
  assert.equal(spec.mode, "adopt");
  assert.equal(spec.port, 1234);
  assert.equal(spec.graceMs, reaper.DEFAULT_GRACE_MS);
  assert.equal(spec.scanMs, reaper.DEFAULT_SCAN_MS);
  assert.equal(spec.command, null);
  assert.equal(spec.startTimeoutMs, 60_000);

  const spawnSpec = reaper.parseReaperSpec(
    JSON.stringify({
      stateDir: "/x",
      generation: "g",
      port: 80,
      mode: "bogus",
      command: ["node", 1, "{port}"],
      graceMs: 0,
      scanMs: -5,
    })
  );
  assert.equal(spawnSpec.mode, "spawn");
  assert.deepEqual(spawnSpec.command, ["node", "1", "{port}"]);
  assert.equal(spawnSpec.graceMs, 0, "zero grace is honoured");
  assert.equal(spawnSpec.scanMs, reaper.DEFAULT_SCAN_MS, "negative scan falls back");

  const bad = [
    "",
    "not json",
    "null",
    JSON.stringify({ generation: "g", port: 1 }),
    JSON.stringify({ stateDir: "/x", port: 1 }),
    JSON.stringify({ stateDir: "/x", generation: "g" }),
    JSON.stringify({ stateDir: "/x", generation: "g", port: 0 }),
    JSON.stringify({ stateDir: "/x", generation: "g", port: 70000 }),
    JSON.stringify({ stateDir: "/x", generation: "g", port: "80" }),
  ];
  for (const raw of bad) assert.throws(() => reaper.parseReaperSpec(raw), `rejects ${raw}`);
});

test("gatewayChildEnv adds OMNIROUTE_SERVER_HOST and drops the spec var", () => {
  const env = reaper.gatewayChildEnv({
    KEEP: "1",
    OMNIROUTE_SERVER_HOST: "0.0.0.0",
    [reaper.REAPER_SPEC_ENV]: "{}",
  });
  assert.equal(env.OMNIROUTE_SERVER_HOST, "127.0.0.1");
  assert.equal(env.KEEP, "1");
  assert.equal(reaper.REAPER_SPEC_ENV in env, false);
  assert.equal(reaper.gatewayChildEnv({}).OMNIROUTE_SERVER_HOST, "127.0.0.1");
});

after(async () => {
  await waitFor(() => allPids.alive().length === 0, { timeoutMs: 10_000 });
  assert.deepEqual(allPids.alive(), [], "every pid seen is dead");
  for (const port of usedPorts) {
    assert.deepEqual(fakeGatewayPids(`--port ${port}`), [], `no fake gateway left on ${port}`);
  }
});
