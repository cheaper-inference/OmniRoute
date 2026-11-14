/**
 * viewSelect.ts: the ONE launch model view selector.
 *
 * Shared by the launcher core (`bin/cli/launch/core/view.mjs`, via `bin/cli/launch/contract.mjs`)
 * and the gateway view engine, so the list a tool is told about (inject) and the list the gateway
 * serves (server-view) are identical for the same input rows.
 *
 * Pure on purpose: no I/O, no clock, no randomness, and the only import is the self-contained
 * SHA-256 in `./sha256.ts`, so this module runs unchanged in Node, the CLI bundle and the browser.
 *
 * Order of operations: filter (duplicate ids keep their first row) -> mirror dedupe -> order ->
 * limit (optionally spread across providers). Authorization (what the parent key may see)
 * happens BEFORE this function, server side; selectView can only drop rows, never add.
 *
 * Mirror dedupe: a row whose catalog `parent` is itself a row of the same filtered view is a
 * mirror (`cheaperinference/x` of `cinf/x`) and is dropped; the parent stays. A mirror whose
 * parent was filtered out stays. A `no-think/` row's parent is read in its `no-think/` form,
 * because the catalog copies the base row's `parent` onto the variant.
 *
 * Unknown context (row without a positive `contextTokens`): KEPT by `minContextTokens`, dropped
 * only when `requireKnownContext` is true. Tools such as
 * hermes, openclaw and crush need a number per row and set `requireKnownContext`.
 */

import { sha256Hex } from "./sha256.ts";

export { sha256Hex } from "./sha256.ts";

export type WireProtocol =
  "anthropic-messages" | "openai-responses" | "openai-chat" | "gemini-native";

export const WIRE_PROTOCOLS: readonly WireProtocol[] = [
  "anthropic-messages",
  "openai-responses",
  "openai-chat",
  "gemini-native",
];

/** Catalog surface kinds a view may keep (catalogFilters.ts vocabulary subset). */
export type ViewCatalogKind = "chat" | "embedding" | "image" | "audio" | "rerank";

export const VIEW_CATALOG_KINDS: readonly ViewCatalogKind[] = [
  "chat",
  "embedding",
  "image",
  "audio",
  "rerank",
];

export interface ViewSelectSpec {
  /** Stable name for logs and cache keys, e.g. "claude-code". Not a server-side switch. */
  name: string;
  filter: {
    /** Keep only rows callable over at least one of these protocols. Rows that do not declare
     *  `protocols` are kept (the gateway translates between wire formats). */
    protocols?: WireProtocol[];
    /** Keep only these catalog kinds. Default ["chat"]. A row without `type` is "chat". */
    kinds?: ViewCatalogKind[];
    /** Drop rows whose KNOWN context window is below this. Unknown context is kept unless
     *  `requireKnownContext`. */
    minContextTokens?: number;
    requireKnownContext?: boolean;
    /** Every listed capability must be present on the row. "tools" and "tool_calling" are
     *  treated as the same capability (launch vs catalog vocabulary). */
    capabilities?: string[];
    /** Glob (`*` only) allow list on raw ids. Empty or absent = allow all. */
    includeIds?: string[];
    /** Glob (`*` only) deny list on raw ids; wins over includeIds. */
    excludeIds?: string[];
    /** Keep combo and auto rows. Default true. */
    combos?: boolean;
    /** Keep built-in `auto` rows (`kind: "auto"`). Default true. False drops them while user
     *  combos (`kind: "combo"`) stay. Contract 1.3. */
    auto?: boolean;
    /** Keep only model rows served by one of these providers: a row matches when its id prefix
     *  (text before the first `/`) or its `provider` (the catalog `owned_by`) is listed. Combo
     *  and auto rows are not affected (use `combos` / `auto`). Absent = every provider; an empty
     *  list keeps no model row. Contract 1.3. */
    providers?: string[];
  };
  /** "preferences" (default): favorites, then recents, then catalog order. "catalog": as given. */
  order?: "preferences" | "catalog";
  /** Cap on the number of rows, applied last. Absent = no cap. */
  limit?: number;
  /** How `limit` cuts when it cuts. "head" (default): the first `limit` rows. "provider": the
   *  favorites/recents first, then the rest round robin across providers (in first-appearance
   *  order; combo and auto rows form one group), so every provider keeps rows. The result
   *  stays in view order. Contract 1.3. */
  spread?: "head" | "provider";
}

