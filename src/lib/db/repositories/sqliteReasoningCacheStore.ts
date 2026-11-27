/**
 * SQLite implementation of the reasoning replay cache (`reasoning_cache`, migration 033).
 *
 * `expires_at` is written as integer Unix seconds; rows written by older builds may hold
 * an ISO-8601 string, so every expiry comparison goes through EXPIRES_AT_EPOCH_SQL.
 * The async store and the SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */

import type {
  ReasoningCacheEntry,
  ReasoningCacheStats,
  ReasoningCacheStore,
  ReasoningCacheWrite,
} from "@/domain/persistence/reasoningCacheStore";
import { getDbInstance } from "../core";

function toUnixEpochSeconds(dateMs: number): number {
  return Math.floor(dateMs / 1000);
}

const EXPIRES_AT_EPOCH_SQL = `COALESCE(
  CASE
    WHEN typeof(expires_at) IN ('integer', 'real') THEN CAST(expires_at AS INTEGER)
    WHEN typeof(expires_at) = 'text' AND expires_at <> '' AND expires_at NOT GLOB '*[^0-9]*'
      THEN CAST(expires_at AS INTEGER)
    ELSE unixepoch(expires_at)
  END,
  0
)`;

function epochSecondsToIso(value: number | string): string {
  const text = String(value);
  const seconds =
    typeof value === "number" || (text !== "" && !/[^0-9]/.test(text))
      ? Number.parseInt(text, 10)
      : NaN;
  if (Number.isFinite(seconds) && seconds > 0) {
    return new Date(seconds * 1000).toISOString();
  }
  const parsedMs = Date.parse(text);
  if (Number.isFinite(parsedMs)) {
    return new Date(parsedMs).toISOString();
  }
  return String(value);
}

function putReasoningCacheEntry(entry: ReasoningCacheWrite, ttlMs: number): void {
  const db = getDbInstance();
  const expiresAt = toUnixEpochSeconds(Date.now() + ttlMs);

  db.prepare(
    `INSERT OR REPLACE INTO reasoning_cache
       (tool_call_id, provider, model, reasoning, char_count, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'), ?)`
  ).run(entry.toolCallId, entry.provider, entry.model, entry.reasoning, entry.charCount, expiresAt);
}

