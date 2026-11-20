import { getDbInstance } from "./core";

/** Deduplicate a Claude ping across both triggers and processes; retry failures after 15 min. */
export function claimClaudeWakeup(connectionId: string, now: number): boolean {
  return (
    getDbInstance()
      .prepare(
        `INSERT INTO claude_wakeup_claims(connection_id, retry_at) VALUES (?, ?)
       ON CONFLICT(connection_id) DO UPDATE SET retry_at = excluded.retry_at
       WHERE claude_wakeup_claims.retry_at <= ?`
      )
      .run(connectionId, now + 15 * 60_000, now).changes === 1
  );
}

/** After a successful ping wait for its actual reset (or the usual five-hour duration). */
export function recordClaudeWakeupReset(connectionId: string, claimedAt: number, resetAt: number) {
  getDbInstance()
    .prepare(
      "UPDATE claude_wakeup_claims SET retry_at = ? WHERE connection_id = ? AND retry_at = ?"
    )
    .run(resetAt, connectionId, claimedAt + 15 * 60_000);
}
