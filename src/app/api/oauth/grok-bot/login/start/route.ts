import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  createCursorLoginSession,
  CURSOR_LOGIN_TTL_SECONDS,
  generateCursorAuthParams,
} from "@/lib/oauth/services/cursorLogin";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

async function requireOAuthAuth(request: Request) {
  return requireManagementAuth(request, { invalidApiKeyStatus: 401 });
}

/**
 * POST /api/oauth/grok-bot/login/start
 * Begin the Grok Bot deep-control login. The verifier stays server-side.
 * redirectTarget is "sand": a "cli" grant cannot call GrokBotService.
 */
export async function POST(request: Request) {
  const authResponse = await requireOAuthAuth(request);
  if (authResponse) return authResponse;

  try {
    const params = await generateCursorAuthParams("sand");
    const { sessionId, loginUrl } = createCursorLoginSession(params);
    return NextResponse.json({
      success: true,
      sessionId,
      loginUrl,
      expiresInSeconds: CURSOR_LOGIN_TTL_SECONDS,
    });
  } catch (error) {
    const message = sanitizeErrorMessage(error) || "Failed to start Grok Bot login";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
