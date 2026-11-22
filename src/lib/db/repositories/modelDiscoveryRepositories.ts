import type {
  CcAliasOverrideRepository,
  DiscoveryStateRepository,
} from "@/domain/persistence/modelDiscoveryRepositories";
import {
  sqliteCcAliasOverrideLegacySync,
  sqliteCcAliasOverrideRepository,
} from "./sqliteCcAliasOverrideRepository";
import {
  sqliteDiscoveryStateLegacySync,
  sqliteDiscoveryStateRepository,
} from "./sqliteDiscoveryStateRepository";

export interface ModelDiscoveryRepositories {
  discoveryState: DiscoveryStateRepository;
  ccAliasOverrides: CcAliasOverrideRepository;
  legacySync: {
    discoveryState: typeof sqliteDiscoveryStateLegacySync;
    ccAliasOverrides: typeof sqliteCcAliasOverrideLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * Both DB facades are synchronous today: the providers list route, the discovery
 * outcome recorder, the connection-deletion cleanup, the cc-alias route, the
 * /v1/models catalog builder and the discovery-alias resolver call them without
 * awaiting, and each cc-alias write invalidates the model catalog in the same
 * turn. That synchronous access stays explicitly separate from the Promise
 * contract instead of pretending to be backend-neutral.
 */
export const modelDiscoveryRepositories: ModelDiscoveryRepositories = {
  discoveryState: sqliteDiscoveryStateRepository,
  ccAliasOverrides: sqliteCcAliasOverrideRepository,
  legacySync: {
    discoveryState: sqliteDiscoveryStateLegacySync,
    ccAliasOverrides: sqliteCcAliasOverrideLegacySync,
  },
};
