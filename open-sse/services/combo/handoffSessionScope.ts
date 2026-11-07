import { createHash } from "node:crypto";

/**
 * Session ids come from a client header or a content fingerprint, so two API
 * keys can end up with the same one. Rows in context_handoffs and
 * session_model_history are keyed by this scoped id instead, so one key can
 * never read or pre-seed another key's handoff summary or model history.
 * Requests without an API key share one fixed bucket.
 */
export function scopeHandoffSessionId(
  sessionId: string | null | undefined,
  apiKeyId: string | null | undefined
): string | null {
  if (!sessionId) return null;
  const owner = apiKeyId
    ? `k:${createHash("sha256").update(apiKeyId).digest("hex").slice(0, 16)}`
    : "anon";
  return `${owner}:${sessionId}`;
}
