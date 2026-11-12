export type Row = Record<string, unknown>;
export function record(value: unknown): value is Row {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** Explicit fields, including array-valued fields, retain canonical precedence. */
export function mergeConfig(legacy: unknown, canonical: unknown): unknown {
  if (record(legacy) && record(canonical)) {
    const merged = { ...legacy };
    for (const [key, value] of Object.entries(canonical)) {
      merged[key] = key in legacy ? mergeConfig(legacy[key], value) : value;
    }
    return merged;
  }
  return canonical;
}

type CollectionIdentity = (value: unknown) => string | undefined;
export const modelIdentity: CollectionIdentity = (value) => {
  if (typeof value === "string") return value.trim() || undefined;
  if (!record(value)) return undefined;
  for (const field of ["id", "name", "model"]) {
    if (typeof value[field] === "string" && value[field].trim()) return value[field].trim();
  }
  return undefined;
};

export function mergeCollection(
  legacy: unknown[],
  canonical: unknown[],
  identity: CollectionIdentity = modelIdentity,
  preferManual = false
): unknown[] {
  const result = [...canonical];
  for (const old of legacy) {
    const id = identity(old);
    const index = id === undefined ? -1 : result.findIndex((item) => identity(item) === id);
    if (index < 0) result.push(old);
    else if (record(old) && record(result[index])) {
      const current = result[index] as Row;
      result[index] =
        preferManual && old.source === "manual" && current.source !== "manual"
          ? mergeConfig(current, old)
          : mergeConfig(old, current);
    } else if (record(old) && !record(result[index])) {
      result[index] = old;
    }
  }
  return result;
}
