/**
 * SQLite implementation for the administrative audit trail (`audit_log`).
 *
 * The table is created lazily (not by a numbered migration): `ensureAuditLogSchema`
 * creates it, adds columns older databases lack, and builds the indexes. All
 * values go through db.prepare() placeholders; only column names from fixed
 * lists are interpolated.
 *
 * The legacy helpers take the adapter explicitly because the compliance facade
 * resolves it once per call (and tolerates a missing database) and keys its
 * auth-touch hot-path state by adapter. The async repository resolves the
 * database at call time so reset/restore never leaves a captured handle.
 */

import type {
  AuditAuthTouchMatch,
  AuditAuthTouchRecord,
  AuditLogFilter,
  AuditLogRepository,
  AuditLogRow,
} from "@/domain/persistence/auditLogRepository";
import { HIGH_LEVEL_ACTIONS } from "@/lib/audit/highLevelActions";
import type { SqliteAdapter } from "../adapters/types";
import { getDbInstance } from "../core";

const AUDIT_LOG_REQUIRED_COLUMNS: Record<string, string> = {
  resource_type: "TEXT",
  status: "TEXT",
  request_id: "TEXT",
  metadata: "TEXT",
};

function ensureAuditLogSchema(db: SqliteAdapter): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL DEFAULT (datetime('now')),
      action TEXT NOT NULL,
      actor TEXT NOT NULL DEFAULT 'system',
      target TEXT,
      details TEXT,
      ip_address TEXT,
      resource_type TEXT,
      status TEXT,
      request_id TEXT,
      metadata TEXT
    );
  `);

  let columns: Array<{ name: string }> = [];
  try {
    columns = db.prepare("PRAGMA table_info(audit_log)").all() as Array<{ name: string }>;
  } catch {
    columns = [];
  }

  const existingColumns = new Set(columns.map((column) => column.name));
  for (const [columnName, columnType] of Object.entries(AUDIT_LOG_REQUIRED_COLUMNS)) {
    if (existingColumns.has(columnName)) continue;
    try {
      db.exec(`ALTER TABLE audit_log ADD COLUMN ${columnName} ${columnType}`);
    } catch {
      // Another worker may have upgraded the schema first. Ignore.
    }
  }

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_log(timestamp);
    CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_log(action);
    CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_log(actor);
    CREATE INDEX IF NOT EXISTS idx_audit_resource_type ON audit_log(resource_type);
    CREATE INDEX IF NOT EXISTS idx_audit_status ON audit_log(status);
    CREATE INDEX IF NOT EXISTS idx_audit_request_id ON audit_log(request_id);
  `);
}

type AuditLogQuery = {
  where: string;
  params: string[];
};

function buildAuditLogQuery(filter: AuditLogFilter = {}): AuditLogQuery {
  const conditions: string[] = [];
  const params: string[] = [];

  const addLikeFilter = (column: string, value?: string) => {
    if (!value) return;
    conditions.push(`${column} LIKE ?`);
    params.push(`%${value}%`);
  };

  addLikeFilter("action", filter.action);
  addLikeFilter("actor", filter.actor);
  addLikeFilter("target", filter.target);
  addLikeFilter("resource_type", filter.resourceType);
  addLikeFilter("status", filter.status);
  addLikeFilter("request_id", filter.requestId);

  if (filter.from) {
    conditions.push("datetime(timestamp) >= datetime(?)");
    params.push(filter.from);
  }
  if (filter.to) {
    conditions.push("datetime(timestamp) <= datetime(?)");
    params.push(filter.to);
  }

  // B7: level=high filter — restrict to HIGH_LEVEL_ACTIONS via parameterized IN clause
  if (filter.levelFilter === "high" && HIGH_LEVEL_ACTIONS.length > 0) {
    const placeholders = HIGH_LEVEL_ACTIONS.map(() => "?").join(", ");
    conditions.push(`action IN (${placeholders})`);
    // HIGH_LEVEL_ACTIONS is readonly — create a mutable copy for spread
    params.push(...Array.from(HIGH_LEVEL_ACTIONS));
  }

  return {
    where: conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
    params,
  };
}

function listAuditLogRows(
  db: SqliteAdapter,
  filter: AuditLogFilter,
  limit: number,
  offset: number
): AuditLogRow[] {
  const { where, params } = buildAuditLogQuery(filter);
  return db
    .prepare(`SELECT * FROM audit_log ${where} ORDER BY timestamp DESC, id DESC LIMIT ? OFFSET ?`)
    .all(...params, limit, offset) as AuditLogRow[];
}

