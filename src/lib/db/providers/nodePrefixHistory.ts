/**
 * Evidence of historical public model identities for compatible provider nodes.
 * Prefix changes are recorded with upstream IDs read BEFORE the change, so a
 * legacy public ID can be resolved without stripping an arbitrary slash.
 * A match is advisory: consumers must ALSO confirm the new served model ID.
 * No existing pricing, synced-model, or custom-model rows are mutated.
 */
export interface HistoricalNodePrefix {
  prefix: string;
  modelIds: string[];
}

export interface PrefixHistoryDb {
  prepare(sql: string): {
    get(...params: unknown[]): unknown;
    all(...params: unknown[]): unknown[];
    run(...params: unknown[]): unknown;
  };
}

const NAMESPACE = "providerNodePrefixHistory";
const MAX_HISTORY = 12;
const MAX_MODEL_IDS = 8_000;
const MAX_ID_LENGTH = 1_024;

function normalizedModelIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const ids = new Set<string>();
  for (const row of raw) {
    const id =
      typeof row === "string"
        ? row
        : row && typeof row === "object"
          ? (row as { id?: unknown }).id
          : null;
    if (typeof id !== "string" || id.length === 0 || id.length > MAX_ID_LENGTH) continue;
    ids.add(id);
    if (ids.size >= MAX_MODEL_IDS) break;
  }
  return [...ids];
}

export function parseNodePrefixHistory(value: unknown): HistoricalNodePrefix[] {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];
  const entries: HistoricalNodePrefix[] = [];
  for (const item of parsed) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const candidate = item as { prefix?: unknown; modelIds?: unknown };
    if (typeof candidate.prefix !== "string") continue;
    const prefix = candidate.prefix.trim();
    if (!prefix || prefix.includes("/") || prefix.length > 128) continue;
    const modelIds = normalizedModelIds(candidate.modelIds);
    // The most recent snapshot for one prefix supersedes earlier appearances.
    const previous = entries.findIndex((entry) => entry.prefix === prefix);
    if (previous >= 0) entries.splice(previous, 1);
    entries.push({ prefix, modelIds });
  }
  return entries.slice(-MAX_HISTORY);
}

export function getNodePrefixHistory(db: PrefixHistoryDb, nodeId: string): HistoricalNodePrefix[] {
  const row = db.prepare(
    `SELECT value FROM key_value WHERE namespace = '${NAMESPACE}' AND key = ?`
  ).get(nodeId) as { value?: unknown } | undefined;
  return parseNodePrefixHistory(row?.value);
}

/** A pricing-only row never proves a model's upstream identity. */
export function getNodeSyncedAndCustomModelIds(
  db: PrefixHistoryDb,
  nodeId: string
): string[] {
  const out = new Set<string>();
  const syncedPrefix = `${nodeId}:`;
  // substr equality avoids LIKE metacharacter collisions in operator IDs.
  const rows = db.prepare(
    "SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND substr(key, 1, ?) = ?"
  ).all([...syncedPrefix].length, syncedPrefix) as { value?: unknown }[];
  const custom = db.prepare(
    "SELECT value FROM key_value WHERE namespace = 'customModels' AND key = ?"
  ).get(nodeId) as { value?: unknown } | undefined;
  for (const row of [...rows, custom]) {
    if (!row || typeof row.value !== "string") continue;
    try {
      for (const id of normalizedModelIds(JSON.parse(row.value))) {
        out.add(id);
        if (out.size >= MAX_MODEL_IDS) return [...out];
      }
    } catch {
      // A malformed source is never acceptable identity evidence.
    }
  }
  return [...out];
}

/** Must execute in the same transaction as provider_nodes.prefix update. */
export function recordNodePrefixChange(
  db: PrefixHistoryDb,
  nodeId: string,
  oldPrefix: string | null | undefined,
  newPrefix: string | null | undefined
): boolean {
  const previous = oldPrefix?.trim() ?? "";
  const next = newPrefix?.trim() ?? "";
  if (!nodeId || !previous || previous === next) return false;
  const history = getNodePrefixHistory(db, nodeId).filter(
    (entry) => entry.prefix !== previous && entry.prefix !== next
  );
  history.push({
    prefix: previous,
    modelIds: getNodeSyncedAndCustomModelIds(db, nodeId),
  });
  db.prepare(`
    INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)
    ON CONFLICT(namespace, key) DO UPDATE SET value = excluded.value
  `).run(NAMESPACE, nodeId, JSON.stringify(history.slice(-MAX_HISTORY)));
  return true;
}

