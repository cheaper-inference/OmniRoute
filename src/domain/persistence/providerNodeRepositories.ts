// ── Provider nodes (custom OpenAI/Anthropic-compatible endpoints) ───────────

/**
 * One stored provider node exactly as persisted (snake_case columns, JSON columns still
 * as text). The DB facade owns the camelCase mapping, JSON parsing and merge rules.
 */
export interface ProviderNodeRow {
  id: string;
  type: string;
  name: string;
  prefix: string | null;
  api_type: string | null;
  base_url: string | null;
  chat_path: string | null;
  models_path: string | null;
  icon_url: string | null;
  custom_headers_json: string | null;
  custom_json_config_json: string | null;
  daily_quota_reset_timezone: string | null;
  daily_quota_reset_hour: number | null;
  created_at: string;
  updated_at: string;
  [column: string]: unknown;
}

/**
 * Column values for a node write, already normalized and serialized by the facade
 * (JSON columns arrive as text or null). Values are bound as given.
 */
export interface ProviderNodeValues {
  type: unknown;
  name: unknown;
  prefix: unknown;
  apiType: unknown;
  baseUrl: unknown;
  chatPath: unknown;
  modelsPath: unknown;
  iconUrl: unknown;
  customHeadersJson: unknown;
  customJsonConfigJson: unknown;
  dailyQuotaResetTimezone: unknown;
  dailyQuotaResetHour: number | null;
  updatedAt: unknown;
}

export interface ProviderNodeInsert extends ProviderNodeValues {
  id: unknown;
  createdAt: string;
}

export interface ProviderNodeFilter {
  type?: unknown;
}

export interface ProviderNodePage {
  limit: number;
  offset?: number;
}

/**
 * Persistence only. Lists are ordered by id ascending. The facade owns defaults,
 * the id-conflict error, backups and every cache invalidation (read cache and the
 * node-prefix memo).
 */
export interface ProviderNodeRepository {
  /** All nodes (optionally of one type), id ascending; offset defaults to 0 when paged. */
  list(filter?: ProviderNodeFilter, page?: ProviderNodePage): Promise<ProviderNodeRow[]>;
  count(filter?: ProviderNodeFilter): Promise<number>;
  findById(id: string): Promise<ProviderNodeRow | null>;
  /** Inserts the node; resolves false (and writes nothing) when the id already exists. */
  insert(node: ProviderNodeInsert): Promise<boolean>;
  /** Overwrites every column of an existing node. */
  update(id: string, values: ProviderNodeValues): Promise<void>;
  /**
   * Deletes the node and its custom-model list (key_value "customModels" keyed by the
   * node id). Resolves the row as it was before deletion, or null when absent.
   */
  delete(id: string): Promise<ProviderNodeRow | null>;
}

// ── Provider plans (per-connection quota dimension overrides) ────────────────

type QuotaUnit = "percent" | "requests" | "tokens" | "usd";
type QuotaWindow = "5h" | "hourly" | "daily" | "weekly" | "monthly";

export interface QuotaDimension {
  unit: QuotaUnit;
  window: QuotaWindow;
  limit: number;
}

export interface ProviderPlan {
  connectionId: string | null;
  provider: string;
  dimensions: QuotaDimension[];
  source: "auto" | "manual";
}

/**
 * Persistence only. Reads parse the stored dimensions; malformed JSON reads back as an
 * empty dimension list instead of throwing. Lists are ordered by provider ascending.
 */
export interface ProviderPlanRepository {
  findByConnectionId(connectionId: string): Promise<ProviderPlan | null>;
  list(): Promise<ProviderPlan[]>;
  /** Inserts or replaces the plan stored for the connection. */
  upsert(
    connectionId: string,
    provider: string,
    dimensions: QuotaDimension[],
    source: "auto" | "manual",
    updatedAt: string
  ): Promise<void>;
  /** Resolves true when a stored plan was removed. */
  delete(connectionId: string): Promise<boolean>;
}
