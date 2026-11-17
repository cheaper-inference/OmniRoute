import { getDbInstance } from "./core.ts";
import type { SqliteAdapter } from "./adapters/types.ts";
import type { ConnectionLocalUsage } from "../../shared/types/connectionLocalUsage.ts";

/** Current UTC day plus 29 preceding days, using only retained connection-level rows.
 * Provider-wide rollups cannot be attributed to a registration and must not be added.
 * Stored tokens can include estimates; they are not ChatGPT subscription quota units.
 */
export function getConnectionLocalUsage(
  connectionId: string,
  provider: string,
  now = new Date(),
  db: SqliteAdapter = getDbInstance()
): ConnectionLocalUsage {
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - 29);
  const from = start.toISOString();
  const to = now.toISOString();
  const totals = db
    .prepare(
      `
    SELECT COUNT(*) AS requests,
      COALESCE(SUM(COALESCE(tokens_input, 0) + COALESCE(tokens_output, 0)), 0) AS tokens,
      COUNT(DISTINCT DATE(timestamp)) AS activeDays
    FROM usage_history
    WHERE provider = ? AND connection_id = ? AND timestamp >= ? AND timestamp <= ?
  `
    )
    .get(provider, connectionId, from, to) as Pick<
    ConnectionLocalUsage,
    "requests" | "tokens" | "activeDays"
  >;
  return { source: "retained_local_history", from, to, ...totals };
}
