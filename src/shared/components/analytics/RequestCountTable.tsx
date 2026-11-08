"use client";

/**
 * RequestCountTable — pure presentational table for #4009.
 * Split out of RequestCountByProviderDateTable to keep that container under
 * the max-lines-per-function complexity gate.
 */

import { PROVIDER_COLORS } from "./chartColors";
import { fmtCompact as fmt, fmtFull } from "@/shared/utils/formatting";
import { SortableTableHead } from "@omniroute/ui-kit/data-table-shell";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@omniroute/ui-kit/table";

export interface ProviderDailyUsageRow {
  date: string;
  provider: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export type RequestCountSortField = "date" | "provider" | "requests" | "totalTokens";

interface RequestCountTableProps {
  rows: ProviderDailyUsageRow[];
  sortBy: RequestCountSortField;
  sortOrder: "asc" | "desc";
  onToggleSort: (field: RequestCountSortField) => void;
  dateLabel: string;
  providerLabel: string;
  requestsLabel: string;
  totalLabel: string;
  displayMode?: "compact" | "exact";
}

export default function RequestCountTable({
  rows,
  sortBy,
  sortOrder,
  onToggleSort,
  dateLabel,
  providerLabel,
  requestsLabel,
  totalLabel,
  displayMode = "compact",
}: RequestCountTableProps) {
  return (
    <Table
      containerClassName="rounded-none border-0"
      className="text-sm"
      scrollbarLabel={requestsLabel}
    >
      <TableHeader>
        <TableRow>
          <SortableTableHead
            className="px-4 py-2.5"
            direction={sortBy === "date" ? sortOrder : undefined}
            onDirectionChange={() => onToggleSort("date")}
          >
            {dateLabel}
          </SortableTableHead>
          <SortableTableHead
            className="px-4 py-2.5"
            direction={sortBy === "provider" ? sortOrder : undefined}
            onDirectionChange={() => onToggleSort("provider")}
          >
            {providerLabel}
          </SortableTableHead>
          <SortableTableHead
            align="right"
            className="px-4 py-2.5"
            direction={sortBy === "requests" ? sortOrder : undefined}
            onDirectionChange={() => onToggleSort("requests")}
          >
            {requestsLabel}
          </SortableTableHead>
          <SortableTableHead
            align="right"
            className="px-4 py-2.5"
            direction={sortBy === "totalTokens" ? sortOrder : undefined}
            onDirectionChange={() => onToggleSort("totalTokens")}
          >
            {totalLabel}
          </SortableTableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={`${row.date}::${row.provider}`}>
            <TableCell className="px-4 py-2.5 font-mono text-text-muted">{row.date}</TableCell>
            <TableCell className="px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: PROVIDER_COLORS[i % PROVIDER_COLORS.length] }}
                />
                <span className="font-medium capitalize">{row.provider}</span>
              </div>
            </TableCell>
            <TableCell className="px-4 py-2.5 text-right font-mono font-semibold">
              {fmtFull(row.requests)}
            </TableCell>
            <TableCell
              className="px-4 py-2.5 text-right font-mono text-text-muted"
              title={
                displayMode === "exact" ? `~${fmt(row.totalTokens)}` : fmtFull(row.totalTokens)
              }
            >
              {displayMode === "exact" ? fmtFull(row.totalTokens) : fmt(row.totalTokens)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
