import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  credentialsFromCursorTokens,
  peekCursorLoginSession,
  pollCursorAuthOnce,
  consumeCursorLoginSession,
} from "@/lib/oauth/services/cursorLogin";
import { persistGrokBotConnection } from "@/lib/oauth/services/persistGrokBotConnection";
import { fetchGrokBotAccountEmail } from "@/lib/oauth/services/grokBotAccount";
import { isCloudEnabled } from "@/models";
import { syncToCloud } from "@/lib/cloudSync";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getConsistentMachineId } from "@/shared/utils/machineId";

const pollSchema = z.object({
  sessionId: z.string().trim().min(1, "sessionId is required"),
});

async function requireOAuthAuth(request: Request) {
  return requireManagementAuth(request, { invalidApiKeyStatus: 401 });
}

async function syncToCloudIfEnabled(machineId: string) {
  try {
    if (await isCloudEnabled()) {
      await syncToCloud(machineId);
    }
  } catch {
    // best-effort
  }
}

/**
 * POST /api/oauth/grok-bot/login/poll
 * One poll against the Cursor auth endpoint. The dashboard repeats until
 * ok, error, or timeout. A successful poll stores a grok-bot connection.
 */
export async function POST(request: Request) {
  const authResponse = await requireOAuthAuth(request);
  if (authResponse) return authResponse;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  const validation = validateBody(pollSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { sessionId } = validation.data;
  const session = peekCursorLoginSession(sessionId);
  if (!session) {
    return NextResponse.json(
      { status: "expired", error: "Login session expired or not found. Start again." },
      { status: 410 }
    );
  }

  try {
    const result = await pollCursorAuthOnce(session.uuid, session.verifier);
    if (result.status === "pending") {
      return NextResponse.json({ status: "pending" });
    }
    if (result.status === "error") {
      return NextResponse.json(
        { status: "error", error: result.message },
        { status: result.httpStatus && result.httpStatus >= 400 ? result.httpStatus : 502 }
      );
    }

    const creds = credentialsFromCursorTokens(result.accessToken, result.refreshToken);
    const accountEmail = await fetchGrokBotAccountEmail(result.accessToken);
    const machineId = await getConsistentMachineId();
    const connection = await persistGrokBotConnection({
      ...creds,
      email: accountEmail ?? creds.email,
      machineId,
    });

    consumeCursorLoginSession(sessionId);

    await syncToCloudIfEnabled(machineId);

    return NextResponse.json({
      status: "ok",
      success: true,
      connection: {
        id: (connection as { id?: string })?.id,
        provider: "grok-bot",
        email: (connection as { email?: string })?.email ?? creds.email ?? null,
      },
    });
  } catch (error) {
    const message = sanitizeErrorMessage(error) || "Failed to poll Grok Bot login";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
