/**
 * Resolve a TTL (in milliseconds) from a minutes-valued environment variable.
 *
 * Unset / blank / NaN / non-positive values fall back to `defaultMinutes`, so a
 * typo'd env var can never silently disable the TTL or turn it negative.
 */
export function resolveTtlMsFromEnv(
  envVarName: string,
  defaultMinutes: number
): number {
  const raw = process.env[envVarName];
  const parsed = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed * 60 * 1000 : defaultMinutes * 60 * 1000;
}
