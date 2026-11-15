"use client";

import { useTranslations } from "next-intl";
import { DataTableShell } from "@omniroute/ui-kit/data-table-shell";
import { TableLoadingRegion } from "@omniroute/ui-kit/table-loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { cn } from "@/shared/utils/cn";
import EmptyState from "./EmptyState";

const INTERACTIVE_ELEMENT_SELECTOR =
  'a[href], button, input, select, textarea, summary, [role="button"], [role="link"], ' +
  '[contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])';

function targetsNestedInteractiveElement(
  row: HTMLTableRowElement,
  target: EventTarget | null
): boolean {
  if (!(target instanceof Element)) return false;
  const interactiveElement = target.closest(INTERACTIVE_ELEMENT_SELECTOR);
  return (
    interactiveElement !== null && interactiveElement !== row && row.contains(interactiveElement)
  );
}

/**
 * DataTable — adapter over the kit `DataTableShell` + `Table` (KEA-7886).
 *
 * Sticky header, row click (mouse + Enter/Space), selected row, loading overlay and
 * empty state. Shared by RequestLoggerV2, ProxyLogger and similar tables.
 *
 * Usage:
 *   <DataTable
 *     label={t("logsTable")}
 *     columns={visibleColumns}
 *     data={filteredLogs}
 *     renderCell={(row, column) => <span>{row[column.key]}</span>}
 *     onRowClick={(row) => openDetail(row)}
 *     selectedId={selectedLog?.id}
 *     loading={isLoading}
 *     emptyIcon="inbox"
 *     emptyMessage="No logs found"
 *   />
 */

export interface DataTableColumn {
  key: string;
  label: string;
  maxWidth?: string;
}

export interface DataTableRow {
  id?: string | number;
  [key: string]: unknown;
}

interface DataTableProps {
  /**
   * Accessible name of the table's scroll region (a translated string). The kit makes the
   * capped container a focusable region while it overflows, and this names it.
   */
  label: string;
  columns?: DataTableColumn[];
  data?: DataTableRow[];
  renderCell: (row: DataTableRow, column: DataTableColumn) => React.ReactNode;
  renderHeader?: (column: DataTableColumn) => React.ReactNode;
  onRowClick?: (row: DataTableRow) => void;
  selectedId?: string | number;
  loading?: boolean;
  /** Kit `Table` `maxHeight`: rows scroll under a pinned header, keyboard-focusable. */
  maxHeight?: string;
  emptyIcon?: string;
  emptyMessage?: string;
  /**
   * Draw the table's own frame (the kit `DataTableShell`). Pass `false` when a `Card`
   * already frames the table, so the two borders do not stack (issue 19620): the card is the
   * frame, and the adapter keeps the kit loading region and a borderless table.
   */
  framed?: boolean;
}

export default function DataTable({
  label,
  columns = [],
  data = [],
  renderCell,
  renderHeader,
  onRowClick,
  selectedId,
  loading = false,
  maxHeight = "calc(100vh - 320px)",
  emptyIcon = "inbox",
  emptyMessage,
  framed = true,
}: DataTableProps) {
  const t = useTranslations("common");
  const resolvedEmptyMessage = emptyMessage ?? t("noData");
  const hasRows = data.length > 0;
  // Both take `loading` + `loadingLabel`; only the shell draws a border around the table.
  const Frame = framed ? DataTableShell : TableLoadingRegion;

  return (
    <Frame loading={loading} loadingLabel={t("loading")}>
      {!hasRows && !loading ? (
        <EmptyState icon={emptyIcon} title={resolvedEmptyMessage} />
      ) : !hasRows ? (
        // Room for the loading overlay before the first rows arrive.
        <div className="min-h-[12rem]" />
      ) : (
        // The kit Table owns the scroll container (maxHeight): it scrolls both axes, pins the
        // header row and becomes a named tab stop while it overflows (kit 0.0.116). min-w-0:
        // narrow tables keep their auto width (the kit floors .ci-table at 40rem).
        <Table
          className="min-w-0"
          maxHeight={maxHeight}
          scrollLabel={label}
          persistentScrollbars={false}
          containerClassName={cn(!framed && "rounded-none border-0")}
        >
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className="whitespace-nowrap">
                  {renderHeader ? renderHeader(col) : col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => {
              const selected = selectedId !== undefined && row.id === selectedId;
              return (
                <TableRow
                  key={row.id || idx}
                  aria-selected={selected || undefined}
                  data-state={selected ? "selected" : undefined}
                  onClick={(event) => {
                    if (
                      !onRowClick ||
                      targetsNestedInteractiveElement(event.currentTarget, event.target)
                    )
                      return;
                    onRowClick(row);
                  }}
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          if (event.target !== event.currentTarget) return;
                          if (event.key !== "Enter" && event.key !== " ") return;
                          event.preventDefault();
                          onRowClick(row);
                        }
                      : undefined
                  }
                  tabIndex={onRowClick ? 0 : undefined}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className="overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ maxWidth: col.maxWidth || "200px" }}
                    >
                      {renderCell(row, col)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Frame>
  );
}
