/**
 * Shared MCP JSON-RPC client for CLI commands.
 *
 * Talks to /api/mcp/stream (Streamable HTTP). Flow:
 *   1. POST initialize — kept so the CLI still works against today's
 *      sessionful server; a stateless handler does not need it but accepts it.
 *   2. POST notifications/initialized (best-effort; a stateless handler
 *      answers 202). Its failure never fails the tool call.
 *   3. POST tools/call — attaches Mcp-Session-Id only when initialize
 *      returned one. A missing session id is NOT an error.
 *   4. DELETE the session when we have one (tolerate 405 / already gone),
 *      only after the tools/call response has been fully read.
 *
 * Do NOT send MCP-Protocol-Version: this client negotiates 2024-11-05,
 * which predates that header. Adding it only creates a failure mode
 * (2026-07-28 without a modern envelope → 400). Future modern support
 * belongs in @modelcontextprotocol/client's versionNegotiation, not here.
 *
 * tools/call is never retried: a tool may have side effects, and a retry
 * after a timeout or 5xx would run it again.
 *
 * Error contract (callers depend on these shapes):
 *   - HTTP non-2xx → Error "MCP <method> failed: HTTP <status>[ — <body>]"
 *     with err.status (compression REST fallback keys off 404 / 501)
 *   - JSON-RPC error → Error "MCP error: <message>" with err.code
 *   - result.isError → Error "MCP error: <text>" with err.status 500
 *
 * Requests go through apiFetch so CLI auth, remote contexts and timeouts
 * match every other management API call.
 */
import { apiFetch } from "./api.mjs";

// Required by MCP Streamable HTTP for every POST.
export const MCP_ACCEPT = "application/json, text/event-stream";

const MCP_PATH = "/api/mcp/stream";

// Session teardown is housekeeping: the result is already in hand and the
// server's idle sweep reclaims abandoned sessions, so never wait long on it.
export const SESSION_DELETE_TIMEOUT_MS = 3000;

// notifications/cancelled after a tools/call deadline is best-effort too.
export const CANCEL_NOTIFY_TIMEOUT_MS = 1000;

const TOOL_CALL_ID = 2;

/**
 * A deadline for the whole tools/call. race() rejects with
 * "MCP tools/call timed out after <ms>ms" when it expires, and the signal
 * aborts the request and its body.
 */
function startDeadline(ms) {
  const controller = new AbortController();
  let expire;
  const expired = new Promise((_, reject) => {
    expire = reject;
  });
  const timer = setTimeout(() => {
    const err = mcpError(`MCP tools/call timed out after ${ms}ms`, { status: 504 });
    expire(err);
    controller.abort(err);
  }, ms);
  return {
    signal: controller.signal,
    race: (promise) => Promise.race([promise, expired]),
    clear: () => clearTimeout(timer),
  };
}

function mcpError(message, { status, code } = {}) {
  const err = new Error(message);
  if (status) err.status = status;
  if (code !== undefined) err.code = code;
  return err;
}

function sseData(line) {
  if (!line.startsWith("data:")) return null;
  const data = line.slice(5).trim();
  return data && data !== "[DONE]" ? data : null;
}

export async function readJsonRpcResponse(res) {
  if (!res.headers.get("content-type")?.toLowerCase().includes("text/event-stream")) {
    return res.json();
  }

  for (const line of (await res.text()).split("\n")) {
    const data = sseData(line);
    if (data) return JSON.parse(data);
  }
  throw mcpError("MCP response contained no JSON-RPC data frame", { status: 502 });
}

/**
 * Call an MCP tool over /api/mcp/stream.
 *
 * Non-stream: returns the JSON-RPC result payload.
 * Stream: writes SSE `data:` chunks to stdout (or options.onChunk) and
 * returns null on success.
 *
 * options.timeout / baseUrl / apiKey / context are forwarded to apiFetch,
 * so callers can override the active CLI context. options.timeout bounds each
 * request until its response headers arrive (undefined → OMNIROUTE_HTTP_TIMEOUT_MS,
 * else 30s); the session DELETE always uses SESSION_DELETE_TIMEOUT_MS.
 *
 * options.toolCallTimeout, when set to a number, replaces options.timeout for
 * tools/call only and limits the WHOLE call, from send until the JSON-RPC
 * result (or the last --stream frame) has been read, like the MCP SDK's
 * request timeout. 0 = no client-side deadline. undefined (or absent) = not
 * set: tools/call keeps options.timeout. On expiry a sessionful server is sent
 * a best-effort notifications/cancelled. `mcp call` uses it; other callers do not.
 */
