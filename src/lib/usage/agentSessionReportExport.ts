/**
 * Team report downloads (GET /api/reports/export): one summary breakdown, the sessions list, the
 * matrix, or one session's requests, as CSV or as JSON holding the same row objects the report
 * API returns.
 *
 * Breakdowns, sessions and the matrix are built from the filter's cached scan
 * (agentSessionReportScan), so exporting what the dashboard shows does not read or price the
 * window again; a breakdown export also skips the summary's time and latency queries. A session's
 * requests are all of them, as on the session detail, so the report filters do not apply there.
 */

import { getDbInstance } from "@/lib/db/core";
import type { SqliteAdapter } from "@/lib/db/adapters/types";
import { getAgentSessionById } from "@/lib/db/agentSessions";
import {
  buildReportBreakdown,
  listAgentSessionRequestsForExport,
  listAgentSessionsForExport,
  REPORT_BREAKDOWN_DIMENSIONS,
  SESSION_EXPORT_MAX_ROWS,
  type AgentSessionReportFilter,
  type AgentSessionReportRow,
  type PricedSessionRequest,
  type ReportBreakdownRow,
  type SessionReportOrder,
} from "./agentSessionReports";
import {
  buildReportMatrix,
  type ReportMatrix,
  type ReportMatrixDimension,
  type ReportMatrixHeader,
} from "./agentSessionReportViews";

export const REPORT_EXPORT_TYPES = [
  ...REPORT_BREAKDOWN_DIMENSIONS,
  "sessions",
  "matrix",
  "sessionRequests",
] as const;
export type ReportExportType = (typeof REPORT_EXPORT_TYPES)[number];

export const REPORT_EXPORT_FORMATS = ["csv", "json"] as const;
export type ReportExportFormat = (typeof REPORT_EXPORT_FORMATS)[number];

/** The value in each matrix CSV cell; the JSON export holds all of them. */
export const REPORT_MATRIX_EXPORT_METRICS = ["costUsd", "tokens", "requests", "activeMs"] as const;
export type ReportMatrixExportMetric = (typeof REPORT_MATRIX_EXPORT_METRICS)[number];

export interface ReportExportQuery {
  type: ReportExportType;
  format: ReportExportFormat;
  /** Report filters; type=sessionRequests exports the whole session and ignores them. */
  filter: AgentSessionReportFilter;
  /** type=sessions only. */
  order?: SessionReportOrder;
  /** type=matrix only: the crossed dimensions (default members x projects) and the CSV metric. */
  rows?: ReportMatrixDimension;
  cols?: ReportMatrixDimension;
  metric?: ReportMatrixExportMetric;
  /** type=sessionRequests only, and required there. */
  sessionId?: string;
}

export interface ReportExportOptions {
  /** When the file is generated: generatedAt and the file name's UTC date. */
  now?: Date;
  /** Row cap of the sessions and sessionRequests exports; default SESSION_EXPORT_MAX_ROWS. */
  maxRows?: number;
  db?: SqliteAdapter;
}

export interface ReportExportFile {
  body: string;
  /** Content-Type, Content-Disposition, X-Report-Total and X-Report-Truncated. */
  headers: Record<string, string>;
}

/** type=sessionRequests named a session that does not exist. */
export class ReportExportSessionNotFoundError extends Error {}

const CONTENT_TYPES: Record<ReportExportFormat, string> = {
  csv: "text/csv; charset=utf-8",
  json: "application/json; charset=utf-8",
};

/** omniroute-report-<type>-<YYYY-MM-DD, UTC>.<format>, with letters, digits, - and _ only. */
export function reportExportFileName(
  type: string,
  format: ReportExportFormat,
  now: Date = new Date()
): string {
  const safeType = type.replace(/[^A-Za-z0-9_-]/g, "");
  const safeFormat = format.replace(/[^a-z]/g, "");
  return `omniroute-report-${safeType}-${now.toISOString().slice(0, 10)}.${safeFormat}`;
}

