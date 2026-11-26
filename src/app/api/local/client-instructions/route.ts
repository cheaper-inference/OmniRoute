import {
  ClientInstructionsError,
  clientInstructionsId,
  clientInstructionsUpdate,
  getClientInstructions,
  MAX_CLIENT_INSTRUCTIONS_BYTES,
  updateClientInstructions,
} from "@/lib/cli-helper/clientInstructions";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const runtime = "nodejs";

const headers = { "Cache-Control": "no-store" };
const MAX_BODY_BYTES = MAX_CLIENT_INSTRUCTIONS_BYTES * 6 + 512;

function errorResponse(status: number, message: string) {
  return Response.json({ error: sanitizeErrorMessage(message) }, { status, headers });
}

async function authorize(request: Request) {
  const guard = isLocalRequestAllowed();
  if (guard.allowed === false) return errorResponse(403, guard.reason);

  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  const url = new URL(request.url);
  const host = request.headers.get("host") ?? url.host;
  if ((origin && origin !== `${url.protocol}//${host}`) || (site && site !== "same-origin")) {
    return errorResponse(403, "Client instructions require a same-origin request.");
  }
  return requireCliToolsAuth(request, { alwaysRequireAuth: true });
}

async function readJson(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  if (contentType !== "application/json" || !request.body) {
    throw new ClientInstructionsError(415, "Send client instructions as JSON.");
  }
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        throw new ClientInstructionsError(
          413,
          "Client instructions request exceeds the size limit."
        );
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } catch (error) {
    if (error instanceof ClientInstructionsError) throw error;
    throw new ClientInstructionsError(400, "Invalid client instructions JSON.");
  } finally {
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

function handleError(error: unknown) {
  if (error instanceof ClientInstructionsError) {
    return errorResponse(error.status, error.message);
  }
  return errorResponse(500, "Unable to access the client instructions file or its backup.");
}

export async function GET(request: Request) {
  const blocked = await authorize(request);
  if (blocked) return blocked;
  const params = new URL(request.url).searchParams;
  const client = clientInstructionsId.safeParse(params.get("client"));
  if (!client.success || params.size !== 1)
    return errorResponse(400, "Unknown instructions client.");

  try {
    return Response.json(getClientInstructions(client.data), { headers });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  const blocked = await authorize(request);
  if (blocked) return blocked;
  const writeGuard = ensureCliConfigWriteAllowed();
  if (writeGuard) return errorResponse(403, writeGuard);

  try {
    const parsed = clientInstructionsUpdate.safeParse(await readJson(request));
    if (!parsed.success) return errorResponse(400, "Invalid client instructions request.");

    const result = updateClientInstructions(parsed.data);
    const context = getAuditRequestContext(request);
    logAuditEvent({
      action: `client.instructions.${parsed.data.action}`,
      target: parsed.data.client,
      resourceType: "client_instructions",
      status: "success",
      requestId: context.requestId,
      ipAddress: context.ipAddress || undefined,
    });
    return Response.json(result, { headers });
  } catch (error) {
    return handleError(error);
  }
}
