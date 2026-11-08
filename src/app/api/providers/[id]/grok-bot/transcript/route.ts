import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
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

/**
 * The generation is opaque to this route but the upstream rejects anything that is
 * not a non-negative safe integer, so an unusable value is treated as absent rather
 * than forwarded. watchStream decides what a missing generation means.
 */
function generationFrom(value: string | null): number | undefined {
  if (value === null || !/^(?:0|[1-9][0-9]*)$/.test(value)) return undefined;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const connection = await getProviderConnectionById(id);
  if (!connection || connection.provider !== "grok-bot") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (await isConnectionUnavailableToAuxiliaryActivity(id)) {
    return NextResponse.json({ error: "exclusive_lease_active" }, { status: 409 });
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
    generation: generationFrom(url.searchParams.get("generation")),
    signal: request.signal,
    release: release ?? (() => {}),
  });

  return new Response(stream, {
    headers: { "content-type": "text/event-stream", "cache-control": "no-cache" },
  });
}
