/**
 * End-to-end check of the managed update with the REAL coordinator, process control, snapshot
 * and restore code, against a throwaway fake install: a temp "global" package tree, a fake
 * `npm` script and tiny fake servers. Nothing here touches a real service, a real npm prefix
 * or a real data directory; every process it starts is stopped by pid.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const tx = await import("../../bin/cli/updateTransaction.mjs");

const FAKE_BIN = `#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const self = fileURLToPath(import.meta.url);
const pkg = JSON.parse(readFileSync(join(dirname(self), "..", "package.json"), "utf8"));
const args = process.argv.slice(2);
const dataDir = process.env.DATA_DIR;
if (args[0] === "serve" && args.includes("--daemon")) {
  const child = spawn(process.execPath, [self, "__server"], {
    detached: true,
    stdio: "ignore",
    env: process.env,
  });
  mkdirSync(join(dataDir, "server"), { recursive: true });
  writeFileSync(join(dataDir, "server", ".pid"), String(child.pid));
  child.unref();
} else if (args[0] === "__server") {
  if (pkg.migrates) writeFileSync(join(dataDir, "storage.sqlite"), "MIGRATED-BY-" + pkg.version);
  if (pkg.failStart) process.exit(1);
  createServer((req, res) => {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ status: "ok" }));
  }).listen(Number(process.env.PORT), "127.0.0.1");
}
`;

type Env = {
  root: string;
  dataDir: string;
  packageRoot: string;
  registry: string;
  npmPath: string;
  port: number;
  spawnedPids: Set<number>;
};

async function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address() as net.AddressInfo;
      probe.close(() => resolve(port));
    });
  });
}

function writeVersion(dir: string, version: string, extra: Record<string, unknown> = {}) {
  fs.mkdirSync(path.join(dir, "bin"), { recursive: true });
  fs.writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify({ name: "omniroute", version, ...extra })
  );
  fs.writeFileSync(path.join(dir, "bin", "omniroute.mjs"), FAKE_BIN, { mode: 0o755 });
}

async function setup(): Promise<Env> {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "omni-update-e2e-")));
  const registry = path.join(root, "registry");
  const packageRoot = path.join(root, "lib", "node_modules", "omniroute");
  const dataDir = path.join(root, "data");
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, "storage.sqlite"), "ORIGINAL-DB");
  writeVersion(path.join(registry, "3.8.54"), "3.8.54");
  writeVersion(path.join(registry, "3.8.55"), "3.8.55", { migrates: true });
  writeVersion(path.join(registry, "3.8.56"), "3.8.56", { migrates: true, failStart: true });
  writeVersion(path.join(registry, "3.8.57"), "3.8.57", { installFails: true });
  fs.cpSync(path.join(registry, "3.8.54"), packageRoot, { recursive: true });

  const npmPath = path.join(root, "fake-npm");
  fs.writeFileSync(
    npmPath,
    `#!/bin/sh
REGISTRY='${registry}'
PKG='${packageRoot}'
spec="$2"
if [ "$1" = "view" ]; then
  v="\${spec#omniroute@}"
  [ -d "$REGISTRY/$v" ] && { echo "$v"; exit 0; }
  exit 1
fi
if [ "$1" = "install" ]; then
  v="\${3#omniroute@}"
  [ -d "$REGISTRY/$v" ] || exit 1
  if [ -f "$REGISTRY/$v/package.json" ] && grep -q installFails "$REGISTRY/$v/package.json"; then
    rm -rf "$PKG/bin"
    echo "npm ERR! partial install" >&2
    exit 1
  fi
  rm -rf "$PKG"
  cp -r "$REGISTRY/$v" "$PKG"
  exit 0
fi
exit 1
`,
    { mode: 0o755 }
  );
  return {
    root,
    dataDir,
    packageRoot,
    registry,
    npmPath,
    port: await freePort(),
    spawnedPids: new Set(),
  };
}

// The detector reads the service's own environment and cgroup. Both are pinned here so a host
// (a CI runner under a systemd unit, a shell with INVOCATION_ID, PM2_*, CI=true) cannot change
// the verdict: the fake service gets an explicit minimal environment and never inherits
// process.env, and the cgroup is answered by a fixed session scope.
function hermeticServiceEnv(env: Env): Record<string, string> {
  return {
    PATH: "/usr/local/bin:/usr/bin:/bin",
    HOME: env.root,
    DATA_DIR: env.dataDir,
    PORT: String(env.port),
  };
}

const SESSION_CGROUP = "0::/user.slice/user-1000.slice/session-1.scope\n";

function hermeticProcDeps() {
  return {
    readFileSync: (file: string) =>
      file.endsWith("/cgroup") ? SESSION_CGROUP : fs.readFileSync(file, "utf8"),
  };
}

function startOldServer(env: Env) {
  const child = spawn(
    process.execPath,
    [path.join(env.packageRoot, "bin", "omniroute.mjs"), "__server"],
    {
      detached: true,
      stdio: "ignore",
      env: hermeticServiceEnv(env),
    }
  );
  child.unref();
  fs.mkdirSync(path.join(env.dataDir, "server"), { recursive: true });
  fs.writeFileSync(path.join(env.dataDir, "server", ".pid"), String(child.pid));
  env.spawnedPids.add(child.pid!);
  return child.pid!;
}

async function waitForPing(port: number, timeoutMs = 10_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/health/ping`, {
        signal: AbortSignal.timeout(1000),
      });
      if (res.status === 200) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  return false;
}

function teardown(env: Env) {
  const pidFile = path.join(env.dataDir, "server", ".pid");
  try {
    env.spawnedPids.add(parseInt(fs.readFileSync(pidFile, "utf8"), 10));
  } catch {
    // no pid file
  }
  for (const pid of env.spawnedPids) {
    try {
      process.kill(pid, "SIGKILL");
    } catch {
      // already gone
    }
  }
  fs.rmSync(env.root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}

async function runUpdate(env: Env, targetVersion: string, readinessTimeoutMs: number) {
  const plan = {
    operationId: "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f",
    previousVersion: "3.8.54",
    targetVersion,
    readinessTimeoutMs,
    pollIntervalMs: 100,
  };
  const ctx = tx.createDefaultPreflightContext({
    dataDir: env.dataDir,
    packageRoot: env.packageRoot,
    env: {},
    procDeps: hermeticProcDeps(),
  });
  ctx.isContainer = () => false; // the dev box itself may be a container
  ctx.globalRoot = async () => path.dirname(env.packageRoot);
  ctx.npmPath = env.npmPath;
  const pre = await tx.preflightManagedUpdate(ctx, plan);
  assert.equal(pre.kind, "ok", JSON.stringify(pre));
  await tx.launchManagedUpdateCoordinator({
    plan,
    runtime: pre.runtime,
    environment: pre.environment,
  });
  const state = await tx.waitForManagedUpdateOutcome(env.dataDir, plan.operationId, {
    timeoutMs: 90_000,
    pollMs: 100,
  });
  return { plan, state };
}

function version(env: Env) {
  return JSON.parse(fs.readFileSync(path.join(env.packageRoot, "package.json"), "utf8")).version;
}

test("e2e: a healthy target is installed, started, proven ready and the snapshots are discarded", async () => {
  const env = await setup();
  try {
    startOldServer(env);
    assert.equal(await waitForPing(env.port), true, "the fake old service must be up first");
    const { plan, state } = await runUpdate(env, "3.8.55", 10_000);
    assert.equal(state.status, "updated", JSON.stringify(state));
    assert.equal(state.runningVersion, "3.8.55");
    assert.equal(version(env), "3.8.55");
    assert.equal(
      fs.readFileSync(path.join(env.dataDir, "storage.sqlite"), "utf8"),
      "MIGRATED-BY-3.8.55"
    );
    assert.equal(await waitForPing(env.port), true, "the new service answers");
    const opDir = tx.operationDir(env.dataDir, plan.operationId);
    assert.equal(fs.existsSync(path.join(opDir, "data-snapshot")), false);
    assert.equal(fs.existsSync(path.join(opDir, "previous-package")), false);
    assert.equal(tx.isLockHeld(env.dataDir), false, "lock released");
  } finally {
    teardown(env);
  }
});

test("e2e: a target that migrates the data and then fails to start is rolled back with the data restored", async () => {
  const env = await setup();
  try {
    startOldServer(env);
    assert.equal(await waitForPing(env.port), true);
    const { plan, state } = await runUpdate(env, "3.8.56", 10_000);
    assert.equal(state.status, "rolled-back", JSON.stringify(state));
    assert.equal(state.runningVersion, "3.8.54");
    assert.equal(state.reason, "target-not-ready");
    assert.equal(version(env), "3.8.54");
    assert.equal(fs.readFileSync(path.join(env.dataDir, "storage.sqlite"), "utf8"), "ORIGINAL-DB");
    assert.equal(await waitForPing(env.port), true, "the previous version answers again");
    // The failed tree and the candidate's data are kept for diagnosis.
    const siblings = fs.readdirSync(path.dirname(env.packageRoot));
    assert.ok(
      siblings.some((name) => name.startsWith("omniroute.failed-")),
      siblings.join(",")
    );
    const opDir = tx.operationDir(env.dataDir, plan.operationId);
    assert.equal(
      fs.readFileSync(path.join(opDir, "candidate-data", "storage.sqlite"), "utf8"),
      "MIGRATED-BY-3.8.56"
    );
    assert.equal(tx.isLockHeld(env.dataDir), false);
  } finally {
    teardown(env);
  }
});

test("e2e: a partial npm install error restores the package and brings the previous version back", async () => {
  const env = await setup();
  try {
    startOldServer(env);
    assert.equal(await waitForPing(env.port), true);
    const { state } = await runUpdate(env, "3.8.57", 10_000);
    assert.equal(state.status, "rolled-back", JSON.stringify(state));
    assert.equal(state.reason, "install-failed");
    assert.equal(version(env), "3.8.54");
    assert.ok(fs.existsSync(path.join(env.packageRoot, "bin", "omniroute.mjs")));
    assert.equal(fs.readFileSync(path.join(env.dataDir, "storage.sqlite"), "utf8"), "ORIGINAL-DB");
    assert.equal(await waitForPing(env.port), true);
  } finally {
    teardown(env);
  }
});

test("e2e: a target missing from the registry is refused before anything stops", async () => {
  const env = await setup();
  try {
    const oldPid = startOldServer(env);
    assert.equal(await waitForPing(env.port), true);
    const { state } = await runUpdate(env, "9.9.9", 2_500);
    assert.equal(state.status, "unsupported", JSON.stringify(state));
    assert.equal(state.reason, "target-unavailable");
    assert.equal(state.refused, true);
    assert.equal(version(env), "3.8.54");
    process.kill(oldPid, 0); // still alive: throws if it was stopped
    assert.equal(await waitForPing(env.port), true);
  } finally {
    teardown(env);
  }
});
