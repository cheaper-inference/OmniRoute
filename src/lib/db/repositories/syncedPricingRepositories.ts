import type { SyncedPricingRepository } from "@/domain/persistence/syncedPricingRepository";
import {
  sqliteSyncedPricingLegacySync,
  sqliteSyncedPricingRepository,
} from "./sqliteSyncedPricingRepository";

export interface SyncedPricingRepositories {
  syncedPricing: SyncedPricingRepository;
  legacySync: typeof sqliteSyncedPricingLegacySync;
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * The pricing sync service reads and writes synchronously: the synced price map
 * is read on the per-model pricing lookup path, and each write is followed by its
 * backup and cache invalidation in the same turn. That synchronous access stays
 * explicitly separate from the Promise contract instead of pretending to be
 * backend-neutral.
 */
export const syncedPricingRepositories: SyncedPricingRepositories = {
  syncedPricing: sqliteSyncedPricingRepository,
  legacySync: sqliteSyncedPricingLegacySync,
};