/** One normalized view row. */
export interface LaunchViewRow {
  id: string;
  label?: string;
  contextTokens?: number;
  maxOutputTokens?: number;
  capabilities: ReadonlyArray<string>;
  kind: "model" | "combo" | "auto";
  availability?: "ok" | "degraded" | "down" | null;
}

/** Input row: a view row plus the catalog-only fields the filter reads. */
export interface ViewCatalogRow extends LaunchViewRow {
  /** Catalog surface type; absent = "chat". */
  type?: string;
  /** Wire protocols the row is callable over; absent = any. */
  protocols?: ReadonlyArray<WireProtocol>;
  /** Serving provider as the catalog writes it (`owned_by`); read by `filter.providers`. */
  provider?: string;
  /** Catalog `parent`: the id this row mirrors. A row whose parent is in the same view is
   *  dropped (mirror dedupe). Contract 1.3 (additive). */
  parent?: string;
}

export interface ViewPreferences {
  favorites?: ReadonlyArray<string>;
  recent?: ReadonlyArray<string>;
}

export interface ViewSelection {
  /** Selected raw ids, in view order. */
  ids: string[];
  /** Selected rows, in view order, normalized to `LaunchViewRow` (catalog-only keys dropped). */
  rows: LaunchViewRow[];
  /** Lowercase hex SHA-256 of `JSON.stringify(ids)`. */
  hash: string;
}

const TOOL_CAPABILITY_ALIASES = new Set(["tools", "tool_calling"]);

function hasCapability(row: ViewCatalogRow, wanted: string): boolean {
  const caps = Array.isArray(row.capabilities) ? row.capabilities : [];
  if (TOOL_CAPABILITY_ALIASES.has(wanted)) {
    return caps.some((cap) => TOOL_CAPABILITY_ALIASES.has(cap));
  }
  return caps.includes(wanted);
}

