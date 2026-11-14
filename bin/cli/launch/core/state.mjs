// bin/cli/launch/core/state.mjs: DATA_DIR/launch/** paths, a pid lock, atomic JSON.

import { createHash } from "node:crypto";
import { closeSync, mkdirSync, openSync, readFileSync, rmSync, statSync, writeSync } from "node:fs";
import { join } from "node:path";

import { LaunchError } from "../contract.mjs";
import { resolveDataDir } from "../../data-dir.mjs";
import { writePrivateFileAtomic } from "../../private-file.mjs";
import { isPidRunning as defaultIsPidRunning } from "../../utils/pid.mjs";

const TOOL_ID = /^[a-z0-9][a-z0-9-]*$/;

/** `DATA_DIR/launch` (the stateDir handed to gateway lifecycle). */
export function launchRoot(dataDir = resolveDataDir()) {
  return join(dataDir, "launch");
}

/** Short stable hash of a working directory (16 hex chars of SHA-256). */
export function cwdHash(cwd) {
  return createHash("sha256").update(String(cwd)).digest("hex").slice(0, 16);
}

function assertToolId(tool) {
  if (!TOOL_ID.test(String(tool))) {
    throw new LaunchError("Internal", `invalid tool id for state path: ${JSON.stringify(tool)}`);
  }
  return String(tool);
}

/** `DATA_DIR/launch/<tool>`: per-tool files (defaults, last launch). */
export function toolDir(dataDir, tool) {
  return join(launchRoot(dataDir), assertToolId(tool));
}

/** `${STATE}` = `DATA_DIR/launch/<tool>/<cwdHash>/`, kept across launches. */
export function toolStateDir(dataDir, tool, cwd) {
  return join(toolDir(dataDir, tool), cwdHash(cwd));
}

/** `DATA_DIR/launch/gateways/<urlhash>.json` (capability cache, no secrets). */
export function gatewayCachePath(dataDir, rootUrl) {
  return join(launchRoot(dataDir), "gateways", `${cwdHash(rootUrl)}.json`);
}

/** Parsed JSON file, or `fallback` when missing or unparseable. */
export function readJson(path, fallback = null) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return fallback;
  }
}

/** Atomic private (0600) JSON write; parents created 0700. */
export function writeJsonAtomic(path, value) {
  writePrivateFileAtomic(path, `${JSON.stringify(value, null, 2)}\n`);
}

/** Saved per-tool default model (`--set-default`), or undefined. */
export function readToolDefaults(dataDir, tool) {
  const data = readJson(join(toolDir(dataDir, tool), "defaults.json"), null);
  return data && typeof data === "object" ? data : {};
}

export function writeToolDefaults(dataDir, tool, defaults) {
  writeJsonAtomic(join(toolDir(dataDir, tool), "defaults.json"), defaults);
}

/** `last-launch.json`: `{ model, at }` (no URLs, no credentials). */
export function readLastLaunch(dataDir, tool) {
  const data = readJson(join(toolDir(dataDir, tool), "last-launch.json"), null);
  return data && typeof data === "object" ? data : null;
}

export function writeLastLaunch(dataDir, tool, record) {
  writeJsonAtomic(join(toolDir(dataDir, tool), "last-launch.json"), record);
}

/**
 * Exclusive lock file holding `{pid, at}`. A lock whose pid is dead, or older than `staleMs`, is
 * taken over. Waits up to `timeoutMs`, then throws StateLocked (exit 75).
 * @returns {Promise<() => void>} release function (idempotent)
 */
export async function acquireLock(path, options = {}) {
  const {
    timeoutMs = 30000,
    staleMs = 30000,
    pollMs = 50,
    isPidRunning = defaultIsPidRunning,
    now = Date.now,
    pid = process.pid,
  } = options;
  const started = now();
  mkdirSync(join(path, ".."), { recursive: true, mode: 0o700 });
  for (;;) {
    try {
      const fd = openSync(path, "wx", 0o600);
      writeSync(fd, JSON.stringify({ pid, at: now() }));
      closeSync(fd);
      let released = false;
      return () => {
        if (released) return;
        released = true;
        rmSync(path, { force: true });
      };
    } catch (error) {
      if (error?.code !== "EEXIST") throw error;
    }
    const holder = readJson(path, null);
    let age = 0;
    try {
      age = now() - statSync(path).mtimeMs;
    } catch {
      continue; // vanished between open and stat: retry at once
    }
    const holderPid = Number(holder?.pid);
    const dead = !Number.isInteger(holderPid) || holderPid <= 0 || !isPidRunning(holderPid);
    if (dead || age > staleMs) {
      rmSync(path, { force: true });
      continue;
    }
    if (now() - started >= timeoutMs) {
      throw new LaunchError("StateLocked", `launcher state is locked by pid ${holderPid}`, {
        hint: `remove ${path} if no other omnirouter launch is running`,
      });
    }
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }
}
