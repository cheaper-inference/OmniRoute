// bin/cli/launch/core/version-cache.mjs: on-disk cache of the tool version probe, so a launch
// does not spawn `<tool> --version` every time. Stores only the binary path, its stat identity
// and the parsed version (no secrets). Every failure is silent: a broken cache never fails a launch.

import { realpathSync, statSync } from "node:fs";
import { join } from "node:path";

import { readJson, writeJsonAtomic } from "./state.mjs";

export const VERSION_CACHE_FILE = "version-cache.json";
export const VERSION_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
export const VERSION_CACHE_MAX_ENTRIES = 64;

/** Cache key for a binary + gate, or null when it must not be cached. */
export function versionCacheKey(bin, gate, deps = {}) {
  try {
    if (bin.shell) return null;
    const real = (deps.realpath ?? realpathSync)(bin.command);
    const st = (deps.stat ?? statSync)(real);
    return {
      id: JSON.stringify([real, st.mtimeMs, st.size, gate.args ?? [], String(gate.pattern ?? "")]),
      path: real,
    };
  } catch {
    return null;
  }
}

function readEntries(cacheDir) {
  const data = readJson(join(cacheDir, VERSION_CACHE_FILE), null);
  return data && typeof data === "object" && data.entries && typeof data.entries === "object"
    ? data.entries
    : {};
}

/** Cached version string for `key`, or undefined (miss, expired or unreadable). */
export function lookupVersion(cacheDir, key, now = Date.now) {
  try {
    const entry = readEntries(cacheDir)[key.id];
    if (!entry || typeof entry.version !== "string" || !entry.version) return undefined;
    if (typeof entry.at !== "number") return undefined;
    const age = now() - entry.at;
    if (age < 0 || age > VERSION_CACHE_TTL_MS) return undefined;
    return entry.version;
  } catch {
    return undefined;
  }
}

/** Store `version` (never an undefined one); keeps the newest 64 entries. Silent on failure. */
export function storeVersion(cacheDir, key, version, now = Date.now) {
  try {
    if (typeof version !== "string" || !version) return;
    const entries = { ...readEntries(cacheDir) };
    delete entries[key.id];
    entries[key.id] = { path: key.path, version, at: now() };
    const kept = Object.entries(entries)
      .sort((a, b) => (Number(a[1]?.at) || 0) - (Number(b[1]?.at) || 0))
      .slice(-VERSION_CACHE_MAX_ENTRIES);
    writeJsonAtomic(join(cacheDir, VERSION_CACHE_FILE), {
      v: 1,
      entries: Object.fromEntries(kept),
    });
  } catch {
    // a cache write must never break a launch
  }
}
