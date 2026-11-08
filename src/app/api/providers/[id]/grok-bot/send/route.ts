import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { grokBotSendSchema } from "@/shared/validation/grokBotSchemas";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { grokBotToken } from "../tokenSource";
import { grokBotSendReply } from "@omniroute/open-sse/utils/grokBotOutcomes";
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
  const parsed = grokBotSendSchema.safeParse(await request.json().catch(() => undefined));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const incoming = parsed.data;

  if (await isConnectionUnavailableToAuxiliaryActivity(id)) {
    return NextResponse.json({ error: "exclusive_lease_active" }, { status: 409 });
  }
  const token = await grokBotToken(connection);
  if ("error" in token) {
    return NextResponse.json({ error: "reauth_required" }, { status: 409 });
  }
  const accessToken = token.accessToken;

  const body = grokBotSendBody({
    agentId: incoming.agentId,
    text: incoming.text,
    messageId: incoming.messageId,
    sentAtMs: String(Date.now()),
  });
  if (!body || body.agentId === "" || body.messageId === "") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const answer = await grokBotRead({
      accessToken,
      method: "SendGrokBotUserMessage",
      payload: body,
    });
    const reply = grokBotSendReply(answer);
    if (reply.status === "submitted") return NextResponse.json({ status: reply.status });
    return NextResponse.json(
      {
        status: reply.status,
        ...(reply.failureCode ? { failureCode: reply.failureCode } : {}),
        ...(reply.message ? { message: reply.message } : {}),
      },
      { status: reply.httpStatus }
    );
  } catch {
    return NextResponse.json({ status: "unknown" }, { status: 502 });
  }
}
