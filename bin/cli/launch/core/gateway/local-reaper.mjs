// bin/cli/launch/core/gateway/local-reaper.mjs: the "local-reaper" lifecycle strategy, i.e. the
// acquire protocol.
//
// Under the state lock (held only for the decision, never for the readiness wait):
//   prune dead leases; probe health on 127.0.0.1:P; read gateway.json (g)
//   g stopping + reaper alive        -> drop the lock, wait for the reaper to exit, decide again
//   healthy:
//     g starting|ready, reaper alive, server matches     -> owned (shared)
//     g starting|ready, reaper dead, server ours + alive -> spawn an adopt-mode reaper; owned
//     g kept                                             -> owned=false (a user gateway now)
//     otherwise                                          -> owned=false; delete stale g
//   not healthy:
//     --no-start                                         -> GatewayUnreachable
//     g starting|ready, reaper alive                     -> owned; wait for readiness
//     otherwise: delete stale g; port busy -> PortInUse; spawn reaper, write g starting; owned
//   write leases/<id>.json
// then, outside the lock, an owned gateway that is not ready yet is awaited (GatewayStartTimeout).

import { spawn } from "node:child_process";
import { closeSync, openSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  classifyPidIdentity,
  probePortFree,
  readPidFile,
  waitForServer,
} from "../../../utils/pid.mjs";
import { LaunchError } from "../../contract.mjs";
import { createLease, pruneLeases, LEASE_HEARTBEAT_MS, LEASE_STALE_MS } from "../lease.mjs";
import { REAPER_SPEC_ENV } from "../reaper.mjs";
import { leaseHandle } from "./external-local.mjs";
import {
  isOurProcessAlive,
  localRootUrl,
  probeHealth,
  probeHealthPatient,
  redactLogText,
  stopPidGracefully,
  waitForPidExit,
} from "./process.mjs";
import {
  randomId,
  readGatewayRecord,
  removeGatewayRecord,
  statePaths,
  stopRequestPath,
  takeLock,
  withLock,
  writeGatewayRecord,
  DEFAULT_LOCK_TIMEOUT_MS,
} from "./state.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const REAPER_PATH = join(HERE, "..", "reaper.mjs");
const OMNIROUTE_BIN = join(HERE, "..", "..", "..", "..", "omniroute.mjs");
const CLI_VERSION = process.env.npm_package_version || null;

/** `omniroute serve --headless --no-open --port {port}` (serve.mjs:89,94). */
function defaultGatewayCommand() {
  return [process.execPath, OMNIROUTE_BIN, "serve", "--headless", "--no-open", "--port", "{port}"];
}

function newGeneration() {
  return `${Date.now().toString(36)}-${randomId(4)}`;
}

/**
 * The serve pid files must not point at a different live gateway. The supervisor pid is the
 * stable identity (server/.pid changes on every supervisor restart), so it is compared first.
 */
function serverMatches(g) {
  const supervisorFile = readPidFile("supervisor");
  if (supervisorFile) return supervisorFile === g.supervisorPid;
  const serverFile = readPidFile("server");
  return !serverFile || serverFile === g.serverPid || serverFile === g.supervisorPid;
}

function spawnReaper(stateDir, spec) {
  let logFd = "ignore";
  try {
    logFd = openSync(statePaths(stateDir).log, "a", 0o600);
  } catch {}
  const child = spawn(process.execPath, [REAPER_PATH], {
    detached: true,
    stdio: ["ignore", logFd, logFd],
    env: { ...process.env, [REAPER_SPEC_ENV]: JSON.stringify(spec) },
    windowsHide: true,
  });
  if (typeof logFd === "number") closeSync(logFd);
  child.on("error", () => {});
  child.unref();
  if (!child.pid) throw new LaunchError("Internal", "Could not start the gateway reaper");
  return child.pid;
}

const LOG_TAIL_LINES = 5;
const LOG_TAIL_MAX_CHARS = 300;
const EARLY_EXIT = Symbol("gateway exited early");

