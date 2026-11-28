/**
 * Consent gate: when the quota-share gate must look at other keys, and what they lend.
 *
 * A pool in saturation mode gets an empty field here and no store read, so the gate keeps
 * its existing rules. In consent mode every dimension gets a borrowAvailable figure. The
 * other keys are read only when a hard key is at its own share and another key lends,
 * because no other case can change the decision. A failed read counts as zero consumption.
 */

import {
  computeBorrowAvailable,
  effectiveWeights,
  hasActiveLender,
  type ConsentAllocation,
} from "./consentBorrow";
import type { Policy } from "./dimensions";

export interface ConsentPoolLike {
  borrowMode?: string;
  allocations: ConsentAllocation[];
}

export interface ConsentBorrowField {
  borrowAvailable?: number;
}

export interface CountableBorrowInput {
  pool: ConsentPoolLike;
  requesterKeyId: string;
  policy: Policy;
  /** Effective limit of the dimension (plan limit x accounts). */
  limit: number;
  consumedThisKey: number;
  nowMs: number;
  peek: (apiKeyId: string) => Promise<number>;
}

export function isConsentPool(pool: { borrowMode?: string }): boolean {
  return pool.borrowMode === "consent";
}

/** Only a hard key is limited by what others lend. Soft and burst keep their own rules. */
function lendingApplies(policy: Policy): boolean {
  return policy !== "soft" && policy !== "burst";
}

/**
 * The field to spread into a dimension, or null when the pool must be read further.
 * Null only for a hard key in a consent pool where another key lends.
 */
function earlyField(
  pool: ConsentPoolLike,
  requesterKeyId: string,
  policy: Policy,
  nowMs: number
): ConsentBorrowField | null {
  if (!isConsentPool(pool)) return {};
  if (!lendingApplies(policy)) return { borrowAvailable: 0 };
  if (!hasActiveLender(pool.allocations, requesterKeyId, nowMs)) return { borrowAvailable: 0 };
  return null;
}

function ownShare(pool: ConsentPoolLike, requesterKeyId: string, limit: number): number {
  const index = pool.allocations.findIndex((a) => a.apiKeyId === requesterKeyId);
  if (index < 0) return 0;
  return (effectiveWeights(pool.allocations)[index] / 100) * limit;
}

async function safePeek(peek: (apiKeyId: string) => Promise<number>, apiKeyId: string) {
  try {
    return await peek(apiKeyId);
  } catch {
    return 0;
  }
}

/** {} for a saturation pool. Never throws: a failed read counts as 0. */
export async function countableConsentBorrow(
  input: CountableBorrowInput
): Promise<ConsentBorrowField> {
  const { pool, requesterKeyId, nowMs } = input;
  const early = earlyField(pool, requesterKeyId, input.policy, nowMs);
  if (early) return early;
  if (input.consumedThisKey < ownShare(pool, requesterKeyId, input.limit)) {
    return { borrowAvailable: 0 };
  }
  const others = pool.allocations.filter((a) => a.apiKeyId !== requesterKeyId);
  const values = await Promise.all(others.map((a) => safePeek(input.peek, a.apiKeyId)));
  const consumedByKey: Record<string, number> = { [requesterKeyId]: input.consumedThisKey };
  others.forEach((a, i) => {
    consumedByKey[a.apiKeyId] = values[i];
  });
  return {
    borrowAvailable: computeBorrowAvailable({
      allocations: pool.allocations,
      requesterKeyId,
      limit: input.limit,
      consumedByKey,
      nowMs,
    }),
  };
}

/** The requester alone, or every allocation when the pool is in consent mode and another key lends. */
export function attributionKeyIds(
  pool: ConsentPoolLike,
  requesterKeyId: string,
  nowMs: number
): string[] {
  if (isConsentPool(pool) && hasActiveLender(pool.allocations, requesterKeyId, nowMs)) {
    return pool.allocations.map((a) => a.apiKeyId);
  }
  return [requesterKeyId];
}

/** Percent dimensions: the attribution book already holds every key, so no read is added. */
export function percentConsentBorrow(input: {
  pool: ConsentPoolLike;
  requesterKeyId: string;
  policy: Policy;
  limit: number;
  consumedByKey: Readonly<Record<string, number>>;
  nowMs: number;
}): ConsentBorrowField {
  const { pool, requesterKeyId, nowMs } = input;
  const early = earlyField(pool, requesterKeyId, input.policy, nowMs);
  if (early) return early;
  return {
    borrowAvailable: computeBorrowAvailable({
      allocations: pool.allocations,
      requesterKeyId,
      limit: input.limit,
      consumedByKey: input.consumedByKey,
      nowMs,
    }),
  };
}
