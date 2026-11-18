import { matchesSearch } from "@/shared/utils/turkishText";

interface CompareProvider {
  id: string;
  alias: string;
  /** Pricing namespace when it differs from `alias` (compatible nodes). */
  pricingKey?: string;
  models: ReadonlyArray<{ id: string; name: string }>;
}

type PricingTable = Record<string, Record<string, Record<string, number>>>;

export interface ModelOffer {
  providerId: string;
  providerAlias: string;
  modelId: string;
  modelName: string;
  /** USD per 1M tokens; null when the offer has no price for this field. */
  input: number | null;
  output: number | null;
  cached: number | null;
  /** False when no price row exists: shown as unpriced, never as $0. */
  priced: boolean;
}

export interface ModelComparisonGroup {
  key: string;
  name: string;
  offers: ModelOffer[];
}

/**
 * The key offers of one model share across providers (#18642). Only the safe differences
 * are folded: case, an org or path prefix (`zai-org/`, `accounts/fireworks/models/`) and the
 * version separator between two digits (`5.2`, `5-2`, `5p2`). Anything else (`-fast`,
 * `-FP8`, `:thinking`, a vendor word glued to the name) stays on its own key, so two models
 * are never merged by guess.
 */
export function normalizeModelKey(modelId: string): string {
  let key = (modelId.trim().toLowerCase().split("/").pop() ?? "").trim();
  let previous = "";
  while (key !== previous) {
    previous = key;
    key = key.replace(/(\d)[p_-](\d)/g, "$1.$2");
  }
  return key;
}

function priceField(row: Record<string, number> | undefined, field: string): number | null {
  const value = row?.[field];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function compareOffers(left: ModelOffer, right: ModelOffer): number {
  if (left.priced !== right.priced) return left.priced ? -1 : 1;
  const byInput = (left.input ?? Infinity) - (right.input ?? Infinity);
  if (byInput !== 0 && !Number.isNaN(byInput)) return byInput;
  const byOutput = (left.output ?? Infinity) - (right.output ?? Infinity);
  if (byOutput !== 0 && !Number.isNaN(byOutput)) return byOutput;
  return left.providerAlias.localeCompare(right.providerAlias);
}

function mostCommonName(offers: ModelOffer[]): string {
  const counts = new Map<string, number>();
  for (const offer of offers) counts.set(offer.modelName, (counts.get(offer.modelName) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}

/** A search matches a group by model or by any offering provider, keeping every offer. */
function groupMatchesSearch(group: ModelComparisonGroup, searchQuery: string): boolean {
  return (
    matchesSearch(group.key, searchQuery) ||
    group.offers.some(
      (offer) =>
        matchesSearch(offer.modelId, searchQuery) ||
        matchesSearch(offer.modelName, searchQuery) ||
        matchesSearch(offer.providerId, searchQuery) ||
        matchesSearch(offer.providerAlias, searchQuery)
    )
  );
}

/**
 * The Compare empty-state message: the "search for a model" hint only fits an unsearched,
 * unfiltered list; after a search, or when the filters leave no provider, it is the provider
 * view's "no match" text.
 */
export function compareEmptyMessageKey({
  searchQuery,
  providerCount,
}: {
  searchQuery: string;
  providerCount: number;
}): "pricingCompareEmpty" | "noProvidersMatch" {
  return searchQuery.trim() || providerCount === 0 ? "noProvidersMatch" : "pricingCompareEmpty";
}

/**
 * Every model's offers across the given providers, cheapest first (input, then output;
 * unpriced last). Without a search only models offered by two or more providers are
 * returned; a search also returns single-provider matches so it never hides a model.
 */
export function buildModelComparison(
  providers: ReadonlyArray<CompareProvider>,
  pricing: PricingTable,
  { searchQuery }: { searchQuery: string }
): ModelComparisonGroup[] {
  const offersByKey = new Map<string, ModelOffer[]>();
  for (const provider of providers) {
    const table = pricing[provider.pricingKey || provider.alias];
    for (const model of provider.models) {
      const row = table?.[model.id];
      const input = priceField(row, "input");
      const output = priceField(row, "output");
      const offer: ModelOffer = {
        providerId: provider.id,
        providerAlias: provider.alias,
        modelId: model.id,
        modelName: model.name || model.id,
        input,
        output,
        cached: priceField(row, "cached"),
        priced: input !== null || output !== null,
      };
      const key = normalizeModelKey(model.id);
      const offers = offersByKey.get(key);
      if (offers) offers.push(offer);
      else offersByKey.set(key, [offer]);
    }
  }

  const query = searchQuery.trim();
  const groups: ModelComparisonGroup[] = [];
  for (const [key, offers] of offersByKey) {
    offers.sort(compareOffers);
    const group = { key, name: mostCommonName(offers), offers };
    const providerCount = new Set(offers.map((offer) => offer.providerAlias)).size;
    if (query ? groupMatchesSearch(group, query) : providerCount >= 2) groups.push(group);
  }
  const providerCount = (group: ModelComparisonGroup) =>
    new Set(group.offers.map((offer) => offer.providerAlias)).size;
  return groups.sort(
    (left, right) => providerCount(right) - providerCount(left) || left.key.localeCompare(right.key)
  );
}
