import { NextResponse } from "next/server";
import { grokBotErrorStatus, grokBotSendSettled } from "@omniroute/open-sse/utils/grokBotOutcomes";
import { grokBotAgentAccess, grokBotAccessError } from "./access";
import { grokBotActionResponse } from "./outcome";
import { grokBotRead } from "../../../../(dashboard)/dashboard/grok-bot/read";
import { permissionFailure } from "../../../../(dashboard)/dashboard/grok-bot/permission";

type Connection = Parameters<typeof grokBotAgentAccess>[0];
type Access = typeof grokBotAgentAccess;
type Read = typeof grokBotRead;

type ActionDeps = {
  access?: Access;
  read?: Read;
};

export async function grokBotSendAction(
  connection: Connection,
  body: Record<string, unknown>,
  deps: ActionDeps = {}
): Promise<NextResponse> {
  const agentId = typeof body.agentId === "string" ? body.agentId : "";
  const access = await (deps.access ?? grokBotAgentAccess)(connection, agentId);
  if ("error" in access) return grokBotAccessError(access);
  try {
    const answer = await (deps.read ?? grokBotRead)({
      accessToken: access.accessToken,
      method: "SendGrokBotUserMessage",
      payload: body,
    });
    const response = grokBotActionResponse(answer, { kind: "send", success: "submitted" });
    const settled = (await response.clone().json()) as { status?: unknown };
    if (settled.status !== "unknown") return response;
    const messageId = typeof body.messageId === "string" ? body.messageId : "";
    if (messageId === "") return response;
    const status = await (deps.read ?? grokBotRead)({
      accessToken: access.accessToken,
      method: "GetGrokBotSendStatus",
      payload: { agentId, messageId, sessionId: "" },
    });
    return grokBotSendSettled(status) ? NextResponse.json({ status: "submitted" }) : response;
  } catch {
    return NextResponse.json({ status: "unknown" }, { status: 502 });
  }
}

export async function grokBotCardAction(
  connection: Connection,
  input: {
    method: string;
    payload: Record<string, unknown> & { agentId: string };
    success: "submitted" | "dispatched";
    allowEmpty?: boolean;
  },
  deps: ActionDeps = {}
): Promise<NextResponse> {
  const access = await (deps.access ?? grokBotAgentAccess)(connection, input.payload.agentId);
  if ("error" in access) return grokBotAccessError(access);
  try {
    const answer = await (deps.read ?? grokBotRead)({
      accessToken: access.accessToken,
      method: input.method,
      payload: input.payload,
    });
    return grokBotActionResponse(answer, {
      kind: "card",
      success: input.success,
      allowEmpty: input.allowEmpty,
    });
  } catch (error) {
    const failure = permissionFailure(grokBotErrorStatus(error));
    return NextResponse.json(failure.code === "gone" ? { error: "gone" } : { status: "unknown" }, {
      status: failure.status,
    });
  }
}
