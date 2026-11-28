import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  getModelConfig,
  modelConfigChange,
  modelConfigClient,
  ModelConfigError,
  updateModelConfig,
} from "@/lib/cli-helper/clientModelConfig";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const runtime = "nodejs";

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function authorize(request: Request) {
  if (!isLocalRequestAllowed().allowed)
    return json({ error: "Local model configuration is unavailable" }, 403);
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  const host = request.headers.get("host") ?? url.host;
  if ((origin && origin !== `${url.protocol}//${host}`) || (site && site !== "same-origin")) {
    return json({ error: "Same-origin requests required" }, 403);
  }
  return requireCliToolsAuth(request, { alwaysRequireAuth: true });
}

function failure(error: unknown) {
  if (error instanceof ModelConfigError)
    return json({ error: sanitizeErrorMessage(error.message) }, error.status);
  return json({ error: "Could not process the native model config" }, 500);
}

export async function GET(request: Request) {
  const blocked = await authorize(request);
  if (blocked) return blocked;
  const client = modelConfigClient.safeParse(new URL(request.url).searchParams.get("client"));
  if (!client.success) return json({ error: "Unsupported client" }, 400);
  try {
    return json(getModelConfig(client.data));
  } catch (error) {
    return failure(error);
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
  const input = modelConfigChange.safeParse(body);
  if (!input.success) return json({ error: "Invalid model config change" }, 400);
  try {
    const result = updateModelConfig(input.data);
    const { ipAddress, requestId } = getAuditRequestContext(request);
    logAuditEvent({
      action: `client.models.${input.data.action}`,
      target: input.data.client,
      resourceType: "client_config",
      ipAddress,
      requestId,
      status: "success",
    });
    return json(result);
  } catch (error) {
    return failure(error);
  }
}
