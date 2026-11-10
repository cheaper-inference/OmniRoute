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
function datedQuotas(cached: ProviderLimitsCacheEntry | undefined): Record<string, Quota> {
  return Object.fromEntries(
    Object.entries(cached?.quotas || {}).map(([key, value]) => {
      const quota = record(value);
      return [key, { ...quota, observedAt: quota.observedAt ?? cached?.fetchedAt }];
    })
  );
}
function applyWindow(
  cached: ProviderLimitsCacheEntry | undefined,
  row: QuotaDisplaySnapshot
): ProviderLimitsCacheEntry {
  const info = metadata(row.raw_data);
  // Restamping the envelope must not make an untouched sibling appear newly observed.
  const quotas = datedQuotas(cached);
  if (info.retired === true) delete quotas[row.window_key];
  else
    quotas[row.window_key] = {
      ...record(cached?.quotas?.[row.window_key]),
      used: 0,
      total: 0,
      isPercentageOnly: true,
      remainingPercentage: row.remaining_percentage,
      resetAt: row.next_reset_at,
      observedAt: row.created_at,
      fractionReported: info.fractionReported !== false,
      staleAfterReset: false,
    };
  const fetchedAt = Math.max(Date.parse(row.created_at), Date.parse(cached?.fetchedAt || "") || 0);
  return {
    ...cached,
    quotas,
    plan: cached?.plan ?? null,
    message: cached?.message ?? null,
    fetchedAt: new Date(fetchedAt).toISOString(),
    source: "quota-snapshot",
  };
}
function validObservation(row: QuotaDisplaySnapshot, now: number): boolean {
  const observed = Date.parse(row.created_at);
  if (!Number.isFinite(observed) || observed > now) return false;
  const info = metadata(row.raw_data);
  return (
    info.retired === true ||
    info.fractionReported === false ||
    (typeof row.remaining_percentage === "number" && Number.isFinite(row.remaining_percentage))
  );
}

/** Overlay observations only; never use routing's optimistic reset advancement as a reading. */
export function projectQuotaDisplay(
  caches: Record<string, ProviderLimitsCacheEntry>,
  snapshots: QuotaDisplaySnapshot[],
  now = Date.now()
): Record<string, ProviderLimitsCacheEntry> {
  const result = { ...caches };
  const latest = new Map<string, QuotaDisplaySnapshot>();
  for (const row of snapshots) {
    if (!validObservation(row, now)) continue;
    const key = JSON.stringify([row.connection_id, row.window_key]);
    const previous = latest.get(key);
    if (!previous || Date.parse(row.created_at) > Date.parse(previous.created_at))
      latest.set(key, row);
  }
  for (const row of latest.values()) {
    const previous = record(result[row.connection_id]?.quotas?.[row.window_key]);
    const prior = Date.parse(
      String(previous.observedAt ?? caches[row.connection_id]?.fetchedAt ?? "")
    );
    if (Date.parse(row.created_at) <= prior) continue;
    result[row.connection_id] = applyWindow(result[row.connection_id], row);
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
