import { randomUUID } from "node:crypto";
import { getDbInstance } from "./core";

/** Host identity survives restarts, but never follows an imported account. */
export function getChatGptHostId(): string {
  const db = getDbInstance();
  return db.transaction(() => {
    db.prepare("INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      "chatgpt",
      "hostId",
      JSON.stringify(`urn:uuid:${randomUUID()}`)
    );
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get("chatgpt", "hostId") as { value: string };
    return JSON.parse(row.value) as string;
  })();
}

type ConnectionRow = Record<string, unknown>;

/** SIWC registrations are distinct even when their verified email is identical. */
export function findChatGptConnectionByRegistration(
  providerSpecificData: Record<string, unknown>
): ConnectionRow | null {
  const { issuer, subject, clientId } = providerSpecificData;
  if (!issuer || !subject || !clientId) throw new Error("Missing ChatGPT registration identity");
  return (
    (getDbInstance()
      .prepare(
        "SELECT * FROM provider_connections WHERE provider = 'chatgpt' AND json_extract(provider_specific_data, '$.issuer') = ? AND json_extract(provider_specific_data, '$.subject') = ? AND json_extract(provider_specific_data, '$.clientId') = ?"
      )
      .get(issuer, subject, clientId) as ConnectionRow | undefined) || null
  );
}
