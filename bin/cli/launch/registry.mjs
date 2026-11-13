/**
 * Launch adapter registry: id/alias -> adapter, ordered by manifest declaration order.
 *
 * Aliases come from the neutral manifest (`config/cli-tools-manifest.json`) plus any
 * `adapter.aliases`. Adapters with tier "later" are never registered.
 */

import rawManifestJson from "../../../config/cli-tools-manifest.json" with { type: "json" };
import { ADAPTERS } from "./adapters/index.mjs";

function norm(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export function createRegistry({ adapters = ADAPTERS, manifest = rawManifestJson } = {}) {
  const tools = manifest?.tools || {};
  const eligible = adapters.filter((adapter) => adapter?.capabilities?.tier !== "later");
  const byId = new Map(eligible.map((adapter) => [adapter.id, adapter]));

  const orderedIds = [];
  for (const id of Object.keys(tools)) {
    if (byId.has(id) && tools[id]?.surfaces?.launch === true) orderedIds.push(id);
  }
  // Defensive: adapters absent from the manifest (or not flagged) go last, in adapter order.
  for (const adapter of eligible) {
    if (!orderedIds.includes(adapter.id)) orderedIds.push(adapter.id);
  }

  const entries = new Map();
  const lookup = new Map();
  for (const id of orderedIds) {
    const adapter = byId.get(id);
    const aliases = [
      ...new Set(
        [...(tools[id]?.aliases || []), ...(adapter.aliases || [])].map(norm).filter(Boolean)
      ),
    ].filter((alias) => alias !== id);
    const entry = Object.freeze({
      id,
      displayName: adapter.displayName || tools[id]?.displayName || id,
      tier: adapter.capabilities.tier,
      aliases: Object.freeze(aliases),
      adapter,
    });
    entries.set(id, entry);
    lookup.set(id, id);
  }
  for (const entry of entries.values()) {
    for (const alias of entry.aliases) {
      if (!lookup.has(alias)) lookup.set(alias, entry.id);
    }
  }

  const resolve = (idOrAlias) => lookup.get(norm(idOrAlias));
  return Object.freeze({
    resolve,
    get(idOrAlias) {
      const id = resolve(idOrAlias);
      return id ? entries.get(id).adapter : undefined;
    },
    list({ tier } = {}) {
      return orderedIds
        .filter((id) => !tier || entries.get(id).tier === tier)
        .map((id) => entries.get(id).adapter);
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
