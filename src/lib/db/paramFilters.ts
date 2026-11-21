/**
 * db/paramFilters.ts — Provider/Model parameter filter configuration.
 *
 * CRUD against the key_value table under namespace "provider_param_filters".
 * Follows the established key_value pattern from databaseSettings.ts.
 */

import type { ProviderParamFilter } from "@/domain/persistence/paramFilterRepository";
import { resolveProviderId } from "@/shared/constants/providers";
import { sqliteParamFilterLegacySync as legacySync } from "./repositories/sqliteParamFilterRepository";

export type {
  ModelParamFilter,
  ProviderParamFilter,
} from "@/domain/persistence/paramFilterRepository";

// ── Cache ───────────────────────────────────────────────────────────────────

let filterCache: Map<string, ProviderParamFilter> | null = null;
let cacheGeneration = 0;

function bumpCacheGeneration(): void {
  cacheGeneration++;
  filterCache = null;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function toNormalizedString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

// ── Read ────────────────────────────────────────────────────────────────────

// Request translation and executor auto-learn read filters synchronously, so the facade
// uses the SQLite-only synchronous binding; the Promise repository is the portable
// persistence contract.
function loadAllConfigs(): Map<string, ProviderParamFilter> {
  const map = new Map<string, ProviderParamFilter>();
  for (const { provider: key, filter: parsed } of legacySync.list()) {
    const canonicalKey = resolveProviderId(key);
    if (!map.has(canonicalKey) || key === canonicalKey) {
      map.set(canonicalKey, parsed);
    }
    map.set(key, parsed);
  }
  return map;
}

// ── Public API ──────────────────────────────────────────────────────────────

/**
 * Warm the cache on module load so the first call to getParamFilterConfig
 * does not hit the DB. Idempotent — subsequent calls return the cached map.
 */
export function loadParamFilterConfigs(): Map<string, ProviderParamFilter> {
  if (filterCache === null) {
    filterCache = loadAllConfigs();
  }
  return filterCache;
}

/**
 * Get the param filter config for a single provider, or null if not configured.
 * Uses an in-memory cache refreshed on write. Resolves provider aliases so
 * alias lookups (e.g. 'cc') and canonical lookups (e.g. 'claude') resolve identically (#20295).
 */
export function getParamFilterConfig(provider: string): ProviderParamFilter | null {
  const normalized = toNormalizedString(provider);
  if (!normalized) return null;
  const canonical = resolveProviderId(normalized);
  const configs = loadParamFilterConfigs();
  return (
    configs.get(canonical) ?? (canonical !== normalized ? (configs.get(normalized) ?? null) : null)
  );
}

/**
 * Upsert the entire param filter config for a provider.
 * Invalidates the in-memory cache. Stores under the canonical provider id (#20295).
 */
export function setParamFilterConfig(provider: string, config: ProviderParamFilter): void {
  const normalizedKey = toNormalizedString(provider);
  if (!normalizedKey) return;
  const canonical = resolveProviderId(normalizedKey);

  legacySync.upsert(canonical, config);
  bumpCacheGeneration();
}

/**
 * Delete the param filter config for a provider.
 * Resets to no filtering for that provider. Cleans up the canonical key and every stored
 * alias key that resolves to it (#20295).
 */
export function deleteParamFilterConfig(provider: string): void {
  const normalizedKey = toNormalizedString(provider);
  if (!normalizedKey) return;
  const canonical = resolveProviderId(normalizedKey);

  // Legacy rows may sit under an alias key (e.g. "cc"): drop every stored key that
  // resolves to the same provider, or loadAllConfigs() would map it back after a reset.
  const keys = new Set([canonical, normalizedKey]);
  for (const key of legacySync.listProviderKeys()) {
    if (resolveProviderId(key) === canonical) keys.add(key);
  }

  legacySync.deleteByProviders([...keys]);
  bumpCacheGeneration();
}

// ── Global auto-learn flag ──────────────────────────────────────────────────

const GLOBAL_AUTOLEARN_KEY = "__global__";

/**
 * Check whether the global auto-learn flag is enabled.
 * When enabled, ALL providers auto-learn unsupported params from 400 errors
 * regardless of their per-provider autoLearn setting.
 * Only fires when this is explicitly configured, else returns false.
 */
export function isAutoLearnGloballyEnabled(): boolean {
  const globalCfg = getParamFilterConfig(GLOBAL_AUTOLEARN_KEY);
  return globalCfg?.autoLearn === true;
}

/**
 * Enable or disable global auto-learn globally for all providers.
 * When enabled, the per-provider autoLearn flag is still honored after
 * the global check (either being on is sufficient to trigger auto-learn).
 */
export function setGlobalAutoLearnEnabled(enabled: boolean): void {
  const existing = getParamFilterConfig(GLOBAL_AUTOLEARN_KEY);
  setParamFilterConfig(GLOBAL_AUTOLEARN_KEY, {
    block: existing?.block ?? [],
    allow: existing?.allow ?? [],
    autoLearn: enabled,
  });
}

/**
 * Auto-learn helper: add a single parameter to a provider's block list.
 * If the field is already in the block list (or the config does not exist),
 * this is a no-op. Optionally scoped to a specific model.
 */
export function addParamToBlocklist(provider: string, paramName: string, model?: string): void {
  if (!toNormalizedString(provider) || !toNormalizedString(paramName)) return;

  const existing = getParamFilterConfig(provider) ?? {
    block: [],
    allow: [],
    autoLearn: false,
  };

  if (model) {
    // Model-level
    const models = existing.models ?? {};
    const modelCfg = models[model] ?? {};

    if (Array.isArray(modelCfg.block) && modelCfg.block.includes(paramName)) return;

    const updatedBlock = [...(modelCfg.block ?? []), paramName];
    models[model] = { ...modelCfg, block: updatedBlock };
    existing.models = models;
  } else {
    // Provider-level
    if (existing.block.includes(paramName)) return;
    existing.block = [...existing.block, paramName];
  }

  setParamFilterConfig(provider, existing);
}
