import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { grokBotAgentSchema } from "@/shared/validation/grokBotSchemas";
import { NextResponse } from "next/server";
import { getCachedProviderConnectionById } from "@/lib/db/readCache";
import { updateProviderConnection } from "@/lib/db/providers";
import {
  manageGrokBotAgent,
  runGrokBotAgentAction,
  withGrokBotAgentLock,
} from "@/lib/grokBotAgentAdmin";
import { grokBotAgentRpc } from "@/sse/services/grokBotAgentRpc";
import { grokBotToken } from "../grok-bot/tokenSource";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export function postAction(body: { action?: string }) {
  const action = body.action ?? "";
  if (
    action === "create" ||
    action === "recreate" ||
    action === "put-memory" ||
    action === "add-skill" ||
    action === "update-skill" ||
    action === "remove-skill" ||
    action === "set-routine" ||
    action === "remove-routine"
  ) {
    return action;
  }
  return "create";
}

export function postPayload(body: { profile?: unknown; skill?: unknown; routine?: unknown }) {
  return { profile: body.profile, skill: body.skill, routine: body.routine };
}

async function run(
  id: string,
  action:
    | "get"
    | "create"
    | "recreate"
    | "unbind"
    | "delete"
    | "put-memory"
    | "add-skill"
    | "update-skill"
    | "remove-skill"
    | "set-routine"
    | "remove-routine",
  profile?: { name?: unknown; description?: unknown } | unknown,
  skill?: unknown,
  routine?: unknown,
  manage = manageGrokBotAgent,
  load = getCachedProviderConnectionById
) {
  const loaded = await load(id);
  if (!loaded) return NextResponse.json({ error: "Connection not found" }, { status: 404 });
  if (loaded instanceof NextResponse) return loaded;
  if (loaded.provider !== "grok-bot") {
    return NextResponse.json({ error: "Connection is not grok-bot" }, { status: 422 });
  }
  const connection = loaded;
  // Refresh first, as every sibling Grok Bot route does: an expired token would
  // otherwise reach the RPC and come back as a generic failure instead of a
  // re-auth prompt. The refresh itself can fail on the network, so it is caught
  // here rather than escaping as an unhandled route error.
  let accessToken: string;
  try {
    const token = await grokBotToken(connection);
    if (!token || "error" in token) {
      return NextResponse.json({ error: "reauth_required" }, { status: 409 });
    }
    accessToken = token.accessToken;
  } catch (error) {
    const raw = error instanceof Error ? error.message : "Token refresh failed";
    return NextResponse.json(
      { error: sanitizeErrorMessage(raw) || "Token refresh failed" },
      { status: 400 }
    );
  }
  const runAction = () =>
    runGrokBotAgentAction({
      action,
      profile,
      skill,
      routine,
      connection,
      manage: (value) =>
        manage({
          ...value,
          rpc: grokBotAgentRpc(accessToken),
          save: async (providerSpecificData) => {
            await updateProviderConnection(id, { providerSpecificData });
          },
        }),
    });
  try {
    const result = action === "get" ? await runAction() : await withGrokBotAgentLock(id, runAction);
    return NextResponse.json(result);
  } catch (error) {
    // An upstream RPC failure carries provider text; strip anything that looks
    // like a credential before it reaches the client.
    const raw = error instanceof Error ? error.message : "Request failed";
    const message = sanitizeErrorMessage(raw) || "Request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (await isConnectionUnavailableToAuxiliaryActivity(id)) {
    return NextResponse.json({ error: "exclusive_lease_active" }, { status: 409 });
  }
  return run(id, "get");
}

export async function postRoute(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
  deps: {
    manage?: typeof manageGrokBotAgent;
    load?: typeof getCachedProviderConnectionById;
  } = {}
) {
  const { id } = await params;
  const parsed = grokBotAgentSchema.safeParse(await request.json().catch(() => undefined));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const body = parsed.data;
  const payload = postPayload(body);
  return run(
    id,
    postAction(body) ?? "create",
    payload.profile,
    payload.skill,
    payload.routine,
    deps.manage ?? manageGrokBotAgent,
    deps.load ?? getCachedProviderConnectionById
  );
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (await isConnectionUnavailableToAuxiliaryActivity(id)) {
    return NextResponse.json({ error: "exclusive_lease_active" }, { status: 409 });
  }
  return postRoute(request, context);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (await isConnectionUnavailableToAuxiliaryActivity(id)) {
    return NextResponse.json({ error: "exclusive_lease_active" }, { status: 409 });
  }
  const mode = new URL(request.url).searchParams.get("mode");
  return run(id, mode === "delete" ? "delete" : "unbind");
}
