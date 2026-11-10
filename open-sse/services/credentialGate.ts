/**
 * Fast Credential Gate
 *
 * Pre-checks credential health before combo dispatch.
 * Uses in-memory cache (<1ms lookup) to skip targets with
 * known-bad credentials instead of waiting for a network timeout.
 *
 * Integration point: combo.ts handleComboChat(), before
 * handleSingleModelWrapped() at line ~2162.
 *
 * Health status is populated by the background scheduler
 * (credentialHealth/scheduler.ts) which periodically calls
 * testSingleConnection() for all connections.
 */

import {
  isCredentialHealthy,
  isCredentialStale,
  getCredentialHealth,
  INVALID_CREDENTIAL_DIAGNOSES,
  getCredentialHealthSummary,
} from "@/lib/credentialHealth/cache";

// Only fixed, internal diagnostic codes may appear in gate skip logs. A valid
// enum-shaped but unrecognized upstream payload must never be logged verbatim.
const SAFE_INCONCLUSIVE_PROBE_DIAGNOSES: ReadonlySet<string> = new Set([
  "upstream_ambiguous_auth_or_quota",
  "provider_error",
  "runtime_error",
  "validation_error",
  "unsupported",
  "unknown",
]);

export interface CredentialGateResult {
  /** true = healthy, false = skip (bad), undefined = unknown */
  allowed: boolean | undefined;
  /** Human-readable reason if skipped */
  reason?: string;
}

/**
 * Fast pre-check before dispatching to a combo target.
 *
 * @param connectionId - The connection ID to check
 * @param provider - Provider identifier (for logging)
 * @param modelStr - Model string (for logging)
 * @returns CredentialGateResult
 *
 * Returns { allowed: undefined } if no cached data exists — the
 * caller can still allow the request but should log a warning.
 */
export function checkCredentialGate(
  connectionId: string,
  provider: string,
  modelStr: string
): CredentialGateResult {
  // 1. Check cache (sub-millisecond)
  const healthy = isCredentialHealthy(connectionId);

  if (healthy === false) {
    const rawType = getCredentialHealth(connectionId)?.lastErrorType;
    // A valid-looking code could still carry untrusted provider content.
    // Only emit exact internal diagnosis enum values; never raw probe errors.
    const diagnosis =
      typeof rawType === "string" &&
      (INVALID_CREDENTIAL_DIAGNOSES.has(rawType) || SAFE_INCONCLUSIVE_PROBE_DIAGNOSES.has(rawType))
        ? rawType
        : "unknown";
    const knownBad = INVALID_CREDENTIAL_DIAGNOSES.has(diagnosis);
    const verdict = knownBad ? "has known-bad credentials" : "has a failed health probe";
    const prefix = `Credential gate: ${modelStr} — connection ${connectionId}`;
    return {
      allowed: false,
      reason: `${prefix} ${verdict} (diagnosis: ${diagnosis}; skipping)`,
    };
  }

  if (healthy === true) {
    return { allowed: true };
  }

  // 2. Unknown — check if stale
  const stale = isCredentialStale(connectionId);
  if (stale) {
    // Allow but log warning — credentials haven't been tested recently
    return {
      allowed: undefined,
      reason: `Credential gate: ${modelStr} — connection ${connectionId} has stale credentials (allowing, but untested for >10m)`,
    };
  }

  // Not in cache at all — allow (optimistic)
  return { allowed: undefined };
}

/**
 * Log a credential gate skip event.
 * This emits a structured warning for observability.
 */
export function logCredentialSkip(log: any, modelStr: string, reason: string): void {
  if (log?.info) {
    log.info("CREDENTIAL_GATE", reason);
  }
}

// Re-export cache functions for convenience
export { getCredentialHealthSummary } from "@/lib/credentialHealth/cache";
