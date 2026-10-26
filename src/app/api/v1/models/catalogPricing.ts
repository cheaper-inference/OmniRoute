/**
 * catalogPricing.ts — the `pricing` object on GET /v1/models entries.
 *
 * Each priced entry carries ONE object with two halves taken from the same pricing row:
 *
 *  - OpenRouter-compatible strings, USD per token: `prompt`, `completion` and, when the
 *    row has a cache price, `input_cache_read` / `input_cache_write`. Plain decimals
 *    (never exponent notation), converted from the stored per-1M rates without float math.
 *  - The pre-existing numeric fields, USD per 1M tokens: `input`, `output` and, when the
 *    row has them, `cached`, `cache_creation`, `reasoning`, `long_context` (kept so
 *    earlier readers of the catalog keep working).
 *
 * The row is the one cost accounting uses (`calculateCostDetailed`): the merged pricing
 * table (`getPricingForModel` rules) tried with `getPricingLookupModels` fallbacks. The
 * table is loaded once per build and every lookup is in-memory and memoized.
 *
 * - A combo is priced as its first visible target (the catalog's own visibility rule).
 * - A model with no pricing row is `"0"` when the catalog marks it free (`free: true`) or
 *   the shipped free-model catalog lists it; otherwise `pricing` is omitted (unknown).
 * - Credit-metered providers bill per request, not per token: they get no per-token
 *   strings and keep the numeric fields catalog enrichment gave them before.
 *
 * Pricing is attached before the synthetic variants (effort tiers, no-thinking, discovery
 * and gateway mirrors) are appended, so each variant copies its base entry's price.
 */

import { getCachedPricing } from "@/lib/db/readCache";
import { findModelPricing, findProviderPricing } from "@/lib/db/settings/pricing";
import { getPricingLookupModels } from "@/lib/usage/costCalculator";
import { isCreditMeteredProvider } from "@/lib/usage/creditMeteredProviders";
import { isCatalogFreeModel } from "@/shared/utils/freeModels";
import { toNumberOrNull } from "@/shared/utils/numeric";

type PricingRow = Record<string, unknown>;
type PricingTable = Record<string, Record<string, PricingRow>>;
type CatalogEntry = Record<string, unknown>;

export type CatalogPricing = {
  prompt: string;
  completion: string;
  input_cache_read?: string;
  input_cache_write?: string;
  input: number;
  output: number;
  cached?: number;
  cache_creation?: number;
  reasoning?: number;
  long_context?: Record<string, unknown>;
};

export type PricingTarget = { provider: string; model: string };

export type CatalogPricingContext = {
  /** Compatible-provider-node prefix → node id, as used by catalog enrichment. */
  providerNodeIdsByPrefix?: Readonly<Record<string, string>>;
  /** Pricing target (first visible target) of a combo, by combo name. */
  resolveComboTarget?: (comboName: string) => PricingTarget | null;
};

const freePricing = (): CatalogPricing => ({ prompt: "0", completion: "0", input: 0, output: 0 });

const ENTRIES_PER_YIELD = 500;

/**
 * USD per 1M tokens → USD per token as a plain decimal string (`2.5` → `"0.0000025"`).
 * Shifts the decimal point of the shortest round-trip representation, so the result has
 * no float noise and no exponent. Expects a finite, non-negative number.
 */
export function perMillionToPerTokenUsd(perMillion: number): string {
  if (perMillion === 0) return "0";
  const [mantissa, exponent] = perMillion.toExponential().split("e");
  const digits = mantissa.replace(".", "");
  // Digits before the decimal point once divided by 1e6.
  const point = Number(exponent) + 1 - 6;
  if (point >= digits.length) return digits + "0".repeat(point - digits.length);
  const text =
    point <= 0
      ? `0.${"0".repeat(-point)}${digits}`
      : `${digits.slice(0, point)}.${digits.slice(point)}`;
  return text.replace(/0+$/, "").replace(/\.$/, "");
}

