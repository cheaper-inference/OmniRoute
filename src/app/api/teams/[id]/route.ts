import { NextResponse } from "next/server";
import { getTeamUsageLimitStatusForTeam } from "@/lib/usage/teamUsageLimits";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  archiveTeam,
  getTeam,
  listTeamMembers,
  updateTeam,
  hasPartialRetainedTeamUsage,
} from "@/lib/db/teams";
import { TeamUpdateSchema } from "@/shared/validation/schemas";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";

type RouteParams = { params: Promise<{ id: string }> };
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const { id } = await params;
    const team = getTeam(id);
    if (!team) return NextResponse.json(buildErrorBody(404, "Team not found"), { status: 404 });
    const status = await getTeamUsageLimitStatusForTeam(id);
    const budgetStatus = status
      ? {
          ...status,
          hasPartialRetainedUsage: hasPartialRetainedTeamUsage(
            id,
            status.windowStartIso,
            status.resetAtIso
          ),
        }
      : null;
    return NextResponse.json({ team, members: listTeamMembers(id), budgetStatus });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get team";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const { id } = await params;
    const parsed = TeamUpdateSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }
    const team = updateTeam(id, parsed.data);
    if (!team) return NextResponse.json(buildErrorBody(404, "Team not found"), { status: 404 });
    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "team.update",
      target: team.id,
      resourceType: "team",
      details: { fields: Object.keys(parsed.data) },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });
    return NextResponse.json({ team });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update team";
    const status = /maxBudgetUsd must be greater than zero|budgetDuration must be one of/i.test(
      message
    )
      ? 400
      : /unique constraint|already exists|archived teams cannot be updated/i.test(message)
        ? 409
        : 500;
    return NextResponse.json(buildErrorBody(status, message), { status });
  }
}

export async function DELETE(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const { id } = await params;
    const team = archiveTeam(id);
    if (!team) return NextResponse.json(buildErrorBody(404, "Team not found"), { status: 404 });
    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "team.archive",
      target: team.id,
      resourceType: "team",
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });
    return NextResponse.json({ team });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to archive team";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}
