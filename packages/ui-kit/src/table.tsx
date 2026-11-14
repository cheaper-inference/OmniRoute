"use client";

import { useEffect, useId, useState } from "react";
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
  /**
   * Accessible name of the scroll container while the table overflows. When omitted, the
   * container is named by the table caption, then by the table's own `aria-labelledby` or
   * `aria-label`. With none of these it still becomes focusable, but stays unnamed.
   */
  scrollLabel?: string;
}

/**
 * Tracks whether the table container scrolls and which caption names it. Takes the container
 * node (from a callback ref) so a replaced container is observed again.
 */
function useScrollContainer(container: HTMLDivElement | null, fallbackCaptionId: string) {
  const [overflowing, setOverflowing] = useState(false);
  const [captionId, setCaptionId] = useState<string>();

  useEffect(() => {
    if (!container) return;
    const measure = () => {
      setOverflowing(container.scrollWidth > container.clientWidth || container.scrollHeight > container.clientHeight);
    };
    const syncCaption = () => {
      const caption = container.querySelector<HTMLElement>(":scope > table > caption");
      if (caption && !caption.id) caption.id = fallbackCaptionId;
      setCaptionId(caption?.id || undefined);
    };
    measure();
    syncCaption();

    const hasResizeObserver = typeof ResizeObserver !== "undefined";
    const resizeObserver = hasResizeObserver ? new ResizeObserver(measure) : undefined;
    resizeObserver?.observe(container);
    const table = container.querySelector(":scope > table");
    if (table) resizeObserver?.observe(table);
    if (!hasResizeObserver) window.addEventListener("resize", measure);

    // Descendants can add, remove or rename the caption, and change rows or text, without Table
    // rendering. Text, or a child's style or class, can also overflow a fixed-layout table without
    // resizing any observed box, so every batch of mutations remeasures (one layout read per batch).
    const mutationObserver = typeof MutationObserver === "undefined"
      ? undefined
      : new MutationObserver(() => {
        syncCaption();
        measure();
      });
    if (table) {
      mutationObserver?.observe(table, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["id", "style", "class"] });
    }

    return () => {
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      if (!hasResizeObserver) window.removeEventListener("resize", measure);
    };
  }, [container, fallbackCaptionId]);

  return { overflowing, captionId };
}

export function Table({
  className,
  containerClassName,
  scrollbarLabel = "Table",
  persistentScrollbars = true,
  scrollLabel,
  loading,
  loadingLabel,
  loadingIndicator,
  ...props
}: TableProps) {
  const insideScrollArea = useInsideTableScrollArea();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const { overflowing, captionId } = useScrollContainer(container, useId());
  // Keyboard users can only scroll an overflowing container if it takes focus (WCAG 2.1.1).
  const name = scrollLabel
    ? { "aria-label": scrollLabel }
    : captionId
      ? { "aria-labelledby": captionId }
      : props["aria-labelledby"]
        ? { "aria-labelledby": props["aria-labelledby"] }
        : props["aria-label"]
          ? { "aria-label": props["aria-label"] }
          : undefined;
  const scrollProps = overflowing ? { tabIndex: 0, ...(name ? { role: "region", ...name } : {}) } : {};
  const table = (
    <div
      ref={setContainer}
      data-slot="table-container"
      data-overflowing={overflowing || undefined}
      className={cn("ci-table-container", containerClassName)}
      {...scrollProps}
    >
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

export function TableCaption({ className, id, ...props }: ComponentProps<"caption">) {
  // A stable id lets an overflowing Table name its scroll container after the caption.
  const generatedId = useId();
  return <caption id={id ?? generatedId} data-slot="table-caption" className={cn("ci-table__caption", className)} {...props} />;
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
