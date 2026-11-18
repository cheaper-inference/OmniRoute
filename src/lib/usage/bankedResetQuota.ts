/**
 * bankedResetQuota.ts — reads the quota cache into the shapes decideBankedReset() takes.
 *
 * Walled detection uses the per-window status (`getQuotaWindowStatus(id, "session" |
 * "weekly")`) instead of isAccountQuotaExhausted(), which only reports an account whose
 * EVERY window is exhausted and so hides a 5-hour wall. When both windows are walled the
 * weekly one wins. The reader is injected, so both the background job and the Claude
 * request-path gate stay testable without a quota cache.
 */

import type {
  BankedResetPoolMember,
  BankedResetWalledWindow,
  BankedResetWindowState,
} from "@/lib/usage/bankedResetPolicy";

export type BankedResetQuotaWindowName = "session" | "weekly";

/** The subset of quotaCache's QuotaWindowStatus the feature reads. */
export interface BankedResetQuotaWindowStatus {
  remainingPercentage: number;
  usedPercentage: number;
  resetAt: string | null;
  reachedThreshold: boolean;
}

export type BankedResetQuotaReader = (
  connectionId: string,
  window: BankedResetQuotaWindowName
) => BankedResetQuotaWindowStatus | null;

export interface BankedResetAccountWindows {
  walled: BankedResetWalledWindow | null;
  session: BankedResetWindowState | null;
  weekly: BankedResetWindowState | null;
}

function toWindowState(status: BankedResetQuotaWindowStatus | null): BankedResetWindowState | null {
  if (!status) return null;
  return { usedPercentage: status.usedPercentage, resetAt: status.resetAt };
}

export function readBankedResetWindows(
  read: BankedResetQuotaReader,
  connectionId: string
): BankedResetAccountWindows {
  const session = read(connectionId, "session");
  const weekly = read(connectionId, "weekly");
  const walled = weekly?.reachedThreshold ? "weekly" : session?.reachedThreshold ? "session" : null;
  return { walled, session: toWindowState(session), weekly: toWindowState(weekly) };
}

/** Pool members for the last-resort rule; unknown windows stay null (= no headroom). */
export function buildBankedResetPool(
  read: BankedResetQuotaReader,
  connectionIds: string[]
): BankedResetPoolMember[] {
  return connectionIds.map((id) => ({
    id,
    sessionRemainingPercent: read(id, "session")?.remainingPercentage ?? null,
    weeklyRemainingPercent: read(id, "weekly")?.remainingPercentage ?? null,
  }));
}
