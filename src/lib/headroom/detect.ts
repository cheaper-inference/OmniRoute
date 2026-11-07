/**
 * Headroom proxy detection helpers.
 *
 * Ported from upstream 9router (decolua/9router @ b55cf36d + 50ed79fe).
 * Original authors: decolua, Carmelo Campos (@carmelogunsroses), Cursor.
 *
 * Headroom is the optional third-party token-saver proxy (headroom-ai
 * Python CLI). OmniRoute can either:
 *   1. Manage a local proxy lifecycle (loopback URL → start/stop from the
 *      dashboard via `process.ts`).
 *   2. Use an external Docker sidecar proxy (non-loopback HEADROOM_URL).
 *      In this case we only probe /health; start/stop are NOT exposed.
 *
 * All functions here are pure / side-effect-free where possible so they can
 * be unit-tested without spawning processes.
 */

import { execFileSync } from "node:child_process";
import path from "node:path";

const EXTRA_BINS = ["/usr/local/bin", "/opt/homebrew/bin", "/usr/bin", "/bin"];

/** Python minor versions whose Windows install dirs are probed, newest first. */
const WINDOWS_PYTHON_VERSIONS = ["314", "313", "312", "311", "310"];

/**
 * Windows Python launcher (`py.exe`, installed into C:\Windows by python.org).
 * Fixed allowlist entry — never request input (GHSA notes on HeadroomStatusOptions).
 */
const WINDOWS_PY_LAUNCHER = "py";

export const PYTHON_CANDIDATES = [
  "python3.14",
  "python3.13",
  "python3.12",
  "python3.11",
  "python3.10",
  "python3",
  "python",
];

type EnvLike = Record<string, string | undefined>;

type ExecFileFn = (
  file: string,
  args: readonly string[],
  options: { stdio: ["ignore", "pipe", "ignore"]; windowsHide: boolean; env: NodeJS.ProcessEnv }
) => Buffer | string;

/** Injectable seams so the probes are unit-testable without spawning anything. */
export interface HeadroomProbeDeps {
  platform?: NodeJS.Platform;
  env?: EnvLike;
  execFile?: ExecFileFn;
}

/**
 * Python dirs a Windows install puts on disk but a packaged (Electron/service)
 * process usually lacks on PATH (upstream 9router#5063): python.org per-user
 * installs, `pip install --user` Scripts dirs and legacy top-level `C:\Python3xx`.
 * Dirs derived from an unset env var are skipped instead of becoming drive-less.
 */
function windowsPythonDirs(env: EnvLike): string[] {
  const dirs: string[] = [];
  const drive = env.SystemDrive || "C:";
  for (const version of WINDOWS_PYTHON_VERSIONS) {
    if (env.LOCALAPPDATA) {
      const install = path.win32.join(env.LOCALAPPDATA, "Programs", "Python", `Python${version}`);
      dirs.push(path.win32.join(install, "Scripts"), install);
    }
  }
  for (const version of WINDOWS_PYTHON_VERSIONS) {
    if (env.APPDATA) {
      dirs.push(path.win32.join(env.APPDATA, "Python", `Python${version}`, "Scripts"));
    }
  }
  for (const version of WINDOWS_PYTHON_VERSIONS) {
    const install = `${drive}\\Python${version}`;
    dirs.push(install, `${install}\\Scripts`);
  }
  return dirs;
}

/**
 * Build the PATH used to locate a python interpreter (upstream 9router#2353).
 *
 * Version managers (mise, pyenv, asdf) and conda expose their interpreters via
 * shim dirs that are only added to PATH by interactive-shell activation
 * (`eval "$(mise activate bash)"` in `.bashrc`). The non-interactive server
 * process never runs that, so it would only ever see the system python. We
 * therefore prepend the well-known shim/bin dirs (respecting the managers' own
 * root env vars when set) so `findPython310` can discover a managed interpreter.
 *
 * Pure + env-injectable so it is unit-testable without spawning.
 */
