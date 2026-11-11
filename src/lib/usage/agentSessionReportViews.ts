/**
 * Team report views over the same read-time priced requests as the summary: a matrix crossing
 * two dimensions, per-day trends stacked by one dimension, and a local weekday x hour heatmap.
 *
 * The matrix and the trends are built from the filter's cached scan (agentSessionReportScan), so
 * together with the summary and the sessions list they read and price the window once. The
 * heatmap needs hours, which the scan's slices do not keep, so it reads its own hourly slices,
 * cached per filter the same way.
 */

import { getDbInstance } from "@/lib/db/core";
import type { SqliteAdapter } from "@/lib/db/adapters/types";
import {
  listAgentSessionHourlySlices,
  type AgentSessionReportFilter,
} from "@/lib/db/agentSessionReports";
import { ReportResultCache } from "./agentSessionReportCache";
import {
  getReportScan,
  priceUsage,
  SESSION_LEVEL_DIMENSIONS,
  SLICE_IDENTITY,
  type PricedSlice,
  type ReportScan,
} from "./agentSessionReportScan";

export const REPORT_MATRIX_DIMENSIONS = [
  "members",
  "projects",
  "clients",
  "providers",
  "models",
  "branches",
  "teams",
] as const;
export type ReportMatrixDimension = (typeof REPORT_MATRIX_DIMENSIONS)[number];

export const REPORT_TREND_DIMENSIONS = [
  ...REPORT_MATRIX_DIMENSIONS,
  "errorCodes",
  "serviceTiers",
] as const;
export type ReportTrendDimension = (typeof REPORT_TREND_DIMENSIONS)[number];

export const REPORT_TREND_METRICS = ["costUsd", "tokens", "requests"] as const;
export type ReportTrendMetric = (typeof REPORT_TREND_METRICS)[number];

export const REPORT_MATRIX_MAX_ROWS = 25;
export const REPORT_MATRIX_MAX_COLS = 15;
export const REPORT_TREND_MAX_SERIES = 8;
/** Longest window, in local days, that trends return per day; longer ones are summed per week. */
export const REPORT_TREND_MAX_DAYS = 366;
/** Longest window, in weeks, that trends return at all (ReportWindowTooLongError beyond). */
export const REPORT_TREND_MAX_WEEKS = 366;
/** Key of the bucket that sums the values past a cap; its entry also has `other: true`. */
export const REPORT_OTHER_KEY = "__other__";

/** The trends window spans more than REPORT_TREND_MAX_WEEKS weeks. */
export class ReportWindowTooLongError extends RangeError {}

export interface ReportMatrixMetrics {
  requests: number;
  /** input + output, the same as tokens.total in the summary. */
  tokens: number;
  costUsd: number;
  /**
   * Active time (as in the summary) of the sessions this entry covers. Only entries whose
   * dimensions all belong to the session (members, projects, clients, branches) cover whole
   * sessions; the others split a session's requests and have null. The totals always have it.
   */
  activeMs: number | null;
}

export interface ReportMatrixHeader extends ReportMatrixMetrics {
  /** The value to filter on ("" is an empty field: filter with __none__); REPORT_OTHER_KEY for other. */
  key: string;
  /** Display name when one is known (API key name, team name). */
  label: string | null;
  /** true for the bucket summing the values past the cap. */
  other: boolean;
}

export interface ReportMatrix {
  rowDimension: ReportMatrixDimension;
  colDimension: ReportMatrixDimension;
  /** The top REPORT_MATRIX_MAX_ROWS values by cost, then the other bucket when there are more. */
  rows: ReportMatrixHeader[];
  /** The top REPORT_MATRIX_MAX_COLS values by cost, then the other bucket when there are more. */
  cols: ReportMatrixHeader[];
  /** cells[i][j]: the requests of rows[i] and cols[j]; every cell is present (zeros when empty). */
  cells: ReportMatrixMetrics[][];
  totals: ReportMatrixMetrics & { activeMs: number };
  /** true when either axis had more values than its cap. */
  truncated: boolean;
  /** Distinct row and column values before the caps. */
  rowCount: number;
  colCount: number;
}

export interface ReportTrendSeries {
  /** As ReportMatrixHeader.key. */
  key: string;
  label: string | null;
  other: boolean;
  /** One value per entry of `days`. */
  values: number[];
}

export interface ReportTrends {
  dimension: ReportTrendDimension;
  metric: ReportTrendMetric;
  /** "week" when the window spans more than REPORT_TREND_MAX_DAYS local days. */
  bucket: "day" | "week";
  /** Local days (YYYY-MM-DD), oldest first; for weeks, the Monday each week starts on. */
  days: string[];
  /** The top REPORT_TREND_MAX_SERIES by the metric over the window, then other. */
  series: ReportTrendSeries[];
}

