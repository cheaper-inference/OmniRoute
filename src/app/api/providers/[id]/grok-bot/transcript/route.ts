import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { grokBotToken } from "../tokenSource";
import { watchStream } from "../../../../../(dashboard)/dashboard/grok-bot/watchStream";
import {
  watchCounter,
  watchRefusal,
  watchSlot,
} from "../../../../../(dashboard)/dashboard/grok-bot/overlap";
import { NextResponse } from "next/server";

// Advisory: this counter lives in one process, so the cap holds for the
// standalone server and resets on a dev reload.
const watches = watchCounter();

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

  const release = watchSlot(watches, id);
  const refusal = watchRefusal(release !== null);
  if (refusal) {
    return NextResponse.json({ error: refusal.code }, { status: refusal.status });
  }

  const url = new URL(request.url);
  const stream = watchStream({
    accessToken: token.accessToken,
    agentId: url.searchParams.get("agentId") ?? "",
    after: url.searchParams.get("after") ?? "0",
    signal: request.signal,
    release: release ?? (() => {}),
  });

  return new Response(stream, {
    headers: { "content-type": "text/event-stream", "cache-control": "no-cache" },
  });
}
