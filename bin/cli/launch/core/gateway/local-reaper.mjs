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
export function defaultGatewayCommand() {
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
export function gatewayLogTail(stateDir, lines = LOG_TAIL_LINES) {
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

/** Ask a reaper to stop its gateway (SIGTERM, it cleans up) and wait for it to go. */
export async function stopReaper(
  pid,
  { classify = classifyPidIdentity, timeoutMs = 30_000, stateDir, generation } = {}
) {
  if (!isOurProcessAlive(pid, { classify })) return true;
  if (stateDir && generation) {
    // Works on every platform; on win32 it is the only graceful path.
    try {
      writeFileSync(stopRequestPath(stateDir, generation), String(Date.now()), { mode: 0o600 });
    } catch {}
  }
  if (process.platform !== "win32") {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      return true;
    }
  }
  if (await waitForPidExit(pid, timeoutMs)) return true;
  return stopPidGracefully(pid, { timeoutMs: 1000 });
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
  const classify = overrides.classifyPidIdentity || classifyPidIdentity;
  const staleMs = overrides.leaseStaleMs ?? LEASE_STALE_MS;
  const lockTimeoutMs = overrides.lockTimeoutMs ?? DEFAULT_LOCK_TIMEOUT_MS;
  const startTimeoutMs = flags.startTimeoutMs;
  const rootUrl = localRootUrl(port);
  const alive = (pid) => isOurProcessAlive(pid, { classify });

  for (let attempt = 0; attempt < 5; attempt++) {
    const release = await takeLock(stateDir, { timeoutMs: lockTimeoutMs });
    let decision;
    try {
      pruneLeases(stateDir, { staleMs });
      let healthy = await probeHealth(rootUrl);
      let g = readGatewayRecord(stateDir);
      const reaperAlive = Boolean(g) && alive(g.reaperPid);
      const starting = g && (g.state === "starting" || g.state === "ready") && reaperAlive;
      if (!healthy && !starting && !(await probePortFree(port))) {
        // Something listens but /health did not answer in time: a busy or cold gateway can take
        // seconds (found in live testing). Retry before calling the port foreign (PortInUse).
        healthy = await probeHealthPatient(rootUrl, overrides.healthRetry);
      }

      if (g && g.port !== port && reaperAlive && g.state !== "kept") {
        if (healthy) {
          decision = { owned: false, generation: null };
        } else {
          throw new LaunchError(
            "UsageError",
            `A launcher-started gateway already runs on port ${g.port}, not ${port}`,
            { hint: `Use --port ${g.port}, or stop it with \`omniroute gateway stop\`` }
          );
        }
      } else if (g && g.state === "stopping" && reaperAlive) {
        decision = { retryAfterReaper: g.reaperPid };
      } else if (healthy) {
        const active = g && (g.state === "starting" || g.state === "ready");
        if (active && reaperAlive && serverMatches(g)) {
          decision = { owned: true, generation: g.generation, wait: g.state !== "ready" };
        } else if (active && !reaperAlive && serverMatches(g) && alive(g.serverPid)) {
          // Reaper crashed, gateway is ours: adopt it with a fresh reaper.
          const spec = {
            mode: "adopt",
            stateDir,
            generation: g.generation,
            port,
            adopt: { serverPid: g.serverPid, supervisorPid: g.supervisorPid },
            graceMs: overrides.graceMs,
            scanMs: overrides.scanMs,
            leaseStaleMs: overrides.leaseStaleMs,
            startTimeoutMs,
          };
          g = { ...g, state: "ready", reaperStartedAt: Date.now() };
          writeGatewayRecord(stateDir, g);
          const reaperPid = spawnReaper(stateDir, spec);
          writeGatewayRecord(stateDir, { ...g, reaperPid });
          log(`adopted launcher gateway on port ${port} (new reaper ${reaperPid})`);
          decision = { owned: true, generation: g.generation, wait: false };
        } else if (g && g.state === "kept") {
          decision = { owned: false, generation: null };
        } else {
          if (g) removeGatewayRecord(stateDir, g.generation);
          decision = { owned: false, generation: null };
        }
      } else {
        const active = g && (g.state === "starting" || g.state === "ready");
        if (flags.noStart) {
          throw new LaunchError("GatewayUnreachable", `OmniRoute is not reachable at ${rootUrl}`, {
            hint: "Start it with `omniroute serve`, or drop --no-start",
          });
        }
        if (active && reaperAlive) {
          decision = { owned: true, generation: g.generation, wait: true, reaperPid: g.reaperPid };
        } else {
          if (g) removeGatewayRecord(stateDir, g.generation);
          if (!(await probePortFree(port))) {
            throw new LaunchError(
              "PortInUse",
              `Port ${port} is in use by a process that is not a healthy OmniRoute gateway`,
              { hint: "Free the port, or pass --port <other-port>" }
            );
          }
          const generation = newGeneration();
          const now = Date.now();
          const record = {
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
          writeGatewayRecord(stateDir, record);
          let reaperPid;
          try {
            reaperPid = spawnReaper(stateDir, {
              mode: "spawn",
              stateDir,
              generation,
              port,
              command: overrides.gatewayCommand || defaultGatewayCommand(),
              graceMs: overrides.graceMs,
              scanMs: overrides.scanMs,
              leaseStaleMs: overrides.leaseStaleMs,
              startTimeoutMs,
            });
          } catch (err) {
            removeGatewayRecord(stateDir, generation);
            throw err;
          }
          writeGatewayRecord(stateDir, { ...record, reaperPid });
          log(`starting gateway on 127.0.0.1:${port} (reaper ${reaperPid})`);
          decision = { owned: true, generation, wait: true, reaperPid, spawned: true };
        }
      }

      if (!decision.retryAfterReaper) {
        decision.lease = createLease(stateDir, {
          toolId: leaseInfo.toolId ?? null,
          sessionId: leaseInfo.sessionId ?? null,
          generation: decision.generation,
          owned: decision.owned,
          heartbeatMs: overrides.heartbeatMs ?? LEASE_HEARTBEAT_MS,
        });
      }
    } finally {
      release();
    }

    if (decision.retryAfterReaper) {
      log("waiting for the previous launcher gateway to stop");
      await waitForPidExit(decision.retryAfterReaper, 20_000);
      continue;
    }

    const handle = leaseHandle({ baseUrl: rootUrl, owned: decision.owned, lease: decision.lease });
    if (decision.owned && decision.wait) {
      const outcome = await waitReadyOrExit(port, startTimeoutMs, {
        stateDir,
        generation: decision.generation,
        reaperPid: decision.reaperPid,
        alive,
      });
      if (outcome === "exited") {
        decision.lease.release();
        const tail = gatewayLogTail(stateDir);
        const lines =
          tail.length > 0 ? `; last log lines:\n${tail.map((l) => `  | ${l}`).join("\n")}` : "";
        throw new LaunchError(
          "GatewayStartTimeout",
          `The gateway exited before it became ready on port ${port}${lines}`,
          { hint: `See ${statePaths(stateDir).log}` }
        );
      }
      if (outcome !== "ready") {
        decision.lease.release();
        // Only the launcher that spawned this gateway stops it on a timeout; a joiner must not
        // kill a gateway other live sessions may be using (the reaper's own start timeout and
        // idle grace still clean up).
        if (decision.spawned) {
          const g = readGatewayRecord(stateDir);
          const reaperPid =
            g && g.generation === decision.generation ? g.reaperPid : decision.reaperPid;
          if (reaperPid) {
            await stopReaper(reaperPid, {
              classify,
              stateDir,
              generation: decision.generation,
            });
          }
        }
        throw new LaunchError(
          "GatewayStartTimeout",
          `The gateway did not become ready on port ${port} within ${Math.round(startTimeoutMs / 1000)}s`,
          {
            hint: `See ${statePaths(stateDir).log}; raise the budget with OMNIROUTE_READY_TIMEOUT_MS`,
          }
        );
      }
    }
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
