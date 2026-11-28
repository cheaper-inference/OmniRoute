/**
 * Opt-in config hash sync for the file -> database writer (OMNIROUTE_CONFIG_HASH_SYNC=1, default off).
 *
 * `runJsonMigration` (the settings JSON import and the db.json auto-migration) overwrites combos
 * blindly. With the flag on, each combo keeps a SHA-256 of its normalised fields (key order, ids of
 * time and sort position ignored) in `key_value` namespace `configHash`, recorded at every sync. On
 * the next import:
 * - no database row: the file is written (`file-to-db`);
 * - database hash equals the file hash: nothing to do (`in-sync`);
 * - database hash equals the recorded baseline, so only the file changed: the file is written;
 * - otherwise the database copy was edited since the last sync, or there is no baseline to prove
 *   the file is newer: the database copy is kept (`db-kept`), because overwriting could lose an edit.
 * Every decision is logged by id and direction. Config content is never logged.
 *
 * No migration: the hashes live in the existing `key_value` table. Combos only: other imported
 * entities keep the file-wins behaviour (see the PR body).
 */

import { createHash } from "node:crypto";
import type { SqliteAdapter } from "../adapters/types";

const NAMESPACE = "configHash";
const IGNORED_FIELDS = new Set(["createdAt", "updatedAt", "sortOrder"]);

export type SyncDirection = "file-to-db" | "in-sync" | "db-kept";

export function isConfigHashSyncEnabled(env = process.env): boolean {
  return ["1", "true", "yes"].includes(String(env.OMNIROUTE_CONFIG_HASH_SYNC).trim());
}

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key]) => !IGNORED_FIELDS.has(key))
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([key, v]) => [key, canonical(v)])
    );
  }
  return value;
}

/** SHA-256 of the normalised fields: key order and the time and sort fields do not count. */
export function configHash(record: Record<string, unknown>): string {
  return createHash("sha256")
    .update(JSON.stringify(canonical(record)))
    .digest("hex");
}

function readBaseline(db: SqliteAdapter, id: string): string | null {
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, `combo:${id}`) as { value?: string } | undefined;
  if (!row?.value) return null;
  try {
    const parsed = JSON.parse(row.value);
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function recordComboHash(db: SqliteAdapter, id: string, hash: string): void {
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    `combo:${id}`,
    JSON.stringify(hash)
  );
}

/** Decide the direction for one combo and log it. The caller writes only on `file-to-db`. */
export function decideComboSync(
  db: SqliteAdapter,
  combo: Record<string, unknown>
): { direction: SyncDirection; fileHash: string } {
  const id = String(combo.id);
  const fileHash = configHash(combo);
  const row = db.prepare("SELECT data FROM combos WHERE id = ?").get(id) as
    { data?: string } | undefined;
  let direction: SyncDirection;
  if (!row) {
    direction = "file-to-db";
  } else {
    let dbHash: string | null = null;
    try {
      dbHash = configHash(JSON.parse(String(row.data)));
    } catch {
      dbHash = null;
    }
    if (dbHash === fileHash) direction = "in-sync";
    else direction = dbHash !== null && dbHash === readBaseline(db, id) ? "file-to-db" : "db-kept";
  }
  const note =
    direction === "db-kept"
      ? " (the database copy changed since the last sync, or has no recorded baseline; the file entry is ignored)"
      : "";
  console.log(`[CONFIG_SYNC] combo ${id}: direction=${direction}${note}`);
  return { direction, fileHash };
}
