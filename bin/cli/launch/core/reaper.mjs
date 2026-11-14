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

/** @param {number} value */
const isPositive = (value) => Number.isFinite(value) && value > 0;
/** @param {number} value */
const isNonNegative = (value) => Number.isFinite(value) && value >= 0;

/**
 * Optional numeric spec fields, in output order: [key, validator, default].
 * @type {Array<[string, (value: number) => boolean, number]>}
 */
const NUMERIC_FIELDS = [
  ["graceMs", isNonNegative, DEFAULT_GRACE_MS],
  ["scanMs", isPositive, DEFAULT_SCAN_MS],
  ["startTimeoutMs", isPositive, 60_000],
  ["leaseStaleMs", isPositive, LEASE_STALE_MS],
  ["lockTimeoutMs", isPositive, 5_000],
];

/** @param {number} port */
function isValidPort(port) {
  return Number.isInteger(port) && port > 0 && port <= 65535;
}

/** @param {{ stateDir?: string, generation?: string, port?: number } | null} spec */
function assertSpecRequired(spec) {
  if (!spec || typeof spec.stateDir !== "string" || typeof spec.generation !== "string") {
    throw new Error("invalid reaper spec");
  }
  if (!isValidPort(spec.port)) throw new Error("invalid reaper port");
}

/** @param {string | undefined} raw */
export function parseReaperSpec(raw) {
  const spec = JSON.parse(String(raw || ""));
  assertSpecRequired(spec);
  const out = {
    mode: spec.mode === "adopt" ? "adopt" : "spawn",
    command: Array.isArray(spec.command) ? spec.command.map(String) : null,
    adopt: spec.adopt || null,
  };
  for (const [key, isValid, fallback] of NUMERIC_FIELDS) {
    out[key] = isValid(spec[key]) ? spec[key] : fallback;
  }
  out.stateDir = spec.stateDir;
  out.generation = spec.generation;
  out.port = spec.port;
  return out;
}

/** Env for the gateway child: the launcher's env (already cwd-.env filtered) + loopback bind. */
export function gatewayChildEnv(env = process.env) {
  const out = { ...env, OMNIROUTE_SERVER_HOST: "127.0.0.1" };
  delete out[REAPER_SPEC_ENV];
  return out;
}

/**
 * Detach reason for `record` (gone or not ours, or kept), or null when it is ours and live.
 * @param {{ generation?: string, state?: string } | null} record
 * @param {string} generation
 */
export function recordVerdict(record, generation) {
  if (!record || record.generation !== generation) return "record gone, detaching";
  if (record.state === "kept") return "kept, detaching";
  return null;
}

/**
 * Idle-stop verdict: a detach reason, "busy" (leases hold the gateway) or "stop". `countLeases`
 * runs only for a record that is ours and not kept.
 * @param {{ generation?: string, state?: string } | null} record
 * @param {string} generation @param {() => number} countLeases
 */
export function idleVerdict(record, generation, countLeases) {
  const detach = recordVerdict(record, generation);
  if (detach) return detach;
  return countLeases() > 0 ? "busy" : "stop";
}

/**
 * @typedef {{ spec: ReturnType<typeof parseReaperSpec>, stateDir: string, generation: string,
 *   port: number, child: import("node:child_process").ChildProcess | null, childExited: boolean,
 *   finishing: boolean, idleSince: number | null, supervisorPid: number | null,
 *   serverPid: number | null, pendingForce: string | null }} ReaperContext
 */

/** @param {ReturnType<typeof parseReaperSpec>} spec @returns {ReaperContext} */
function createContext(spec) {
  const adopt = spec.adopt || {};
  return {
    spec,
    stateDir: spec.stateDir,
    generation: spec.generation,
    port: spec.port,
    child: null,
    childExited: false,
    finishing: false,
    idleSince: null,
    supervisorPid: adopt.supervisorPid ?? null,
    serverPid: adopt.serverPid ?? null,
    pendingForce: null,
  };
}

/** @param {ReaperContext} ctx */
function lock(ctx) {
  return takeLock(ctx.stateDir, { timeoutMs: ctx.spec.lockTimeoutMs });
}

/** Live leases that hold THIS gateway (owned, same generation). @param {ReaperContext} ctx */
function ourLeases(ctx) {
  return liveLeases(ctx.stateDir, { staleMs: ctx.spec.leaseStaleMs }).filter(
    (lease) => lease.owned === true && lease.generation === ctx.generation
  ).length;
}

/** Refresh the server pid from its pid file (restarts replace it). @param {ReaperContext} ctx */
function refreshServerPid(ctx) {
  const filePid = readPidFile("server");
  if (filePid && filePid !== ctx.supervisorPid && isOurProcessAlive(filePid)) {
    ctx.serverPid = filePid;
  }
}

/**
 * Update gateway.json under the lock iff it is still ours. Returns the record or null.
 * @param {ReaperContext} ctx @param {(record: object) => object | null} mutate
 */
