/**
 * Shared refresh-policy helpers for Token Health Check + CredentialHealth.
 *
 * Kept tiny and dependency-free on purpose: CredentialHealth's sweep needs to
 * honor the OAuth refresh backoff window, but importing `tokenHealthCheck`
 * would pull in its module-level scheduler (which auto-starts timers).
 *
 * Moved verbatim out of `src/lib/tokenHealthCheck.ts`, which re-exports it for
 * existing callers and tests.
 */

export function isInRefreshBackoff(conn: any, nowMs: number): boolean {
  const until = conn?.providerSpecificData?.refreshCircuit?.until;
  if (typeof until !== "string") return false;
  const untilMs = new Date(until).getTime();
  return Number.isFinite(untilMs) && untilMs > nowMs;
}

// Lives in open-sse so open-sse/services/tokenRefresh.ts can use it without an open-sse -> src
// import; re-exported here for tokenHealthCheck and existing callers.
export { preservesRefreshTokenOnUnrecoverable } from "@omniroute/open-sse/services/refreshTokenPreservation.ts";
