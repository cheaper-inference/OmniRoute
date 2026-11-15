/**
 * Read-only pre-dispatch blocks for the `jev` combo (#15276).
 *
 * A target behind an open breaker, lockout, quota cutoff, or the other
 * pre-dispatch gates must never become a System One choice option and must
 * never be returned for the attempt loop. Callers pass a `checkBlock` port so
 * unit tests can drive each reason without a live breaker or DB.
 */

import type { ComboSkipReason } from "./decisionTrace.ts";
import type { ResolvedComboTarget } from "./types.ts";

export type JevBlockedTarget = {
  target: ResolvedComboTarget;
  reason: ComboSkipReason;
};

export type JevPartition = {
  eligible: ResolvedComboTarget[];
  blocked: JevBlockedTarget[];
};

export type CheckJevBlock = (target: ResolvedComboTarget) => Promise<ComboSkipReason | null>;

/**
 * Split preference-ordered targets into eligible (offered to Jev / attempted)
 * and blocked (traced once, never offered, never attempted).
 */
export async function partitionJevTargets(
  targets: readonly ResolvedComboTarget[],
  checkBlock: CheckJevBlock
): Promise<JevPartition> {
  const eligible: ResolvedComboTarget[] = [];
  const blocked: JevBlockedTarget[] = [];
  for (const target of targets) {
    const reason = await checkBlock(target);
    if (reason) {
      blocked.push({ target, reason });
    } else {
      eligible.push(target);
    }
  }
  return { eligible, blocked };
}
