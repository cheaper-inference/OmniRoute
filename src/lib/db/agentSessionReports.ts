/**
 * Team report source rows: attributed usage_history requests, sliced per session, provider,
 * model, account, service tier and day. Reading requests (not the session aggregates) keeps the
 * time window exact and lets provider/account filters see every request a session made.
 */

import type { AgentSessionRecord, AgentSessionTokens } from "./agentSessions";
import type { SqliteAdapter } from "./adapters/types";

/**
 * Filter value for apiKeyId, projectName and client that selects sessions where the field is
 * empty (no member, no project, no client). Breakdown rows for those sessions have key "".
 */
export const REPORT_FILTER_NONE = "__none__";

export interface AgentSessionReportFilter {
  /** ISO timestamps (UTC, `toISOString()` form) bounding each request. */
  from?: string;
  to?: string;
  /** REPORT_FILTER_NONE matches sessions without an API key. */
  apiKeyId?: string;
  /** REPORT_FILTER_NONE matches sessions without a project. */
  projectName?: string;
  /** REPORT_FILTER_NONE matches sessions without a client. */
  client?: string;
  provider?: string;
  model?: string;
  connectionId?: string;
  /** One session's requests (session detail totals); not a dashboard filter. */
  sessionId?: string;
  /**
   * Minutes to add to UTC to get local time (-840..840). Groups `day` by local day; absent or 0
   * groups by UTC day. Does not move the from/to bounds.
   */
  tzOffset?: number;
}

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

type TextFilterField = Exclude<keyof AgentSessionReportFilter, "tzOffset">;

const FILTER_CONDITIONS: ReadonlyArray<[TextFilterField, string]> = [
  ["from", "uh.timestamp >= ?"],
  ["to", "uh.timestamp <= ?"],
  ["apiKeyId", "s.api_key_id = ?"],
  ["projectName", "s.project_name = ?"],
  ["client", "s.client = ?"],
  ["provider", "uh.provider = ?"],
  ["model", "uh.model = ?"],
  ["connectionId", "uh.connection_id = ?"],
  ["sessionId", "uh.agent_session_id = ?"],
];

/** Conditions used instead when the filter value is REPORT_FILTER_NONE. */
const NONE_CONDITIONS: Partial<Record<TextFilterField, string>> = {
  apiKeyId: "(s.api_key_id IS NULL OR s.api_key_id = '')",
  projectName: "(s.project_name IS NULL OR s.project_name = '')",
  client: "(s.client IS NULL OR s.client = '')",
};

function nullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export function listAgentSessionUsageSlices(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter = {}
): AgentSessionUsageSlice[] {
  const conditions = ["uh.agent_session_id IS NOT NULL"];
  const params: string[] = [];
  for (const [field, condition] of FILTER_CONDITIONS) {
    const value = filter[field];
    if (!value) continue;
    const noneCondition = value === REPORT_FILTER_NONE ? NONE_CONDITIONS[field] : undefined;
    if (noneCondition) {
      conditions.push(noneCondition);
      continue;
    }
    conditions.push(condition);
    params.push(value);
  }
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
