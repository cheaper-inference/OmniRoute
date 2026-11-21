import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listAgentSessionReportRows } from "@/lib/usage/agentSessionReports";

import { searchParamsObject, sessionsQuerySchema } from "../_lib";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = sessionsQuerySchema.safeParse(searchParamsObject(request));
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid query parameters",
      details: parsed.error.issues,
    });
  }

  const { sort, order, limit, offset, ...filter } = parsed.data;
  try {
    return Response.json(await listAgentSessionReportRows(filter, { sort, order, limit, offset }));
  } catch (error) {
    console.error("[reports] session list failed:", error);
    return createErrorResponse({ status: 500, message: "Failed to list sessions" });
  }
}
