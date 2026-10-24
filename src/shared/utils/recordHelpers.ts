/**
 * Record coercion preserves object identity; it does not validate fields.
 * `asRecordOrNull` lets callers detect malformed data. `asRecord` supplies a
 * fresh empty object instead, so callers can safely read missing properties.
 * Substituting either fallback for the other changes caller behavior.
 * Arrays are excluded unless explicitly allowed by the guard or coercion.
 */

export type JsonRecord = Record<string, unknown>;

/** Record guard. Arrays excluded unless explicitly allowed. */
export function isRecord(
  value: unknown,
  options?: { allowArrays?: boolean }
): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  return options?.allowArrays === true ? true : !Array.isArray(value);
}

/** Coerce to a record or null. For callers that must detect malformed data. */
export function asRecordOrNull(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** Coerce to a record or a fresh empty object; arrays require opt-in. */
export function asRecord(
  value: unknown,
  options?: { allowArrays?: boolean }
): Record<string, unknown> {
  if (typeof value !== "object" || value === null) return {};
  if (options?.allowArrays !== true && Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}
