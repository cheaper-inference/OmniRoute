import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getTeam } from "@/lib/db/teams";
import { getTeamUsageReport } from "@/lib/db/teamUsageAnalytics";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

type RouteParams = { params: Promise<{ id: string }> };
export const dynamic = "force-dynamic";

function parseIso(value: string | null, field: string): string | null {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return field === "endDate" ? `${value}T23:59:59.999Z` : `${value}T00:00:00.000Z`;
  }
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error(`${field} must be a valid ISO timestamp`);
  return date.toISOString();
}

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const { id } = await params;
    if (!getTeam(id))
      return NextResponse.json(buildErrorBody(404, "Team not found"), { status: 404 });
    const search = new URL(request.url).searchParams;
    const startIso = parseIso(search.get("startDate"), "startDate");
    const endIso = parseIso(search.get("endDate"), "endDate");
    if (startIso && endIso && startIso > endIso) {
      return NextResponse.json(buildErrorBody(400, "startDate must not be after endDate"), {
        status: 400,
      });
    }
    return NextResponse.json({ report: await getTeamUsageReport(id, { startIso, endIso }) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get team usage";
    const status = /valid ISO timestamp/i.test(message) ? 400 : 500;
    return NextResponse.json(buildErrorBody(status, message), { status });
  }
}