async function update(ctx, mutate) {
  const release = await lock(ctx);
  try {
    const g = readGatewayRecord(ctx.stateDir);
    if (!g || g.generation !== ctx.generation) return null;
    const next = mutate(g);
    if (next) writeGatewayRecord(ctx.stateDir, next);
    return next || g;
  } finally {
    release();
  }
}

/** @param {number} code @param {string} why */
function exit(code, why) {
  log(`exit (${why})`);
  process.exit(code);
}

/** @param {ReaperContext} ctx @param {string} why */
async function removeRecordAndExit(ctx, why) {
  const { stateDir, generation } = ctx;
  removeFile(stopRequestPath(stateDir, generation));
  try {
    const release = await lock(ctx);
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

/** @param {number | null | undefined} sup */
async function termSupervisor(sup) {
  if (!sup || !isOurProcessAlive(sup)) return;
  try {
    process.kill(sup, "SIGTERM");
  } catch {}
  await sleep(300);
}

/** @param {number | null} serverPid @param {number | null | undefined} sup */
async function stopServer(serverPid, sup) {
  if (serverPid && serverPid !== sup && isOurProcessAlive(serverPid)) {
    await stopPidGracefully(serverPid, { timeoutMs: 5000 });
  }
}

/** @param {number | null | undefined} sup @param {ReaperContext["child"]} child */
async function reapSupervisor(sup, child) {
  if (!sup || !isPidRunning(sup)) return;
  // Our own child (spawn mode) is known by handle, so no identity check is needed; in adopt
  // mode the pid was identity-checked above.
  if (child || isOurProcessAlive(sup)) {
    await stopPidGracefully(sup, { timeoutMs: 5000, group: Boolean(child) });
  }
}

/** @param {ReaperContext} ctx */
async function stopGateway(ctx) {
  // Same ordering as runStopCommand (stop.mjs): supervisor first, then the server.
  const sup = ctx.child ? ctx.child.pid : ctx.supervisorPid;
  await termSupervisor(sup);
  await stopServer(ctx.serverPid, sup);
  await reapSupervisor(sup, ctx.child);
}

/** Under the lock: idle verdict, marking the record "stopping". @param {ReaperContext} ctx */
function decideIdleUnderLock(ctx) {
  const g = readGatewayRecord(ctx.stateDir);
  const verdict = idleVerdict(g, ctx.generation, () => ourLeases(ctx));
  if (verdict === "stop") writeGatewayRecord(ctx.stateDir, { ...g, state: "stopping" });
  return verdict;
}

/** Leases came back: drop this stop, run a pending forced one. @param {ReaperContext} ctx */
async function abandonBusyStop(ctx) {
  ctx.idleSince = null;
  ctx.finishing = false;
  if (ctx.pendingForce) await finish(ctx, ctx.pendingForce, { force: true });
}

/** Idle stop lease re-check; true when the gateway must stop. @param {ReaperContext} ctx */
async function prepareIdleStop(ctx) {
  let release;
  try {
    release = await lock(ctx);
  } catch {
    ctx.finishing = false;
    return false; // locked: try again next tick
  }
  let verdict = "stop";
  try {
    verdict = decideIdleUnderLock(ctx);
  } finally {
    release();
  }
  if (verdict === "busy") {
    await abandonBusyStop(ctx);
    return false;
  }
  if (verdict !== "stop") exit(0, verdict);
  return true;
}

/** @param {ReaperContext} ctx */
async function prepareForcedStop(ctx) {
  // A kept gateway (or one that is no longer ours) is never stopped, even when forced.
  let verdict = "stop";
  try {
    const g = await update(ctx, (rec) =>
      rec.state === "kept" ? null : { ...rec, state: "stopping" }
    );
    verdict = recordVerdict(g, ctx.generation) ?? "stop";
  } catch {
    // Lock unavailable: a forced stop proceeds (the record is removed by generation below).
  }
  if (verdict !== "stop") exit(0, verdict);
  return true;
}

/**
 * Stop and clean up. `force` skips the lease re-check (signal, start timeout).
 * @param {ReaperContext} ctx @param {string} why @param {{ force?: boolean }} [options]
 */
async function finish(ctx, why, { force = false } = {}) {
  if (ctx.finishing) {
    if (force) ctx.pendingForce = why;
    return;
  }
  ctx.finishing = true;
  const proceed = force ? await prepareForcedStop(ctx) : await prepareIdleStop(ctx);
  if (!proceed) return;
  log(`stopping gateway (${why})`);
  await stopGateway(ctx);
  await removeRecordAndExit(ctx, why);
}

/** @param {ReaperContext} ctx */
function installSignalHandlers(ctx) {
  process.on("SIGTERM", () => void finish(ctx, "SIGTERM", { force: true }));
  process.on("SIGINT", () => void finish(ctx, "SIGINT", { force: true }));
  process.on("SIGHUP", () => {});
}

/**
 * Startup: the record must exist and be ours before anything is spawned (the launcher writes it
 * under the lock it holds while spawning us).
 * @param {ReaperContext} ctx
 */
async function claimRecord(ctx) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await update(ctx, (g) => ({ ...g, reaperPid: process.pid }));
    } catch (err) {
      if (attempt >= 5) {
        log(`could not take the state lock at startup: ${err?.message}`);
        removeGatewayRecord(ctx.stateDir, ctx.generation);
        exit(1, "state locked at startup");
      }
    }
  }
}

