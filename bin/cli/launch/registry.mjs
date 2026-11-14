/**
 * Launch adapter registry: id/alias -> adapter, ordered by manifest declaration order.
 *
 * Aliases come from the neutral manifest (`config/cli-tools-manifest.json`) plus any
 * `adapter.aliases`. Adapters with tier "later" are never registered.
 *
 * Two flavours share one API:
 * - eager: `createRegistry({ adapters })` with adapter objects in hand (tests, fakes).
 * - lazy (the default `launchRegistry`): built from the static metadata index in
 *   ./adapters/index.mjs, so startup imports no adapter module.
 *
 * Sync, never load an adapter: `resolve`, `ids`, `aliasesOf`, `entry` (id, displayName, tier,
 * aliases; eager entries also carry `adapter`).
 * Async, load on demand (cached): `load(idOrAlias)` -> adapter or undefined,
 * `loadAll({ tier })` -> adapters in registry order.
 * Sync `get` / `list` return adapters directly. On a lazy registry they only work for adapters
 * already loaded through `load` / `loadAll` and throw a programmer error otherwise (an unknown
 * id still returns undefined from `get`). Production code uses `load` / `loadAll`.
 */

import rawManifestJson from "../../../config/cli-tools-manifest.json" with { type: "json" };
import { ADAPTER_INDEX } from "./adapters/index.mjs";

function norm(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

/** Registry descriptor of an adapter object in hand (eager registry). */
function eagerDescriptor(adapter) {
  return {
    id: adapter.id,
    displayName: adapter.displayName,
    tier: adapter.capabilities.tier,
    aliases: adapter.aliases,
    adapter,
  };
}

/** Registrable descriptors (tier "later" dropped): from `adapters` when eager, else `index`. */
function descriptorsOf(adapters, index) {
  if (adapters === undefined) return index.filter((item) => item?.tier !== "later");
  return adapters.filter((adapter) => adapter?.capabilities?.tier !== "later").map(eagerDescriptor);
}

/** Ids in manifest order (launch-flagged), then any other descriptor ids in adapter order. */
function orderIds(tools, byId, descriptors) {
  const orderedIds = Object.keys(tools).filter(
    (id) => byId.has(id) && tools[id]?.surfaces?.launch === true
  );
  // Defensive: adapters absent from the manifest (or not flagged) go last, in adapter order.
  for (const item of descriptors) {
    if (!orderedIds.includes(item.id)) orderedIds.push(item.id);
  }
  return orderedIds;
}

/** Normalized distinct aliases of `id`: manifest ones first, then the adapter's own. */
function normalizedAliases(id, tool, item) {
  const all = [...(tool?.aliases || []), ...(item.aliases || [])].map(norm).filter(Boolean);
  return [...new Set(all)].filter((alias) => alias !== id);
}

/** The frozen public entry of `id`; eager entries also carry `adapter`. */
function buildEntry(id, tool, item, eager) {
  const entry = {
    id,
    displayName: item.displayName || tool?.displayName || id,
    tier: item.tier,
    aliases: Object.freeze(normalizedAliases(id, tool, item)),
  };
  if (eager) entry.adapter = item.adapter;
  return Object.freeze(entry);
}

/** Entries by id plus the id/alias lookup (ids win over aliases; first alias owner wins). */
function buildLookup(orderedIds, byId, tools, eager) {
  const entries = new Map();
  const lookup = new Map();
  for (const id of orderedIds) {
    entries.set(id, buildEntry(id, tools[id], byId.get(id), eager));
    lookup.set(id, id);
  }
  for (const entry of entries.values()) {
    for (const alias of entry.aliases) {
      if (!lookup.has(alias)) lookup.set(alias, entry.id);
    }
  }
  return { entries, lookup };
}

/**
 * On-demand adapter loading with a cache and one in-flight promise per id.
 * @param {Map<string, { load?: () => Promise<object> }>} byId
 * @param {Array<[string, object]>} initial adapters already in hand (eager registry)
 */
function createLoader(byId, initial) {
  const loaded = new Map(initial);
  const pending = new Map();
  const startLoad = (id) =>
    byId
      .get(id)
      .load()
      .then(
        (adapter) => {
          loaded.set(id, adapter);
          pending.delete(id);
          return adapter;
        },
        (error) => {
          pending.delete(id);
          throw error;
        }
      );
  const loadId = (id) => {
    if (loaded.has(id)) return Promise.resolve(loaded.get(id));
    if (!pending.has(id)) pending.set(id, startLoad(id));
    return pending.get(id);
  };
  const loadedOrThrow = (id, method) => {
    if (loaded.has(id)) return loaded.get(id);
    throw new Error(
      `launch registry: ${method} needs adapter "${id}" loaded first; use await registry.load(id) or registry.loadAll()`
    );
  };
  return { loadId, loadedOrThrow };
}

/** The frozen registry API over the built state. */
function registryApi({ orderedIds, entries, lookup, loader }) {
  const resolve = (idOrAlias) => lookup.get(norm(idOrAlias));
  const idsFor = (tier) => orderedIds.filter((id) => !tier || entries.get(id).tier === tier);
  const { loadId, loadedOrThrow } = loader;
  return Object.freeze({
    resolve,
    get(idOrAlias) {
      const id = resolve(idOrAlias);
      return id ? loadedOrThrow(id, "get()") : undefined;
    },
    list({ tier } = {}) {
      return idsFor(tier).map((id) => loadedOrThrow(id, "list()"));
    },
    async load(idOrAlias) {
      const id = resolve(idOrAlias);
      return id ? loadId(id) : undefined;
    },
    async loadAll({ tier } = {}) {
      return Promise.all(idsFor(tier).map(loadId));
    },
    ids() {
      return [...orderedIds];
    },
    aliasesOf(id) {
      const canonical = resolve(id);
      return canonical ? [...entries.get(canonical).aliases] : [];
    },
    entry(id) {
      const canonical = resolve(id);
      return canonical ? entries.get(canonical) : undefined;
    },
  });
}

/**
 * @param {{ adapters?: object[], index?: ReadonlyArray<{ id: string, displayName?: string,
 *   tier: string, aliases?: readonly string[], load: () => Promise<object> }>, manifest?: object }}
 *   [options] `adapters` builds an eager registry; otherwise `index` (default: the static
 *   adapter index) builds a lazy one.
 */
export function createRegistry({
  adapters,
  index = ADAPTER_INDEX,
  manifest = rawManifestJson,
} = {}) {
  const eager = adapters !== undefined;
  const tools = manifest?.tools || {};
  const descriptors = descriptorsOf(adapters, index);
  const byId = new Map(descriptors.map((item) => [item.id, item]));
  const orderedIds = orderIds(tools, byId, descriptors);
  const { entries, lookup } = buildLookup(orderedIds, byId, tools, eager);
  // Adapters loaded up front: all of them when eager, none when lazy.
  const initial = eager ? orderedIds.map((id) => [id, byId.get(id).adapter]) : [];
  const loader = createLoader(byId, initial);
  return registryApi({ orderedIds, entries, lookup, loader });
}

export const launchRegistry = createRegistry();

export function getLaunchRegistry() {
  return launchRegistry;
}
