import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth.ts";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { extractApiKeyCandidates } from "@/sse/services/clientApiKeyResolver.ts";
import type { AuthOutcome, PolicyContext, RoutePolicy } from "../context";
import { allow, reject } from "../context";

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
