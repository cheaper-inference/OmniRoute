import { handleChat } from "@/sse/handlers/chat";
import { generateRequestId } from "@/shared/utils/requestId";
import { resolveIncomingCorrelationId } from "@/shared/utils/correlationPreserve.ts";
import { initTranslators } from "@omniroute/open-sse/translator/index.ts";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";
import { withChatAdmission } from "@/shared/middleware/withChatAdmission";
import { requireJsonContentType } from "@/shared/middleware/requireJsonContentType";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";
import {
  withEarlyStreamKeepalive,
  ANTHROPIC_PING_FRAME,
} from "@omniroute/open-sse/utils/earlyStreamKeepalive";
import { createStreamDeadlineSignal } from "@omniroute/open-sse/utils/streamDeadlineSignal";
import { resolveKeepaliveThreshold } from "@omniroute/open-sse/utils/keepaliveThreshold";
import { resolveStreamFlag } from "@omniroute/open-sse/utils/aiSdkCompat";
import {
  getBifrostRoutingConfig,
  resolveRelayRoutingBackend,
  shouldTryBifrostForRequest,
  getActiveBifrostCooldown,
  recordBifrostFailure,
  clearBifrostFailure,
  getRoutingFallbackHeader,
  getRoutingFallbackReasonHeader,
  type BifrostRoutingConfig,
  type RelayRoutingBackend,
} from "@/shared/services/bifrost/bifrostRouting.ts";
import { dispatchToBifrost } from "@/shared/services/bifrost/bifrostClient.ts";
import { gateBifrostFastPath } from "@/shared/services/bifrost/bifrostFastPathGate.ts";

// Bifrost's Anthropic-compatible endpoint (the Anthropic SDK integration, mounted under
// /anthropic). The Anthropic-format body of /v1/messages must go here: posting it to the
// sidecar's OpenAI /v1/chat/completions endpoint would answer Claude clients in OpenAI shape.
const BIFROST_ANTHROPIC_MESSAGES_PATH = "/anthropic/v1/messages";

// A sidecar build without the Anthropic integration answers these for the path above.
// They mean "unsupported here", not "the request is bad": serve it natively instead.
const BIFROST_UNSUPPORTED_STATUSES = new Set([404, 405, 501]);

// Cooldown key for this route: the unsupported-endpoint case must not park the sidecar's
// OpenAI endpoint used by /v1/chat/completions (that cooldown is keyed by the base URL).
function bifrostMessagesCooldownKey(config: BifrostRoutingConfig): string {
  return `${config.baseUrl}${BIFROST_ANTHROPIC_MESSAGES_PATH}`;
}

let initialized = false;

/**
 * Initialize translators once
 */