function getReasoningCacheEntry(
  toolCallId: string
): { reasoning: string; provider: string; model: string; expiresAt: string } | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT reasoning, provider, model, expires_at FROM reasoning_cache
       WHERE tool_call_id = ? AND ${EXPIRES_AT_EPOCH_SQL} > unixepoch('now')`
    )
    .get(toolCallId) as
    | {
        reasoning: string;
        provider: string;
        model: string;
        expires_at: number | string;
      }
    | undefined;

  return row
    ? {
        reasoning: row.reasoning,
        provider: row.provider,
        model: row.model,
        expiresAt: epochSecondsToIso(row.expires_at),
      }
    : null;
}

function deleteReasoningCacheEntry(toolCallId: string): number {
  const db = getDbInstance();
  const result = db.prepare(`DELETE FROM reasoning_cache WHERE tool_call_id = ?`).run(toolCallId);
  return result.changes;
}

function deleteExpiredReasoningCacheEntries(): number {
  const db = getDbInstance();
  const result = db
    .prepare(`DELETE FROM reasoning_cache WHERE ${EXPIRES_AT_EPOCH_SQL} <= unixepoch('now')`)
    .run();
  return result.changes;
}

function clearReasoningCacheEntries(provider?: string): number {
  const db = getDbInstance();
  if (provider) {
    const result = db.prepare(`DELETE FROM reasoning_cache WHERE provider = ?`).run(provider);
    return result.changes;
  }
  const result = db.prepare(`DELETE FROM reasoning_cache`).run();
  return result.changes;
}

function readReasoningCacheStats(): ReasoningCacheStats {
  const db = getDbInstance();

  // Total counts
  const totals = db
    .prepare(
      `SELECT COUNT(*) as total_entries, COALESCE(SUM(char_count), 0) as total_chars
       FROM reasoning_cache WHERE ${EXPIRES_AT_EPOCH_SQL} > unixepoch('now')`
    )
    .get() as { total_entries: number; total_chars: number };

  // By provider
  const providerRows = db
    .prepare(
      `SELECT provider, COUNT(*) as entries, COALESCE(SUM(char_count), 0) as chars
       FROM reasoning_cache WHERE ${EXPIRES_AT_EPOCH_SQL} > unixepoch('now')
       GROUP BY provider ORDER BY entries DESC`
    )
    .all() as { provider: string; entries: number; chars: number }[];

  const byProvider: Record<string, { entries: number; chars: number }> = {};
  for (const row of providerRows) {
    byProvider[row.provider] = { entries: row.entries, chars: row.chars };
  }

  // By model
  const modelRows = db
    .prepare(
      `SELECT model, COUNT(*) as entries, COALESCE(SUM(char_count), 0) as chars
       FROM reasoning_cache WHERE ${EXPIRES_AT_EPOCH_SQL} > unixepoch('now')
       GROUP BY model ORDER BY entries DESC`
    )
    .all() as { model: string; entries: number; chars: number }[];

  const byModel: Record<string, { entries: number; chars: number }> = {};
  for (const row of modelRows) {
    byModel[row.model] = { entries: row.entries, chars: row.chars };
  }

  // Oldest/newest
  const oldest = db
    .prepare(
      `SELECT created_at FROM reasoning_cache
       WHERE ${EXPIRES_AT_EPOCH_SQL} > unixepoch('now') ORDER BY created_at ASC LIMIT 1`
    )
    .get() as { created_at: string } | undefined;

  const newest = db
    .prepare(
      `SELECT created_at FROM reasoning_cache
       WHERE ${EXPIRES_AT_EPOCH_SQL} > unixepoch('now') ORDER BY created_at DESC LIMIT 1`
    )
    .get() as { created_at: string } | undefined;

  return {
    totalEntries: totals.total_entries,
    totalChars: totals.total_chars,
    byProvider,
    byModel,
    oldestEntry: oldest?.created_at ?? null,
    newestEntry: newest?.created_at ?? null,
  };
}

function listReasoningCacheEntries(opts: {
  limit: number;
  offset: number;
  provider?: string;
  model?: string;
}): ReasoningCacheEntry[] {
  const db = getDbInstance();
  const { limit, offset } = opts;

  const conditions: string[] = [`${EXPIRES_AT_EPOCH_SQL} > unixepoch('now')`];
  const params: unknown[] = [];

  if (opts.provider) {
    conditions.push("provider = ?");
    params.push(opts.provider);
  }
  if (opts.model) {
    conditions.push("model = ?");
    params.push(opts.model);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const rows = db
    .prepare(
      `SELECT tool_call_id, provider, model, reasoning, char_count, created_at, expires_at
       FROM reasoning_cache ${where}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`
    )
    .all(...params, limit, offset) as {
    tool_call_id: string;
    provider: string;
    model: string;
    reasoning: string;
    char_count: number;
    created_at: string;
    expires_at: number | string;
  }[];

  return rows.map((row) => ({
    toolCallId: row.tool_call_id,
    provider: row.provider,
    model: row.model,
    reasoning: row.reasoning,
    charCount: row.char_count,
    createdAt: row.created_at,
    expiresAt: epochSecondsToIso(row.expires_at),
  }));
}

export const sqliteReasoningCacheStore: ReasoningCacheStore = {
  put: async (entry, ttlMs) => putReasoningCacheEntry(entry, ttlMs),
  get: async (toolCallId) => getReasoningCacheEntry(toolCallId),
  delete: async (toolCallId) => deleteReasoningCacheEntry(toolCallId),
  deleteExpired: async () => deleteExpiredReasoningCacheEntries(),
  clear: async (provider) => clearReasoningCacheEntries(provider),
  stats: async () => readReasoningCacheStats(),
  list: async (options) => listReasoningCacheEntries(options),
};

/** Synchronous compatibility is SQLite-only, not part of the portable contract. */
export const sqliteReasoningCacheLegacySync = {
  put: putReasoningCacheEntry,
  get: getReasoningCacheEntry,
  delete: deleteReasoningCacheEntry,
  deleteExpired: deleteExpiredReasoningCacheEntries,
  clear: clearReasoningCacheEntries,
  stats: readReasoningCacheStats,
  list: listReasoningCacheEntries,
};
