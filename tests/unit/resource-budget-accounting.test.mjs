import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";

import * as budget from "../../scripts/dev/resource-budget.mjs";

const SCRIPT = fileURLToPath(new URL("../../scripts/dev/resource-budget.mjs", import.meta.url));
const GiB = 1024n ** 3n;
const sandboxes = [];

after(() => {
  for (const directory of sandboxes) rmSync(directory, { recursive: true, force: true });
});

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "resource-accounting-"));
  sandboxes.push(directory);
  return directory;
}

function capacityEnv(directory, available) {
  const preload = join(directory, "capacity-" + available + ".mjs");
  writeFileSync(
    preload,
    [
      'import fs from "node:fs";',
      'import { syncBuiltinESMExports } from "node:module";',
      "fs.statfsSync = () => ({ bavail: " + available + "n, bsize: 1n });",
      "syncBuiltinESMExports();",
    ].join("\n")
  );
  return { ...process.env, NODE_OPTIONS: "--import=" + preload };
}

function run(directory, operation, extra, env) {
  return spawnSync(
    process.execPath,
    [SCRIPT, operation, "--common-dir", directory, ...extra, "--json"],
    {
      encoding: "utf8",
      timeout: 15_000,
      env,
    }
  );
}

function accepted(result) {
  assert.equal(result.status, 0, "resource control exited unexpectedly");
  return JSON.parse(result.stdout);
}

function reserve(directory, env, bytes, floor, owner = process.pid) {
  return accepted(
    run(
      directory,
      "reserve",
      [
        "--reserve-bytes",
        String(bytes),
        "--floor-bytes",
        String(floor),
        "--purpose",
        "unit-active-accounting",
        "--owner-pid",
        String(owner),
      ],
      env
    )
  ).lease;
}

test("running check consumes its own admitted reservation and echoes the selected mode", () => {
  const directory = fixture();
  const high = capacityEnv(directory, 256n * GiB);
  const available = 149384761344n;
  const low = capacityEnv(directory, available);
  const lease = reserve(directory, high, 128n * GiB, 12n * GiB);
  const checkArgs = ["--lease", lease.handle];
  assert.equal(run(directory, "check", checkArgs, low).status, 75);
  const active = accepted(run(directory, "check", [...checkArgs, "--mode", "running"], low));
  assert.equal(active.checked, lease.id);
  assert.equal(active.identity, "LIVE");
  assert.equal(active.mode, "running");
  assert.equal(active.reservedBytes, String(128n * GiB));
  assert.equal(active.chargedReservedBytes, "0");
  assert.equal(active.effectiveFloorBytes, String(12n * GiB));
  assert.equal(active.remainingBytes, String(available));
  const status = accepted(run(directory, "status", [], low));
  assert.equal(status.leases.length, 1);
  assert.equal(status.reservedBytes, String(128n * GiB));
  assert.equal(status.leases[0].id, lease.id);
  const later = run(
    directory,
    "reserve",
    [
      "--reserve-bytes",
      "1",
      "--floor-bytes",
      String(12n * GiB),
      "--purpose",
      "later-admission",
      "--owner-pid",
      String(process.pid),
    ],
    low
  );
  assert.equal(later.status, 75, "running check must not reduce the original reservation");
});

test("running check protects peer reservations and the highest contracted floor", () => {
  const directory = fixture();
  const high = capacityEnv(directory, 256n * GiB);
  const own = reserve(directory, high, 128n * GiB, 12n * GiB);
  const peer = reserve(directory, high, 8n * GiB, 32n * GiB);
  const args = ["--lease", own.handle, "--mode", "running"];
  const boundary = capacityEnv(directory, 40n * GiB);
  const exact = accepted(run(directory, "check", args, boundary));
  assert.equal(exact.chargedReservedBytes, String(8n * GiB));
  assert.equal(exact.effectiveFloorBytes, String(32n * GiB));
  assert.equal(exact.remainingBytes, String(32n * GiB));
  assert.equal(run(directory, "check", args, capacityEnv(directory, 40n * GiB - 1n)).status, 75);
  const status = accepted(run(directory, "status", [], high));
  assert.equal(status.reservedBytes, String(136n * GiB));
  assert.deepEqual(new Set(status.leases.map((lease) => lease.id)), new Set([own.id, peer.id]));
});

