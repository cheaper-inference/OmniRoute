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
  const descriptors = eager
    ? adapters
        .filter((adapter) => adapter?.capabilities?.tier !== "later")
        .map((adapter) => ({
          id: adapter.id,
          displayName: adapter.displayName,
          tier: adapter.capabilities.tier,
          aliases: adapter.aliases,
          adapter,
        }))
    : index.filter((item) => item?.tier !== "later");
  const byId = new Map(descriptors.map((item) => [item.id, item]));

  const orderedIds = [];
  for (const id of Object.keys(tools)) {
    if (byId.has(id) && tools[id]?.surfaces?.launch === true) orderedIds.push(id);
  }
  // Defensive: adapters absent from the manifest (or not flagged) go last, in adapter order.
  for (const item of descriptors) {
    if (!orderedIds.includes(item.id)) orderedIds.push(item.id);
  }

  const entries = new Map();
  const lookup = new Map();
  for (const id of orderedIds) {
    const item = byId.get(id);
    const aliases = [
      ...new Set(
        [...(tools[id]?.aliases || []), ...(item.aliases || [])].map(norm).filter(Boolean)
      ),
    ].filter((alias) => alias !== id);
    const entry = {
      id,
      displayName: item.displayName || tools[id]?.displayName || id,
      tier: item.tier,
      aliases: Object.freeze(aliases),
    };
    if (eager) entry.adapter = item.adapter;
    entries.set(id, Object.freeze(entry));
    lookup.set(id, id);
  }
  for (const entry of entries.values()) {
    for (const alias of entry.aliases) {
      if (!lookup.has(alias)) lookup.set(alias, entry.id);
    }
  }

  const resolve = (idOrAlias) => lookup.get(norm(idOrAlias));
  const idsFor = (tier) => orderedIds.filter((id) => !tier || entries.get(id).tier === tier);

  /** Loaded adapters by id (eager: all of them up front). */
  const loaded = new Map(eager ? orderedIds.map((id) => [id, byId.get(id).adapter]) : []);
  const pending = new Map();

  const loadId = (id) => {
    if (loaded.has(id)) return Promise.resolve(loaded.get(id));
    if (!pending.has(id)) {
      const promise = byId
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
      pending.set(id, promise);
    }
    return pending.get(id);
  };

  const loadedOrThrow = (id, method) => {
    if (loaded.has(id)) return loaded.get(id);
    throw new Error(
      `launch registry: ${method} needs adapter "${id}" loaded first; use await registry.load(id) or registry.loadAll()`
    );
  };

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

export const launchRegistry = createRegistry();

export function getLaunchRegistry() {
  return launchRegistry;
}
