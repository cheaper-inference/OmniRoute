import { NextResponse } from "next/server";
import { getClaudeAgentAuthStatus } from "@/lib/providers/claudeAgentAuthStatus";
import { discoverClaudeAgentModels } from "@omniroute/open-sse/services/claudeAgentModels";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const runtime = "nodejs";

/**
 * GET /api/providers/claude-agent/status
 *
 * Reports the host's Claude Code CLI login state for the claude-agent
 * provider, plus the models the CLI login actually exposes (live discovery,
 * 10 min cache; empty when the CLI is unavailable). OmniRoute stores no
 * Anthropic credential; sign-in happens in the user's terminal (the vendored
 * CLI's own OAuth flow). No account PII is returned.
 */
export async function GET() {
  try {
    const [status, models] = await Promise.all([
      getClaudeAgentAuthStatus(),
      discoverClaudeAgentModels(),
    ]);
    return NextResponse.json(
      { ...status, models: models.models, modelsSource: models.source },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        installed: false,
        loggedIn: false,
        error: sanitizeErrorMessage(err instanceof Error ? err : String(err)),
      },
      { status: 500 }
    );
  }
}