function readRate(value: unknown): number | null {
  const rate = toNumberOrNull(value);
  return rate !== null && rate >= 0 ? rate : null;
}

/**
 * Catalog `pricing` from a per-1M pricing row, or null when the row has no token rate.
 * A missing input or output rate is `0`, as cost accounting bills it.
 */
export function toCatalogPricing(row: unknown): CatalogPricing | null {
  if (!row || typeof row !== "object" || Array.isArray(row)) return null;
  const record = row as PricingRow;
  const input = readRate(record.input);
  const output = readRate(record.output);
  if (input === null && output === null) return null;
  const cached = readRate(record.cached);
  const cacheCreation = readRate(record.cache_creation);
  // Also carried before the per-token fields existed; kept so no reader loses them.
  const reasoning = readRate(record.reasoning);
  const longContext = record.long_context;
  return {
    prompt: perMillionToPerTokenUsd(input ?? 0),
    completion: perMillionToPerTokenUsd(output ?? 0),
    ...(cached !== null ? { input_cache_read: perMillionToPerTokenUsd(cached) } : {}),
    ...(cacheCreation !== null
      ? { input_cache_write: perMillionToPerTokenUsd(cacheCreation) }
      : {}),
    input: input ?? 0,
    output: output ?? 0,
    ...(cached !== null ? { cached } : {}),
    ...(cacheCreation !== null ? { cache_creation: cacheCreation } : {}),
    ...(reasoning !== null ? { reasoning } : {}),
    ...(longContext && typeof longContext === "object" && !Array.isArray(longContext)
      ? { long_context: longContext as Record<string, unknown> }
      : {}),
  };
}

// Lowercase key index per object, first key wins: the same answer as the linear
// case-insensitive scan in getPricingForModel, without rescanning per lookup.
const lowercaseIndexes = new WeakMap<object, Map<string, unknown>>();

function findIndexed<T>(obj: Record<string, T> | undefined | null, key: string): T | undefined {
  if (!obj || !key) return undefined;
  let index = lowercaseIndexes.get(obj);
  if (!index) {
    index = new Map();
    for (const [k, v] of Object.entries(obj)) {
      const lower = k.toLowerCase();
      if (!index.has(lower)) index.set(lower, v);
    }
    lowercaseIndexes.set(obj, index);
  }
  return index.get(key.toLowerCase()) as T | undefined;
}

/** Memoized (provider, model) → pricing row lookup over one merged pricing table. */
export function createPricingRowLookup(
  table: PricingTable
): (provider: string, model: string) => PricingRow | null {
  const providers = new Map<string, Record<string, PricingRow> | null>();
  const rows = new Map<string, PricingRow | null>();
  return (provider, model) => {
    const memoKey = `${provider}\u0000${model}`;
    const memo = rows.get(memoKey);
    if (memo !== undefined) return memo;
    const providerKey = provider.toLowerCase();
    let providerPricing = providers.get(providerKey);
    if (providerPricing === undefined) {
      providerPricing = findProviderPricing(table, provider, findIndexed);
      providers.set(providerKey, providerPricing);
    }
    let row: PricingRow | null = null;
    if (providerPricing) {
      for (const key of getPricingLookupModels(provider, model)) {
        row = findModelPricing(providerPricing, key, findIndexed);
        if (row) break;
      }
    }
    rows.set(memoKey, row);
    return row;
  };
}

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

/** Provider/model to price an entry by; the same derivation as catalog enrichment. */
function getEntryPricingTarget(
  entry: CatalogEntry,
  ctx: CatalogPricingContext
): PricingTarget | null {
  if (entry.owned_by === "combo") {
    const comboName = nonEmptyString(entry.id);
    return comboName && ctx.resolveComboTarget ? ctx.resolveComboTarget(comboName) : null;
  }
  const publicProvider = nonEmptyString(entry.owned_by);
  if (!publicProvider) return null;
  const id = nonEmptyString(entry.id);
  const model =
    nonEmptyString(entry.root) || (id?.includes("/") ? id.slice(id.indexOf("/") + 1) : id);
  if (!model) return null;
  return { provider: ctx.providerNodeIdsByPrefix?.[publicProvider] || publicProvider, model };
}

