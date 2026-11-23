import type { VersionManagerRepository } from "@/domain/persistence/versionManagerRepository";
import {
  sqliteVersionManagerLegacySync,
  sqliteVersionManagerRepository,
} from "./sqliteVersionManagerRepository";

export interface VersionManagerRepositories {
  tools: VersionManagerRepository;
  legacySync: typeof sqliteVersionManagerLegacySync;
}

/**
 * SQLite-only composition root for managed binaries and embedded service state.
 * There is deliberately no backend selection. Legacy synchronous access is kept
 * explicitly separate from the Promise contract instead of pretending to be
 * backend-neutral.
 */
export const versionManagerRepositories: VersionManagerRepositories = {
  tools: sqliteVersionManagerRepository,
  legacySync: sqliteVersionManagerLegacySync,
};
