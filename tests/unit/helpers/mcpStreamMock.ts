export const MCP_MOCK_SESSION_ID = "sess-test";

// Minimal fetch mock responses that satisfy what apiFetch needs.
export function makeMcpResp(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(typeof data === "string" ? data : JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

function makeMcpError(message: string, status: number) {
  return makeMcpResp({ jsonrpc: "2.0", error: { code: -32000, message }, id: null }, status);
}

export function makeMcpSseResp(data: unknown, headers: Record<string, string> = {}) {
  return new Response(`event: message\ndata: ${JSON.stringify(data)}\n\n`, {
    headers: { "content-type": "text/event-stream", ...headers },
  });
}

export type McpStreamSessionMode = "session" | "stateless";

export type FetchInput = string | URL | Request;

export interface JsonRpcMessage {
  jsonrpc?: string;
  id?: number | string | null;
  method?: string;
  params?: { name?: string; arguments?: unknown; [key: string]: unknown };
}

/** One request the CLI sent, decoded from apiFetch's (url, init) pair. */
export interface McpFetchCall {
  url: string;
  method: string;
  headers: Headers;
  body: JsonRpcMessage | null;
  signal: AbortSignal | null;
}

export function toMcpFetchCall(input: FetchInput, init?: RequestInit): McpFetchCall {
  const raw = typeof init?.body === "string" ? init.body : "";
  return {
    url: input instanceof Request ? input.url : String(input),
    method: String(init?.method ?? "GET").toUpperCase(),
    headers: new Headers(init?.headers),
    body: raw ? (JSON.parse(raw) as JsonRpcMessage) : null,
    signal: init?.signal ?? null,
  };
}

/** JSON-RPC methods (plus "DELETE" for session teardown) in send order. */
export function rpcSequence(calls: McpFetchCall[]): string[] {
  return calls.map((c) => (c.method === "DELETE" ? "DELETE" : (c.body?.method ?? c.method)));
}

export interface McpStreamFetchOptions {
  toolResult?: unknown;
  sessionMode?: McpStreamSessionMode;
  /** Every request is appended here before it is answered. */
  calls?: McpFetchCall[];
  /** Return a Response to override the default answer for a request. */
  onRequest?: (call: McpFetchCall) => Response | Promise<Response> | undefined;
}

/**
 * Fetch mock for /api/mcp/stream.
 *
 * sessionMode:
 *   - "session" (default): initialize returns mcp-session-id; subsequent
 *     POSTs require it (today's sessionful server).
 *   - "stateless": initialize returns no session header and nothing checks
 *     for one; DELETE answers 405 like a stateless handler.
 */
export function makeMcpStreamFetch({
  toolResult = { content: [{ type: "text", text: "ok" }] },
  sessionMode = "session",
  calls,
  onRequest,
}: McpStreamFetchOptions = {}) {
  const fetchMock = async (input: FetchInput, init?: RequestInit): Promise<Response> => {
    const call = toMcpFetchCall(input, init);
    calls?.push(call);
    if (!call.url.includes("/api/mcp/stream")) {
      return makeMcpResp({ error: "not found" }, 404);
    }

    const override = await onRequest?.(call);
    if (override) return override;

    if (call.method === "DELETE") {
      return sessionMode === "stateless"
        ? makeMcpResp({ error: "Method Not Allowed" }, 405)
        : makeMcpResp({}, 200);
    }

    const accept = call.headers.get("accept") ?? "";
    if (!accept.includes("application/json") || !accept.includes("text/event-stream")) {
      return makeMcpError(
        "Not Acceptable: Client must accept both application/json and text/event-stream",
        406
      );
    }

    const body = call.body ?? {};
    if (body.method === "initialize") {
      return makeMcpSseResp(
        {
          jsonrpc: "2.0",
          id: body.id,
          result: { protocolVersion: "2024-11-05", capabilities: {} },
        },
        sessionMode === "session" ? { "mcp-session-id": MCP_MOCK_SESSION_ID } : {}
      );
    }

    if (body.method === "notifications/initialized") {
      return makeMcpResp({}, 202);
    }

    if (sessionMode === "session" && call.headers.get("mcp-session-id") !== MCP_MOCK_SESSION_ID) {
      return makeMcpError("Bad Request: Mcp-Session-Id header is required", 400);
    }

    if (body.method === "tools/call") {
      return makeMcpSseResp({ jsonrpc: "2.0", id: body.id, result: toolResult });
    }

    return makeMcpResp({ error: "unknown method" }, 400);
  };
  return fetchMock as typeof globalThis.fetch;
}