function priceTarget(
  target: PricingTarget,
  lookupRow: (provider: string, model: string) => PricingRow | null,
  markedFree: boolean
): CatalogPricing | null {
  // Left to enrichment, which keeps their numeric fields (see normalizeCatalogEntryPricing).
  if (isCreditMeteredProvider(target.provider)) return null;
  const priced = toCatalogPricing(lookupRow(target.provider, target.model));
  if (priced) return priced;
  return markedFree || isCatalogFreeModel(target.provider, target.model) ? freePricing() : null;
}

/**
 * Attach `pricing` to every entry whose price is known. Entries with an unknown price
 * are returned unchanged. A pricing-table failure never breaks the catalog.
 */
export async function attachCatalogPricing(
  models: CatalogEntry[],
  ctx: CatalogPricingContext = {},
  loadTable: () => Promise<Record<string, unknown>> = getCachedPricing
): Promise<CatalogEntry[]> {
  let table: PricingTable;
  try {
    table = (await loadTable()) as PricingTable;
  } catch (error) {
    console.warn("[catalog] Pricing table unavailable; entries keep enrichment pricing:", error);
    return models;
  }
  const lookupRow = createPricingRowLookup(table);
  const out: CatalogEntry[] = [];
  for (const entry of models) {
    const target = getEntryPricingTarget(entry, ctx);
    const pricing = target ? priceTarget(target, lookupRow, entry.free === true) : null;
    out.push(pricing ? { ...entry, pricing } : entry);
    if (out.length % ENTRIES_PER_YIELD === 0) {
      await new Promise<void>((resolve) => setImmediate(resolve));
    }
  }
  return out;
}

/**
 * Final shape check after catalog enrichment. Enrichment fills a numeric-only `pricing`
 * for an entry this module left unpriced when its own lookup finds a row; add the
 * per-token strings to it. Credit-metered providers keep their numeric fields exactly as
 * enrichment produced them, without per-token strings: they bill per request.
 */
export function normalizeCatalogEntryPricing<T extends CatalogEntry>(
  entry: T,
  ctx: CatalogPricingContext = {}
): T {
  const pricing = entry.pricing as Record<string, unknown> | null | undefined;
  if (pricing == null || typeof pricing !== "object") return entry;
  if (typeof pricing.prompt === "string") return entry;
  const target = getEntryPricingTarget(entry, ctx);
  if (!target || isCreditMeteredProvider(target.provider)) return entry;
  const converted = toCatalogPricing(pricing);
  return converted ? { ...entry, pricing: converted } : entry;
}

/**
 * Pricing target for a combo by name: its first visible target, where an unresolvable
 * target counts as visible (and then leaves the price unknown), as in the catalog's
 * combo listing. Nested combos are expanded first.
 */
export function createComboPricingTargetResolver<TCombo extends { name?: unknown }, TTarget>(
  combos: readonly TCombo[],
  expandTargets: (combo: TCombo) => TTarget[],
  resolveTarget: (target: TTarget) => { providerId: string; modelId: string } | null,
  isHidden: (providerId: string, modelId: string) => boolean
): (comboName: string) => PricingTarget | null {
  const byName = new Map<string, TCombo>();
  for (const combo of combos) {
    if (typeof combo.name === "string" && !byName.has(combo.name)) byName.set(combo.name, combo);
  }
  return (comboName) => {
    const combo = byName.get(comboName);
    if (!combo) return null;
    for (const target of expandTargets(combo)) {
      const resolved = resolveTarget(target);
      if (!resolved) return null;
      if (!isHidden(resolved.providerId, resolved.modelId)) {
        return { provider: resolved.providerId, model: resolved.modelId };
      }
    }
    return null;
  };
}
