import { getProviderConnectionFamilyIds } from "@/shared/constants/providers";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers/noauth";
import { isNoAuthProviderBlocked } from "@/shared/utils/noAuthProviders";
import { matchesSearch } from "@/shared/utils/turkishText";

export type PricingDisplayMode = "all" | "configured";

interface PricingFilterProvider {
  id: string;
  alias: string;
}

interface PricingFilterModel {
  id: string;
  name: string;
}

/**
 * The Providers filter options. "Configured" is offered only once both of its inputs have
 * loaded, since without them its count would be wrong.
 */
export function pricingDisplayModeOptions(
  allLabel: string,
  configuredLabel: string,
  configurationLoaded: boolean
): Array<{ value: PricingDisplayMode; label: string }> {
  const options: Array<{ value: PricingDisplayMode; label: string }> = [
    { value: "all", label: allLabel },
  ];
  if (configurationLoaded) options.push({ value: "configured", label: configuredLabel });
  return options;
}

/** Provider ids that have at least one connection, from `GET /api/providers`. */
export function collectConnectedProviderIds(
  connections: ReadonlyArray<{ provider?: unknown }> | null | undefined
): Set<string> {
  const ids = new Set<string>();
  for (const connection of connections || []) {
    if (typeof connection?.provider === "string" && connection.provider) {
      ids.add(connection.provider);
    }
  }
  return ids;
}

/**
 * A provider counts as configured when any connection belongs to its family, or when it
 * is a no-auth provider (no connection row) that is not turned off in
 * `settings.blockedProviders`, which is also what stops it being routed to. Compatible
 * nodes match by node id, which is the catalog entry's `id`.
 */
export function isPricingProviderConfigured(
  provider: PricingFilterProvider,
  connectedProviderIds: ReadonlySet<string>,
  blockedProviders: unknown = []
): boolean {
  if (Object.hasOwn(NOAUTH_PROVIDERS, provider.id)) {
    return !isNoAuthProviderBlocked(blockedProviders, provider.id, provider.alias);
  }
  return getProviderConnectionFamilyIds(provider.id).some((id) => connectedProviderIds.has(id));
}

/**
 * The models to list under a provider for the current search. A search that matches
 * the provider itself keeps its whole list; otherwise only the matching models are
 * shown, so a model search lists that model across providers without the rest of each
 * provider's catalog.
 */
export function modelsMatchingSearch<TModel extends PricingFilterModel>(
  provider: PricingFilterProvider,
  models: TModel[],
  searchQuery: string
): TModel[] {
  if (!searchQuery.trim()) return models;
  if (matchesSearch(provider.alias, searchQuery) || matchesSearch(provider.id, searchQuery)) {
    return models;
  }
  return models.filter(
    (model) => matchesSearch(model.id, searchQuery) || matchesSearch(model.name, searchQuery)
  );
}

/**
 * The providers the Compare models view groups (#18642): the Auth filter and the
 * Providers (All / Configured only) filter of the provider view, without search,
 * coverage or sort, which describe providers rather than models.
 */
export function providersForComparison<
  TProvider extends PricingFilterProvider & { authType?: string },
>(
  providers: ReadonlyArray<TProvider>,
  {
    authFilter,
    displayMode,
    connectedProviderIds,
    blockedProviders,
  }: {
    authFilter: string;
    displayMode: PricingDisplayMode;
    connectedProviderIds: ReadonlySet<string>;
    blockedProviders: unknown;
  }
): TProvider[] {
  return providers.filter((provider) => {
    const auth = (provider.authType || "unknown").toLowerCase();
    const authMatches =
      authFilter === "all" ||
      auth === authFilter ||
      (authFilter === "unknown" && !["oauth", "apikey"].includes(auth));
    return (
      authMatches &&
      (displayMode === "all" ||
        isPricingProviderConfigured(provider, connectedProviderIds, blockedProviders))
    );
  });
}
