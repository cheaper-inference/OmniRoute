import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createMfaEnrollment, isDashboardMfaEnabled } from "@/server/auth/dashboardMfa";
import {
  NO_STORE_HEADERS,
  beginMfaAttempt,
  checkCurrentManagementPassword,
  mfaErrorResponse,
  recordMfaFailure,
  type MfaAttempt,
} from "@/server/auth/mfaRouteSupport";

export const dynamic = "force-dynamic";

const setupSchema = z.object({
  password: z.string().min(1).max(1024),
});

/**
 * POST /api/auth/mfa/setup — enrollment step 1.
 *
 * Re-authenticates with the current password (an unattended session must not be able to
 * bind a new factor), then returns a candidate secret, its `otpauth://` URI and a QR code.
 * Nothing is persisted: the secret only takes effect through `/api/auth/mfa/enable`.
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let attempt: MfaAttempt | undefined;
  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return mfaErrorResponse(400, "Invalid JSON body");
    }
    const validation = validateBody(setupSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (isDashboardMfaEnabled()) {
      return mfaErrorResponse(409, "Two-factor authentication is already enabled.");
    }

    const started = await beginMfaAttempt(request, "auth.mfa.setup");
    if (started.blocked) return started.blocked;
    attempt = started.attempt;

    const passwordCheck = await checkCurrentManagementPassword(validation.data.password);
    if (passwordCheck === "missing") {
      return mfaErrorResponse(403, "No password configured. Set a password first.");
    }
    if (passwordCheck === "invalid") {
      return recordMfaFailure(attempt, {
        action: "auth.mfa.setup_failed",
        reason: "invalid_password",
        message: "Invalid password.",
      });
    }

    const enrollment = await createMfaEnrollment();
    return NextResponse.json(enrollment, { headers: NO_STORE_HEADERS });
  } catch (error) {
    console.error("[AUTH] MFA setup failed:", error instanceof Error ? error.name : "unknown");
    return mfaErrorResponse(500, "Internal server error");
  } finally {
    attempt?.release();
  }
}
