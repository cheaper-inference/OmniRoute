export interface ModelParamFilter {
  block?: string[];
  allow?: string[];
}

export interface ProviderParamFilter {
  /** Provider-level params to strip from all requests to this provider. */
  block: string[];
  /** Provider-level params to re-add after denylist stripping. */
  allow: string[];
  /** Model-specific overrides (stricter than provider-level). */
  models?: Record<string, ModelParamFilter>;
  /** When true, upstream 400 "Unsupported parameter" errors auto-populate block. */
  autoLearn?: boolean;
}

export interface StoredParamFilter {
  provider: string;
  filter: ProviderParamFilter;
}

/**
 * Persistence only. Provider alias resolution, the read cache and the auto-learn
 * policy stay in the DB facade (`src/lib/db/paramFilters.ts`).
 */
export interface ParamFilterRepository {
  /** Every parseable stored filter, keyed exactly as stored; malformed rows are skipped. */
  list(): Promise<StoredParamFilter[]>;
  /** Every stored provider key, including rows whose value cannot be parsed. */
  listProviderKeys(): Promise<string[]>;
  /** Replaces the provider's whole filter with missing lists and flags defaulted. */
  upsert(provider: string, filter: ProviderParamFilter): Promise<void>;
  /** Removes all listed provider keys atomically; unknown keys are ignored. */
  deleteByProviders(providers: readonly string[]): Promise<void>;
}
