/**
 * MCP HTTP Transport Layer — session-aware handlers for SSE and Streamable HTTP.
 *
 * Runs the MCP server **inside** the Next.js process so it can be toggled
 * from the dashboard without requiring `omniroute --mcp`.
 *
 * Transport modes:
 *   - SSE:             GET /api/mcp/sse (event stream)  +  POST /api/mcp/sse (messages)
 *   - Streamable HTTP: POST /api/mcp/stream (messages)  +  GET /api/mcp/stream (SSE stream)  +  DELETE /api/mcp/stream (session end)
 */

import { randomUUID } from "node:crypto";
import { createMcpServer } from "./server.ts";
import { resolveMcpCallerAuthInfo, withMcpHttpAuthContext } from "./httpAuthContext.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  noteStreamableInflight,
  noteStreamableOpenStream,
  purgeStreamableActivity,
  streamableActivity,
} from "./sessionActivity.ts";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

let _sseServer: McpServer | null = null;
let _sseTransport: WebStandardStreamableHTTPServerTransport | null = null;
let _sseStartedAt: number | null = null;

type StreamableSession = {
  sessionId: string;
  server: McpServer;
  transport: WebStandardStreamableHTTPServerTransport;
  startedAt: number;
  lastActivityAt: number;
};

const _streamableSessions = new Map<string, StreamableSession>();

const DEFAULT_MCP_SESSION_IDLE_MS = 5 * 60 * 1000;

/**
 * Streamable-HTTP session idle limit in ms, read from
 * `OMNIROUTE_MCP_SESSION_IDLE_MS`. Non-numeric or non-positive values fall
 * back to the historical five-minute default.
 */
export function resolveMcpSessionIdleMs(): number {
  const raw = process.env.OMNIROUTE_MCP_SESSION_IDLE_MS;
  if (raw === undefined) return DEFAULT_MCP_SESSION_IDLE_MS;
  const parsed = Number(raw);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_MCP_SESSION_IDLE_MS;
}

export function shouldReapSession(
  session: { lastActivityAt: number; activeRequests?: number; openStreams?: number },
  nowMs: number
): boolean {
  if ((session.activeRequests ?? 0) > 0) return false;
  if ((session.openStreams ?? 0) > 0) return false;
  return nowMs - session.lastActivityAt > resolveMcpSessionIdleMs();
}

const _mcpSessionSweep = setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of _streamableSessions) {
    const activity = streamableActivity(sessionId);
    if (
      shouldReapSession(
        {
          lastActivityAt: session.lastActivityAt,
          activeRequests: activity.inflight,
          openStreams: activity.openStreams,
        },
        now
      )
    ) {
      try {
        closeStreamableSession(sessionId);
      } catch {}
    }
  }
}, 60_000);
if (typeof _mcpSessionSweep === "object" && "unref" in _mcpSessionSweep) {
  (_mcpSessionSweep as { unref?: () => void }).unref?.();
}

function closeSseTransport(): void {
  if (_sseTransport) {
    try {
      _sseTransport.close();
    } catch {
      // ignore shutdown errors
    }
  }
  _sseServer = null;
  _sseTransport = null;
  _sseStartedAt = null;
}

function closeStreamableSession(sessionId: string): void {
  const session = _streamableSessions.get(sessionId);
  if (!session) {
    return;
  }

  try {
    session.transport.close();
  } catch {
    // ignore shutdown errors
  }
  _streamableSessions.delete(sessionId);
  purgeStreamableActivity(sessionId);
}

function closeAllStreamableSessions(): void {
  for (const sessionId of _streamableSessions.keys()) {
    closeStreamableSession(sessionId);
  }
}

function ensureSseServer(): {
  server: McpServer;
  transport: WebStandardStreamableHTTPServerTransport;
} {
  if (_sseServer && _sseTransport) {
    return { server: _sseServer, transport: _sseTransport };
  }

  _sseServer = createMcpServer();
  _sseTransport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
  });
  _sseStartedAt = Date.now();

  void _sseServer.connect(_sseTransport);

  console.log("[MCP] HTTP transport started (sse)");
  return { server: _sseServer, transport: _sseTransport };
}

