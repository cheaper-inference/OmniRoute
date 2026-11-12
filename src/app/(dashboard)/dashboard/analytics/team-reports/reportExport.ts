/**
 * What the export menus ask /api/reports/export for. The endpoint rejects `metric`, `rows` and
 * `cols` for any type but the matrix and `sessionId` for any type but a session's requests, so
 * each builder adds only the params its type takes.
 */

import { isBreakdownTab, type ReportTab, type SessionOrder } from "./reportFilters";
import type { MatrixMetric, ReportMatrixDimension } from "./reportViews";

export const EXPORT_FORMATS = ["csv", "json"] as const;
export type ExportFormat = (typeof EXPORT_FORMATS)[number];

/** The matrix view's current choice; the page owns it so the export can follow it. */
export interface MatrixSelection {
  rows: ReportMatrixDimension;
  cols: ReportMatrixDimension;
  metric: MatrixMetric;
}

export const DEFAULT_MATRIX_SELECTION: MatrixSelection = {
  rows: "members",
  cols: "projects",
  metric: "costUsd",
};

/** The export of the active tab, or null when it has none (the heatmap). */
export function tabExportParams(
  tab: ReportTab,
  format: ExportFormat,
  query: string,
  order: SessionOrder,
  matrix: MatrixSelection
): URLSearchParams | null {
  if (tab === "heatmap") return null;
  const params = new URLSearchParams(query);
  params.set("format", format);
  if (isBreakdownTab(tab)) {
    params.set("type", tab);
  } else if (tab === "sessions") {
    params.set("type", "sessions");
    params.set("sort", order.sort);
    params.set("order", order.desc ? "desc" : "asc");
  } else {
    params.set("type", "matrix");
    params.set("rows", matrix.rows);
    params.set("cols", matrix.cols);
    params.set("metric", matrix.metric);
  }
  return params;
}

/** A session's requests; the endpoint ignores the report filters for this type. */
export function sessionRequestsExportParams(
  sessionId: string,
  format: ExportFormat
): URLSearchParams {
  return new URLSearchParams({ type: "sessionRequests", sessionId, format });
}
