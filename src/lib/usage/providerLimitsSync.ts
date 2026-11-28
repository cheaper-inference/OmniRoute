/**
 * Cadence settings for the provider-limits sweep.
 *
 * These are pure environment reads with no state of their own, kept beside the sweep
 * rather than inside it so the limits module stays under the file-size ratchet.
 */

const DEFAULT_PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES = 70;

export function getProviderLimitsSyncIntervalMinutes(): number {
  const raw = Number.parseInt(process.env.PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES ?? "", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES;
}

export function getProviderLimitsSyncIntervalMs(): number {
  return getProviderLimitsSyncIntervalMinutes() * 60 * 1000;
}

/** Default gap (ms) inserted between two consecutive OAuth quota fetches. */
const DEFAULT_PROVIDER_LIMITS_SYNC_SPACING_MS = 1500;

/**
 * Spacing (ms) applied between consecutive provider-limits fetch batches in a
 * bulk sync, for BOTH the OAuth and local/API-key paths.
 *
 * OAuth providers (Codex/Claude/Kimi-coding/…) are fetched ONE AT A TIME with
 * this gap so a single host never bursts several simultaneous usage/refresh
 * requests to the same upstream — bursts read as automated traffic and
 * contribute to session termination / anomaly flags (and, for rotating-token
 * providers, to the Auth0 family-revocation race). Local/API-key connections
 * (e.g. Ollama) keep their fast in-chunk concurrent path, but the gap is now
 * also applied BETWEEN concurrency chunks so a local endpoint isn't hit by a
 * simultaneous refresh burst either (#6916). Tunable via
 * `PROVIDER_LIMITS_SYNC_SPACING_MS`; set to `"0"` to opt out on either path.
 */
export function getProviderLimitsSyncSpacingMs(): number {
  const rawEnv = process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
  if (rawEnv === undefined || rawEnv === "") return DEFAULT_PROVIDER_LIMITS_SYNC_SPACING_MS;
  const raw = Number(rawEnv);
  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_PROVIDER_LIMITS_SYNC_SPACING_MS;
}
