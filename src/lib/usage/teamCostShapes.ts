export type TeamCostShape = {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
  reasoning: number;
};

const isCount = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;

/** A shape key is a JSON array of exactly five non-negative safe integers. */
function parseShapeKey(key: string): TeamCostShape | null {
  const values: unknown = JSON.parse(key);
  if (!Array.isArray(values) || values.length !== 5 || !values.every(isCount)) return null;
  const [input, output, cacheRead, cacheCreation, reasoning] = values as number[];
  return { input, output, cacheRead, cacheCreation, reasoning };
}

// Retained buckets must describe every counted request. A partial or malformed
// shape map is no more authoritative than a legacy bucket with no shape map.
export function parseShapeCounts(
  value: string | null | undefined,
  expectedRequests: number
): Array<{ shape: TeamCostShape; count: number }> {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return [];
    const result: Array<{ shape: TeamCostShape; count: number }> = [];
    let total = 0;
    for (const [key, count] of Object.entries(parsed)) {
      const shape = isCount(count) ? parseShapeKey(key) : null;
      if (!shape) return [];
      total += count as number;
      if (!Number.isSafeInteger(total)) return [];
      if ((count as number) > 0) result.push({ shape, count: count as number });
    }
    return total === expectedRequests ? result : [];
  } catch {
    return [];
  }
}
