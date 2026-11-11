/**
 * Dimensions, response shapes and helpers of the report views beyond the summary: the trends
 * chart, the matrix, the heatmap and the drill-down panels. Server modules are imported for their
 * types only (their runtime pulls in the database).
 */

import type { AgentSessionReport, AgentSessionReportRow } from "@/lib/usage/agentSessionReports";
import type {
  ReportHeatmap,
  ReportMatrix,
  ReportMatrixDimension,
  ReportMatrixMetrics,
  ReportTrendDimension,
  ReportTrendMetric,
  ReportTrends,
} from "@/lib/usage/agentSessionReportViews";

import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import { formatSpan } from "./components/format";
import { FILTER_NONE, type FilterField } from "./reportFilters";

export type {
  ReportHeatmap,
  ReportMatrix,
  ReportMatrixDimension,
  ReportMatrixMetrics,
  ReportTrendDimension,
  ReportTrendMetric,
  ReportTrends,
};

/** Mirrors REPORT_MATRIX_DIMENSIONS (server); the compiler checks the names. */
export const MATRIX_DIMENSIONS = [
  "members",
  "projects",
  "clients",
  "providers",
  "models",
  "branches",
  "teams",
] as const satisfies readonly ReportMatrixDimension[];

const TREND_DIMENSIONS: readonly ReportTrendDimension[] = [
  ...MATRIX_DIMENSIONS,
  "errorCodes",
  "serviceTiers",
];

export const TREND_METRICS = [
  "costUsd",
  "tokens",
  "requests",
] as const satisfies readonly ReportTrendMetric[];

/** What the trends chart stacks by for a tab: its own dimension when trends supports it, else members. */
export function trendDimensionFor(tab: string): ReportTrendDimension {
  return (TREND_DIMENSIONS as readonly string[]).includes(tab)
    ? (tab as ReportTrendDimension)
    : "members";
}

export interface DimensionInfo {
  /** `reports` message key of the dimension's name (a column header / selector label). */
  nameKey: string;
  /** `reports` message key of the label of the empty-key value. */
  fallbackKey: string;
  /** The filter a value of this dimension sets. */
  field: FilterField;
  /** The empty-key value can be filtered on, as FILTER_NONE. */
  filterNone?: boolean;
}

/** Every dimension that has a filter, by its report breakdown name. */
export const DIMENSION_INFO: Record<ReportTrendDimension | "accounts", DimensionInfo> = {
  members: {
    nameKey: "member",
    fallbackKey: "unknownMember",
    field: "apiKeyId",
    filterNone: true,
  },
  projects: {
    nameKey: "project",
    fallbackKey: "noProject",
    field: "projectName",
    filterNone: true,
  },
  clients: { nameKey: "client", fallbackKey: "unknown", field: "client", filterNone: true },
  providers: { nameKey: "provider", fallbackKey: "unknown", field: "provider" },
  models: { nameKey: "colModel", fallbackKey: "unknown", field: "model" },
  accounts: { nameKey: "account", fallbackKey: "unknown", field: "connectionId" },
  branches: { nameKey: "colBranch", fallbackKey: "noBranch", field: "gitBranch", filterNone: true },
  errorCodes: {
    nameKey: "errorCode",
    fallbackKey: "noErrorCode",
    field: "errorCode",
    filterNone: true,
  },
  serviceTiers: {
    nameKey: "serviceTier",
    fallbackKey: "noServiceTier",
    field: "serviceTier",
    filterNone: true,
  },
  teams: {
    nameKey: "billingTeam",
    fallbackKey: "noBillingTeam",
    field: "billingTeamId",
    filterNone: true,
  },
};

/** The filter value for a row or header key: an empty key filters on "none". */
export function filterValueFor(key: string): string {
  return key || FILTER_NONE;
}

/** Display name of a trend series or matrix header; `other` and empty keys have their own names. */
export function headerName(
  entry: { key: string; label: string | null; other: boolean },
  fallback: string,
  otherLabel: string
): string {
  if (entry.other) return otherLabel;
  return entry.label || entry.key || fallback;
}

export function isSummary(value: unknown): value is AgentSessionReport {
  const report = value as Partial<AgentSessionReport> | null;
  return typeof report?.totals === "object" && typeof report?.breakdowns === "object";
}

export function isSessionsPage(value: unknown): value is { sessions: AgentSessionReportRow[] } {
  return Array.isArray((value as { sessions?: unknown } | null)?.sessions);
}

export function isTrends(value: unknown): value is ReportTrends {
  const trends = value as Partial<ReportTrends> | null;
  return Array.isArray(trends?.days) && Array.isArray(trends?.series);
}

export function isMatrix(value: unknown): value is ReportMatrix {
  const matrix = value as Partial<ReportMatrix> | null;
  return (
    Array.isArray(matrix?.rows) &&
    Array.isArray(matrix?.cols) &&
    Array.isArray(matrix?.cells) &&
    typeof matrix?.totals === "object"
  );
}

export function isHeatmap(value: unknown): value is ReportHeatmap {
  const heatmap = value as Partial<ReportHeatmap> | null;
  return Array.isArray(heatmap?.requests) && Array.isArray(heatmap?.costUsd);
}

/** Weekday indexes of the heatmap in display order: Monday first (data index 0 = Sunday). */
export const MONDAY_FIRST = [1, 2, 3, 4, 5, 6, 0] as const;

/** Reorders a [weekday][hour] grid whose weekday 0 is Sunday so that Monday comes first. */
export function mondayFirst<T>(grid: readonly T[]): T[] {
  return MONDAY_FIRST.map((weekday) => grid[weekday]);
}

/** The weekday's short name in the viewer's language (data index 0 = Sunday). */
export function weekdayName(weekday: number, locale?: string): string {
  // 2024-01-07 was a Sunday.
  return new Date(2024, 0, 7 + weekday).toLocaleDateString(locale, { weekday: "short" });
}

/** Share of the maximum as a heat colour: the theme's accent, mixed into transparency. */
export function heatColor(value: number, max: number): string | undefined {
  if (!(value > 0) || !(max > 0)) return undefined;
  const percent = Math.round(10 + Math.min(1, value / max) * 55);
  return `color-mix(in srgb, var(--color-primary) ${percent}%, transparent)`;
}

/** The matrix's metrics: the trend ones plus active time, which only session-level pairs have. */
export type MatrixMetric = ReportTrendMetric | "activeMs";

/** A metric value as text: dollars, compact tokens, a plain count, or a duration. */
export function formatMetric(metric: MatrixMetric, value: number | null | undefined): string {
  if (metric === "activeMs") return formatSpan(value);
  const amount = value ?? 0;
  if (metric === "costUsd") return formatCost(amount);
  return metric === "tokens" ? fmtCompact(amount) : amount.toLocaleString();
}
