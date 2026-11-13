import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  resolveClaudeAgentSdk,
  resolveClaudeCodeExecutable,
} from "@omniroute/open-sse/utils/claudeAgentSdk";

const execFileAsync = promisify(execFile);
const STATUS_TIMEOUT_MS = 8_000;
const STATUS_MAX_BUFFER = 16 * 1024;
const CACHE_TTL_MS = 10_000;

/**
 * claude-agent ("Claude Code CLI") login status.
 *
 * Sign-in for claude-agent is the Claude CLI's own login — OmniRoute stores no
 * credential. Status is probed by running the vendored `claude auth status`
 * (JSON) once and caching for 10s, mirroring the devin-cli-agentic pattern.
 * No CLI account PII (email / paths) is returned.
 */
export interface ClaudeAgentAuthStatus {
  installed: boolean;
  loggedIn: boolean;
  /** "oauth_token" | "api_key" | ... as reported by the CLI (when known). */
  authMethod?: string;
  /** "firstParty" | ... API provider reported by the CLI (when known). */
  apiProvider?: string;
}

interface CachedStatus {
  status: ClaudeAgentAuthStatus;
  cachedAt: number;
}

let cachedStatus: CachedStatus | null = null;

async function getVendoredClaudeExecutable(): Promise<string | null> {
  try {
    const sdk = await resolveClaudeAgentSdk();
    return resolveClaudeCodeExecutable(sdk);
  } catch {
    return null;
  }
}

async function probeClaudeAgentAuthStatus(executable: string): Promise<ClaudeAgentAuthStatus> {
  try {
    const { stdout } = await execFileAsync(executable, ["auth", "status"], {
      timeout: STATUS_TIMEOUT_MS,
      maxBuffer: STATUS_MAX_BUFFER,
    });
    const parsed = JSON.parse(stdout) as {
      loggedIn?: boolean;
      authMethod?: string;
      apiProvider?: string;
    };
    return {
      installed: true,
      loggedIn: parsed.loggedIn === true,
      authMethod: parsed.authMethod,
      apiProvider: parsed.apiProvider,
    };
  } catch {
    // Non-zero exit / unparseable output is treated as logged out, not as a
    // failure — the CLI exits 0 even with a fresh config dir.
    return { installed: true, loggedIn: false };
  }
}

/**
 * `executable` is injectable for tests (string = use it, null = force the
 * "not installed" path, undefined = resolve the vendored CLI normally).
 */
export async function getClaudeAgentAuthStatus(
  executable?: string | null
): Promise<ClaudeAgentAuthStatus> {
  if (cachedStatus && Date.now() - cachedStatus.cachedAt < CACHE_TTL_MS) {
    return cachedStatus.status;
  }
  const resolved = executable === undefined ? await getVendoredClaudeExecutable() : executable;
  const status = resolved
    ? await probeClaudeAgentAuthStatus(resolved)
    : { installed: false, loggedIn: false };
  cachedStatus = { status, cachedAt: Date.now() };
  return status;
}

/**
 * Sync, non-blocking cached read for the auto-combo hot path
 * (noAuthAutoRoutingReadiness): returns the last probed status and kicks a
 * background refresh when the cache is stale — never blocks routing.
 */
export function peekClaudeAgentAuthStatus(): ClaudeAgentAuthStatus {
  if (!cachedStatus || Date.now() - cachedStatus.cachedAt >= CACHE_TTL_MS) {
    void getClaudeAgentAuthStatus().catch(() => {
      // Probe failures leave the last status in place; never unhandled.
    });
  }
  return cachedStatus?.status ?? { installed: false, loggedIn: false };
}
export function clearClaudeAgentAuthStatusCache(): void {
  cachedStatus = null;
}
