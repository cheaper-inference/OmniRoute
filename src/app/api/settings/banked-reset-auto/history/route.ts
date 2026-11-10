import { NextResponse } from "next/server";
import { z } from "zod";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { readBankedResetHistory } from "@/lib/usage/bankedResetAudit";

/**
 * GET /api/settings/banked-reset-auto/history?limit=50 — the most recent
 * `bankedReset.redeem` audit rows (newest first) plus the last 24 h counts, for the
 * "auto-apply banked resets" settings card. Settings themselves go through PATCH
 * /api/settings.
 */

const HistoryLimitSchema = z.coerce.number().int().min(1).max(200).default(50);

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = HistoryLimitSchema.safeParse(
    new URL(request.url).searchParams.get("limit") ?? undefined
  );
  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(400, "Invalid limit: expected an integer from 1 to 200."),
      { status: 400 }
    );
  }

  try {
    return NextResponse.json(readBankedResetHistory({ limit: parsed.data }));
  } catch (error) {
    console.error(
      "[API] /api/settings/banked-reset-auto/history error:",
      sanitizeErrorMessage(error)
    );
    return NextResponse.json(buildErrorBody(500, "Failed to load banked-reset history."), {
      status: 500,
    });
  }
}
