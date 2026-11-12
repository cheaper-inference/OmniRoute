/**
 * Short-lived cache of computed team reports, so paging or re-sorting the sessions list and
 * reloading a summary with the same filters reuse the priced result instead of reading and
 * pricing every request in the window again.
 *
 * Entries belong to one database handle and are keyed by the normalized filter. One is served
 * only while usage_history's highest id is unchanged (a recorded request drops it) and for at
 * most REPORT_CACHE_TTL_MS, which bounds how long a pricing edit or deleted usage goes unseen;
 * after that it is released. Callers must not mutate a cached value; concurrent callers share
 * one computation.
 */

import type { SqliteAdapter } from "@/lib/db/adapters/types";
import {
  getUsageHistoryMaxId,
  REPORT_MULTI_VALUE_FILTERS,
  type AgentSessionReportFilter,
} from "@/lib/db/agentSessionReports";

export const REPORT_CACHE_TTL_MS = 30_000;
/** Entries kept per cache and database handle; the least recently used is dropped first. */
export const REPORT_CACHE_MAX_ENTRIES = 4;

const MULTI_VALUE_FIELDS = new Set<string>(REPORT_MULTI_VALUE_FILTERS);

function compareStrings(a: string, b: string): number {
  if (a < b) return -1;
  return a > b ? 1 : 0;
}

/**
 * The same key for filters that differ only in field order or in the order and repetition of a
 * multi-value filter's values (matched with IN). Every field of the filter takes part, so a new
 * filter field can never share a key with a filter that lacks it.
 */
export function reportFilterKey(filter: AgentSessionReportFilter): string {
  const fields = Object.entries(filter)
    .filter(([, value]) => value !== undefined)
    .map(([field, value]): [string, unknown] => {
      if (!MULTI_VALUE_FIELDS.has(field)) return [field, value];
      const values: string[] = typeof value === "string" ? [value] : [...(value as string[])];
      return [field, [...new Set(values)].filter(Boolean).sort(compareStrings)];
    })
    .sort(([a], [b]) => compareStrings(a, b));
  return JSON.stringify(fields);
}

interface CacheEntry<T> {
  version: number;
  storedAt: number;
  value: Promise<T>;
}

export class ReportResultCache<T> {
  private readonly byDb = new WeakMap<SqliteAdapter, Map<string, CacheEntry<T>>>();

  /** The cached result for this filter, or compute()'s result, cached for later calls. */
  get(db: SqliteAdapter, filter: AgentSessionReportFilter, compute: () => Promise<T>): Promise<T> {
    // Read before computing, so a cached result is never older than its version.
    const version = getUsageHistoryMaxId(db);
    const now = Date.now();
    let entries = this.byDb.get(db);
    if (!entries) {
      entries = new Map();
      this.byDb.set(db, entries);
    }
    const key = reportFilterKey(filter);
    const cached = entries.get(key);
    entries.delete(key);
    if (cached && cached.version === version && now - cached.storedAt < REPORT_CACHE_TTL_MS) {
      entries.set(key, cached);
      return cached.value;
    }

    const entry: CacheEntry<T> = { version, storedAt: now, value: compute() };
    entries.set(key, entry);
    const owner = entries;
    const drop = () => {
      if (owner.get(key) === entry) owner.delete(key);
    };
    // A failed computation is not kept; the caller still gets the rejection.
    entry.value.catch(drop);
    // Dropped once it can no longer be served, so a filter nobody asks for again frees its
    // result (a scan holds every slice of its window) instead of waiting for eviction.
    setTimeout(drop, REPORT_CACHE_TTL_MS).unref?.();
    for (const oldest of entries.keys()) {
      if (entries.size <= REPORT_CACHE_MAX_ENTRIES) break;
      entries.delete(oldest);
    }
    return entry.value;
  }
}