interface ExportContent {
  /** Rows matching before the cap (for the matrix: distinct row values before its cap). */
  total: number;
  truncated: boolean;
  /** What selected the rows, echoed in the JSON export. */
  filters: object;
  /** The JSON export's fields after the envelope: the rows, or the whole matrix response. */
  json: { rows: unknown[] } | ReportMatrix;
  csv: () => string;
}

async function exportContent(
  query: ReportExportQuery,
  maxRows: number,
  db: SqliteAdapter
): Promise<ExportContent> {
  const { type, filter } = query;
  if (type === "sessions") {
    const { sessions, total, truncated } = await listAgentSessionsForExport(
      filter,
      query.order,
      maxRows,
      db
    );
    const csv = () => sessionsToCsv(sessions);
    return { total, truncated, filters: filter, json: { rows: sessions }, csv };
  }
  if (type === "matrix") {
    const matrix = await buildReportMatrix(filter, { rows: query.rows, cols: query.cols }, db);
    const csv = () => matrixToCsv(matrix, query.metric);
    return {
      total: matrix.rowCount,
      truncated: matrix.truncated,
      filters: filter,
      json: matrix,
      csv,
    };
  }
  if (type === "sessionRequests") {
    const sessionId = query.sessionId ?? "";
    if (!sessionId || !getAgentSessionById(db, sessionId)) {
      throw new ReportExportSessionNotFoundError("session not found");
    }
    const { requests, total, truncated } = await listAgentSessionRequestsForExport(
      sessionId,
      maxRows,
      db
    );
    const csv = () => sessionRequestsToCsv(requests);
    return { total, truncated, filters: { sessionId }, json: { rows: requests }, csv };
  }
  const rows = await buildReportBreakdown(filter, type, db);
  const csv = () => breakdownToCsv(rows);
  return { total: rows.length, truncated: false, filters: filter, json: { rows }, csv };
}

/**
 * The export file. JSON is { type, generatedAt, filters, total, truncated, rows }; for the matrix
 * the matrix response's fields follow total instead of rows (its rows are the row headers).
 */
export async function buildReportExport(
  query: ReportExportQuery,
  options: ReportExportOptions = {}
): Promise<ReportExportFile> {
  const now = options.now ?? new Date();
  const content = await exportContent(
    query,
    options.maxRows ?? SESSION_EXPORT_MAX_ROWS,
    options.db ?? getDbInstance()
  );
  const { type, format } = query;
  const { total, truncated, filters } = content;
  const body =
    format === "json"
      ? JSON.stringify({
          type,
          generatedAt: now.toISOString(),
          filters,
          total,
          truncated,
          ...content.json,
        })
      : content.csv();
  return {
    body,
    headers: {
      "Content-Type": CONTENT_TYPES[format],
      "Content-Disposition": `attachment; filename="${reportExportFileName(type, format, now)}"`,
      "X-Report-Total": String(total),
      "X-Report-Truncated": String(truncated),
    },
  };
}

