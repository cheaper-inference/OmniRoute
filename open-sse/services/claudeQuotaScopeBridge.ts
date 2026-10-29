/**
 * Shared read-only adapter for the Claude quota scope that is persisted in
 * the application domain. All open-sse callers use this single boundary.
 *
 * #17043: avoid adding per-handler engine -> src dependencies. The combo
 * dispatcher already crossed this boundary; centralize that same lookup
 * instead of creating a second dependency edge in chatCore.
 */
export { getCachedClaudeQuotaScopeDecision } from "@/domain/quotaCache";
