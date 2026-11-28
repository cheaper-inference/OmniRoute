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
 *
 * Persistence lives behind PiiSettingsRepository. The exports below stay
 * synchronous (SQLite-only legacy access) because the sanitizers cannot await;
 * this facade owns the read cache and its invalidation.
 */

import type {
  PiiSettings,
  PiiSettingsRepository,
  PiiSettingsUpdate,
} from "@/domain/persistence/productPolicyRepositories";
import { getDbInstance } from "./core";
import { productPolicyRepositories } from "./repositories/productPolicyRepositories";

export type { PiiSettings } from "@/domain/persistence/productPolicyRepositories";

const CACHE_TTL_MS = 1000;

// Resolved per call, never at module load (see db/featureFlags.ts: core.ts sits
// in the same import cycle through the shared flag resolver).
function legacy() {
  return productPolicyRepositories.legacySync.piiSettings;
}

let cache: { db: object; value: PiiSettings; expiresAt: number } | null = null;

/** Async persistence contract; it never touches the read cache on its own. */
export function getPiiSettingsRepository(): PiiSettingsRepository {
  return productPolicyRepositories.piiSettings;
}

export function clearPiiSettingsCache(): void {
  cache = null;
}

export function getPiiSettings(): PiiSettings {
  const db = getDbInstance();
  const now = Date.now();
  if (cache && cache.db === db && cache.expiresAt > now) return cache.value;
  const value = legacy().get();
  cache = { db, value, expiresAt: now + CACHE_TTL_MS };
  return value;
}

export function setPiiSettings(update: PiiSettingsUpdate): PiiSettings {
  legacy().update(update);
  clearPiiSettingsCache();
  return getPiiSettings();
}
