/**
 * SQLite implementation of the uploaded file store (files table, migration 028).
 *
 * The async repository and the SQLite-only synchronous helpers share these private
 * operations. The database is resolved at call time so reset/restore never leaves a
 * captured handle. SQL text is unchanged from the pre-repository module.
 */

import type {
  FileFilter,
  FileInsert,
  FileListQuery,
  FileRecord,
  FileRepository,
} from "@/domain/persistence/fileRepository";
import { getDbInstance, rowToCamel } from "../core";

const FILE_METADATA_COLUMNS =
  "id, bytes, created_at, filename, purpose, mime_type, api_key_id, expires_at, deleted_at";

function insertFile(file: FileInsert): void {
  const db = getDbInstance();
  db.prepare(
    `
    INSERT INTO files (id, bytes, created_at, filename, purpose, content, mime_type, api_key_id, expires_at, deleted_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    file.id,
    file.bytes,
    file.createdAt,
    file.filename,
    file.purpose,
    file.content,
    file.mimeType,
    file.apiKeyId,
    file.expiresAt,
    file.deletedAt
  );
}

function findFileById(id: string): FileRecord | null {
  const db = getDbInstance();
  const row = db
    .prepare(`SELECT ${FILE_METADATA_COLUMNS} FROM files WHERE id = ? AND deleted_at IS NULL`)
    .get(id);
  return row ? (rowToCamel(row) as unknown as FileRecord) : null;
}

function findFileContentById(id: string): Buffer | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT content FROM files WHERE id = ? AND deleted_at IS NULL")
    .get(id) as { content: Buffer | Uint8Array | string | null } | undefined;
  if (!row?.content) return null;
  return Buffer.isBuffer(row.content) ? row.content : Buffer.from(row.content);
}

function listFileRows(query: FileListQuery): FileRecord[] {
  const db = getDbInstance();
  const { apiKeyId, purpose, limit, after, order } = query;

  let sql = `SELECT ${FILE_METADATA_COLUMNS} FROM files WHERE deleted_at IS NULL`;
  const params: unknown[] = [];

  if (apiKeyId) {
    sql += " AND api_key_id = ?";
    params.push(apiKeyId);
  }

  if (purpose) {
    sql += " AND purpose = ?";
    params.push(purpose);
  }

  if (after) {
    if (order === "desc") {
      sql += " AND (created_at < ? OR (created_at = ? AND id < ?))";
    } else {
      sql += " AND (created_at > ? OR (created_at = ? AND id > ?))";
    }
    params.push(after.createdAt, after.createdAt, after.id);
  }

  sql += ` ORDER BY created_at ${order === "asc" ? "ASC" : "DESC"}, id ${order === "asc" ? "ASC" : "DESC"}`;
  sql += " LIMIT ?";
  params.push(limit);

  const rows = db.prepare(sql).all(...params);
  return rows.map((row) => rowToCamel(row) as unknown as FileRecord);
}

function countFileRows(filter: FileFilter): number {
  const db = getDbInstance();
  const { apiKeyId, purpose } = filter;
  let sql = "SELECT COUNT(*) as c FROM files WHERE deleted_at IS NULL";
  const params: unknown[] = [];
  if (apiKeyId) {
    sql += " AND api_key_id = ?";
    params.push(apiKeyId);
  }
  if (purpose) {
    sql += " AND purpose = ?";
    params.push(purpose);
  }
  const row = db.prepare(sql).get(...params) as { c: number } | undefined;
  return row ? Number(row.c) : 0;
}

function softDeleteFile(id: string, deletedAt: number): boolean {
  const db = getDbInstance();
  const result = db
    .prepare("UPDATE files SET deleted_at = ?, content = NULL WHERE id = ?")
    .run(deletedAt, id);
  return result.changes > 0;
}

function softDeleteFileOwnedBy(id: string, apiKeyId: string, deletedAt: number): boolean {
  const db = getDbInstance();
  const result = db
    .prepare("UPDATE files SET deleted_at = ?, content = NULL WHERE id = ? AND api_key_id = ?")
    .run(deletedAt, id, apiKeyId);
  return result.changes > 0;
}

function softDeleteExpiredFiles(now: number): number {
  const result = getDbInstance()
    .prepare(
      "UPDATE files SET deleted_at = ?, content = NULL WHERE expires_at IS NOT NULL AND expires_at < ? AND deleted_at IS NULL"
    )
    .run(now, now);
  return result.changes ?? 0;
}

export const sqliteFileRepository: FileRepository = {
  insert: async (file) => insertFile(file),
  findById: async (id) => findFileById(id),
  findContentById: async (id) => findFileContentById(id),
  list: async (query) => listFileRows(query),
  count: async (filter) => countFileRows(filter),
  softDelete: async (id, deletedAt) => softDeleteFile(id, deletedAt),
  softDeleteOwnedBy: async (id, apiKeyId, deletedAt) =>
    softDeleteFileOwnedBy(id, apiKeyId, deletedAt),
  softDeleteExpired: async (now) => softDeleteExpiredFiles(now),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * Files API routes and the batch processor call the store without awaiting, and the
 * completed-batch sweep soft-deletes files inside its own synchronous transaction.
 */
export const sqliteFileLegacySync = {
  insert: insertFile,
  findById: findFileById,
  findContentById: findFileContentById,
  list: listFileRows,
  count: countFileRows,
  softDelete: softDeleteFile,
  softDeleteOwnedBy: softDeleteFileOwnedBy,
  softDeleteExpired: softDeleteExpiredFiles,
};
