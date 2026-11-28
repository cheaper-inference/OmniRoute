/**
 * SQLite implementation for PII masking choices stored in key_value under the
 * "pii_settings" namespace:
 *   enabledTypes   — JSON string[] of built-in type ids, or absent for "all types"
 *   customPatterns — JSON PiiCustomPattern[]
 *
 * Async repository and SQLite-only legacy helpers share these private operations.
 * Resolve the database at call time so reset/restore never leaves a captured handle.
 */
import type {
  PiiSettings,
  PiiSettingsRepository,
  PiiSettingsUpdate,
} from "@/domain/persistence/productPolicyRepositories";
import type { PiiCustomPattern } from "@/shared/utils/piiCustomPatterns";
import { getDbInstance } from "../core";

const NAMESPACE = "pii_settings";
const KEY_ENABLED_TYPES = "enabledTypes";
const KEY_CUSTOM_PATTERNS = "customPatterns";

function parseJson(raw: string | undefined): unknown {
  if (raw === undefined) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function getSync(): PiiSettings {
  const rows = getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(NAMESPACE) as Array<{ key: string; value: string }>;
  const byKey = new Map(rows.map((row) => [row.key, row.value]));

  const enabledRaw = parseJson(byKey.get(KEY_ENABLED_TYPES));
  const customRaw = parseJson(byKey.get(KEY_CUSTOM_PATTERNS));
  return {
    enabledTypes: Array.isArray(enabledRaw)
      ? enabledRaw.filter((entry): entry is string => typeof entry === "string")
      : null,
    customPatterns: Array.isArray(customRaw)
      ? customRaw.filter(
          (entry): entry is PiiCustomPattern =>
            !!entry &&
            typeof entry === "object" &&
            typeof (entry as PiiCustomPattern).pattern === "string"
        )
      : [],
  };
}

function updateSync(update: PiiSettingsUpdate): void {
  const db = getDbInstance();
  const upsert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );
  if (update.enabledTypes === null) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      NAMESPACE,
      KEY_ENABLED_TYPES
    );
  } else if (update.enabledTypes !== undefined) {
    upsert.run(NAMESPACE, KEY_ENABLED_TYPES, JSON.stringify(update.enabledTypes));
  }
  if (update.customPatterns !== undefined) {
    upsert.run(NAMESPACE, KEY_CUSTOM_PATTERNS, JSON.stringify(update.customPatterns));
  }
}

export const sqlitePiiSettingsRepository: PiiSettingsRepository = {
  async get() {
    return getSync();
  },
  async update(update) {
    updateSync(update);
  },
};

/**
 * SQLite-only synchronous access retained for the existing public API: the
 * sanitizers read these settings per string leaf / per stream chunk.
 */
export const sqlitePiiSettingsLegacySync = {
  get: getSync,
  update: updateSync,
};
