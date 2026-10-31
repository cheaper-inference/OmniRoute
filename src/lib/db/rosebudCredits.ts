import { getDbInstance } from "./core";

export type RosebudCreditEvent = {
  id: string;
  connectionId: string;
  model: string;
  modality: string;
  status: string;
  estimatedCredits?: number;
  actualCredits?: number;
  refundedCredits?: number;
  updatedAt: string;
};
/** Native units only. Upserts make polling/recovery accounting idempotent. */
export function saveRosebudCreditEvent(event: RosebudCreditEvent) {
  getDbInstance()
    .prepare(
      "INSERT INTO key_value(namespace,key,value) VALUES(?,?,?) ON CONFLICT(namespace,key) DO UPDATE SET value=excluded.value"
    )
    .run("rosebudCreditEvents:" + event.connectionId, event.id, JSON.stringify(event));
}
export function getRosebudCreditEvents(connectionId: string): RosebudCreditEvent[] {
  const rows = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace=?")
    .all("rosebudCreditEvents:" + connectionId) as Array<{ value: string }>;
  return rows
    .map((row) => JSON.parse(row.value) as RosebudCreditEvent)
    .filter((row) => row.connectionId === connectionId);
}
