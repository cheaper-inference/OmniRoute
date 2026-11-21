"use client";

import { useTranslations } from "next-intl";
import { Button as LinkButton } from "@omniroute/ui-kit/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

import Icon from "@/shared/components/Icon";

import type { DrillKind } from "../breakdownTabs";
import type { FilterField } from "../reportFilters";
import {
  DIMENSION_INFO,
  filterValueFor,
  formatMetric,
  headerName,
  heatColor,
  type MatrixMetric,
  type ReportMatrix,
  type ReportMatrixDimension,
  type ReportMatrixMetrics,
} from "../reportViews";
import { NO_VALUE } from "./format";

type Entry = ReportMatrix["rows"][number];

export interface MatrixHandlers {
  /** Applies one filter per [field, value] pair. */
  onFilter: (pairs: Array<[FilterField, string]>) => void;
  onOpen: (kind: DrillKind, key: string, label: string) => void;
}

const DRILL_KINDS: Partial<Record<ReportMatrixDimension, DrillKind>> = {
  members: "member",
  projects: "project",
};

function metricValue(metrics: ReportMatrixMetrics, metric: MatrixMetric): number | null {
  return metric === "activeMs" ? metrics.activeMs : metrics[metric];
}

/** A row or column header: its name filters on the value; members and projects also open a panel. */
function MatrixHeaderLabel({
  entry,
  dimension,
  name,
  handlers,
}: {
  entry: Entry;
  dimension: ReportMatrixDimension;
  name: string;
  handlers: MatrixHandlers;
}) {
  const t = useTranslations("reports");
  const info = DIMENSION_INFO[dimension];
  if (entry.other) return <span className="italic text-text-muted">{name}</span>;
  if (!entry.key && !info.filterNone) return <span>{name}</span>;
  const drill = DRILL_KINDS[dimension];
  return (
    <span className="inline-flex items-center gap-1">
      <LinkButton
        variant="link"
        className="h-auto min-h-0 p-0 text-start font-medium"
        aria-label={t("filterByName", { name })}
        onClick={() => handlers.onFilter([[info.field, filterValueFor(entry.key)]])}
      >
        {name}
      </LinkButton>
      {drill && entry.key && (
        <LinkButton
          variant="ghost"
          size="icon-xs"
          aria-label={t("openDetails", { name })}
          onClick={() => handlers.onOpen(drill, entry.key, name)}
        >
          <Icon name="open_in_new" size={12} />
        </LinkButton>
      )}
    </span>
  );
}

const STICKY_HEAD = "sticky left-0 z-10 bg-surface text-left";

interface MatrixTableProps {
  matrix: ReportMatrix;
  metric: MatrixMetric;
  handlers: MatrixHandlers;
}

/** What the table's parts share: names, the shown value and the shade scale. */
interface MatrixParts {
  matrix: ReportMatrix;
  metric: MatrixMetric;
  handlers: MatrixHandlers;
  rowName: (entry: Entry) => string;
  colName: (entry: Entry) => string;
  show: (metrics: ReportMatrixMetrics) => string;
  max: number;
}

/** The shade scale ends at the largest ordinary cell; the "other" bucket is sums, not comparable. */
function largestCell({ rows, cols, cells }: ReportMatrix, metric: MatrixMetric): number {
  let max = 0;
  cells.forEach((line, i) =>
    line.forEach((cell, j) => {
      if (!rows[i]?.other && !cols[j]?.other) max = Math.max(max, metricValue(cell, metric) ?? 0);
    })
  );
  return max;
}

function isClickable(
  { rows, cols, cells, rowDimension, colDimension }: ReportMatrix,
  i: number,
  j: number
) {
  return Boolean(
    !rows[i].other &&
    !cols[j].other &&
    cells[i][j].requests > 0 &&
    (rows[i].key || DIMENSION_INFO[rowDimension].filterNone) &&
    (cols[j].key || DIMENSION_INFO[colDimension].filterNone)
  );
}