export function buildPythonSearchPath(
  env: EnvLike = process.env,
  platform: NodeJS.Platform = process.platform
): string {
  if (platform === "win32") {
    // path.delimiter of the target platform (";"), resolved explicitly so the
    // Windows branch stays testable from a POSIX host.
    return [...windowsPythonDirs(env), env.PATH || ""].filter(Boolean).join(path.win32.delimiter);
  }
  const home = env.HOME || "";
  const managerDirs: string[] = [];
  if (home || env.MISE_DATA_DIR) {
    managerDirs.push(`${env.MISE_DATA_DIR || `${home}/.local/share/mise`}/shims`);
  }
  if (home || env.PYENV_ROOT) {
    managerDirs.push(`${env.PYENV_ROOT || `${home}/.pyenv`}/shims`);
  }
  if (home || env.ASDF_DATA_DIR) {
    managerDirs.push(`${env.ASDF_DATA_DIR || `${home}/.asdf`}/shims`);
  }
  if (env.CONDA_PREFIX) {
    managerDirs.push(`${env.CONDA_PREFIX}/bin`);
  }
  if (home) {
    managerDirs.push(`${home}/.local/bin`); // pipx / uv installs
  }
  return [...managerDirs, ...EXTRA_BINS, env.PATH || ""].filter(Boolean).join(path.posix.delimiter);
}

/**
 * Resolve the ordered list of python commands to probe. A `HEADROOM_PYTHON`
 * override (absolute path or command name) is tried first, mirroring the
 * `HEADROOM_URL` escape hatch, so operators on exotic setups can point directly
 * at their interpreter (upstream 9router#2353).
 */
export function resolvePythonCandidates(
  env: EnvLike = process.env,
  platform: NodeJS.Platform = process.platform
): string[] {
  const override = env.HEADROOM_PYTHON?.trim();
  const defaults =
    platform === "win32" ? [...PYTHON_CANDIDATES, WINDOWS_PY_LAUNCHER] : [...PYTHON_CANDIDATES];
  return override ? [override, ...defaults] : defaults;
}
const MIN_VERSION: readonly [number, number] = [3, 10];
const HEADROOM_HEALTH_TIMEOUT_MS = 1500;
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]", "0.0.0.0"]);

export const DEFAULT_HEADROOM_URL = process.env.HEADROOM_URL || "http://localhost:8787";

export interface HeadroomStatus {
  installed: boolean;
  path: string | null;
  running: boolean;
  python: string | null;
  localUrl: boolean;
  canStart: boolean;
  /**
   * Present (and `false`) only when the host-side binary probes were skipped for a
   * remote caller — `installed`/`path`/`python` are then "not checked", not "absent".
   * A probed status omits the field so the local response shape is unchanged.
   */
  probed?: false;
}

export interface HeadroomStatusOptions {
  /**
   * Whether the caller may run the host-side probes (`which headroom`, `python --version`).
   * Route handlers pass the trusted peer-locality verdict (loopback/LAN only); a remote
   * caller gets the unprobed status built from the /health check alone
   * (GHSA-35fw-cv32-2373 class, GHSA-jmq6-8j86-8xqj call-site gate). Defaults to true
   * for in-process callers.
   */
  allowLocalProbe?: boolean;
}

export interface BuildHeadroomStatusInput {
  url: string;
  binaryPath: string | null;
  python: string | null;
  proxyReachable: boolean;
}

// ──────────────── Pure helpers (unit-testable) ────────────────

export function isLoopbackHeadroomUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return LOOPBACK_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

export function parsePortFromHeadroomUrl(url: string): number | null {
  try {
    const u = new URL(url);
    if (!u.port) return null;
    const p = parseInt(u.port, 10);
    if (Number.isFinite(p) && p > 0 && p < 65536) return p;
  } catch {
    // fall through
  }
  return null;
}

