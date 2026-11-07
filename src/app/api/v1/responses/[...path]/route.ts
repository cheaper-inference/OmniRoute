import { handleChat } from "@/sse/handlers/chat";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import { withChatAdmission } from "@/shared/middleware/withChatAdmission";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";

let initialized = false;

async function ensureInitialized() {
  if (!initialized) {
    await initTranslators();
    initialized = true;
    console.log("[SSE] Translators initialized for /v1/responses/*");
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * POST /v1/responses/:path* - OpenAI Responses subpaths
 * Reuses the shared chat handler so native Codex passthrough can keep
 * arbitrary Responses suffixes all the way to the upstream provider.
 */
async function postHandler(request) {
  // Defense-in-depth: the authz proxy (src/proxy.ts) is the primary gate, but
  // its matcher can miss path variants (e.g. uppercase /V1/ aliases), so the
  // handler enforces authentication independently.
  const authRejection = await enforceClientApiRouteAuth(request);
  if (authRejection) return authRejection;

  await ensureInitialized();
  return await handleChat(request);
}

export const POST = withChatAdmission(postHandler);
