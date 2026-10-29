import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { clearLoginAttempts } from "@/server/auth/loginGuard";
import {
  disableDashboardMfa,
  isDashboardMfaEnabled,
  verifyDashboardSecondFactor,
} from "@/server/auth/dashboardMfa";
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

const disableSchema = z.object({
  password: z.string().min(1).max(1024),
  code: z.string().trim().min(1).max(64),
});

/**
 * POST /api/auth/mfa/disable — turn two-factor login off.
 *
 * Requires the current password AND a live factor (TOTP or recovery code), so a stolen
 * session plus a leaked password still cannot strip the factor off the account.
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
    const validation = validateBody(disableSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    if (!isDashboardMfaEnabled()) {
      return mfaErrorResponse(409, "Two-factor authentication is not enabled.");
    }

    const started = await beginMfaAttempt(request, "auth.mfa.disable");
    if (started.blocked) return started.blocked;
    attempt = started.attempt;

    const passwordCheck = await checkCurrentManagementPassword(validation.data.password);
    if (passwordCheck !== "ok") {
      return recordMfaFailure(attempt, {
        action: "auth.mfa.disable_failed",
        reason: "invalid_password",
        message: "Invalid password.",
      });
    }

    const result = await verifyDashboardSecondFactor(validation.data.code);
    if (!result.ok) {
      return recordMfaFailure(attempt, {
        action: "auth.mfa.disable_failed",
        reason: "invalid_code",
        message: "Invalid verification code.",
      });
    }

    disableDashboardMfa();
    clearLoginAttempts(attempt.lockoutKey);
    logMfaEvent(attempt, "auth.mfa.disabled", { secondFactor: result.method });
    return NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
  } catch (error) {
    console.error("[AUTH] MFA disable failed:", error instanceof Error ? error.name : "unknown");
    return mfaErrorResponse(500, "Internal server error");
  } finally {
    attempt?.release();
  }
}
