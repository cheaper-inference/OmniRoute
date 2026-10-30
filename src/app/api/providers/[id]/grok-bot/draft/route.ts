import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { grokBotToken } from "../tokenSource";
import { grokBotRead } from "../../../../../(dashboard)/dashboard/grok-bot/read";
import { draftDiscard, cardAccepted } from "../../../../../(dashboard)/dashboard/grok-bot/cards";
import { permissionFailure } from "../../../../../(dashboard)/dashboard/grok-bot/permission";

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

  let incoming: Record<string, unknown> = {};
  try {
    incoming = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const payload = draftDiscard({
    agentId: typeof incoming.agentId === "string" ? incoming.agentId : "",
    entryId: typeof incoming.entryId === "string" ? incoming.entryId : "",
  });
  if (!payload) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const answer = await grokBotRead({
      accessToken: token.accessToken,
      method: "DiscardGrokBotDraft",
      payload,
    });
    const accepted = cardAccepted(answer);
    return NextResponse.json(
      { status: accepted ? "submitted" : "unknown" },
      { status: accepted ? 200 : 502 }
    );
  } catch (error) {
    const failure = permissionFailure((error as { status?: number }).status);
    return NextResponse.json(
      failure.code === "gone" ? { error: "gone" } : { status: "unknown" },
      { status: failure.status }
    );
  }
}
