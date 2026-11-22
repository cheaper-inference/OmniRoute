/**
 * db/providerPlans.ts — CRUD for provider_plans table.
 *
 * Stores per-connection quota dimension plans (manual overrides or auto-
 * detected). dimensions_json is a JSON-serialized QuotaDimension[] array.
 * getPlan() and listPlans() parse it back to objects on read.
 *
 * SQL lives in the SQLite repository, via prepared statements (Hard Rule #5).
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F2).
 */

import type {
  ProviderPlan,
  ProviderPlanRepository,
  QuotaDimension,
} from "@/domain/persistence/providerNodeRepositories";
import { providerNodeRepositories } from "./repositories/providerNodeRepositories";

// Type shapes live with the repository contract (aligned with src/lib/quota/dimensions.ts).
export type { ProviderPlan, QuotaDimension } from "@/domain/persistence/providerNodeRepositories";

/**
 * Persistence lives behind ProviderPlanRepository. The exports below stay synchronous
 * (SQLite-only legacy access) because quota enforcement resolves plans without awaiting.
 */
const legacy = providerNodeRepositories.legacySync.plans;

/** Async persistence contract. */
export function getProviderPlanRepository(): ProviderPlanRepository {
  return providerNodeRepositories.plans;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get the plan for a specific provider connection, or null if not found.
 * Parses dimensions_json into a typed QuotaDimension array.
 */
export function getPlan(connectionId: string): ProviderPlan | null {
  return legacy.findByConnectionId(connectionId);
}

/**
 * List all provider plans stored in the DB.
 */
export function listPlans(): ProviderPlan[] {
  return legacy.list();
}

/**
 * Upsert a provider plan. If a row for connectionId already exists it is
 * replaced (ON CONFLICT DO UPDATE). Serializes dimensions to JSON.
 *
 * @param connectionId Unique provider connection identifier.
 * @param provider     Provider name (e.g. "codex", "kimi").
 * @param dimensions   Array of QuotaDimension objects.
 * @param source       "auto" = detected at runtime; "manual" = operator config.
 */
export function upsertPlan(
  connectionId: string,
  provider: string,
  dimensions: QuotaDimension[],
  source: "auto" | "manual"
): void {
  legacy.upsert(connectionId, provider, dimensions, source, new Date().toISOString());
}

/**
 * Delete the plan for a connection (clears override, falls back to auto/catalog).
 * Returns true if a row was deleted, false if not found.
 */
export function deletePlan(connectionId: string): boolean {
  return legacy.delete(connectionId);
}
