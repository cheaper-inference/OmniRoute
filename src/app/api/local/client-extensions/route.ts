import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  clientPluginChange,
  clientSkillInstall,
  getClientExtensions,
  getClientPluginWriteTarget,
  getClientSkillDestination,
  installClientSkill,
  updateClientPlugin,
} from "@/lib/cli-helper/clientExtensions";
import { clientInstructionsId } from "@/lib/cli-helper/clientInstructions";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";

export const runtime = "nodejs";

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function authorize(request: Request) {
  if (!isLocalRequestAllowed().allowed)
    return json({ error: "Local client extensions are unavailable" }, 403);
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  const host = request.headers.get("host") ?? url.host;
  if ((origin && origin !== `${url.protocol}//${host}`) || (site && site !== "same-origin")) {
    return json({ error: "Same-origin requests required" }, 403);
  }
  return requireCliToolsAuth(request, { alwaysRequireAuth: true });
}

export async function GET(request: Request) {
  const blocked = await authorize(request);
  if (blocked) return blocked;
  const client = clientInstructionsId.safeParse(new URL(request.url).searchParams.get("client"));
  if (!client.success) return json({ error: "Unsupported client" }, 400);
  try {
    return json(await getClientExtensions(client.data));
  } catch {
    return json({ error: "Could not read client extensions" }, 500);
  }
}

export async function PATCH(request: Request) {
  const blocked = await authorize(request);
  if (blocked) return blocked;
  const writeGuard = ensureCliConfigWriteAllowed();
  if (writeGuard) return json({ error: writeGuard }, 403);
  if (
    request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json"
  ) {
    return json({ error: "Expected an application/json body" }, 415);
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Malformed JSON body" }, 400);
  }
  const input = clientPluginChange.safeParse(body);
  if (!input.success) return json({ error: "Invalid plugin change" }, 400);
  try {
    const targetGuard = ensureCliConfigWriteAllowed(getClientPluginWriteTarget(input.data.client));
    if (targetGuard) return json({ error: targetGuard }, 403);
    const result = await updateClientPlugin(input.data);
    if (!result) return json({ error: "Plugin cannot be changed here" }, 422);
    const { ipAddress, requestId } = getAuditRequestContext(request);
    logAuditEvent({
      action: "client.plugin.toggle",
      target: input.data.client,
      resourceType: "client_plugin",
      ipAddress,
      requestId,
      status: "success",
    });
    return json(result);
  } catch {
    return json({ error: "Could not verify the client plugin change" }, 500);
  }
}

export async function POST(request: Request) {
  const blocked = await authorize(request);
  if (blocked) return blocked;
  const writeGuard = ensureCliConfigWriteAllowed();
  if (writeGuard) return json({ error: writeGuard }, 403);
  if (
    request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json"
  ) {
    return json({ error: "Expected an application/json body" }, 415);
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Malformed JSON body" }, 400);
  }
  const input = clientSkillInstall.safeParse(body);
  if (!input.success) return json({ error: "Invalid skill selection" }, 400);
  try {
    const targetGuard = ensureCliConfigWriteAllowed(getClientSkillDestination(input.data.client));
    if (targetGuard) return json({ error: targetGuard }, 403);
    const result = await installClientSkill(input.data);
    const { ipAddress, requestId } = getAuditRequestContext(request);
    logAuditEvent({
      action: "client.skill.install",
      target: input.data.client,
      resourceType: "client_skill",
      ipAddress,
      requestId,
      status: "success",
    });
    return json(result);
  } catch {
    return json(
      {
        error:
          "Could not copy the shared skill. Check for an existing installation or linked files",
      },
      422
    );
  }
}
