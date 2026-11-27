/**
 * Persistence contract for the administrative audit trail (`audit_log`).
 *
 * Audit rows are evidence, not a cache: a write that succeeds must stay readable
 * until application-log retention removes it. Redaction of secret-looking keys,
 * row normalization for API responses, the no-log opt-out and the auth-touch
 * coalescing policy stay in `src/lib/compliance`; this contract only stores and
 * reads rows.
 */

/** Filter accepted by the list and count reads. Text fields match as substrings. */
export interface AuditLogFilter {
  action?: string;
  actor?: string;
  target?: string;
  resourceType?: string;
  status?: string;
  requestId?: string;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
  /** When "high", restricts results to HIGH_LEVEL_ACTIONS only (B7). */
  levelFilter?: "high";
}

/** A stored row as written; JSON columns are still serialized text. */
export type AuditLogRow = Record<string, unknown> & {
  id?: number | null;
  action?: string | null;
  actor?: string | null;
  target?: string | null;
  status?: string | null;
  details?: string | null;
  metadata?: string | null;
  ip_address?: string | null;
  resource_type?: string | null;
  request_id?: string | null;
  timestamp?: string | null;
};

/** The newest coalescible auth-touch row, when one exists. */
export interface AuditAuthTouchMatch {
  id: number;
  timestamp: string | undefined;
}

/** One already-sanitized auth-touch write. */
export interface AuditAuthTouchRecord {
  apiKeyId: string;
  timestamp: string;
  ipAddress: string | null;
  requestId: string | null;
  serializedMetadata: string | null;
}

export interface AuditLogRepository {
  /** Create the table, add missing columns and indexes. Safe to repeat. */
  ensureSchema(): Promise<void>;
  /** Newest first; `limit` and `offset` are used exactly as given. */
  list(filter: AuditLogFilter, limit: number, offset: number): Promise<AuditLogRow[]>;
  count(filter: AuditLogFilter): Promise<number>;
  /** Every row of one exact action at or after `sinceIso` (text compare), newest first. */
  listByActionSince(action: string, sinceIso: string): Promise<AuditLogRow[]>;
  /** Delete rows older than `cutoffIso` (text compare); returns the deleted count. */
  deleteBefore(cutoffIso: string): Promise<number>;
}
