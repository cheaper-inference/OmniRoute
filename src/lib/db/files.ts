import { v4 as uuidv4 } from "uuid";
import { DEFAULT_BATCH_EXPIRATION_SECONDS } from "@/shared/constants/batch";
import type { FileRecord, FileRepository } from "@/domain/persistence/fileRepository";
import { fileRepositories } from "./repositories/fileRepositories";

/*
 * Persistence lives behind FileRepository. The exports below stay synchronous
 * (SQLite-only legacy access) because the Files API routes, the batch processor
 * and the completed-batch sweep call them without awaiting.
 */

export type { FileRecord };

const legacy = fileRepositories.legacySync.files;

/** Async persistence contract. */
export function getFileRepository(): FileRepository {
  return fileRepositories.files;
}

export function createFile(file: Omit<FileRecord, "id" | "createdAt">): FileRecord {
  const id = "file-" + uuidv4().replaceAll("-", "").substring(0, 24);
  const createdAt = Math.floor(Date.now() / 1000);

  let expiresAt = file.expiresAt;
  if (expiresAt === undefined && file.purpose === "batch") {
    // Default: batch files expire after 30 days
    expiresAt = createdAt + DEFAULT_BATCH_EXPIRATION_SECONDS;
  }

  const record: FileRecord = {
    id,
    bytes: file.bytes,
    createdAt,
    filename: file.filename,
    purpose: file.purpose,
    content: file.content ?? null,
    mimeType: file.mimeType ?? null,
    apiKeyId: file.apiKeyId ?? null,
    expiresAt: expiresAt ?? null,
    deletedAt: null,
  };

  legacy.insert({
    id: record.id,
    bytes: record.bytes,
    createdAt: record.createdAt,
    filename: record.filename,
    purpose: record.purpose,
    content: record.content ?? null,
    mimeType: record.mimeType ?? null,
    apiKeyId: record.apiKeyId ?? null,
    expiresAt: record.expiresAt ?? null,
    deletedAt: record.deletedAt ?? null,
  });

  return record;
}

export function getFile(id: string): FileRecord | null {
  return legacy.findById(id);
}

export function getFileContent(id: string): Buffer | null {
  return legacy.findContentById(id);
}

export function listFiles(
  options: {
    apiKeyId?: string;
    purpose?: string;
    limit?: number;
    after?: string;
    order?: "asc" | "desc";
  } = {}
): FileRecord[] {
  const { apiKeyId, purpose, limit = 20, after, order = "desc" } = options;

  let cursor: { createdAt: number; id: string } | undefined;
  if (after) {
    // Get the creation time of the 'after' file to use for pagination.
    // #14481 item 5/LEDGER-20/21 (same pattern as listBatches()): getFile()
    // applies no owner filter, so a foreign tenant's file id used to still
    // resolve here and its created_at was used as the pagination bound — an
    // existence + timestamp oracle for another tenant's file. When this call
    // IS owner-scoped, a cursor belonging to a DIFFERENT owner is treated
    // exactly like an unknown one (ignored) instead of trusted.
    const resolvedAfterFile = getFile(after);
    const afterFile =
      apiKeyId && resolvedAfterFile && resolvedAfterFile.apiKeyId !== apiKeyId
        ? null
        : resolvedAfterFile;
    if (afterFile) {
      cursor = { createdAt: afterFile.createdAt, id: after };
    }
  }

  return legacy.list({ apiKeyId, purpose, limit, order, after: cursor });
}

export function countFiles(options: { apiKeyId?: string; purpose?: string } = {}): number {
  const { apiKeyId, purpose } = options;
  return legacy.count({ apiKeyId, purpose });
}

export function formatFileResponse(file: FileRecord) {
  // Ensure numeric date fields are valid numbers to avoid NaN in API responses
  const createdAt =
    typeof file.createdAt === "number" && Number.isFinite(file.createdAt) ? file.createdAt : 0;
  const expiresAt =
    typeof file.expiresAt === "number" && Number.isFinite(file.expiresAt) ? file.expiresAt : null;

  return {
    id: file.id,
    bytes: file.bytes,
    created_at: createdAt,
    filename: file.filename,
    object: "file",
    purpose: file.purpose,
    expires_at: expiresAt,
  };
}

export function deleteFile(id: string): boolean {
  return legacy.softDelete(id, Math.floor(Date.now() / 1000));
}

/**
 * Owner-scoped soft delete: same effect as `deleteFile`, but only when the
 * file belongs to `apiKeyId`. Used by the key-scoped completed-batch sweep so
 * a batch that references another tenant's (or an unowned) file never nulls
 * that file's content (GHSA-wvxc-jp3v-5mg5, SEC-C). Returns false when the
 * row is not the caller's; throws on an empty owner so a caller cannot widen
 * the delete by passing a blank id.
 */
export function deleteFileOwnedBy(id: string, apiKeyId: string): boolean {
  if (typeof apiKeyId !== "string" || apiKeyId.trim() === "") {
    throw new Error("deleteFileOwnedBy: apiKeyId is required");
  }
  return legacy.softDeleteOwnedBy(id, apiKeyId, Math.floor(Date.now() / 1000));
}

/**
 * Clears the BLOB content of files past their own `expires_at`, mirroring the
 * deleteFile() soft-delete shape (row kept for metadata/audit, content freed).
 * Like ccr_blocks (see pruneExpiredCcrBlocks), a file carries its own expiry --
 * this needs no separate retention-days setting, just an operator-scheduled
 * sweep, since nothing previously enforced expires_at at all. Observed live:
 * 1,874 rows / 5.19 GB of uploaded file content, most long past expiry.
 */
export function pruneExpiredFiles(now: number): number {
  return legacy.softDeleteExpired(now);
}
