// Starts and stops the local `opencode serve` process on the operator's request.
//
// SECURITY (Hard Rules #13/#15/#17): this is the ONLY module of the
// opencode-server provider that loads a process API. It is imported solely by the
// lifecycle routes under /api/services/opencode-server/, which isLocalOnlyPath()
// classifies loopback-only before any auth check. The executor (request path)
// never imports it: when the server is down a chat request fails with a clear 503
// instead of spawning anything (check:route-guard-membership keeps it that way).
//
// What gets executed is never request input: the binary comes from the operator's
// environment (OPENCODE_SERVER_BIN / CLI_OPENCODE_BIN) or well-known install
// locations, argv is fixed apart from the port/host of a loopback URL, there is no
// shell, and the child gets a minimal environment (buildServerEnv).
import { spawn } from "node:child_process";
import { closeSync, existsSync, mkdirSync, openSync } from "node:fs";
import { join } from "node:path";

import {
  probeOpencodeServerHealth,
  resolveOpencodeServerUrl,
  type OpencodeServerHealth,
} from "./opencodeServerEndpoint.ts";
import { buildServerEnv, isLoopbackHost } from "./opencodeServerSafety.ts";
import { readOpencodeServerSettings } from "./opencodeServerSettings.ts";
import { firstExistingPath, opencodeBinaryCandidates } from "./opencodeServerWire.ts";

const DEFAULT_START_TIMEOUT_MS = 45_000;

export type OpencodeServerStatus = {
  url: string;
  running: boolean;
  version: string | null;
  /** PID of the server this OmniRoute process started (null when started elsewhere). */
  pid: number | null;
  /** True when this OmniRoute process started the server and can therefore stop it. */
  managed: boolean;
};

// Concurrent start requests share one promise so a double click spawns once.
const state: { pending: Promise<OpencodeServerStatus> | null; pid: number | null } = {
  pending: null,
  pid: null,
};

function startTimeoutMs(): number {
  const parsed = Number(process.env.OPENCODE_SERVER_START_TIMEOUT_MS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_START_TIMEOUT_MS;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Resolution order mirrors executors/auggie.ts: explicit ENV override, then known
// install locations, then PATH. Never read from the settings DB / dashboard.
export function resolveOpencodeBinary(
  env: Record<string, string | undefined> = process.env
): string {
  const explicit = String(env.OPENCODE_SERVER_BIN || env.CLI_OPENCODE_BIN || "").trim();
  if (explicit) return explicit;
  const { candidates, fallback } = opencodeBinaryCandidates(process.platform, env);
  return firstExistingPath(candidates, existsSync) ?? fallback;
}

function openServerLogs(): { stdoutFd: number | null; stderrFd: number | null } {
  const logDir =
    process.env.OMNIROUTE_LOG_DIR ||
    join(process.env.HOME || process.env.USERPROFILE || "", ".omniroute", "logs");
  try {
    mkdirSync(logDir, { recursive: true });
  } catch {
    /* logging is best effort */
  }
  try {
    return {
      stdoutFd: openSync(join(logDir, "opencode-serve.log"), "a"),
      stderrFd: openSync(join(logDir, "opencode-serve.err.log"), "a"),
    };
  } catch {
    return { stdoutFd: null, stderrFd: null };
  }
}

function pidAlive(pid: number | null): boolean {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function statusOf(url: string, health: OpencodeServerHealth | null): OpencodeServerStatus {
  const managed = pidAlive(state.pid);
  return {
    url,
    running: !!health,
    version: health?.version ?? null,
    pid: managed ? state.pid : null,
    managed,
  };
}

async function currentUrl(): Promise<string> {
  return resolveOpencodeServerUrl(await readOpencodeServerSettings());
}

export async function getOpencodeServerStatus(): Promise<OpencodeServerStatus> {
  const url = await currentUrl();
  return statusOf(url, await probeOpencodeServerHealth(url));
}

async function waitForHealth(url: string): Promise<OpencodeServerHealth | null> {
  const deadline = Date.now() + startTimeoutMs();
  let delay = 150;
  while (Date.now() < deadline) {
    await sleep(delay);
    delay = Math.min(1000, Math.round(delay * 1.4));
    const health = await probeOpencodeServerHealth(url, 1200);
    if (health) return health;
  }
  return null;
}

async function spawnServer(url: string): Promise<OpencodeServerStatus> {
  const parsed = new URL(url);
  // Only a server on this machine is ours to start; a remote URL means someone
  // else owns that process.
  if (!isLoopbackHost(parsed.hostname)) {
    throw new Error(
      `[opencode-server] ${url} is not a loopback URL; start that server where it runs`
    );
  }
  const { stdoutFd, stderrFd } = openServerLogs();
  const child = spawn(
    resolveOpencodeBinary(),
    [
      "serve",
      "--port",
      parsed.port || "4096",
      "--hostname",
      parsed.hostname.replace(/^\[|\]$/g, "") || "127.0.0.1",
    ],
    {
      cwd: process.env.OPENCODE_SERVER_CWD || process.cwd(),
      detached: true,
      windowsHide: true,
      stdio: ["ignore", stdoutFd, stderrFd],
      env: buildServerEnv(),
    }
  );
  child.on("error", () => {});
  child.unref();
  state.pid = child.pid ?? null;
  if (stdoutFd !== null) closeSync(stdoutFd);
  if (stderrFd !== null) closeSync(stderrFd);

  const health = await waitForHealth(url);
  if (!health) {
    throw new Error(
      `[opencode-server] opencode serve did not become healthy on ${url} (pid ${state.pid ?? "?"}); see opencode-serve.err.log`
    );
  }
  return statusOf(url, health);
}

/** Starts `opencode serve` unless a server already answers on the configured URL. */
export async function startOpencodeServer(): Promise<OpencodeServerStatus> {
  const url = await currentUrl();
  const health = await probeOpencodeServerHealth(url);
  if (health) return statusOf(url, health);
  if (!state.pending) {
    state.pending = spawnServer(url).finally(() => {
      state.pending = null;
    });
  }
  return state.pending;
}

/** Stops the server this process started; a server started elsewhere is left alone. */
export async function stopOpencodeServer(): Promise<OpencodeServerStatus> {
  const url = await currentUrl();
  const pid = state.pid;
  if (pidAlive(pid)) {
    try {
      process.kill(pid as number, "SIGTERM");
    } catch {
      /* already gone */
    }
    // Give it a moment to release the port so the reported status is the real one.
    for (let i = 0; i < 15 && pidAlive(pid); i++) await sleep(200);
  }
  state.pid = null;
  return statusOf(url, await probeOpencodeServerHealth(url, 800));
}
