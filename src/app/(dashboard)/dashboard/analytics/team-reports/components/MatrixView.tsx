"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { SegmentedControl, Select } from "@/shared/components";

import type { MatrixSelection } from "../reportExport";
import {
  DIMENSION_INFO,
  MATRIX_DIMENSIONS,
  isMatrix,
  type MatrixMetric,
  type ReportMatrix,
  type ReportMatrixDimension,
} from "../reportViews";
import { useReportResource } from "../useReportResource";
import MatrixTable, { type MatrixHandlers } from "./MatrixTable";

interface MatrixViewProps extends MatrixHandlers {
  /** Report filters as a query string; the dimensions are added here. */
  query: string;
  refreshToken: number;
  /** Owned by the page so the matrix export follows the view. */
  selection: MatrixSelection;
  onSelectionChange: (selection: MatrixSelection) => void;
}

type Axis = "rows" | "cols";

/** The two dimensions always differ: picking the other axis's dimension swaps them. */
function pickDimension(
  selection: MatrixSelection,
  axis: Axis,
  value: ReportMatrixDimension
): MatrixSelection {
  if (axis === "rows") {
    return {
      ...selection,
      rows: value,
      cols: selection.cols === value ? selection.rows : selection.cols,
    };
  }
  return {
    ...selection,
    rows: selection.rows === value ? selection.cols : selection.rows,
    cols: value,
  };
}

/** Active time is offered only when the matrix has it; otherwise cost is shown instead. */
function metricChoices(data: ReportMatrix | undefined, metric: MatrixMetric) {
  const hasActive = Boolean(data?.cells.some((line) => line.some((cell) => cell.activeMs != null)));
  const shownMetric: MatrixMetric = metric === "activeMs" && !hasActive ? "costUsd" : metric;
  const metrics: MatrixMetric[] = [
    "costUsd",
    "tokens",
    "requests",
    ...(hasActive ? ["activeMs" as const] : []),
  ];
  return { shownMetric, metrics };
}

interface MatrixControlsProps {
  selection: MatrixSelection;
  shownMetric: MatrixMetric;
  metrics: MatrixMetric[];
  onSelectionChange: (selection: MatrixSelection) => void;
}

function MatrixControls({
  selection,
  shownMetric,
  metrics,
  onSelectionChange,
}: MatrixControlsProps) {
  const t = useTranslations("reports");
  const options = MATRIX_DIMENSIONS.map((value) => ({
    value,
    label: t(DIMENSION_INFO[value].nameKey),
  }));
  const pick = (axis: Axis, value: ReportMatrixDimension) =>
    onSelectionChange(pickDimension(selection, axis, value));
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Select
        native
        label={t("matrixRows")}
        value={selection.rows}
        options={options}
        onChange={(event) => pick("rows", event.target.value as ReportMatrixDimension)}
      />
      <Select
        native
        label={t("matrixCols")}
        value={selection.cols}
        options={options}
        onChange={(event) => pick("cols", event.target.value as ReportMatrixDimension)}
      />
      <SegmentedControl
        semantics="radio"
        size="sm"
        aria-label={t("matrixMetric")}
        value={shownMetric}
        onChange={(value) => onSelectionChange({ ...selection, metric: value as MatrixMetric })}
        options={metrics.map((value) => ({ value, label: t(`metric_${value}`) }))}
      />
    </div>
  );
}

function MatrixTruncatedNote({ data }: { data: ReportMatrix }) {
  const t = useTranslations("reports");
  return (
    <p role="note" className="text-xs text-warning">
      {t("matrixTruncated", {
        rows: data.rows.filter((entry) => !entry.other).length,
        cols: data.cols.filter((entry) => !entry.other).length,
        rowCount: data.rowCount,
        colCount: data.colCount,
      })}
    </p>
  );
}

/** Row and column dimension, metric, and the matrix for the current filters. Mounted only while shown. */
export default function MatrixView({
  query,
  refreshToken,
  selection,
  onSelectionChange,
  onFilter,
  onOpen,
}: MatrixViewProps) {
  const t = useTranslations("reports");
  const { rows, cols } = selection;

  const matrixQuery = useMemo(() => {
    const params = new URLSearchParams(query);
    params.set("rows", rows);
    params.set("cols", cols);
    return params.toString();
  }, [query, rows, cols]);
  const { data, loading, failed } = useReportResource(
    "/api/reports/matrix",
    matrixQuery,
    refreshToken,
    isMatrix
  );
  const { shownMetric, metrics } = metricChoices(data, selection.metric);

  return (
    <div className="space-y-3">
      <MatrixControls
        selection={selection}
        shownMetric={shownMetric}
        metrics={metrics}
        onSelectionChange={onSelectionChange}
      />
      <p className="text-xs text-text-muted">{t("matrixHelp")}</p>
      {data?.truncated && <MatrixTruncatedNote data={data} />}
      {failed && <p className="text-sm text-error">{t("matrixFailed")}</p>}
      {data && data.rows.length > 0 && data.cols.length > 0 ? (
        <div className={loading ? "opacity-60 transition-opacity" : undefined}>
          <MatrixTable matrix={data} metric={shownMetric} handlers={{ onFilter, onOpen }} />
        </div>
      ) : (
        !failed &&
        !loading && <p className="py-8 text-center text-sm text-text-muted">{t("noData")}</p>
      )}
    </div>
  );
}
