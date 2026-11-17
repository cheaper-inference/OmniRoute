/**
 * Per-request Muse Code client headers. The client sends one UUIDv7 session id, repeated as its
 * session, gateway session, thread and root session, for every turn of a session, plus a fresh
 * W3C traceparent per request. A request that carries its client's own session id keeps one
 * Muse session for that whole session; one without gets a fresh session, like a one-shot exec.
 */
import { randomBytes } from "node:crypto";
import { MUSE_CODE_CLIENT_SURFACE, museCodeClientUserAgent } from "../config/museCode.ts";
import { resolveOpencodeSessionIdentity } from "../utils/opencodeSessionIdentity.ts";

const MAX_SESSIONS = 1000;
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const sessions = new Map<string, { id: string; lastUsed: number }>();

/** RFC 9562 UUIDv7: 48-bit Unix milliseconds, version 7, variant 10, random tail. */
export function uuidV7(now: number = Date.now()): string {
  const bytes = randomBytes(16);
  bytes.writeUIntBE(now, 0, 6);
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** Reuses a live client session, refreshing its TTL and evicting the oldest excess entries. */
function sessionFor(clientSession: string | undefined, now: number): string {
  if (!clientSession) return uuidV7(now);
  const known = sessions.get(clientSession);
  if (known && now - known.lastUsed <= SESSION_TTL_MS) {
    known.lastUsed = now;
    sessions.delete(clientSession); // re-insert: Map order is the eviction order
    sessions.set(clientSession, known);
    return known.id;
  }
  const entry = { id: uuidV7(now), lastUsed: now };
  sessions.delete(clientSession);
  sessions.set(clientSession, entry);
  while (sessions.size > MAX_SESSIONS) sessions.delete(sessions.keys().next().value as string);
  return entry.id;
}

/**
 * The per-request Muse Code session and trace headers. `scope` keeps one client session from
 * sharing a Muse session across connections, which would link those accounts upstream.
 */
export function museCodeSessionHeaders(
  clientHeaders?: Record<string, string> | null,
  body?: unknown,
  scope: string = "",
  now: number = Date.now()
): Record<string, string> {
  const clientSession = resolveOpencodeSessionIdentity(clientHeaders, body);
  const session = sessionFor(clientSession && `${scope}\n${clientSession}`, now);
  return {
    "X-Tbh-Session-Id": session,
    "X-Meta-Ai-Gateway-Session-Id": session,
    "X-Tbh-Thread-Id": session,
    "X-Tbh-Root-Session-Id": session,
    "X-Tbh-Agent-Role": "main",
    traceparent: `00-${randomBytes(16).toString("hex")}-${randomBytes(8).toString("hex")}-01`,
  };
}

/** The whole client identity, for requests that do not go through the provider registry headers. */
export function museCodeClientHeaders(): Record<string, string> {
  return {
    "User-Agent": museCodeClientUserAgent(),
    "X-Client-Id": MUSE_CODE_CLIENT_SURFACE,
    ...museCodeSessionHeaders(),
  };
}

/** Clears cached client sessions so tests start without retained identities. */
export function __resetMuseCodeSessionsForTesting(): void {
  sessions.clear();
}
