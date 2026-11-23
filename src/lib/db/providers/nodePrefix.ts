/**
 * db/providers/nodePrefix.ts — sync lookup of a provider node's own routing prefix (#15563).
 */

import { getDbInstance } from "../core";

// #16814 — capability resolution calls this several times per provider on the auto/* request
// path. Memoized per DB instance (a reset/reopened DB drops it) and cleared by the
// provider_nodes writers in nodes.ts.
let prefixMemo: Map<string, string | null> | null = null;
let memoDb: unknown = null;
export function resetProviderNodePrefixCache(): void {
  prefixMemo = null;
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
 * Returns the routing prefix (e.g. `aegy`) of a custom provider node, or null
 * when the id is not a node or has no prefix. Never throws (capability
 * resolution must stay best-effort).
 */
export function getProviderNodePrefixSync(providerId: string): string | null {
  if (!providerId) return null;
  try {
    const db = getDbInstance() as unknown as NodeDb;
    if (db !== memoDb) {
      prefixMemo = null;
      memoDb = db;
    }
    prefixMemo ??= loadPrefixes(db);
    return prefixMemo.get(providerId) ?? null;
  } catch {
    return null;
  }
}
