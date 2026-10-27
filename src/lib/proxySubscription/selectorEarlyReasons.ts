/**
 * Global counters for early selector-skip reasons.
 *
 * The trigger returns before any database read when no control URL is
 * configured or no subscription owns the set-aside key. This module records
 * those skips in process memory so the management list can report them
 * without extra I/O on the trigger path. Counters are NOT persisted: they
 * reset on every restart.
 *
 * The selector-disabled path (feature flag off — the default) is deliberately
 * not counted: with the selector off every set-aside would bump it, and the
 * trigger keeps its "flag off → nothing touched" contract.
 */

import { parseLocalCoreEndpoints } from "./coreEndpoint";
import { parseSelectorTag } from "./selectorEndpoint";

export type SelectorEarlyReason = "no-control" | "unmapped";

export type SelectorEarlyReasonCounts = Record<SelectorEarlyReason, number>;

const counts: SelectorEarlyReasonCounts = {
  "no-control": 0,
  unmapped: 0,
};

export function noteSelectorEarlyReason(reason: SelectorEarlyReason): void {
  if (reason !== "no-control" && reason !== "unmapped") return;
  counts[reason] += 1;
}

export function readSelectorEarlyReasons(): SelectorEarlyReasonCounts {
  return { ...counts };
}

export function __resetSelectorEarlyReasonsForTesting(): void {
  counts["no-control"] = 0;
  counts.unmapped = 0;
}

/** Fields of a subscription row the display filter reads. */
export interface SelectorEarlyReasonSubscription {
  controlUrl?: string | null;
  localCoreEndpoint?: string | null;
}

function hasSelectorTag(sub: SelectorEarlyReasonSubscription): boolean {
  return parseLocalCoreEndpoints(sub.localCoreEndpoint ?? null).some(
    (line) => parseSelectorTag(line) !== null
  );
}

function hasControlUrl(sub: SelectorEarlyReasonSubscription): boolean {
  return typeof sub.controlUrl === "string" && sub.controlUrl.length > 0;
}

/**
 * Counts worth showing in the subscription list, or `null` when nothing is.
 * Pure. Only counts > 0 that concern a configured selector survive:
 *  - selector feature off → `null` (nothing about the selector is relevant);
 *  - `unmapped` → shown when > 0 (only reachable while a control URL exists);
 *  - `no-control` → shown when > 0, no subscription has a control URL, and at
 *    least one subscription declares a selector tag (a selector was intended
 *    but cannot be driven). Without a selector tag it is the normal state of
 *    a non-selector setup and is hidden.
 */
export function selectorEarlyReasonsForDisplay(
  snapshot: SelectorEarlyReasonCounts,
  ctx: { selectorEnabled: boolean; subscriptions: readonly SelectorEarlyReasonSubscription[] }
): Partial<SelectorEarlyReasonCounts> | null {
  if (!ctx.selectorEnabled) return null;
  const out: Partial<SelectorEarlyReasonCounts> = {};
  const subs = Array.isArray(ctx.subscriptions) ? ctx.subscriptions : [];
  if (snapshot["no-control"] > 0 && !subs.some(hasControlUrl) && subs.some(hasSelectorTag)) {
    out["no-control"] = snapshot["no-control"];
  }
  if (snapshot.unmapped > 0) out.unmapped = snapshot.unmapped;
  return Object.keys(out).length > 0 ? out : null;
}
