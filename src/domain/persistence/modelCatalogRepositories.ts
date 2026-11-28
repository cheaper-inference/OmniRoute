// ── Global model aliases (`modelAliases` + `managedModelAliasNames`) ────────

/**
 * Alias name → stored target. Targets are whatever JSON the caller stored: usually a
 * `"provider/model"` string, sometimes an array or a `{ provider, model }` object.
 */
export type ModelAliasMap = Record<string, unknown>;

/**
 * Persistence only. The DB facade owns the pre-write backup, model-catalog cache
 * invalidation, clearing the managed marker on delete and the provider cascade.
 */
export interface ModelAliasRepository {
  /** Every stored alias with its JSON-decoded target. */
  list(): Promise<ModelAliasMap>;
  /** Upserts one alias; the target is stored as JSON. */
  set(alias: string, target: unknown): Promise<void>;
  /** Deletes one alias row; missing aliases are a no-op. */
  remove(alias: string): Promise<void>;
  /**
   * Alias names OmniRoute generated or adopted during a managed provider model sync
   * (#11836). An unreadable or non-array record reads as empty.
   */
  listManagedNames(): Promise<Set<string>>;
  /** Adds `alias` to the managed set; writes nothing when it is already present. */
  markManaged(alias: string): Promise<void>;
  /** Removes `alias` from the managed set; writes nothing when it is absent. */
  unmarkManaged(alias: string): Promise<void>;
}

// ── Provider discovery findings (`discovery_results`, migration 074) ───────

export type DiscoveryMethod = "free_tier" | "web_cookie" | "auto_register" | "trial" | "public_api";
export type DiscoveryAuthType = "none" | "cookie" | "api_key" | "oauth";
export type DiscoveryRiskLevel = "none" | "low" | "medium" | "high" | "critical";
export type DiscoveryStatus = "pending" | "testing" | "verified" | "rejected";

export interface DiscoveryResult {
  id?: number;
  providerId: string;
  method: DiscoveryMethod;
  endpoint?: string | null;
  authType: DiscoveryAuthType;
  models?: string[];
  rateLimit?: string | null;
  feasibility: number;
  riskLevel: DiscoveryRiskLevel;
  status: DiscoveryStatus;
  notes?: string | null;
  discoveredAt?: string;
  verifiedAt?: string | null;
}

export interface DiscoveryResultRepository {
  /**
   * Inserts or updates on `(providerId, method, endpoint)` and returns the stored row.
   * Re-discovery keeps the row id, `discoveredAt` and `verifiedAt`.
   */
  upsert(result: DiscoveryResult): Promise<DiscoveryResult>;
  /** Newest `discoveredAt` first, then id descending; optionally one provider only. */
  list(providerId?: string): Promise<DiscoveryResult[]>;
  findById(id: number): Promise<DiscoveryResult | null>;
  /** Sets status `verified` and stamps `verifiedAt`; null when the id does not exist. */
  markVerified(id: number): Promise<DiscoveryResult | null>;
  /** True only when a row was deleted. */
  remove(id: number): Promise<boolean>;
}

// ── Embedded-service model lists (`serviceModels`) ─────────────────────────

export interface ServiceModel {
  id: string;
  name?: string;
  object?: string;
  owned_by?: string;
  created?: number;
  available?: boolean;
  [key: string]: unknown;
}

/**
 * Persistence only. The availability merge (soft-delete pruning and marking a stopped
 * service's models unavailable) stays in the DB facade.
 */
export interface ServiceModelRepository {
  /** The stored list for a tool; `[]` when nothing (or nothing readable) is stored. */
  list(tool: string): Promise<ServiceModel[]>;
  /** Replaces the tool's list as one value; an empty list deletes the tool's row. */
  replace(tool: string, models: ServiceModel[]): Promise<void>;
}