async function ensureInitialized() {
  if (!initialized) {
    await initTranslators();
    initialized = true;
    console.log("[SSE] Translators initialized for /v1/messages");
  }
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

async function executeBifrostAttempt(
  request: Request,
  body: Record<string, unknown>,
  bifrostConfig: BifrostRoutingConfig
): Promise<{ response?: Response; fallbackHeader?: string }> {
  const cooldownKey = bifrostMessagesCooldownKey(bifrostConfig);
  try {
    const bifrostResult = await dispatchToBifrost({
      request,
      body,
      config: bifrostConfig,
      targetPath: BIFROST_ANTHROPIC_MESSAGES_PATH,
    });

    if (
      bifrostResult.statusCode < 500 &&
      !BIFROST_UNSUPPORTED_STATUSES.has(bifrostResult.statusCode)
    ) {
      clearBifrostFailure(cooldownKey);
      return { response: bifrostResult.response };
    }

    recordBifrostFailure(cooldownKey, `http_${bifrostResult.statusCode}`);
    return { fallbackHeader: "bifrost-error" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    recordBifrostFailure(cooldownKey, message);
    return { fallbackHeader: "bifrost-error" };
  }
}

async function tryBifrostFastPath(
  request: Request,
  body: Record<string, unknown> | null,
  bifrostConfig: BifrostRoutingConfig | null,
  relayBackend: RelayRoutingBackend
): Promise<{ response?: Response; fallbackHeader?: string }> {
  if (!body || typeof body !== "object" || Array.isArray(body) || !bifrostConfig) return {};
  const bifrostDecision = shouldTryBifrostForRequest(relayBackend, bifrostConfig, body);
  if (!bifrostDecision.tryBifrost) return {};

  const cooldown =
    relayBackend === "auto"
      ? getActiveBifrostCooldown(bifrostMessagesCooldownKey(bifrostConfig))
      : null;
  if (cooldown) {
    return { fallbackHeader: `bifrost-cooldown; remaining=${cooldown.remainingMs}` };
  }

  // The sidecar answers before handleChat(), which owns the API-key policy: gate it
  // first (a rejection is returned as-is), and leave pinned/X-Route-Model requests to
  // the native pipeline.
  const gate = await gateBifrostFastPath(request, body);
  if (gate.rejection) return { response: gate.rejection };
  if (!gate.allow) return { fallbackHeader: "bifrost-ineligible" };

  return executeBifrostAttempt(request, body, bifrostConfig);
}

function applyBifrostHeaders(
  res: Response,
  bifrostConfig: BifrostRoutingConfig | null,
  relayBackend: RelayRoutingBackend,
  fallbackHeaderValue?: string
): Response {
  if (!bifrostConfig) return res;
  const fallbackHeader = getRoutingFallbackHeader(relayBackend, bifrostConfig);
  if (fallbackHeader || fallbackHeaderValue) {
    res.headers.set("X-Routing-Fallback", fallbackHeaderValue || fallbackHeader || "bifrost");
    const reasonCode = getRoutingFallbackReasonHeader(fallbackHeaderValue);
    if (reasonCode) {
      res.headers.set("X-Routing-Fallback-Reason", reasonCode);
    }
  }
  return res;
}

/**
 * POST /v1/messages - Claude format (auto convert via handleChat)
 *
 * `preParsedBody` is threaded from withInjectionGuard (#4041) so the body is
 * parsed at most once per request.
 */
async function postHandler(request: any, context: any, preParsedBody: any = null) {
  // Defense-in-depth: the authz proxy (src/proxy.ts) is the primary gate, but
  // its matcher can miss path variants (e.g. uppercase /V1/ aliases), so the
  // handler enforces authentication independently.
  const authRejection = await enforceClientApiRouteAuth(request);
  if (authRejection) return authRejection;

  // Reject non-JSON Content-Type with 415 before touching the body — mirrors OpenAI's
  // reference API and matches /v1/chat/completions (#6414).
  const ctRejection = requireJsonContentType(request);
  if (ctRejection) return ctRejection;

  await ensureInitialized();
  // Streaming Anthropic clients (Claude Code, the Anthropic SDK) drop the connection
  // when no bytes arrive while a large prompt is processed before the first token — a
  // big context can exceed the client's stream/first-token watchdog. OmniRoute holds
  // the response until the first useful upstream byte (ensureStreamReadiness), so keep
  // the connection warm with early keepalives during that gap — same wrapper used by
  // /v1/responses (#2544). Anthropic clients ignore SSE comments for their watchdog, so
  // emit a real `event: ping` (ANTHROPIC_PING_FRAME). Non-streaming callers keep the
  // verbatim path.
  let body = preParsedBody;
  if (body == null) {
    try {
      body = await request
        .clone()
        .json()
        .catch(() => null);
    } catch {
      // body unavailable / non-JSON — handleChat will return its normal validation error
    }
  }
  const accept = String(request.headers?.get?.("accept") || "");
  const wantsStreaming = resolveStreamFlag(body?.stream, accept, "claude");

  // Bifrost sidecar fast-path (falls back to the native pipeline below on 5xx / error).
  const relayBackend = resolveRelayRoutingBackend();
  const bifrostConfig = getBifrostRoutingConfig();
  const fastPathResult = await tryBifrostFastPath(request, body, bifrostConfig, relayBackend);
  if (fastPathResult.response) {
    return fastPathResult.response;
  }
  const applyHeaders = (res: Response) =>
    applyBifrostHeaders(res, bifrostConfig, relayBackend, fastPathResult.fallbackHeader);

  if (wantsStreaming) {
    // Single id for handler + keepalive bytes + deadline warn (matches the
    // chat/completions convention: caller id preserved, generated when absent).
    const correlationId =
      resolveIncomingCorrelationId(request.headers.get("x-correlation-id")) ?? generateRequestId();
    const { signal: streamSignal, deadlineController } = createStreamDeadlineSignal(request.signal);
    return applyHeaders(
      await withEarlyStreamKeepalive(handleChat(request, null, body, correlationId, streamSignal), {
        signal: streamSignal,
        thresholdMs: resolveKeepaliveThreshold(body?.model),
        keepaliveFrame: ANTHROPIC_PING_FRAME,
        correlationId,
        deadlineController,
      })
    );
  }
  return applyHeaders(await handleChat(request, null, body));
}

// `logger: null` — the guardrail registry re-evaluates this request inside
// handleChat with the pino logger (#11936 dedupe).
// The outer admission wrapper still owns the route-level lease. On a stream deadline,
// the synthetic SSE body closes, so its response lifecycle releases that lease while
// handleChat receives the explicit streamSignal and tears provider work down directly.
export const POST = withChatAdmission(withInjectionGuard(postHandler, { logger: null }));