export async function mcpCallTool(name, args = {}, options = {}) {
  const { timeout, baseUrl, apiKey, context } = options;
  const hasToolCallTimeout = options.toolCallTimeout !== undefined;
  let sessionId = null;

  const send = (init) =>
    apiFetch(MCP_PATH, {
      timeout,
      baseUrl,
      apiKey,
      context,
      acceptNotOk: true,
      ...init,
      headers: {
        Accept: MCP_ACCEPT,
        ...(sessionId ? { "Mcp-Session-Id": sessionId } : {}),
      },
    });

  const rpc = async (payload, init = {}) => {
    const res = await send({ method: "POST", body: payload, ...init });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const detail = text ? ` — ${text}` : "";
      throw mcpError(`MCP ${payload.method} failed: HTTP ${res.status}${detail}`, {
        status: res.status,
      });
    }
    return res;
  };

  const initRes = await rpc({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "omniroute-cli", version: "1.0" },
    },
  });

  // Sessionful servers return a session id; a stateless handler does not.
  sessionId = initRes.headers.get("mcp-session-id") || null;

  try {
    await send({
      method: "POST",
      body: { jsonrpc: "2.0", method: "notifications/initialized" },
      retry: false,
    });
  } catch {
    // best-effort: only tools/call reachability matters
  }

  // Armed only now, so the handshake never eats into the tool's time.
  const deadline = options.toolCallTimeout ? startDeadline(options.toolCallTimeout) : null;

  const callTool = async () => {
    const callRes = await rpc(
      { jsonrpc: "2.0", id: TOOL_CALL_ID, method: "tools/call", params: { name, arguments: args } },
      {
        retry: false,
        // With toolCallTimeout the deadline above replaces apiFetch's
        // headers-only timer, so it keeps running while the body is read.
        ...(hasToolCallTimeout ? { timeout: 0 } : {}),
        ...(deadline ? { signal: deadline.signal } : {}),
      }
    );

    if (options.stream) {
      // When a deadline expires, aborting the fetch also errors this body, so
      // the read stops. The session DELETE (finally, below) runs only after
      // the try block's await has seen every frame or the error.
      return consumeSse(callRes.body, options.onChunk);
    }

    const data = await readJsonRpcResponse(callRes);
    if (data.error) {
      throw mcpError(`MCP error: ${data.error.message || JSON.stringify(data.error)}`, {
        code: data.error.code,
      });
    }
    if (data.result?.isError) {
      const msg = data.result?.content?.[0]?.text || "unknown tool error";
      throw mcpError(`MCP error: ${msg}`, { status: 500 });
    }
    return data.result;
  };

  try {
    return await (deadline ? deadline.race(callTool()) : callTool());
  } catch (err) {
    if (deadline?.signal.aborted && sessionId) {
      // Best-effort, like the MCP SDK: tell the server to stop the tool. Only a
      // sessionful server can match the request id; a stateless one cannot.
      await send({
        method: "POST",
        body: {
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: { requestId: TOOL_CALL_ID, reason: err.message },
        },
        retry: false,
        timeout: CANCEL_NOTIFY_TIMEOUT_MS,
      }).catch(() => {});
    }
    throw err;
  } finally {
    deadline?.clear();
    if (sessionId) {
      // Tolerate 405 / network errors: the idle sweep reclaims the session anyway.
      await send({ method: "DELETE", retry: false, timeout: SESSION_DELETE_TIMEOUT_MS }).catch(
        () => {}
      );
    }
  }
}

async function consumeSse(body, onChunk) {
  if (!body) throw mcpError("MCP stream returned no body", { status: 500 });
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const write = onChunk ?? writeStdout;
  let buf = "";
  const flushLines = () => {
    let idx;
    while ((idx = buf.indexOf("\n")) >= 0) {
      const data = sseData(buf.slice(0, idx));
      buf = buf.slice(idx + 1);
      if (data) write(data);
    }
  };
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    flushLines();
  }
  buf += decoder.decode();
  flushLines();
  return null;
}

function writeStdout(raw) {
  process.stdout.write(raw + "\n");
}
