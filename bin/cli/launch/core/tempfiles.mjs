// bin/cli/launch/core/tempfiles.mjs: private temp/state directories and 0600 file writes.

import { chmodSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";

import { LaunchError } from "../contract.mjs";
import { writePrivateFileAtomic } from "../../private-file.mjs";

/**
 * Create a fresh 0700 directory under `root`.
 * @param {{ root?: string, prefix?: string }} [options]
 * @returns {string} absolute path
 */
export function createPrivateTempDir({ root = os.tmpdir(), prefix = "omnirouter-" } = {}) {
  const dir = resolve(mkdtempSync(join(root ?? os.tmpdir(), prefix ?? "omnirouter-")));
  chmodSync(dir, 0o700);
  return dir;
}

/**
 * Resolve `relPath` under `rootDir`, refusing absolute paths, ".." segments and escapes.
 * @param {string} rootDir
 * @param {string} relPath
 * @returns {string} absolute path
 */
export function resolveUnder(rootDir, relPath) {
  if (typeof rootDir !== "string" || rootDir === "") {
    throw new LaunchError("Internal", "temp file root directory is not available");
  }
  const rel = typeof relPath === "string" ? relPath : "";
  if (
    rel === "" ||
    isAbsolute(rel) ||
    /^[A-Za-z]:/.test(rel) ||
    rel.split(/[\\/]/).some((segment) => segment === "..")
  ) {
    throw new LaunchError("Internal", `invalid temp file path: ${JSON.stringify(relPath)}`);
  }
  const root = resolve(rootDir);
  const target = resolve(root, rel);
  const back = relative(root, target);
  if (back === "" || back.startsWith(`..${sep}`) || back === ".." || isAbsolute(back)) {
    throw new LaunchError(
      "Internal",
      `temp file path escapes its root: ${JSON.stringify(relPath)}`
    );
  }
  return target;
}

/** mkdir -p with mode 0700. */
export function ensurePrivateDir(path) {
  mkdirSync(path, { recursive: true, mode: 0o700 });
}

/**
 * mkdir -p `path`, then force `mode` on the leaf (mkdir's mode is masked by the umask).
 * @param {string} path
 * @param {{ mode?: number }} [options]
 */
export function ensureDirWithMode(path, { mode = 0o700 } = {}) {
  mkdirSync(path, { recursive: true, mode });
  chmodSync(path, mode);
}

/**
 * Write `contents` atomically with a private mode; parents are created 0700.
 * @param {string} absPath
 * @param {string} contents
 * @param {{ mode?: number }} [options]
 */
export function writePrivateFile(absPath, contents, { mode = 0o600 } = {}) {
  ensurePrivateDir(dirname(absPath));
  writePrivateFileAtomic(absPath, contents, { mode });
}

/**
 * Remove a directory tree. Never throws.
 * @param {string | null | undefined} path
 * @returns {boolean} true when the removal ran without error
 */
export function removeDirSafe(path) {
  if (typeof path !== "string" || path === "") return false;
  try {
    rmSync(path, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}
