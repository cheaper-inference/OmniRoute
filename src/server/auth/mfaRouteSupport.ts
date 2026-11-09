/**
 * Shared plumbing for the `/api/auth/mfa/*` routes: sanitized error bodies, cookie
 * options, current-password re-authentication and the brute-force guard.
 *
 * Every factor or password check here goes through the same per-peer lockout as
 * `/api/auth/login` — a TOTP has only 10^6 values, so an unthrottled second step would be
 * the weak point of the whole scheme. Nothing in this module logs a code or a secret.
 */
import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { getCachedSettings } from "@/lib/db/readCache";
import {
  ensurePersistentManagementPasswordHash,
  getStoredManagementPassword,
  verifyManagementPassword,
} from "@/lib/auth/managementPassword";
import { beginLoginAttempt, endLoginAttempt, recordLoginFailure } from "@/server/auth/loginGuard";
import { getLoginLockoutKey } from "@/server/auth/loginPeer";
import {
  MFA_PENDING_COOKIE_PATH,
  MFA_PENDING_MAX_AGE_SECONDS,
} from "@/shared/utils/dashboardSessionToken";

export const NO_STORE_HEADERS = { "Cache-Control": "no-store" } as const;

/** Same lifetime as the session JWT (`mintDashboardSessionToken` signs 30 d). */
const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function mfaErrorResponse(
  status: number,
  message: string,
  extra: Record<string, unknown> = {},
  headers: Record<string, string> = {}
): Response {
  return NextResponse.json(
    { ...buildErrorBody(status, message), ...extra },
    { status, headers: { ...NO_STORE_HEADERS, ...headers } }
  );
}

function tooManyAttempts(retryAfterSeconds: number | undefined): Response {
  const retryAfter = String(retryAfterSeconds || 60);
  return mfaErrorResponse(
    429,
    "Too many failed attempts. Try again later.",
    {},
    {
      "Retry-After": retryAfter,
    }
  );
}

/** Mirrors `/api/auth/login`: Secure when forced by env or when the request arrived over HTTPS. */
export function shouldUseSecureAuthCookie(request: Request): boolean {
  if (process.env.AUTH_COOKIE_SECURE === "true") return true;
  const forwardedProto = (request.headers.get("x-forwarded-proto") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  if (forwardedProto === "https") return true;
  try {
    return new URL(request.url).protocol === "https:";
  } catch {
    return false;
  }
}

export function sessionCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_COOKIE_MAX_AGE_SECONDS,
  };
}

export function mfaPendingCookieOptions(secure: boolean, maxAge = MFA_PENDING_MAX_AGE_SECONDS) {
  return {
    httpOnly: true,
    secure,
    sameSite: "strict" as const,
    path: MFA_PENDING_COOKIE_PATH,
    maxAge,
  };
}

export interface MfaAttempt {
  lockoutKey: string | null;
  bruteForceEnabled: boolean;
  ipAddress: string | null;
  requestId: string;
  release(): void;
}

/**
 * Reserve a slot in the login brute-force guard for this peer. When `blocked` is set the
 * caller returns it as-is; otherwise it MUST call `attempt.release()` once done.
 */
export async function beginMfaAttempt(
  request: Request,
  auditAction: string
): Promise<
  { attempt: MfaAttempt; blocked?: undefined } | { attempt?: undefined; blocked: Response }
> {
  const audit = getAuditRequestContext(request);
  const settings = await getCachedSettings();
  const bruteForceEnabled = settings.bruteForceProtection !== false;
  const lockoutKey = getLoginLockoutKey(request, audit.ipAddress || null);

  const decision = beginLoginAttempt(lockoutKey, { enabled: bruteForceEnabled });
  if (!decision.allowed) {
    logAuditEvent({
      action: `${auditAction}.locked`,
      actor: "anonymous",
      target: "dashboard-auth",
      resourceType: "auth_session",
      status: "failed",
      ipAddress: audit.ipAddress || undefined,
      requestId: audit.requestId,
      metadata: { retryAfterSeconds: decision.retryAfterSeconds || 0 },
    });
    return { blocked: tooManyAttempts(decision.retryAfterSeconds) };
  }

  let released = false;
  return {
    attempt: {
      lockoutKey,
      bruteForceEnabled,
      ipAddress: audit.ipAddress || null,
      requestId: audit.requestId,
      release() {
        if (released) return;
        released = true;
        endLoginAttempt(lockoutKey);
      },
    },
  };
}

/** Count a wrong password or code against the peer and answer 401 (or 429 once locked). */
export function recordMfaFailure(
  attempt: MfaAttempt,
  failure: { action: string; reason: string; message: string }
): Response {
  const decision = recordLoginFailure(attempt.lockoutKey, { enabled: attempt.bruteForceEnabled });
  logAuditEvent({
    action: failure.action,
    actor: "anonymous",
    target: "dashboard-auth",
    resourceType: "auth_session",
    status: "failed",
    ipAddress: attempt.ipAddress || undefined,
    requestId: attempt.requestId,
    metadata: { reason: failure.reason, lockedOut: decision.allowed === false },
  });
  if (!decision.allowed) return tooManyAttempts(decision.retryAfterSeconds);
  return mfaErrorResponse(401, failure.message);
}

/** Re-authenticate with the current management password (enrollment and disable need it). */
export async function checkCurrentManagementPassword(
  password: string
): Promise<"ok" | "invalid" | "missing"> {
  const state = await ensurePersistentManagementPasswordHash({ source: "auth.mfa" });
  const hash = getStoredManagementPassword(state.settings);
  if (!hash) return "missing";
  return (await verifyManagementPassword(password, hash)) ? "ok" : "invalid";
}

export function logMfaEvent(
  attempt: Pick<MfaAttempt, "ipAddress" | "requestId">,
  action: string,
  metadata: Record<string, unknown> = {}
): void {
  logAuditEvent({
    action,
    actor: "admin",
    target: "dashboard-auth",
    resourceType: "auth_session",
    status: "success",
    ipAddress: attempt.ipAddress || undefined,
    requestId: attempt.requestId,
    metadata,
  });
}
