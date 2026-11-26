import assert from "node:assert/strict";
import type { ChildProcess } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mitm-port-"));
const previousData = process.env.DATA_DIR;
process.env.DATA_DIR = data;
const {
  __setServerProcessForTest,
  getMitmStatus,
  handleExitCleanup,
  handleMitmChildExit,
  resolveMitmPort,
  startMitm,
  stopMitm,
} = await import("../../src/mitm/manager.ts");
const { summarizeDiagnostics } = await import("../../src/mitm/inspector/diagnostics.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  if (previousData === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousData;
  fs.rmSync(data, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("AgentBridge resolves the requested port, configured port and legacy default", (t) => {
  const previousPort = process.env.MITM_LOCAL_PORT;
  delete process.env.MITM_LOCAL_PORT;
  t.after(() => {
    if (previousPort !== undefined) process.env.MITM_LOCAL_PORT = previousPort;
  });
  assert.equal(resolveMitmPort(undefined, undefined), 443);
  assert.equal(resolveMitmPort(undefined, "18443"), 18443);
  assert.equal(resolveMitmPort(443, "18443"), 443);
  assert.equal(resolveMitmPort(24443, "18443"), 24443);
});

test("AgentBridge fails closed on invalid configured ports", () => {
  for (const invalid of ["", "x", "0", "65536", "18443suffix", "1.5", "1e3"]) {
    assert.throws(() => resolveMitmPort(undefined, invalid), /MITM_LOCAL_PORT/);
  }
  for (const invalid of [0, 65536, 1.5, NaN]) {
    assert.throws(() => resolveMitmPort(invalid, undefined), /port/i);
  }
});

function fakeChild(events: string[]) {
  return {
    killed: false,
    kill() {
      this.killed = true;
      events.push("kill");
      return true;
    },
  } as unknown as ChildProcess;
}

test("alternate port status reflects its effective port and the lifecycle leaves DNS alone", async () => {
  const events: string[] = [];
  const deps = {
    getCachedPassword: () => "fixture-password",
    removeDNSEntry: async () => {
      events.push("remove DNS");
    },
    removeDNSEntries: async () => {
      events.push("remove managed DNS");
    },
    collectManagedHosts: () => ["fixture.invalid"],
  };
  const proc = fakeChild(events);
  __setServerProcessForTest(proc, 12345, 18443);
  const status = await getMitmStatus();
  assert.equal(status.port, 18443);
  assert.equal(status.effectivePort, 18443);
  assert.equal(status.transparent, false);
  assert.equal(status.dnsConfigured, false);
  await handleExitCleanup("test", deps);
  assert.deepEqual(events, ["kill"]);

  const crash = fakeChild(events);
  __setServerProcessForTest(crash, 12345, 18443);
  await handleMitmChildExit(crash, 1, { startConfirmed: true, transparent: false }, deps);
  assert.deepEqual(events, ["kill"]);

  __setServerProcessForTest(fakeChild(events), 12345, 18443);
  assert.deepEqual(await stopMitm("fixture-password", deps), { running: false, pid: null });
  assert.deepEqual(events, ["kill", "kill"]);
});

test("alternate diagnostics use the listener and local certificate without requiring OS changes", () => {
  const report = summarizeDiagnostics({
    serverRunning: true,
    serverReachable: true,
    certExists: true,
    certTrusted: false,
    dnsConfigured: false,
    transparent: false,
  });
  assert.deepEqual(
    report.checks.map(({ name }) => name),
    ["server-running", "server-reachable", "cert-exists"]
  );
  assert.equal(report.healthy, true);
});

test("status recovers the actual port from the persisted process record", async () => {
  fs.mkdirSync(path.join(data, "mitm"), { recursive: true });
  const file = path.join(data, "mitm", ".mitm.pid");
  fs.writeFileSync(file, `${process.pid}\n18443\n`);
  try {
    const status = await getMitmStatus();
    assert.equal(status.running, true);
    assert.equal(status.pid, process.pid);
    assert.equal(status.effectivePort, 18443);
    assert.equal(status.transparent, false);
  } finally {
    fs.rmSync(file);
  }
});

test("start refuses to replace a live persisted AgentBridge on another port", async (t) => {
  const dir = path.join(data, "mitm");
  const file = path.join(dir, ".mitm.pid");
  const record = `${process.pid}\n18443\n`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, record);
  // A broken start would try to read this directory as a key and stop before spawning.
  for (const name of ["ca.key", "ca.crt"]) {
    fs.mkdirSync(path.join(dir, name));
    t.after(() => fs.rmdirSync(path.join(dir, name)));
  }
  t.after(() => fs.rmSync(file));

  await assert.rejects(startMitm("fixture-key", "", { port: 24443 }), /already running/);
  assert.equal(fs.readFileSync(file, "utf8"), record);
});
