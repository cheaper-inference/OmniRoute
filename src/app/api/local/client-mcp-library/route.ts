import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { ClientMcpError } from "@/lib/cli-helper/clientMcp";
import {
  changeClientMcpLibrary,
  clientMcpLibraryRequest,
  getClientMcpLibrary,
} from "@/lib/cli-helper/clientMcpLibrary";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const runtime = "nodejs";

function json(value: unknown, status = 200) {
  return Response.json(value, { status, headers: { "Cache-Control": "no-store" } });
}

async function guard(request: Request) {
  if (!isLocalRequestAllowed().allowed)
    return json({ error: "Local MCP library is unavailable" }, 403);
  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  const url = new URL(request.url);
  const host = request.headers.get("host") ?? url.host;
  if ((origin && origin !== `${url.protocol}//${host}`) || (site && site !== "same-origin")) {
    return json({ error: "Same-origin requests required" }, 403);
  }
  return requireCliToolsAuth(request, { alwaysRequireAuth: true });
}

function failure(error: unknown) {
  if (error instanceof ClientMcpError)
    return json({ error: sanitizeErrorMessage(error.message) }, error.status);
  return json({ error: "Could not access the local MCP library" }, 500);
}

async function readBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  if (contentType !== "application/json" || !request.body) {
    throw new ClientMcpError("Expected an application/json body", 415);
  }
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let length = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) return JSON.parse(text + decoder.decode());
      length += chunk.value.byteLength;
      if (length > 20 * 1024)
        throw new ClientMcpError("MCP library request exceeds the size limit", 413);
      text += decoder.decode(chunk.value, { stream: true });
    }
  } catch (error) {
    if (error instanceof ClientMcpError) throw error;
    throw new ClientMcpError("Malformed JSON body", 400);
  } finally {
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export async function GET(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    return json(getClientMcpLibrary());
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: Request) {
  const denied = await guard(request);
  if (denied) return denied;
  const writeGuard = ensureCliConfigWriteAllowed();
  if (writeGuard) return json({ error: writeGuard }, 403);
  try {
    const input = clientMcpLibraryRequest.safeParse(await readBody(request));
    if (!input.success) return json({ error: "Invalid MCP library action" }, 400);
    const result = changeClientMcpLibrary(input.data);
    const { ipAddress, requestId } = getAuditRequestContext(request);
    logAuditEvent({
      action: `cli.mcp_library.${input.data.action}`,
      target: input.data.client ?? "library",
      resourceType: "cli_config",
      status: result.results.every((entry) => entry.ok) ? "success" : "failure",
      details: { selected: input.data.ids.length },
      ipAddress,
      requestId,
    });
    return json(result);
  } catch (error) {
    return failure(error);
  }
}
