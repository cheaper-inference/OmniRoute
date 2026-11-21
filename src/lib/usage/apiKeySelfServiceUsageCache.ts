/**
 * GET /v1/me/usage — short in-process reuse of a key's built usage series.
 *
 * Building a series runs five grouped aggregates over the calling key's rows on the synchronous
 * database driver, so a key holder reloading a page would otherwise block the event loop on
 * every reload. A built series is reused for 60 seconds per (key id, range).
 *
 * - The entry key is the calling key's id and the validated range, nothing else from the request.
 *   One key's series is never served to another key.
 * - The scope check runs before the lookup, and the route's authentication gate runs before this
 *   function, so a key that loses `self:usage` or is revoked is refused on its next request.
 * - Concurrent requests for the same key and range share one build. A failed build is not kept:
 *   every request waiting on it gets the same failure, and the next request builds again.
 * - The reused object is exactly what the build returned, `generatedAt` included, so a client can
 *   see the age of the data.
 * - Memory stays bounded: a series can take about a megabyte (50 models over 90 days), so at most
 *   64 are kept, and storing a new one first drops every entry that has already expired.
 */

import { boundedMap } from "@/lib/quota/boundedMap";
import { hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";
import type { SelfUsageRange, SelfUsageResponse } from "@/shared/schemas/selfUsage";

import { buildApiKeySelfServiceUsage, type SelfServiceUsageDeps } from "./apiKeySelfServiceUsage";

const USAGE_CACHE_TTL_MS = 60_000;
const USAGE_CACHE_MAX_ENTRIES = 64;
const MISSING_SCOPE_ERROR = "missing_self_usage_scope";

export interface SelfServiceUsageCache {
  /**
   * Returns the series cached under `key` until `ttlMs` after it was built, or builds and caches
   * it. Concurrent callers share one build; a failed one is dropped.
   */
  memoize(
    key: string,
    nowMs: number,
    build: () => Promise<SelfUsageResponse>
  ): Promise<SelfUsageResponse>;
  /** Entries currently held, expired ones not yet dropped included (diagnostics). */
  readonly size: number;
}

/**
 * Bounded (`ttl` policy of boundedMap): past `maxEntries`, expired then oldest entries go. Each
 * store also drops every entry already expired at that moment, so stale series do not wait for
 * a read of the same key or for the cap.
 */
export function createSelfServiceUsageCache({
  ttlMs = USAGE_CACHE_TTL_MS,
  maxEntries = USAGE_CACHE_MAX_ENTRIES,
}: { ttlMs?: number; maxEntries?: number } = {}): SelfServiceUsageCache {
  const entries = boundedMap<Promise<SelfUsageResponse>>(
    "self-service:usage",
    maxEntries,
    "ttl",
    ttlMs
  );
  /** boundedMap.get drops an entry that has expired at `nowMs`; keys() lists expired ones too. */
  function dropExpired(nowMs: number): void {
    for (const stored of [...entries.keys()]) void entries.get(stored, nowMs);
  }
  return {
    memoize(key, nowMs, build) {
      const hit = entries.get(key, nowMs);
      if (hit !== undefined) return hit;
      dropExpired(nowMs);
      const value = (async () => build())();
      entries.set(key, value, nowMs);
      value.catch(() => {
        if (entries.get(key, nowMs) === value) entries.delete(key);
      });
      return value;
    },
    get size() {
      return entries.size;
    },
  };
}

const defaultSelfServiceUsageCache = createSelfServiceUsageCache();

export type SelfServiceUsageCachedDeps = SelfServiceUsageDeps & { cache?: SelfServiceUsageCache };

/**
 * The usage series of one key, reused for 60 seconds per (key id, range). Throws
 * `missing_self_usage_scope`, before any lookup, when the key lacks `self:usage`.
 */
export async function getApiKeySelfServiceUsage(
  key: { id: string; scopes: string[] },
  range: SelfUsageRange,
  deps: SelfServiceUsageCachedDeps = {}
): Promise<SelfUsageResponse> {
  if (!hasSelfUsageScope(key.scopes)) throw new Error(MISSING_SCOPE_ERROR);
  const { cache = defaultSelfServiceUsageCache, ...buildDeps } = deps;
  const nowMs = (deps.now ?? Date.now)();
  return cache.memoize(JSON.stringify([key.id, range]), nowMs, () =>
    buildApiKeySelfServiceUsage(key, range, { ...buildDeps, now: () => nowMs })
  );
}
