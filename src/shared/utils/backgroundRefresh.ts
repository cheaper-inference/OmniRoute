/**
 * Whether this runtime may start a background network refresh (a client-version lookup
 * against GitHub or the npm registry).
 *
 * Only a server process may. The provider registry and the client-identity constants are
 * also bundled into the dashboard, and Next.js gives browser code a `process` object, so a
 * `typeof process` check alone lets every page load fire anonymous lookups from the
 * viewer's browser: they spend the per-IP GitHub API budget the server's own refresh needs
 * and surface as "403 rate limit exceeded" in the console. A browser has no use for the
 * result — the versions only shape headers on upstream requests, which the server sends.
 */
/**
 * How long a sync getter waits before re-trying a background version lookup that failed
 * (network error, non-2xx, unparseable payload). A failure caches nothing, and the getters
 * run per upstream request, so without a wait a down or rate-limited registry is asked on
 * every request. A lookup that answered (newer or not) waits the module's own cache TTL.
 */
export const BACKGROUND_REFRESH_RETRY_AFTER_FAILURE_MS = 15 * 60 * 1000;

export function canStartBackgroundRefresh(): boolean {
  if (typeof window !== "undefined") return false;
  return typeof process !== "undefined";
}
