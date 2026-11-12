/**
 * Team report source rows: attributed usage_history requests, sliced per session, provider,
 * model, account, service tier, error code, billing team and day (or per local weekday and hour),
 * plus the filter facets. Reading requests (not the session aggregates) keeps the time window
 * exact and lets per-request filters see every request a session made.
 */

import type { AgentSessionRecord, AgentSessionTokens } from "./agentSessions";
import type { SqliteAdapter } from "./adapters/types";

/**
 * Filter value that selects requests whose field is empty (NULL or ""), for example sessions
 * without a member or project. It can be mixed with other values. Breakdown and facet rows for
 * empty fields have key/value "".
 */
export const REPORT_FILTER_NONE = "__none__";

/** Longest accepted `search` term; longer input is cut to this length. */
export const REPORT_SEARCH_MAX_LENGTH = 200;

/** One value, or several matched with IN; each may be REPORT_FILTER_NONE. */
export type ReportFilterValues = string | readonly string[];

/** Filters that take one or several values (repeated query params). */
export const REPORT_MULTI_VALUE_FILTERS = [
  "apiKeyId",
  "projectName",
  "client",
  "provider",
  "model",
  "connectionId",
  "gitBranch",
  "serviceTier",
  "errorCode",
  "billingTeamId",
] as const;
export type ReportMultiValueFilter = (typeof REPORT_MULTI_VALUE_FILTERS)[number];

export type AgentSessionReportFilter = Partial<
  Record<ReportMultiValueFilter, ReportFilterValues>
> & {
  /** ISO timestamps (UTC, `toISOString()` form) bounding each request. */
  from?: string;
  to?: string;
  /** Requests that succeeded or failed (usage_history.success). */
  outcome?: "success" | "error";
  /**
   * Case-insensitive substring of the session id, client session id, project name, project path
   * or git branch. `%`, `_` and `\` match literally.
   */
  search?: string;
  /** One session's requests (session detail totals); not a dashboard filter. */
  sessionId?: string;
  /**
   * Minutes to add to UTC to get local time (-840..840). Groups `day` by local day; absent or 0
   * groups by UTC day. Does not move the from/to bounds.
   */
  tzOffset?: number;
};

/** Request counts and token sums of a group of requests, with what prices them. */
export interface ReportUsageSums {
  provider: string | null;
  model: string | null;
  /** The tier the requests are priced with; "standard" when none was stored. */
  serviceTier: string;
  requests: number;
  /** Requests that consumed tokens; only these can be unpriced (same rule as agent_sessions). */
  requestsWithTokens: number;
  errors: number;
  tokens: AgentSessionTokens;
  /**
   * Sum of the stored cost (STORED_COST_SQL): the provider-reported cost, else the catalogue
   * estimate of a non-token tariff such as OCR pages. A group holds either only requests that
   * stored one (a number) or only requests that did not (null), so a number is the group's whole
   * cost and its tokens are for display only.
   */
  storedCostUsd: number | null;
}

export interface AgentSessionUsageSlice extends ReportUsageSums {
  sessionId: string;
  apiKeyId: string | null;
  apiKeyName: string | null;
  projectName: string | null;
  projectRepo: string | null;
  client: string | null;
  /** The session's git branch. */
  gitBranch: string | null;
  connectionId: string | null;
  accountLabel: string | null;
  errorCode: string | null;
  billingTeamId: string | null;
  /** Name of the billing team; null without a team or when the team row is gone. */
  billingTeamName: string | null;
  day: string;
  firstSeenAt: string;
  lastSeenAt: string;
}

/** SQL value of each multi-value filter; also the facet dimension's value. */
const FILTER_COLUMNS: Record<ReportMultiValueFilter, string> = {
  apiKeyId: "s.api_key_id",
  projectName: "s.project_name",
  client: "s.client",
  provider: "uh.provider",
  model: "uh.model",
  connectionId: "uh.connection_id",
  gitBranch: "s.git_branch",
  // Same value the slices group and price by.
  serviceTier: "COALESCE(NULLIF(uh.service_tier, ''), 'standard')",
  errorCode: "uh.error_code",
  billingTeamId: "uh.billing_team_id",
};