/** The last few non-empty lines of the reaper/gateway log, redacted (empty when unreadable). */
function gatewayLogTail(stateDir, lines = LOG_TAIL_LINES) {
  let text;
  try {
    const raw = readFileSync(statePaths(stateDir).log);
    text = raw.subarray(Math.max(0, raw.length - 16 * 1024)).toString("utf8");
  } catch {
    return [];
  }
  return text
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.trim() !== "")
    .slice(-lines)
    .map((line) => {
      const clean = redactLogText(line);
      return clean.length > LOG_TAIL_MAX_CHARS ? `${clean.slice(0, LOG_TAIL_MAX_CHARS)}...` : clean;
    });
}

/**
 * Wait for readiness, but stop as soon as the gateway is gone: the reaper removes gateway.json
 * for its generation and exits when its child dies
 * (found in live testing: a missing server.js exits at once). Returns "ready", "timeout" or
 * "exited".
 */
async function waitReadyOrExit(port, timeoutMs, { stateDir, generation, reaperPid, alive }) {
  const gone = () => {
    const g = readGatewayRecord(stateDir);
    if (!g || g.generation !== generation) return true;
    const pid = g.reaperPid ?? reaperPid;
    return Number.isInteger(pid) && pid > 0 && !alive(pid);
  };
  try {
    const ready = await waitForServer(port, timeoutMs, {
      onOutcome: (outcome) => {
        if (outcome !== "ready" && gone()) throw EARLY_EXIT;
      },
    });
    return ready ? "ready" : "timeout";
  } catch (error) {
    if (error !== EARLY_EXIT) throw error;
    return (await probeHealth(localRootUrl(port))) ? "ready" : "exited";
  }
}

function writeStopRequest(stateDir, generation) {
  if (!stateDir || !generation) return;
  // Works on every platform; on win32 it is the only graceful path.
  try {
    writeFileSync(stopRequestPath(stateDir, generation), String(Date.now()), { mode: 0o600 });
  } catch {}
}

/** SIGTERM the reaper (skipped on win32). False when the signal failed (the pid is gone). */
function signalTerm(pid) {
  if (process.platform === "win32") return true;
  try {
    process.kill(pid, "SIGTERM");
    return true;
  } catch {
    return false;
  }
}

/** Ask a reaper to stop its gateway (SIGTERM, it cleans up) and wait for it to go. */
export async function stopReaper(
  pid,
  { classify = classifyPidIdentity, timeoutMs = 30_000, stateDir, generation } = {}
) {
  if (!isOurProcessAlive(pid, { classify })) return true;
  writeStopRequest(stateDir, generation);
  if (!signalTerm(pid)) return true;
  if (await waitForPidExit(pid, timeoutMs)) return true;
  return stopPidGracefully(pid, { timeoutMs: 1000 });
}

/**
 * The snapshot is what acquireLocal observed under the lock (record = gateway.json or null;
 * serverMatches / serverAlive = the serve pid files point at the record's gateway / its server
 * pid is live). The decision kind is a key of OUTCOMES.
 * @typedef {{port:number, record:{state:string, port:number, generation:string}|null,
 *   reaperAlive:boolean, healthy:boolean, noStart:boolean, serverMatches:boolean,
 *   serverAlive:boolean}} AcquireSnapshot
 * @typedef {{kind:string, wait?:boolean, removeStale?:boolean}} AcquireDecision
 */

function isActive(g) {
  return Boolean(g) && (g.state === "starting" || g.state === "ready");
}

/** A live launcher gateway that is not kept runs on a different port. */
function isWrongPort({ record: g, port, reaperAlive }) {
  return Boolean(g) && g.port !== port && reaperAlive && g.state !== "kept";
}

/** @param {AcquireSnapshot} s @returns {AcquireDecision} */
function decideHealthy(s) {
  const g = s.record;
  if (!isActive(g)) {
    return g && g.state !== "kept" ? { kind: "dropStale" } : { kind: "external" };
  }
  if (!s.serverMatches) return { kind: "dropStale" };
  if (s.reaperAlive) return { kind: "join", wait: g.state !== "ready" };
  return s.serverAlive ? { kind: "adopt" } : { kind: "dropStale" };
}

