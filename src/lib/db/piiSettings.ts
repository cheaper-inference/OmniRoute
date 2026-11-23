/**
 * db/piiSettings.ts — operator choices for PII masking.
 *
 * Stored in the key_value table under the "pii_settings" namespace:
 *   enabledTypes   — JSON string[] of built-in type ids, or absent for "all types"
 *   customPatterns — JSON PiiCustomPattern[]
 *
 * These only shape WHAT gets masked. Whether masking runs at all is still the
 * opt-in PII_REDACTION_ENABLED / PII_RESPONSE_SANITIZATION flags (default off).
 *
 * The sanitizers read this on hot paths (per string leaf / per stream chunk),
 * so reads are cached for a short TTL; writers in this module invalidate it.
 */

import type { PiiCustomPattern } from "@/shared/utils/piiCustomPatterns";
import { getDbInstance } from "./core";

const NAMESPACE = "pii_settings";
const KEY_ENABLED_TYPES = "enabledTypes";
const KEY_CUSTOM_PATTERNS = "customPatterns";
const CACHE_TTL_MS = 1000;

export interface PiiSettings {
  /** null = every built-in type (the pre-existing behaviour). */
  enabledTypes: string[] | null;
  customPatterns: PiiCustomPattern[];
}

let cache: { db: object; value: PiiSettings; expiresAt: number } | null = null;

export function clearPiiSettingsCache(): void {
  cache = null;
}

function parseJson(raw: string | undefined): unknown {
  if (raw === undefined) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function readFromDb(db: ReturnType<typeof getDbInstance>): PiiSettings {
  const rows = db
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

export function getPiiSettings(): PiiSettings {
  const db = getDbInstance();
  const now = Date.now();
  if (cache && cache.db === db && cache.expiresAt > now) return cache.value;
  const value = readFromDb(db);
  cache = { db, value, expiresAt: now + CACHE_TTL_MS };
  return value;
}

export function setPiiSettings(update: {
  enabledTypes?: string[] | null;
  customPatterns?: PiiCustomPattern[];
}): PiiSettings {
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
  clearPiiSettingsCache();
  return getPiiSettings();
}
