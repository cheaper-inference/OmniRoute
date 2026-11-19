/**
 * WebSocket reverse proxy for embedded service UIs.
 *
 * Runs a lightweight HTTP server (port EMBED_WS_PROXY_PORT, default 20131)
 * that accepts WebSocket upgrade requests and tunnels them to the matching
 * embedded service.
 *
 * URL pattern: WebSocket connect to host:20131/[name]/[...path]
 *   [name] → resolved via the services registry (e.g. "9router")
 *   [...path] → forwarded verbatim to the upstream WS endpoint
 *
 * Security:
 *   - Target host is always 127.0.0.1 and port comes from the registry — never
 *     from user input. No SSRF risk.
 *   - Server binds to 127.0.0.1 only (loopback) unless EMBED_WS_PROXY_HOST
 *     (or LIVE_WS_HOST) is set explicitly.
 *   - Every upgrade is authorized before the tunnel opens
 *     (authorizeEmbedWsUpgrade), with the same decision as the HTTP embed route
 *     (LOCAL_ONLY + management auth, Hard Rule #17): the TCP peer must be
 *     loopback with no reverse-proxy hop header, a browser Origin must be one of
 *     the dashboard origins, and the caller must hold a dashboard session or a
 *     management-scope API key (unless dashboard login is disabled). A rejected
 *     upgrade never reaches the service, so the injected service credential is
 *     only ever sent on behalf of an authorized caller. Errors fail closed.
 *   - Max 50 concurrent connections per service. The 51st request receives 503.
 *   - Idle timeout: 5 minutes without any data → both sockets are destroyed.
 *   - Hop-by-hop headers cookie/authorization/origin are stripped from the
 *     upgrade request; Authorization is replaced by Bearer <serviceApiKey>.
 */

import http from "node:http";
import net from "node:net";
import type { IncomingMessage } from "node:http";

import { getSupervisor } from "./registry";
import { getOrCreateApiKey } from "./apiKey";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { hasProxyHopHeader } from "@/server/authz/proxyHeaders";
import { isLoopbackHost } from "@/server/authz/routeGuard";
import { isOriginAllowed } from "@/server/ws/liveServerAllowList";
import { hasManageScope } from "@/shared/constants/managementScopes";
import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import {
  attachRequestStreamGuards,
  installProcessCrashGuard,
} from "@/shared/utils/httpClientAbortGuard.mjs";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 20131;

/** Maximum concurrent WebSocket bridges per service name. */
const MAX_CONNECTIONS_PER_SERVICE = 50;

/** Idle timeout in milliseconds (5 minutes). */
const IDLE_TIMEOUT_MS = 5 * 60 * 1000;

/** Headers to strip from the client upgrade request (case-insensitive). */
const STRIPPED_HEADERS = new Set(["cookie", "authorization", "origin"]);

declare global {
  var __omnirouteEmbedWsStarted: boolean | undefined;
}

/**
 * Tracks active client sockets per service name.
 * Used to enforce MAX_CONNECTIONS_PER_SERVICE.
 */
const activeConnections = new Map<string, Set<net.Socket>>();