/**
 * INDEXED BY pins idx_audit_action so ANALYZE statistics cannot switch the plan to a
 * scan of the day's timestamp range. `timestamp` is compared as text.
 */
function listAuditLogRowsByActionSince(
  db: SqliteAdapter,
  action: string,
  sinceIso: string
): AuditLogRow[] {
  return db
    .prepare(
      `SELECT * FROM audit_log INDEXED BY idx_audit_action
       WHERE action = ? AND timestamp >= ?
       ORDER BY timestamp DESC, id DESC`
    )
    .all(action, sinceIso) as AuditLogRow[];
}

function countAuditLogRows(db: SqliteAdapter, filter: AuditLogFilter): number {
  const { where, params } = buildAuditLogQuery(filter);
  const row = db.prepare(`SELECT COUNT(*) as count FROM audit_log ${where}`).get(...params) as
    { count?: number } | undefined;
  return Number(row?.count || 0);
}

/** Throws when the table is missing; the retention pass catches it. */
function deleteAuditLogRowsBefore(db: SqliteAdapter, cutoffIso: string): number {
  return db.prepare("DELETE FROM audit_log WHERE timestamp < ?").run(cutoffIso).changes;
}

/** Newest identical successful touch at or after `cutoffIso`, if any. */
function findRecentAuthTouch(
  db: SqliteAdapter,
  action: string,
  touch: Pick<AuditAuthTouchRecord, "apiKeyId" | "ipAddress" | "serializedMetadata">,
  cutoffIso: string
): AuditAuthTouchMatch | null {
  const recent = db
    .prepare(
      `SELECT id, timestamp
       FROM audit_log
       WHERE action = ? AND target = ? AND status = 'success'
         AND ip_address IS ? AND metadata IS ? AND timestamp >= ?
       ORDER BY timestamp DESC, id DESC
       LIMIT 1`
    )
    .get(action, touch.apiKeyId, touch.ipAddress, touch.serializedMetadata, cutoffIso) as
    { id?: number; timestamp?: string } | undefined;
  if (!recent?.id) return null;
  return { id: recent.id, timestamp: recent.timestamp };
}

function restampAuthTouch(
  db: SqliteAdapter,
  id: number,
  timestamp: string,
  requestId: string | null
): void {
  db.prepare(`UPDATE audit_log SET timestamp = ?, request_id = ? WHERE id = ?`).run(
    timestamp,
    requestId,
    id
  );
}

/** Insert one touch row, then keep only the newest `maxRows` rows of `action`. */
function insertAuthTouchAndTrim(
  db: SqliteAdapter,
  action: string,
  touch: AuditAuthTouchRecord,
  maxRows: number
): void {
  db.prepare(
    `INSERT INTO audit_log (
      timestamp, action, actor, target, details, ip_address,
      resource_type, status, request_id, metadata
    ) VALUES (?, ?, ?, ?, ?, ?, 'api_key', 'success', ?, ?)`
  ).run(
    touch.timestamp,
    action,
    "api_key",
    touch.apiKeyId,
    touch.serializedMetadata,
    touch.ipAddress,
    touch.requestId,
    touch.serializedMetadata
  );

  db.prepare(
    `DELETE FROM audit_log
     WHERE id IN (
       SELECT id FROM audit_log
       WHERE action = ?
       ORDER BY timestamp DESC, id DESC
       LIMIT -1 OFFSET ?
     )`
  ).run(action, maxRows);
}

export const sqliteAuditLogRepository: AuditLogRepository = {
  ensureSchema: async () => ensureAuditLogSchema(getDbInstance()),
  list: async (filter, limit, offset) => listAuditLogRows(getDbInstance(), filter, limit, offset),
  count: async (filter) => countAuditLogRows(getDbInstance(), filter),
  listByActionSince: async (action, sinceIso) =>
    listAuditLogRowsByActionSince(getDbInstance(), action, sinceIso),
  deleteBefore: async (cutoffIso) => deleteAuditLogRowsBefore(getDbInstance(), cutoffIso),
};

/** Synchronous compatibility is SQLite-only, not part of the portable contract. */
export const sqliteAuditLogLegacySync = {
  ensureAuditLogSchema,
  listAuditLogRows,
  listAuditLogRowsByActionSince,
  countAuditLogRows,
  deleteAuditLogRowsBefore,
  findRecentAuthTouch,
  restampAuthTouch,
  insertAuthTouchAndTrim,
};
