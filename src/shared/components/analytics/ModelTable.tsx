"use client";

import { SortableTableHead } from "@omniroute/ui-kit/data-table-shell";

/**
 * Model Breakdown table for Usage analytics (#8769).
 * Extracted from charts.tsx so sort logic can be fixed/tested without
 * growing the frozen charts god-file.
 */

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "../Card";
import { getSeriesColor } from "./chartColors";
import { fmtCompact as fmt, fmtFull, fmtCost } from "@/shared/utils/formatting";
import {
  nextModelBreakdownSort,
  sortModelBreakdownRows,
  withModelBreakdownShare,
  type ModelBreakdownRow,
  type ModelBreakdownSortField,
  type ModelBreakdownSortOrder,
} from "./modelBreakdownSort";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

interface ModelTableProps {
  byModel?: ModelBreakdownRow[] | null;
  summary?: { totalTokens?: number | null } | null;
  displayMode?: "compact" | "exact";
}

type Column = {
  field: ModelBreakdownSortField;
  labelKey: string;
  align: "left" | "right";
};

const COLUMNS: Column[] = [
  { field: "model", labelKey: "chartModel", align: "left" },
  { field: "requests", labelKey: "chartRequests", align: "right" },
  { field: "promptTokens", labelKey: "chartInput", align: "right" },
  { field: "completionTokens", labelKey: "chartOutput", align: "right" },
  { field: "totalTokens", labelKey: "chartTotal", align: "right" },
  { field: "cost", labelKey: "chartCost", align: "right" },
];

export function ModelTable({ byModel, summary, displayMode = "compact" }: ModelTableProps) {
  const t = useTranslations("analytics");
  const [sort, setSort] = useState<{
    by: ModelBreakdownSortField;
    order: ModelBreakdownSortOrder;
  }>({ by: "totalTokens", order: "desc" });

  const toggleSort = useCallback((field: ModelBreakdownSortField) => {
    setSort((prev) => {
      const next = nextModelBreakdownSort(prev.by, prev.order, field);
      return { by: next.sortBy, order: next.sortOrder };
    });
  }, []);

  const rowsWithShare = useMemo(
    () => withModelBreakdownShare(byModel, summary?.totalTokens),
    [byModel, summary?.totalTokens]
  );

  const sorted = useMemo(
    () => sortModelBreakdownRows(rowsWithShare, sort.by, sort.order),
    [rowsWithShare, sort.by, sort.order]
  );

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          {t("chartModelBreakdown")}
        </h3>
      </div>
      <Table
        containerClassName="rounded-none border-0"
        className="text-sm"
        scrollbarLabel={t("chartModelBreakdown")}
      >
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <SortableTableHead
                key={col.field}
                align={col.align === "right" ? "right" : "left"}
                className="px-4 py-2.5"
                direction={sort.by === col.field ? sort.order : undefined}
                // nextModelBreakdownSort owns the click rule (#8769); the kit only renders it.
                onDirectionChange={() => toggleSort(col.field)}
              >
                {t(col.labelKey)}
              </SortableTableHead>
            ))}
            <TableHead className="px-4 py-2.5 text-right w-36">{t("chartShare")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((m, i) => (
            <TableRow key={String(m.model ?? i)}>
              <TableCell className="px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: getSeriesColor(i) }}
                  />
                  <span className="font-medium">{m.model}</span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-2.5 text-right font-mono text-text-muted">
                {fmtFull(m.requests)}
              </TableCell>
              <TableCell
                className="px-4 py-2.5 text-right font-mono text-primary"
                title={
                  displayMode === "exact" ? `~${fmt(m.promptTokens)}` : fmtFull(m.promptTokens)
                }
              >
                {displayMode === "exact" ? fmtFull(m.promptTokens) : fmt(m.promptTokens)}
              </TableCell>
              <TableCell
                className="px-4 py-2.5 text-right font-mono text-success"
                title={
                  displayMode === "exact"
                    ? `~${fmt(m.completionTokens)}`
                    : fmtFull(m.completionTokens)
                }
              >
                {displayMode === "exact" ? fmtFull(m.completionTokens) : fmt(m.completionTokens)}
              </TableCell>
              <TableCell
                className="px-4 py-2.5 text-right font-mono font-semibold"
                title={displayMode === "exact" ? `~${fmt(m.totalTokens)}` : fmtFull(m.totalTokens)}
              >
                {displayMode === "exact" ? fmtFull(m.totalTokens) : fmt(m.totalTokens)}
              </TableCell>
              <TableCell className="px-4 py-2.5 text-right font-mono text-warning">
                {fmtCost(m.cost)}
              </TableCell>
              <TableCell className="px-4 py-2.5 text-right">
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-16 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${m.pct ?? 0}%`,
                        backgroundColor: getSeriesColor(i),
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-text-muted w-10 text-right">
                    {m.pct ?? 0}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default ModelTable;
