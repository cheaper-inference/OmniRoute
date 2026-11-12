import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildReportTrends, ReportWindowTooLongError } from "@/lib/usage/agentSessionReportViews";

import { searchParamsObject, trendsQuerySchema } from "../_lib";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = trendsQuerySchema.safeParse(searchParamsObject(request));
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid query parameters",
      details: parsed.error.issues,
    });
  }

  const { dimension, metric, ...filter } = parsed.data;
  try {
    return Response.json(await buildReportTrends(filter, { dimension, metric }));
  } catch (error) {
    if (error instanceof ReportWindowTooLongError) {
      return createErrorResponse({ status: 400, message: "Time window too long for trends" });
    }
    console.error("[reports] trends failed:", error);
    return createErrorResponse({ status: 500, message: "Failed to build report trends" });
  }
}
