import type { JobRegistryRepository } from "@/domain/persistence/jobRegistryRepository";
import {
  sqliteJobRegistryLegacySync,
  sqliteJobRegistryRepository,
} from "./sqliteJobRegistryRepository";

export interface JobRegistryRepositories {
  jobs: JobRegistryRepository;
  legacySync: typeof sqliteJobRegistryLegacySync;
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Legacy synchronous access is explicitly separate from the Promise contract;
 * it does not pretend to support a future network database synchronously.
 */
export const jobRegistryRepositories: JobRegistryRepositories = {
  jobs: sqliteJobRegistryRepository,
  legacySync: sqliteJobRegistryLegacySync,
};
