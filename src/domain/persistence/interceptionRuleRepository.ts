export type FetchInterceptionBackend = "firecrawl" | "jina" | "tavily";

export interface ModelInterceptionRule {
  /** true = route through OmniRoute's /v1/search; false = force native passthrough. */
  interceptSearch?: boolean;
  /** true = route through OmniRoute's /v1/web/fetch; false = force native passthrough. */
  interceptFetch?: boolean;
  fetchBackend?: FetchInterceptionBackend;
  fetchProxyUrl?: string;
}

export interface ProviderInterceptionRules {
  /** Provider-level default, used when a model has no override. */
  interceptSearch?: boolean;
  interceptFetch?: boolean;
  fetchBackend?: FetchInterceptionBackend;
  fetchProxyUrl?: string;
  /** Per-model overrides (stricter/looser than provider-level). */
  models?: Record<string, ModelInterceptionRule>;
}

export interface StoredInterceptionRules {
  provider: string;
  rules: ProviderInterceptionRules;
}

/**
 * Persistence only. Provider-key normalization, the read cache and the resolution
 * precedence stay in the DB facade (`src/lib/db/interceptionRules.ts`).
 */
export interface InterceptionRuleRepository {
  /** Every parseable stored rule set, keyed exactly as stored; malformed rows are skipped. */
  list(): Promise<StoredInterceptionRules[]>;
  /** Replaces the provider's whole rule set; an empty `models` map is not stored. */
  upsert(provider: string, rules: ProviderInterceptionRules): Promise<void>;
  /** Removing a provider without stored rules is a no-op. */
  deleteByProvider(provider: string): Promise<void>;
}
