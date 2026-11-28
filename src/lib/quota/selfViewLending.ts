/**
 * selfViewLending.ts: the lending fields of the self-service quota view.
 *
 * `selfLendingFields` reports the key's own consent and the pool's borrow mode. Consent counts as
 * active only in a consent pool, with a percentage above 0 and a deadline not yet reached.
 *
 * `selfBorrowAvailable` reports what other keys lend to this key now, as one aggregate: the same
 * formula the quota gate applies (computeBorrowAvailable). Unlike the gate it takes no shortcut:
 * it reads every other key, so the figure is real also while the key is under its own share. It
 * is null for a soft or burst key (the gate does not limit those by it) and null when any read
 * fails. The view carries no id, name or weight of another member. It reports lending by others
 * only as one aggregate, which in a two-key pool is the other key's own figure.
 */

import type { SelfQuotaPool } from "@/shared/schemas/selfQuota";
import { activeLendingPercent, computeBorrowAvailable } from "./consentBorrow";
import { isConsentPool } from "./consentGate";
import { readViewStore } from "./selfViewStore";
import type { SelfViewPoolContext } from "./selfViewTypes";

type LendingFields = Pick<
  SelfQuotaPool,
  "borrowMode" | "lendingPercent" | "lendingUntil" | "lendingActive"
>;

/** Integer 0..100 as the contract requires. Anything else is 0. */
function contractPercent(value: number | undefined): number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 100
    ? value
    : 0;
}

/** An integer epoch ms or null. A non-integer finite deadline is reported rounded down. */
function contractUntil(value: number | null | undefined): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.floor(value);
}

export function selfLendingFields(ctx: SelfViewPoolContext, nowMs: number): LendingFields {
  const consent = isConsentPool(ctx.pool);
  return {
    borrowMode: consent ? "consent" : "saturation",
    lendingPercent: contractPercent(ctx.allocation.lendingPercent),
    lendingUntil: contractUntil(ctx.allocation.lendingUntil),
    lendingActive: consent && activeLendingPercent(ctx.allocation, nowMs) > 0,
  };
}

/** Only a hard key is limited by what others lend, as in the quota gate. */
function lendingApplies(policy: string): boolean {
  return policy !== "soft" && policy !== "burst";
}

/** {} in a saturation pool. null when the key's own consumption or any other key's read is unavailable. */
export async function selfBorrowAvailable(input: {
  ctx: SelfViewPoolContext;
  apiKeyId: string;
  limit: number;
  consumed: number | null;
  nowMs: number;
  peek: ((apiKeyId: string) => Promise<number>) | null;
}): Promise<{ borrowAvailable?: number | null }> {
  const { ctx, apiKeyId, peek } = input;
  if (!isConsentPool(ctx.pool)) return {};
  if (!lendingApplies(ctx.allocation.policy)) return { borrowAvailable: null };
  if (input.consumed === null || !peek) return { borrowAvailable: null };

  const allocations = Array.isArray(ctx.pool.allocations) ? ctx.pool.allocations : [];
  const others = allocations.filter((a) => a.apiKeyId !== apiKeyId);
  const values = await Promise.all(others.map((a) => readViewStore(() => peek(a.apiKeyId))));
  if (values.some((value) => value === null)) return { borrowAvailable: null };

  const consumedByKey: Record<string, number> = { [apiKeyId]: input.consumed };
  others.forEach((a, i) => {
    consumedByKey[a.apiKeyId] = values[i] as number;
  });
  return {
    borrowAvailable: computeBorrowAvailable({
      allocations,
      requesterKeyId: apiKeyId,
      limit: input.limit,
      consumedByKey,
      nowMs: input.nowMs,
    }),
  };
}