/** @param {AcquireSnapshot} s @returns {AcquireDecision} */
function decideUnhealthy(s) {
  if (s.noStart) return { kind: "unreachable" };
  if (isActive(s.record) && s.reaperAlive) return { kind: "joinStarting" };
  return { kind: "start", removeStale: Boolean(s.record) };
}

/**
 * The pure acquire decision (see the protocol at the top of this file).
 * @param {AcquireSnapshot} s
 * @returns {AcquireDecision}
 */
export function decideAcquire(s) {
  if (isWrongPort(s)) return s.healthy ? { kind: "external" } : { kind: "wrongPort" };
  if (s.record && s.record.state === "stopping" && s.reaperAlive) return { kind: "retry" };
  return s.healthy ? decideHealthy(s) : decideUnhealthy(s);
}

// Something listens but /health did not answer in time: a busy or cold gateway can take
// seconds (found in live testing). Retry before calling the port foreign (PortInUse).
async function recheckHealth(ctx, healthy, g, reaperAlive) {
  if (healthy || (isActive(g) && reaperAlive)) return healthy;
  if (await probePortFree(ctx.port)) return healthy;
  return probeHealthPatient(ctx.rootUrl, ctx.overrides.healthRetry);
}

/** The server checks are made only where the decision reads them (same probes as before). */
function addServerFacts(s, alive) {
  if (!s.healthy || !isActive(s.record) || isWrongPort(s)) return s;
  const matches = serverMatches(s.record);
  const serverAlive = matches && !s.reaperAlive && alive(s.record.serverPid);
  return { ...s, serverMatches: matches, serverAlive };
}

/** @returns {Promise<AcquireSnapshot>} */
async function takeSnapshot(ctx) {
  pruneLeases(ctx.stateDir, { staleMs: ctx.staleMs });
  const firstHealthy = await probeHealth(ctx.rootUrl);
  const record = readGatewayRecord(ctx.stateDir);
  const reaperAlive = Boolean(record) && ctx.alive(record.reaperPid);
  const healthy = await recheckHealth(ctx, firstHealthy, record, reaperAlive);
  const snapshot = {
    port: ctx.port,
    record,
    reaperAlive,
    healthy,
    noStart: Boolean(ctx.flags.noStart),
    serverMatches: false,
    serverAlive: false,
  };
  return addServerFacts(snapshot, ctx.alive);
}

function reaperTimings(ctx) {
  const { graceMs, scanMs, leaseStaleMs } = ctx.overrides;
  return { graceMs, scanMs, leaseStaleMs, startTimeoutMs: ctx.startTimeoutMs };
}

/** Reaper crashed, gateway is ours: adopt it with a fresh reaper. */
function adoptGateway(ctx, g) {
  const { stateDir, port } = ctx;
  const spec = {
    mode: "adopt",
    stateDir,
    generation: g.generation,
    port,
    adopt: { serverPid: g.serverPid, supervisorPid: g.supervisorPid },
    ...reaperTimings(ctx),
  };
  const record = { ...g, state: "ready", reaperStartedAt: Date.now() };
  writeGatewayRecord(stateDir, record);
  const reaperPid = spawnReaper(stateDir, spec);
  writeGatewayRecord(stateDir, { ...record, reaperPid });
  ctx.log(`adopted launcher gateway on port ${port} (new reaper ${reaperPid})`);
  return { owned: true, generation: record.generation, wait: false };
}

function newStartingRecord(generation, port) {
  const now = Date.now();
  return {
    generation,
    state: "starting",
    reaperPid: null,
    reaperStartedAt: now,
    serverPid: null,
    supervisorPid: null,
    port,
    host: "127.0.0.1",
    startedAt: now,
    cliVersion: CLI_VERSION,
  };
}

