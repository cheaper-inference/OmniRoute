import { NextResponse } from "next/server";
import { grokBotErrorStatus } from "@omniroute/open-sse/utils/grokBotOutcomes";
import { grokBotToken } from "./tokenSource";
import { grokBotRead } from "../../../../(dashboard)/dashboard/grok-bot/read";
import { grokBotRoster } from "../../../../(dashboard)/dashboard/grok-bot/roster";

type Connection = Parameters<typeof grokBotToken>[0];

export type GrokBotAgentAccess =
  | { accessToken: string }
  | { error: "reauth_required" | "agent_not_found" | "upstream_unavailable" };

type AccessDeps = {
  token?: typeof grokBotToken;
  read?: typeof grokBotRead;
};

export async function grokBotAgentAccess(
  connection: Connection,
  agentId: string,
  deps: AccessDeps = {}
): Promise<GrokBotAgentAccess> {
  const token = await (deps.token ?? grokBotToken)(connection);
  if ("error" in token) return token;
  if (agentId === "") return { error: "agent_not_found" };
  try {
    const response = await (deps.read ?? grokBotRead)({
      accessToken: token.accessToken,
      method: "ListGrokBotAgents",
      payload: {},
    });
    if (!grokBotRoster(response).some((agent) => agent.agentId === agentId)) {
      return { error: "agent_not_found" };
    }
    return { accessToken: token.accessToken };
  } catch (error) {
    if (grokBotErrorStatus(error) === 401) return { error: "reauth_required" };
    return { error: "upstream_unavailable" };
  }
}

export function grokBotAccessError(access: GrokBotAgentAccess): NextResponse | null {
  if ("accessToken" in access) return null;
  const status =
    access.error === "agent_not_found" ? 404 : access.error === "reauth_required" ? 409 : 502;
  return NextResponse.json({ error: access.error }, { status });
}
