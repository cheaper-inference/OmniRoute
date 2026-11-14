import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { execFile } from "child_process";
import { promisify } from "util";
import { getChecksums, getReleaseByVersion } from "./releaseChecker.ts";

const execFileAsync = promisify(execFile);
const DEFAULT_DATA_DIR = process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");

type Platform = "linux" | "darwin" | "windows" | "freebsd";
type Arch = "amd64" | "arm64";

function detectPlatform(): Platform {
  const p = os.platform();
  if (p === "linux") return "linux";
  if (p === "darwin") return "darwin";
  if (p === "win32") return "windows";
  return "linux";
}

function detectArch(): Arch {
  const a = os.arch();
  if (a === "x64") return "amd64";
  if (a === "arm64") return "arm64";
  return "amd64";
}

/**
 * #18809: CLIProxyAPI release assets name ARM builds `aarch64`
 * (`CLIProxyAPI_8.0.69_linux_aarch64.tar.gz`) while `os.arch()` reports `arm64`.
 * Older releases (v6.x) used `arm64`, so an ARM target tries the current name
 * first and falls back to the legacy one. x64 assets have always been `amd64`.
 *
 * @param arch - Host architecture as reported by {@link getTargetPlatform}.
 * @returns Release asset arch suffixes to try, in priority order.
 */
function releaseArchSuffixes(arch: Arch): string[] {
  return arch === "arm64" ? ["aarch64", "arm64"] : [arch];
}

/**
 * Release asset name template for a target, using the current upstream naming.
 *
 * @param platform - Target platform; defaults to the runtime platform.
 * @param arch - Target architecture; defaults to the runtime architecture.
 * @returns Asset name with a literal `{version}` placeholder.
 */
export function getAssetName(platform?: Platform, arch?: Arch): string {
  const plat = platform || detectPlatform();
  const arc = arch || detectArch();
  return `CLIProxyAPI_{version}_${plat}_${releaseArchSuffixes(arc)[0]}${plat === "windows" ? ".zip" : ".tar.gz"}`;
}

/**
 * Candidate CLIProxyAPI release asset names for a version and target, in the
 * order `downloadRelease` tries them.
 *
 * @param version - Release version without the leading `v` (e.g. `8.0.69`).
 * @param platform - Target platform.
 * @param arch - Target architecture.
 * @returns Exact asset file names, current naming first.
 */
export function getReleaseAssetNames(version: string, platform: Platform, arch: Arch): string[] {
  const ext = platform === "windows" ? ".zip" : ".tar.gz";
  return releaseArchSuffixes(arch).map(
    (suffix) => `CLIProxyAPI_${version}_${platform}_${suffix}${ext}`
  );
}

export function getTargetPlatform(): { platform: Platform; arch: Arch } {
  return { platform: detectPlatform(), arch: detectArch() };
}

async function downloadFile(url: string, dest: string, signal?: AbortSignal): Promise<void> {
  const res = await fetch(url, { signal });
  if (!res.ok || !res.body) throw new Error(`Download failed: ${res.status}`);
  const fileStream = fsSync.createWriteStream(dest);
  await pipeline(res.body as unknown as NodeJS.ReadableStream, fileStream);
}

async function extractTarGz(archivePath: string, destDir: string): Promise<void> {
  await execFileAsync("tar", ["xzf", archivePath, "-C", destDir]);
}

/**
 * #5590: Windows has no `unzip` on the system PATH — it only ships inside Git for
 * Windows' `usr/bin`, which Node's `spawn` PATH never sees, so `execFile("unzip")`
 * fails with `spawn unzip ENOENT`. Use PowerShell's built-in `Expand-Archive`
 * there (present on every supported Windows; this is the install path for the
 * Node-24-only embedded services). `execFileAsync` uses no shell, so the paths are
 * a single argument and are not shell-interpreted; the `''` escaping covers the
 * PowerShell `-Command` string and `-LiteralPath` prevents wildcard expansion.
 */
