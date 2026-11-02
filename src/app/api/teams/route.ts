import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createTeam, listTeams, listTeamKeyOptions } from "@/lib/db/teams";
import { TeamCreateSchema } from "@/shared/validation/schemas";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const includeArchived = new URL(request.url).searchParams.get("includeArchived") === "true";
    const includeKeyOptions = new URL(request.url).searchParams.get("includeKeyOptions") === "true";
    return NextResponse.json({
      teams: listTeams({ includeArchived }),
      ...(includeKeyOptions ? { keyOptions: listTeamKeyOptions() } : {}),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list teams";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const parsed = TeamCreateSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }
    const team = createTeam(parsed.data);
    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "team.create",
      target: team.id,
      resourceType: "team",
      details: { name: team.name, budgetDuration: team.budgetDuration },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });
    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create team";
    const status = /unique constraint|already exists/i.test(message) ? 409 : 500;
    return NextResponse.json(buildErrorBody(status, message), { status });
  }
}
