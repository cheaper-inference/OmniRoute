import type { ExclusiveConnectionLeaseRepository } from "@/domain/persistence/exclusiveConnectionLeaseRepository";
import {
  sqliteExclusiveConnectionLeaseLegacySync,
  sqliteExclusiveConnectionLeaseRepository,
} from "./sqliteExclusiveConnectionLeaseRepository";

export interface ExclusiveConnectionLeaseRepositories {
  leases: ExclusiveConnectionLeaseRepository;
  legacySync: typeof sqliteExclusiveConnectionLeaseLegacySync;
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Legacy synchronous access is explicitly separate from the Promise contract;
 * it does not pretend to support a future network database synchronously.
 */
export const exclusiveConnectionLeaseRepositories: ExclusiveConnectionLeaseRepositories = {
  leases: sqliteExclusiveConnectionLeaseRepository,
  legacySync: sqliteExclusiveConnectionLeaseLegacySync,
};
