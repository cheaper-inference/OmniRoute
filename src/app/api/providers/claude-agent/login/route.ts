import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  resolveClaudeAgentSdk,
  resolveClaudeCodeExecutable,
} from "@omniroute/open-sse/utils/claudeAgentSdk";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { clearClaudeAgentAuthStatusCache } from "@/lib/providers/claudeAgentAuthStatus";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);
/** Interactive OAuth browser flow can legitimately take minutes. */
const LOGIN_TIMEOUT_MS = 10 * 60_000;

/**
 * POST /api/providers/claude-agent/login
 *
 * Sign-in for the claude-agent provider is the vendored Claude Code CLI's own
 * login (subscription / API key) — OmniRoute stores no credential. When the
 * server owns a TTY the flow is spawned directly (stdio inherited, exit
 * reported); otherwise the exact terminal command is returned for the user to
 * run.
 *
 * Loopback-only: matched by the `/api/providers/{id}/login` LOCAL_ONLY +
 * spawn-capable pattern in src/shared/constants/spawnCapablePrefixes.ts
 * (Hard Rules #15/#17) — classification needs no extra routeGuard entry.
 */
let loginInFlight = false;

export async function POST() {
  if (loginInFlight) {
    return NextResponse.json(
      { error: "Another claude-agent login is already in progress" },
      { status: 409 }
    );
  }
  try {
    const sdk = await resolveClaudeAgentSdk();
    const executable = resolveClaudeCodeExecutable(sdk);
    if (!executable) {
      return NextResponse.json(
        {
          error: "Claude Code CLI (@anthropic-ai/claude-agent-sdk) is not installed on this host",
        },
        { status: 503 }
      );
    }
    if (!process.stdout.isTTY) {
      return NextResponse.json({
        started: false,
        command: `${executable} auth login`,
        hint: "Run this command in a terminal on the machine running OmniRoute, then re-check status.",
      });
    }
    loginInFlight = true;
    try {
      await execFileAsync(executable, ["auth", "login"], {
        timeout: LOGIN_TIMEOUT_MS,
        stdio: "inherit",
        env: process.env,
      });
      return NextResponse.json({ started: true, exitCode: 0 });
    } finally {
      loginInFlight = false;
      clearClaudeAgentAuthStatusCache();
    }
  } catch (err) {
    loginInFlight = false;
    clearClaudeAgentAuthStatusCache();
    const exitCode = (err as { code?: number | string })?.code;
    return NextResponse.json(
      {
        started: true,
        exitCode: typeof exitCode === "number" ? exitCode : null,
        error: sanitizeErrorMessage(err instanceof Error ? err : String(err)),
      },
      { status: 500 }
    );
  }
}
