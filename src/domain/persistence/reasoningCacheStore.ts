// ── Reasoning replay cache (reasoning_content keyed by tool_call_id) ─────────

/**
 * One live cache entry. `expiresAt` is an ISO-8601 instant; `createdAt` is whatever
 * the store wrote at insert time (SQLite: `datetime('now')`).
 */
export interface ReasoningCacheEntry {
  toolCallId: string;
  provider: string;
  model: string;
  reasoning: string;
  charCount: number;
  createdAt: string;
  expiresAt: string;
}

/** Aggregates over live (unexpired) entries only. */
export interface ReasoningCacheStats {
  totalEntries: number;
  totalChars: number;
  byProvider: Record<string, { entries: number; chars: number }>;
  byModel: Record<string, { entries: number; chars: number }>;
  oldestEntry: string | null;
  newestEntry: string | null;
}

/** Values for one write, already filtered and truncated by the facade. */
export interface ReasoningCacheWrite {
  toolCallId: string;
  provider: string;
  model: string;
  reasoning: string;
  charCount: number;
}

/**
 * Cache storage, not a control-data repository: an entry may disappear at any time
 * (expiry, cleanup, clear) and callers must treat a miss as normal. Expiry is judged
 * against the store's own clock; expired entries are never returned by reads or counted
 * in stats, even before `deleteExpired` removes them.
 *
 * The facade owns the replay policy: the default TTL, the per-entry size cap, refusing
 * to store or return the internal placeholder, and the page-size clamp.
 */
export interface ReasoningCacheStore {
  /** Insert or replace the entry for `toolCallId`, live for `ttlMs` from now. */
  put(entry: ReasoningCacheWrite, ttlMs: number): Promise<void>;
  /** The live entry for `toolCallId`, or null when missing or expired. */
  get(
    toolCallId: string
  ): Promise<{ reasoning: string; provider: string; model: string; expiresAt: string } | null>;
  /** Remove one entry, expired or not. Resolves the number of entries removed. */
  delete(toolCallId: string): Promise<number>;
  /** Remove every expired entry. Resolves the number removed. */
  deleteExpired(): Promise<number>;
  /** Remove every entry (of one provider when given). Resolves the number removed. */
  clear(provider?: string): Promise<number>;
  stats(): Promise<ReasoningCacheStats>;
  /** Live entries, newest created_at first, optionally filtered by provider and model. */
  list(options: {
    limit: number;
    offset: number;
    provider?: string;
    model?: string;
  }): Promise<ReasoningCacheEntry[]>;
}
