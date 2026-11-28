/**
 * Shared Hermes home-directory resolver (#3628).
 *
 * The Hermes PowerShell installer (Windows) writes its default config under
 * `%LOCALAPPDATA%\hermes`, exposed as the `HERMES_HOME` env var.  OmniRoute
 * previously hard-coded `~/.hermes` everywhere, so the two config files never
 * met on Windows.
 *
 * IMPORTANT: the env var MUST be read at call-time (i.e. inside a function),
 * never at module-load time.  `TOOL_CONFIG_PATHS` in index.ts is evaluated
 * eagerly — any constant defined there would freeze the path at import.
 * That's why this module exports plain functions instead of constants.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

/**
 * Returns the Hermes home directory.
 *
 * Resolution order:
 *   1. `HERMES_HOME` env var (if non-empty)
 *   2. `~/.hermes` (cross-platform fallback)
 *
 * Reads `process.env.HERMES_HOME` every call so tests can set/unset the var
 * without module-cache interference.
 */
export function getHermesHome(): string {
  const override = (process.env.HERMES_HOME || "").trim();
  return override || path.join(os.homedir(), ".hermes");
}

/**
 * Returns the canonical path to the Hermes Agent `config.yaml`.
 * Always delegates to `getHermesHome()` so it picks up `HERMES_HOME` at
 * call-time.
 */
export function getHermesConfigPath(): string {
  return path.join(getHermesHome(), "config.yaml");
}

// A profile is a real directory under `<home>/profiles/` that holds one of these files.
const PROFILE_IDENTITY_FILES = ["config.yaml", "profile.yaml"];
const PROFILE_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

/**
 * Names of the Hermes profiles under `<home>/profiles/`, sorted. Symlinks and directories with no
 * identity file are ignored, so a name returned here always maps to a directory inside the home.
 */
export function listHermesProfiles(): string[] {
  const root = path.join(getHermesHome(), "profiles");
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter(
      (entry) =>
        entry.isDirectory() &&
        PROFILE_NAME.test(entry.name) &&
        PROFILE_IDENTITY_FILES.some((file) => fs.existsSync(path.join(root, entry.name, file)))
    )
    .map((entry) => entry.name)
    .sort();
}

/** Home directory of one listed profile, or null when `name` is not a listed profile. */
export function resolveHermesProfileHome(name: string): string | null {
  return listHermesProfiles().includes(name) ? path.join(getHermesHome(), "profiles", name) : null;
}
