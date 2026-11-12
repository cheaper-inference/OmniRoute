import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildReportHeatmap } from "@/lib/usage/agentSessionReportViews";

import { reportFilterSchema, searchParamsObject } from "../_lib";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = reportFilterSchema.safeParse(searchParamsObject(request));
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid query parameters",
      details: parsed.error.issues,
    });
  }

  try {
    return Response.json(await buildReportHeatmap(parsed.data));
  } catch (error) {
    console.error("[reports] heatmap failed:", error);
    return createErrorResponse({ status: 500, message: "Failed to build report heatmap" });
  }
}
