import type {
  ProviderNodeRepository,
  ProviderPlanRepository,
} from "@/domain/persistence/providerNodeRepositories";
import {
  sqliteProviderNodeLegacySync,
  sqliteProviderNodeRepository,
} from "./sqliteProviderNodeRepository";
import {
  sqliteProviderPlanLegacySync,
  sqliteProviderPlanRepository,
} from "./sqliteProviderPlanRepository";

export interface ProviderNodeRepositories {
  nodes: ProviderNodeRepository;
  plans: ProviderPlanRepository;
  legacySync: {
    nodes: typeof sqliteProviderNodeLegacySync;
    plans: typeof sqliteProviderPlanLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Plans are read synchronously by quota enforcement, and the node facade keeps each
 * write, its backup and its cache invalidation in one turn, so that access stays
 * explicitly separate from the Promise contract instead of pretending to be
 * backend-neutral.
 */
export const providerNodeRepositories: ProviderNodeRepositories = {
  nodes: sqliteProviderNodeRepository,
  plans: sqliteProviderPlanRepository,
  legacySync: {
    nodes: sqliteProviderNodeLegacySync,
    plans: sqliteProviderPlanLegacySync,
  },
};
