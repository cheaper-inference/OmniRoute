// bin/cli/launch/command/cleanup.mjs: `launch --cleanup`, the forced stale sweep.

import { readdirSync, rmSync, statSync } from "node:fs";
import os from "node:os";
import { join } from "node:path";

/** Prefix of the private temp dirs core creates per launch (core/tempfiles.mjs). */
const TMP_PREFIX = "omnirouter-";
/** `--cleanup` removes launcher temp dirs older than this (a live launch is younger). */
const ORPHAN_TMP_AGE_MS = 24 * 60 * 60 * 1000;

function safePrune(prune, stateDir) {
  try {
    return prune(stateDir);
  } catch {
    return 0;
  }
}

function readNames(dir) {
  try {
    return readdirSync(dir);
  } catch {
    return [];
  }
}

function ownedByUs(st) {
  return typeof process.getuid !== "function" || st.uid === process.getuid();
}

function isOrphanDir(st, now) {
  return st.isDirectory() && !(now - st.mtimeMs < ORPHAN_TMP_AGE_MS) && ownedByUs(st);
}

/** Remove `path` when it is one of our launcher temp dirs older than a day. */
function removeIfOrphan(path, now) {
  try {
    if (!isOrphanDir(statSync(path), now)) return false;
    rmSync(path, { recursive: true, force: true });
    return true;
  } catch {
    // raced with another sweep or not ours: skip
    return false;
  }
}

/**
 * `--cleanup`: forced stale sweep. Prunes dead gateway leases and
 * removes launcher temp dirs older than a day. Returns what it removed.
 */
export async function runCleanup({
  stateDir,
  tmpRoot = os.tmpdir(),
  now = Date.now(),
  pruneLeases,
} = {}) {
  const prune = pruneLeases ?? (await loadLease()).pruneLeases;
  const leases = safePrune(prune, stateDir);
  const tempDirs = readNames(tmpRoot)
    .filter((name) => name.startsWith(TMP_PREFIX))
    .map((name) => join(tmpRoot, name))
    .filter((path) => removeIfOrphan(path, now));
  return { leases, tempDirs };
}

// Lazy loaders stay last: the test loader rewrites dynamic import() in place, which shifts
// the coverage offsets of any code that follows it.

/** Lease bookkeeping is only needed by `--cleanup`. */
function loadLease() {
  return import("../core/lease.mjs");
}
