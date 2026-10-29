"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Search, X } from "lucide-react";
import { cn } from "./lib/utils";
import { Input } from "./input";
import { SortableTableHead, type DataTableSortDirection } from "./data-table-shell";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

export type DataTableValue = string | number | boolean | null | undefined;

export interface DataTableColumn<Row> {
  id: string;
  header: ReactNode;
  value: (row: Row) => DataTableValue;
  cell?: (row: Row) => ReactNode;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
}

export interface DataTableProps<Row> {
  loading?: boolean;
  loadingLabel?: string;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  ariaLabel?: string;
  searchPlaceholder?: string;
  emptyMessage?: ReactNode;
  pageSize?: number;
  initialSort?: { id: string; direction: "asc" | "desc" };
  note?: ReactNode;
  className?: string;
}

function compare(a: DataTableValue, b: DataTableValue) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

/** Keep navigation bounded even on narrow screens; arrows reach adjacent pages. */
function paginationPages(page: number, count: number): Array<number | "before" | "after"> {
  if (count <= 5) return Array.from({ length: count }, (_, index) => index + 1);
  if (page <= 2) return [1, 2, 3, "after", count];
  if (page >= count - 1) return [1, "before", count - 2, count - 1, count];
  return [1, "before", page, "after", count];
}

export function DataTable<Row>({
  loading,
  loadingLabel,
  columns,
  rows,
  rowKey,
  ariaLabel = "Data table",
  searchPlaceholder = "Search rows",
  emptyMessage = "No matching results.",
  pageSize = 5,
  initialSort,
  note,
  className,
}: DataTableProps<Row>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(initialSort);

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    const searchable = columns.filter((column) => column.searchable !== false);
    const next = term
      ? rows.filter((row) => searchable.some((column) => String(column.value(row) ?? "").toLocaleLowerCase().includes(term)))
      : [...rows];
    if (!sort) return next;
    const column = columns.find((item) => item.id === sort.id);
    if (!column) return next;
    return next.sort((a, b) => compare(column.value(a), column.value(b)) * (sort.direction === "asc" ? 1 : -1));
  }, [columns, query, rows, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const activePage = Math.min(page, pageCount);
  const visible = filtered.slice((activePage - 1) * pageSize, activePage * pageSize);

  function changeSort(column: DataTableColumn<Row>, direction: DataTableSortDirection) {
    if (column.sortable === false) return;
    setSort({ id: column.id, direction });
    setPage(1);
  }

  return (
    <div className={cn("ci-data-table", className)}>
      <div className="ci-data-table__frame">
        <div className="ci-data-table__toolbar">
          <div className="ci-data-table__search">
            <Search aria-hidden="true" />
            <Input
              value={query}
              onChange={(event) => { setQuery(event.target.value); setPage(1); }}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
            {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X /></button> : null}
          </div>
          <span className="ci-data-table__count" aria-live="polite">{filtered.length} results</span>
        </div>
        <Table aria-label={ariaLabel} loading={loading} loadingLabel={loadingLabel}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                const active = sort?.id === column.id;
                return column.sortable === false ? (
                  <TableHead
                    key={column.id}
                    style={{ width: column.width }}
                    className={cn(column.align === "right" && "ci-table__head--numeric", column.align === "center" && "ci-table__head--center")}
                  >
                    {column.header}
                  </TableHead>
                ) : (
                  <SortableTableHead
                    key={column.id}
                    style={{ width: column.width }}
                    direction={active ? sort.direction : undefined}
                    defaultDirection="asc"
                    align={column.align === "right" ? "right" : "left"}
                    className={column.align === "center" ? "ci-table__head--center" : undefined}
                    onDirectionChange={(direction) => changeSort(column, direction)}
                  >
                    {column.header}
                  </SortableTableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length ? visible.map((row) => (
              <TableRow key={rowKey(row)}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    className={cn(column.align === "right" && "ci-table__cell--numeric", column.align === "center" && "ci-table__cell--center")}
                  >
                    {column.cell ? column.cell(row) : String(column.value(row) ?? "—")}
                  </TableCell>
                ))}
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={columns.length}><div className="ci-data-table__empty">{emptyMessage}</div></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
        {pageCount > 1 ? (
          <div className="ci-data-table__pagination" inert={loading || undefined} aria-hidden={loading || undefined}>
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" disabled={loading || activePage === 1} onClick={(event) => { event.preventDefault(); setPage(Math.max(1, activePage - 1)); }} /></PaginationItem>
                {paginationPages(activePage, pageCount).map((number) => (
                  <PaginationItem key={number}>{typeof number === "number"
                    ? <PaginationLink href="#" label={`Go to page ${number}`} disabled={loading} isActive={number === activePage} onClick={(event) => { event.preventDefault(); setPage(number); }}>{number}</PaginationLink>
                    : <PaginationEllipsis />}</PaginationItem>
                ))}
                <PaginationItem><PaginationNext href="#" disabled={loading || activePage === pageCount} onClick={(event) => { event.preventDefault(); setPage(Math.min(pageCount, activePage + 1)); }} /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
      </div>
      {note ? <p className="ci-data-table__note">{note}</p> : null}
    </div>
  );
}
