import type {
  FreeProxyRepository,
  OneproxyRegistryRepository,
  ProxyPoolMembershipRepository,
} from "@/domain/persistence/proxyPoolSourceRepositories";
import { sqliteFreeProxyLegacySync, sqliteFreeProxyRepository } from "./sqliteFreeProxyRepository";
import {
  sqliteOneproxyRegistryRepository,
  sqliteProxyPoolMembershipRepository,
  sqliteProxyRegistryViewsLegacySync,
} from "./sqliteProxyRegistryViews";

export interface ProxyPoolSourceRepositories {
  freeProxies: FreeProxyRepository;
  oneproxy: OneproxyRegistryRepository;
  poolMembership: ProxyPoolMembershipRepository;
  legacySync: {
    freeProxies: typeof sqliteFreeProxyLegacySync;
    registryViews: typeof sqliteProxyRegistryViewsLegacySync;
  };
}

/**
 * SQLite-only composition root. There is deliberately no backend selection.
 * The facades keep every write and its backup (and, for pool appends, the registry
 * generation bump) in one synchronous turn, so that access stays explicitly separate
 * from the Promise contract instead of pretending to be backend-neutral.
 */
export const proxyPoolSourceRepositories: ProxyPoolSourceRepositories = {
  freeProxies: sqliteFreeProxyRepository,
  oneproxy: sqliteOneproxyRegistryRepository,
  poolMembership: sqliteProxyPoolMembershipRepository,
  legacySync: {
    freeProxies: sqliteFreeProxyLegacySync,
    registryViews: sqliteProxyRegistryViewsLegacySync,
  },
};
