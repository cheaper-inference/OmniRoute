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
export function canStartBackgroundRefresh(): boolean {
  if (typeof window !== "undefined") return false;
  return typeof process !== "undefined";
}
