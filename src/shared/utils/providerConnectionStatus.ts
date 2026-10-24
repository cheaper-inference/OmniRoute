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
