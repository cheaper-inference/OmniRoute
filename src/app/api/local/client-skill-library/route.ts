import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  changeClientSkillLibrary,
  clientSkillLibraryChange,
  getClientSkillLibrary,
} from "@/lib/cli-helper/clientSkillLibrary";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";

export const runtime = "nodejs";

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function authorize(request: Request) {
  if (!isLocalRequestAllowed().allowed)
    return json({ error: "Local skill library unavailable" }, 403);
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
  try {
    return json(getClientSkillLibrary());
  } catch {
    return json({ error: "Could not read the local skill library" }, 500);
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
  const input = clientSkillLibraryChange.safeParse(body);
  if (!input.success) return json({ error: "Invalid skill library change" }, 400);
  try {
    const result = changeClientSkillLibrary(input.data);
    const { ipAddress, requestId } = getAuditRequestContext(request);
    logAuditEvent({
      action: `client.skill.${input.data.action}`,
      target: input.data.client ?? "skill-library",
      resourceType: "client_skill",
      ipAddress,
      requestId,
      status: result.results.every(({ ok }) => ok) ? "success" : "failure",
    });
    return json(result);
  } catch {
    return json({ error: "Could not verify the skill library change" }, 500);
  }
}