const SEARCH_COLUMNS = [
  "s.id",
  "s.client_session_id",
  "s.project_name",
  "s.project_path",
  "s.git_branch",
];

function nullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function nullableNumber(value: unknown): number | null {
  return value === null || value === undefined ? null : Number(value);
}

/** `col = ?` for one value, `col IN (...)` for several; REPORT_FILTER_NONE adds "is empty". */
function valuesCondition(
  column: string,
  input: ReportFilterValues,
  params: string[]
): string | null {
  const values = [...new Set(typeof input === "string" ? [input] : input)].filter(Boolean);
  if (values.length === 0) return null;
  const named = values.filter((value) => value !== REPORT_FILTER_NONE);
  const parts = named.length < values.length ? [`${column} IS NULL`, `${column} = ''`] : [];
  if (named.length === 1) parts.push(`${column} = ?`);
  if (named.length > 1) parts.push(`${column} IN (${named.map(() => "?").join(", ")})`);
  params.push(...named);
  return parts.length === 1 ? parts[0] : `(${parts.join(" OR ")})`;
}

function likeContains(term: string): string {
  return `%${term.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;
}

/**
 * WHERE conditions and params for a filter over `usage_history uh JOIN agent_sessions s`.
 * `skip` leaves one multi-value filter out (a facet lists its own dimension unfiltered).
 */
export function buildReportConditions(
  filter: AgentSessionReportFilter,
  skip?: ReportMultiValueFilter
): { conditions: string[]; params: string[] } {
  const conditions = ["uh.agent_session_id IS NOT NULL"];
  const params: string[] = [];
  const add = (condition: string, value: string) => {
    conditions.push(condition);
    params.push(value);
  };
  if (filter.from) add("uh.timestamp >= ?", filter.from);
  if (filter.to) add("uh.timestamp <= ?", filter.to);
  if (filter.sessionId) add("uh.agent_session_id = ?", filter.sessionId);
  for (const field of REPORT_MULTI_VALUE_FILTERS) {
    const value = filter[field];
    if (field === skip || value === undefined) continue;
    const condition = valuesCondition(FILTER_COLUMNS[field], value, params);
    if (condition) conditions.push(condition);
  }
  // Same rule as the errors count: success = 0 is an error.
  if (filter.outcome === "error") conditions.push("uh.success = 0");
  if (filter.outcome === "success") conditions.push("COALESCE(uh.success, 1) <> 0");
  const term = filter.search?.trim().slice(0, REPORT_SEARCH_MAX_LENGTH);
  if (term) {
    // LIKE is case-insensitive for ASCII; the escaped pattern keeps % _ and \ literal.
    const like = SEARCH_COLUMNS.map((column) => `${column} LIKE ? ESCAPE '\\'`);
    conditions.push(`(${like.join(" OR ")})`);
    params.push(...SEARCH_COLUMNS.map(() => likeContains(term)));
  }
  return { conditions, params };
}

// Same value the filter matches and the slices price by.
const SERVICE_TIER_SQL = FILTER_COLUMNS.serviceTier;

/**
 * A request's stored cost, as usage analytics bills it: the exact provider-reported cost, else the
 * catalogue estimate of a non-token tariff (OCR pages, embedding batches). NULL means "price the
 * tokens from the catalog".
 */
export const STORED_COST_SQL = "COALESCE(uh.provider_cost_usd, uh.calculated_cost_usd)";

/** Columns read by usageSums(); the GROUP BY must split on STORED_COST_SQL IS NULL. */
const USAGE_SUMS_SQL = `uh.provider, uh.model, ${SERVICE_TIER_SQL} AS service_tier,
       COUNT(*) AS requests,
       SUM(CASE WHEN COALESCE(uh.tokens_input, 0) + COALESCE(uh.tokens_output, 0)
                     + COALESCE(uh.tokens_cache_read, 0)
                     + COALESCE(uh.tokens_cache_creation, 0) > 0
                THEN 1 ELSE 0 END) AS requests_with_tokens,
       SUM(CASE WHEN uh.success = 0 THEN 1 ELSE 0 END) AS errors,
       COALESCE(SUM(uh.tokens_input), 0) AS tokens_input,
       COALESCE(SUM(uh.tokens_output), 0) AS tokens_output,
       COALESCE(SUM(uh.tokens_cache_read), 0) AS tokens_cache_read,
       COALESCE(SUM(uh.tokens_cache_creation), 0) AS tokens_cache_creation,
       COALESCE(SUM(uh.tokens_reasoning), 0) AS tokens_reasoning,
       SUM(${STORED_COST_SQL}) AS stored_cost_usd`;

function usageSums(row: Record<string, unknown>): ReportUsageSums {
  return {
    provider: nullableString(row.provider),
    model: nullableString(row.model),
    serviceTier: String(row.service_tier),
    requests: Number(row.requests ?? 0),
    requestsWithTokens: Number(row.requests_with_tokens ?? 0),
    errors: Number(row.errors ?? 0),
    tokens: {
      input: Number(row.tokens_input ?? 0),
      output: Number(row.tokens_output ?? 0),
      cacheRead: Number(row.tokens_cache_read ?? 0),
      cacheCreation: Number(row.tokens_cache_creation ?? 0),
      reasoning: Number(row.tokens_reasoning ?? 0),
    },
    storedCostUsd: nullableNumber(row.stored_cost_usd),
  };
}

/** The filter's tzOffset as an SQLite date modifier, or null for UTC. */
function localTimeModifier(filter: AgentSessionReportFilter): string | null {
  const tzOffset = Math.trunc(Number(filter.tzOffset) || 0);
  return tzOffset ? `${tzOffset} minutes` : null;
}

// Well under SQLite's bound-parameter limit; one page of the list is a single query.
const METADATA_BATCH_SIZE = 500;

/** Team names by id, for the billing teams the slices name (a handful). */
function getTeamNamesByIds(db: SqliteAdapter, ids: readonly string[]): Map<string, string> {
  const names = new Map<string, string>();
  for (let start = 0; start < ids.length; start += METADATA_BATCH_SIZE) {
    const batch = ids.slice(start, start + METADATA_BATCH_SIZE);
    const rows = db
      .prepare(`SELECT id, name FROM teams WHERE id IN (${batch.map(() => "?").join(", ")})`)
      .all(...batch) as Record<string, unknown>[];
    for (const row of rows) names.set(String(row.id), String(row.name));
  }
  return names;
}

export function listAgentSessionUsageSlices(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter = {}
): AgentSessionUsageSlice[] {
  const { conditions, params } = buildReportConditions(filter);
  // Stored timestamps are UTC ISO strings; a local day needs the offset applied first. The
  // modifier is bound ahead of the WHERE params because it appears first in the statement.
  const modifier = localTimeModifier(filter);
  const dayExpression = modifier ? "date(uh.timestamp, ?)" : "substr(uh.timestamp, 1, 10)";
  if (modifier) params.unshift(modifier);

  // Session columns are functionally dependent on agent_session_id, so SQLite's bare-column
  // grouping returns the one session value.
  const rows = db
    .prepare(
      `SELECT uh.agent_session_id AS session_id, s.api_key_id, s.api_key_name,
              s.project_name, s.project_repo, s.client, s.git_branch, uh.connection_id,
              MAX(uh.account_label) AS account_label, uh.error_code, uh.billing_team_id,
              ${dayExpression} AS day,
              MIN(uh.timestamp) AS first_seen_at,
              MAX(uh.timestamp) AS last_seen_at,
              ${USAGE_SUMS_SQL}
       FROM usage_history uh
       JOIN agent_sessions s ON s.id = uh.agent_session_id
       WHERE ${conditions.join(" AND ")}
       GROUP BY uh.agent_session_id, uh.provider, uh.model, uh.connection_id, service_tier, day,
                uh.error_code, uh.billing_team_id, ${STORED_COST_SQL} IS NULL`
    )
    .all(...params) as Record<string, unknown>[];

  const teamIds = new Set<string>();
  for (const row of rows) {
    if (typeof row.billing_team_id === "string") teamIds.add(row.billing_team_id);
  }
  const teamNames = getTeamNamesByIds(db, [...teamIds]);

  return rows.map((row) => {
    const billingTeamId = nullableString(row.billing_team_id);
    return {
      ...usageSums(row),
      sessionId: String(row.session_id),
      apiKeyId: nullableString(row.api_key_id),
      apiKeyName: nullableString(row.api_key_name),
      projectName: nullableString(row.project_name),
      projectRepo: nullableString(row.project_repo),
      client: nullableString(row.client),
      gitBranch: nullableString(row.git_branch),
      connectionId: nullableString(row.connection_id),
      accountLabel: nullableString(row.account_label),
      errorCode: nullableString(row.error_code),
      billingTeamId,
      billingTeamName: billingTeamId ? (teamNames.get(billingTeamId) ?? null) : null,
      day: String(row.day),
      firstSeenAt: String(row.first_seen_at),
      lastSeenAt: String(row.last_seen_at),
    };
  });
}

/** Requests of one local weekday and hour, per provider, model and tier (for pricing). */
export interface AgentSessionHourlySlice extends ReportUsageSums {
  /** Local day of the week, 0 = Sunday ... 6 = Saturday. */
  weekday: number;
  /** Local hour, 0..23. */
  hour: number;
}

/**
 * The filter's requests grouped by local weekday and hour (tzOffset applies, as for days), and
 * by what prices them. One strftime per request; no session columns are read.
 */
export function listAgentSessionHourlySlices(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter = {}
): AgentSessionHourlySlice[] {
  const { conditions, params } = buildReportConditions(filter);
  const modifier = localTimeModifier(filter);
  const slotExpression = modifier
    ? "strftime('%w %H', uh.timestamp, ?)"
    : "strftime('%w %H', uh.timestamp)";
  if (modifier) params.unshift(modifier);

  const rows = db
    .prepare(
      `SELECT ${slotExpression} AS slot, ${USAGE_SUMS_SQL}
       FROM usage_history uh
       JOIN agent_sessions s ON s.id = uh.agent_session_id
       WHERE ${conditions.join(" AND ")}
       GROUP BY slot, uh.provider, uh.model, service_tier, ${STORED_COST_SQL} IS NULL`
    )
    .all(...params) as Record<string, unknown>[];

  // A timestamp SQLite cannot parse has no slot; it cannot be placed, so it is left out.
  return rows.flatMap((row) => {
    const [weekday, hour] = String(row.slot ?? "")
      .split(" ")
      .map(Number);
    if (!(weekday >= 0 && weekday <= 6 && hour >= 0 && hour <= 23)) return [];
    return [{ ...usageSums(row), weekday, hour }];
  });
}

/**
 * Highest usage_history id. It changes whenever a request is recorded, so computed reports
 * cached under it are dropped once new usage arrives.
 */
export function getUsageHistoryMaxId(db: SqliteAdapter): number {
  const row = db.prepare("SELECT MAX(id) AS id FROM usage_history").get() as
    { id: unknown } | undefined;
  return Number(row?.id ?? 0);
}

/** Session columns shown next to windowed totals; firstSeenAt/lastSeenAt are all-time. */
export type AgentSessionReportMetadata = Pick<
  AgentSessionRecord,
  | "id"
  | "apiKeyId"
  | "apiKeyName"
  | "client"
  | "clientSessionId"
  | "projectName"
  | "projectRepo"
  | "projectPath"
  | "projectSource"
  | "gitBranch"
  | "firstSeenAt"
  | "lastSeenAt"
>;

export function getAgentSessionMetadataByIds(
  db: SqliteAdapter,
  ids: readonly string[]
): Map<string, AgentSessionReportMetadata> {
  const byId = new Map<string, AgentSessionReportMetadata>();
  for (let start = 0; start < ids.length; start += METADATA_BATCH_SIZE) {
    const batch = ids.slice(start, start + METADATA_BATCH_SIZE);
    const rows = db
      .prepare(
        `SELECT id, api_key_id, api_key_name, client, client_session_id, project_name,
                project_repo, project_path, project_source, git_branch, first_seen_at,
                last_seen_at
         FROM agent_sessions
         WHERE id IN (${batch.map(() => "?").join(", ")})`
      )
      .all(...batch) as Record<string, unknown>[];
    for (const row of rows) {
      const id = String(row.id);
      byId.set(id, {
        id,
        apiKeyId: nullableString(row.api_key_id),
        apiKeyName: nullableString(row.api_key_name),
        client: nullableString(row.client),
        clientSessionId: nullableString(row.client_session_id),
        projectName: nullableString(row.project_name),
        projectRepo: nullableString(row.project_repo),
        projectPath: nullableString(row.project_path),
        projectSource: nullableString(row.project_source),
        gitBranch: nullableString(row.git_branch),
        firstSeenAt: String(row.first_seen_at),
        lastSeenAt: String(row.last_seen_at),
      });
    }
  }
  return byId;
}

export interface ReportFacetEntry {
  /** The filter value to send; "" when the field is empty (filter with REPORT_FILTER_NONE). */
  value: string;
  /** Display name when one is known (API key name, account label, team name). */
  label: string | null;
  requests: number;
}

export const REPORT_FACET_DIMENSIONS = [
  "members",
  "projects",
  "clients",
  "providers",
  "models",
  "accounts",
  "branches",
  "serviceTiers",
  "errorCodes",
  "teams",
] as const;
export type ReportFacetDimension = (typeof REPORT_FACET_DIMENSIONS)[number];
export type AgentSessionReportFacets = Record<ReportFacetDimension, ReportFacetEntry[]>;

const FACETS: Record<
  ReportFacetDimension,
  { filter: ReportMultiValueFilter; label?: string; join?: string }
> = {
  members: { filter: "apiKeyId", label: "MAX(NULLIF(s.api_key_name, ''))" },
  projects: { filter: "projectName" },
  clients: { filter: "client" },
  providers: { filter: "provider" },
  models: { filter: "model" },
  accounts: { filter: "connectionId", label: "MAX(NULLIF(uh.account_label, ''))" },
  branches: { filter: "gitBranch" },
  serviceTiers: { filter: "serviceTier" },
  errorCodes: { filter: "errorCode" },
  teams: {
    filter: "billingTeamId",
    label: "MAX(t.name)",
    join: "LEFT JOIN teams t ON t.id = uh.billing_team_id",
  },
};

/**
 * Values each report filter can offer, with request counts, for the window and the other active
 * filters. A dimension ignores its own filter, so picking one value keeps the others on offer.
 * One unpriced GROUP BY per dimension.
 */
export function listAgentSessionReportFacets(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter = {}
): AgentSessionReportFacets {
  const facets = REPORT_FACET_DIMENSIONS.map((dimension) => {
    const facet = FACETS[dimension];
    const { conditions, params } = buildReportConditions(filter, facet.filter);
    const rows = db
      .prepare(
        `SELECT COALESCE(${FILTER_COLUMNS[facet.filter]}, '') AS facet_value,
                ${facet.label ?? "NULL"} AS facet_label,
                COUNT(*) AS requests
         FROM usage_history uh
         JOIN agent_sessions s ON s.id = uh.agent_session_id
         ${facet.join ?? ""}
         WHERE ${conditions.join(" AND ")}
         GROUP BY facet_value
         ORDER BY requests DESC, COALESCE(facet_label, facet_value) COLLATE NOCASE, facet_value`
      )
      .all(...params) as Record<string, unknown>[];
    const entries: ReportFacetEntry[] = rows.map((row) => ({
      value: String(row.facet_value),
      label: nullableString(row.facet_label),
      requests: Number(row.requests ?? 0),
    }));
    return [dimension, entries] as const;
  });
  return Object.fromEntries(facets) as AgentSessionReportFacets;
}
