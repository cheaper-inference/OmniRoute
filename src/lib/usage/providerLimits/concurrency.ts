/** Default chunk concurrency for non-OAuth connections in `syncAllProviderLimits()`. */
const DEFAULT_PROVIDER_LIMITS_CONCURRENCY = 5;

/**
 * Concurrency (chunk size) for non-OAuth (local/API-key) connections in
 * `syncAllProviderLimits()`. OAuth connections always run sequentially (chunk
 * size 1) regardless of this setting.
 *
 * Reads `PROVIDER_LIMITS_CONCURRENCY` (positive integer, default `5`).
 * Unset, non-integer, or non-positive values fall back to `5`.
 */
export function getProviderLimitsConcurrency(): number {
  const rawEnv = process.env.PROVIDER_LIMITS_CONCURRENCY;
  if (rawEnv === undefined) return DEFAULT_PROVIDER_LIMITS_CONCURRENCY;
  const trimmed = rawEnv.trim();
  if (!/^\d+$/.test(trimmed)) return DEFAULT_PROVIDER_LIMITS_CONCURRENCY;
  const parsed = Number.parseInt(trimmed, 10);
  return Number.isSafeInteger(parsed) && parsed >= 1
    ? parsed
    : DEFAULT_PROVIDER_LIMITS_CONCURRENCY;
}
