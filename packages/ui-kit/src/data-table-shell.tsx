import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cloneElement, isValidElement } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";
import { Select, type SelectProps } from "./select";
import { TableLoadingRegion } from "./table-loading";
import { TableHead } from "./table";

export type DataTableSortDirection = "asc" | "desc";

export interface DataTableShellProps
  extends Omit<ComponentProps<"section">, "children"> {
  /** Cover the table and pagination while leaving filters available. */
  loading?: boolean;
  loadingLabel?: string;
  filters?: ReactNode;
  /** Cross-axis alignment for filter fields with different content heights. */
  filterAlignment?: "start" | "end";
  resultCount?: number;
  resultLabel?: ReactNode | ((count: number) => ReactNode);
  /** Optional actions aligned to the end of the toolbar, separate from filters. */
  toolbarActions?: ReactNode;
  children: ReactNode;
  pagination?: ReactNode;
}

/**
 * Presentational frame for URL-, API-, or database-backed tables.
 *
 * Consumers retain ownership of filtering, sorting, pagination, and data.
 * The shell standardizes the toolbar, result count, table frame, and footer.
 */
export function DataTableShell({
  loading,
  loadingLabel,
  filters,
  filterAlignment = "end",
  resultCount,
  resultLabel,
  toolbarActions,
  children,
  pagination,
  className,
  ...props
}: DataTableShellProps) {
  const hasToolbarActions =
    toolbarActions !== undefined && toolbarActions !== null;
  const resolvedResultLabel =
    resultCount === undefined
      ? null
      : typeof resultLabel === "function"
        ? resultLabel(resultCount)
        : resultLabel ?? (
            <>
              {resultCount.toLocaleString("en-US")} {resultCount === 1 ? "result" : "results"}
            </>
          );

  return (
    <section
      data-slot="data-table-shell"
      className={cn("ci-data-table ci-data-table-shell", className)}
      {...props}
    >
      {filters || resultCount !== undefined || hasToolbarActions ? (
        <div data-slot="data-table-toolbar" className="ci-data-table-shell__toolbar">
          {filters ? (
            <div
              className="ci-data-table-shell__filters"
              data-alignment={filterAlignment}
            >
              {filters}
            </div>
          ) : null}
          {hasToolbarActions ? (
            <div className="ci-data-table-shell__toolbar-end">
              {resultCount !== undefined ? (
                <span className="ci-data-table-shell__count" aria-live="polite">
                  {resolvedResultLabel}
                </span>
              ) : null}
              <div
                data-slot="data-table-toolbar-actions"
                className="ci-data-table-shell__toolbar-actions"
                role="group"
                aria-label="Table actions"
              >
                {toolbarActions}
              </div>
            </div>
          ) : resultCount !== undefined ? (
            <span className="ci-data-table-shell__count" aria-live="polite">
              {resolvedResultLabel}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="ci-data-table__frame ci-data-table-shell__frame">
        {loading === undefined ? <>{children}{pagination}</> : (
          <TableLoadingRegion loading={loading} loadingLabel={loadingLabel}>
            {children}
            {pagination}
          </TableLoadingRegion>
        )}
      </div>
    </section>
  );
}

export interface DataTableFilterFieldProps
  extends Omit<ComponentProps<"div">, "children"> {
  label: ReactNode;
  width?: "standard" | "wide";
  /** Optional two-column layout for compact dashboard toolbars on phones. */
  mobileWidth?: "full" | "half";
  children: ReactNode;
}

/** A compact, reusable label wrapper for one table filter control. */
export function DataTableFilterField({
  label,
  width = "standard",
  mobileWidth = "full",
  children,
  className,
  ...props
}: DataTableFilterFieldProps) {
  const control =
    isValidElement<SelectProps>(children) && children.type === Select
      ? cloneElement(children, {
          menuDensity: children.props.menuDensity ?? "compact",
        })
      : children;

  return (
    <div
      data-slot="data-table-filter"
      data-width={width}
      data-mobile-width={mobileWidth}
      className={cn("ci-data-table-filter", className)}
      {...props}
    >
      <span className="ci-data-table-filter__label">{label}</span>
      {control}
    </div>
  );
}

export interface DataTableFooterProps
  extends Omit<ComponentProps<"div">, "children"> {
  metadata?: ReactNode;
  pagination?: ReactNode;
  pageSizeControl?: ReactNode;
}

/** Standard footer geometry for metadata, pagination, and an optional rows control. */
export function DataTableFooter({
  metadata,
  pagination,
  pageSizeControl,
  className,
  ...props
}: DataTableFooterProps) {
  const hasMetadata = Boolean(metadata);
  const hasPagination = Boolean(pagination);
  const hasPageSize = Boolean(pageSizeControl);

  if (!hasMetadata && !hasPagination && !hasPageSize) return null;
  return (
    <div
      data-slot="data-table-footer"
      data-has-metadata={hasMetadata ? "true" : "false"}
      data-has-pagination={hasPagination ? "true" : "false"}
      data-has-page-size={hasPageSize ? "true" : "false"}
      className={cn("ci-data-table__pagination ci-data-table-shell__footer", className)}
      {...props}
    >
      {hasMetadata ? (
        <div className="ci-data-table-shell__metadata">{metadata}</div>
      ) : null}
      {hasPagination ? (
        <div
          data-slot="data-table-footer-pagination"
          className="ci-data-table-shell__pagination"
        >
          {pagination}
        </div>
      ) : null}
      {hasPageSize ? (
        <div className="ci-data-table-shell__page-size">{pageSizeControl}</div>
      ) : null}
    </div>
  );
}

export interface DataTablePageSizeControlProps
  extends Omit<ComponentProps<"div">, "children" | "onChange"> {
  value: string | number;
  onValueChange: (value: string) => void;
  options?: readonly (string | number)[];
  label?: ReactNode;
  selectAriaLabel?: string;
}

/** Presentational rows-per-page control shared by URL and local table adapters. */
export function DataTablePageSizeControl({
  value,
  onValueChange,
  options = [20, 50, 100, 200],
  label = "Rows",
  selectAriaLabel = "Rows per page",
  className,
  ...props
}: DataTablePageSizeControlProps) {
  return (
    <div
      data-slot="data-table-page-size-control"
      className={cn("ci-data-table-page-size-control", className)}
      {...props}
    >
      <span className="ci-data-table-page-size-control__label">{label}</span>
      <Select
        aria-label={selectAriaLabel}
        value={String(value)}
        onValueChange={onValueChange}
        options={options.map(String)}
        size="xs"
        align="end"
        className="ci-data-table-page-size-control__select"
      />
    </div>
  );
}

export interface SortableTableHeadProps
  extends Omit<ComponentProps<typeof TableHead>, "aria-sort" | "onChange"> {
  direction?: DataTableSortDirection;
  defaultDirection?: DataTableSortDirection;
  align?: "left" | "right";
  disabled?: boolean;
  onDirectionChange: (direction: DataTableSortDirection) => void;
  buttonClassName?: string;
}

/**
 * Controlled sort header for locally or remotely sorted tables.
 * The consumer changes the data; the kit owns direction, icon, and semantics.
 */
export function SortableTableHead({
  direction,
  defaultDirection = "desc",
  align = "left",
  disabled = false,
  onDirectionChange,
  buttonClassName,
  className,
  children,
  ...props
}: SortableTableHeadProps) {
  const nextDirection = direction
    ? direction === "desc"
      ? "asc"
      : "desc"
    : defaultDirection;
  const Icon = direction === "asc" ? ArrowUp : direction === "desc" ? ArrowDown : ArrowUpDown;

  return (
    <TableHead
      aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
      className={cn(align === "right" && "ci-table__head--numeric", className)}
      {...props}
    >
      <button
        type="button"
        data-active={direction ? "true" : undefined}
        className={cn("ci-data-table__sort", align === "right" && "ci-data-table__sort--right", buttonClassName)}
        disabled={disabled}
        onClick={() => onDirectionChange(nextDirection)}
      >
        <span>{children}</span>
        <Icon aria-hidden="true" />
      </button>
    </TableHead>
  );
}
