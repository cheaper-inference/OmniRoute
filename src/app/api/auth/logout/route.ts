import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  SettingsRevisionConflictError,
  getSettings,
  getSettingsRevision,
  updateSettings,
} from "@/lib/db/settings";
import {
  DASHBOARD_SESSION_COOKIE,
  REVOKED_SESSIONS_SETTING,
  addRevokedSession,
  verifyDashboardSessionToken,
  type RevokedSession,
} from "@/shared/utils/dashboardSessionToken";
import { cookies } from "next/headers";

export const logoutRouteInternals = {
  getCookieStore: cookies,
  getSettings,
  getSettingsRevision,
  updateSettings,
};

/** Attempts to save a revocation when other settings writes keep landing in between. */
const MAX_REVOCATION_ATTEMPTS = 5;
const LOGOUT_RETRY_AFTER_SECONDS = 1;

/**
 * Adds `session` to the revoked list with a revision-checked write, re-reading the list when
 * another write (a concurrent sign-out, a settings save) commits between the read and the write,
 * so no revocation is overwritten. Throws when the revocation cannot be saved.
 */
async function persistRevokedSession(session: RevokedSession): Promise<void> {
  for (let attempt = 1; ; attempt += 1) {
    const expectedRevision = await logoutRouteInternals.getSettingsRevision();
    const settings = (await logoutRouteInternals.getSettings()) as Record<string, unknown>;
    try {
      await logoutRouteInternals.updateSettings(
        {
          [REVOKED_SESSIONS_SETTING]: addRevokedSession(
            settings[REVOKED_SESSIONS_SETTING],
            session,
            Math.floor(Date.now() / 1000)
          ),
        },
        { expectedRevision }
      );
      return;
    } catch (error) {
      if (!(error instanceof SettingsRevisionConflictError) || attempt >= MAX_REVOCATION_ATTEMPTS) {
        throw error;
      }
    }
  }
}

export async function POST(request) {
  const auditContext = getAuditRequestContext(request);
  const cookieStore = await logoutRouteInternals.getCookieStore();

  // Clearing the cookie only ends the session in this browser. A copy of the token would stay
  // valid for the rest of its 30 days, so the session id is also revoked on the server, and the
  // sign-out only succeeds once that revocation is saved.
  // A cookie that cannot be read is not a session: it is cleared and nothing is revoked.
  let payload: Awaited<ReturnType<typeof verifyDashboardSessionToken>> = null;
  try {
    payload = await verifyDashboardSessionToken(cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value);
  } catch {
    payload = null;
  }
  if (payload && typeof payload.jti === "string" && typeof payload.exp === "number") {
    try {
      await persistRevokedSession({ jti: payload.jti, exp: payload.exp });
    } catch (error) {
      // Fail closed: keep the cookie and report a retryable error instead of a sign-out that
      // would leave copies of the token valid.
      console.error(
        "[auth] Failed to revoke the signed-out session:",
        error instanceof Error ? error.name : typeof error
      );
      logAuditEvent({
        action: "auth.logout.failed",
        actor: "admin",
        target: "dashboard-auth",
        resourceType: "auth_session",
        status: "failed",
        ipAddress: auditContext.ipAddress || undefined,
        requestId: auditContext.requestId,
        metadata: { reason: "revocation_not_persisted" },
      });
      return NextResponse.json(
        buildErrorBody(503, "Sign-out could not be completed. Please try again."),
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store",
            "Retry-After": String(LOGOUT_RETRY_AFTER_SECONDS),
          },
        }
      );
    }
  }

  cookieStore.delete("auth_token");
  logAuditEvent({
    action: "auth.logout.success",
    actor: "admin",
    target: "dashboard-auth",
    resourceType: "auth_session",
    status: "success",
    ipAddress: auditContext.ipAddress || undefined,
    requestId: auditContext.requestId,
  });
  return NextResponse.json({ success: true });
}
