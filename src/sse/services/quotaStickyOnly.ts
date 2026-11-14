// Opt-in sticky-only state (OMNIROUTE_QUOTA_STICKY_ONLY_USED_PERCENT, 1-99, default off).
// An account with a cached quota window at or above that used-% keeps serving sessions
// already pinned to it, so they finish on a warm prompt cache, while new sessions move to
// other accounts. Needs session affinity on. If every candidate is that full, nothing is held back.
import { getQuotaCache, getQuotaWindowStatus } from "@/domain/quotaCache";
import { getSessionAccountAffinity } from "@/lib/db/sessionAccountAffinity";
import { resolveSessionAffinityConnection } from "@/lib/db/sessionAffinity/accountIdentity";
import type { SessionAccountAffinityRecord } from "@/lib/db/sessionAffinity/store";

function stickyOnlyUsedPercent(): number {
  const n = Number.parseInt(process.env.OMNIROUTE_QUOTA_STICKY_ONLY_USED_PERCENT || "", 10);
  return Number.isFinite(n) && n >= 1 && n <= 99 ? n : 0;
}

function isNearLimit(connectionId: string, usedPercent: number): boolean {
  const windows = Object.keys(getQuotaCache(connectionId)?.quotas ?? {});
  return windows.some(
    (name) => getQuotaWindowStatus(connectionId, name, usedPercent)?.reachedThreshold
  );
}

export function applyStickyOnly<T extends { id: string }>(
  candidates: T[],
  provider: string,
  sessionKey: string | null | undefined,
  ttlMs: number,
  affinityRecord?: SessionAccountAffinityRecord | null
): T[] {
  const usedPercent = stickyOnlyUsedPercent();
  // Without session affinity no running session can be recognised, so there is nothing to keep.
  if (!usedPercent || ttlMs <= 0 || candidates.length < 2) return candidates;
  const record =
    affinityRecord !== undefined
      ? affinityRecord
      : sessionKey && ttlMs > 0
        ? getSessionAccountAffinity(sessionKey, provider, ttlMs)
        : null;
  const pinnedId = resolveSessionAffinityConnection(record, candidates, provider)?.id;
  const open = candidates.filter((c) => c.id === pinnedId || !isNearLimit(c.id, usedPercent));
  return open.length > 0 ? open : candidates;
}