function spawnStartReaper(ctx, generation) {
  const { stateDir, port } = ctx;
  try {
    return spawnReaper(stateDir, {
      mode: "spawn",
      stateDir,
      generation,
      port,
      command: ctx.overrides.gatewayCommand || defaultGatewayCommand(),
      ...reaperTimings(ctx),
    });
  } catch (err) {
    removeGatewayRecord(stateDir, generation);
    throw err;
  }
}

async function startGateway(ctx, g, d) {
  const { stateDir, port } = ctx;
  if (d.removeStale) removeGatewayRecord(stateDir, g.generation);
  if (!(await probePortFree(port))) {
    throw new LaunchError(
      "PortInUse",
      `Port ${port} is in use by a process that is not a healthy OmniRoute gateway`,
      { hint: "Free the port, or pass --port <other-port>" }
    );
  }
  const generation = newGeneration();
  const record = newStartingRecord(generation, port);
  writeGatewayRecord(stateDir, record);
  const reaperPid = spawnStartReaper(ctx, generation);
  writeGatewayRecord(stateDir, { ...record, reaperPid });
  ctx.log(`starting gateway on 127.0.0.1:${port} (reaper ${reaperPid})`);
  return { owned: true, generation, wait: true, reaperPid, spawned: true };
}

const ownedBy = (g, wait) => ({ owned: true, generation: g.generation, wait });

/** decision kind -> (ctx, gateway record, decision) => the acquire state (owned, lease, wait). */
const OUTCOMES = {
  wrongPort: (ctx, g) => {
    throw new LaunchError(
      "UsageError",
      `A launcher-started gateway already runs on port ${g.port}, not ${ctx.port}`,
      { hint: `Use --port ${g.port}, or stop it with \`omniroute gateway stop\`` }
    );
  },
  retry: (_ctx, g) => ({ retryAfterReaper: g.reaperPid }),
  join: (_ctx, g, d) => ownedBy(g, d.wait),
  adopt: (ctx, g) => adoptGateway(ctx, g),
  external: () => ({ owned: false, generation: null }),
  dropStale: (ctx, g) => {
    removeGatewayRecord(ctx.stateDir, g.generation);
    return { owned: false, generation: null };
  },
  unreachable: (ctx) => {
    throw new LaunchError("GatewayUnreachable", `OmniRoute is not reachable at ${ctx.rootUrl}`, {
      hint: "Start it with `omniroute serve`, or drop --no-start",
    });
  },
  joinStarting: (_ctx, g) => ({ ...ownedBy(g, true), reaperPid: g.reaperPid }),
  start: (ctx, g, d) => startGateway(ctx, g, d),
};

function attachLease(ctx, state) {
  if (state.retryAfterReaper) return;
  state.lease = createLease(ctx.stateDir, {
    toolId: ctx.leaseInfo.toolId ?? null,
    sessionId: ctx.leaseInfo.sessionId ?? null,
    generation: state.generation,
    owned: state.owned,
    heartbeatMs: ctx.overrides.heartbeatMs ?? LEASE_HEARTBEAT_MS,
  });
}

/** The state lock is held only for the decision, never for the readiness wait. */
async function decideUnderLock(ctx) {
  const release = await takeLock(ctx.stateDir, { timeoutMs: ctx.lockTimeoutMs });
  try {
    const snapshot = await takeSnapshot(ctx);
    const decision = decideAcquire(snapshot);
    const state = await OUTCOMES[decision.kind](ctx, snapshot.record, decision);
    attachLease(ctx, state);
    return state;
  } finally {
    release();
  }
}

function formatLogTail(tail) {
  return tail.length > 0 ? `; last log lines:\n${tail.map((l) => `  | ${l}`).join("\n")}` : "";
}

function throwExited(ctx, state) {
  state.lease.release();
  const lines = formatLogTail(gatewayLogTail(ctx.stateDir));
  throw new LaunchError(
    "GatewayStartTimeout",
    `The gateway exited before it became ready on port ${ctx.port}${lines}`,
    { hint: `See ${statePaths(ctx.stateDir).log}` }
  );
}

/**
 * Only the launcher that spawned this gateway stops it on a timeout; a joiner must not kill a
 * gateway other live sessions may be using (the reaper's own start timeout and idle grace still
 * clean up).
 */
