/**
 * Consented lending: how much a key may use above its own share in one dimension.
 *
 * Pure functions with no imports. A key's share is its effective weight times the
 * dimension's effective limit. Another key lends its active percentage of its idle
 * share, and what other keys already took above their shares is subtracted. The
 * requester's own consent never counts, and unallocated capacity is not lendable.
 */

export interface ConsentAllocation {
  apiKeyId: string;
  weight: number;
  lendingPercent?: number;
  lendingUntil?: number | null;
}

export interface BorrowAvailableInput {
  allocations: ReadonlyArray<ConsentAllocation>;
  requesterKeyId: string;
  /** Effective limit of the dimension (plan limit x accounts). */
  limit: number;
  /** Consumption per key in the dimension's unit. A missing key counts as 0. */
  consumedByKey: Readonly<Record<string, number>>;
  nowMs: number;
}

/** 0 for a value that is not a finite number above 0. Otherwise the value. */
function finitePositive(value: number | undefined): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * 0 when the percentage is not above 0, or the deadline is at or before nowMs, or the deadline
 * is set but not a finite number. Otherwise the percentage, capped at 100. A null or absent
 * deadline means no end.
 */
export function activeLendingPercent(
  alloc: Pick<ConsentAllocation, "lendingPercent" | "lendingUntil">,
  nowMs: number
): number {
  const percent = finitePositive(alloc.lendingPercent);
  if (percent === 0) return 0;
  const until = alloc.lendingUntil;
  if (until === null || until === undefined) return Math.min(100, percent);
  if (!Number.isFinite(until) || until <= nowMs) return 0;
  return Math.min(100, percent);
}

/**
 * The weights the gate applies: each key's own, or 100 / n for every key when none is positive.
 * A weight that is not a finite number counts as 0.
 */
export function effectiveWeights(allocations: ReadonlyArray<{ weight: number }>): number[] {
  const weights = allocations.map((a) => (Number.isFinite(a.weight) ? a.weight : 0));
  const total = weights.reduce((sum, w) => sum + w, 0);
  if (total > 0) return weights;
  return weights.map(() => 100 / allocations.length);
}

/** True when a key other than the requester has an active consent. */
export function hasActiveLender(
  allocations: ReadonlyArray<ConsentAllocation>,
  requesterKeyId: string,
  nowMs: number
): boolean {
  return allocations.some(
    (alloc) => alloc.apiKeyId !== requesterKeyId && activeLendingPercent(alloc, nowMs) > 0
  );
}

export function computeBorrowAvailable(input: BorrowAvailableInput): number {
  const limit = finitePositive(input.limit);
  const weights = effectiveWeights(input.allocations);
  let lendable = 0;
  let othersExcess = 0;
  input.allocations.forEach((alloc, i) => {
    if (alloc.apiKeyId === input.requesterKeyId) return;
    const share = (weights[i] / 100) * limit;
    const consumed = finitePositive(input.consumedByKey[alloc.apiKeyId]);
    lendable += (activeLendingPercent(alloc, input.nowMs) / 100) * Math.max(0, share - consumed);
    othersExcess += Math.max(0, consumed - share);
  });
  return Math.max(0, lendable - othersExcess);
}
