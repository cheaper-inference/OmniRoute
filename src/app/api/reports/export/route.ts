import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  buildReportExport,
  ReportExportSessionNotFoundError,
} from "@/lib/usage/agentSessionReportExport";

import { exportQuerySchema, searchParamsObject } from "../_lib";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = exportQuerySchema.safeParse(searchParamsObject(request));
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid query parameters",
      details: parsed.error.issues,
    });
  }

  const { type, format, sort, order, rows, cols, metric, sessionId, ...filter } = parsed.data;
  try {
    const file = await buildReportExport({
      type,
      format,
      filter,
      order: { sort, order },
      rows,
      cols,
      metric,
      sessionId,
    });
    return new Response(file.body, { headers: file.headers });
  } catch (error) {
    if (error instanceof ReportExportSessionNotFoundError) {
      return createErrorResponse({ status: 404, message: "Session not found" });
    }
    console.error("[reports] export failed:", error);
    return createErrorResponse({ status: 500, message: "Failed to export report" });
  }
}