/** @param {string} stateDir */
function openGatewayLog(stateDir) {
  try {
    return openSync(statePaths(stateDir).log, "a", 0o600);
  } catch {
    return "ignore";
  }
}

/** @param {ReaperContext} ctx */
function startChild(ctx) {
  const spec = ctx.spec;
  const [cmd, ...args] = spec.command;
  const logFd = openGatewayLog(ctx.stateDir);
  const argv = args.map((a) => a.replaceAll("{port}", String(ctx.port)));
  const child = spawn(cmd, argv, {
    detached: true,
    stdio: ["ignore", logFd, logFd],
    env: gatewayChildEnv(),
    windowsHide: true,
  });
  if (typeof logFd === "number") closeSync(logFd);
  child.unref();
  return child;
}

/** @param {ReaperContext} ctx @param {import("node:child_process").ChildProcess} child */
function watchChild(ctx, child) {
  child.on("error", (err) => {
    log(`spawn failed: ${err?.code || err?.message}`);
    ctx.childExited = true;
    void removeRecordAndExit(ctx, "spawn failed");
  });
  child.on("exit", (code, sig) => {
    ctx.childExited = true;
    if (ctx.finishing) return;
    log(`gateway exited on its own (code ${code}, signal ${sig})`);
    void removeRecordAndExit(ctx, "gateway exited");
  });
}

/** @param {ReaperContext} ctx */
async function markReadyWhenHealthy(ctx) {
  const ready = await waitForServer(ctx.port, ctx.spec.startTimeoutMs + 5_000);
  if (ctx.finishing || ctx.childExited) return;
  if (!ready) {
    await finish(ctx, "start timeout", { force: true });
    return;
  }
  // With the real serve supervisor, the HTTP server is its child (server/.pid).
  refreshServerPid(ctx);
  await update(ctx, (g) =>
    g.state === "starting"
      ? { ...g, state: "ready", serverPid: ctx.serverPid, supervisorPid: ctx.supervisorPid }
      : null
  ).catch(() => null);
  log("gateway ready");
}

/** @param {ReaperContext} ctx */
async function spawnGateway(ctx) {
  const child = startChild(ctx);
  ctx.child = child;
  ctx.supervisorPid = child.pid ?? null;
  ctx.serverPid = child.pid ?? null;
  watchChild(ctx, child);
  await update(ctx, (g) => ({
    ...g,
    supervisorPid: ctx.supervisorPid,
    serverPid: ctx.serverPid,
  })).catch(() => null);
  log(`spawned gateway pid ${child.pid} on port ${ctx.port}`);
  void markReadyWhenHealthy(ctx);
}

/** @param {ReaperContext} ctx */
async function checkAdoptedAlive(ctx) {
  if (ctx.spec.mode !== "adopt") return;
  // Adopt mode has no child handle: watch the supervisor (it outlives server restarts).
  const watched = ctx.supervisorPid || ctx.serverPid;
  if (!(watched && isPidRunning(watched))) {
    await removeRecordAndExit(ctx, "adopted gateway exited");
  }
}

/** @param {ReaperContext} ctx */
async function syncServerPid(ctx) {
  const before = ctx.serverPid;
  refreshServerPid(ctx);
  if (ctx.serverPid !== before) {
    await update(ctx, (rec) => ({ ...rec, serverPid: ctx.serverPid })).catch(() => null);
  }
}

/** @param {ReaperContext} ctx */
async function checkIdle(ctx) {
  if (ourLeases(ctx) > 0) {
    ctx.idleSince = null;
    return;
  }
  ctx.idleSince ??= Date.now();
  if (Date.now() - ctx.idleSince >= ctx.spec.graceMs) await finish(ctx, "idle");
}

/** @param {ReaperContext} ctx */
async function scanOnce(ctx) {
  const { stateDir, generation } = ctx;
  const g = readGatewayRecord(stateDir);
  const detach = recordVerdict(g, generation);
  if (detach) exit(0, detach);
  // Control channel for platforms without catchable SIGTERM (win32): a stop-request file.
  if (existsSync(stopRequestPath(stateDir, generation))) {
    removeFile(stopRequestPath(stateDir, generation));
    await finish(ctx, "stop requested", { force: true });
    return;
  }
  await checkAdoptedAlive(ctx);
  if (g.state === "ready") await syncServerPid(ctx);
  await checkIdle(ctx);
}

/** @param {ReturnType<typeof parseReaperSpec>} spec */
async function runReaper(spec) {
  const ctx = createContext(spec);
  installSignalHandlers(ctx);
  const initial = await claimRecord(ctx);
  if (!initial) exit(0, "no gateway record for this generation");
  if (spec.mode === "spawn") await spawnGateway(ctx);
  for (;;) {
    await sleep(spec.scanMs);
    if (ctx.finishing) continue;
    await scanOnce(ctx);
  }
}

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