export interface ReportHeatmap {
  /** requests[weekday][hour]: local weekday 0 = Sunday ... 6 = Saturday, local hour 0..23. */
  requests: number[][];
  /** Cost, same layout as requests. */
  costUsd: number[][];
  /** Largest cell of each grid, for scaling; 0 when there are no requests. */
  maxRequests: number;
  maxCostUsd: number;
}

function round6(value: number): number {
  return Number(value.toFixed(6));
}

function compareStrings(a: string, b: string): number {
  if (a < b) return -1;
  return a > b ? 1 : 0;
}

class MetricsSum {
  requests = 0;
  tokens = 0;
  costUsd = 0;
  activeMs = 0;

  add(slice: PricedSlice): void {
    this.requests += slice.requests;
    this.tokens += slice.tokens.input + slice.tokens.output;
    this.costUsd += slice.costUsd;
  }

  merge(other: MetricsSum): void {
    this.requests += other.requests;
    this.tokens += other.tokens;
    this.costUsd += other.costUsd;
    this.activeMs += other.activeMs;
  }

  toMetrics(wholeSessions: boolean): ReportMatrixMetrics {
    return {
      requests: this.requests,
      tokens: this.tokens,
      costUsd: round6(this.costUsd),
      activeMs: wholeSessions ? this.activeMs : null,
    };
  }
}

interface AxisValue {
  key: string;
  label: string | null;
  sum: MetricsSum;
}

function axisValue(axis: Map<string, AxisValue>, key: string, label: string | null): AxisValue {
  let value = axis.get(key);
  if (!value) {
    // The first slice names the value, as in the breakdowns.
    value = { key, label, sum: new MetricsSum() };
    axis.set(key, value);
  }
  return value;
}

/** Most cost first; ties go to tokens, then requests, then the key. */
function compareAxisValues(a: AxisValue, b: AxisValue): number {
  return (
    b.sum.costUsd - a.sum.costUsd ||
    b.sum.tokens - a.sum.tokens ||
    b.sum.requests - a.sum.requests ||
    compareStrings(a.key, b.key)
  );
}

/** The top `cap` values by cost and an other bucket for the rest, with each key's index. */
function rankAxis(axis: Map<string, AxisValue>, cap: number, wholeSessions: boolean) {
  const sorted = [...axis.values()].sort(compareAxisValues);
  const kept = sorted.slice(0, cap);
  const headers: ReportMatrixHeader[] = kept.map(({ key, label, sum }) => ({
    key,
    label,
    other: false,
    ...sum.toMetrics(wholeSessions),
  }));
  const index = new Map(kept.map((value, i) => [value.key, i]));
  if (sorted.length > cap) {
    const other = new MetricsSum();
    for (const value of sorted.slice(cap)) other.merge(value.sum);
    headers.push({
      key: REPORT_OTHER_KEY,
      label: null,
      other: true,
      ...other.toMetrics(wholeSessions),
    });
  }
  // Keys past the cap fall into the other bucket, the last header.
  return { headers, indexOf: (key: string) => index.get(key) ?? kept.length };
}

