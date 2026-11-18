import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { completeMfaEnrollment, isDashboardMfaEnabled } from "@/server/auth/dashboardMfa";
import {
  NO_STORE_HEADERS,
  beginMfaAttempt,
  checkCurrentManagementPassword,
  logMfaEvent,
  mfaErrorResponse,
  recordMfaFailure,
  type MfaAttempt,
} from "@/server/auth/mfaRouteSupport";

export const dynamic = "force-dynamic";

const enableSchema = z.object({
  password: z.string().min(1).max(1024),
  // Base32 secret handed out by /api/auth/mfa/setup (160 bits → 32 chars; allow 80–512 bits).
  secret: z
    .string()
    .trim()
    .regex(/^[A-Za-z2-7]{16,103}$/),
  code: z.string().trim().min(1).max(16),
});

/**
 * POST /api/auth/mfa/enable — enrollment step 2.
 *
 * Persists the secret only after the current password and a code generated from it both
 * check out, then returns ten single-use recovery codes. They are shown exactly once.
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
    const validation = validateBody(enableSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (isDashboardMfaEnabled()) {
      return mfaErrorResponse(409, "Two-factor authentication is already enabled.");
    }

    const started = await beginMfaAttempt(request, "auth.mfa.enable");
    if (started.blocked) return started.blocked;
    attempt = started.attempt;

    const passwordCheck = await checkCurrentManagementPassword(validation.data.password);
    if (passwordCheck === "missing") {
      return mfaErrorResponse(403, "No password configured. Set a password first.");
    }
    if (passwordCheck === "invalid") {
      return recordMfaFailure(attempt, {
        action: "auth.mfa.enable_failed",
        reason: "invalid_password",
        message: "Invalid password.",
      });
    }

    const enrolled = await completeMfaEnrollment(
      validation.data.secret.toUpperCase(),
      validation.data.code
    );
    if (!enrolled) {
      return recordMfaFailure(attempt, {
        action: "auth.mfa.enable_failed",
        reason: "invalid_code",
        message: "Invalid verification code. Check the authenticator app and try again.",
      });
    }

    logMfaEvent(attempt, "auth.mfa.enabled", { backupCodes: enrolled.backupCodes.length });
    return NextResponse.json(
      { success: true, backupCodes: enrolled.backupCodes },
      { headers: NO_STORE_HEADERS }
    );
  } catch (error) {
    console.error("[AUTH] MFA enable failed:", error instanceof Error ? error.name : "unknown");
    return mfaErrorResponse(500, "Internal server error");
  } finally {
    attempt?.release();
  }
}
