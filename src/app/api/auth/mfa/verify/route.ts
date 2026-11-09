import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { logAuditEvent } from "@/lib/compliance/index";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { clearLoginAttempts } from "@/server/auth/loginGuard";
import { verifyDashboardSecondFactor } from "@/server/auth/dashboardMfa";
import {
  NO_STORE_HEADERS,
  beginMfaAttempt,
  mfaErrorResponse,
  mfaPendingCookieOptions,
  recordMfaFailure,
  sessionCookieOptions,
  shouldUseSecureAuthCookie,
  type MfaAttempt,
} from "@/server/auth/mfaRouteSupport";
import {
  DASHBOARD_SESSION_COOKIE,
  MFA_PENDING_COOKIE,
  getDashboardJwtSecret,
  mintDashboardSessionToken,
  verifyMfaPendingToken,
} from "@/shared/utils/dashboardSessionToken";

export const dynamic = "force-dynamic";

// Test seam for cookie store injection without affecting runtime behavior.
export const mfaVerifyRouteInternals = {
  getCookieStore: cookies,
};

const verifySchema = z.object({
  code: z.string().trim().min(1).max(64),
});

const EXPIRED_MESSAGE = "Two-factor sign-in expired. Sign in with your password again.";

/**
 * POST /api/auth/mfa/verify — login step 2 (public by exact path).
 *
 * Trades the `omniroute_mfa_pending` cookie set by `/api/auth/login` plus a TOTP or
 * recovery code for the real dashboard session. Shares the login brute-force guard: once
 * the peer is locked out even a correct code is refused until the lockout expires.
 */
export async function POST(request: Request) {
  let attempt: MfaAttempt | undefined;
  try {
    const secret = getDashboardJwtSecret();
    if (!secret) {
      return mfaErrorResponse(500, "Server misconfigured: JWT_SECRET not set.");
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return mfaErrorResponse(400, "Invalid JSON body");
    }
    const validation = validateBody(verifySchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const started = await beginMfaAttempt(request, "auth.mfa.verify");
    if (started.blocked) return started.blocked;
    attempt = started.attempt;

    const cookieStore = await mfaVerifyRouteInternals.getCookieStore();
    const pending = await verifyMfaPendingToken(cookieStore.get(MFA_PENDING_COOKIE)?.value, secret);
    if (!pending) {
      return mfaErrorResponse(401, EXPIRED_MESSAGE, { mfaExpired: true });
    }

    const secure = shouldUseSecureAuthCookie(request);
    const result = await verifyDashboardSecondFactor(validation.data.code);
    if (!result.ok) {
      if ("reason" in result && result.reason === "not_enabled") {
        // The factor was turned off after the password step: start over with a plain login.
        cookieStore.set(MFA_PENDING_COOKIE, "", mfaPendingCookieOptions(secure, 0));
        return mfaErrorResponse(401, EXPIRED_MESSAGE, { mfaExpired: true });
      }
      return recordMfaFailure(attempt, {
        action: "auth.mfa.verify_failed",
        reason: "invalid_code",
        message: "Invalid verification code.",
      });
    }

    clearLoginAttempts(attempt.lockoutKey);
    const token = await mintDashboardSessionToken(secret);
    cookieStore.set(DASHBOARD_SESSION_COOKIE, token, sessionCookieOptions(secure));
    cookieStore.set(MFA_PENDING_COOKIE, "", mfaPendingCookieOptions(secure, 0));

    logAuditEvent({
      action: "auth.login.success",
      actor: "admin",
      target: "dashboard-auth",
      resourceType: "auth_session",
      status: "success",
      ipAddress: attempt.ipAddress || undefined,
      requestId: attempt.requestId,
      metadata: {
        secondFactor: result.method,
        backupCodesRemaining: result.backupCodesRemaining,
        secureCookie: secure,
      },
    });

    return NextResponse.json(
      {
        success: true,
        method: result.method,
        backupCodesRemaining: result.backupCodesRemaining,
      },
      { headers: NO_STORE_HEADERS }
    );
  } catch (error) {
    console.error(
      "[AUTH] MFA verification failed:",
      error instanceof Error ? error.name : "unknown"
    );
    return mfaErrorResponse(500, "Internal server error");
  } finally {
    attempt?.release();
  }
}
