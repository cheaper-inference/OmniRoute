// bin/cli/launch/core/state.mjs: DATA_DIR/launch/** paths and atomic JSON.

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { LaunchError } from "../contract.mjs";
import { resolveDataDir } from "../../data-dir.mjs";
import { writePrivateFileAtomic } from "../../private-file.mjs";

const TOOL_ID = /^[a-z0-9][a-z0-9-]*$/;

/** `DATA_DIR/launch` (the stateDir handed to gateway lifecycle). */
export function launchRoot(dataDir = resolveDataDir()) {
  return join(dataDir, "launch");
}

/** Short stable hash of a working directory (16 hex chars of SHA-256). */
function cwdHash(cwd) {
  return createHash("sha256").update(String(cwd)).digest("hex").slice(0, 16);
}

function assertToolId(tool) {
  if (!TOOL_ID.test(String(tool))) {
    throw new LaunchError("Internal", `invalid tool id for state path: ${JSON.stringify(tool)}`);
  }
  return String(tool);
}

/** `DATA_DIR/launch/<tool>`: per-tool files (defaults, last launch). */
function toolDir(dataDir, tool) {
  return join(launchRoot(dataDir), assertToolId(tool));
}

/** `${STATE}` = `DATA_DIR/launch/<tool>/<cwdHash>/`, kept across launches. */
export function toolStateDir(dataDir, tool, cwd) {
  return join(toolDir(dataDir, tool), cwdHash(cwd));
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
