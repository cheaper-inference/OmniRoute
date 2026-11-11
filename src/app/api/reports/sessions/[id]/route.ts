import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getAgentSessionById, getAgentSessionRecentUsage } from "@/lib/db/agentSessions";
import { getDbInstance } from "@/lib/db/core";
import { getAgentSessionReportTotals } from "@/lib/usage/agentSessionReports";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id } = await context.params;
  try {
    const db = getDbInstance();
    const session = getAgentSessionById(db, id);
    if (!session) return createErrorResponse({ status: 404, message: "Session not found" });
    // totals: all-time, priced at read time like the list rows; session keeps the stored counters.
    return Response.json({
      session,
      recentRequests: getAgentSessionRecentUsage(db, id, 100),
      totals: await getAgentSessionReportTotals(id, db),
    });
  } catch (error) {
    console.error("[reports] session detail failed:", error);
    return createErrorResponse({ status: 500, message: "Failed to load session" });
  }
}