function computeMatrix(
  scan: ReportScan,
  rowDimension: ReportMatrixDimension,
  colDimension: ReportMatrixDimension
): ReportMatrix {
  const rowOf = SLICE_IDENTITY[rowDimension];
  const colOf = SLICE_IDENTITY[colDimension];
  const rows = new Map<string, AxisValue>();
  const cols = new Map<string, AxisValue>();
  const cells = new Map<string, Map<string, MetricsSum>>();
  const total = new MetricsSum();
  // Where each session's first slice went; for a session-level dimension every slice of the
  // session goes to the same value, so its active time belongs there.
  const sessionPlaces = new Map<string, { row: AxisValue; col: AxisValue; cell: MetricsSum }>();

  for (const slice of scan.slices) {
    const rowId = rowOf(slice);
    const colId = colOf(slice);
    const row = axisValue(rows, rowId.key, rowId.label);
    const col = axisValue(cols, colId.key, colId.label);
    let line = cells.get(row.key);
    if (!line) cells.set(row.key, (line = new Map()));
    let cell = line.get(col.key);
    if (!cell) line.set(col.key, (cell = new MetricsSum()));
    row.sum.add(slice);
    col.sum.add(slice);
    cell.add(slice);
    total.add(slice);
    if (!sessionPlaces.has(slice.sessionId)) sessionPlaces.set(slice.sessionId, { row, col, cell });
  }

  const rowWhole = SESSION_LEVEL_DIMENSIONS.has(rowDimension);
  const colWhole = SESSION_LEVEL_DIMENSIONS.has(colDimension);
  for (const { sessionId, activeMs } of scan.sessionTimes()) {
    total.activeMs += activeMs;
    const place = sessionPlaces.get(sessionId);
    if (!place) continue;
    if (rowWhole) place.row.sum.activeMs += activeMs;
    if (colWhole) place.col.sum.activeMs += activeMs;
    if (rowWhole && colWhole) place.cell.activeMs += activeMs;
  }

  const rowAxis = rankAxis(rows, REPORT_MATRIX_MAX_ROWS, rowWhole);
  const colAxis = rankAxis(cols, REPORT_MATRIX_MAX_COLS, colWhole);
  const dense = rowAxis.headers.map(() => colAxis.headers.map(() => new MetricsSum()));
  for (const [rowKey, line] of cells) {
    const target = dense[rowAxis.indexOf(rowKey)];
    for (const [colKey, cell] of line) target[colAxis.indexOf(colKey)].merge(cell);
  }

  return {
    rowDimension,
    colDimension,
    rows: rowAxis.headers,
    cols: colAxis.headers,
    cells: dense.map((line) => line.map((cell) => cell.toMetrics(rowWhole && colWhole))),
    totals: { ...total.toMetrics(true), activeMs: total.activeMs },
    truncated: rows.size > REPORT_MATRIX_MAX_ROWS || cols.size > REPORT_MATRIX_MAX_COLS,
    rowCount: rows.size,
    colCount: cols.size,
  };
}

/** Requests matching the filter crossed by two dimensions (default members x projects). */
export async function buildReportMatrix(
  filter: AgentSessionReportFilter = {},
  axes: { rows?: ReportMatrixDimension; cols?: ReportMatrixDimension } = {},
  db: SqliteAdapter = getDbInstance()
): Promise<ReportMatrix> {
  const scan = await getReportScan(db, filter);
  return computeMatrix(scan, axes.rows ?? "members", axes.cols ?? "projects");
}

const DAY_MS = 86_400_000;

/** Days since the epoch of a YYYY-MM-DD date. */
function dayNumber(day: string): number {
  return Math.round(Date.parse(`${day}T00:00:00.000Z`) / DAY_MS);
}

function dayString(dayNum: number): string {
  return new Date(dayNum * DAY_MS).toISOString().slice(0, 10);
}

/** The local day of a UTC instant, as the slices compute it. */
function localDayNumber(iso: string, tzOffset: number): number {
  return Math.floor((Date.parse(iso) + tzOffset * 60_000) / DAY_MS);
}

/** The Monday on or before a day. */
function weekStart(dayNum: number): number {
  // Day 0 (1970-01-01) was a Thursday, so Monday-based weekdays are offset by 3.
  return dayNum - ((((dayNum + 3) % 7) + 7) % 7);
}

/** Bucket layout of the trends window, or null when the window holds no day. */
function trendBuckets(scan: ReportScan, now: number) {
  const { from, to } = scan.filter;
  const tzOffset = Math.trunc(Number(scan.filter.tzOffset) || 0);
  let first = from ? localDayNumber(from, tzOffset) : Number.POSITIVE_INFINITY;
  let last = Number.NEGATIVE_INFINITY;
  for (const slice of scan.slices) {
    const day = dayNumber(slice.day);
    if (day < first) first = day;
    if (day > last) last = day;
  }
  // Without `to` the window runs until now, so the latest days without usage still show.
  if (Number.isFinite(first)) {
    last = Math.max(last, localDayNumber(to ?? new Date(now).toISOString(), tzOffset));
  }
  if (!(first <= last)) return null;

  if (last - first + 1 <= REPORT_TREND_MAX_DAYS) {
    return { bucket: "day" as const, first, count: last - first + 1, step: 1 };
  }
  const firstWeek = weekStart(first);
  const count = (weekStart(last) - firstWeek) / 7 + 1;
  if (count > REPORT_TREND_MAX_WEEKS) {
    throw new ReportWindowTooLongError("trends window spans too many weeks");
  }
  return { bucket: "week" as const, first: firstWeek, count, step: 7 };
}

const METRIC_VALUE: Record<ReportTrendMetric, (slice: PricedSlice) => number> = {
  costUsd: (s) => s.costUsd,
  tokens: (s) => s.tokens.input + s.tokens.output,
  requests: (s) => s.requests,
};

