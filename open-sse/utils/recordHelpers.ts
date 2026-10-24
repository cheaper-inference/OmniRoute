
export type JsonRecord = Record<string, unknown>;

export function isRecord(value: unknown): value is Record<string, unknown>;
export function isRecord(
  value: unknown,
  options: { allowArrays?: boolean }
): value is Record<string, unknown>;
export function isRecord(
  value: unknown,
  options?: { allowArrays?: boolean }
): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  return options?.allowArrays === true ? true : !Array.isArray(value);
}

export function asRecordOrNull(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function asRecord(value: unknown): Record<string, unknown>;
export function asRecord(
  value: unknown,
  options: { allowArrays?: boolean }
): Record<string, unknown>;
export function asRecord(
  value: unknown,
  options?: { allowArrays?: boolean }
): Record<string, unknown> {
  if (typeof value !== "object" || value === null) return {};
  if (options?.allowArrays !== true && Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

export const toRecord = asRecord;
