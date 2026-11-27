"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { TableRowActivateEvent, TableRowFocus } from "./table";
import { Search, X } from "lucide-react";
import { inertProps } from "./lib/inert";
import { resolveLabels } from "./lib/labels";
import { cn } from "./lib/utils";
import { foldSearchText } from "./lib/search-fold";
import { Input } from "./input";
import { DataTableFooter, SortableTableHead, type DataTableSortDirection } from "./data-table-shell";
import { PaginationControls } from "./pagination-controls";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, type TableDensity, type TableVariant } from "./table";

export type DataTableValue = string | number | boolean | null | undefined;

/** The sorted column and its direction. */
export interface DataTableSort {
  id: string;
  direction: DataTableSortDirection;
}

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

/** Interface text of the search and pagination chrome. */
export interface DataTableLabels {
  /** Clear-search button accessible name. */
  clearSearch: string;
  /** Visible count of the rows that match the search. */
  resultCount: (count: number) => string;
  /** Accessible name of the pagination landmark. */
  navigation: string;
  /** Accessible name of a page button. */
  goToPage: (page: number) => string;
  /** Visible text of the previous/next buttons. */
  previous: string;
  next: string;
  /** Accessible name of the previous/next buttons. */
  previousPage: string;
  nextPage: string;
  /** Text alternative of the ellipsis between page buttons. */
  morePages: string;
}
export const defaultDataTableLabels: DataTableLabels = {
  clearSearch: "Clear search",
  resultCount: (count) => `${count} results`,
  navigation: "Pagination",
  goToPage: (page) => `Go to page ${page}`,
  previous: "Previous",
  next: "Next",
  previousPage: "Go to previous page",
  nextPage: "Go to next page",
  morePages: "More pages",
};

export interface DataTableProps<Row> {
  loading?: boolean;
  loadingLabel?: string;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  /**
   * Makes the body rows interactive: each one is a tab stop, and this runs with the row on a
   * click and on Enter or Space, but not from a control inside a cell. See `TableRow`.
   */
  onRowActivate?: (row: Row, event: TableRowActivateEvent) => void;
  /**
   * The `rowKey` of the selected row. Every body row then states `aria-selected`; pass `null`
   * while the rows can be selected and none is.
   */
  selectedRowKey?: string | null;
  /**
   * `"roving"` gives the rows that `onRowActivate` makes interactive one tab stop between them,
   * with the arrow keys moving focus from row to row. Defaults to `"each"`. See `Table`.
   */
  rowFocus?: TableRowFocus;
  ariaLabel?: string;
  searchPlaceholder?: string;
  emptyMessage?: ReactNode;
  pageSize?: number;
  initialSort?: DataTableSort;
  /**
   * Controlled sort. Leave it out and the table keeps its own sort, starting at `initialSort`;
   * pass `null` while the sort is yours and no column is sorted.
   */
  sort?: DataTableSort | null;
  /** Runs when a sortable header is pressed, whether or not `sort` is controlled. */
  onSortChange?: (sort: DataTableSort) => void;
  /** Controlled page, starting at 1. A value outside the page range is clamped. */
  page?: number;
  /**
   * Runs with the page a pager control asks for, and with 1 when the sort or the search changes
   * while another page is held. Runs whether or not `page` is controlled.
   */
  onPageChange?: (page: number) => void;
  /** Controlled search text, for a search kept in the URL or in a field of your own. */
  query?: string;
  /** Runs when the built-in search field is edited or cleared, whether or not `query` is controlled. */
  onQueryChange?: (query: string) => void;
  /** `false` hides the built-in search field. A `query` you pass still filters the rows. */
  searchable?: boolean;
  /**
   * Total number of rows on the server. Set it when `rows` holds only the current page, already
   * filtered and sorted: the table then renders `rows` as given and pages over `rowCount`.
   */
  rowCount?: number;
  /**
   * Rows-per-page control for the footer, usually a `DataTablePageSizeControl` bound to `pageSize`.
   * The footer then stays when one page holds every row.
   */
  pageSizeControl?: ReactNode;
  note?: ReactNode;
  className?: string;
  /**
   * Fill a height-constrained parent: the rows scroll under a pinned header in the height left
   * by the toolbar and the pagination, which stay in view. `maxHeight` is ignored next to it.
   * See `Table`.
   */
  fill?: boolean;
  /** Caps the table height so the rows scroll under a pinned header. See `Table`. */
  maxHeight?: string | number;
  /** Localized interface text; missing or `undefined` keys fall back to defaultDataTableLabels. */
  labels?: Partial<DataTableLabels>;
  /** Row height, cell padding and text size of the table. See `Table`. */
  density?: TableDensity;
  /** `"plain"` drops the frame around the toolbar, table and pagination, for a host that draws it. */
  variant?: TableVariant;
}

function compare(a: DataTableValue, b: DataTableValue) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}

