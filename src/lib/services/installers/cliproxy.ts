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
  findBinaryInDir,
} from "@/lib/versionManager/binaryManager.ts";

export const CLIPROXY_DEFAULT_PORT = 8317;

/**
 * The data directory db/core.ts resolved at boot: absolute even for a relative
 * DATA_DIR, and already past its unwritable-directory fallback, so the binary and
 * config always sit next to the database instead of under a raw env value.
 */
export function getEffectiveDataDir(): string {
  return DATA_DIR;
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
 * Reads the installed version from the symlink target directory name. Where the
 * managed binary is a copy instead of a symlink (Windows), its parent is plain
 * bin/, so fall back to the committed version_manager row and then to the newest
 * version directory that really holds an extracted binary (#20180).
 */
export async function getInstalledVersion(): Promise<string | null> {
  const effectiveDir = getEffectiveDataDir();
  const binaryPath = await getCurrentBinaryPath(effectiveDir);
  if (binaryPath) {
    const dirName = path.basename(path.dirname(binaryPath));
    const m = dirName.match(/^cliproxyapi-(.+)$/);
    if (m) return m[1];
  }

  // install()/rollbackTool() record the version they put in place; the newest
  // directory is not it after a rollback or an install of an older release.
  const committed = await readCommittedVersion();
  if (committed) return committed;

  return newestExtractedVersion(effectiveDir);
}

async function readCommittedVersion(): Promise<string | null> {
  try {
    const tool = await getVersionManagerTool("cliproxy");
    return tool?.installedVersion || null;
  } catch {
    return null;
  }
}

/**
 * downloadRelease() creates cliproxyapi-<version>/ before the download, so a failed
 * update leaves an empty directory behind: only count directories with a binary.
 */
async function newestExtractedVersion(dataDir: string): Promise<string | null> {
  const binDir = path.join(dataDir, "bin");
  const versions = (await getInstalledVersions(dataDir)).filter((version) =>
    findBinaryInDir(path.join(binDir, `cliproxyapi-${version}`))
  );
  versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  return versions[0] ?? null;
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
 * #20180: the managed copy/symlink in bin/ can go missing (a failed Windows copy, a
 * cleaned bin/). Use the newest extracted version, found with the installer's own
 * lookup (nested archive folders included), and try to restore the managed entry so
 * the next start finds it directly. Synchronous, like resolveSpawnArgs().
 */
function recoverManagedBinary(binDir: string, managedPath: string): string | null {
  let versionDirs: string[];
  try {
    versionDirs = fs.readdirSync(binDir).filter((entry) => entry.startsWith("cliproxyapi-"));
  } catch {
    return null;
  }
  versionDirs.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  for (const versionDir of versionDirs) {
    const binary = findBinaryInDir(path.join(binDir, versionDir));
    if (!binary) continue;
    try {
      if (os.platform() === "win32") {
        fs.copyFileSync(binary, managedPath);
      } else {
        fs.symlinkSync(binary, managedPath);
      }
    } catch {
      // Best effort: spawning the versioned binary directly still works.
    }
    return binary;
  }
  return null;
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
  const managedPath = path.join(binDir, executableName);
  const symlinkPath = fs.existsSync(managedPath)
    ? managedPath
    : (recoverManagedBinary(binDir, managedPath) ?? managedPath);

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
