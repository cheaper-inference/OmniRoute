/**
 * reasoningCache.ts — DB domain module for the Reasoning Replay Cache.
 *
 * Persists reasoning_content from thinking-mode models (DeepSeek V4, Kimi K2,
 * Qwen-Thinking, etc.) keyed by tool_call_id. Used for crash recovery and
 * dashboard visibility. The hot path uses the in-memory cache in
 * open-sse/services/reasoningCache.ts; this module is the persistence layer.
 *
 * Storage lives behind ReasoningCacheStore. The exports below stay synchronous
 * (SQLite-only legacy access) because the replay hot path does not await; this
 * module keeps the replay policy (default TTL, size cap, placeholder filter, page clamp).
 *
 * @see Issue #1628
 */

import type {
  ReasoningCacheEntry,
  ReasoningCacheStats,
  ReasoningCacheStore,
} from "@/domain/persistence/reasoningCacheStore";
import { reasoningCacheStores } from "./repositories/reasoningCacheStores";

// ──────────────── Types ────────────────

export type { ReasoningCacheEntry, ReasoningCacheStats };

// ──────────────── Constants ────────────────

const DEFAULT_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

const MAX_ENTRY_BYTES = 10000;

const legacy = reasoningCacheStores.legacySync.reasoning;

/** Async cache-store contract. */
export function getReasoningCacheStore(): ReasoningCacheStore {
  return reasoningCacheStores.reasoning;
}

// ──────────────── CRUD ────────────────

/**
 * Store a reasoning_content entry for a given tool_call_id.
 * Uses INSERT OR REPLACE to handle duplicate tool_call_ids gracefully.
 */
export function setReasoningCache(
  toolCallId: string,
  provider: string,
  model: string,
  reasoning: string,
  ttlMs: number = DEFAULT_TTL_MS
): void {
  const PLACEHOLDER = "(prior reasoning summary unavailable)";
  if (!reasoning || reasoning.trim() === PLACEHOLDER) return; // ponytail: never store the internal placeholder
  if (reasoning.length > MAX_ENTRY_BYTES) {
    reasoning = reasoning.slice(0, MAX_ENTRY_BYTES);
  }
  const charCount = reasoning.length;

  legacy.put({ toolCallId, provider, model, reasoning, charCount }, ttlMs);
}

/**
 * Retrieve a cached reasoning_content by tool_call_id.
 * Returns null if not found or expired.
 */
export function getReasoningCache(
  toolCallId: string
): { reasoning: string; provider: string; model: string; expiresAt: string } | null {
  const row = legacy.getRow(toolCallId);

  const PLACEHOLDER = "(prior reasoning summary unavailable)";
  if (row && row.reasoning && row.reasoning.trim() === PLACEHOLDER) return null;
  return row ? legacy.rowToReadResult(row) : null;
}

/**
 * Delete a specific reasoning cache entry.
 */
export function deleteReasoningCache(toolCallId: string): number {
  return legacy.delete(toolCallId);
}

/**
 * Delete all expired entries. Returns count of rows removed.
 */
export function cleanupExpiredReasoning(): number {
  return legacy.deleteExpired();
}

/**
 * Delete all entries, optionally filtered by provider.
 * Returns count of rows removed.
 */
export function clearAllReasoningCache(provider?: string): number {
  return legacy.clear(provider);
}

// ──────────────── Stats ────────────────

/**
 * Get aggregate statistics for the reasoning cache.
 */
export function getReasoningCacheStats(): ReasoningCacheStats {
  return legacy.stats();
}

// ──────────────── Paginated Entries ────────────────

/**
 * List reasoning cache entries with optional filters and pagination.
 */
export function getReasoningCacheEntries(
  opts: {
    limit?: number;
    offset?: number;
    provider?: string;
    model?: string;
  } = {}
): ReasoningCacheEntry[] {
  const limit = Math.min(opts.limit ?? 50, 200);
  const offset = opts.offset ?? 0;

  return legacy.list({ limit, offset, provider: opts.provider, model: opts.model });
}
