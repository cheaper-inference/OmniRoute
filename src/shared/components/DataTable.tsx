"use client";

import { useTranslations } from "next-intl";
import { DataTableShell } from "@omniroute/ui-kit/data-table-shell";
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
  columns?: DataTableColumn[];
  data?: DataTableRow[];
  renderCell: (row: DataTableRow, column: DataTableColumn) => React.ReactNode;
  renderHeader?: (column: DataTableColumn) => React.ReactNode;
  onRowClick?: (row: DataTableRow) => void;
  selectedId?: string | number;
  loading?: boolean;
  maxHeight?: string;
  emptyIcon?: string;
  emptyMessage?: string;
}

export default function DataTable({
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
}: DataTableProps) {
  const t = useTranslations("common");
  const resolvedEmptyMessage = emptyMessage ?? t("noData");
  const hasRows = data.length > 0;

  return (
    <DataTableShell loading={loading} loadingLabel={t("loading")}>
      {!hasRows && !loading ? (
        <EmptyState icon={emptyIcon} title={resolvedEmptyMessage} />
      ) : !hasRows ? (
        // Room for the loading overlay before the first rows arrive.
        <div className="min-h-[12rem]" />
      ) : (
        // The wrapper is the scroll container (both axes) so the header can stick to it.
        // Opaque surface so the page background never bleeds through the table.
        <div style={{ maxHeight, overflow: "auto", background: "var(--color-surface)" }}>
          {/* min-w-0: narrow tables keep their auto width (the kit floors .ci-table at 40rem). */}
          <Table
            className="min-w-0"
            persistentScrollbars={false}
            containerClassName="!overflow-visible"
          >
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className="sticky top-0 z-[1] whitespace-nowrap bg-[var(--table-header-bg)]"
                  >
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
        </div>
      )}
    </DataTableShell>
  );
}