function createStreamableSession(): StreamableSession {
  closeSseTransport();

  const sessionId = randomUUID();
  const server = createMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => sessionId,
  });
  const session = {
    sessionId,
    server,
    transport,
    startedAt: Date.now(),
    lastActivityAt: Date.now(),
  };

  void server.connect(transport);
  _streamableSessions.set(sessionId, session);
  console.log(`[MCP] HTTP transport started (streamable-http:${sessionId})`);
  return session;
}

async function isInitializeRequest(request: Request): Promise<boolean> {
  if (request.method !== "POST") {
    return false;
  }

  try {
    const body = (await request.clone().json()) as { method?: unknown };
    return body?.method === "initialize";
  } catch {
    return false;
  }
}

/**
 * Resolve the caller's per-key scopes (#7895) and hand the request to the
 * transport with `authInfo` populated, so `extra.authInfo.scopes` reaching
 * tool handlers reflects the real `api_keys.scopes` row instead of the
 * `OMNIROUTE_MCP_SCOPES` env fallback. When no per-key auth can be resolved
 * (no key, invalid key, stdio has no `Request` at all), `authInfo` stays
 * `undefined` and `scopeEnforcement.ts` falls through to its existing
 * meta/env chain unchanged.
 */
async function handleRequestWithAuthInfo(
  transport: WebStandardStreamableHTTPServerTransport,
  request: Request
): Promise<Response> {
  const authInfo = await resolveMcpCallerAuthInfo(request);
  return transport.handleRequest(request, { authInfo });
}

/**
 * JSON-RPC 2.0 transport-level error envelope.
 *
 * S-05 (#15159): this is NOT the canonical `errorResponse` from
 * `open-sse/utils/error.ts` — it is a local builder for the JSON-RPC shape that MCP
 * clients parse, so it cannot be replaced by the canonical helper without breaking
 * the protocol. It did, however, interpolate `message` with no sanitization.
 *
 * Both current call sites pass static literals, so nothing leaks today — but the
 * next caller forwarding an `err.message` would put it on the wire unredacted,
 * reintroducing S-02's leak on the JSON-RPC surface. Sanitizing here makes the
 * builder safe by default rather than safe by caller discipline.
 */
