import { logicalCallSql } from "./logicalCallSql";
import { getDbInstance } from "./core";

export type ComboUsageSummaryRow = {
  comboName: string;
  requests: number;
  successCount: number;
  inputTokens: number;
  outputTokens: number;
};

export function getComboUsageSummary(since: string, until?: string): ComboUsageSummaryRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT
         combo_name as comboName,
         COUNT(*) as requests,
         SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) as successCount,
         COALESCE(SUM(tokens_in), 0) as inputTokens,
         COALESCE(SUM(tokens_out), 0) as outputTokens
       FROM call_logs
       WHERE ${logicalCallSql()} AND combo_name IS NOT NULL AND combo_name != '' AND timestamp >= @since${until ? " AND timestamp <= @until" : ""}
       GROUP BY combo_name
       ORDER BY requests DESC`
    )
    .all(until ? { since, until } : { since }) as Array<Record<string, unknown>>;

  return rows.map((row) => ({
    comboName: String(row.comboName ?? ""),
    requests: Number(row.requests) || 0,
    successCount: Number(row.successCount) || 0,
    inputTokens: Number(row.inputTokens) || 0,
    outputTokens: Number(row.outputTokens) || 0,
  }));
}
