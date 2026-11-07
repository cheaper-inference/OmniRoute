import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { revokeDashboardSession } from "@/lib/db/dashboardSessions";
import {
  DASHBOARD_SESSION_COOKIE,
  readSignedDashboardSessionToken,
} from "@/shared/utils/dashboardSessionToken";
import { cookies } from "next/headers";

export const logoutRouteInternals = {
  getCookieStore: cookies,
  revokeSession: revokeDashboardSession,
};

export async function POST(request) {
  const auditContext = getAuditRequestContext(request);
  const cookieStore = await logoutRouteInternals.getCookieStore();

  // Clearing the cookie only ends the session in this browser. A copy of the token would stay
  // valid for the rest of its 30 days, so the session id is also revoked on the server.
  try {
    const token = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;
    const payload = await readSignedDashboardSessionToken(token);
    if (payload && token) {
      logoutRouteInternals.revokeSession(payload, token);
    }
  } catch (error) {
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
      { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "1" } }
    );
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
