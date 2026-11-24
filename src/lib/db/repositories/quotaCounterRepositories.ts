import type {
  KeyQuotaCounterRepository,
  QuotaConsumptionRepository,
} from "@/domain/persistence/quotaCounterRepository";
import {
  sqliteKeyQuotaCounterLegacySync,
  sqliteKeyQuotaCounterRepository,
  sqliteQuotaConsumptionLegacySync,
  sqliteQuotaConsumptionRepository,
} from "./sqliteQuotaCounterRepository";

export interface QuotaCounterRepositories {
  keyQuotaCounters: KeyQuotaCounterRepository;
  quotaConsumption: QuotaConsumptionRepository;
  legacySync: {
    keyQuotaCounters: typeof sqliteKeyQuotaCounterLegacySync;
    quotaConsumption: typeof sqliteQuotaConsumptionLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Legacy synchronous access is explicitly separate from the Promise contract;
 * it does not pretend to support a future network database synchronously.
 */
export const quotaCounterRepositories: QuotaCounterRepositories = {
  keyQuotaCounters: sqliteKeyQuotaCounterRepository,
  quotaConsumption: sqliteQuotaConsumptionRepository,
  legacySync: {
    keyQuotaCounters: sqliteKeyQuotaCounterLegacySync,
    quotaConsumption: sqliteQuotaConsumptionLegacySync,
  },
};
