/**
 * db/quotaGroups.ts — quota group persistence facade.
 *
 * Quota groups are first-class entities that pool multiple quota pools
 * under a shared namespace. Pools reference groups via quota_pools.group_id.
 *
 * Routes use getQuotaGroupRepository() for the Promise-based domain API.
 * Existing function exports remain synchronous, SQLite-only legacy helpers,
 * delegating through legacySync to the same SQL implementation. Model-catalog
 * cache invalidation stays here, outside the portable repository contract.
 */

import type {
  QuotaGroup,
  QuotaGroupRepository,
} from "@/domain/persistence/quotaDefinitionRepositories";
import { invalidateModelCatalogCache } from "./readCache";
import { quotaDefinitionRepositories } from "./repositories/quotaDefinitionRepositories";

export type { QuotaGroup } from "@/domain/persistence/quotaDefinitionRepositories";

const repository = quotaDefinitionRepositories.groups;
const legacy = quotaDefinitionRepositories.legacySync.groups;

const quotaGroupRepository: QuotaGroupRepository = {
  ...repository,
  async rename(id, name) {
    const renamed = await repository.rename(id, name);
    if (renamed) invalidateModelCatalogCache();
    return renamed;
  },
};

/** Route-facing async persistence contract; callers await its operations. */
export function getQuotaGroupRepository(): QuotaGroupRepository {
  return quotaGroupRepository;
}

/**
 * Create a new quota group with the given name.
 * Returns the newly created QuotaGroup row.
 */
export function createGroup(name: string): QuotaGroup {
  return legacy.createGroup(name);
}

/**
 * Get a single quota group by id.
 * Returns null if not found.
 */
export function getGroup(id: string): QuotaGroup | null {
  return legacy.getGroup(id);
}

/**
 * Convenience helper — returns just the group name, or null if not found.
 */
export function getGroupName(id: string): string | null {
  return legacy.getGroupName(id);
}

/**
 * List all quota groups, ordered by created_at ascending.
 */
export function listGroups(): QuotaGroup[] {
  return legacy.listGroups();
}

/**
 * Rename an existing group.
 * Returns true if the row was updated, false if the group was not found.
 */
export function renameGroup(id: string, name: string): boolean {
  if (legacy.renameGroup(id, name)) {
    invalidateModelCatalogCache();
    return true;
  }
  return false;
}

/**
 * Delete a quota group by id.
 *
 * Throws if:
 * - The group is the protected seed 'group-demo' — it must always exist.
 * - Any quota_pools row still references this group via group_id — the caller
 *   must reassign or delete those pools first.
 *
 * Returns true if a row was deleted, false if the group was not found.
 */
export function deleteGroup(id: string): boolean {
  return legacy.deleteGroup(id);
}
