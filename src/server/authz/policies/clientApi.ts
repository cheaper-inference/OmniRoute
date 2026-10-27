import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth.ts";
import { recordApiKeyAuthTouch } from "@/lib/compliance/index";
import { classifyIpScope, getClientIpFromRequest } from "@/lib/ipUtils";
import { isFeatureFlagEnabled, isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { extractApiKeyCandidates } from "@/sse/services/clientApiKeyResolver.ts";
import type { AuthOutcome, PolicyContext, RoutePolicy } from "../context";
import { allow, reject } from "../context";
import { isViaProxyRequest, requestPeerAddress } from "../peerContext";

const HANDSHAKE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function isWsHandshake(ctx: PolicyContext): boolean {
  if (ctx.classification.normalizedPath !== "/api/v1/ws") return false;
  if (!HANDSHAKE_METHODS.has(ctx.request.method.toUpperCase())) return false;

  try {
    return new URL(ctx.request.url, "http://localhost").searchParams.get("handshake") === "1";
  } catch {
    return false;
  }
}

function maskKeyId(apiKey: string): string {
  const tail = apiKey.slice(-4);
  return `key_${tail}`;
}

function redactCredentials(
  value: string | null,
  credentials: Array<string | null | undefined>
): string | null {
  if (!value) return null;
  let sanitized = value;
  for (const credential of credentials) {
    if (credential) sanitized = sanitized.split(credential).join("[redacted]");
  }
  return sanitized;
}

function getAuthTouchClientIp(ctx: PolicyContext): string {
  const peerAddress = requestPeerAddress(ctx);
  const peerScope = classifyIpScope(peerAddress);
  const trustedProxyHop =
    isViaProxyRequest(ctx) && (peerScope === "loopback" || peerScope === "private");

  return getClientIpFromRequest({
    headers: ctx.request.headers,
    // A token-validated proxy stamp plus a local/private socket peer is the
    // app's trusted-proxy boundary. Withhold that hop so ipUtils resolves the
    // forwarded client. Public/direct peers remain authoritative even if they
    // spoof forwarding headers.
    ip: trustedProxyHop ? undefined : (peerAddress ?? undefined),
  });
}

/**
 * Opt-in (default off): record the caller's IP and user-agent on auth-touch rows.
 * Off, the row still records which key was used, when, and on which path.
 */
export const API_KEY_AUDIT_CLIENT_DETAILS_FLAG = "API_KEY_AUDIT_CLIENT_DETAILS_ENABLED";

/**
 * Best-effort audit of a successful GET/HEAD API-key authentication (metadata and
 * discovery reads that never reach the inference call log). Honours noLog keys and
 * the env key, and redacts every presented credential from the recorded path/UA.
 * Client IP and user-agent are recorded only with API_KEY_AUDIT_CLIENT_DETAILS_FLAG on.
 */
async function recordClientApiAuthTouch(
  ctx: PolicyContext,
  credential: string,
  credentials: string[]
): Promise<void> {
  const method = ctx.request.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") return;
  // Best effort end to end: the key already validated, so a failure in the metadata
  // lookup, IP resolution or redaction must never change the auth outcome.
  try {
    const { getApiKeyMetadata } = await import("../../../lib/db/apiKeys");
    const metadata = await getApiKeyMetadata(credential);
    if (!metadata || metadata.id === "env-key" || metadata.noLog === true) return;
    const withClientDetails = isFeatureFlagEnabled(API_KEY_AUDIT_CLIENT_DETAILS_FLAG);
    recordApiKeyAuthTouch({
      apiKeyId: metadata.id,
      method,
      normalizedPath: redactCredentials(ctx.classification.normalizedPath, credentials) || "/",
      ipAddress: withClientDetails ? getAuthTouchClientIp(ctx) : null,
      userAgent: withClientDetails
        ? redactCredentials(ctx.request.headers.get("user-agent"), [
            ...credentials,
            metadata.keyHash,
          ])
        : null,
      requestId: ctx.requestId,
    });
  } catch {
    // Observability only; never block or reject an authenticated request.
  }
}

export const clientApiPolicy: RoutePolicy = {
  routeClass: "CLIENT_API",
  async evaluate(ctx: PolicyContext): Promise<AuthOutcome> {
    // Every credential the client presented, in precedence order (Bearer,
    // x-api-key, x-goog-api-key #7034, path-scoped `/vscode/<key>/…` token).
    // A non-"Bearer <token>" Authorization header (an empty "Bearer ", or a
    // client's own non-OmniRoute token — VS Code Copilot sends one even when the
    // OmniRoute key lives in the URL path of a /vscode tokenized endpoint) must
    // NOT short-circuit auth, and neither may an unrelated Bearer sent ALONGSIDE
    // a valid x-api-key (Claude Code with a claude.ai session or
    // ANTHROPIC_AUTH_TOKEN): the request is accepted when ANY credential validates.
    const credentials = extractApiKeyCandidates(ctx.request as Request);
    if (credentials.length === 0) {
      // The WS descriptor handshake is a metadata read; the route handler
      // performs the actual wsAuth/dashboard/API-key decision and returns the
      // protocol details the browser needs before opening the socket.
      if (isWsHandshake(ctx)) {
        return allow({ kind: "anonymous", id: "ws-handshake" });
      }

      if (await isDashboardSessionAuthenticated(ctx.request)) {
        return allow({ kind: "dashboard_session", id: "dashboard" });
      }

      if (!isRequireApiKeyEnabled()) {
        return allow({ kind: "anonymous", id: "local" });
      }

      return reject(401, "AUTH_002", "Authentication required");
    }

    const { validateApiKey } = await import("../../../lib/db/apiKeys");
    for (const credential of credentials) {
      // The subject is the credential that actually validated, so identity and
      // usage never bind to a stale Bearer sent next to a valid x-api-key.
      if (await validateApiKey(credential)) {
        await recordClientApiAuthTouch(ctx, credential, credentials);
        return allow({ kind: "client_api_key", id: maskKeyId(credential) });
      }
    }

    // Issue #2257: when REQUIRE_API_KEY is off, a stale CLI config (Codex
    // Desktop auto-config, Hermes, etc.) carrying an invalid Bearer
    // shouldn't 401 the whole request — REQUIRE_API_KEY=false means
    // "anonymous traffic is allowed", so an invalid key should degrade to
    // anonymous instead of rejecting. We log a warning so the bad key is
    // still observable in the request log.
    if (!isRequireApiKeyEnabled()) {
      console.warn(
        `[clientApiPolicy] invalid bearer presented to ${ctx.classification.normalizedPath} ` +
          `but REQUIRE_API_KEY=false — falling through to anonymous (key_id=${maskKeyId(credentials[0])})`
      );
      return allow({ kind: "anonymous", id: "local" });
    }
    return reject(401, "AUTH_002", "Invalid API key");
  },
};