export function DataTable<Row>({
  loading,
  loadingLabel,
  columns,
  rows,
  rowKey,
  onRowActivate,
  selectedRowKey,
  rowFocus,
  ariaLabel = "Data table",
  searchPlaceholder = "Search rows",
  emptyMessage = "No matching results.",
  pageSize = 5,
  initialSort,
  sort: controlledSort,
  onSortChange,
  page: controlledPage,
  onPageChange,
  query: controlledQuery,
  onQueryChange,
  searchable = true,
  rowCount,
  pageSizeControl,
  note,
  fill,
  className,
  maxHeight,
  labels: labelOverrides,
  density,
  variant,
}: DataTableProps<Row>) {
  const labels = resolveLabels(defaultDataTableLabels, labelOverrides);
  const [ownQuery, setOwnQuery] = useState("");
  const [ownPage, setOwnPage] = useState(1);
  const [ownSort, setOwnSort] = useState(initialSort);
  // Each of the three belongs to the caller when its prop is set, and is kept here otherwise.
  const query = controlledQuery ?? ownQuery;
  const page = controlledPage ?? ownPage;
  const sort = controlledSort === undefined ? ownSort : controlledSort ?? undefined;
  const serverRows = rowCount !== undefined;

  const filtered = useMemo(() => {
    // The server already filtered and sorted the page it sent.
    if (serverRows) return rows;
    const term = foldSearchText(query.trim());
    const searchColumns = columns.filter((column) => column.searchable !== false);
    const next = term
      ? rows.filter((row) => searchColumns.some((column) => foldSearchText(String(column.value(row) ?? "")).includes(term)))
      : [...rows];
    if (!sort) return next;
    const column = columns.find((item) => item.id === sort.id);
    if (!column) return next;
    return next.sort((a, b) => compare(column.value(a), column.value(b)) * (sort.direction === "asc" ? 1 : -1));
  }, [columns, query, rows, serverRows, sort]);

  const total = serverRows ? Math.max(0, Math.floor(rowCount) || 0) : filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const activePage = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);
  const visible = serverRows ? filtered : filtered.slice((activePage - 1) * pageSize, activePage * pageSize);

  function setQuery(next: string) {
    if (controlledQuery === undefined) setOwnQuery(next);
    onQueryChange?.(next);
  }
  function setPage(next: number) {
    if (controlledPage === undefined) setOwnPage(next);
    // Against the page held, not the clamped one shown: a page past the end still has to move.
    if (next !== page) onPageChange?.(next);
  }
  function setSort(next: DataTableSort) {
    if (controlledSort === undefined) setOwnSort(next);
    onSortChange?.(next);
  }

  function changeSort(column: DataTableColumn<Row>, direction: DataTableSortDirection) {
    if (column.sortable === false) return;
    setSort({ id: column.id, direction });
    setPage(1);
  }

  return (
    <div data-fill={fill || undefined} data-variant={variant === "plain" ? variant : undefined} className={cn("ci-data-table", className)}>
      <div className="ci-data-table__frame">
        <div className="ci-data-table__toolbar">
          {searchable ? <div className="ci-data-table__search">
            <Search aria-hidden="true" />
            <Input
              value={query}
              onChange={(event) => { setQuery(event.target.value); setPage(1); }}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
            {query ? <button type="button" onClick={() => { setQuery(""); setPage(1); }} aria-label={labels.clearSearch}><X /></button> : null}
          </div> : null}
          <span className="ci-data-table__count" aria-live="polite">{labels.resultCount(total)}</span>
        </div>
        <Table aria-label={ariaLabel} loading={loading} loadingLabel={loadingLabel} maxHeight={maxHeight} density={density} rowFocus={rowFocus} fill={fill}>
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
              <TableRow
                key={rowKey(row)}
                onActivate={onRowActivate ? (event) => onRowActivate(row, event) : undefined}
                selected={selectedRowKey === undefined ? undefined : rowKey(row) === selectedRowKey}
              >
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
        <DataTablePagerRow pageSizeControl={pageSizeControl} {...inertProps(loading)} aria-hidden={loading || undefined}>
          {pageCount > 1 ? (
            <PaginationControls
              page={activePage}
              pageCount={pageCount}
              onPageChange={setPage}
              disabled={loading}
              labels={{ navigation: labels.navigation, previous: labels.previous, next: labels.next, previousPage: labels.previousPage, nextPage: labels.nextPage, goToPage: labels.goToPage, morePages: labels.morePages }}
            />
          ) : null}
        </DataTablePagerRow>
      </div>
      {note ? <p className="ci-data-table__note">{note}</p> : null}
    </div>
  );
}

/** The pager row. With a rows-per-page control it takes the `DataTableShell` footer geometry. */
function DataTablePagerRow({
  pageSizeControl,
  children,
  ...props
}: { pageSizeControl?: ReactNode; children: ReactNode; inert?: boolean; "aria-hidden"?: boolean }) {
  if (pageSizeControl) return <DataTableFooter pagination={children} pageSizeControl={pageSizeControl} {...props} />;
  return children ? <div className="ci-data-table__pagination" {...props}>{children}</div> : null;
}
