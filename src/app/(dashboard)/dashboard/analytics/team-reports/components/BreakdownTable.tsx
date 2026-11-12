"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Button as LinkButton } from "@omniroute/ui-kit/button";
import { SortableTableHead } from "@omniroute/ui-kit/data-table-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

import type { ReportBreakdownRow } from "@/lib/usage/agentSessionReports";
import { Button } from "@/shared/components";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import { FILTER_NONE } from "../reportFilters";
import { formatDateTime, splitTokens } from "./format";
import { CacheTokens, useTokenLabels } from "./TokenFigures";

type SortKey =
  | "name"
  | "extra"
  | "sessions"
  | "requests"
  | "errors"
  | "input"
  | "output"
  | "cache"
  | "cost"
  | "lastSeen";
type ExtraCount = "members" | "projects";

interface BreakdownTableProps {
  rows: ReportBreakdownRow[];
  nameHeader: string;
  /** Shown when a row has no key (e.g. requests without a project). */
  fallbackName: string;
  extraCount: ExtraCount;
  showDetail?: boolean;
  defaultSort?: SortKey;
  onFilter?: (key: string) => void;
  /** The empty-key row can be filtered on (as FILTER_NONE), because the dimension has a "none" filter. */
  filterNone?: boolean;
  /** Makes a row's name open its detail panel (rows with a key only). */
  onOpen?: (row: ReportBreakdownRow) => void;
}

function sortValue(row: ReportBreakdownRow, key: SortKey, extra: ExtraCount): string | number {
  switch (key) {
    case "name":
      return (row.label ?? row.key).toLowerCase();
    case "extra":
      return row[extra];
    case "input":
    case "output":
    case "cache":
      return splitTokens(row.tokens)[key];
    case "cost":
      return row.costUsd;
    case "lastSeen":
      return row.lastSeenAt ?? "";
    default:
      return row[key];
  }
}

type SortState = { key: SortKey; desc: boolean };
type Column = { key: SortKey; label: string; numeric?: boolean };

function useBreakdownColumns(nameHeader: string, extraCount: ExtraCount): Column[] {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  return [
    { key: "name", label: nameHeader },
    {
      key: "extra",
      label: t(extraCount === "members" ? "colMembers" : "colProjects"),
      numeric: true,
    },
    { key: "sessions", label: t("colSessions"), numeric: true },
    { key: "requests", label: t("colRequests"), numeric: true },
    { key: "errors", label: t("colErrors"), numeric: true },
    { key: "input", label: tokenLabels.input, numeric: true },
    { key: "output", label: tokenLabels.output, numeric: true },
    { key: "cache", label: tokenLabels.cache, numeric: true },
    { key: "cost", label: t("colCost"), numeric: true },
    { key: "lastSeen", label: t("colLastActive") },
  ];
}

function SortableHeader({
  column,
  sort,
  onSort,
}: {
  column: Column;
  sort: SortState;
  onSort: (key: SortKey, desc: boolean) => void;
}) {
  const active = sort.key === column.key;
  return (
    <SortableTableHead
      direction={active ? (sort.desc ? "desc" : "asc") : undefined}
      // A new column starts descending (largest first), except the name column.
      defaultDirection={column.key === "name" ? "asc" : "desc"}
      align={column.numeric ? "right" : "left"}
      onDirectionChange={(direction) => onSort(column.key, direction === "desc")}
      className="py-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted"
    >
      {column.label}
    </SortableTableHead>
  );
}

function BreakdownRow({
  row,
  fallbackName,
  extraCount,
  showDetail,
  onFilter,
  filterNone,
  onOpen,
}: {
  row: ReportBreakdownRow;
  fallbackName: string;
  extraCount: ExtraCount;
  showDetail: boolean;
  onFilter?: (key: string) => void;
  filterNone: boolean;
  onOpen?: (row: ReportBreakdownRow) => void;
}) {
  const t = useTranslations("reports");
  const tokens = splitTokens(row.tokens);
  const name = row.label || row.key || fallbackName;
  return (
    <TableRow>
      <TableCell className="py-2.5 px-3">
        <div className="font-medium text-text-main">
          {onOpen && row.key ? (
            <LinkButton
              variant="link"
              className="h-auto min-h-0 p-0 text-start font-medium"
              aria-label={t("openDetails", { name })}
              onClick={() => onOpen(row)}
            >
              {name}
            </LinkButton>
          ) : (
            name
          )}
        </div>
        {showDetail && row.detail && (
          <div className="max-w-[260px] truncate font-mono text-xs text-text-muted">
            {row.detail}
          </div>
        )}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">{row[extraCount]}</TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">{row.sessions}</TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">{row.requests}</TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">{row.errors}</TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">
        {fmtCompact(tokens.input)}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">
        {fmtCompact(tokens.output)}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right tabular-nums">
        <CacheTokens split={tokens} />
      </TableCell>
      <TableCell className="py-2.5 px-3 text-right font-mono tabular-nums text-success">
        {formatCost(row.costUsd)}
      </TableCell>
      <TableCell className="py-2.5 px-3 text-text-muted">
        {formatDateTime(row.lastSeenAt)}
      </TableCell>
      {onFilter && (
        <TableCell className="py-2.5 px-3 text-right">
          {(row.key || filterNone) && (
            <Button variant="ghost" size="sm" onClick={() => onFilter(row.key || FILTER_NONE)}>
              {t("filterBy")}
            </Button>
          )}
        </TableCell>
      )}
    </TableRow>
  );
}

export default function BreakdownTable({
  rows,
  nameHeader,
  fallbackName,
  extraCount,
  showDetail = false,
  defaultSort = "cost",
  onFilter,
  filterNone = false,
  onOpen,
}: BreakdownTableProps) {
  const t = useTranslations("reports");
  const columns = useBreakdownColumns(nameHeader, extraCount);
  const [sort, setSort] = useState<SortState>({
    key: defaultSort,
    desc: defaultSort !== "name",
  });

  const sortedRows = useMemo(() => {
    const direction = sort.desc ? -1 : 1;
    return [...rows].sort((a, b) => {
      const left = sortValue(a, sort.key, extraCount);
      const right = sortValue(b, sort.key, extraCount);
      return left < right ? -direction : left > right ? direction : 0;
    });
  }, [rows, sort, extraCount]);

  const changeSort = (key: SortKey, desc: boolean) => setSort({ key, desc });

  if (rows.length === 0) {
    return <p className="py-8 text-center text-sm text-text-muted">{t("noData")}</p>;
  }

  return (
    <Table className="text-sm" scrollbarLabel={nameHeader}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <SortableHeader key={column.key} column={column} sort={sort} onSort={changeSort} />
          ))}
          {onFilter && <TableHead className="py-2 px-3" />}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedRows.map((row) => (
          <BreakdownRow
            key={row.key || FILTER_NONE}
            row={row}
            fallbackName={fallbackName}
            extraCount={extraCount}
            showDetail={showDetail}
            onFilter={onFilter}
            filterNone={filterNone}
            onOpen={onOpen}
          />
        ))}
      </TableBody>
    </Table>
  );
}
