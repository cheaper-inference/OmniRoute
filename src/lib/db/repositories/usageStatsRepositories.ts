import type { UsageStatsReadRepository } from "@/domain/persistence/usageStatsReadRepository";
import {
  sqliteUsageStatsReadLegacySync,
  sqliteUsageStatsReadRepository,
} from "./sqliteUsageStatsReadRepository";

export interface UsageStatsRepositories {
  reads: UsageStatsReadRepository;
  legacySync: typeof sqliteUsageStatsReadLegacySync;
}

/**
 * SQLite-only composition root for the `usage_history` statistics read models.
 * There is deliberately no backend selection. Legacy synchronous access is kept
 * explicitly separate from the Promise contract instead of pretending to be
 * backend-neutral.
 */
export const usageStatsRepositories: UsageStatsRepositories = {
  reads: sqliteUsageStatsReadRepository,
  legacySync: sqliteUsageStatsReadLegacySync,
};
