import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getComboUsageSummary } from "@/lib/db/comboUsageSummary";
import { getRangeStartIso } from "@/lib/usage/analyticsRange";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const querySchema = z
  .object({
    range: z.enum(["1d", "7d", "30d", "90d", "ytd", "all", "custom"]).default("1d"),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.range !== "custom") return;
    if (!value.startDate || !value.endDate) {
      ctx.addIssue({
        code: "custom",
        message: "startDate and endDate are required for a custom range",
      });
    } else if (Date.parse(value.startDate) > Date.parse(value.endDate)) {
      ctx.addIssue({ code: "custom", message: "startDate must not be after endDate" });
    }
  });

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
    if (!parsed.success) {
      return NextResponse.json(
        buildErrorBody(400, parsed.error.issues[0]?.message || "Invalid query parameters"),
        { status: 400 }
      );
    }

    const { range, startDate, endDate } = parsed.data;
    const since =
      range === "custom"
        ? new Date(startDate as string).toISOString()
        : (getRangeStartIso(range) ?? new Date(0).toISOString());
    const until = range === "custom" ? new Date(endDate as string).toISOString() : undefined;
    return NextResponse.json({ range, combos: getComboUsageSummary(since, until) });
  } catch (error) {
    console.error("[API] GET /api/usage/by-combo error:", error);
    return NextResponse.json(buildErrorBody(500, "Failed to build combo usage summary"), {
      status: 500,
    });
  }
}
