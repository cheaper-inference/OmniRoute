// Per-session activity for Streamable HTTP sessions, owned by the transport
// layer in httpTransport.ts. Two counters keep the idle sweep honest:
//   - inflight:    requests currently being handled (POST/GET/DELETE);
//   - openStreams: SSE streams (GET) currently open.
// The sweep in httpTransport.ts leaves a session open while either counter is
// above zero, so a long-lived stream or a running tool call is never reaped
// mid-flight. This lives apart from httpTransport.ts so the module stays
// importable without pulling the transport (which imports server.ts, which
// imports the tools) into the graph.
//
// Both maps are bounded: keys are dropped when their counters reach zero and
// purged when the owning session is closed (purgeStreamableActivity).

const inflightBySession = new Map<string, number>();
const openStreamsBySession = new Map<string, number>();

function adjust(map: Map<string, number>, sessionId: string, delta: 1 | -1): void {
  const next = (map.get(sessionId) ?? 0) + delta;
  if (next > 0) map.set(sessionId, next);
  else map.delete(sessionId);
}

/** Track a request entering or leaving the transport for a session. */
export function noteStreamableInflight(sessionId: string, delta: 1 | -1): void {
  if (!sessionId) return;
  adjust(inflightBySession, sessionId, delta);
}

/** Track an SSE stream opening or closing for a session. */
export function noteStreamableOpenStream(sessionId: string, delta: 1 | -1): void {
  if (!sessionId) return;
  adjust(openStreamsBySession, sessionId, delta);
}

/** Live activity counters for a session (zero when idle). */
export function streamableActivity(sessionId: string): {
  inflight: number;
  openStreams: number;
} {
  return {
    inflight: inflightBySession.get(sessionId) ?? 0,
    openStreams: openStreamsBySession.get(sessionId) ?? 0,
  };
}

/** Drop all counters for a session being closed or purged. */
export function purgeStreamableActivity(sessionId: string): void {
  inflightBySession.delete(sessionId);
  openStreamsBySession.delete(sessionId);
}
