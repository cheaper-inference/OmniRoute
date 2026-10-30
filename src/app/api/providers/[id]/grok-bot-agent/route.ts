import { NextResponse } from "next/server";
import { getCachedProviderConnectionById } from "@/lib/db/readCache";
import { updateProviderConnection } from "@/lib/db/providers";
import {
  manageGrokBotAgent,
  runGrokBotAgentAction,
  withGrokBotAgentLock,
} from "@/lib/grokBotAgentAdmin";
import { grokBotAgentRpc } from "@/sse/services/grokBotAgentRpc";

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
  const token = typeof connection.accessToken === "string" ? connection.accessToken : "";
  if (!token) return NextResponse.json({ error: "missing access token" }, { status: 422 });
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
          rpc: grokBotAgentRpc(token),
          save: async (providerSpecificData) => {
            await updateProviderConnection(id, { providerSpecificData });
          },
        }),
    });
  try {
    const result = action === "get" ? await runAction() : await withGrokBotAgentLock(id, runAction);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
  const body = (await request.json().catch(() => ({}))) as {
    action?: string;
    profile?: unknown;
    skill?: unknown;
    routine?: unknown;
  };
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
  return postRoute(request, context);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mode = new URL(request.url).searchParams.get("mode");
  return run(id, mode === "delete" ? "delete" : "unbind");
}
