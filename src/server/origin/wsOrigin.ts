import { resolveAllowedOrigin } from "@/server/cors/origins";

import { getPublicOriginCandidates, normalizeOrigin } from "./publicOrigin";

/**
 * `Origin` check for WebSocket upgrades that reach inference (`/v1/responses`).
 *
 * Browsers do not apply CORS to WebSocket: any page can open
 * `new WebSocket("ws://127.0.0.1:20128/v1/responses")` and read every frame. The
 * HTTP surface relies on CORS to keep a credential-less cross-origin page from
 * reading responses, so the WebSocket handshake has to check `Origin` itself.
 *
 * Verdict:
 *   - no `Origin` header → allowed. Non-browser clients (Codex CLI, SDKs) do not
 *     send one, and a non-browser caller can forge any `Origin` anyway.
 *   - `Origin` admitted by the CORS allowlist (`resolveAllowedOrigin`:
 *     `CORS_ALLOW_ALL`, `CORS_ALLOWED_ORIGINS`, legacy `CORS_ORIGIN`, the runtime
 *     `corsOrigins` setting) → allowed.
 *   - `Origin` equals one of OmniRoute's own public origins
 *     (`getPublicOriginCandidates`: configured public base URL, a trusted proxy's
 *     forwarded origin, a direct loopback/LAN IP host) → allowed.
 *   - anything else, including `null` and non-http(s) origins → rejected.
 *
 * The `request-url` candidate is skipped: the bridge builds the request URL itself,
 * so it says nothing about where the browser page came from. As with the MCP guard,
 * a DNS-rebinding page (`Host: evil.test`, `Origin: http://evil.test`) matches no
 * candidate: a Host only becomes a candidate when it is a loopback/LAN IP literal or
 * `localhost` and the stamped socket peer is loopback/LAN.
 *
 * `request` must carry the handshake's `Origin`, `Host`, forwarding headers and the
 * token-stamped peer header (`x-omniroute-peer-ip`). Build it with
 * `buildHandshakeOriginRequest` from what the WS front forwards.
 */
export function isWebSocketOriginAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  if (resolveAllowedOrigin(origin) !== null) return true;

  let normalizedOrigin: string;
  try {
    normalizedOrigin = normalizeOrigin(origin);
  } catch {
    return false;
  }

  return getPublicOriginCandidates(request).some(
    (candidate) => candidate.source !== "request-url" && candidate.origin === normalizedOrigin
  );
}

/**
 * Upgrade-request headers the WS fronts forward for the Origin check. Senders:
 * `getHandshakeOriginHeaders` in `scripts/dev/responses-ws-proxy.mjs` (used by both the
 * `/v1/responses` proxy and the `/v1/ws` bridge). Change both lists together.
 */
export const WS_HANDSHAKE_ORIGIN_HEADERS = [
  "host",
  "x-forwarded-host",
  "x-forwarded-proto",
  "forwarded",
  "x-omniroute-peer-ip",
] as const;

/**
 * Header the `/v1/ws` bridge uses to hand `/api/v1/ws?handshake=1` the browser's upgrade
 * headers (JSON object). The bridge reaches the route over loopback, so the route's own
 * `Host` and peer stamp describe the bridge, not the browser.
 */
export const WS_HANDSHAKE_ORIGIN_HEADER = "x-omniroute-ws-handshake";

/**
 * Rebuild a Request carrying the browser's handshake headers plus `origin`, for
 * `isWebSocketOriginAllowed`. Unknown keys and non-string values are dropped. The URL is a
 * placeholder: the check ignores the request-url candidate.
 */
export function buildHandshakeOriginRequest(handshake: unknown, origin: string | null): Request {
  const record =
    handshake && typeof handshake === "object" && !Array.isArray(handshake)
      ? (handshake as Record<string, unknown>)
      : {};
  const headers = new Headers();
  for (const name of WS_HANDSHAKE_ORIGIN_HEADERS) {
    const value = record[name];
    if (typeof value === "string") headers.set(name, value);
  }
  if (origin !== null) headers.set("origin", origin);
  const scheme = process.env.OMNIROUTE_INTERNAL_SCHEME === "https" ? "https" : "http";
  return new Request(`${scheme}://omniroute.invalid/`, { headers });
}
