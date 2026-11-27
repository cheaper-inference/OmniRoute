import type {
  ArenaEloSyncStateRepository,
  SyncedPricingRepository,
} from "@/domain/persistence/externalSyncStateRepositories";
import {
  sqliteArenaEloSyncStateLegacySync,
  sqliteArenaEloSyncStateRepository,
} from "./sqliteArenaEloSyncStateRepository";
import {
  sqliteSyncedPricingLegacySync,
  sqliteSyncedPricingRepository,
} from "./sqliteSyncedPricingRepository";

export interface ExternalSyncStateRepositories {
  syncedPricing: SyncedPricingRepository;
  arenaEloSyncState: ArenaEloSyncStateRepository;
  legacySync: {
    syncedPricing: typeof sqliteSyncedPricingLegacySync;
    arenaEloSyncState: typeof sqliteArenaEloSyncStateLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * The pricing and Arena ELO sync services read and write synchronously (the
 * synced price map is read on the per-model pricing lookup path, and each write
 * is followed by its backup and cache invalidation in the same turn). That
 * synchronous access stays explicitly separate from the Promise contract
 * instead of pretending to be backend-neutral.
 */
export const externalSyncStateRepositories: ExternalSyncStateRepositories = {
  syncedPricing: sqliteSyncedPricingRepository,
  arenaEloSyncState: sqliteArenaEloSyncStateRepository,
  legacySync: {
    syncedPricing: sqliteSyncedPricingLegacySync,
    arenaEloSyncState: sqliteArenaEloSyncStateLegacySync,
  },
};