/** Regex that matches /<name>/<path> or /<name> */
const PATH_RE = /^\/([^/?#]+)(\/.*)?$/;

function writeError(socket: net.Socket, status: number, message: string): void {
  if (!socket.writable || socket.destroyed) return;
  const body = Buffer.from(JSON.stringify({ error: message }), "utf8");
  const lines = [
    `HTTP/1.1 ${status} ${http.STATUS_CODES[status] ?? "Error"}`,
    "Connection: close",
    "Content-Type: application/json; charset=utf-8",
    `Content-Length: ${body.length}`,
    "",
    "",
  ];
  socket.write(lines.join("\r\n"));
  socket.end(body);
}

/**
 * Register a client socket into the per-service active set.
 * Returns false (and writes 503) if the limit is already reached.
 */
function registerConnection(name: string, socket: net.Socket): boolean {
  let set = activeConnections.get(name);
  if (!set) {
    set = new Set();
    activeConnections.set(name, set);
  }
  if (set.size >= MAX_CONNECTIONS_PER_SERVICE) {
    writeError(
      socket,
      503,
      `Service '${name}' connection limit reached (max ${MAX_CONNECTIONS_PER_SERVICE})`
    );
    return false;
  }
  set.add(socket);
  return true;
}

/** Remove a client socket from the per-service active set. */
function unregisterConnection(name: string, socket: net.Socket): void {
  activeConnections.get(name)?.delete(socket);
}

/**
 * Build the filtered header list for the upstream upgrade request.
 * Strips cookie, authorization, and origin; rewrites host; injects Bearer token.
 */
function buildUpstreamHeaders(rawHeaders: string[], port: number, apiKey: string): string[] {
  const lines: string[] = [];
  let wroteHost = false;

  for (let i = 0; i < rawHeaders.length; i += 2) {
    const headerName = rawHeaders[i];
    const headerValue = rawHeaders[i + 1] ?? "";
    const lower = headerName.toLowerCase();

    if (lower === "host") {
      lines.push(`Host: 127.0.0.1:${port}`);
      wroteHost = true;
    } else if (!STRIPPED_HEADERS.has(lower)) {
      lines.push(`${headerName}: ${headerValue}`);
    }
    // cookie / authorization / origin are intentionally dropped here
  }

  if (!wroteHost) lines.push(`Host: 127.0.0.1:${port}`);

  // Always inject the service API key regardless of what the client sent
  lines.push(`Authorization: Bearer ${apiKey}`);

  return lines;
}

export type EmbedWsUpgradeVerdict =
  | { allow: true; via: "anonymous" | "dashboard_session" | "management_key" }
  | { allow: false; status: number; message: string };

function deny(status: number, message: string): EmbedWsUpgradeVerdict {
  return { allow: false, status, message };
}

/** True when the upgrade's real TCP peer is this machine and no proxy hop relayed it. */
function isLocalUpgradePeer(req: IncomingMessage): boolean {
  if (hasProxyHopHeader(req.headers)) return false;
  return isLoopbackHost(req.socket?.remoteAddress ?? null);
}

/**
 * A browser always sends Origin on a WebSocket upgrade; it must be one of the
 * dashboard origins (same allow-list as the Live dashboard socket:
 * LIVE_WS_ALLOWED_ORIGINS / LIVE_WS_ALLOWED_HOSTS on top of the loopback
 * defaults). A client without Origin is not a browser page; it still has to be
 * local and authenticated.
 */
function isUpgradeOriginAllowed(origin: string | string[] | undefined): boolean {
  if (origin === undefined) return true;
  if (typeof origin !== "string" || origin.length === 0) return false;
  return isOriginAllowed(origin, process.env);
}

function toHeaders(headers: IncomingMessage["headers"]): Headers {
  const out = new Headers();
  for (const [name, value] of Object.entries(headers)) {
    if (typeof value === "string") out.set(name, value);
    else if (Array.isArray(value)) {
      out.set(name, value.join(name.toLowerCase() === "cookie" ? "; " : ", "));
    }
  }
  return out;
}

/**
 * Decide whether an upgrade may open a tunnel. Mirrors the management policy the
 * HTTP embed route (`/dashboard/providers/services/<name>/embed/`) goes through:
 * loopback only, then anonymous when dashboard login is off, otherwise a
 * dashboard session or an API key with a management scope. Header-only
 * credentials; a URL-borne token never counts.
 */
export async function authorizeEmbedWsUpgrade(
  req: IncomingMessage
): Promise<EmbedWsUpgradeVerdict> {
  if (!isLocalUpgradePeer(req)) {
    return deny(403, "The embedded service WebSocket proxy only accepts local connections");
  }
  if (!isUpgradeOriginAllowed(req.headers.origin)) {
    return deny(403, "Origin not allowed");
  }

  const authRequest = {
    url: "http://127.0.0.1/dashboard/providers/services/embed-ws",
    method: "GET",
    headers: toHeaders(req.headers),
  };

  try {
    if (!(await isAuthRequired(authRequest, { loopback: true }))) {
      return { allow: true, via: "anonymous" };
    }
    if (await isDashboardSessionAuthenticated(authRequest)) {
      return { allow: true, via: "dashboard_session" };
    }
    const apiKey = extractApiKey(authRequest, { allowUrl: false });
    if (apiKey && (await isValidApiKey(apiKey))) {
      const meta = await getApiKeyMetadata(apiKey);
      if (meta && hasManageScope(meta.scopes ?? [])) {
        return { allow: true, via: "management_key" };
      }
    }
    return apiKey ? deny(403, "Invalid management token") : deny(401, "Authentication required");
  } catch {
    return deny(503, "Authentication backend unavailable");
  }
}

async function proxyUpgrade(req: IncomingMessage, socket: net.Socket, head: Buffer): Promise<void> {
  // Authorize before anything else: an unauthorized caller learns nothing about
  // the registered services and never gets a tunnel carrying the service key.
  const verdict = await authorizeEmbedWsUpgrade(req);
  // `=== false`, not `!verdict.allow`: the production build program is not strict, and
  // only the equality check narrows the verdict union there.
  if (verdict.allow === false) {
    writeError(socket, verdict.status, verdict.message);
    return;
  }

  const rawUrl = req.url ?? "/";
  const match = PATH_RE.exec(rawUrl.split("?")[0]);

  if (!match) {
    writeError(socket, 400, "Invalid path");
    return;
  }

  const [, name, rest = "/"] = match;
  const supervisor = getSupervisor(name);

  if (!supervisor) {
    writeError(socket, 404, `Service '${name}' not found`);
    return;
  }

  const { state, port } = supervisor.getStatus();
  if (state !== "running") {
    writeError(socket, 503, `Service '${name}' is not running (state: ${state})`);
    return;
  }

  // Enforce max concurrent connections per service
  if (!registerConnection(name, socket)) {
    // writeError already written inside registerConnection
    return;
  }

  // Clean up connection tracking when the client socket closes
  socket.once("close", () => unregisterConnection(name, socket));
  socket.once("error", () => unregisterConnection(name, socket));

  // Fetch the service API key (never cached — key may rotate)
  const apiKey = await getOrCreateApiKey(name);

  // Rebuild the search string if present
  const search = rawUrl.includes("?") ? rawUrl.slice(rawUrl.indexOf("?")) : "";
  const upstreamPath = `${rest}${search}`;

  const upstream = net.connect(port, "127.0.0.1");

  // Idle timeout: reset on any data in either direction; destroy both on expiry
  let idleTimer: ReturnType<typeof setTimeout> | null = null;

  function resetIdleTimer(): void {
    if (idleTimer !== null) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      socket.destroy();
      upstream.destroy();
    }, IDLE_TIMEOUT_MS);
  }

  function clearIdleTimer(): void {
    if (idleTimer !== null) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  upstream.once("connect", () => {
    const requestLine = `${req.method ?? "GET"} ${upstreamPath} HTTP/${req.httpVersion}`;
    const headerLines = buildUpstreamHeaders(req.rawHeaders, port, apiKey);
    upstream.write(`${requestLine}\r\n${headerLines.join("\r\n")}\r\n\r\n`);
    if (head.length > 0) upstream.write(head);

    // Start idle timer once the tunnel is live
    resetIdleTimer();

    socket.on("data", resetIdleTimer);
    upstream.on("data", resetIdleTimer);

    socket.pipe(upstream);
    upstream.pipe(socket);
  });

  upstream.on("error", () => {
    clearIdleTimer();
    writeError(socket, 502, "Upstream connection error");
  });

  socket.on("error", () => {
    clearIdleTimer();
    upstream.destroy();
  });

  socket.on("close", () => {
    clearIdleTimer();
    upstream.destroy();
  });

  upstream.on("close", () => {
    clearIdleTimer();
    socket.destroy();
  });
}

/**
 * Resolve the bind host for the embed WS proxy.
 *
 * `EMBED_WS_PROXY_HOST` takes precedence, but we fall back to `LIVE_WS_HOST`
 * so a single env var exposes BOTH WebSocket sockets (the Live dashboard server
 * on :20132 and this embed proxy on :20131) in Docker / behind a reverse proxy
 * or tunnel. Without this fallback the embed proxy stayed bound to 127.0.0.1
 * even when the operator set `LIVE_WS_HOST=0.0.0.0`, so the Live view was
 * permanently "disconnected" in headless deployments (#5110). Defaults to
 * loopback for safety when neither is set.
 */
export function resolveEmbedWsHost(): string {
  return process.env.EMBED_WS_PROXY_HOST ?? process.env.LIVE_WS_HOST ?? DEFAULT_HOST;
}

/**
 * Start the embed WebSocket proxy server.
 * Idempotent — safe to call multiple times.
 */
export function initEmbedWsProxy(): http.Server | undefined {
  // Safety net: a client aborting a connection can emit `Error: aborted`/
  // ECONNRESET on the request stream; without this the single missed listener
  // becomes an uncaughtException that kills the server. Benign aborts are
  // swallowed; genuine errors still crash loudly (#fix-dev-server-aborted).
  installProcessCrashGuard();
  if (globalThis.__omnirouteEmbedWsStarted) return undefined;

  const host = resolveEmbedWsHost();
  const port = parseInt(process.env.EMBED_WS_PROXY_PORT ?? String(DEFAULT_PORT), 10);

  const server = http.createServer((_req, res) => {
    // Absorb client-abort errors (browser closes the socket during navigation/
    // HMR/bfcache) on the request/response streams so they never surface as an
    // uncaughtException that kills the server (#fix-dev-server-aborted).
    attachRequestStreamGuards(_req, res);
    res.writeHead(426, "Upgrade Required", { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "upgrade_required", message: "Use WebSocket." }));
  });

  server.on("upgrade", (req: IncomingMessage, socket: net.Socket, head: Buffer) => {
    proxyUpgrade(req, socket, head).catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      writeError(socket, 500, `Internal proxy error: ${msg}`);
    });
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`[EmbedWsProxy] Port ${port} is already in use — embed WS proxy disabled.`);
      return;
    }
    console.warn("[EmbedWsProxy] Failed to start:", err.message);
  });

  server.listen(port, host, () => {
    globalThis.__omnirouteEmbedWsStarted = true;
    console.log(`[EmbedWsProxy] Listening on ${host}:${port}`);
  });

  return server;
}

// ─── Exported for testing ────────────────────────────────────────────────────

export {
  activeConnections,
  registerConnection,
  unregisterConnection,
  buildUpstreamHeaders,
  MAX_CONNECTIONS_PER_SERVICE,
  IDLE_TIMEOUT_MS,
};
