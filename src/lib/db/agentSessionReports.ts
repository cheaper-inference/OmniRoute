/**
 * Team report source rows: attributed usage_history requests, sliced per session, provider,
 * model, account, service tier and day, plus the filter facets. Reading requests (not the session
 * aggregates) keeps the time window exact and lets per-request filters see every request a
 * session made.
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

export interface AgentSessionUsageSlice {
  sessionId: string;
  apiKeyId: string | null;
  apiKeyName: string | null;
  projectName: string | null;
  projectRepo: string | null;
  client: string | null;
  provider: string | null;
  model: string | null;
  connectionId: string | null;
  accountLabel: string | null;
  serviceTier: string;
  day: string;
  firstSeenAt: string;
  lastSeenAt: string;
  requests: number;
  /** Requests that consumed tokens; only these can be unpriced (same rule as agent_sessions). */
  requestsWithTokens: number;
  errors: number;
  tokens: AgentSessionTokens;
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

export function listAgentSessionUsageSlices(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter = {}
): AgentSessionUsageSlice[] {
  const { conditions, params } = buildReportConditions(filter);
  // Stored timestamps are UTC ISO strings; a local day needs the offset applied first. The
  // modifier is bound ahead of the WHERE params because it appears first in the statement.
  const tzOffset = Math.trunc(Number(filter.tzOffset) || 0);
  const dayExpression = tzOffset ? "date(uh.timestamp, ?)" : "substr(uh.timestamp, 1, 10)";
  if (tzOffset) params.unshift(`${tzOffset} minutes`);

  // Session columns are functionally dependent on agent_session_id, so SQLite's bare-column
  // grouping returns the one session value.
  const rows = db
    .prepare(
      `SELECT uh.agent_session_id AS session_id, s.api_key_id, s.api_key_name,
              s.project_name, s.project_repo, s.client, uh.provider, uh.model, uh.connection_id,
              MAX(uh.account_label) AS account_label,
              COALESCE(NULLIF(uh.service_tier, ''), 'standard') AS service_tier,
              ${dayExpression} AS day,
              MIN(uh.timestamp) AS first_seen_at,
              MAX(uh.timestamp) AS last_seen_at,
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
              COALESCE(SUM(uh.tokens_reasoning), 0) AS tokens_reasoning
       FROM usage_history uh
       JOIN agent_sessions s ON s.id = uh.agent_session_id
       WHERE ${conditions.join(" AND ")}
       GROUP BY uh.agent_session_id, uh.provider, uh.model, uh.connection_id, service_tier, day`
    )
    .all(...params) as Record<string, unknown>[];

  return rows.map((row) => ({
    sessionId: String(row.session_id),
    apiKeyId: nullableString(row.api_key_id),
    apiKeyName: nullableString(row.api_key_name),
    projectName: nullableString(row.project_name),
    projectRepo: nullableString(row.project_repo),
    client: nullableString(row.client),
    provider: nullableString(row.provider),
    model: nullableString(row.model),
    connectionId: nullableString(row.connection_id),
    accountLabel: nullableString(row.account_label),
    serviceTier: String(row.service_tier),
    day: String(row.day),
    firstSeenAt: String(row.first_seen_at),
    lastSeenAt: String(row.last_seen_at),
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
  }));
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

// Well under SQLite's bound-parameter limit; one page of the list is a single query.
const METADATA_BATCH_SIZE = 500;

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