/**
 * Assemble the headroom status payload from already-resolved inputs.
 * Kept pure so unit tests can exercise every branch without spawning
 * processes or hitting the network.
 *
 * - `running` reflects /health reachability regardless of local CLI presence
 *   (pair commit 50ed79fe — Docker sidecar support).
 * - `canStart` is only true for a loopback URL with the CLI installed; we
 *   never spawn against a non-loopback URL.
 */
export function buildHeadroomStatus(input: BuildHeadroomStatusInput): HeadroomStatus {
  const installed = Boolean(input.binaryPath);
  const localUrl = isLoopbackHeadroomUrl(input.url);
  return {
    installed,
    path: input.binaryPath,
    running: input.proxyReachable,
    python: input.python,
    localUrl,
    canStart: installed && localUrl,
  };
}

// ──────────────── Side-effecting probes ────────────────

export function findHeadroomBinary(deps: HeadroomProbeDeps = {}): string | null {
  const platform = deps.platform ?? process.platform;
  const env = deps.env ?? process.env;
  const execFile = deps.execFile ?? execFileSync;
  try {
    // execFileSync (no shell): "which"/"where" is invoked directly with "headroom"
    // as an arg and the search PATH goes through `env`, so even if some upstream
    // caller passes attacker-controlled input the shell metacharacters cannot
    // reach a shell parser. Windows has no `which`; `where` is its equivalent.
    const out = execFile(platform === "win32" ? "where" : "which", ["headroom"], {
      stdio: ["ignore", "pipe", "ignore"],
      windowsHide: true,
      env: { ...env, PATH: buildPythonSearchPath(env, platform) },
    })
      .toString()
      .trim();
    // `where` lists every match, one per line (CRLF) — take the first.
    return out.split(/\r?\n/)[0].trim() || null;
  } catch {
    return null;
  }
}

export function findPython310(deps: HeadroomProbeDeps = {}): string | null {
  const platform = deps.platform ?? process.platform;
  const env = deps.env ?? process.env;
  const execFile = deps.execFile ?? execFileSync;
  const searchPath = buildPythonSearchPath(env, platform);
  for (const candidate of resolvePythonCandidates(env, platform)) {
    try {
      // candidate is from a fixed allowlist (PYTHON_CANDIDATES + the Windows `py`
      // launcher) plus an optional operator-set HEADROOM_PYTHON override — never
      // remote/request input — but use execFileSync anyway to remove the shell entirely.
      const ver = execFile(candidate, ["--version"], {
        stdio: ["ignore", "pipe", "ignore"],
        windowsHide: true,
        env: { ...env, PATH: searchPath },
      })
        .toString()
        .trim();
      const match = ver.match(/(\d+)\.(\d+)/);
      if (!match) continue;
      const major = parseInt(match[1], 10);
      const minor = parseInt(match[2], 10);
      if (major > MIN_VERSION[0] || (major === MIN_VERSION[0] && minor >= MIN_VERSION[1])) {
        return candidate;
      }
    } catch {
      // try next candidate
    }
  }
  return null;
}

export async function probeProxyRunning(url: string): Promise<boolean> {
  if (!url) return false;
  const base = String(url).replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/health`, {
      signal: AbortSignal.timeout(HEADROOM_HEALTH_TIMEOUT_MS),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Aggregated dashboard status. Composes the three probes above with the
 * pure builder so the I/O happens in one place.
 */
export async function getHeadroomStatus(
  url: string,
  { allowLocalProbe = true }: HeadroomStatusOptions = {}
): Promise<HeadroomStatus> {
  if (!allowLocalProbe) {
    // No child process for a remote caller: /health reachability is an HTTP probe of
    // the operator-configured URL, everything else stays "not checked".
    const proxyReachable = await probeProxyRunning(url);
    return {
      ...buildHeadroomStatus({ url, binaryPath: null, python: null, proxyReachable }),
      probed: false,
    };
  }
  const binaryPath = findHeadroomBinary();
  const python = findPython310();
  const proxyReachable = await probeProxyRunning(url);
  return buildHeadroomStatus({ url, binaryPath, python, proxyReachable });
}