function knownContext(row: ViewCatalogRow): number | null {
  const value = row.contextTokens;
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

/** True when every part appears in order inside value[start, end) (an empty part always fits). */
function partsInOrder(parts: string[], value: string, start: number, end: number): boolean {
  let cursor = start;
  for (const part of parts) {
    const found = value.indexOf(part, cursor);
    const next = found + part.length;
    if (found === -1 || next > end) return false;
    cursor = next;
  }
  return true;
}

/** True when `value` starts with `first`, ends with `last`, and the two do not overlap. */
function endsFit(value: string, first: string, last: string): boolean {
  if (value.length < first.length + last.length) return false;
  return value.startsWith(first) && value.endsWith(last);
}

/** `*` matches any run of characters (including none); every other character is literal. */
export function globMatch(pattern: string, value: string): boolean {
  const parts = pattern.split("*");
  if (parts.length === 1) return pattern === value;
  const first = parts[0];
  const last = parts[parts.length - 1];
  if (!endsFit(value, first, last)) return false;
  return partsInOrder(parts.slice(1, -1), value, first.length, value.length - last.length);
}

/** The id prefix before the first `/` ("" when the id has none). */
export function rowProviderPrefix(row: { id: string }): string {
  const slash = row.id.indexOf("/");
  return slash > 0 ? row.id.slice(0, slash) : "";
}

/** Group key for `spread: "provider"`: combos and autos share one group. */
function spreadKey(row: ViewCatalogRow): string {
  if (row.kind === "combo" || row.kind === "auto") return "\u0000combo";
  return rowProviderPrefix(row) || (typeof row.provider === "string" ? row.provider : "");
}

/** Indexes of rows not yet kept, grouped by `spreadKey` in first-appearance order. */
function spreadQueues(ordered: ViewCatalogRow[], keep: ReadonlySet<number>): number[][] {
  const groups = new Map<string, number[]>();
  ordered.forEach((row, index) => {
    if (keep.has(index)) return;
    const key = spreadKey(row);
    const list = groups.get(key);
    if (list) list.push(index);
    else groups.set(key, [index]);
  });
  return [...groups.values()];
}

/** Take one index per queue per round into `keep` until it holds `limit` or queues run dry. */
function takeRoundRobin(queues: number[][], keep: Set<number>, limit: number): void {
  for (let round = 0; keep.size < limit; round++) {
    let added = false;
    for (const queue of queues) {
      if (keep.size >= limit) break;
      if (round < queue.length) {
        keep.add(queue[round]);
        added = true;
      }
    }
    if (!added) break;
  }
}

/**
 * Cut `ordered` to `limit` rows: preferred rows (favorites/recents) first, then one row per
 * provider group per round. The kept rows are returned in their original order.
 */
function spreadCut(
  ordered: ViewCatalogRow[],
  limit: number,
  preferred: ReadonlySet<string>
): ViewCatalogRow[] {
  if (ordered.length <= limit) return ordered;
  const keep = new Set<number>();
  ordered.forEach((row, index) => {
    if (keep.size < limit && preferred.has(row.id)) keep.add(index);
  });
  takeRoundRobin(spreadQueues(ordered, keep), keep, limit);
  return ordered.filter((_, index) => keep.has(index));
}

type ViewFilter = ViewSelectSpec["filter"];
type RowCheck = (row: ViewCatalogRow, filter: ViewFilter) => boolean;

/** Combo and auto rows (not served by a single provider). */
function isComboRow(row: ViewCatalogRow): boolean {
  return row.kind === "combo" || row.kind === "auto";
}

function passesKind(row: ViewCatalogRow, filter: ViewFilter): boolean {
  const kinds: ReadonlyArray<string> =
    filter.kinds && filter.kinds.length > 0 ? filter.kinds : ["chat"];
  const rowType = typeof row.type === "string" && row.type !== "" ? row.type : "chat";
  return kinds.includes(rowType);
}

function passesComboFlags(row: ViewCatalogRow, filter: ViewFilter): boolean {
  if (filter.combos === false && isComboRow(row)) return false;
  return !(filter.auto === false && row.kind === "auto");
}

function passesProviders(row: ViewCatalogRow, filter: ViewFilter): boolean {
  const providers = filter.providers;
  if (!Array.isArray(providers) || isComboRow(row)) return true;
  if (providers.includes(rowProviderPrefix(row))) return true;
  return typeof row.provider === "string" && providers.includes(row.provider);
}

function passesProtocols(row: ViewCatalogRow, filter: ViewFilter): boolean {
  const wanted = filter.protocols;
  if (!wanted || wanted.length === 0 || !Array.isArray(row.protocols)) return true;
  return row.protocols.some((protocol) => wanted.includes(protocol));
}

function passesContext(row: ViewCatalogRow, filter: ViewFilter): boolean {
  const context = knownContext(row);
  if (context === null) return !filter.requireKnownContext;
  const min = filter.minContextTokens;
  return typeof min !== "number" || !(context < min);
}

function passesCapabilities(row: ViewCatalogRow, filter: ViewFilter): boolean {
  for (const cap of filter.capabilities || []) {
    if (!hasCapability(row, cap)) return false;
  }
  return true;
}

function passesIdLists(row: ViewCatalogRow, filter: ViewFilter): boolean {
  const matches = (pattern: string) => globMatch(pattern, row.id);
  const include = filter.includeIds;
  if (include && include.length > 0 && !include.some(matches)) return false;
  return !(filter.excludeIds && filter.excludeIds.some(matches));
}

/** Every filter predicate, in evaluation order; a row must pass all of them. */
const ROW_CHECKS: ReadonlyArray<RowCheck> = [
  passesKind,
  passesComboFlags,
  passesProviders,
  passesProtocols,
  passesContext,
  passesCapabilities,
  passesIdLists,
];

function rowPasses(row: ViewCatalogRow, spec: ViewSelectSpec): boolean {
  const filter = spec.filter || {};
  if (!row || typeof row.id !== "string" || row.id === "") return false;
  return ROW_CHECKS.every((check) => check(row, filter));
}

const NO_THINK_PREFIX = "no-think/";

/** The id a row mirrors, in the row's own `no-think/` form; null when it mirrors nothing. */
function mirrorParent(row: ViewCatalogRow): string | null {
  const parent = row.parent;
  if (typeof parent !== "string" || parent === "" || parent === row.id) return null;
  if (row.id.startsWith(NO_THINK_PREFIX) && !parent.startsWith(NO_THINK_PREFIX)) {
    return NO_THINK_PREFIX + parent;
  }
  return parent;
}

/** Drop rows whose parent is itself a row of `rows` (the parent stays). */
function dropMirrors(rows: ViewCatalogRow[]): ViewCatalogRow[] {
  const ids = new Set(rows.map((row) => row.id));
  return rows.filter((row) => {
    const parent = mirrorParent(row);
    return parent === null || !ids.has(parent);
  });
}

/** Copy the optional `LaunchViewRow` fields that carry a usable value. */
function copyOptionalFields(row: ViewCatalogRow, out: LaunchViewRow): void {
  if (typeof row.label === "string") out.label = row.label;
  if (knownContext(row) !== null) out.contextTokens = row.contextTokens;
  const maxOutput = row.maxOutputTokens;
  if (typeof maxOutput === "number" && maxOutput > 0) out.maxOutputTokens = maxOutput;
  if (row.availability !== undefined) out.availability = row.availability;
}

function toViewRow(row: ViewCatalogRow): LaunchViewRow {
  const out: LaunchViewRow = {
    id: row.id,
    capabilities: Array.isArray(row.capabilities) ? [...row.capabilities] : [],
    kind: isComboRow(row) ? row.kind : "model",
  };
  copyOptionalFields(row, out);
  return out;
}

/** Passing rows, first occurrence of each id. */
function filterRows(rows: ReadonlyArray<ViewCatalogRow>, spec: ViewSelectSpec): ViewCatalogRow[] {
  const filtered: ViewCatalogRow[] = [];
  const seen = new Set<string>();
  for (const row of rows || []) {
    if (!rowPasses(row, spec) || seen.has(row.id)) continue;
    seen.add(row.id);
    filtered.push(row);
  }
  return filtered;
}

/** Stable sort: preferred ids first (by first listing), then everything else as given. */
function orderByPreference(rows: ViewCatalogRow[], preferred: string[]): ViewCatalogRow[] {
  const rank = new Map<string, number>();
  for (const id of preferred) if (!rank.has(id)) rank.set(id, rank.size);
  return rows
    .map((row, index) => ({ row, index, rank: rank.get(row.id) ?? Infinity }))
    .sort((a, b) => (a.rank === b.rank ? a.index - b.index : a.rank - b.rank))
    .map((entry) => entry.row);
}

/** Apply `spec.limit` (head or provider spread); rows pass through when there is no limit. */
function applyLimit(
  ordered: ViewCatalogRow[],
  spec: ViewSelectSpec,
  preferred: string[]
): ViewCatalogRow[] {
  if (typeof spec.limit !== "number" || !(spec.limit >= 0)) return ordered;
  const limit = Math.floor(spec.limit);
  if (spec.spread === "provider") return spreadCut(ordered, limit, new Set(preferred));
  return ordered.slice(0, limit);
}

/**
 * Select the launch view. Deterministic: the same (rows, spec, prefs) always yields the same
 * ids, rows and hash. Duplicate ids keep their first occurrence; a row whose `parent` is also
 * in the filtered view is dropped (see "Mirror dedupe" above).
 */
export function selectView(
  rows: ReadonlyArray<ViewCatalogRow>,
  spec: ViewSelectSpec,
  prefs: ViewPreferences = {}
): ViewSelection {
  const kept = dropMirrors(filterRows(rows, spec));
  const usePreferences = (spec.order ?? "preferences") === "preferences";
  const preferred = usePreferences ? [...(prefs.favorites || []), ...(prefs.recent || [])] : [];
  const ordered = usePreferences ? orderByPreference(kept, preferred) : kept;
  const limited = applyLimit(ordered, spec, preferred);
  const ids = limited.map((row) => row.id);
  return { ids, rows: limited.map(toViewRow), hash: viewHash(ids) };
}

/** The canonical view hash: lowercase hex SHA-256 of `JSON.stringify(ids)`. */
export function viewHash(ids: ReadonlyArray<string>): string {
  return sha256Hex(JSON.stringify([...ids]));
}