async function stopSpawned(ctx, state) {
  if (!state.spawned) return;
  const g = readGatewayRecord(ctx.stateDir);
  const reaperPid = g && g.generation === state.generation ? g.reaperPid : state.reaperPid;
  if (!reaperPid) return;
  await stopReaper(reaperPid, {
    classify: ctx.classify,
    stateDir: ctx.stateDir,
    generation: state.generation,
  });
}

async function failTimeout(ctx, state) {
  state.lease.release();
  await stopSpawned(ctx, state);
  const seconds = Math.round(ctx.startTimeoutMs / 1000);
  throw new LaunchError(
    "GatewayStartTimeout",
    `The gateway did not become ready on port ${ctx.port} within ${seconds}s`,
    {
      hint: `See ${statePaths(ctx.stateDir).log}; raise the budget with OMNIROUTE_READY_TIMEOUT_MS`,
    }
  );
}

/** Outside the lock, an owned gateway that is not ready yet is awaited. */
async function awaitReadiness(ctx, state) {
  if (!state.owned || !state.wait) return;
  const outcome = await waitReadyOrExit(ctx.port, ctx.startTimeoutMs, {
    stateDir: ctx.stateDir,
    generation: state.generation,
    reaperPid: state.reaperPid,
    alive: ctx.alive,
  });
  if (outcome === "exited") throwExited(ctx, state);
  if (outcome !== "ready") await failTimeout(ctx, state);
}

function acquireContext(o) {
  const { port, flags, overrides } = o;
  const classify = overrides.classifyPidIdentity || classifyPidIdentity;
  return {
    ...o,
    classify,
    staleMs: overrides.leaseStaleMs ?? LEASE_STALE_MS,
    lockTimeoutMs: overrides.lockTimeoutMs ?? DEFAULT_LOCK_TIMEOUT_MS,
    startTimeoutMs: flags.startTimeoutMs,
    rootUrl: localRootUrl(port),
    alive: (pid) => isOurProcessAlive(pid, { classify }),
  };
}

/**
 * @param {object} o
 * @param {string} o.stateDir
 * @param {number} o.port
 * @param {{noStart?:boolean, keepGateway?:boolean, startTimeoutMs?:number}} o.flags
 * @param {(msg:string)=>void} o.log
 * @param {object} [o.overrides] test seams: gatewayCommand, graceMs, scanMs, leaseStaleMs,
 *   heartbeatMs, lockTimeoutMs, classifyPidIdentity, healthRetry ({timeoutsMs, backoffMs})
 * @param {{toolId?:string|null, sessionId?:string|null}} [o.leaseInfo]
 */
export async function acquireLocal({ stateDir, port, flags, log, overrides = {}, leaseInfo = {} }) {
  const ctx = acquireContext({ stateDir, port, flags, log, overrides, leaseInfo });
  for (let attempt = 0; attempt < 5; attempt++) {
    const state = await decideUnderLock(ctx);
    if (state.retryAfterReaper) {
      log("waiting for the previous launcher gateway to stop");
      await waitForPidExit(state.retryAfterReaper, 20_000);
      continue;
    }
    const handle = leaseHandle({ baseUrl: ctx.rootUrl, owned: state.owned, lease: state.lease });
    await awaitReadiness(ctx, state);
    return handle;
  }
  throw new LaunchError("StateLocked", "The launcher gateway kept changing state; try again");
}

/** Mark the launcher gateway kept: its reaper detaches and it becomes a user gateway (4.6). */
export async function keepLocal({ stateDir, lockTimeoutMs = DEFAULT_LOCK_TIMEOUT_MS }) {
  return withLock(stateDir, { timeoutMs: lockTimeoutMs }, () => {
    const g = readGatewayRecord(stateDir);
    if (!g) return { kept: false };
    if (g.state === "kept") return { kept: true };
    if (g.state === "stopping") return { kept: false };
    writeGatewayRecord(stateDir, { ...g, state: "kept", keptAt: Date.now() });
    return { kept: true };
  });
}
