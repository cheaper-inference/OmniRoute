import { getProviderConnectionFamilyIds } from "@/shared/constants/providers";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers/noauth";
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
 * Same rule as the Providers page "Configured only" mode: a provider counts when any
 * connection belongs to its family, and no-auth providers always count because they
 * never create a connection row. Compatible nodes match by node id, which is the
 * catalog entry's `id`.
 */
export function isPricingProviderConfigured(
  provider: PricingFilterProvider,
  connectedProviderIds: ReadonlySet<string>
): boolean {
  if (Object.hasOwn(NOAUTH_PROVIDERS, provider.id)) return true;
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
