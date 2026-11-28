import type { PiiCustomPattern } from "@/shared/utils/piiCustomPatterns";

// ── Feature flag overrides (key_value namespace "feature_flags") ────────────

/**
 * Persistence only. The DB facade owns flag-definition validation, the per-read
 * override cache and model-catalog invalidation; the evaluation order
 * (DB override > env > definition default) lives in the shared flag resolver.
 */
export interface FeatureFlagOverrideRepository {
  /** Every stored override as a key → raw value map; empty when none are stored. */
  list(): Promise<Record<string, string>>;
  /** Raw stored value for one flag, or undefined when no override is stored. */
  find(key: string): Promise<string | undefined>;
  /** Inserts or replaces the stored value for one flag. Values are stored verbatim. */
  set(key: string, value: string): Promise<void>;
  /** Deletes the stored override for one flag; a missing row is a no-op. */
  remove(key: string): Promise<void>;
  /** True when an override is stored for at least one of the given keys. */
  hasAny(keys: readonly string[]): Promise<boolean>;
  /** Deletes every stored override. */
  clear(): Promise<void>;
}

// ── PII masking choices (key_value namespace "pii_settings") ────────────────

export interface PiiSettings {
  /** null = every built-in type (the pre-existing behaviour). */
  enabledTypes: string[] | null;
  customPatterns: PiiCustomPattern[];
}

export interface PiiSettingsUpdate {
  /** null deletes the stored selection (back to "all types"); undefined leaves it unchanged. */
  enabledTypes?: string[] | null;
  /** undefined leaves the stored list unchanged. */
  customPatterns?: PiiCustomPattern[];
}

/** Persistence only; the DB facade owns the short read cache and its invalidation. */
export interface PiiSettingsRepository {
  /**
   * Decoded settings. Missing or unparsable rows fall back to the defaults
   * (all types, no custom patterns); non-string types and pattern entries
   * without a string `pattern` are dropped.
   */
  get(): Promise<PiiSettings>;
  /** Applies only the fields present in the update; values are stored as JSON. */
  update(update: PiiSettingsUpdate): Promise<void>;
}
