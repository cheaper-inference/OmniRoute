/**
 * db/interceptionRules.ts — Per-model web-search / web-fetch interception rules (#3384).
 *
 * CRUD against the key_value table under namespace "interception_rules". Follows the
 * established key_value pattern from paramFilters.ts / databaseSettings.ts.
 *
 * Resolution precedence (see resolveInterceptSearch): per-model rule > provider-level
 * rule > undefined (caller falls back to the existing native-bypass defaults).
 */

import type { ProviderInterceptionRules } from "@/domain/persistence/interceptionRuleRepository";
import { sqliteInterceptionRuleLegacySync as legacySync } from "./repositories/sqliteInterceptionRuleRepository";

export type {
  FetchInterceptionBackend,
  ProviderInterceptionRules,
} from "@/domain/persistence/interceptionRuleRepository";

// ── Cache ───────────────────────────────────────────────────────────────────

let rulesCache: Map<string, ProviderInterceptionRules> | null = null;

function invalidateCache(): void {
  rulesCache = null;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function toNormalizedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

// ── Read ────────────────────────────────────────────────────────────────────

// Request-path resolution is synchronous, so reads go through the SQLite-only
// synchronous binding; the Promise repository is the portable persistence contract.
function loadRulesCached(): Map<string, ProviderInterceptionRules> {
  if (rulesCache === null) {
    rulesCache = new Map(legacySync.list().map(({ provider, rules }) => [provider, rules]));
  }
  return rulesCache;
}

// ── Public API ──────────────────────────────────────────────────────────────

/** Get the interception rules for a single provider, or null if not configured. */
export function getInterceptionRules(provider: string): ProviderInterceptionRules | null {
  return toNormalizedString(provider) ? (loadRulesCached().get(provider) ?? null) : null;
}

/** Upsert the entire interception rule set for a provider. Invalidates the cache. */
export function setInterceptionRules(provider: string, rules: ProviderInterceptionRules): void {
  const normalizedProvider = toNormalizedString(provider);
  if (!normalizedProvider) return;

  legacySync.upsert(normalizedProvider, rules);
  invalidateCache();
}

/** Delete the interception rules for a provider. Resets that provider to default behavior. */
export function deleteInterceptionRules(provider: string): void {
  const normalizedProvider = toNormalizedString(provider);
  if (!normalizedProvider) return;

  legacySync.deleteByProvider(normalizedProvider);
  invalidateCache();
}

/**
 * Resolve the effective `interceptSearch` override for a provider/model pair.
 *
 * Precedence: per-model rule > provider-level rule > undefined (no override — the
 * caller should fall back to the existing native-bypass defaults).
 */
export function resolveInterceptSearch(
  provider: string | null | undefined,
  model: string | null | undefined
): boolean | undefined {
  const normalizedProvider = toNormalizedString(provider);
  if (!normalizedProvider) return undefined;

  const rules = getInterceptionRules(normalizedProvider);
  if (!rules) return undefined;

  const normalizedModel = toNormalizedString(model);
  if (normalizedModel && rules.models?.[normalizedModel]?.interceptSearch !== undefined) {
    return rules.models[normalizedModel].interceptSearch;
  }

  return rules.interceptSearch;
}

/**
 * Resolve the effective `interceptFetch` override for a provider/model pair.
 *
 * Precedence: per-model rule > provider-level rule > undefined (no override — the
 * caller should fall back to the existing native-bypass defaults). Structural twin of
 * resolveInterceptSearch above (#7339 / Phase 3 of #3384).
 */
export function resolveInterceptFetch(
  provider: string | null | undefined,
  model: string | null | undefined
): boolean | undefined {
  const normalizedProvider = toNormalizedString(provider);
  if (!normalizedProvider) return undefined;

  const rules = getInterceptionRules(normalizedProvider);
  if (!rules) return undefined;

  const normalizedModel = toNormalizedString(model);
  if (normalizedModel && rules.models?.[normalizedModel]?.interceptFetch !== undefined) {
    return rules.models[normalizedModel].interceptFetch;
  }

  return rules.interceptFetch;
}
