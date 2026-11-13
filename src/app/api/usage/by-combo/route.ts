import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getComboUsageSummary } from "@/lib/db/comboUsageSummary";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const querySchema = z.object({
  range: z.enum(["1d", "7d", "30d", "90d", "ytd", "all", "custom"]).default("1d"),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

function getRangeStartIso(range: string): string {
  const start = new Date();
  switch (range) {
    case "ytd":
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      return start.toISOString();
    case "all":
      return new Date(0).toISOString();
    default:
      start.setDate(start.getDate() - (parseInt(range, 10) || 1));
      return start.toISOString();
  }
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      range: searchParams.get("range") || undefined,
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
    });
    if (!parsed.success || (parsed.data.range === "custom" && !parsed.data.startDate)) {
      return NextResponse.json(
        buildErrorBody(
          400,
          (!parsed.success && parsed.error.issues[0]?.message) || "Invalid query parameters"
        ),
        { status: 400 }
      );
    }

    const { range, startDate, endDate } = parsed.data;
    const since = range === "custom" ? (startDate as string) : getRangeStartIso(range);
    return NextResponse.json({
      range,
      combos: getComboUsageSummary(since, range === "custom" ? endDate : undefined),
    });
  } catch (error) {
    console.error("[API] GET /api/usage/by-combo error:", error);
    return NextResponse.json(buildErrorBody(500, "Failed to build combo usage summary"), {
      status: 500,
    });
  }
}
