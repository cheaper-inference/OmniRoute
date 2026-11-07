import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { grokBotConnectorSchema } from "@/shared/validation/grokBotSchemas";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById } from "@/lib/db/providers";
import { grokBotToken } from "../tokenSource";
import { grokBotRead } from "../../../../../(dashboard)/dashboard/grok-bot/read";
import { connectorGrant } from "../../../../../(dashboard)/dashboard/grok-bot/cards";
import { permissionFailure } from "../../../../../(dashboard)/dashboard/grok-bot/permission";

function dispatchResponse(answer: unknown) {
  const dispatched = !!answer && typeof answer === "object" && Object.keys(answer).length > 0;
  return NextResponse.json(
    { status: dispatched ? "dispatched" : "unknown" },
    {
      status: dispatched ? 200 : 502,
    }
  );
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const connection = await getProviderConnectionById(id);
  if (!connection || connection.provider !== "grok-bot") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const parsed = grokBotConnectorSchema.safeParse(await request.json().catch(() => undefined));
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

  const payload = connectorGrant({
    agentId: incoming.agentId,
    entryId: incoming.entryId,
    requestId: incoming.requestId,
    resolution: incoming.resolution,
  });
  if (!payload) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const answer = await grokBotRead({
      accessToken: token.accessToken,
      method: "ResolveGrokBotConnectorGrant",
      payload,
    });
    return dispatchResponse(answer);
  } catch (error) {
    const failure = permissionFailure((error as { status?: number }).status);
    return NextResponse.json(failure.code === "gone" ? { error: "gone" } : { status: "unknown" }, {
      status: failure.status,
    });
  }
}
