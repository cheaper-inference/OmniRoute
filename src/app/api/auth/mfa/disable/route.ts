import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { clearLoginAttempts } from "@/server/auth/loginGuard";
import {
  disableDashboardMfa,
  isDashboardMfaEnabled,
  isMfaRecoveryBypassActive,
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
  // Optional only for the host recovery switch; every other caller must send a live code.
  code: z.string().trim().min(1).max(64).optional(),
});

/**
 * POST /api/auth/mfa/disable — turn two-factor login off.
 *
 * Requires the current password AND a live factor (TOTP or recovery code), so a stolen
 * session plus a leaked password still cannot strip the factor off the account.
 *
 * Recovery: with `OMNIROUTE_DISABLE_MFA=true` on the server, the operator at the host
 * (loopback peer + loopback Host, same rule as the login bypass) may omit `code` — the way
 * out of a factor that can no longer be verified (undecryptable secret, lost device and no
 * recovery codes). The session and the current password are still required.
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

    const { password, code } = validation.data;
    const viaRecoverySwitch = code === undefined;
    if (viaRecoverySwitch && !isMfaRecoveryBypassActive(request)) {
      return mfaErrorResponse(400, "Verification code is required.");
    }

    const started = await beginMfaAttempt(request, "auth.mfa.disable");
    if (started.blocked) return started.blocked;
    attempt = started.attempt;

    const passwordCheck = await checkCurrentManagementPassword(password);
    if (passwordCheck !== "ok") {
      return recordMfaFailure(attempt, {
        action: "auth.mfa.disable_failed",
        reason: "invalid_password",
        message: "Invalid password.",
      });
    }

    let secondFactor: string = "recovery_switch";
    if (!viaRecoverySwitch) {
      const result = await verifyDashboardSecondFactor(code);
      if (!result.ok) {
        return recordMfaFailure(attempt, {
          action: "auth.mfa.disable_failed",
          reason: "invalid_code",
          message: "Invalid verification code.",
        });
      }
      secondFactor = result.method;
    }

    disableDashboardMfa();
    clearLoginAttempts(attempt.lockoutKey);
    logMfaEvent(attempt, "auth.mfa.disabled", { secondFactor });
    return NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
  } catch (error) {
    console.error("[AUTH] MFA disable failed:", error instanceof Error ? error.name : "unknown");
    return mfaErrorResponse(500, "Internal server error");
  } finally {
    attempt?.release();
  }
}
