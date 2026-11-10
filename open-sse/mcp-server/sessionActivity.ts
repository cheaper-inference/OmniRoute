// Tool calls still running per Streamable HTTP session. The idle sweep in
// httpTransport.ts leaves a session open while its count is above zero.
// This lives apart from httpTransport.ts so a tool can mark its session busy
// without importing the transport, which imports server.ts, which imports
// the tools (an import cycle).
const activeBySession = new Map<string, number>();

export function markStreamableSessionBusy(sessionId: string | undefined, busy: boolean): void {
  if (!sessionId) return;
  const next = (activeBySession.get(sessionId) ?? 0) + (busy ? 1 : -1);
  if (next > 0) activeBySession.set(sessionId, next);
  else activeBySession.delete(sessionId);
}

export function activeStreamableRequests(sessionId: string): number {
  return activeBySession.get(sessionId) ?? 0;
}