function computeTrends(
  scan: ReportScan,
  dimension: ReportTrendDimension,
  metric: ReportTrendMetric,
  now: number
): ReportTrends {
  const layout = trendBuckets(scan, now);
  if (!layout) return { dimension, metric, bucket: "day", days: [], series: [] };
  const days = Array.from({ length: layout.count }, (_, i) =>
    dayString(layout.first + i * layout.step)
  );
  const bucketOf = new Map<string, number>();
  const indexOfDay = (day: string): number => {
    let index = bucketOf.get(day);
    if (index === undefined) {
      const dayNum = dayNumber(day);
      const start = layout.step === 7 ? weekStart(dayNum) : dayNum;
      index = (start - layout.first) / layout.step;
      bucketOf.set(day, index);
    }
    return index;
  };

  const identityOf = SLICE_IDENTITY[dimension];
  const valueOf = METRIC_VALUE[metric];
  const groups = new Map<
    string,
    { key: string; label: string | null; total: number; values: number[] }
  >();
  for (const slice of scan.slices) {
    const { key, label } = identityOf(slice);
    let group = groups.get(key);
    if (!group) {
      group = { key, label, total: 0, values: new Array<number>(days.length).fill(0) };
      groups.set(key, group);
    }
    const value = valueOf(slice);
    group.values[indexOfDay(slice.day)] += value;
    group.total += value;
  }

  const sorted = [...groups.values()].sort(
    (a, b) => b.total - a.total || compareStrings(a.key, b.key)
  );
  const series: ReportTrendSeries[] = sorted
    .slice(0, REPORT_TREND_MAX_SERIES)
    .map(({ key, label, values }) => ({ key, label, other: false, values }));
  if (sorted.length > REPORT_TREND_MAX_SERIES) {
    const values = new Array<number>(days.length).fill(0);
    for (const group of sorted.slice(REPORT_TREND_MAX_SERIES)) {
      group.values.forEach((value, i) => (values[i] += value));
    }
    series.push({ key: REPORT_OTHER_KEY, label: null, other: true, values });
  }
  if (metric === "costUsd") {
    for (const entry of series) entry.values = entry.values.map(round6);
  }
  return { dimension, metric, bucket: layout.bucket, days, series };
}

/**
 * The metric per local day (tzOffset as for the daily breakdown), stacked by a dimension
 * (default members, costUsd). The days run from `from` (else the first day with usage) to `to`
 * (else today), days without usage included as zeros. A window longer than REPORT_TREND_MAX_DAYS
 * is summed per week (Monday to Sunday); one longer than REPORT_TREND_MAX_WEEKS weeks throws
 * ReportWindowTooLongError.
 */
export async function buildReportTrends(
  filter: AgentSessionReportFilter = {},
  view: { dimension?: ReportTrendDimension; metric?: ReportTrendMetric } = {},
  db: SqliteAdapter = getDbInstance()
): Promise<ReportTrends> {
  const scan = await getReportScan(db, filter);
  return computeTrends(scan, view.dimension ?? "members", view.metric ?? "costUsd", Date.now());
}

const WEEKDAYS = 7;
const HOURS = 24;

function grid(): number[][] {
  return Array.from({ length: WEEKDAYS }, () => new Array<number>(HOURS).fill(0));
}

async function computeHeatmap(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter
): Promise<ReportHeatmap> {
  const slices = listAgentSessionHourlySlices(db, filter);
  const costs = await Promise.all(slices.map(async (slice) => (await priceUsage(slice)).costUsd));
  const requests = grid();
  const costUsd = grid();
  slices.forEach((slice, i) => {
    requests[slice.weekday][slice.hour] += slice.requests;
    costUsd[slice.weekday][slice.hour] += costs[i];
  });
  const rounded = costUsd.map((hours) => hours.map(round6));
  return {
    requests,
    costUsd: rounded,
    maxRequests: Math.max(0, ...requests.flat()),
    maxCostUsd: Math.max(0, ...rounded.flat()),
  };
}

const heatmapCache = new ReportResultCache<ReportHeatmap>();

/** Requests and cost of the filter by local weekday and hour (tzOffset applies). */
export async function buildReportHeatmap(
  filter: AgentSessionReportFilter = {},
  db: SqliteAdapter = getDbInstance()
): Promise<ReportHeatmap> {
  // A copy, so the caller cannot change the cached heatmap.
  return structuredClone(await heatmapCache.get(db, filter, () => computeHeatmap(db, filter)));
}
