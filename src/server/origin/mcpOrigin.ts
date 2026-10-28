import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

import { getPublicOriginCandidates, normalizeOrigin } from "./publicOrigin";

/**
 * `Origin` validation for the MCP HTTP surface (`/api/mcp/*`).
 *
 * The MCP Streamable HTTP transport spec (2025-11-25 and 2026-07-28) says servers
 * MUST validate the `Origin` header on every incoming connection and MUST answer
 * 403 when it is present and invalid. Before this guard, OmniRoute only checked
 * `Origin` for cookie-authenticated dashboard writes, so a request carrying an API
 * key, the local CLI token, or no credential at all (`requireLogin=false` on
 * loopback) reached the transport whatever its `Origin` said.
 *
 * Verdict, applied to every caller and every method:
 *   - no `Origin` header → allowed. Non-browser MCP clients (the OmniRoute CLI, SDK
 *     clients, IDE integrations) never send one, and the spec only constrains a
 *     present header.
 *   - `Origin` matches a public-origin candidate (`getPublicOriginCandidates`: the
 *     configured public base URL, a trusted proxy's forwarded origin, the request
 *     URL, a direct loopback/LAN IP host) → allowed.
 *   - `Origin` is a localhost origin on any port (`localhost`, `127.0.0.1`,
 *     `[::1]`) → allowed, so browser tools on the operator's machine (e.g. the MCP
 *     Inspector) keep working.
 *   - anything else, including `null`, opaque and non-http(s) origins → rejected.
 *
 * The `Host` header is never consulted directly: it only reaches the candidate list
 * through `getPublicOriginCandidates`, which admits it solely when both the
 * token-stamped socket peer and the Host itself are loopback/private-LAN IP
 * literals. A DNS-rebinding page (`Host: evil.test`, `Origin: http://evil.test`)
 * therefore matches nothing and is rejected.
 *
 * Must run where the token-stamped peer headers are still present (the authz
 * pipeline): the pipeline strips them before route handlers execute, and without
 * them the trusted-proxy and direct-LAN candidates cannot be derived.
 */

const MCP_PATH_PREFIX = "/api/mcp/";

const LOCALHOST_ORIGIN_HOSTNAMES: ReadonlySet<string> = new Set([
  "localhost",
  "127.0.0.1",
  "[::1]",
]);

const MCP_INVALID_ORIGIN_MESSAGE =
  "Invalid request origin for the MCP endpoint. Browser-based MCP clients must be served " +
  "from localhost or from OmniRoute's public origin (set OMNIROUTE_PUBLIC_BASE_URL when " +
  "OmniRoute runs behind a reverse proxy).";

/** JSON-RPC server-error code the MCP SDKs use for transport-level rejections. */
const JSON_RPC_TRANSPORT_ERROR_CODE = -32000;

export type McpOriginVerdict = { ok: true } | { ok: false; reason: "invalid-origin" };

export interface McpInvalidOriginBody {
  jsonrpc: "2.0";
  id: null;
  error: {
    code: number;
    message: string;
    data: { code: "INVALID_ORIGIN"; correlation_id: string };
  };
}

/** True for every path the MCP Origin guard covers (normalized pathname). */
export function isMcpOriginGuardedPath(pathname: string): boolean {
  return pathname.startsWith(MCP_PATH_PREFIX);
}

function isLocalhostOrigin(normalizedOrigin: string): boolean {
  return LOCALHOST_ORIGIN_HOSTNAMES.has(new URL(normalizedOrigin).hostname);
}

export function validateMcpRequestOrigin(request: Request): McpOriginVerdict {
  const origin = request.headers.get("origin");
  // An empty header carries no origin either; treated like an absent one, as the
  // MCP SDK's own validateOriginHeader does.
  if (!origin) return { ok: true };

  let normalizedOrigin: string;
  try {
    normalizedOrigin = normalizeOrigin(origin);
  } catch {
    return { ok: false, reason: "invalid-origin" };
  }

  if (isLocalhostOrigin(normalizedOrigin)) return { ok: true };

  const allowed = getPublicOriginCandidates(request).some(
    (candidate) => candidate.origin === normalizedOrigin
  );
  return allowed ? { ok: true } : { ok: false, reason: "invalid-origin" };
}

/**
 * 403 body for a rejected MCP Origin: a JSON-RPC error response with a null `id`
 * (the spec allows a JSON-RPC error with no request id here), carrying OmniRoute's
 * error code and correlation id under `error.data`.
 */
export function buildMcpInvalidOriginBody(requestId: string): McpInvalidOriginBody {
  return {
    jsonrpc: "2.0",
    id: null,
    error: {
      code: JSON_RPC_TRANSPORT_ERROR_CODE,
      message: sanitizeErrorMessage(MCP_INVALID_ORIGIN_MESSAGE),
      data: { code: "INVALID_ORIGIN", correlation_id: requestId },
    },
  };
}
