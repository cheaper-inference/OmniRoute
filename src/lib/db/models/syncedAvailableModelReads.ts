import { getDbInstance } from "../core";
import { getKeyValue } from "./shared";
import type { SyncedAvailableModel } from "./synced";

export const SYNCED_AVAILABLE_MODELS_MALFORMED = Symbol("syncedAvailableModelsMalformed");
export type SyncedAvailableModelsByConnection = Record<string, SyncedAvailableModel[]> & {
  [SYNCED_AVAILABLE_MODELS_MALFORMED]?: true;
};

/**
 * Get synced available models for a provider grouped by connection id.
 * A non-enumerable symbol marks malformed persisted rows so strict callers can
 * fail closed without changing the existing Record-shaped API.
 */
export type RawSyncedAvailableModelsByConnection = Record<
  string,
  { value: unknown; malformed: boolean }
> & { [SYNCED_AVAILABLE_MODELS_MALFORMED]?: true };

export async function getRawSyncedAvailableModelsByConnection(
  providerId: string
): Promise<RawSyncedAvailableModelsByConnection> {
  const db = getDbInstance();
  const prefix = `${providerId}:`;
  const rows = db
    .prepare(
      "SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key LIKE ?"
    )
    .all(`${prefix}%`);
  const result: RawSyncedAvailableModelsByConnection = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null || !key.startsWith(prefix)) continue;
    try {
      const connectionId = key.slice(prefix.length);
      result[connectionId] = { value: JSON.parse(value), malformed: false };
    } catch {
      result[key.slice(prefix.length)] = { value: undefined, malformed: true };
      Object.defineProperty(result, SYNCED_AVAILABLE_MODELS_MALFORMED, {
        value: true,
        enumerable: false,
      });
    }
  }
  return result;
}
