/**
 * Token-expiry parsing shared by the engine and the app. Lives in open-sse so engine modules
 * (passive Codex reread) need no src/ import; src/lib/tokenHealthCheckExpiry.ts re-exports it.
 */
const NUMERIC_STRING = /^\d+(\.\d+)?$/;

/**
 * Normalize any stored token-expiry value to epoch milliseconds.
 *
 * `provider_connections.expires_at` / `token_expires_at` are TEXT columns, so a
 * numeric epoch written by an external sync tool reads back as a *string* —
 * and `new Date("1789012345678")` is an Invalid Date. Both numeric shapes are
 * accepted here with the seconds/ms heuristic the Copilot path already used,
 * before falling back to `Date` for ISO 8601 and other date strings.
 *
 * @returns epoch ms, or 0 when the value carries no usable time
 */
export function parseTokenExpiryMs(expiresAt: unknown): number {
  if (typeof expiresAt === "number") return epochToMs(expiresAt);
  if (typeof expiresAt === "string") return parseExpiryString(expiresAt.trim());
  return 0;
}

/** Seconds/ms heuristic for a numeric epoch; 0 for non-finite or non-positive values. */
function epochToMs(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return value < 1e12 ? value * 1000 : value;
}

/** A trimmed stored string: numeric epoch first, then any `Date`-parsable text. */
function parseExpiryString(trimmed: string): number {
  if (!trimmed) return 0;
  if (NUMERIC_STRING.test(trimmed)) return epochToMs(Number(trimmed));
  const parsed = new Date(trimmed).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}
