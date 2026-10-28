/**
 * db/providers/nodePrefix.ts — sync lookup of a provider node's own routing prefix (#15563).
 */

import { getDbInstance } from "../core";

// #16814 — capability resolution calls this several times per provider on the auto/* request
// path. Memoized per DB instance (a reset/reopened DB drops it) and cleared by the
// provider_nodes writers in nodes.ts.
let prefixMemo: Map<string, string | null> | null = null;
let prefixIndex: Map<string, string> | null = null;
let memoDb: unknown = null;
export function resetProviderNodePrefixCache(): void {
  prefixMemo = null;
  prefixIndex = null;
}

type NodeDb = {
  prepare: (sql: string) => { all: () => Array<{ id?: unknown; prefix?: unknown }> };
};

function loadPrefixes(db: NodeDb): Map<string, string | null> {
  const map = new Map<string, string | null>();
  for (const row of db.prepare("SELECT id, prefix FROM provider_nodes").all()) {
    if (typeof row.id !== "string") continue;
    const prefix = typeof row.prefix === "string" ? row.prefix.trim() : "";
    map.set(row.id, prefix || null);
  }
  return map;
}

/**
 * Reverse index (prefix → node id) built from the same memoized prefix map.
 * Kept in the same module/DB-instance memo so the two directions can never
 * disagree about which nodes exist.
 */
function buildPrefixToId(prefixes: Map<string, string | null>): Map<string, string> {
  const byPrefix = new Map<string, string>();
  for (const [id, prefix] of prefixes) {
    if (!prefix) continue;
    const key = prefix.toLowerCase();
    const current = byPrefix.get(key);
    // Prefixes are operator-unique (reserved-prefix validation), but a duplicate
    // row must still resolve deterministically: keep the lowest id.
    if (current === undefined || id < current) byPrefix.set(key, id);
  }
  return byPrefix;
}

function loadPrefixIndex(db: NodeDb): {
  byId: Map<string, string | null>;
  byPrefix: Map<string, string>;
} {
  const byId = loadPrefixes(db);
  return { byId, byPrefix: buildPrefixToId(byId) };
}

/**
 * Returns the routing prefix (e.g. `aegy`) of a custom provider node, or null
 * when the id is not a node or has no prefix. Never throws (capability
 * resolution must stay best-effort).
 */
export function getProviderNodePrefixSync(providerId: string): string | null {
  if (!providerId) return null;
  try {
    ensurePrefixCache(getDbInstance() as unknown as NodeDb);
    return prefixMemo?.get(providerId) ?? null;
  } catch {
    return null;
  }
}

/**
 * Returns the internal id of the custom provider node that owns `prefix`
 * (e.g. `nr` → `openai-compatible-responses-<uuid>`), or null when no node
 * declares it. Never throws (capability resolution must stay best-effort).
 *
 * Counterpart of {@link getProviderNodePrefixSync}: a node is reachable both by
 * its internal id (combo steps store it, #2778) and by its user-defined prefix
 * (what the catalog and prefix-addressed requests use), so every consumer that
 * keys persisted per-node state on one of the two forms needs to map to the other.
 */
export function getProviderNodeIdByPrefixSync(prefix: string): string | null {
  const key = typeof prefix === "string" ? prefix.trim().toLowerCase() : "";
  if (!key) return null;
  try {
    ensurePrefixCache(getDbInstance() as unknown as NodeDb);
    return prefixIndex?.get(key) ?? null;
  } catch {
    return null;
  }
}

function ensurePrefixCache(db: NodeDb): void {
  if (db !== memoDb) {
    prefixMemo = null;
    prefixIndex = null;
    memoDb = db;
  }
  if (prefixMemo === null || prefixIndex === null) {
    const index = loadPrefixIndex(db);
    prefixMemo = index.byId;
    prefixIndex = index.byPrefix;
  }
}
