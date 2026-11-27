import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const APP_NAME = "omniroute";

function normalizeConfiguredPath(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? path.resolve(trimmed) : null;
}

function safeHomeDir() {
  try {
    return os.homedir();
  } catch {
    return process.env.HOME || process.env.USERPROFILE || os.tmpdir();
  }
}

export function getLegacyDotDataDir(homeDir = safeHomeDir()) {
  return path.join(homeDir, `.${APP_NAME}`);
}

function hasDatabase(dir) {
  try {
    return fs.statSync(path.join(dir, "storage.sqlite")).isFile();
  } catch {
    return false;
  }
}

export function getDefaultDataDir() {
  const homeDir = safeHomeDir();
  const legacyDir = getLegacyDotDataDir(homeDir);

  let legacyIsDir = false;
  try {
    legacyIsDir = fs.statSync(legacyDir).isDirectory();
  } catch {
    // Ignore stat errors and continue to the platform default.
  }

  let platformDir = null;
  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(homeDir, "AppData", "Roaming");
    platformDir = path.join(appData, APP_NAME);
  } else {
    const xdgConfigHome = normalizeConfiguredPath(process.env.XDG_CONFIG_HOME);
    if (xdgConfigHome) platformDir = path.join(xdgConfigHome, APP_NAME);
  }

  // An existing legacy dir wins, unless the platform dir holds the database and the legacy dir
  // does not: other code creates ~/.omniroute/<sub> directly, and that alone must not move an
  // XDG/APPDATA install to an empty database.
  if (legacyIsDir && !(platformDir && !hasDatabase(legacyDir) && hasDatabase(platformDir))) {
    return legacyDir;
  }
  return platformDir ?? legacyDir;
}

export function resolveDataDir() {
  const configured = normalizeConfiguredPath(process.env.DATA_DIR);
  if (configured) return configured;

  return getDefaultDataDir();
}

export function resolveStoragePath(dataDir = resolveDataDir()) {
  return path.join(dataDir, "storage.sqlite");
}
