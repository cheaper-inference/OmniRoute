#!/usr/bin/env node
// bin/cli/launch/core/reaper.mjs: the gateway owner process.
//
// Spawned detached by core/gateway/local-reaper.mjs with its spec in OMNIROUTE_LAUNCH_REAPER_SPEC
// (JSON, no secrets). It:
//   1. (spawn mode) runs the gateway command (default `omniroute serve --headless --no-open
//      --port P`) as a detached child whose env adds OMNIROUTE_SERVER_HOST=127.0.0.1, and records
//      its pids in gateway.json; (adopt mode) watches an existing launcher gateway whose reaper died,
//   2. marks gateway.json ready once /api/monitoring/health answers,
//   3. every scanMs scans leases/; after graceMs with zero live leases it re-checks under the lock,
//      marks "stopping", stops the gateway (supervisor first, then the server), deletes
//      gateway.json and exits.
// It exits WITHOUT stopping when gateway.json says "kept" (or no longer belongs to it), and exits
// after cleanup when its gateway goes away on its own (`omniroute stop`).
//
// Plain .mjs on purpose: runs under bare `node`, never imports .ts.

import { spawn } from "node:child_process";
import { closeSync, existsSync, openSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { isPidRunning, readPidFile, sleep, waitForServer } from "../../utils/pid.mjs";
import { liveLeases, LEASE_STALE_MS } from "./lease.mjs";
import { isOurProcessAlive, stopPidGracefully, waitForPidExit } from "./gateway/process.mjs";
import {
  readGatewayRecord,
  removeFile,
  removeGatewayRecord,
  stopRequestPath,
  statePaths,
  takeLock,
  writeGatewayRecord,
} from "./gateway/state.mjs";

export const REAPER_SPEC_ENV = "OMNIROUTE_LAUNCH_REAPER_SPEC";
export const DEFAULT_GRACE_MS = 10_000;
export const DEFAULT_SCAN_MS = 2_000;

function log(message) {
  try {
    process.stdout.write(`[${new Date().toISOString()}] reaper ${process.pid}: ${message}\n`);
  } catch {}
}

export function parseReaperSpec(raw) {
  const spec = JSON.parse(String(raw || ""));
  if (!spec || typeof spec.stateDir !== "string" || typeof spec.generation !== "string") {
    throw new Error("invalid reaper spec");
  }
  if (!Number.isInteger(spec.port) || spec.port <= 0 || spec.port > 65535) {
    throw new Error("invalid reaper port");
  }
  return {
    mode: spec.mode === "adopt" ? "adopt" : "spawn",
    command: Array.isArray(spec.command) ? spec.command.map(String) : null,
    adopt: spec.adopt || null,
    graceMs: Number.isFinite(spec.graceMs) && spec.graceMs >= 0 ? spec.graceMs : DEFAULT_GRACE_MS,
    scanMs: Number.isFinite(spec.scanMs) && spec.scanMs > 0 ? spec.scanMs : DEFAULT_SCAN_MS,
    startTimeoutMs:
      Number.isFinite(spec.startTimeoutMs) && spec.startTimeoutMs > 0
        ? spec.startTimeoutMs
        : 60_000,
    leaseStaleMs:
      Number.isFinite(spec.leaseStaleMs) && spec.leaseStaleMs > 0
        ? spec.leaseStaleMs
        : LEASE_STALE_MS,
    lockTimeoutMs:
      Number.isFinite(spec.lockTimeoutMs) && spec.lockTimeoutMs > 0 ? spec.lockTimeoutMs : 5_000,
    stateDir: spec.stateDir,
    generation: spec.generation,
    port: spec.port,
  };
}

/** Env for the gateway child: the launcher's env (already cwd-.env filtered) + loopback bind. */
export function gatewayChildEnv(env = process.env) {
  const out = { ...env, OMNIROUTE_SERVER_HOST: "127.0.0.1" };
  delete out[REAPER_SPEC_ENV];
  return out;
}

export async function runReaper(spec) {
  const { stateDir, generation, port } = spec;
  let child = null;
  let childExited = false;
  let finishing = false;
  let idleSince = null;
  let supervisorPid = spec.adopt?.supervisorPid ?? null;
  let serverPid = spec.adopt?.serverPid ?? null;

  const lock = () => takeLock(stateDir, { timeoutMs: spec.lockTimeoutMs });
  let pendingForce = null;
  /** Live leases that hold THIS gateway (owned, same generation). */
  const ourLeases = () =>
    liveLeases(stateDir, { staleMs: spec.leaseStaleMs }).filter(
      (lease) => lease.owned === true && lease.generation === generation
    ).length;
  /** Refresh pids from the serve pid files (supervisor restarts replace the server pid). */
  function refreshServerPid() {
    const filePid = readPidFile("server");
    if (filePid && filePid !== supervisorPid && isOurProcessAlive(filePid)) serverPid = filePid;
  }

  /** Update gateway.json under the lock iff it is still ours. Returns the record or null. */
  async function update(mutate) {
    const release = await lock();
    try {
      const g = readGatewayRecord(stateDir);
      if (!g || g.generation !== generation) return null;
      const next = mutate(g);
      if (next) writeGatewayRecord(stateDir, next);
      return next || g;
    } finally {
      release();
    }
  }

  function exit(code, why) {
    log(`exit (${why})`);
    process.exit(code);
  }

  async function removeRecordAndExit(why) {
    removeFile(stopRequestPath(stateDir, generation));
    try {
      const release = await lock();
      try {
        removeGatewayRecord(stateDir, generation);
      } finally {
        release();
      }
    } catch {
      removeGatewayRecord(stateDir, generation);
    }
    exit(0, why);
  }

  async function stopGateway() {
    // Same ordering as runStopCommand (stop.mjs): supervisor first, then the server.
    const sup = child ? child.pid : supervisorPid;
    if (sup && isOurProcessAlive(sup)) {
      try {
        process.kill(sup, "SIGTERM");
      } catch {}
      await sleep(300);
    }
    if (serverPid && serverPid !== sup && isOurProcessAlive(serverPid)) {
      await stopPidGracefully(serverPid, { timeoutMs: 5000 });
    }
    if (sup && isPidRunning(sup)) {
      // Our own child (spawn mode) is known by handle, so no identity check is needed; in adopt
      // mode the pid was identity-checked above.
      if (child || isOurProcessAlive(sup)) {
        await stopPidGracefully(sup, { timeoutMs: 5000, group: Boolean(child) });
      }
    }
  }

  /** Stop and clean up. `force` skips the lease re-check (signal, start timeout). */
  async function finish(why, { force = false } = {}) {
    if (finishing) {
      if (force) pendingForce = why;
      return;
    }
    finishing = true;
    if (!force) {
      let release;
      try {
        release = await lock();
      } catch {
        finishing = false;
        return; // locked: try again next tick
      }
      let verdict = "stop";
      try {
        const g = readGatewayRecord(stateDir);
        if (!g || g.generation !== generation) verdict = "record gone, detaching";
        else if (g.state === "kept") verdict = "kept, detaching";
        else if (ourLeases() > 0) verdict = "busy";
        else writeGatewayRecord(stateDir, { ...g, state: "stopping" });
      } finally {
        release();
      }
      if (verdict === "busy") {
        idleSince = null;
        finishing = false;
        if (pendingForce) await finish(pendingForce, { force: true });
        return;
      }
      if (verdict !== "stop") exit(0, verdict);
    } else {
      // A kept gateway (or one that is no longer ours) is never stopped, even when forced.
      let verdict = "stop";
      try {
        const g = await update((rec) =>
          rec.state === "kept" ? null : { ...rec, state: "stopping" }
        );
        if (!g) verdict = "record gone, detaching";
        else if (g.state === "kept") verdict = "kept, detaching";
      } catch {
        // Lock unavailable: a forced stop proceeds (the record is removed by generation below).
      }
      if (verdict !== "stop") exit(0, verdict);
    }
    log(`stopping gateway (${why})`);
    await stopGateway();
    await removeRecordAndExit(why);
  }

  process.on("SIGTERM", () => void finish("SIGTERM", { force: true }));
  process.on("SIGINT", () => void finish("SIGINT", { force: true }));
  process.on("SIGHUP", () => {});

  // Startup: the record must exist and be ours before anything is spawned (the launcher writes it
  // under the lock it holds while spawning us).
  let initial = null;
  for (let attempt = 0; ; attempt++) {
    try {
      initial = await update((g) => ({ ...g, reaperPid: process.pid }));
      break;
    } catch (err) {
      if (attempt >= 5) {
        log(`could not take the state lock at startup: ${err?.message}`);
        removeGatewayRecord(stateDir, generation);
        exit(1, "state locked at startup");
      }
    }
  }
  if (!initial) exit(0, "no gateway record for this generation");

  if (spec.mode === "spawn") {
    const [cmd, ...args] = spec.command;
    let logFd;
    try {
      logFd = openSync(statePaths(stateDir).log, "a", 0o600);
    } catch {
      logFd = "ignore";
    }
    child = spawn(
      cmd,
      args.map((a) => a.replaceAll("{port}", String(port))),
      {
        detached: true,
        stdio: ["ignore", logFd, logFd],
        env: gatewayChildEnv(),
        windowsHide: true,
      }
    );
    if (typeof logFd === "number") closeSync(logFd);
    child.unref();
    supervisorPid = child.pid ?? null;
    serverPid = child.pid ?? null;
    child.on("error", (err) => {
      log(`spawn failed: ${err?.code || err?.message}`);
      childExited = true;
      void removeRecordAndExit("spawn failed");
    });
    child.on("exit", (code, sig) => {
      childExited = true;
      if (finishing) return;
      log(`gateway exited on its own (code ${code}, signal ${sig})`);
      void removeRecordAndExit("gateway exited");
    });
    await update((g) => ({ ...g, supervisorPid, serverPid })).catch(() => null);
    log(`spawned gateway pid ${child.pid} on port ${port}`);

    void (async () => {
      const ready = await waitForServer(port, spec.startTimeoutMs + 5_000);
      if (finishing || childExited) return;
      if (!ready) {
        await finish("start timeout", { force: true });
        return;
      }
      // With the real serve supervisor, the HTTP server is its child (server/.pid).
      refreshServerPid();
      await update((g) =>
        g.state === "starting" ? { ...g, state: "ready", serverPid, supervisorPid } : null
      ).catch(() => null);
      log("gateway ready");
    })();
  }

  for (;;) {
    await sleep(spec.scanMs);
    if (finishing) continue;
    const g = readGatewayRecord(stateDir);
    if (!g || g.generation !== generation) exit(0, "record gone, detaching");
    if (g.state === "kept") exit(0, "kept, detaching");
    // Control channel for platforms without catchable SIGTERM (win32): a stop-request file.
    if (existsSync(stopRequestPath(stateDir, generation))) {
      removeFile(stopRequestPath(stateDir, generation));
      await finish("stop requested", { force: true });
      continue;
    }
    // Adopt mode has no child handle: watch the supervisor (it outlives server restarts).
    const watched = spec.mode === "adopt" ? supervisorPid || serverPid : null;
    if (spec.mode === "adopt" && !(watched && isPidRunning(watched))) {
      await removeRecordAndExit("adopted gateway exited");
    }
    if (g.state === "ready") {
      const before = serverPid;
      refreshServerPid();
      if (serverPid !== before) {
        await update((rec) => ({ ...rec, serverPid })).catch(() => null);
      }
    }
    const live = ourLeases();
    if (live > 0) {
      idleSince = null;
      continue;
    }
    idleSince ??= Date.now();
    if (Date.now() - idleSince >= spec.graceMs) await finish("idle");
  }
}

// Exported for tests that need to wait on a reaper they did not spawn.
export { waitForPidExit };

const isMain = (() => {
  try {
    return process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
  } catch {
    return false;
  }
})();

if (isMain) {
  try {
    process.title = "omniroute-launch-reaper";
  } catch {}
  let spec;
  try {
    spec = parseReaperSpec(process.env[REAPER_SPEC_ENV]);
  } catch (err) {
    log(`bad spec: ${err?.message}`);
    process.exit(2);
  }
  runReaper(spec).catch((err) => {
    log(`crashed: ${err?.stack || err}`);
    process.exit(1);
  });
}
