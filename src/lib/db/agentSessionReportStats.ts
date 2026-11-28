/**
 * Team report time and latency figures, and the session detail's request pages and timeline.
 * Time and latency read the same requests as the usage slices (buildReportConditions), so they
 * cover exactly the requests the report totals count.
 */

import type { SqliteAdapter } from "./adapters/types";
import type { AgentSessionTokens } from "./agentSessions";
import {
  buildReportConditions,
  STORED_COST_SQL,
  type AgentSessionReportFilter,
} from "./agentSessionReports";

/** Longest gap between two consecutive requests of a session that counts as active time. */
export const REPORT_ACTIVE_GAP_CAP_MS = 15 * 60 * 1000;

/** Most points one session timeline returns; a longer session keeps its newest requests. */
export const REPORT_TIMELINE_MAX_POINTS = 2000;

/** Session detail request pages: default and largest page size. */
export const SESSION_REQUESTS_DEFAULT_LIMIT = 50;
export const SESSION_REQUESTS_MAX_LIMIT = 200;

const REPORT_REQUESTS = `usage_history uh JOIN agent_sessions s ON s.id = uh.agent_session_id`;

function nullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function nullableNumber(value: unknown): number | null {
  return value === null || value === undefined ? null : Number(value);
}

/** One session's time over the requests matching a filter. */
export interface AgentSessionTimes {
  sessionId: string;
  /**
   * Time from the first request's start to the last request's end, with idle time between
   * requests counted up to REPORT_ACTIVE_GAP_CAP_MS. Timestamps mark request ends, so this is
   * the first request's latency plus, for each later request, the time since the previous end,
   * capped at its own latency plus the idle cap.
   */
  activeMs: number;
  /** Sum of latency_ms. */
  modelMs: number;
  /** Requests with latency_ms > 0: the samples of the latency average and percentile. */
  latencySamples: number;
  /** Requests with ttft_ms > 0, and the sum of their ttft_ms. */
  ttftSamples: number;
  ttftMsSum: number;
  firstSeenAt: string;
  lastSeenAt: string;
}

/**
 * Active and model time per session, over the requests matching the filter. usage_history
 * timestamps are written when a request ends. Consecutive requests come from LAG over each
 * session ordered by timestamp, then id; a gap is the julianday() difference in days times
 * 86400000, rounded to whole milliseconds. The first request counts its latency; each later one
 * counts the gap since the previous end, capped at its latency plus the idle cap, so parallel
 * requests are not counted twice. Negative latencies count as 0.
 */
export function listAgentSessionTimes(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter = {}
): AgentSessionTimes[] {
  const { conditions, params } = buildReportConditions(filter);
  // The cap is bound after the WHERE params because it appears after them in the statement.
  const rows = db
    .prepare(
      `WITH req AS (
         SELECT uh.agent_session_id AS session_id,
                uh.timestamp AS ts,
                MAX(COALESCE(uh.latency_ms, 0), 0) AS latency_ms,
                CASE WHEN uh.ttft_ms > 0 THEN uh.ttft_ms END AS ttft_ms,
                julianday(uh.timestamp) - julianday(LAG(uh.timestamp) OVER w) AS gap_days,
                LAG(uh.id) OVER w IS NULL AS is_first
         FROM ${REPORT_REQUESTS}
         WHERE ${conditions.join(" AND ")}
         WINDOW w AS (PARTITION BY uh.agent_session_id ORDER BY uh.timestamp, uh.id)
       )
       SELECT session_id,
              SUM(CASE WHEN is_first THEN latency_ms
                       ELSE MIN(MAX(ROUND(gap_days * 86400000), 0), latency_ms + ?) END)
                AS active_ms,
              SUM(latency_ms) AS model_ms,
              SUM(latency_ms > 0) AS latency_samples,
              COUNT(ttft_ms) AS ttft_samples,
              COALESCE(SUM(ttft_ms), 0) AS ttft_ms_sum,
              MIN(ts) AS first_seen_at,
              MAX(ts) AS last_seen_at
       FROM req
       GROUP BY session_id`
    )
    .all(...params, REPORT_ACTIVE_GAP_CAP_MS) as Record<string, unknown>[];

  return rows.map((row) => ({
    sessionId: String(row.session_id),
    activeMs: Math.round(Number(row.active_ms ?? 0)),
    modelMs: Number(row.model_ms ?? 0),
    latencySamples: Number(row.latency_samples ?? 0),
    ttftSamples: Number(row.ttft_samples ?? 0),
    ttftMsSum: Number(row.ttft_ms_sum ?? 0),
    firstSeenAt: String(row.first_seen_at),
    lastSeenAt: String(row.last_seen_at),
  }));
}

/**
 * Nearest-rank percentile of latency_ms over the requests matching the filter that have a
 * latency (> 0): the value at rank ceil(n * percent / 100) of the ascending values; null when
 * there are none. Computed in SQL in one statement: the values sorted descending, skipping
 * n - rank of them, with integer arithmetic so the rank is exact.
 */
export function getAgentSessionLatencyPercentile(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter,
  percent: number
): number | null {
  const rank = Math.trunc(percent);
  if (!(rank >= 1 && rank <= 100)) throw new RangeError("percent must be between 1 and 100");
  const { conditions, params } = buildReportConditions(filter);
  conditions.push("uh.latency_ms > 0");
  const row = db
    .prepare(
      `WITH lat AS (
         SELECT uh.latency_ms AS value FROM ${REPORT_REQUESTS} WHERE ${conditions.join(" AND ")}
       )
       SELECT value FROM lat
       ORDER BY value DESC
       LIMIT 1 OFFSET (SELECT COUNT(*) - (COUNT(*) * CAST(? AS INTEGER) + 99) / 100 FROM lat)`
    )
    .get(...params, rank) as { value: unknown } | undefined;
  return row ? Number(row.value) : null;
}

