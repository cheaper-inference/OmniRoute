import { NextResponse } from "next/server";

import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  ClientMcpError,
  clientMcpClient,
  clientMcpMutation,
  listClientMcp,
  mutateClientMcp,
} from "@/lib/cli-helper/clientMcp";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export const runtime = "nodejs";

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function guard(request: Request): Promise<Response | null> {
  const local = isLocalRequestAllowed();
  if (!local.allowed) return json({ error: "Local MCP management is unavailable" }, 403);
  const auth = await requireCliToolsAuth(request, { alwaysRequireAuth: true });
  if (auth) return auth;
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  const host = request.headers.get("host") ?? url.host;
  if (
    (origin && origin !== `${url.protocol}//${host}`) ||
    (fetchSite && fetchSite !== "same-origin")
  ) {
    return json({ error: "Same-origin requests required" }, 403);
  }
  return null;
}

function failed(error: unknown, read: boolean) {
  if (error instanceof ClientMcpError) {
    return json({ error: sanitizeErrorMessage(error.message) }, error.status);
  }
  return json(
    { error: read ? "Could not read the MCP config" : "Could not apply the MCP change" },
    500
  );
}

export async function GET(request: Request) {
  const rejected = await guard(request);
  if (rejected) return rejected;
  const client = clientMcpClient.safeParse(new URL(request.url).searchParams.get("client"));
  if (!client.success) return json({ error: "Unsupported MCP client" }, 400);
  try {
    return json(listClientMcp(client.data));
  } catch (error) {
    return failed(error, true);
  }
}

export async function POST(request: Request) {
  const rejected = await guard(request);
  if (rejected) return rejected;
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
  const input = clientMcpMutation.safeParse(body);
  if (!input.success) return json({ error: "Invalid MCP change" }, 400);
  const { ipAddress, requestId } = getAuditRequestContext(request);
  const audit = {
    action: "cli.client_mcp_change",
    target: input.data.client,
    resourceType: "cli_config",
    ipAddress,
    requestId,
    details: { action: input.data.action },
  };
  try {
    const result = mutateClientMcp(input.data);
    logAuditEvent({ ...audit, status: "success" });
    return json(result);
  } catch (error) {
    logAuditEvent({ ...audit, status: "failure" });
    return failed(error, false);
  }
}
