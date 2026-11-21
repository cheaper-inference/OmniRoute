import {
  getProviderLimitsCache,
  getStoredProviderLimitsFetchedAt,
  setProviderLimitsCache,
  type ProviderLimitsCacheEntry,
} from "@/lib/db/providerLimits";
import { invalidateCodexQuotaCache } from "@omniroute/open-sse/services/codexQuotaFetcher.ts";
import { mergeProviderLimitsCacheEntry, toProviderLimitsCacheEntry } from "../providerLimitsCache";
import type { ProviderConnectionLike } from "./credentialRefresh";

type JsonRecord = Record<string, unknown>;
type SyncSource = "manual" | "scheduled";

export function cacheReadObservedAt(
  connection: ProviderConnectionLike,
  usage: JsonRecord,
  readStartedAt: string
): string | undefined {
  return connection.provider === "codex" && usage._stale !== true ? readStartedAt : undefined;
}

/** Reads are dated at dispatch, so a later stored date means a newer read already landed. */
function isOlderThanStoredRead(connectionId: string, fetchedAt: string): boolean {
  const stored = Date.parse(getStoredProviderLimitsFetchedAt(connectionId) ?? "");
  return Number.isFinite(stored) && stored > Date.parse(fetchedAt);
}

function servePreviousLimitsCache(
  connectionId: string,
  connection: ProviderConnectionLike,
  usage: JsonRecord,
  newCache: ProviderLimitsCacheEntry,
  previous: ProviderLimitsCacheEntry
): { connection: ProviderConnectionLike; usage: JsonRecord; cache: ProviderLimitsCacheEntry } {
  // Claude's banked count lives in the list-seeded memo (already on `usage` when known),
  // so a cached count — e.g. from before a redeem — must not come back through here.
  const isClaude = connection.provider === "claude";
  const bankedResetCredits = isClaude ? newCache.bankedResetCredits : previous.bankedResetCredits;
  let served = previous;
  if (isClaude && previous.bankedResetCredits !== bankedResetCredits) {
    const { bankedResetCredits: _cached, ...rest } = previous;
    served = setProviderLimitsCache(
      connectionId,
      bankedResetCredits === undefined ? rest : { ...rest, bankedResetCredits }
    );
  }
  const staleUsage: JsonRecord = {
    ...usage,
    quotas: previous.quotas,
    modelQuotas: previous.modelQuotas,
    plan: previous.plan ?? usage.plan ?? null,
    bankedResetCredits,
    paidCredits: previous.paidCredits,
    billing: previous.billing,
    message: null,
    _stale: true,
    _staleSince: previous.fetchedAt,
    _staleReason: newCache.message,
  };
  if (bankedResetCredits === undefined) delete staleUsage.bankedResetCredits;
  return { connection, usage: staleUsage, cache: served };
}

export function persistMergedProviderLimitsCache(
  connectionId: string,
  connection: ProviderConnectionLike,
  usage: JsonRecord,
  source: SyncSource,
  readStartedAt: string
): { connection: ProviderConnectionLike; usage: JsonRecord; cache: ProviderLimitsCacheEntry } {
  const newCache = toProviderLimitsCacheEntry(
    usage,
    source,
    cacheReadObservedAt(connection, usage, readStartedAt)
  );
  const previous = getProviderLimitsCache(connectionId);
  const cache = mergeProviderLimitsCacheEntry(connection.provider, newCache, previous);

  // Don't persist error-only entries (429 etc.) — would wipe prior good cache.
  if (cache === previous && newCache.message) {
    return servePreviousLimitsCache(connectionId, connection, usage, newCache, previous);
  }
  // A flight detached by the flight cap still persists when it settles: it must not replace
  // the read a later flight already stored.
  if (
    connection.provider === "codex" &&
    previous &&
    isOlderThanStoredRead(connectionId, newCache.fetchedAt)
  ) {
    return {
      connection,
      usage: { ...usage, quotas: previous.quotas, fetchedAt: previous.fetchedAt },
      cache: previous,
    };
  }

  const mergedUsage: JsonRecord = {
    ...usage,
    ...(cache.billing ? { billing: cache.billing } : {}),
  };
  setProviderLimitsCache(connectionId, cache);
  if (connection.provider === "codex") {
    const current = getProviderLimitsCache(connectionId) ?? cache;
    if (!usage._stale && !usage.message && current.fetchedAt === cache.fetchedAt) {
      invalidateCodexQuotaCache(connectionId);
    }
    return {
      connection,
      usage: { ...mergedUsage, quotas: current.quotas, fetchedAt: current.fetchedAt },
      cache: current,
    };
  }
  return { connection, usage: mergedUsage, cache };
}
