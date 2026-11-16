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

type BillingShapeEntry = { shape: TeamCostShape; count: number };
type BillingShapeAccumulator = {
  entries: BillingShapeEntry[];
  total: number;
  unpricedRequests: number;
  corrupt: boolean;
};

/** Validate one retained count without allowing malformed history to look free. */
function addBillingShape(state: BillingShapeAccumulator, key: string, count: unknown): boolean {
  if (!isCount(count)) return false;
  state.total += count;
  if (!Number.isSafeInteger(state.total)) return false;
  if (key === "legacy_unpriced" || key === "legacy_invalid") {
    state.unpricedRequests += count;
    state.corrupt ||= key === "legacy_invalid" && count > 0;
    return true;
  }
  const shape = parseShapeKey(key);
  if (!shape) return false;
  if (count > 0) state.entries.push({ shape, count });
  return true;
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
    const state: BillingShapeAccumulator = {
      entries: [],
      total: 0,
      unpricedRequests: 0,
      corrupt: false,
    };
    for (const [key, count] of Object.entries(parsed)) {
      if (!addBillingShape(state, key, count)) return invalid;
    }
    return state.total === expectedRequests
      ? {
          entries: state.entries,
          unpricedRequests: state.unpricedRequests,
          ...(state.corrupt ? { invalid: true } : {}),
        }
      : invalid;
  } catch {
    return invalid;
  }
}
