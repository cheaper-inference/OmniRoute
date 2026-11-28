import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  changeClientPluginLibrary,
  clientPluginLibraryRequest,
  getClientPluginLibrary,
} from "@/lib/cli-helper/clientPluginLibrary";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance";
import { isLocalRequestAllowed } from "@/lib/security/localEndpoints";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";

export const runtime = "nodejs";

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function authorize(request: Request) {
  if (!isLocalRequestAllowed().allowed)
    return json({ error: "The local plugin library is unavailable." }, 403);
  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  const url = new URL(request.url);
  const host = request.headers.get("host") ?? url.host;
  if ((origin && origin !== `${url.protocol}//${host}`) || (site && site !== "same-origin")) {
    return json({ error: "Same-origin requests required." }, 403);
  }
  return requireCliToolsAuth(request, { alwaysRequireAuth: true });
}

export async function GET(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;
  try {
    return json(await getClientPluginLibrary());
  } catch {
    return json({ error: "Could not access the local plugin library." }, 500);
  }
}

export async function POST(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;
  const writeGuard = ensureCliConfigWriteAllowed();
  if (writeGuard) return json({ error: writeGuard }, 403);
  const mediaType = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  if (mediaType !== "application/json" || !request.body) {
    return json({ error: "Expected an application/json body." }, 415);
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let text = "";
  let body: unknown;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > 16 * 1024) return json({ error: "Plugin selection exceeds the size limit." }, 413);
      text += decoder.decode(chunk.value, { stream: true });
    }
    body = JSON.parse(text + decoder.decode());
  } catch {
    return json({ error: "Malformed JSON body." }, 400);
  } finally {
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
  const input = clientPluginLibraryRequest.safeParse(body);
  if (!input.success) return json({ error: "Invalid plugin library action." }, 400);

  try {
    const result = await changeClientPluginLibrary(input.data);
    const { ipAddress, requestId } = getAuditRequestContext(request);
    logAuditEvent({
      action: `cli.plugin_library.${input.data.action}`,
      target: input.data.client ?? "library",
      resourceType: "cli_config",
      status: result.results.every((item) => item.ok) ? "success" : "failure",
      details: { selected: input.data.ids.length },
      ipAddress,
      requestId,
    });
    return json(result);
  } catch {
    return json({ error: "Could not verify the plugin library action." }, 500);
  }
}
