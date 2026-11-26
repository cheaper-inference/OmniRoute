// Shared helpers for the gateway lifecycle tests (state, gateway, reaper). Plain .mjs.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import http from "node:http";
import net from "node:net";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const HERE = dirname(fileURLToPath(import.meta.url));
export const FAKE = join(HERE, "fake-gateway.mjs");
export const PROBE = join(HERE, "env-probe-gateway.mjs");
export const CORE = join(HERE, "..", "..", "..", "..", "..", "..", "bin", "cli", "launch", "core");

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function pidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
  } catch (err) {
    return err?.code === "EPERM";
  }
  try {
    // A zombie still answers kill(0); treat it as dead.
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
    return !/^\d+ \(.*\) Z/.test(stat);
  } catch {
    return true;
  }
}

export async function waitFor(fn, { timeoutMs = 10_000, pollMs = 40 } = {}) {
  const start = Date.now();
  for (;;) {
    const value = await fn();
    if (value) return value;
    if (Date.now() - start >= timeoutMs) return value;
    await sleep(pollMs);
  }
}

export async function freePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

export function makeTempDir(prefix = "launch-gw-") {
  return mkdtempSync(join(tmpdir(), prefix));
}

export function removeDir(dir) {
  try {
    rmSync(dir, { recursive: true, force: true });
  } catch {}
}

/** Tracks every pid a test learned so it can be killed and asserted dead afterwards. */
export function createPidTracker() {
  const seen = new Set();
  return {
    seen,
    track(pid) {
      if (Number.isInteger(pid) && pid > 0) seen.add(pid);
      return pid;
    },
    killAll() {
      for (const pid of seen) {
        try {
          process.kill(pid, "SIGKILL");
        } catch {}
      }
    },
    alive() {
      return [...seen].filter((pid) => pidAlive(pid));
    },
  };
}

/** Records every pid in gateway.json (and lease files) of a state dir. */
export function snapshotPids(stateDir, tracker) {
  const g = readJson(join(stateDir, "gateway.json"));
  if (g) {
    tracker.track(g.reaperPid);
    tracker.track(g.serverPid);
    tracker.track(g.supervisorPid);
  }
  return g;
}

export function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

export function gatewayJson(stateDir) {
  return readJson(join(stateDir, "gateway.json"));
}

export function hasFile(path) {
  return existsSync(path);
}

/** Start a fake gateway directly (a "user" gateway). */
export function spawnFakeGateway(port, extraArgs = []) {
  const child = spawn(process.execPath, [FAKE, "--port", String(port), ...extraArgs], {
    stdio: "ignore",
  });
  child.on("error", () => {});
  return child;
}

export async function healthy(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/monitoring/health`, {
      signal: AbortSignal.timeout(1500),
    });
    await res.arrayBuffer().catch(() => {});
    return res.ok;
  } catch {
    return false;
  }
}

/** A non-OmniRoute server: answers 404 on every path. */
export async function listen404(port) {
  const server = http.createServer((_req, res) => {
    res.writeHead(404);
    res.end();
  });
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  return {
    close: () =>
      new Promise((resolve) => {
        server.closeAllConnections?.();
        server.close(() => resolve());
      }),
  };
}

export function acquireOverrides(extra = {}) {
  return {
    gatewayCommand: [process.execPath, FAKE, "--port", "{port}"],
    graceMs: 300,
    scanMs: 100,
    lockTimeoutMs: 5000,
    ...extra,
  };
}

/** Pids whose command line mentions fake-gateway.mjs and the given needle (linux /proc). */
export function fakeGatewayPids(needle) {
  const out = [];
  try {
    for (const name of readdirSync("/proc")) {
      if (!/^\d+$/.test(name)) continue;
      try {
        const cmd = readFileSync(`/proc/${name}/cmdline`, "utf8").replaceAll("\0", " ");
        if (cmd.includes("fake-gateway.mjs") && cmd.includes(needle) && pidAlive(Number(name))) {
          out.push(Number(name));
        }
      } catch {}
    }
  } catch {}
  return out;
}

/** Live reaper pids whose spec env names `stateDir` (reads /proc/<pid>/environ, linux). */
export function reaperPids(stateDir) {
  const out = [];
  try {
    for (const name of readdirSync("/proc")) {
      if (!/^\d+$/.test(name)) continue;
      try {
        const env = readFileSync(`/proc/${name}/environ`, "utf8");
        const cmd = readFileSync(`/proc/${name}/cmdline`, "utf8");
        if (
          env.includes("OMNIROUTE_LAUNCH_REAPER_SPEC=") &&
          env.includes(JSON.stringify(stateDir).slice(1, -1)) &&
          /reaper/.test(cmd) &&
          pidAlive(Number(name))
        ) {
          out.push(Number(name));
        }
      } catch {}
    }
  } catch {}
  return out;
}
