/**
 * SQLite implementation for model_context_overrides (migration 110).
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Reads never throw: a missing table (pre-migration) falls through to the catalog.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  ModelContextOverride,
  ModelContextOverrideRepository,
  ModelContextOverrideSource,
} from "@/domain/persistence/modelOverrideRepositories";
import { isPositiveInteger } from "@/domain/persistence/modelOverrideRepositories";
import { getDbInstance } from "../core";

interface OverrideRow {
  provider: string;
  model_id: string;
  real_context: number;
  source: string;
  refreshed_at: string;
}

function normalizeKey(
  provider: unknown,
  modelId: unknown
): { provider: string; modelId: string } | null {
  const p = typeof provider === "string" ? provider.trim() : "";
  const m = typeof modelId === "string" ? modelId.trim() : "";
  if (!p || !m) return null;
  return { provider: p, modelId: m };
}

function toOverride(row: OverrideRow): ModelContextOverride {
  return {
    provider: row.provider,
    modelId: row.model_id,
    realContext: row.real_context,
    source: row.source === "auto:discovery" ? "auto:discovery" : "manual",
    refreshedAt: row.refreshed_at,
  };
}

function findSync(provider: unknown, modelId: unknown): ModelContextOverride | null {
  const key = normalizeKey(provider, modelId);
  if (!key) return null;
  try {
    const row = getDbInstance()
      .prepare(
        "SELECT provider, model_id, real_context, source, refreshed_at " +
          "FROM model_context_overrides WHERE provider = ? AND model_id = ?"
      )
      .get(key.provider, key.modelId) as OverrideRow | undefined;
    return row ? toOverride(row) : null;
  } catch {
    return null;
  }
}

function listSync(): ModelContextOverride[] {
  try {
    const rows = getDbInstance()
      .prepare(
        "SELECT provider, model_id, real_context, source, refreshed_at " +
          "FROM model_context_overrides ORDER BY refreshed_at DESC"
      )
      .all() as OverrideRow[];
    return rows.map(toOverride);
  } catch {
    return [];
  }
}

function setSync(
  provider: string,
  modelId: string,
  realContext: number,
  source: ModelContextOverrideSource = "manual"
): boolean {
  const key = normalizeKey(provider, modelId);
  if (!key || !isPositiveInteger(realContext)) return false;
  const normalizedSource: ModelContextOverrideSource =
    source === "auto:discovery" ? "auto:discovery" : "manual";
  getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO model_context_overrides " +
        "(provider, model_id, real_context, source, refreshed_at) " +
        "VALUES (?, ?, ?, ?, datetime('now'))"
    )
    .run(key.provider, key.modelId, realContext, normalizedSource);
  return true;
}

function removeSync(provider: string, modelId: string): boolean {
  const key = normalizeKey(provider, modelId);
  if (!key) return false;
  const info = getDbInstance()
    .prepare("DELETE FROM model_context_overrides WHERE provider = ? AND model_id = ?")
    .run(key.provider, key.modelId);
  return info.changes > 0;
}

export const sqliteModelContextOverrideRepository: ModelContextOverrideRepository = {
  async list() {
    return listSync();
  },
  async find(provider, modelId) {
    return findSync(provider, modelId);
  },
  async set(provider, modelId, realContext, source) {
    return setSync(provider, modelId, realContext, source);
  },
  async remove(provider, modelId) {
    return removeSync(provider, modelId);
  },
};

/** SQLite-only synchronous access retained for existing hot-path and route callers. */
export const sqliteModelContextOverrideLegacySync = {
  list: listSync,
  find: findSync,
  set: setSync,
  remove: removeSync,
};
