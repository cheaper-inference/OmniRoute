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

/** The matrix as a table: a shaded cell per row x column, row and column totals, "other" last. */
export default function MatrixTable({ matrix, metric, handlers }: MatrixTableProps) {
  const t = useTranslations("reports");
  const { rows, cols, cells } = matrix;
  const rowInfo = DIMENSION_INFO[matrix.rowDimension];
  const colInfo = DIMENSION_INFO[matrix.colDimension];
  const rowName = (entry: Entry) => headerName(entry, t(rowInfo.fallbackKey), t("other"));
  const colName = (entry: Entry) => headerName(entry, t(colInfo.fallbackKey), t("other"));
  const show = (metrics: ReportMatrixMetrics) => {
    const value = metricValue(metrics, metric);
    return value ? formatMetric(metric, value) : NO_VALUE;
  };

  // The shade scale ends at the largest ordinary cell; the "other" bucket is sums, not comparable.
  let max = 0;
  cells.forEach((line, i) =>
    line.forEach((cell, j) => {
      if (!rows[i]?.other && !cols[j]?.other) max = Math.max(max, metricValue(cell, metric) ?? 0);
    })
  );

  const clickable = (i: number, j: number) =>
    !rows[i].other &&
    !cols[j].other &&
    cells[i][j].requests > 0 &&
    (rows[i].key || rowInfo.filterNone) &&
    (cols[j].key || colInfo.filterNone);

  return (
    <Table className="text-xs" scrollbarLabel={t("matrix")}>
      <TableHeader>
        <TableRow>
          <TableHead scope="col" className={`${STICKY_HEAD} min-w-32`}>
            {t(rowInfo.nameKey)} / {t(colInfo.nameKey)}
          </TableHead>
          {cols.map((col) => (
            <TableHead
              key={col.key + String(col.other)}
              scope="col"
              className={`min-w-24 text-right ${col.other ? "bg-surface-2" : ""}`}
            >
              <MatrixHeaderLabel
                entry={col}
                dimension={matrix.colDimension}
                name={colName(col)}
                handlers={handlers}
              />
            </TableHead>
          ))}
          <TableHead scope="col" className="min-w-24 text-right">
            {t("matrixTotal")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={row.key + String(row.other)}>
            <TableHead scope="row" className={`${STICKY_HEAD} ${row.other ? "bg-surface-2" : ""}`}>
              <MatrixHeaderLabel
                entry={row}
                dimension={matrix.rowDimension}
                name={rowName(row)}
                handlers={handlers}
              />
            </TableHead>
            {cols.map((col, j) => {
              const cell = cells[i][j];
              const text = show(cell);
              const title = `${rowName(row)} × ${colName(col)}: ${text}`;
              const other = row.other || col.other;
              const shade = other ? undefined : heatColor(metricValue(cell, metric) ?? 0, max);
              return (
                <TableCell
                  key={col.key + String(col.other)}
                  title={title}
                  className={`p-0 text-right tabular-nums ${other ? "bg-surface-2 italic" : ""}`}
                  style={{ backgroundColor: shade }}
                >
                  {clickable(i, j) ? (
                    // kit-exception: the whole shaded cell is the click target, so it needs no
                    // button padding, border or hover surface of its own.
                    <button
                      type="button"
                      aria-label={`${title}. ${t("matrixApply")}`}
                      className="block w-full cursor-pointer px-3 py-2 text-right tabular-nums hover:underline focus-ring"
                      onClick={() =>
                        handlers.onFilter([
                          [rowInfo.field, filterValueFor(row.key)],
                          [colInfo.field, filterValueFor(col.key)],
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
            })}
            <TableCell className="px-3 py-2 text-right font-medium tabular-nums">
              {show(row)}
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableHead scope="row" className={STICKY_HEAD}>
            {t("matrixTotal")}
          </TableHead>
          {cols.map((col) => (
            <TableCell
              key={col.key + String(col.other)}
              className="px-3 py-2 text-right font-medium tabular-nums"
            >
              {show(col)}
            </TableCell>
          ))}
          <TableCell className="px-3 py-2 text-right font-bold tabular-nums">
            {show(matrix.totals)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
