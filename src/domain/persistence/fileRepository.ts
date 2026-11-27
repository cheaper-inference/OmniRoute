// ── Uploaded files (OpenAI-compatible Files API metadata and content) ────────

/**
 * One stored file. Reads return metadata only (`content` is absent); the bytes are
 * fetched separately through `findContentById`. Timestamps are Unix seconds.
 */
export interface FileRecord {
  id: string;
  bytes: number;
  createdAt: number;
  filename: string;
  purpose: string;
  content?: Buffer | null;
  mimeType?: string | null;
  apiKeyId?: string | null;
  expiresAt?: number | null;
  deletedAt?: number | null;
}

/** Column values for a new file, already generated and defaulted by the facade. */
export interface FileInsert {
  id: string;
  bytes: number;
  createdAt: number;
  filename: string;
  purpose: string;
  content: Buffer | null;
  mimeType: string | null;
  apiKeyId: string | null;
  expiresAt: number | null;
  deletedAt: number | null;
}

/** Shared filters for list and count. An empty string filter is treated as absent. */
export interface FileFilter {
  apiKeyId?: string;
  purpose?: string;
}

/** Keyset position of the last row of the previous page. */
export interface FileListCursor {
  createdAt: number;
  id: string;
}

export interface FileListQuery extends FileFilter {
  limit: number;
  order: "asc" | "desc";
  /** Rows strictly after this position in `order`. The facade decides whether to trust it. */
  after?: FileListCursor;
}

/**
 * Persistence only. The facade owns id generation, the default expiry for batch files,
 * which pagination cursor is trusted (owner check), the blank-owner guard, the clock,
 * and the API response shape. Every read skips soft-deleted rows.
 */
export interface FileRepository {
  insert(file: FileInsert): Promise<void>;
  /** Metadata of a live file, without content. */
  findById(id: string): Promise<FileRecord | null>;
  /** Content of a live file; null when the file is missing, deleted or has no content. */
  findContentById(id: string): Promise<Buffer | null>;
  /** Live files ordered by created_at then id, in `order`, at most `limit`. */
  list(query: FileListQuery): Promise<FileRecord[]>;
  count(filter: FileFilter): Promise<number>;
  /** Marks the file deleted at `deletedAt` and clears its content. True when a row matched. */
  softDelete(id: string, deletedAt: number): Promise<boolean>;
  /** Same as softDelete, but only when the file belongs to `apiKeyId`. */
  softDeleteOwnedBy(id: string, apiKeyId: string, deletedAt: number): Promise<boolean>;
  /** Soft-deletes every live file whose expires_at is before `now`. Resolves the count. */
  softDeleteExpired(now: number): Promise<number>;
}
