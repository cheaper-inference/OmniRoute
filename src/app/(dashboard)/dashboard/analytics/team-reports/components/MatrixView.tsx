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
  const { metric, ...dimensions } = selection;

  const matrixQuery = useMemo(() => {
    const params = new URLSearchParams(query);
    params.set("rows", dimensions.rows);
    params.set("cols", dimensions.cols);
    return params.toString();
  }, [query, dimensions]);
  const { data, loading, failed } = useReportResource(
    "/api/reports/matrix",
    matrixQuery,
    refreshToken,
    isMatrix
  );

  // The two dimensions always differ: picking the other axis's dimension swaps them.
  const pick = (axis: "rows" | "cols", value: ReportMatrixDimension) => {
    if (axis === "rows") {
      onSelectionChange({
        ...selection,
        rows: value,
        cols: selection.cols === value ? selection.rows : selection.cols,
      });
    } else {
      onSelectionChange({
        ...selection,
        rows: selection.rows === value ? selection.cols : selection.rows,
        cols: value,
      });
    }
  };

  const hasActive = Boolean(data?.cells.some((line) => line.some((cell) => cell.activeMs != null)));
  const shownMetric: MatrixMetric = metric === "activeMs" && !hasActive ? "costUsd" : metric;
  const metrics: MatrixMetric[] = [
    "costUsd",
    "tokens",
    "requests",
    ...(hasActive ? ["activeMs" as const] : []),
  ];

  const options = MATRIX_DIMENSIONS.map((value) => ({
    value,
    label: t(DIMENSION_INFO[value].nameKey),
  }));
  const shownRows = data?.rows.filter((entry) => !entry.other).length ?? 0;
  const shownCols = data?.cols.filter((entry) => !entry.other).length ?? 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <Select
          native
          label={t("matrixRows")}
          value={dimensions.rows}
          options={options}
          onChange={(event) => pick("rows", event.target.value as ReportMatrixDimension)}
        />
        <Select
          native
          label={t("matrixCols")}
          value={dimensions.cols}
          options={options}
          onChange={(event) => pick("cols", event.target.value as ReportMatrixDimension)}
        />
        <SegmentedControl
          size="sm"
          aria-label={t("matrixMetric")}
          value={shownMetric}
          onChange={(value) => onSelectionChange({ ...selection, metric: value as MatrixMetric })}
          options={metrics.map((value) => ({ value, label: t(`metric_${value}`) }))}
        />
      </div>
      <p className="text-xs text-text-muted">{t("matrixHelp")}</p>
      {data?.truncated && (
        <p role="note" className="text-xs text-warning">
          {t("matrixTruncated", {
            rows: shownRows,
            cols: shownCols,
            rowCount: data.rowCount,
            colCount: data.colCount,
          })}
        </p>
      )}
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
