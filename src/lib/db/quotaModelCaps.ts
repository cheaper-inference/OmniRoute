/**
 * db/quotaModelCaps.ts — per-model quota cap persistence facade.
 *
 * Per-(pool_id, api_key_id, model) budget caps for the Quota Share Engine.
 * Closes the "one key drains the pool on a single model" attack (Fase 3 #7).
 *
 * getQuotaModelCapRepository() exposes the Promise-based domain API. The
 * function exports remain synchronous, SQLite-only legacy helpers used by the
 * quota enforce hot path, delegating to the same SQL implementation.
 */

import type {
  ModelCap,
  QuotaModelCapRepository,
} from "@/domain/persistence/quotaDefinitionRepositories";
import { quotaDefinitionRepositories } from "./repositories/quotaDefinitionRepositories";

export type { ModelCap } from "@/domain/persistence/quotaDefinitionRepositories";

/** Async persistence contract; callers await its operations. */
export function getQuotaModelCapRepository(): QuotaModelCapRepository {
  return quotaDefinitionRepositories.modelCaps;
}

/**
 * Retrieve the cap for a specific (pool, key, model) triple.
 * Returns null if no cap is configured.
 */
export function getModelCap(poolId: string, apiKeyId: string, model: string): ModelCap | null {
  return quotaDefinitionRepositories.legacySync.modelCaps.getModelCap(poolId, apiKeyId, model);
}

/** Caps of one key in one pool, ordered by model. */
export function listModelCapsForApiKey(poolId: string, apiKeyId: string): ModelCap[] {
  return quotaDefinitionRepositories.legacySync.modelCaps.listModelCapsForApiKey(poolId, apiKeyId);
}

export function setModelCap(cap: ModelCap): void {
  quotaDefinitionRepositories.legacySync.modelCaps.setModelCap(cap);
}
