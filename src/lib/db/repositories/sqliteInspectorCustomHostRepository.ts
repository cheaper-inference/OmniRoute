/**
 * SQLite implementation for inspector_custom_hosts (migration 081).
 *
 * The async repository and the SQLite-only legacy helpers share these private
 * operations. SQL text is unchanged from the original `inspectorCustomHosts.ts`.
 * Resolve the database at call time so reset/restore never leaves a captured
 * handle.
 */
import type {
  InspectorCustomHostKind,
  InspectorCustomHostRepository,
  InspectorCustomHostRow,
} from "@/domain/persistence/agentBridgeRepositories";
import { getDbInstance } from "../core";

// SQLite stores booleans as integers
interface InspectorCustomHostDbRow {
  host: string;
  enabled: number;
  label: string | null;
  kind: string;
  added_at: string;
  last_seen_at: string | null;
}

function mapRow(row: InspectorCustomHostDbRow): InspectorCustomHostRow {
  return {
    host: row.host,
    enabled: row.enabled === 1,
    label: row.label,
    kind: row.kind as InspectorCustomHostKind,
    added_at: row.added_at,
    last_seen_at: row.last_seen_at,
  };
}

function listSync(opts?: { enabledOnly?: boolean }): InspectorCustomHostRow[] {
  const db = getDbInstance();
  const enabledOnly = opts?.enabledOnly === true;

  const rows = enabledOnly
    ? (db
        .prepare("SELECT * FROM inspector_custom_hosts WHERE enabled = 1 ORDER BY host ASC")
        .all() as InspectorCustomHostDbRow[])
    : (db
        .prepare("SELECT * FROM inspector_custom_hosts ORDER BY host ASC")
        .all() as InspectorCustomHostDbRow[]);

  return rows.map(mapRow);
}

function addSync(host: string, kind: InspectorCustomHostKind = "custom", label?: string): void {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR IGNORE INTO inspector_custom_hosts (host, enabled, label, kind, added_at)
     VALUES (?, 1, ?, ?, ?)`
  ).run(host, label ?? null, kind, now);
}

function removeSync(host: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM inspector_custom_hosts WHERE host = ?").run(host);
}

function setEnabledSync(host: string, enabled: boolean): void {
  const db = getDbInstance();
  db.prepare("UPDATE inspector_custom_hosts SET enabled = ? WHERE host = ?").run(
    enabled ? 1 : 0,
    host
  );
}

function touchLastSeenSync(host: string): void {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare("UPDATE inspector_custom_hosts SET last_seen_at = ? WHERE host = ?").run(now, host);
}

function isEnabledCustomHostSync(host: string): boolean {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT 1 AS found FROM inspector_custom_hosts WHERE host = ? AND enabled = 1")
    .get(host) as { found: number } | undefined;
  return row !== undefined;
}

export const sqliteInspectorCustomHostRepository: InspectorCustomHostRepository = {
  async list(options) {
    return listSync(options);
  },
  async add(host, kind, label) {
    addSync(host, kind, label);
  },
  async remove(host) {
    removeSync(host);
  },
  async setEnabled(host, enabled) {
    setEnabledSync(host, enabled);
  },
  async touchLastSeen(host) {
    touchLastSeenSync(host);
  },
  async isEnabledCustomHost(host) {
    return isEnabledCustomHostSync(host);
  },
};

/**
 * SQLite-only synchronous access retained for existing callers: the
 * traffic-inspector routes, DNS provisioning/repair, config import/export and
 * the per-request intercept hook call these synchronously.
 */
export const sqliteInspectorCustomHostLegacySync = {
  list: listSync,
  add: addSync,
  remove: removeSync,
  setEnabled: setEnabledSync,
  touchLastSeen: touchLastSeenSync,
  isEnabledCustomHost: isEnabledCustomHostSync,
};
