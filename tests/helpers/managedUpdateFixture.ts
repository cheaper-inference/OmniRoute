/**
 * Throwaway fake install shared by the managed update tests: a temp "global" package tree, a fake
 * `npm` script and tiny fake servers. Nothing here touches a real service, a real npm prefix or a
 * real data directory; every process it starts is stopped by pid in `teardown`.
 */
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import {
  createDefaultPreflightContext,
  preflightManagedUpdate,
} from "../../bin/cli/updateTransaction.mjs";

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

export type Env = {
  root: string;
  dataDir: string;
  packageRoot: string;
  registry: string;
  npmPath: string;
  port: number;
  spawnedPids: Set<number>;
};

export async function freePort(): Promise<number> {
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

export async function setup(): Promise<Env> {
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
if [ "$1" = "root" ]; then
  [ -n "$FAKE_NPM_ROOT_FAILS" ] && exit 1
  echo "\${FAKE_NPM_GLOBAL_ROOT:-$(dirname "$PKG")}"
  exit 0
fi
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
export function hermeticServiceEnv(env: Env): Record<string, string> {
  return {
    PATH: "/usr/local/bin:/usr/bin:/bin",
    HOME: env.root,
    DATA_DIR: env.dataDir,
    PORT: String(env.port),
  };
}

const SESSION_CGROUP = "0::/user.slice/user-1000.slice/session-1.scope\n";

export function hermeticProcDeps() {
  return {
    readFileSync: (file: string) =>
      file.endsWith("/cgroup") ? SESSION_CGROUP : fs.readFileSync(file, "utf8"),
  };
}

export function startOldServer(env: Env) {
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

export async function waitForPing(port: number, timeoutMs = 10_000) {
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

export function teardown(env: Env) {
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

export const PREVIOUS_VERSION = "3.8.54";

/** The pre-flight against the fixture, with every host signal pinned. */
export async function preflightFor(
  env: Env,
  plan: { operationId: string; previousVersion: string; targetVersion: string }
) {
  const ctx = createDefaultPreflightContext({
    dataDir: env.dataDir,
    packageRoot: env.packageRoot,
    env: {},
    procDeps: hermeticProcDeps(),
  });
  ctx.isContainer = () => false; // the dev box itself may be a container
  ctx.globalRoot = async () => path.dirname(env.packageRoot);
  ctx.npmPath = env.npmPath;
  return preflightManagedUpdate(ctx, plan);
}

export function installedVersion(env: Env) {
  return JSON.parse(fs.readFileSync(path.join(env.packageRoot, "package.json"), "utf8")).version;
}
