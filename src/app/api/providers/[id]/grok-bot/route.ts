import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { grokBotToken } from "./tokenSource";
import { grokBotRead } from "../../../../(dashboard)/dashboard/grok-bot/read";
import { grokBotReadQuery } from "../../../../(dashboard)/dashboard/grok-bot/query";
import { grokBotRoster } from "../../../../(dashboard)/dashboard/grok-bot/roster";
import { grokBotComputers } from "../../../../(dashboard)/dashboard/grok-bot/computers";
import { grokBotRoutines, grokBotSkills } from "../../../../(dashboard)/dashboard/grok-bot/details";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const connection = await getProviderConnectionById(id);
  if (!connection || connection.provider !== "grok-bot") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const token = await grokBotToken(connection);
  if ("error" in token) {
    return NextResponse.json({ error: "reauth_required" }, { status: 409 });
  }
  const accessToken = token.accessToken;

  const agentId = new URL(request.url).searchParams.get("agentId") ?? undefined;
  const plan = grokBotReadQuery({ agentId });
  try {
    const first = await grokBotRead({ accessToken, method: plan.method, payload: plan.payload });
    if (!plan.follow) {
      const computers = grokBotRead({
        accessToken,
        method: "ListGrokBotUserComputers",
        payload: {},
      }).catch(() => null);
      return NextResponse.json({
        roster: grokBotRoster(first),
        computers: grokBotComputers(await computers),
        connectionUpdatedAt: connection.updatedAt ?? "",
      });
    }
    const second = await grokBotRead({
      accessToken,
      method: plan.follow.method,
      payload: plan.follow.payload,
    });
    return NextResponse.json({
      skills: grokBotSkills(first),
      routines: grokBotRoutines(second),
    });
  } catch (error) {
    const status = (error as { status?: number }).status;
    if (status === 401) {
      return NextResponse.json({ error: "reauth_required" }, { status: 409 });
    }
    return NextResponse.json({ error: "upstream_unavailable" }, { status: 502 });
  }
}
