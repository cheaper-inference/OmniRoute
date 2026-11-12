import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getAgentSessionById } from "@/lib/db/agentSessions";
import { getDbInstance } from "@/lib/db/core";
import { getAgentSessionReportDetail } from "@/lib/usage/agentSessionReports";

import { searchParamsObject, sessionDetailQuerySchema } from "../../_lib";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = sessionDetailQuerySchema.safeParse(searchParamsObject(request));
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid query parameters",
      details: parsed.error.issues,
    });
  }

  const { id } = await context.params;
  try {
    const db = getDbInstance();
    const session = getAgentSessionById(db, id);
    if (!session) return createErrorResponse({ status: 404, message: "Session not found" });
    // totals: all-time, priced at read time like the list rows; session keeps the stored counters.
    // recentRequests: one page (limit/offset) of all the session's requests, newest first.
    return Response.json({ session, ...(await getAgentSessionReportDetail(id, parsed.data, db)) });
  } catch (error) {
    console.error("[reports] session detail failed:", error);
    return createErrorResponse({ status: 500, message: "Failed to load session" });
  }
}
