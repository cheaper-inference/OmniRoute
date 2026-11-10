import { getQuotaCacheState } from "@/domain/quotaCacheState";
import { getAllProviderLimitsCache, type ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";
import {
  getQuotaDisplaySnapshots,
  type QuotaDisplaySnapshot,
} from "@/lib/db/quotaDisplaySnapshots";

type Quota = Record<string, unknown>;
function record(value: unknown): Quota {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Quota) : {};
}
function metadata(value: string | null): Quota {
  try {
    return record(JSON.parse(value || "null"));
  } catch {
    // Historical snapshots need not carry JSON interpretation metadata.
    return {};
  }
}

/** Overlay durable facts only; never use routing's optimistic reset advancement as a reading. */
export function projectQuotaDisplay(
  caches: Record<string, ProviderLimitsCacheEntry>,
  snapshots: QuotaDisplaySnapshot[],
  now = Date.now()
): Record<string, ProviderLimitsCacheEntry> {
  const result = { ...caches };
  const latest = new Map<string, QuotaDisplaySnapshot>();
  for (const row of snapshots) {
    const key = JSON.stringify([row.connection_id, row.window_key]);
    const previous = latest.get(key);
    if (!previous || Date.parse(row.created_at) > Date.parse(previous.created_at))
      latest.set(key, row);
  }
  for (const row of latest.values()) {
    const cached = result[row.connection_id];
    const previous = record(cached?.quotas?.[row.window_key]);
    const observed = Date.parse(row.created_at);
    const prior = Date.parse(
      String(previous.observedAt ?? caches[row.connection_id]?.fetchedAt ?? "")
    );
    if (!Number.isFinite(observed) || observed > now || observed <= prior) continue;
    const info = metadata(row.raw_data);
    if (
      info.retired !== true &&
      info.fractionReported !== false &&
      (row.remaining_percentage === null || !Number.isFinite(row.remaining_percentage))
    )
      continue;
    const quotas = { ...cached?.quotas };
    // Restamping the envelope must not make an untouched sibling appear newly observed.
    for (const [key, value] of Object.entries(quotas)) {
      const quota = record(value);
      quotas[key] = { ...quota, observedAt: quota.observedAt ?? cached?.fetchedAt };
    }
    if (info.retired === true) delete quotas[row.window_key];
    else
      quotas[row.window_key] = {
        ...previous,
        used: 0,
        total: 0,
        isPercentageOnly: true,
        remainingPercentage: row.remaining_percentage,
        resetAt: row.next_reset_at,
        observedAt: row.created_at,
        fractionReported: info.fractionReported !== false,
        staleAfterReset: false,
      };
    const fetchedAt = Math.max(observed, Date.parse(cached?.fetchedAt || "") || 0);
    result[row.connection_id] = {
      ...cached,
      quotas,
      plan: cached?.plan ?? null,
      message: cached?.message ?? null,
      fetchedAt: new Date(fetchedAt).toISOString(),
      source: "quota-snapshot",
    };
  }
  return result;
}

/** Shared read model for cached Provider Limits and availability; no writes or provider calls. */
export function getProviderLimitsDisplayMap(): Record<string, ProviderLimitsCacheEntry> {
  const caches = getAllProviderLimitsCache();
  const snapshots = getQuotaDisplaySnapshots();
  const known = new Set([...Object.keys(caches), ...snapshots.map((row) => row.connection_id)]);
  // Runtime reads are raw observations, not the optimistic exhaustion predicate. They also
  // cover unchanged percentages whose durable history write was deliberately deduplicated.
  for (const [id, entry] of getQuotaCacheState().cache) {
    if (!known.has(id) || entry.provider === "codex") continue;
    for (const [key, quota] of Object.entries(entry.quotas)) {
      const observed = quota.observedAt ?? entry.fetchedAt;
      if (!Number.isFinite(observed)) continue;
      snapshots.push({
        connection_id: id,
        window_key: key,
        remaining_percentage: quota.remainingPercentage,
        next_reset_at: quota.resetAt,
        created_at: new Date(observed).toISOString(),
        raw_data: quota.fractionReported === false ? '{"fractionReported":false}' : null,
      });
    }
  }
  return projectQuotaDisplay(caches, snapshots);
}
