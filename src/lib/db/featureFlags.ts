/**
 * db/featureFlags.ts — Feature flag DB overrides.
 *
 * Stores per-flag override values in the key_value table under the
 * "feature_flags" namespace. When an override is present it takes precedence
 * over the process environment variable of the same name.
 *
 * Persistence lives behind FeatureFlagOverrideRepository. The exports below stay
 * synchronous (SQLite-only legacy access) because flag reads sit on per-request
 * hot paths; this facade owns flag-definition validation, the override cache and
 * model-catalog invalidation.
 */

import type { FeatureFlagOverrideRepository } from "@/domain/persistence/productPolicyRepositories";
import { FEATURE_FLAG_DEFINITIONS } from "@/shared/constants/featureFlagDefinitions";
import { getDbInstance } from "./core";
import { finishModelCatalogWriteWithoutBackup } from "./models/modelCatalogWriteSignals";
import { productPolicyRepositories } from "./repositories/productPolicyRepositories";

// Resolved per call, never at module load: core.ts reaches this module through
// the shared flag resolver, so an eager read here would run inside that cycle.
function legacy() {
  return productPolicyRepositories.legacySync.featureFlagOverrides;
}

/** Async persistence contract; it never touches caches on its own. */
export function getFeatureFlagOverrideRepository(): FeatureFlagOverrideRepository {
  return productPolicyRepositories.featureFlagOverrides;
}

// Flag reads sit on hot paths that call them once per string leaf of a request
// body (sanitizePII, the PII masker guardrail), so a synchronous SELECT per
// read turned a 2 MB agentic request into a thousand SQLite round trips. The
// cache is invalidated by every writer in this module; the short TTL only
// covers edits made to the store from outside this process. It is keyed by the
// database instance so a reopened store (tests, resetDbInstance) starts clean.
const OVERRIDE_CACHE_TTL_MS = 1000;
type OverrideCacheEntry = { value: string | undefined; expiresAt: number };
const overrideCaches = new WeakMap<object, Map<string, OverrideCacheEntry>>();

function overrideCacheFor(db: object): Map<string, OverrideCacheEntry> {
  let cache = overrideCaches.get(db);
  if (!cache) {
    cache = new Map();
    overrideCaches.set(db, cache);
  }
  return cache;
}

export function clearFeatureFlagOverrideCache(key?: string): void {
  const cache = overrideCaches.get(getDbInstance());
  if (!cache) return;
  if (key === undefined) cache.clear();
  else cache.delete(key);
}

const CATALOG_RELEVANT_FEATURE_FLAGS = new Set([
  "MODEL_CATALOG_INCLUDE_NAMES",
  "MODELS_CATALOG_PREFIX_MODE",
  "EXPOSE_CC_DISCOVERY_ALIASES",
  "NO_THINKING_ALIAS_ENABLED",
  "OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS",
  "CATALOG_MIRROR_REFINEMENTS_ENABLED",
  // #16929: hides models with no runnable endpoint adapter from /v1/models.
  "MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED",
  "MODELS_DEV_EFFORT_TIERS_ENABLED",
]);

/**
 * Returns all feature flag overrides as a key→value map.
 */
export function getFeatureFlagOverrides(): Record<string, string> {
  return legacy().list();
}

/**
 * Returns the override value for a single flag, or undefined if no override
 * is stored.
 */
export function getFeatureFlagOverride(key: string): string | undefined {
  const db = getDbInstance();
  const cache = overrideCacheFor(db);
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && cached.expiresAt > now) return cached.value;
  const value = legacy().find(key);
  cache.set(key, { value, expiresAt: now + OVERRIDE_CACHE_TTL_MS });
  return value;
}

/**
 * Persists (or replaces) an override for a single flag.
 */
export function setFeatureFlagOverride(key: string, value: string): void {
  const definition = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === key);
  if (!definition) {
    throw new Error(`Unknown feature flag key: ${key}`);
  }
  if (
    definition.type === "enum" &&
    definition.enumValues &&
    !definition.enumValues.includes(value)
  ) {
    throw new Error(
      `Invalid value "${value}" for enum flag ${key}. Allowed: ${definition.enumValues.join(", ")}`
    );
  }
  legacy().set(key, value);
  clearFeatureFlagOverrideCache(key);
  if (CATALOG_RELEVANT_FEATURE_FLAGS.has(key)) {
    finishModelCatalogWriteWithoutBackup();
  }
}

/**
 * Removes the override for a single flag, restoring env-var / default
 * behaviour.
 */
export function removeFeatureFlagOverride(key: string): void {
  legacy().remove(key);
  clearFeatureFlagOverrideCache(key);
  if (CATALOG_RELEVANT_FEATURE_FLAGS.has(key)) {
    finishModelCatalogWriteWithoutBackup();
  }
}

/**
 * Removes all stored feature flag overrides.
 */
export function clearAllFeatureFlagOverrides(): void {
  const hadRelevantOverride = legacy().hasAny(Array.from(CATALOG_RELEVANT_FEATURE_FLAGS));
  legacy().clear();
  clearFeatureFlagOverrideCache();
  if (hadRelevantOverride) {
    finishModelCatalogWriteWithoutBackup();
  }
}