/** One request of a session, as the session detail lists it. */
export interface AgentSessionReportRequest {
  id: number;
  timestamp: string;
  provider: string | null;
  model: string | null;
  connectionId: string | null;
  /** The tier the request is priced with; "standard" when none was stored. */
  serviceTier: string;
  status: string | null;
  success: boolean;
  errorCode: string | null;
  latencyMs: number;
  /**
   * Time to first token. Requests that did not report one store their full latency; 0 means
   * nothing was recorded.
   */
  ttftMs: number;
  /** Same meaning as the session tokens, so request rows add up to their session. */
  tokens: AgentSessionTokens & { uncachedInput: number };
  /** Stored cost (provider-reported, else a non-token catalogue estimate); null when none. */
  storedCostUsd: number | null;
}

export interface SessionRequestsPage {
  /** 1..SESSION_REQUESTS_MAX_LIMIT, default SESSION_REQUESTS_DEFAULT_LIMIT. */
  limit?: number;
  offset?: number;
}

/**
 * One page of a session's requests, newest first, and how many it has. The page size is capped
 * at maxLimit (the export reads up to its row cap in one page).
 */
export function listAgentSessionRequestsPage(
  db: SqliteAdapter,
  sessionId: string,
  page: SessionRequestsPage = {},
  maxLimit: number = SESSION_REQUESTS_MAX_LIMIT
): { requests: AgentSessionReportRequest[]; total: number } {
  const limit = Math.max(
    1,
    Math.min(Math.trunc(page.limit ?? SESSION_REQUESTS_DEFAULT_LIMIT), Math.trunc(maxLimit))
  );
  const offset = Math.max(0, Math.trunc(page.offset ?? 0));
  const countRow = db
    .prepare("SELECT COUNT(*) AS total FROM usage_history WHERE agent_session_id = ?")
    .get(sessionId) as { total: unknown } | undefined;
  const rows = db
    .prepare(
      `SELECT id, timestamp, provider, model, connection_id,
              COALESCE(NULLIF(service_tier, ''), 'standard') AS service_tier,
              status, success, error_code, latency_ms, ttft_ms, tokens_input, tokens_output,
              tokens_cache_read, tokens_cache_creation, tokens_reasoning,
              ${STORED_COST_SQL} AS stored_cost_usd
       FROM usage_history uh
       WHERE agent_session_id = ?
       ORDER BY timestamp DESC, id DESC
       LIMIT ? OFFSET ?`
    )
    .all(sessionId, limit, offset) as Record<string, unknown>[];

  const requests = rows.map((row) => {
    const input = Number(row.tokens_input ?? 0);
    const cacheRead = Number(row.tokens_cache_read ?? 0);
    const cacheCreation = Number(row.tokens_cache_creation ?? 0);
    return {
      id: Number(row.id),
      timestamp: String(row.timestamp),
      provider: nullableString(row.provider),
      model: nullableString(row.model),
      connectionId: nullableString(row.connection_id),
      serviceTier: String(row.service_tier),
      status: nullableString(row.status),
      // Same rule as the errors count: only success = 0 is an error.
      success: Number(row.success ?? 1) !== 0,
      errorCode: nullableString(row.error_code),
      latencyMs: Number(row.latency_ms ?? 0),
      ttftMs: Number(row.ttft_ms ?? 0),
      tokens: {
        input,
        output: Number(row.tokens_output ?? 0),
        cacheRead,
        cacheCreation,
        reasoning: Number(row.tokens_reasoning ?? 0),
        uncachedInput: Math.max(0, input - cacheRead - cacheCreation),
      },
      storedCostUsd: nullableNumber(row.stored_cost_usd),
    };
  });
  return { requests, total: Number(countRow?.total ?? 0) };
}

/** One request on a session's timeline chart. */
export interface AgentSessionTimelinePoint {
  timestamp: string;
  model: string | null;
  latencyMs: number;
  /** false when the request failed (success = 0). */
  ok: boolean;
}

export interface AgentSessionTimeline {
  /** Oldest first. */
  points: AgentSessionTimelinePoint[];
  /** true when the session has more requests than maxPoints; the oldest were left out. */
  capped: boolean;
}

/** A session's requests as chart points: the newest maxPoints, returned oldest first. */
export function listAgentSessionTimeline(
  db: SqliteAdapter,
  sessionId: string,
  maxPoints: number = REPORT_TIMELINE_MAX_POINTS
): AgentSessionTimeline {
  const cap = Math.max(1, Math.trunc(maxPoints));
  // One row past the cap tells whether the timeline was cut.
  const rows = db
    .prepare(
      `SELECT timestamp, model, latency_ms, success
       FROM usage_history
       WHERE agent_session_id = ?
       ORDER BY timestamp DESC, id DESC
       LIMIT ?`
    )
    .all(sessionId, cap + 1) as Record<string, unknown>[];

  const points = rows.slice(0, cap).map((row) => ({
    timestamp: String(row.timestamp),
    model: nullableString(row.model),
    latencyMs: Number(row.latency_ms ?? 0),
    ok: Number(row.success ?? 1) !== 0,
  }));
  return { points: points.reverse(), capped: rows.length > cap };
}