/**
 * Deleted compatible nodes must not silently release their old public
 * prefixes for historical price reassignment. The tombstone stores ONLY the
 * occupied prefix identities (no credentials, no model data), and is used as
 * a permanent ambiguity veto until an explicit operator reconciliation.
 */
const TOMBSTONE_NAMESPACE = "providerNodePrefixTombstones";
const ARCHIVE_NAMESPACE = "providerNodePrefixArchivedHistories";

export interface ArchivedPrefixClaim {
  prefixes: string[];
  history: HistoricalNodePrefix[];
}

function parseArchivedPrefixClaim(raw: unknown): ArchivedPrefixClaim {
  let value: unknown = raw;
  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw);
    } catch {
      return { prefixes: [], history: [] };
    }
  }
  const record = value && typeof value === "object" && !Array.isArray(value)
    ? value as { prefixes?: unknown; history?: unknown }
    : null;
  // Read older array-only tombstones without discarding existing vetoes.
  const candidates = Array.isArray(value) ? value : record?.prefixes;
  const prefixes = new Set<string>();
  if (Array.isArray(candidates)) {
    for (const item of candidates) {
      if (typeof item === "string" && item && item.length <= 128 && !item.includes("/")) {
        prefixes.add(item);
      }
    }
  }
  return {
    prefixes: [...prefixes],
    history: parseNodePrefixHistory(record?.history),
  };
}

export function getArchivedDeletedNodePrefixHistory(
  db: PrefixHistoryDb,
  nodeId: string
): HistoricalNodePrefix[] {
  const archive = db.prepare(
    "SELECT value FROM key_value WHERE namespace = ? AND key = ?"
  ).get(ARCHIVE_NAMESPACE, nodeId) as { value?: unknown } | undefined;
  if (archive?.value != null) return parseNodePrefixHistory(archive.value);
  // One-version transition: support tombstones that embedded historic IDs.
  const oldRecord = db.prepare(
    "SELECT value FROM key_value WHERE namespace = ? AND key = ?"
  ).get(TOMBSTONE_NAMESPACE, nodeId) as { value?: unknown } | undefined;
  return parseArchivedPrefixClaim(oldRecord?.value).history;
}

export function recordDeletedNodePrefixTombstone(
  db: PrefixHistoryDb,
  nodeId: string,
  currentPrefix: string | null | undefined
): void {
  const previousRow = db.prepare(
    "SELECT value FROM key_value WHERE namespace = ? AND key = ?"
  ).get(TOMBSTONE_NAMESPACE, nodeId) as { value?: unknown } | undefined;
  const previous = parseArchivedPrefixClaim(previousRow?.value);
  const archived = getArchivedDeletedNodePrefixHistory(db, nodeId);
  const presentHistory = getNodePrefixHistory(db, nodeId);
  const prefixes = new Set([
    ...previous.prefixes,
    ...presentHistory.map((entry) => entry.prefix),
  ]);
  const current = currentPrefix?.trim();
  if (current && current.length <= 128 && !current.includes("/")) prefixes.add(current);
  if (prefixes.size === 0) return;
  const archivedHistory = parseNodePrefixHistory([...archived, ...presentHistory]);
  const upsert = db.prepare(`
    INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)
    ON CONFLICT(namespace, key) DO UPDATE SET value = excluded.value
  `);
  // Keep the hot GET /api/pricing/models veto query tiny: it loads only
  // prefix strings, not up to 12 x 8,000 archived raw model identities.
  upsert.run(TOMBSTONE_NAMESPACE, nodeId, JSON.stringify([...prefixes]));
  upsert.run(ARCHIVE_NAMESPACE, nodeId, JSON.stringify(archivedHistory));
}

export function getDeletedNodePrefixTombstones(db: PrefixHistoryDb): Set<string> {
  const rows = db.prepare(
    "SELECT value FROM key_value WHERE namespace = ?"
  ).all(TOMBSTONE_NAMESPACE) as { value?: unknown }[];
  const prefixes = new Set<string>();
  for (const row of rows) {
    for (const prefix of parseArchivedPrefixClaim(row.value).prefixes) {
      prefixes.add(prefix);
    }
  }
  return prefixes;
}

export function deleteNodePrefixHistory(db: PrefixHistoryDb, nodeId: string): void {
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, nodeId);
}
