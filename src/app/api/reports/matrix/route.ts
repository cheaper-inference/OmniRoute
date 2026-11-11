import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildReportMatrix } from "@/lib/usage/agentSessionReportViews";

import { matrixQuerySchema, searchParamsObject } from "../_lib";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = matrixQuerySchema.safeParse(searchParamsObject(request));
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid query parameters",
      details: parsed.error.issues,
    });
  }

  const { rows, cols, ...filter } = parsed.data;
  try {
    return Response.json(await buildReportMatrix(filter, { rows, cols }));
  } catch (error) {
    console.error("[reports] matrix failed:", error);
    return createErrorResponse({ status: 500, message: "Failed to build report matrix" });
  }
}
