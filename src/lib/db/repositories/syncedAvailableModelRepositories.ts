import type { SyncedAvailableModelRepository } from "@/domain/persistence/syncedAvailableModelRepository";
import {
  sqliteSyncedAvailableModelLegacySync,
  sqliteSyncedAvailableModelRepository,
} from "./sqliteSyncedAvailableModelRepository";

export interface SyncedAvailableModelRepositories {
  syncedModels: SyncedAvailableModelRepository;
  legacySync: {
    syncedModels: typeof sqliteSyncedAvailableModelLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * The canonical catalog write runs inside the Codex connection write fence and the
 * vision lookup is a synchronous capability read, so their SQLite access stays
 * explicitly separate from the Promise contract instead of pretending to be
 * backend-neutral.
 */
export const syncedAvailableModelRepositories: SyncedAvailableModelRepositories = {
  syncedModels: sqliteSyncedAvailableModelRepository,
  legacySync: {
    syncedModels: sqliteSyncedAvailableModelLegacySync,
  },
};
