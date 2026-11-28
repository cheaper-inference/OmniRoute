import type {
  DiscoveryResultRepository,
  ModelAliasRepository,
  ServiceModelRepository,
} from "@/domain/persistence/modelCatalogRepositories";
import {
  sqliteDiscoveryResultLegacySync,
  sqliteDiscoveryResultRepository,
} from "./sqliteDiscoveryResultRepository";
import {
  sqliteModelAliasLegacySync,
  sqliteModelAliasRepository,
} from "./sqliteModelAliasRepository";
import {
  sqliteServiceModelLegacySync,
  sqliteServiceModelRepository,
} from "./sqliteServiceModelRepository";

export interface ModelCatalogRepositories {
  aliases: ModelAliasRepository;
  discoveryResults: DiscoveryResultRepository;
  serviceModels: ServiceModelRepository;
  legacySync: {
    aliases: typeof sqliteModelAliasLegacySync;
    discoveryResults: typeof sqliteDiscoveryResultLegacySync;
    serviceModels: typeof sqliteServiceModelLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Discovery results and service model lists are read synchronously by existing
 * routes, the service supervisor and the provider manifest. The alias facade is
 * async but runs each write and its backup/cache invalidation in one turn. That
 * synchronous access stays explicitly separate from the Promise contract instead
 * of pretending to be backend-neutral.
 */
export const modelCatalogRepositories: ModelCatalogRepositories = {
  aliases: sqliteModelAliasRepository,
  discoveryResults: sqliteDiscoveryResultRepository,
  serviceModels: sqliteServiceModelRepository,
  legacySync: {
    aliases: sqliteModelAliasLegacySync,
    discoveryResults: sqliteDiscoveryResultLegacySync,
    serviceModels: sqliteServiceModelLegacySync,
  },
};
