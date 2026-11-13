// bin/cli/launch/core/gateway/state.mjs: private state helpers for the gateway lifecycle
// (architecture section 4.3). Owned by stream C2.
//
// Paths and atomic JSON come from core/state.mjs. The lock stays here: unlike core/state.mjs's
// acquireLock it is token-guarded on release, steals a stale lock atomically (rename aside) and
// breaks a live holder only after LOCK_HARD_STALE_MS, which the reaper relies on.
//
// Layout under `stateDir` (= DATA_DIR/launch):
//   lock                  exclusive create (open wx); {pid, at, token}
//   gateway.json          {generation, state, reaperPid, reaperStartedAt, serverPid,
//                          supervisorPid, port, host, startedAt, cliVersion}
//   leases/<leaseId>.json see ../lease.mjs
// No URL or credential is ever written here. Files are 0600, written atomically.

import { randomBytes } from "node:crypto";
import {
  closeSync,
  linkSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { isPidRunning, sleep } from "../../../utils/pid.mjs";
import { LaunchError } from "../../contract.mjs";
import { launchRoot, readJson, writeJsonAtomic } from "../state.mjs";

/** Default lock wait before StateLocked (section 10: "held by a live pid for > 30 s"). */
export const DEFAULT_LOCK_TIMEOUT_MS = 30_000;
/** A lock whose holder pid is alive is still broken after this age (pid-reuse guard). */
export const LOCK_HARD_STALE_MS = 5 * 60_000;
const LOCK_POLL_MS = 25;

export function defaultStateDir() {
  return launchRoot();
}

export function statePaths(stateDir) {
  return {
    dir: stateDir,
    lock: join(stateDir, "lock"),
    gateway: join(stateDir, "gateway.json"),
    leases: join(stateDir, "leases"),
    log: join(stateDir, "gateway.log"),
  };
}

export function ensureStateDir(stateDir) {
  mkdirSync(join(stateDir, "leases"), { recursive: true, mode: 0o700 });
}

export function randomId(bytes = 8) {
  return randomBytes(bytes).toString("hex");
}

/** Parse a JSON file; null when missing or unparsable. */
export function readJsonFile(path) {
  return readJson(path, null);
}

/** Atomic private (0600) JSON write; parents created 0700. */
export const writeJsonFile = writeJsonAtomic;

export function removeFile(path) {
  try {
    unlinkSync(path);
    return true;
  } catch {
    return false;
  }
}

// ---------- gateway.json ----------

export function readGatewayRecord(stateDir) {
  const record = readJsonFile(statePaths(stateDir).gateway);
  return record && typeof record === "object" && typeof record.generation === "string"
    ? record
    : null;
}

export function writeGatewayRecord(stateDir, record) {
  writeJsonFile(statePaths(stateDir).gateway, record);
}

/** Delete gateway.json, only when it still belongs to `generation` (if given). */
export function removeGatewayRecord(stateDir, generation) {
  if (generation !== undefined) {
    const current = readGatewayRecord(stateDir);
    if (current && current.generation !== generation) return false;
  }
  return removeFile(statePaths(stateDir).gateway);
}

/** Stop-request file the reaper polls (win32 cannot deliver a catchable SIGTERM). */
export function stopRequestPath(stateDir, generation) {
  return join(stateDir, `stop-${generation}`);
}

// ---------- lock ----------

function readRaw(path) {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

function parseLock(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function readLock(path) {
  const raw = readRaw(path);
  return raw === null ? null : parseLock(raw);
}

/**
 * Steal a lock judged stale, atomically: rename it aside, then check the renamed file is the
 * one we judged (same raw content). If a peer replaced it in between, put the peer's lock back
 * (link is exclusive, so a third lock is never overwritten).
 */
function stealLock(path, judgedRaw) {
  const aside = `${path}.stale.${randomId(4)}`;
  try {
    renameSync(path, aside);
  } catch {
    return; // already gone or replaced: the next loop iteration decides again
  }
  const raw = readRaw(aside);
  if (raw !== judgedRaw) {
    try {
      linkSync(aside, path);
    } catch {}
  }
  removeFile(aside);
}

function lockIsStale(holder, now) {
  // Unparsable content: a writer died between create and write, or garbage. Treat as stale
  // once it is older than a short grace (the create+write window is microseconds).
  if (!holder || !Number.isInteger(holder.pid)) return true;
  if (!isPidRunning(holder.pid)) return true;
  const at = Number(holder.at);
  return Number.isFinite(at) && now - at > LOCK_HARD_STALE_MS;
}

/**
 * Take the state lock (exclusive create). Returns a release function. Throws StateLocked when a
 * live holder keeps it for longer than `timeoutMs`.
 */
export async function takeLock(stateDir, { timeoutMs = DEFAULT_LOCK_TIMEOUT_MS } = {}) {
  ensureStateDir(stateDir);
  const path = statePaths(stateDir).lock;
  const token = randomId();
  const started = Date.now();
  let lastHolder = null;
  for (;;) {
    try {
      const fd = openSync(path, "wx", 0o600);
      try {
        writeFileSync(fd, JSON.stringify({ pid: process.pid, at: Date.now(), token }));
      } finally {
        closeSync(fd);
      }
      let released = false;
      return () => {
        if (released) return;
        released = true;
        const holder = readLock(path);
        if (holder && holder.token === token) removeFile(path);
      };
    } catch (err) {
      if (err?.code !== "EEXIST") throw err;
    }
    let raw = readRaw(path);
    if (raw === null) continue; // released in between
    let holder = parseLock(raw);
    if (!holder) {
      // Unparsable: maybe a live peer between create and write. Look again after one poll.
      await sleep(LOCK_POLL_MS);
      const again = readRaw(path);
      if (again !== raw) continue;
      raw = again;
      holder = null;
    }
    lastHolder = holder;
    if (lockIsStale(holder, Date.now())) {
      stealLock(path, raw);
      continue;
    }
    if (Date.now() - started >= timeoutMs) {
      throw new LaunchError(
        "StateLocked",
        `The launcher state is locked by process ${lastHolder?.pid ?? "?"}`,
        { hint: `If no other launch is running, remove ${path}` }
      );
    }
    await sleep(LOCK_POLL_MS);
  }
}

/** Run `fn` under the lock. */
export async function withLock(stateDir, options, fn) {
  const release = await takeLock(stateDir, options);
  try {
    return await fn();
  } finally {
    release();
  }
}

// ---------- leases (raw file access; liveness rules live in ../lease.mjs) ----------

export function leasePath(stateDir, leaseId) {
  return join(statePaths(stateDir).leases, `${leaseId}.json`);
}

export function listLeaseRecords(stateDir) {
  let names;
  try {
    names = readdirSync(statePaths(stateDir).leases);
  } catch {
    return [];
  }
  const out = [];
  for (const name of names) {
    if (name.startsWith(".") || !name.endsWith(".json")) continue;
    const record = readJsonFile(join(statePaths(stateDir).leases, name));
    out.push({ file: join(statePaths(stateDir).leases, name), record });
  }
  return out;
}
