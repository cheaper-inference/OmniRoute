/**
 * CLIProxyAPI installer adapter for the ServiceSupervisor framework.
 *
 * Wraps the existing binaryManager/releaseChecker infra (GitHub release download,
 * checksum verify, symlink) and exposes the same interface as ninerouter.ts so that
 * bootstrap.ts can treat both services uniformly.
 *
 * Binary location: $DATA_DIR/bin/cliproxyapi  (symlink → versioned dir)
 * Config:          $DATA_DIR/services/cliproxy/config.yaml
 * DB row:          version_manager WHERE tool = 'cliproxy'
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool, getVersionManagerTool } from "@/lib/db/versionManager";
import { getLatestRelease } from "@/lib/versionManager/releaseChecker.ts";
import {
  installVersion,
  getCurrentBinaryPath,
  getInstalledVersions,
} from "@/lib/versionManager/binaryManager.ts";

export const CLIPROXY_DEFAULT_PORT = 8317;

export function getEffectiveDataDir(): string {
  return process.env.DATA_DIR || DATA_DIR;
}

export function getBinDir(): string {
  return path.join(getEffectiveDataDir(), "bin");
}

export function getConfigDir(): string {
  return path.join(getEffectiveDataDir(), "services", "cliproxy");
}

let latestVersionCache: { value: string; expiresAt: number } | null = null;
const VERSION_CACHE_TTL_MS = 3_600_000;

export interface InstallResult {
  installedVersion: string;
  installPath: string;
  durationMs: number;
}

export interface SpawnArgs {
  command: string;
  args: string[];
  env: NodeJS.ProcessEnv;
  cwd: string;
}

/**
 * Reads the installed version from the symlink target directory name,
 * falling back on Windows (or where copyFile was used instead of symlink)
 * to inspecting installed version directories and the version_manager DB table.
 */
export async function getInstalledVersion(): Promise<string | null> {
  const effectiveDir = getEffectiveDataDir();
  const binaryPath = await getCurrentBinaryPath(effectiveDir);
  if (binaryPath) {
    const dirName = path.basename(path.dirname(binaryPath));
    const m = dirName.match(/^cliproxyapi-(.+)$/);
    if (m) return m[1];
  }

  // Windows fallback: when unprivileged symlinks are unavailable, installVersion
  // copies the binary directly to bin/cliproxyapi.exe so dirname is "bin".
  // Check versioned subdirectories in bin/ (cliproxyapi-<version>/) or DB row.
  try {
    const versions = await getInstalledVersions(effectiveDir);
    if (versions.length > 0) {
      versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
      return versions[0];
    }
  } catch {}

  try {
    const tool = await getVersionManagerTool("cliproxy");
    if (tool?.installedVersion) return tool.installedVersion;
  } catch {}

  return null;
}

export async function getLatestVersion(): Promise<string | null> {
  if (latestVersionCache && latestVersionCache.expiresAt > Date.now()) {
    return latestVersionCache.value;
  }
  try {
    const release = await getLatestRelease();
    latestVersionCache = { value: release.version, expiresAt: Date.now() + VERSION_CACHE_TTL_MS };
    return release.version;
  } catch {
    return null;
  }
}

/**
 * Download and install CLIProxyAPI from GitHub releases.
 * Upserts the version_manager row with tool='cliproxy'.
 */
export async function install(version = "latest"): Promise<InstallResult> {
  const startMs = Date.now();
  const effectiveDir = getEffectiveDataDir();
  const binDir = getBinDir();

  const targetVersion = version === "latest" ? (await getLatestRelease()).version : version;

  const binaryPath = await installVersion(targetVersion, effectiveDir);

  await upsertVersionManagerTool({
    tool: "cliproxy",
    installedVersion: targetVersion,
    binaryPath,
    status: "stopped",
    port: CLIPROXY_DEFAULT_PORT,
  });

  latestVersionCache = null;

  return {
    installedVersion: targetVersion,
    installPath: binDir,
    durationMs: Date.now() - startMs,
  };
}

export async function update(): Promise<InstallResult> {
  return install("latest");
}

/**
 * Build spawn args for ServiceSupervisor.start().
 *
 * Writes config.yaml synchronously — safe because the destination is a
 * DATA_DIR-controlled path (no user input) and the content is static.
 * ServiceSupervisor calls spawnArgs() synchronously just before spawn(), so
 * async file I/O is not available here.
 */
export function resolveSpawnArgs(port: number, managementKey?: string): SpawnArgs {
  const binDir = getBinDir();
  const configDir = getConfigDir();

  // #11236 (bug 3 residual): runtime os.platform() read — a process.platform
  // literal here is constant-folded to the Linux build machine when the
  // published artifact is bundled, dropping the `.exe` suffix from the spawn
  // path on Windows and failing with ENOENT even when a valid .exe exists
  // (same fold class as b43a212680 / #10244/#10293).
  const executableName = os.platform() === "win32" ? "cliproxyapi.exe" : "cliproxyapi";
  let symlinkPath = path.join(binDir, executableName);

  if (!fs.existsSync(symlinkPath)) {
    // If the top-level binary copy/symlink does not exist, look into versioned dirs
    try {
      const entries = fs.readdirSync(binDir);
      const versionDirs = entries
        .filter((e) => e.startsWith("cliproxyapi-"))
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
      for (const vDir of versionDirs) {
        const candidates = [
          "cli-proxy-api.exe",
          "CLIProxyAPI.exe",
          "cliproxyapi.exe",
          "cli-proxy-api",
          "CLIProxyAPI",
          "cliproxyapi",
        ];
        for (const name of candidates) {
          const candidate = path.join(binDir, vDir, name);
          if (fs.existsSync(candidate)) {
            try {
              if (os.platform() === "win32") {
                fs.copyFileSync(candidate, symlinkPath);
              } else {
                fs.symlinkSync(candidate, symlinkPath);
              }
            } catch {}
            symlinkPath = candidate;
            break;
          }
        }
        if (symlinkPath !== path.join(binDir, executableName)) break;
      }
    } catch {}
  }

  fs.mkdirSync(configDir, { recursive: true });
  const configPath = path.join(configDir, "config.yaml");
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, `port: ${port}\nhost: 127.0.0.1\nlog_level: warn\n`, "utf8");
  }

  const env = { ...process.env };
  if (managementKey) env.MANAGEMENT_PASSWORD = managementKey;
  return {
    command: symlinkPath,
    args: ["--config", configPath],
    env,
    cwd: configDir,
  };
}
