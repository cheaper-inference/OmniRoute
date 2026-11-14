// bin/cli/launch/core/lease.mjs: launch leases.
//
// One lease file per running launch: leases/<leaseId>.json
//   {leaseId, pid, toolId, createdAt, heartbeatAt, generation|null, owned, sessionId|null}
// A lease is LIVE iff its pid is running AND now - heartbeatAt < staleMs (45 s). The launcher
// rewrites heartbeatAt every 15 s; the heartbeat (not the pid alone) defeats pid reuse.

import { isPidRunning } from "../../utils/pid.mjs";
import {
  leasePath,
  listLeaseRecords,
  randomId,
  removeFile,
  writeJsonFile,
  ensureStateDir,
} from "./gateway/state.mjs";

export const LEASE_HEARTBEAT_MS = 15_000;
export const LEASE_STALE_MS = 45_000;

/** @returns {boolean} */
export function isLeaseLive(record, { now = Date.now(), staleMs = LEASE_STALE_MS } = {}) {
  if (!record || typeof record !== "object") return false;
  if (!Number.isInteger(record.pid) || record.pid <= 0) return false;
  const heartbeatAt = Number(record.heartbeatAt);
  if (!Number.isFinite(heartbeatAt) || now - heartbeatAt >= staleMs) return false;
  return isPidRunning(record.pid);
}

/** Live lease records. */
export function liveLeases(stateDir, options = {}) {
  return listLeaseRecords(stateDir)
    .map((entry) => entry.record)
    .filter((record) => isLeaseLive(record, options));
}

/** Delete every lease file that is not live. Returns the number removed. */
export function pruneLeases(stateDir, options = {}) {
  let removed = 0;
  for (const { file, record } of listLeaseRecords(stateDir)) {
    if (!isLeaseLive(record, options)) {
      if (removeFile(file)) removed++;
    }
  }
  return removed;
}

/**
 * Write a new lease. Returns a handle whose `release()` is idempotent and signal-safe (sync
 * unlink, no lock needed: stopping is the reaper's job).
 */
export function createLease(
  stateDir,
  {
    toolId = null,
    generation = null,
    owned = false,
    sessionId = null,
    heartbeatMs = LEASE_HEARTBEAT_MS,
  } = {}
) {
  ensureStateDir(stateDir);
  const leaseId = randomId();
  const now = Date.now();
  const record = {
    leaseId,
    pid: process.pid,
    toolId,
    createdAt: now,
    heartbeatAt: now,
    generation,
    owned,
    sessionId,
  };
  const file = leasePath(stateDir, leaseId);
  writeJsonFile(file, record);
  let released = false;
  const beat = () => {
    if (released) return;
    record.heartbeatAt = Date.now();
    try {
      // Rewrites (or recreates, if a peer pruned it while we were asleep) the lease.
      writeJsonFile(file, record);
    } catch {
      // Best effort: a missed beat only shortens the time to staleness.
    }
  };
  const timer = setInterval(beat, heartbeatMs);
  timer.unref?.();
  return {
    leaseId,
    record,
    heartbeat: beat,
    release() {
      if (released) return;
      released = true;
      clearInterval(timer);
      removeFile(file);
    },
  };
}
