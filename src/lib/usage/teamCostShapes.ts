export type TeamCostShape = {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
  reasoning: number;
  providerCostUsd?: number;
  calculatedCostUsd?: number;
  endpoint?: string | null;
  billingUnit?: string | null;
};

const isCount = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;

const isCost = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

/** Legacy token shapes have five fields; billing shapes append cost provenance and unit. */
function parseShapeKey(key: string): TeamCostShape | null {
  const values: unknown = JSON.parse(key);
  if (
    !Array.isArray(values) ||
    ![5, 9].includes(values.length) ||
    !values.slice(0, 5).every(isCount)
  )
    return null;
  const [input, output, cacheRead, cacheCreation, reasoning] = values.slice(0, 5) as number[];
  const shape: TeamCostShape = { input, output, cacheRead, cacheCreation, reasoning };
  if (values.length === 9) {
    const [reported, calculated, endpoint, unit] = values.slice(5);
    if (
      ![reported, calculated].every((v) => v === null || isCost(v)) ||
      ![endpoint, unit].every((v) => v === null || typeof v === "string")
    )
      return null;
    if (reported !== null) shape.providerCostUsd = reported as number;
    if (calculated !== null) shape.calculatedCostUsd = calculated as number;
    shape.endpoint = endpoint as string | null;
    shape.billingUnit = unit as string | null;
  }
  return shape;
}

// Retained buckets must describe every counted request. A partial or malformed
// shape map is no more authoritative than a legacy bucket with no shape map.
export function parseShapeCounts(
  value: string | null | undefined,
  expectedRequests: number
): Array<{ shape: TeamCostShape; count: number }> {
  const result = parseBillingShapeCounts(value, expectedRequests);
  return result.unpricedRequests ? [] : result.entries;
}

/** Keep measured new costs when an older bucket lacks reconstructible token shapes. */
export function parseBillingShapeCounts(
  value: string | null | undefined,
  expectedRequests: number
): {
  entries: Array<{ shape: TeamCostShape; count: number }>;
  unpricedRequests: number;
  invalid?: boolean;
} {
  const missing = { entries: [], unpricedRequests: Math.max(0, expectedRequests) };
  const invalid = { ...missing, invalid: true };
  if (!isCount(expectedRequests)) return invalid;
  if (!value) return missing;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return invalid;
    const result: Array<{ shape: TeamCostShape; count: number }> = [];
    let total = 0;
    let unpricedRequests = 0;
    let corrupt = false;
    for (const [key, count] of Object.entries(parsed)) {
      if (!isCount(count)) return invalid;
      total += count as number;
      if (!Number.isSafeInteger(total)) return invalid;
      if (key === "legacy_unpriced" || key === "legacy_invalid") {
        unpricedRequests += count;
        corrupt ||= key === "legacy_invalid" && count > 0;
        continue;
      }
      const shape = parseShapeKey(key);
      if (!shape) return invalid;
      if ((count as number) > 0) result.push({ shape, count: count as number });
    }
    return total === expectedRequests
      ? { entries: result, unpricedRequests, ...(corrupt ? { invalid: true } : {}) }
      : invalid;
  } catch {
    return invalid;
  }
}