test("headroom remains the default and admission still requires the whole requested reserve", () => {
  const directory = fixture();
  const high = capacityEnv(directory, 256n * GiB);
  const lease = reserve(directory, high, 128n * GiB, 12n * GiB);
  const args = ["--lease", lease.handle];
  const boundary = capacityEnv(directory, 140n * GiB);
  for (const extra of [[], ["--mode", "headroom"]]) {
    const result = accepted(run(directory, "check", [...args, ...extra], boundary));
    assert.equal(result.mode, "headroom");
    assert.equal(result.chargedReservedBytes, String(128n * GiB));
    assert.equal(result.remainingBytes, String(12n * GiB));
    assert.equal(
      run(directory, "check", [...args, ...extra], capacityEnv(directory, 140n * GiB - 1n)).status,
      75
    );
  }
});

test("running mode still requires a valid capability and rejects unknown modes", () => {
  const directory = fixture();
  const env = capacityEnv(directory, 256n * GiB);
  const lease = reserve(directory, env, 128n * GiB, 12n * GiB);
  const forged = lease.id + "." + "0".repeat(64);
  assert.equal(run(directory, "check", ["--lease", forged, "--mode", "running"], env).status, 78);
  assert.equal(
    run(directory, "check", ["--lease", lease.handle, "--mode", "unknown"], env).status,
    2
  );
  assert.equal(
    run(
      directory,
      "check",
      ["--lease", lease.handle, "--mode", "running", "--mode", "headroom"],
      env
    ).status,
    2
  );
  const status = accepted(run(directory, "status", [], env));
  assert.equal(status.leases.length, 1);
  assert.equal(status.reservedBytes, String(128n * GiB));
});

test("running mode cannot validate a stale owner or release its reservation", async () => {
  const directory = fixture();
  const env = capacityEnv(directory, 256n * GiB);
  const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], { stdio: "ignore" });
  try {
    await once(child, "spawn");
    const lease = reserve(directory, env, 128n * GiB, 12n * GiB, child.pid);
    const exited = once(child, "exit");
    child.kill("SIGTERM");
    await exited;
    assert.equal(
      run(directory, "check", ["--lease", lease.handle, "--mode", "running"], env).status,
      78
    );
    const status = accepted(run(directory, "status", [], env));
    assert.equal(status.leases.length, 1);
    assert.equal(status.leases[0].identity, "STALE");
    assert.equal(status.reservedBytes, String(128n * GiB));
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      const exited = once(child, "exit");
      child.kill("SIGTERM");
      await exited;
    }
  }
});

test("pure lease accounting preserves boundaries and rejects inconsistent inputs", () => {
  const input = {
    available: 12n * GiB,
    reserved: 128n * GiB,
    ownReserved: 128n * GiB,
    floor: 12n * GiB,
  };
  assert.equal(budget.evaluateLeaseCheck({ ...input, mode: "running" }).allowed, true);
  assert.equal(
    budget.evaluateLeaseCheck({ ...input, available: input.available - 1n, mode: "running" })
      .allowed,
    false
  );
  assert.equal(budget.evaluateLeaseCheck(input).allowed, false);
  assert.throws(
    () => budget.evaluateLeaseCheck({ ...input, mode: "invalid" }),
    (error) => error.exitCode === 2
  );
  assert.throws(
    () =>
      budget.evaluateLeaseCheck({ ...input, ownReserved: input.reserved + 1n, mode: "running" }),
    (error) => error.exitCode === 78
  );
  assert.deepEqual(
    budget.evaluateAdmission({
      available: 140n * GiB,
      reserved: 0n,
      requested: 128n * GiB,
      floor: 12n * GiB,
    }),
    { allowed: true, remaining: 12n * GiB }
  );
});