// Leading =, +, -, @, tab or CR make spreadsheets evaluate a cell as a formula; project and
// key names come from client headers, so they are untrusted.
const FORMULA_PREFIX = /^[=+\-@\t\r]/;

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let text = String(value);
  if (typeof value === "string" && FORMULA_PREFIX.test(text)) text = `'${text}`;
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(header: unknown[], rows: unknown[][]): string {
  return [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

export function breakdownToCsv(rows: ReportBreakdownRow[]): string {
  return toCsv(
    [
      "key",
      "label",
      "detail",
      "sessions",
      "members",
      "projects",
      "requests",
      "errors",
      "tokens_input",
      "tokens_output",
      "tokens_cache_read",
      "tokens_cache_creation",
      "tokens_reasoning",
      "tokens_total",
      "cost_usd",
      "unpriced_requests",
      "last_seen_at",
    ],
    rows.map((r) => [
      r.key,
      r.label,
      r.detail,
      r.sessions,
      r.members,
      r.projects,
      r.requests,
      r.errors,
      r.tokens.input,
      r.tokens.output,
      r.tokens.cacheRead,
      r.tokens.cacheCreation,
      r.tokens.reasoning,
      r.tokens.total,
      r.costUsd,
      r.unpricedRequests,
      r.lastSeenAt,
    ])
  );
}

/** The sessions list columns; the time, main model and reasoning columns come last. */
export function sessionsToCsv(sessions: AgentSessionReportRow[]): string {
  return toCsv(
    [
      "session_id",
      "api_key_id",
      "api_key_name",
      "client",
      "project_name",
      "project_repo",
      "project_path",
      "git_branch",
      "requests",
      "errors",
      "tokens_total",
      "cost_usd",
      "unpriced_requests",
      "window_first_seen_at",
      "window_last_seen_at",
      "first_seen_at",
      "last_seen_at",
      "active_time_ms",
      "model_time_ms",
      "main_model",
      "tokens_reasoning",
    ],
    sessions.map((s) => [
      s.id,
      s.apiKeyId,
      s.apiKeyName,
      s.client,
      s.projectName,
      s.projectRepo,
      s.projectPath,
      s.gitBranch,
      s.requests,
      s.errors,
      s.tokens.total,
      s.costUsd,
      s.unpricedRequests,
      s.windowFirstSeenAt,
      s.windowLastSeenAt,
      s.firstSeenAt,
      s.lastSeenAt,
      s.activeMs,
      s.modelMs,
      s.mainModel,
      s.tokens.reasoning,
    ])
  );
}

/**
 * A matrix header's CSV name: the label, else the key, "(none)" for the empty value, and
 * "Other (N more)" for the bucket summing the N values past the cap.
 */
function matrixHeaderName(
  header: ReportMatrixHeader,
  headers: readonly ReportMatrixHeader[],
  distinct: number
): string {
  if (header.other) return `Other (${distinct - (headers.length - 1)} more)`;
  return header.label || header.key || "(none)";
}

/**
 * One line per row header and one column per column header, holding `metric`; each line ends
 * with the row's total and a last "Total" line holds the column totals. The second column is the
 * row's key (`__other__` for the other bucket). activeMs is empty where an entry splits sessions.
 */
export function matrixToCsv(
  matrix: ReportMatrix,
  metric: ReportMatrixExportMetric = "costUsd"
): string {
  const { rows, cols } = matrix;
  return toCsv(
    [
      `${matrix.rowDimension} \\ ${matrix.colDimension} (${metric})`,
      "key",
      ...cols.map((col) => matrixHeaderName(col, cols, matrix.colCount)),
      "total",
    ],
    [
      ...rows.map((row, i) => [
        matrixHeaderName(row, rows, matrix.rowCount),
        row.key,
        ...matrix.cells[i].map((cell) => cell[metric]),
        row[metric],
      ]),
      ["Total", "", ...cols.map((col) => col[metric]), matrix.totals[metric]],
    ]
  );
}

/** A session's requests with the session detail's per-request fields, newest first. */
export function sessionRequestsToCsv(requests: PricedSessionRequest[]): string {
  return toCsv(
    [
      "request_id",
      "timestamp",
      "provider",
      "model",
      "connection_id",
      "service_tier",
      "status",
      "success",
      "error_code",
      "latency_ms",
      "ttft_ms",
      "tokens_input",
      "tokens_output",
      "tokens_cache_read",
      "tokens_cache_creation",
      "tokens_reasoning",
      "tokens_uncached_input",
      "cost_usd",
      "priced",
    ],
    requests.map((r) => [
      r.id,
      r.timestamp,
      r.provider,
      r.model,
      r.connectionId,
      r.serviceTier,
      r.status,
      r.success,
      r.errorCode,
      r.latencyMs,
      r.ttftMs,
      r.tokens.input,
      r.tokens.output,
      r.tokens.cacheRead,
      r.tokens.cacheCreation,
      r.tokens.reasoning,
      r.tokens.uncachedInput,
      r.costUsd,
      r.priced,
    ])
  );
}
