import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getDashboardMfaStatus } from "@/server/auth/dashboardMfa";
import { NO_STORE_HEADERS, mfaErrorResponse } from "@/server/auth/mfaRouteSupport";

export const dynamic = "force-dynamic";

/** GET /api/auth/mfa/status — whether two-factor login is on and how many recovery codes are left. */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json(getDashboardMfaStatus(), { headers: NO_STORE_HEADERS });
  } catch (error) {
    console.error("[AUTH] MFA status failed:", error instanceof Error ? error.name : "unknown");
    return mfaErrorResponse(500, "Internal server error");
  }
}