/** One shaded cell; a cell with requests applies both filters. */
function MatrixCell({ view, i, j }: { view: MatrixParts; i: number; j: number }) {
  const t = useTranslations("reports");
  const { matrix, metric, handlers } = view;
  const row = matrix.rows[i];
  const col = matrix.cols[j];
  const cell = matrix.cells[i][j];
  const text = view.show(cell);
  const title = `${view.rowName(row)} × ${view.colName(col)}: ${text}`;
  const other = row.other || col.other;
  const shade = other ? undefined : heatColor(metricValue(cell, metric) ?? 0, view.max);
  return (
    <TableCell
      title={title}
      className={`p-0 text-right tabular-nums ${other ? "bg-surface-2 italic" : ""}`}
      style={{ backgroundColor: shade }}
    >
      {isClickable(matrix, i, j) ? (
        // kit-exception: the whole shaded cell is the click target, so it needs no
        // button padding, border or hover surface of its own.
        <button
          type="button"
          aria-label={`${title}. ${t("matrixApply")}`}
          className="block w-full cursor-pointer px-3 py-2 text-right tabular-nums hover:underline focus-ring"
          onClick={() =>
            handlers.onFilter([
              [DIMENSION_INFO[matrix.rowDimension].field, filterValueFor(row.key)],
              [DIMENSION_INFO[matrix.colDimension].field, filterValueFor(col.key)],
            ])
          }
        >
          {text}
        </button>
      ) : (
        <span className="block px-3 py-2 text-text-muted">{text}</span>
      )}
    </TableCell>
  );
}

function MatrixHeaderRow({ view }: { view: MatrixParts }) {
  const t = useTranslations("reports");
  const { matrix, handlers } = view;
  return (
    <TableRow>
      <TableHead scope="col" className={`${STICKY_HEAD} min-w-32`}>
        {t(DIMENSION_INFO[matrix.rowDimension].nameKey)} /{" "}
        {t(DIMENSION_INFO[matrix.colDimension].nameKey)}
      </TableHead>
      {matrix.cols.map((col) => (
        <TableHead
          key={col.key + String(col.other)}
          scope="col"
          className={`min-w-24 text-right ${col.other ? "bg-surface-2" : ""}`}
        >
          <MatrixHeaderLabel
            entry={col}
            dimension={matrix.colDimension}
            name={view.colName(col)}
            handlers={handlers}
          />
        </TableHead>
      ))}
      <TableHead scope="col" className="min-w-24 text-right">
        {t("matrixTotal")}
      </TableHead>
    </TableRow>
  );
}

function MatrixTotalsRow({ view }: { view: MatrixParts }) {
  const t = useTranslations("reports");
  return (
    <TableRow>
      <TableHead scope="row" className={STICKY_HEAD}>
        {t("matrixTotal")}
      </TableHead>
      {view.matrix.cols.map((col) => (
        <TableCell key={col.key + String(col.other)} className="px-3 py-2 text-right tabular-nums">
          <span className="font-medium">{view.show(col)}</span>
        </TableCell>
      ))}
      <TableCell className="px-3 py-2 text-right tabular-nums">
        <span className="font-semibold">{view.show(view.matrix.totals)}</span>
      </TableCell>
    </TableRow>
  );
}

/** The matrix as a table: a shaded cell per row x column, row and column totals, "other" last. */
export default function MatrixTable({ matrix, metric, handlers }: MatrixTableProps) {
  const t = useTranslations("reports");
  const rowFallback = t(DIMENSION_INFO[matrix.rowDimension].fallbackKey);
  const colFallback = t(DIMENSION_INFO[matrix.colDimension].fallbackKey);
  const view: MatrixParts = {
    matrix,
    metric,
    handlers,
    rowName: (entry) => headerName(entry, rowFallback, t("other")),
    colName: (entry) => headerName(entry, colFallback, t("other")),
    show: (metrics) => {
      const value = metricValue(metrics, metric);
      return value ? formatMetric(metric, value) : NO_VALUE;
    },
    max: largestCell(matrix, metric),
  };

  return (
    <Table
      className="text-xs"
      containerClassName="border-0"
      scrollbarLabel={t("matrix")}
      scrollLabel={t("matrix")}
    >
      <TableHeader>
        <MatrixHeaderRow view={view} />
      </TableHeader>
      <TableBody>
        {matrix.rows.map((row, i) => (
          <TableRow key={row.key + String(row.other)}>
            <TableHead scope="row" className={`${STICKY_HEAD} ${row.other ? "bg-surface-2" : ""}`}>
              <MatrixHeaderLabel
                entry={row}
                dimension={matrix.rowDimension}
                name={view.rowName(row)}
                handlers={handlers}
              />
            </TableHead>
            {matrix.cols.map((col, j) => (
              <MatrixCell key={col.key + String(col.other)} view={view} i={i} j={j} />
            ))}
            <TableCell className="px-3 py-2 text-right tabular-nums">
              <span className="font-medium">{view.show(row)}</span>
            </TableCell>
          </TableRow>
        ))}
        <MatrixTotalsRow view={view} />
      </TableBody>
    </Table>
  );
}
