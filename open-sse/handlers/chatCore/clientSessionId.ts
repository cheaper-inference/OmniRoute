/**
 * The client's own session id for a call-log row (call_logs.client_session_id).
 *
 * opencode sends `x-opencode-session`, Claude Code `x-claude-code-session-id` (or
 * `metadata.user_id.session_id` in the body), Codex `session_id` — the same ids those tools
 * report for their sessions, so an operator (or a terminal multiplexer that tracks agent
 * sessions) can join call-log rows to the session that sent them. `resolveClientSessionId`
 * already knows those headers for conversation tracking; this adapts it to the
 * `clientRawRequest` snapshot that reaches attempt logging, whose `headers` is a plain record
 * (see src/sse/handlers/chat/clientRawRequest.ts) rather than a `Headers` instance.
 *
 * Never throws: a malformed header record or body yields null, and logging carries on.
 */
import { resolveClientSessionId } from "../../services/conversationTracker.ts";

type RawRequestLike = { endpoint?: string; headers?: unknown; body?: unknown } | null | undefined;

function toHeaders(record: unknown): Headers | null {
  if (!record || typeof record !== "object") return null;
  const headers = new Headers();
  for (const [name, value] of Object.entries(record as Record<string, unknown>)) {
    if (typeof value !== "string") continue;
    try {
      headers.set(name, value);
    } catch {
      // An invalid header name or value cannot be a session id; skip it.
    }
  }
  return headers;
}

export function clientSessionIdFromRawRequest(clientRawRequest: RawRequestLike): string | null {
  if (!clientRawRequest || typeof clientRawRequest !== "object") return null;
  try {
    return resolveClientSessionId(toHeaders(clientRawRequest.headers), clientRawRequest.body);
  } catch {
    return null;
  }
}
