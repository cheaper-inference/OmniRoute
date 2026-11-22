/**
 * Database module: Discovery Results
 *
 * CRUD for the automated provider-discovery tool (opt-in, default off). Rows
 * live in the `discovery_results` table (migration 074). The Discovery service
 * (`src/lib/discovery/`) writes findings here via {@link upsertDiscoveryResult};
 * the `/api/discovery/*` routes read/verify/delete them.
 *
 * Persistence lives behind DiscoveryResultRepository. The exports below stay
 * synchronous (SQLite-only legacy access) for the existing routes and service.
 *
 * See `_tasks/features-v3.8.42/gaps/DISCOVERY_TOOL_DESIGN.md` for the design.
 */

import type {
  DiscoveryResult,
  DiscoveryResultRepository,
} from "@/domain/persistence/modelCatalogRepositories";
import { modelCatalogRepositories } from "./repositories/modelCatalogRepositories";

export type {
  DiscoveryAuthType,
  DiscoveryMethod,
  DiscoveryResult,
  DiscoveryRiskLevel,
  DiscoveryStatus,
} from "@/domain/persistence/modelCatalogRepositories";

const legacy = modelCatalogRepositories.legacySync.discoveryResults;

/** Async persistence contract. */
export function getDiscoveryResultRepository(): DiscoveryResultRepository {
  return modelCatalogRepositories.discoveryResults;
}

/**
 * Insert or update a discovery finding. Uniqueness is keyed on
 * `(provider_id, method, endpoint)` (the table's UNIQUE constraint), so
 * re-discovering the same endpoint updates the existing row rather than
 * duplicating it. Returns the persisted row (with its id).
 */
export function upsertDiscoveryResult(result: DiscoveryResult): DiscoveryResult {
  return legacy.upsert(result);
}

/**
 * List discovery results, optionally filtered to a single provider. Newest
 * findings first.
 */
export function getDiscoveryResults(providerId?: string): DiscoveryResult[] {
  return legacy.list(providerId);
}

export function getDiscoveryResultById(id: number): DiscoveryResult | null {
  return legacy.findById(id);
}

/**
 * Mark a finding as verified, stamping `verified_at`. Returns the updated row,
 * or null if no row with that id exists.
 */
export function markVerified(id: number): DiscoveryResult | null {
  return legacy.markVerified(id);
}

/**
 * Delete a finding. Returns true if a row was removed, false if the id was not
 * found.
 */
export function deleteDiscoveryResult(id: number): boolean {
  return legacy.remove(id);
}
