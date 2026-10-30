import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { grokBotToken } from "../tokenSource";
import { grokBotRead } from "../../../../../(dashboard)/dashboard/grok-bot/read";
import { grokBotSendBody } from "../../../../../(dashboard)/dashboard/grok-bot/send";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

  let incoming: { agentId?: unknown; text?: unknown; messageId?: unknown } = {};
  try {
    incoming = (await request.json()) as { agentId?: unknown; text?: unknown; messageId?: unknown };
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const body = grokBotSendBody({
    agentId: typeof incoming.agentId === "string" ? incoming.agentId : "",
    text: typeof incoming.text === "string" ? incoming.text : "",
    messageId: typeof incoming.messageId === "string" ? incoming.messageId : "",
    sentAtMs: String(Date.now()),
  });
  if (!body || body.agentId === "" || body.messageId === "") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    await grokBotRead({ accessToken, method: "SendGrokBotUserMessage", payload: body });
    return NextResponse.json({ status: "submitted" });
  } catch {
    return NextResponse.json({ status: "unknown" }, { status: 502 });
  }
}
