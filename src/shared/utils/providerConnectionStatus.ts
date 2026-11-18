export interface PrefixShadowedDiagnostic {
  code: "prefix_shadowed";
  message: string;
  prefix?: string;
  builtinProvider?: string;
}

export interface ProviderConnectionStatusLike {
  prefixShadowed?: PrefixShadowedDiagnostic | null;
  isActive?: boolean | null;
  testStatus?: string | null;
  rateLimitedUntil?: string | number | Date | null;
}

const CONNECTED_STATUSES = new Set(["active", "success", "unknown"]);
const ERROR_STATUSES = new Set(["error", "expired", "unavailable", "prefix_shadowed"]);

export function getEffectiveProviderConnectionStatus(
  connection: ProviderConnectionStatusLike,
  now = Date.now()
): string {
  if (connection.prefixShadowed?.code === "prefix_shadowed") return "prefix_shadowed";
  const status = connection.testStatus || "unknown";
  if (status !== "unavailable") return status;

  const rawCooldownUntil = connection.rateLimitedUntil;
  const cooldownUntil =
    rawCooldownUntil instanceof Date
      ? rawCooldownUntil.getTime()
      : typeof rawCooldownUntil === "string" || typeof rawCooldownUntil === "number"
        ? new Date(rawCooldownUntil).getTime()
        : Number.NaN;
  const isCoolingDown = Number.isFinite(cooldownUntil) && cooldownUntil > now;
  return isCoolingDown ? status : "active";
}

export function isProviderConnectionConnected(
  connection: ProviderConnectionStatusLike,
  now = Date.now()
): boolean {
  return (
    connection.isActive !== false &&
    CONNECTED_STATUSES.has(getEffectiveProviderConnectionStatus(connection, now))
  );
}

export function isProviderConnectionErrored(
  connection: ProviderConnectionStatusLike,
  now = Date.now()
): boolean {
  return (
    connection.isActive !== false &&
    ERROR_STATUSES.has(getEffectiveProviderConnectionStatus(connection, now))
  );
}

export type ProviderHealth = "active" | "error" | "idle";

/**
 * Aggregate one provider's connections into a single health state for
 * status/topology nodes: any healthy connection wins, otherwise any errored
 * connection, otherwise idle.
 *
 * Takes the connection list so callers never pass `Array#some` directly —
 * `some` forwards the array index as the second argument, which the per-
 * connection helpers would read as `now` and pin an expired cooldown to
 * "still errored".
 */
export function getProviderHealth(
  connections: readonly ProviderConnectionStatusLike[],
  now = Date.now()
): ProviderHealth {
  let errored = false;
  for (const connection of connections) {
    if (isProviderConnectionConnected(connection, now)) return "active";
    if (isProviderConnectionErrored(connection, now)) errored = true;
  }
  return errored ? "error" : "idle";
}
