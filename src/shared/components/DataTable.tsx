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
import EmptyState from "./EmptyState";

/**
 * DataTable — adapter over the kit `DataTableShell` + `Table` (KEA-7886).
 *
 * Sticky header, row activation (the kit `TableRow onActivate`: click, Enter and Space, with the
 * controls inside the row keeping their own events), selected row, loading overlay and empty
 * state.
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
   * frame and the surface, and the adapter renders the kit loading region around the kit's
   * frameless table (`variant="plain"`).
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
          variant={framed ? undefined : "plain"}
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
              // Without a `selectedId` selection does not apply and no row states it; with one,
              // every row says whether it is the selected one (`aria-selected` true / false).
              const selected = selectedId === undefined ? undefined : row.id === selectedId;
              return (
                <TableRow
                  key={row.id || idx}
                  onActivate={onRowClick && (() => onRowClick(row))}
                  selected={selected}
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
