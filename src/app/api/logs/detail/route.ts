/**
 * GET  /api/logs/detail  — List legacy detailed request logs + current enabled flag
 * POST /api/logs/detail — Enable/disable pipeline capture for unified call log artifacts
 */
import { NextRequest, NextResponse } from "next/server";
import { parseIntegerQueryParam } from "@/lib/api/queryIntegerParam";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  getRequestDetailLogs,
  getRequestDetailLogCount,
  isDetailedLoggingEnabled,
} from "@/lib/db/detailedLogs";
import { getUserDatabaseSettings, updateDatabaseSettings } from "@/lib/db/databaseSettings";
import { updateSettings } from "@/lib/db/settings";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  const url = new URL(req.url);
  const parsedLimit = parseIntegerQueryParam(url.searchParams, "limit", 50);
  if (parsedLimit.ok === false) return parsedLimit.response;
  const parsedOffset = parseIntegerQueryParam(url.searchParams, "offset", 0);
  if (parsedOffset.ok === false) return parsedOffset.response;
  const limit = Math.min(parsedLimit.value, 200);
  const offset = parsedOffset.value;

  const logs = getRequestDetailLogs(limit, offset);
  const total = getRequestDetailLogCount();
  const enabled = await isDetailedLoggingEnabled();

  return NextResponse.json({ enabled, total, logs });
}

export async function POST(req: NextRequest) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Request body must be a JSON object" }, { status: 400 });
  }
  const { enabled: rawEnabled } = body as { enabled?: unknown };
  const enabled = rawEnabled === true || rawEnabled === "1";

  await updateSettings({ call_log_pipeline_enabled: enabled });
  const databaseSettings = getUserDatabaseSettings();
  updateDatabaseSettings({
    logs: {
      ...databaseSettings.logs,
      detailedLogsEnabled: enabled,
      callLogPipelineEnabled: enabled,
    },
  });

  return NextResponse.json({
    success: true,
    enabled,
    message: enabled
      ? "Pipeline capture enabled. New request artifacts will include per-stage payloads."
      : "Pipeline capture disabled.",
  });
}
