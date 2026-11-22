import type {
  OneproxyListOptions,
  OneproxyProxyRecord,
  OneproxyRegistryRepository,
} from "@/domain/persistence/proxyPoolSourceRepositories";
import { proxyPoolSourceRepositories } from "./repositories/proxyPoolSourceRepositories";

export type { OneproxyProxyRecord } from "@/domain/persistence/proxyPoolSourceRepositories";

/** Async persistence contract for active 1proxy registry rows. */
export function getOneproxyRegistryRepository(): OneproxyRegistryRepository {
  return proxyPoolSourceRepositories.oneproxy;
}

export async function listOneproxyProxies(
  options?: OneproxyListOptions
): Promise<OneproxyProxyRecord[]> {
  return proxyPoolSourceRepositories.legacySync.registryViews.listActiveOneproxy(options);
}