export function buildExtractZipCommand(
  platform: NodeJS.Platform,
  archivePath: string,
  destDir: string
): { command: string; args: string[] } {
  if (platform === "win32") {
    const src = archivePath.replace(/'/g, "''");
    const dst = destDir.replace(/'/g, "''");
    return {
      command: "powershell",
      args: [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `Expand-Archive -LiteralPath '${src}' -DestinationPath '${dst}' -Force`,
      ],
    };
  }
  return { command: "unzip", args: ["-o", archivePath, "-d", destDir] };
}

/**
 * #10244/#10293: `platform` MUST be an explicit parameter threaded down from the
 * caller's single runtime detection (see `installVersion`/`downloadRelease`), not
 * an independent `os.platform()` read inside this function. Multiple, independently
 * evaluated `os.platform()` call sites scattered across the module are each an
 * opportunity for a bundler to constant-fold that particular occurrence away — a
 * single detected value threaded as data through the call chain has no per-call-site
 * literal for the bundler to fold.
 */
async function extractZip(
  archivePath: string,
  destDir: string,
  platform: NodeJS.Platform
): Promise<void> {
  const { command, args } = buildExtractZipCommand(platform, archivePath, destDir);
  await execFileAsync(command, args);
}

async function verifyChecksum(filePath: string, expectedSha256: string): Promise<boolean> {
  const hash = crypto.createHash("sha256");
  await new Promise<void>((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (data: Buffer) => hash.update(data));
    stream.on("end", resolve);
    stream.on("error", reject);
  });
  return hash.digest("hex").toLowerCase() === expectedSha256.toLowerCase();
}

/**
 * #11236: read os.platform() at call time, never the build-foldable
 * process.platform literal — the published-artifact build runs on Linux and
 * constant-folds it, pruning the win32 branch so the managed binary lost its
 * `.exe` suffix on Windows installs (same fold class as b43a212680 /
 * #10244/#10293, which converted detectPlatform/detectArch; #10371 fixed the
 * name in source but left this literal read behind).
 */
function managedBinaryName(): string {
  return os.platform() === "win32" ? "cliproxyapi.exe" : "cliproxyapi";
}

function findBinaryInDir(dir: string): string | null {
  const candidates = ["cli-proxy-api", "cli-proxy-api.exe", "CLIProxyAPI", "CLIProxyAPI.exe"];
  for (const name of candidates) {
    if (fsSync.existsSync(path.join(/* turbopackIgnore: true */ dir, name))) {
      return path.join(/* turbopackIgnore: true */ dir, name);
    }
  }
  return null;
}

/**
 * Download, verify, and extract the CLIProxyAPI release asset for a target.
 *
 * @param version - Release version to install.
 * @param targetDir - Directory that receives the `cliproxyapi-<version>` folder.
 * @param signal - Optional abort signal for the download.
 * @param target - Pre-detected platform/arch (see #10244/#10293).
 * @returns Path to the extracted, executable binary.
 */
export async function downloadRelease(
  version: string,
  targetDir: string,
  signal?: AbortSignal,
  // Optional pre-detected target: lets a top-level orchestrator (installVersion)
  // read the runtime platform/arch exactly once and pass the value down instead of
  // this function independently re-reading os.platform()/os.arch() (#10244/#10293).
  target?: { platform: Platform; arch: Arch }
): Promise<string> {
  const release = await getReleaseByVersion(version);
  if (!release) throw new Error(`Version ${version} not found`);

  const { platform, arch } = target || getTargetPlatform();
  const candidates = getReleaseAssetNames(release.version, platform, arch);
  let asset: { name: string; url: string } | undefined;
  for (const name of candidates) {
    asset = release.assets.find((a) => a.name === name);
    if (asset) break;
  }
  if (!asset) {
    throw new Error(`No asset for ${platform}/${arch} (tried ${candidates.join(", ")})`);
  }
  const assetName = asset.name;

  const versionDir = path.join(targetDir, `cliproxyapi-${version}`);
  await fs.mkdir(versionDir, { recursive: true });

  const archivePath = path.join(versionDir, assetName);
  await downloadFile(asset.url, archivePath, signal);

  const checksums = await getChecksums(version);
  if (checksums.size > 0) {
    const expected = checksums.get(assetName);
    if (expected) {
      const valid = await verifyChecksum(archivePath, expected);
      if (!valid) {
        await fs.unlink(archivePath);
        throw new Error(`SHA256 checksum mismatch for ${assetName}`);
      }
    }
  }

  if (platform === "windows") {
    // Already inside the `platform === "windows"` branch of the single value
    // detected above (or threaded in via `target`) — pass the corresponding
    // NodeJS.Platform literal directly rather than calling os.platform() again.
    await extractZip(archivePath, versionDir, "win32");
  } else {
    await extractTarGz(archivePath, versionDir);
  }

  await fs.unlink(archivePath).catch(() => {});

  const binary = findBinaryInDir(versionDir);
  if (!binary) throw new Error(`Binary not found in extracted archive`);

  await fs.chmod(binary, 0o755);
  return binary;
}

export async function installVersion(version: string, dataDir?: string): Promise<string> {
  const dir = dataDir || DEFAULT_DATA_DIR;
  const binDir = path.join(dir, "bin");
  await fs.mkdir(binDir, { recursive: true });

  // Single runtime detection for this whole orchestration: read once here and
  // thread the value into downloadRelease() and the symlink/copy decision below,
  // instead of each step re-reading os.platform()/os.arch() independently
  // (#10244/#10293 — redundant reads are each an independent build-folding risk).
  const target = getTargetPlatform();
  const binary = await downloadRelease(version, binDir, undefined, target);

  const symlinkPath = path.join(binDir, managedBinaryName());
  try {
    await fs.unlink(symlinkPath);
  } catch {}
  if (target.platform === "windows") {
    await fs.copyFile(binary, symlinkPath);
  } else {
    await fs.symlink(binary, symlinkPath);
  }

  return symlinkPath;
}

export async function getCurrentBinaryPath(dataDir?: string): Promise<string | null> {
  const dir = dataDir || DEFAULT_DATA_DIR;
  const symlinkPath = path.join(dir, "bin", managedBinaryName());
  try {
    const real = await fs.realpath(symlinkPath);
    return fsSync.existsSync(/* turbopackIgnore: true */ real) ? real : null;
  } catch {
    return null;
  }
}

export async function getInstalledVersions(dataDir?: string): Promise<string[]> {
  const dir = dataDir || DEFAULT_DATA_DIR;
  const binDir = path.join(dir, "bin");
  try {
    const entries = await fs.readdir(binDir);
    return entries
      .filter(
        (e) =>
          typeof e === "string" &&
          e.startsWith("cliproxyapi-") &&
          fsSync.statSync(path.join(/* turbopackIgnore: true */ binDir, e)).isDirectory()
      )
      .map((e) => e.replace("cliproxyapi-", ""));
  } catch {
    return [];
  }
}

export async function rollbackVersion(dataDir?: string): Promise<string | null> {
  const versions = await getInstalledVersions(dataDir);
  if (versions.length < 2) return null;

  versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  const previous = versions[1];

  const dir = dataDir || DEFAULT_DATA_DIR;
  const binDir = path.join(dir, "bin");
  const oldBinary = findBinaryInDir(path.join(binDir, `cliproxyapi-${previous}`));
  if (!oldBinary) return null;

  const symlinkPath = path.join(binDir, managedBinaryName());
  try {
    await fs.unlink(symlinkPath);
  } catch {}
  // Single runtime detection for this orchestration, via the module's one
  // canonical read point (getTargetPlatform -> detectPlatform -> os.platform()),
  // rather than a separate ad hoc os.platform() call (#10244/#10293).
  const { platform } = getTargetPlatform();
  if (platform === "windows") {
    await fs.copyFile(oldBinary, symlinkPath);
  } else {
    await fs.symlink(oldBinary, symlinkPath);
  }

  return previous;
}

export async function removeVersion(version: string, dataDir?: string): Promise<boolean> {
  const dir = dataDir || DEFAULT_DATA_DIR;
  const versionDir = path.join(dir, "bin", `cliproxyapi-${version}`);
  try {
    await fs.rm(versionDir, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}
