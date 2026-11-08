import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  assignApiKeyBillingTeam,
  getTeam,
  listTeamMembers,
  unassignApiKeyBillingTeam,
} from "@/lib/db/teams";
import { TeamMemberAssignmentSchema } from "@/shared/validation/schemas";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";

type RouteParams = { params: Promise<{ id: string }> };
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const { id } = await params;
    if (!getTeam(id))
      return NextResponse.json(buildErrorBody(404, "Team not found"), { status: 404 });
    return NextResponse.json({ members: listTeamMembers(id) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list team members";
    return NextResponse.json(buildErrorBody(500, message), { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams): Promise<Response> {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  try {
    const { id } = await params;
    const team = getTeam(id);
    if (!team) return NextResponse.json(buildErrorBody(404, "Team not found"), { status: 404 });
    if (team.status === "archived") {
      return NextResponse.json(buildErrorBody(409, "Archived teams cannot accept API keys"), {
        status: 409,
      });
    }
    const parsed = TeamMemberAssignmentSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }
    const assignment = assignApiKeyBillingTeam(
      parsed.data.apiKeyId,
      id,
      undefined,
      parsed.data.expectedTeamId
    );
    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "team.key.assign",
      target: id,
      resourceType: "team",
      details: { apiKeyId: assignment.apiKeyId },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });
    return NextResponse.json({ assignment });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to assign API key";
    const status = /not found/i.test(message)
      ? 404
      : /assignment time|changed concurrently/i.test(message)
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
    if (!getTeam(id))
      return NextResponse.json(buildErrorBody(404, "Team not found"), { status: 404 });
    const apiKeyId = new URL(request.url).searchParams.get("apiKeyId");
    const parsed = TeamMemberAssignmentSchema.safeParse({ apiKeyId });
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, parsed.error.message), { status: 400 });
    }
    const removed = unassignApiKeyBillingTeam(parsed.data.apiKeyId, undefined, id);
    if (!removed) {
      return NextResponse.json(buildErrorBody(404, "Active team assignment not found"), {
        status: 404,
      });
    }
    const ctx = getAuditRequestContext(request);
    logAuditEvent({
      action: "team.key.unassign",
      target: id,
      resourceType: "team",
      details: { apiKeyId: parsed.data.apiKeyId },
      ipAddress: ctx.ipAddress ?? undefined,
      requestId: ctx.requestId,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to unassign API key";
    const status = /assignment time|changed concurrently/i.test(message) ? 409 : 500;
    return NextResponse.json(buildErrorBody(status, message), { status });
  }
}
