/**
 * Configurable catalog ordering.
 *
 * `buildProviderPayload` historically published models in raw `Map` insertion
 * order (arrival order from the API), which the host surfaced as-is. This
 * module gives the operator an ordered list of criteria — each with a
 * direction — to apply to the published catalog. Without a setting the default
 * chain is `provider → name → recency → id`.
 *
 * It reproduces the `ownerKeyOf` (owner group) and `compareByRecency`
 * (release date, newest first, unknown = oldest) semantics from
 * `catalog-freshness.ts`; they are re-implemented here (not imported) because
 * that file is shared with the stacked freshness work and speaks the raw entry
 * shape, whereas the sort runs over the legacy shape held in the `collected`
 * map. An equivalence test pins the shared sample against `compareByRecency`.
 */
import type { LegacyModel } from "./legacy-model.js";

/** Sortable criteria, in the closed set the options schema accepts. */
export const CATALOG_ORDER_KEYS = [
  "provider",
  "name",
  "recency",
  "free",
  "price",
  "context",
] as const;

export type CatalogOrderKey = (typeof CATALOG_ORDER_KEYS)[number];

/** Direction values; `asc` = ascending, `desc` = descending. */
export const CATALOG_ORDER_DIRECTIONS = ["asc", "desc"] as const;
export type CatalogOrderDirection = (typeof CATALOG_ORDER_DIRECTIONS)[number];

/** One criterion in the ordered list. `direction` may be omitted. */
export interface CatalogOrderSpec {
  key: CatalogOrderKey;
  direction?: CatalogOrderDirection;
}

/**
 * Default chain applied when no `modelOrder` is set. `id` is the final tie
 * breaker and is never a user-selectable key.
 */
export const DEFAULT_CATALOG_ORDER: readonly CatalogOrderSpec[] = [
  { key: "provider" },
  { key: "name" },
  { key: "recency" },
];

/** Default direction per key when `direction` is omitted. */
export function defaultDirectionFor(key: CatalogOrderKey): CatalogOrderDirection {
  switch (key) {
    case "name":
    case "provider":
    case "free":
    case "price":
      return "asc";
    case "recency":
    case "context":
      return "desc";
  }
}

/**
 * The sortable projection of one collected entry. Every field that can be
 * missing in the raw data is a sentinel (`NaN` / false) so the comparator can
 * rank "absent" last in either direction without crashing.
 */
export interface CatalogOrderEntry {
  /** Full collected key, `X/<provider>/<model>…`; final tie breaker (asc). */
  id: string;
  /**
   * Upstream owner = the prefix of the host-visible id (before the first
   * `/`), i.e. the same extraction as `ownerKeyOf`. NOT the plugin prefix
   * (`X`), which is identical for every entry and would leave the criterion
   * inert.
   */
  provider: string;
  name: string;
  /** `Date.parse(release_date)`; absent/unparseable → `NaN` (= oldest). */
  releaseDateMs: number;
  /** True when every cost component is present and zero. */
  free: boolean;
  /** `cost.input`; absent/non-finite → `NaN`. */
  priceInput: number;
  /** `cost.output`; absent/non-finite → `NaN`. */
  priceOutput: number;
  /** `limit.context`; absent/non-finite → `NaN`. */
  context: number;
}

function num(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : NaN;
}

/**
 * Project a collected `(key, legacy)` pair into a sortable entry. The `key`
 * is `X/<provider>/<model>…`; the host-visible id is everything after the
 * first `/`, and its owner prefix is the `provider` criterion.
 */
export function toOrderEntry(key: string, legacy: LegacyModel): CatalogOrderEntry {
  const slash = key.indexOf("/");
  const bareId = slash > 0 ? key.slice(slash + 1) : legacy.id;
  const ownerSlash = bareId.indexOf("/");
  const provider = ownerSlash > 0 ? bareId.slice(0, ownerSlash) : bareId;

  const cost = legacy.cost ?? ({} as LegacyModel["cost"]);
  const priceInput = num(cost.input);
  const priceOutput = num(cost.output);
  const cacheRead = num(cost.cache?.read);
  const cacheWrite = num(cost.cache?.write);
  const free = priceInput === 0 && priceOutput === 0 && cacheRead === 0 && cacheWrite === 0;

  // The upstream map projects an absent context window to 0; only a finite,
  // strictly positive value is a real window. Anything else is absent, so the
  // entry ranks last on the `context` criterion in both directions.
  const rawContext = num(legacy.limit?.context);
  const context = rawContext > 0 ? rawContext : NaN;

  return {
    id: key,
    provider,
    name: legacy.name ?? "",
    releaseDateMs: typeof legacy.release_date === "string" ? Date.parse(legacy.release_date) : NaN,
    free,
    priceInput,
    priceOutput,
    context,
  };
}

/** Normalized text compare, case/punctuation-insensitive, natural numeric. */
function compareText(a: string, b: string): number {
  const na = a.normalize("NFC").toLowerCase();
  const nb = b.normalize("NFC").toLowerCase();
  return na.localeCompare(nb, "en", { sensitivity: "base", numeric: true });
}

/**
 * Compare two values for one criterion with a given direction. An absent
 * value (NaN) always ranks last regardless of direction; two absent values are
 * equal so the next criterion breaks the tie.
 */
function compareValue(a: number, b: number, direction: CatalogOrderDirection): number {
  const aAbs = Number.isNaN(a);
  const bAbs = Number.isNaN(b);
  if (aAbs && bAbs) return 0;
  if (aAbs) return 1; // absent always last
  if (bAbs) return -1;
  const diff = a - b;
  if (diff === 0) return 0;
  return direction === "asc" ? (diff < 0 ? -1 : 1) : diff < 0 ? 1 : -1;
}

/**
 * Build a comparator for the ordered criterion list. Criteria are applied in
 * written order; on equality it falls through to the next, and the final tie
 * is broken by `id` ascending (normalized).
 */
export function catalogOrderComparator(
  specs: readonly CatalogOrderSpec[]
): (a: CatalogOrderEntry, b: CatalogOrderEntry) => number {
  const resolved: Array<{ key: CatalogOrderKey; dir: CatalogOrderDirection }> = specs.map(
    (spec) => ({ key: spec.key, dir: spec.direction ?? defaultDirectionFor(spec.key) })
  );

  return (a, b) => {
    for (const { key, dir } of resolved) {
      let cmp: number;
      switch (key) {
        case "provider":
          cmp = compareText(a.provider, b.provider);
          break;
        case "name":
          cmp = compareText(a.name, b.name);
          break;
        case "recency":
          cmp = compareValue(a.releaseDateMs, b.releaseDateMs, dir);
          break;
        case "free":
          // free (0) vs paid (1): asc = free first, desc = paid first.
          cmp = compareValue(a.free ? 0 : 1, b.free ? 0 : 1, dir);
          break;
        case "price":
          cmp =
            compareValue(a.priceInput, b.priceInput, dir) ||
            compareValue(a.priceOutput, b.priceOutput, dir);
          break;
        case "context":
          cmp = compareValue(a.context, b.context, dir);
          break;
      }
      if (cmp !== 0) return cmp;
    }
    return compareText(a.id, b.id);
  };
}
