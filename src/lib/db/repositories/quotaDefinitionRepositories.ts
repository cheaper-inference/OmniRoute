import type {
  QuotaGroupRepository,
  QuotaModelCapRepository,
  QuotaScheduleRepository,
} from "@/domain/persistence/quotaDefinitionRepositories";
import {
  sqliteQuotaGroupLegacySync,
  sqliteQuotaGroupRepository,
} from "./sqliteQuotaGroupRepository";
import {
  sqliteQuotaModelCapLegacySync,
  sqliteQuotaModelCapRepository,
} from "./sqliteQuotaModelCapRepository";
import {
  sqliteQuotaScheduleLegacySync,
  sqliteQuotaScheduleRepository,
} from "./sqliteQuotaScheduleRepository";

export interface QuotaDefinitionRepositories {
  groups: QuotaGroupRepository;
  modelCaps: QuotaModelCapRepository;
  schedules: QuotaScheduleRepository;
  legacySync: {
    groups: typeof sqliteQuotaGroupLegacySync;
    modelCaps: typeof sqliteQuotaModelCapLegacySync;
    schedules: typeof sqliteQuotaScheduleLegacySync;
  };
}

/**
 * SQLite-only composition root for quota definitions (groups, per-model caps,
 * schedules). There is deliberately no backend selection. Legacy synchronous
 * access is explicitly separate from the Promise contract; it serves the quota
 * hot path and pool transactions that are still synchronous.
 */
export const quotaDefinitionRepositories: QuotaDefinitionRepositories = {
  groups: sqliteQuotaGroupRepository,
  modelCaps: sqliteQuotaModelCapRepository,
  schedules: sqliteQuotaScheduleRepository,
  legacySync: {
    groups: sqliteQuotaGroupLegacySync,
    modelCaps: sqliteQuotaModelCapLegacySync,
    schedules: sqliteQuotaScheduleLegacySync,
  },
};
