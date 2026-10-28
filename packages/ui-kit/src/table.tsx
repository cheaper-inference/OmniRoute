"use client";

import type { ComponentProps } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "./lib/utils";
import { TableLoadingRegion, type TableLoadingRegionProps } from "./table-loading";
import { TableScrollArea } from "./table-scroll-area";
import { useInsideTableScrollArea } from "./table-scroll-context";

export interface TableProps extends ComponentProps<"table"> {
  containerClassName?: string;
  /** Show the default axis overlay while the consumer fetches new rows. */
  loading?: boolean;
  loadingLabel?: string;
  loadingIndicator?: TableLoadingRegionProps["loadingIndicator"];
  /** Accessible noun phrase used for the persistent horizontal scrollbar. */
  scrollbarLabel?: string;
  /** Set false to use the browser's native horizontal scrollbar only. */
  persistentScrollbars?: boolean;
}

export function Table({
  className,
  containerClassName,
  scrollbarLabel = "Table",
  persistentScrollbars = true,
  loading,
  loadingLabel,
  loadingIndicator,
  ...props
}: TableProps) {
  const insideScrollArea = useInsideTableScrollArea();
  const table = (
    <div data-slot="table-container" className={cn("ci-table-container", containerClassName)}>
      <table data-slot="table" className={cn("ci-table", className)} {...props} />
    </div>
  );
  const content = !persistentScrollbars || insideScrollArea
    ? table
    : <TableScrollArea scrollbarLabel={scrollbarLabel}>{table}</TableScrollArea>;
  // Keep the original DOM for consumers without asynchronous data.
  if (loading === undefined) return content;
  return (
    <TableLoadingRegion loading={loading} loadingLabel={loadingLabel} loadingIndicator={loadingIndicator}>
      {content}
    </TableLoadingRegion>
  );
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("ci-table__header", className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("ci-table__body", className)} {...props} />;
}

export function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("ci-table__footer", className)} {...props} />;
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn("ci-table__row", className)} {...props} />;
}

export type TableStickyEdge = "end";

export interface TableHeadProps extends ComponentProps<"th"> {
  sticky?: TableStickyEdge;
}

export function TableHead({ className, sticky, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      data-sticky={sticky}
      className={cn(
        "ci-table__head",
        sticky === "end" && "ci-table__head--sticky-end",
        className,
      )}
      {...props}
    />
  );
}

export interface TableCellProps extends ComponentProps<"td"> {
  sticky?: TableStickyEdge;
}

export function TableCell({ className, sticky, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-sticky={sticky}
      className={cn(
        "ci-table__cell",
        sticky === "end" && "ci-table__cell--sticky-end",
        className,
      )}
      {...props}
    />
  );
}

export function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return <caption data-slot="table-caption" className={cn("ci-table__caption", className)} {...props} />;
}

export function TableNote({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="table-note" className={cn("ci-table-note", className)} {...props} />;
}

export interface TableActionLinkProps extends ComponentProps<"a"> {
  label: string;
}

export function TableActionLink({ className, label, target = "_blank", rel, ...props }: TableActionLinkProps) {
  return (
    <a
      data-slot="table-action-link"
      className={cn("ci-table-action-link", className)}
      target={target}
      rel={rel ?? (target === "_blank" ? "noreferrer" : undefined)}
      {...props}
    >
      <ExternalLink aria-hidden="true" />
      <span className="ci-sr-only">{label}</span>
    </a>
  );
}