function errorResponse(message: string, code: number, status = 400): Response {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      error: { code, message: sanitizeErrorMessage(message) },
      id: null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function protectMcpSseResponse(request: Request, response: Response): Response {
  if (
    request.method !== "POST" ||
    !response.headers.get("content-type")?.toLowerCase().includes("text/event-stream")
  ) {
    return response;
  }

  const headers = new Headers(response.headers);
  const cacheControl = headers.get("cache-control");
  if (!/(?:^|,)\s*no-transform(?:\s*(?:,|$))/i.test(cacheControl ?? "")) {
    headers.set("cache-control", [cacheControl, "no-transform"].filter(Boolean).join(", "));
  }
  // Server-sent events behind a buffering reverse proxy stall tool calls for
  // the proxy's buffer window on every event — carry the same no-buffering
  // instruction the main chat SSE path sets.
  headers.set("X-Accel-Buffering", "no");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function withSessionHeader(response: Response, sessionId: string): Response {
  if (response.headers.get("mcp-session-id")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("mcp-session-id", sessionId);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Count an open SSE stream for a session while its body stays alive. The body
 * is re-served through a pull-based ReadableStream so the counter is released
 * exactly once, on natural end, consumer cancel, or body error. Idle time then
 * counts from that moment, not from the request that opened the stream.
 */
function trackOpenSseStream(session: StreamableSession, response: Response): Response {
  const { sessionId } = session;
  noteStreamableOpenStream(sessionId, 1);
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    session.lastActivityAt = Date.now();
    noteStreamableOpenStream(sessionId, -1);
  };
  const reader = response.body!.getReader();
  const body = new ReadableStream({
    async pull(controller: ReadableStreamDefaultController<Uint8Array>) {
      let result: ReadableStreamReadResult<Uint8Array>;
      try {
        result = await reader.read();
      } catch (err) {
        release();
        controller.error(err);
        return;
      }
      if (result.done) {
        release();
        controller.close();
      } else {
        controller.enqueue(result.value);
      }
    },
    cancel() {
      reader.cancel().catch((err: unknown) => {
        console.error("[MCP] Failed to cancel upstream SSE body:", err);
      });
      release();
    },
  });
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

async function handleStreamableRequest(request: Request): Promise<Response> {
  const sessionId = request.headers.get("mcp-session-id");

  if (sessionId) {
    const session = _streamableSessions.get(sessionId);
    if (!session) {
      // MCP spec (2025-03-26 / 2025-11-25, Session Management): once a session is
      // terminated/unknown, the server MUST respond with HTTP 404 Not Found so the
      // client re-initializes. A 400 here is non-recoverable for spec-compliant
      // clients (they only re-init on 404). See issue #5169.
      //
      // Auto-recovery: if the client sends an initialize request with a stale session
      // id (e.g. after a server restart or idle eviction), treat it as a fresh
      // initialization rather than hard-failing with 404. This avoids requiring users
      // to manually restart their MCP client after every server restart.
      if (await isInitializeRequest(request)) {
        const newSession = createStreamableSession();
        try {
          const response = await withMcpHttpAuthContext(request, () =>
            handleRequestWithAuthInfo(newSession.transport, request)
          );
          return withSessionHeader(response, newSession.sessionId);
        } catch (err) {
          closeStreamableSession(newSession.sessionId);
          console.error("[MCP] Streamable HTTP error during stale-session recovery:", err);
          return new Response(JSON.stringify({ error: "MCP transport error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      }
      return errorResponse("Not Found: Unknown Mcp-Session-Id header", -32000, 404);
    }

    noteStreamableInflight(sessionId, 1);
    try {
      session.lastActivityAt = Date.now();
      let response = await withMcpHttpAuthContext(request, () =>
        handleRequestWithAuthInfo(session.transport, request)
      );
      // The SSE response body stays open until the JSON-RPC response is
      // delivered (an in-flight tool call) or the GET subscription ends, so an
      // open body is transport-level activity for both POST and GET.
      if (response.headers.get("content-type")?.toLowerCase().includes("text/event-stream")) {
        response = trackOpenSseStream(session, response);
      }
      if (request.method === "DELETE") {
        closeStreamableSession(sessionId);
      }
      return withSessionHeader(response, sessionId);
    } catch (err) {
      console.error("[MCP] Streamable HTTP error:", err);
      if (request.method === "DELETE") {
        closeStreamableSession(sessionId);
      }
      return new Response(JSON.stringify({ error: "MCP transport error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    } finally {
      session.lastActivityAt = Date.now();
      noteStreamableInflight(sessionId, -1);
    }
  }

  if (!(await isInitializeRequest(request))) {
    return errorResponse("Bad Request: Mcp-Session-Id header is required", -32000);
  }

  const session = createStreamableSession();

  try {
    const response = await withMcpHttpAuthContext(request, () =>
      handleRequestWithAuthInfo(session.transport, request)
    );
    return withSessionHeader(response, session.sessionId);
  } catch (err) {
    closeStreamableSession(session.sessionId);
    console.error("[MCP] Streamable HTTP error:", err);
    return new Response(JSON.stringify({ error: "MCP transport error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// ----------------------------------------------------------------------------
// Modern-revision pointer
// ----------------------------------------------------------------------------

/**
 * First protocol revision served by the v2 sidecar rather than these transports.
 * ISO dates compare lexicographically, so `requested >= floor` means "modern".
 */
const MODERN_PROTOCOL_FLOOR = "2026-07-28";
const PROTOCOL_DATE = /^\d{4}-\d{2}-\d{2}$/;
const V2_ENDPOINT = "/api/mcp/v2";

/**
 * The 2025-era transports answer a modern `MCP-Protocol-Version` with the SDK's
 * bare version list ("Unsupported protocol version: 2026-07-28 (supported
 * versions: ...)"), which reads as a bug rather than as "wrong endpoint".
 *
 * A client asking for a modern revision is not broken, so instead of letting the
 * transport reject it, answer with a JSON-RPC error that names the endpoint that
 * does serve it. Runs after the caller has been authenticated by the route, and
 * returns null for everything these transports should keep handling. Non-date
 * junk still falls through to the SDK's own validation, unchanged.
 */
export async function modernProtocolPointer(request: Request): Promise<Response | null> {
  const requested = (request.headers.get("mcp-protocol-version") ?? "").trim();
  if (!PROTOCOL_DATE.test(requested) || requested < MODERN_PROTOCOL_FLOOR) return null;

  // Echo the request id when we can. Without it a client cannot match the error
  // to its call and may report the pointer as a protocol violation.
  let id: string | number | null = null;
  if (request.method === "POST") {
    try {
      const body = await request.clone().json();
      const first = Array.isArray(body) ? body[0] : body;
      if (typeof first?.id === "string" || typeof first?.id === "number") id = first.id;
    } catch {
      // Unparseable bodies are the transport's problem, not ours.
    }
  }

  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      id,
      error: {
        code: -32000,
        message:
          `MCP protocol revision ${requested} is not served by this endpoint; it serves the 2025-era revisions. ` +
          `Use the stateless v2 sidecar at ${V2_ENDPOINT}, which requires OMNIROUTE_MCP_V2=true.`,
        data: { requestedProtocolVersion: requested, modernEndpoint: V2_ENDPOINT },
      },
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

/**
 * Handle Streamable HTTP requests (POST / GET / DELETE).
 * Used by the Next.js route at /api/mcp/stream.
 */
export async function handleMcpStreamableHTTP(request: Request): Promise<Response> {
  const pointer = await modernProtocolPointer(request);
  if (pointer) return pointer;
  return protectMcpSseResponse(request, await handleStreamableRequest(request));
}

interface RpcRequest {
  method?: string;
  [key: string]: unknown;
}

/**
 * Handle SSE requests.
 * SSE transport is implemented via Streamable HTTP transport with GET for SSE stream
 * and POST for messages (the Streamable HTTP transport supports both patterns).
 */
export async function handleMcpSSE(request: Request): Promise<Response> {
  const pointer = await modernProtocolPointer(request);
  if (pointer) return pointer;
  if (request.method === "POST") {
    try {
      const body = await request.clone().json();
      const isInitialize = Array.isArray(body)
        ? body.some((req: RpcRequest) => req?.method === "initialize")
        : (body as RpcRequest)?.method === "initialize";

      if (isInitialize) {
        console.log("[MCP] New client initialize detected, resetting SSE singleton...");
        closeSseTransport();
      }
    } catch {}
  }
  const { transport } = ensureSseServer();

  try {
    const response = await withMcpHttpAuthContext(request, () =>
      handleRequestWithAuthInfo(transport, request)
    );
    return protectMcpSseResponse(request, response);
  } catch (err) {
    console.error("[MCP] SSE error:", err);
    return new Response(JSON.stringify({ error: "MCP SSE transport error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export function getMcpHttpStatus(): {
  online: boolean;
  transport: string | null;
  startedAt: number | null;
  uptime: string | null;
  sessionCount: number;
  oldestSessionAt: number | null;
  newestSessionAt: number | null;
} {
  const startedAts = Array.from(_streamableSessions.values(), (session) => session.startedAt);
  const streamableStartedAt = startedAts.length > 0 ? Math.min(...startedAts) : null;
  const newestSessionAt = startedAts.length > 0 ? Math.max(...startedAts) : null;
  const startedAt = streamableStartedAt ?? _sseStartedAt;
  const transport = _streamableSessions.size > 0 ? "streamable-http" : _sseTransport ? "sse" : null;
  const online = transport !== null;

  return {
    online,
    transport,
    startedAt,
    uptime: startedAt ? `${Math.floor((Date.now() - startedAt) / 1000)}s` : null,
    sessionCount: _streamableSessions.size,
    oldestSessionAt: streamableStartedAt,
    newestSessionAt,
  };
}

export function isMcpHttpTransportReady(
  enabled: boolean,
  transport: string | null | undefined
): boolean {
  return enabled && (transport === "sse" || transport === "streamable-http");
}

export function shutdownMcpHttp(): void {
  closeSseTransport();
  closeAllStreamableSessions();
  console.log("[MCP] HTTP transport shutdown");
}

export function isMcpHttpActive(): boolean {
  return _sseTransport !== null || _streamableSessions.size > 0;
}
