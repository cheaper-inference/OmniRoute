import type {
  DiscoveryResultRepository,
  ModelAliasRepository,
  ServiceModelRepository,
} from "@/domain/persistence/modelCatalogRepositories";
import {
  sqliteDiscoveryResultLegacySync,
  sqliteDiscoveryResultRepository,
} from "./sqliteDiscoveryResultRepository";
import { sqliteModelAliasRepository } from "./sqliteModelAliasRepository";
import {
  sqliteServiceModelLegacySync,
  sqliteServiceModelRepository,
} from "./sqliteServiceModelRepository";

export interface ModelCatalogRepositories {
  aliases: ModelAliasRepository;
  discoveryResults: DiscoveryResultRepository;
  serviceModels: ServiceModelRepository;
  legacySync: {
    discoveryResults: typeof sqliteDiscoveryResultLegacySync;
    serviceModels: typeof sqliteServiceModelLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Discovery results and service model lists are read synchronously by existing
 * routes, the service supervisor and the provider manifest, so that access stays
 * explicitly separate from the Promise contract instead of pretending to be
 * backend-neutral. Model aliases were already async and need no sync path.
 */
export const modelCatalogRepositories: ModelCatalogRepositories = {
  aliases: sqliteModelAliasRepository,
  discoveryResults: sqliteDiscoveryResultRepository,
  serviceModels: sqliteServiceModelRepository,
  legacySync: {
    discoveryResults: sqliteDiscoveryResultLegacySync,
    serviceModels: sqliteServiceModelLegacySync,
  },
};
