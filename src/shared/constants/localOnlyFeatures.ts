/**
 * Dashboard features that only work from the machine (or private network) OmniRoute runs on.
 *
 * Each entry is the API path a dashboard surface asks first. The server layout checks every
 * one against the real route guard (`resolveDashboardLocalAccess`) and tells the client which
 * ones the session cannot reach, so a remote dashboard shows `<LocalOnlyNotice />` instead of
 * sending a request that can only come back 403.
 *
 * A new surface over a local-only endpoint: add its path here, then read
 * `useLocalOnlyBlocked(path)`. Paths must be literal request paths, without a query string.
 * Client-safe on purpose: this module must not import the route guard.
 */
export const LOCAL_ONLY_DASHBOARD_PATHS = [
  "/api/resilience/connections",
  "/api/skills/executions",
  "/api/db/health",
  "/api/plugins",
  "/api/tools/traffic-inspector/capture-modes",
  "/api/services/cliproxy/status",
  "/api/services/9router/status",
  "/api/services/mux/status",
  "/api/services/bifrost/status",
  "/api/services/dario/status",
  "/api/services/openwa/status",
  "/api/services/llmlingua/status",
  "/api/services/opencode-server/status",
  "/api/services/singbox/status",
] as const;

/**
 * Where the dashboard session comes from, as far as the server can tell before any request:
 * "local" (loopback or private network), "remote", or "unknown" when the trusted signal
 * cannot decide (the first rejected request settles it).
 */
export type LocalAccessLocality = "local" | "remote" | "unknown";

export interface LocalOnlyAccessSnapshot {
  locality: LocalAccessLocality;
  /** The registered paths the route guard rejects for a session that is not local. */
  remoteBlockedPaths: readonly string[];
}

/** What a surface assumes with no server answer: ask, and let the response decide. */
export const UNKNOWN_LOCAL_ONLY_ACCESS: LocalOnlyAccessSnapshot = {
  locality: "unknown",
  remoteBlockedPaths: [],
};
