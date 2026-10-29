/** Server compatibility wrappers; query/mapping code is shared with the read-only child. */
import { getDbInstance } from "../db/core";
import { expirePendingCallLogDetails } from "../db/callLogDetails";
import { getCallLogById } from "./callLogs";
import * as queries from "./callLogExportQueries";
import type { LogExportSourceRow } from "../logExport/types";
export function getMaxCallLogRowId(): number {
  return queries.getMaxCallLogRowId(getDbInstance());
}
export function countCallLogsAfterRowId(afterRowId: number): number {
  return queries.countCallLogsAfterRowId(getDbInstance(), afterRowId);
}
export function getCallLogsForExport(
  afterRowId: number,
  limit: number,
  options: { includeBodies?: boolean } = {}
): LogExportSourceRow[] {
  return queries.getCallLogsForExport(
    getDbInstance(),
    afterRowId,
    limit,
    Number.MAX_SAFE_INTEGER,
    options
  );
}
/**
 * Make abandoned artifact writes terminal before a body export reads the barrier. Runs in
 * the server: the export child holds a read-only connection and cannot write.
 */
export function expirePendingExportDetails(): void {
  expirePendingCallLogDetails(getDbInstance());
}
export function attachExportBodies(
  rows: LogExportSourceRow[],
  maxBodyBytes = queries.DEFAULT_MAX_BODY_BYTES
): Promise<LogExportSourceRow[]> {
  return queries.attachExportBodies(rows, maxBodyBytes, getCallLogById);
}
