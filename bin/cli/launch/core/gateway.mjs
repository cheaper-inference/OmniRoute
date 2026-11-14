// bin/cli/launch/core/gateway.mjs: gateway lifecycle for `omnirouter launch`.
// Frozen interface (core/target.mjs codes against it):
//
//   acquireGateway({target, flags:{noStart, keepGateway, port, startTimeoutMs}, stateDir, log})
//     -> Promise<{baseUrl, owned, release(): Promise<void>}>
//   gatewayStatus({stateDir, port}) -> Promise<{running, owned, pid?, leases, kept, baseUrl}>
//   keepGateway({stateDir}) -> Promise<{kept:boolean}>
//   stopOwnedGateway({stateDir}) -> Promise<{stopped:true}>   (UsageError when not launcher-owned)
//
// Strategies: `remote` (probe only), `local-reaper` (auto-start under a detached reaper,
// shared via leases, auto-stop after the idle grace), `external-local` (a user gateway: leased,
// never started or stopped). Errors are contract LaunchErrors.
//
// Extra optional fields (not part of the frozen shape, safe to ignore):
//   acquireGateway({..., toolId?, sessionId?, overrides?}) -> handle also carries origin, leaseId.
//   `overrides` are test seams: gatewayCommand (argv, "{port}" substituted), graceMs, scanMs,
//   leaseStaleMs, heartbeatMs, lockTimeoutMs, classifyPidIdentity.

import { classifyPidIdentity, resolveReadyTimeoutMs } from "../../utils/pid.mjs";
import { LaunchError } from "../contract.mjs";
import { liveLeases, LEASE_STALE_MS } from "./lease.mjs";
import { acquireLocal, keepLocal, stopReaper } from "./gateway/local-reaper.mjs";
import { DEFAULT_PORT, isOurProcessAlive, localRootUrl, probeHealth } from "./gateway/process.mjs";
import { acquireRemote, normalizeRootUrl } from "./gateway/remote.mjs";
import {
  defaultStateDir,
  readGatewayRecord,
  removeGatewayRecord,
  withLock,
} from "./gateway/state.mjs";

export { DEFAULT_PORT };

/** Idle grace before the reaper stops an unused gateway (OMNIROUTE_LAUNCH_IDLE_GRACE_MS). */
export function resolveIdleGraceMs(env = process.env) {
  const n = Number.parseInt(String(env.OMNIROUTE_LAUNCH_IDLE_GRACE_MS ?? ""), 10);
  return Number.isFinite(n) && n >= 0 ? n : 10_000;
}

function toLogger(log) {
  if (typeof log === "function") return log;
  if (log && typeof log.info === "function") return (m) => log.info(m);
  if (log && typeof log.log === "function") return (m) => log.log(m);
  return () => {};
}

function parsePort(value) {
  const n = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) && n > 0 && n <= 65535 ? n : null;
}

/**
 * Target shape comes from core/target.mjs. Read loosely: remote when `kind`/`origin` is "remote"
 * or `remote` is truthy; the URL from `rootUrl` (or `baseUrl`/`url`).
 */
export function isRemoteTarget(target) {
  if (!target || typeof target !== "object") return false;
  return target.kind === "remote" || target.origin === "remote" || Boolean(target.remote);
}

function targetUrl(target) {
  const raw =
    target?.rootUrl ??
    target?.baseUrl ??
    target?.url ??
    (typeof target?.remote === "string" ? target.remote : null);
  return raw ? normalizeRootUrl(raw) : null;
}

export function resolveLocalPort(target, flags = {}, env = process.env) {
  const fromUrl = (() => {
    const url = targetUrl(target);
    if (!url) return null;
    try {
      return parsePort(new URL(url).port);
    } catch {
      return null;
    }
  })();
  return (
    parsePort(flags.port) ??
    parsePort(target?.port) ??
    fromUrl ??
    parsePort(env.DASHBOARD_PORT) ??
    parsePort(env.PORT) ??
    DEFAULT_PORT
  );
}

export async function acquireGateway({
  target,
  flags = {},
  stateDir = defaultStateDir(),
  log,
  toolId = null,
  sessionId = null,
  overrides = {},
} = {}) {
  const say = toLogger(log);
  if (isRemoteTarget(target)) {
    const url = targetUrl(target);
    if (!url) throw new LaunchError("UsageError", "Remote target has no URL");
    return acquireRemote({ rootUrl: url });
  }
  const port = resolveLocalPort(target, flags);
  const startTimeoutMs = resolveReadyTimeoutMs({ timeoutMs: flags.startTimeoutMs });
  const handle = await acquireLocal({
    stateDir,
    port,
    flags: { noStart: Boolean(flags.noStart), startTimeoutMs },
    log: say,
    overrides: { graceMs: resolveIdleGraceMs(), ...overrides },
    leaseInfo: { toolId, sessionId },
  });
  if (flags.keepGateway && handle.owned) {
    await keepLocal({ stateDir, lockTimeoutMs: overrides.lockTimeoutMs });
    say(`gateway on port ${port} will keep running after this launch`);
  }
  return handle;
}

export async function gatewayStatus({ stateDir = defaultStateDir(), port, overrides = {} } = {}) {
  const classify = overrides.classifyPidIdentity || classifyPidIdentity;
  const g = readGatewayRecord(stateDir);
  const resolvedPort = parsePort(port) ?? parsePort(g?.port) ?? resolveLocalPort(null);
  const baseUrl = localRootUrl(resolvedPort);
  const running = await probeHealth(baseUrl);
  const samePort = Boolean(g) && g.port === resolvedPort;
  const reaperAlive = samePort && isOurProcessAlive(g.reaperPid, { classify });
  const owned =
    samePort && reaperAlive && ["starting", "ready", "stopping"].includes(String(g.state));
  const kept = samePort && g.state === "kept" && running;
  const leases = liveLeases(stateDir, {
    staleMs: overrides.leaseStaleMs ?? LEASE_STALE_MS,
  }).length;
  const status = { running, owned, leases, kept, baseUrl };
  if (samePort && (owned || kept) && Number.isInteger(g.serverPid)) status.pid = g.serverPid;
  if (owned) status.state = g.state;
  return status;
}

export async function keepGateway({ stateDir = defaultStateDir(), overrides = {} } = {}) {
  return keepLocal({ stateDir, lockTimeoutMs: overrides.lockTimeoutMs });
}

export async function stopOwnedGateway({ stateDir = defaultStateDir(), overrides = {} } = {}) {
  const classify = overrides.classifyPidIdentity || classifyPidIdentity;
  const g = readGatewayRecord(stateDir);
  const owned =
    g &&
    ["starting", "ready", "stopping"].includes(String(g.state)) &&
    isOurProcessAlive(g.reaperPid, { classify });
  if (!owned) {
    throw new LaunchError("UsageError", "No launcher-started gateway is running", {
      hint:
        g?.state === "kept"
          ? "It was kept, so it is a normal gateway now: use `omniroute stop`"
          : "Use `omniroute stop` for a gateway you started yourself",
    });
  }
  await stopReaper(g.reaperPid, { classify, stateDir, generation: g.generation });
  // The reaper deletes gateway.json itself; clear a leftover only if it is still this one.
  if (!isOurProcessAlive(g.reaperPid, { classify })) {
    await withLock(stateDir, { timeoutMs: overrides.lockTimeoutMs }, () =>
      removeGatewayRecord(stateDir, g.generation)
    );
  }
  return { stopped: true };
}
