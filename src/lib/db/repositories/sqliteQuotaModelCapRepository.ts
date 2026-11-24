/**
 * SQLite implementation for quota_allocation_model_caps (migration 106).
 *
 * Per-(pool_id, api_key_id, model) budget caps for the Quota Share Engine.
 * cap_unit aligns with QuotaUnit: "requests" | "tokens" | "usd" | "percent".
 * cap_value of ≤ Number.EPSILON is treated as a placeholder by the enforce
 * layer (not enforced), consistent with the planRegistry EPSILON convention.
 *
 * All SQL goes through prepared statements — never raw string interpolation.
 * The async repository and the SQLite-only legacy helpers share these private
 * operations. The database is resolved at call time.
 */

import type {
  ModelCap,
  QuotaModelCapRepository,
  QuotaModelCapUnit,
} from "@/domain/persistence/quotaDefinitionRepositories";
import { getDbInstance } from "../core";

interface ModelCapRow {
  pool_id: string;
  api_key_id: string;
  model: string;
  cap_value: number;
  cap_unit: string;
}

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function rowToModelCap(row: ModelCapRow): ModelCap {
  return {
    poolId: row.pool_id,
    apiKeyId: row.api_key_id,
    model: row.model,
    capValue: row.cap_value,
    capUnit: row.cap_unit as QuotaModelCapUnit,
  };
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

/**
 * Retrieve the cap for a specific (pool, key, model) triple.
 * Returns null if no cap is configured.
 */
function getModelCap(poolId: string, apiKeyId: string, model: string): ModelCap | null {
  const row = getDb()
    .prepare<ModelCapRow>(
      `SELECT pool_id, api_key_id, model, cap_value, cap_unit
       FROM quota_allocation_model_caps
       WHERE pool_id = ? AND api_key_id = ? AND model = ?`
    )
    .get(poolId, apiKeyId, model);
  return row ? rowToModelCap(row) : null;
}

/** Caps of one key in one pool, ordered by model. */
function listModelCapsForApiKey(poolId: string, apiKeyId: string): ModelCap[] {
  return getDb()
    .prepare<ModelCapRow>(
      `SELECT pool_id, api_key_id, model, cap_value, cap_unit
       FROM quota_allocation_model_caps
       WHERE pool_id = ? AND api_key_id = ?
       ORDER BY model`
    )
    .all(poolId, apiKeyId)
    .map(rowToModelCap);
}

function setModelCap(cap: ModelCap): void {
  getDb()
    .prepare(
      `INSERT INTO quota_allocation_model_caps
         (pool_id, api_key_id, model, cap_value, cap_unit)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(pool_id, api_key_id, model) DO UPDATE SET
         cap_value = excluded.cap_value,
         cap_unit  = excluded.cap_unit`
    )
    .run(cap.poolId, cap.apiKeyId, cap.model, cap.capValue, cap.capUnit);
}

export const sqliteQuotaModelCapRepository: QuotaModelCapRepository = {
  find: async (poolId, apiKeyId, model) => getModelCap(poolId, apiKeyId, model),
  listForApiKey: async (poolId, apiKeyId) => listModelCapsForApiKey(poolId, apiKeyId),
  upsert: async (cap) => setModelCap(cap),
};

/** Synchronous compatibility is SQLite-only, not part of the portable contract. */
export const sqliteQuotaModelCapLegacySync = {
  getModelCap,
  listModelCapsForApiKey,
  setModelCap,
};
