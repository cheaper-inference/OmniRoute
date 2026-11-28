"use client";

import { useEffect, useRef } from "react";
import type { ComponentProps, FocusEvent, MouseEvent } from "react";
import { resolveLabels } from "./lib/labels";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationSummary,
} from "./pagination";

/** Interface text of the pager. */
export interface PaginationControlsLabels {
  /** Accessible name of the navigation landmark. */
  navigation: string;
  /** Visible text of the previous/next buttons. */
  previous: string;
  next: string;
  /** Accessible name of the previous/next buttons. */
  previousPage: string;
  nextPage: string;
  /** Accessible name of a page button. */
  goToPage: (page: number) => string;
  /** Text alternative of an ellipsis. */
  morePages: string;
  /** Text of the `summary` variant. */
  summary: (page: number, pageCount: number) => string;
}
export const defaultPaginationControlsLabels: PaginationControlsLabels = {
  navigation: "Pagination",
  previous: "Previous",
  next: "Next",
  previousPage: "Go to previous page",
  nextPage: "Go to next page",
  goToPage: (page) => `Go to page ${page}`,
  morePages: "More pages",
  summary: (page, pageCount) => `Page ${page} of ${pageCount}`,
};

export interface PaginationControlsProps extends Omit<ComponentProps<"nav">, "children"> {
  /** Current page, starting at 1. A value outside `1..pageCount` is clamped. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** `pages` lists page numbers (first, last, current, with ellipses); `summary` shows "Page X of Y" between previous and next. */
  variant?: "pages" | "summary";
  /** Disables every button, for example while the next page loads. */
  disabled?: boolean;
  /** Localized interface text; missing or `undefined` keys fall back to defaultPaginationControlsLabels. */
  labels?: Partial<PaginationControlsLabels>;
}

/** Keep navigation bounded even on narrow screens; arrows reach adjacent pages. */
function paginationPages(page: number, count: number): Array<number | "before" | "after"> {
  if (count <= 5) return Array.from({ length: count }, (_, index) => index + 1);
  if (page <= 2) return [1, 2, 3, "after", count];
  if (page >= count - 1) return [1, "before", count - 2, count - 1, count];
  return [1, "before", page, "after", count];
}

/** Ready pager for paging kept in state: buttons, not links, so there is no `href` to fake. */
export function PaginationControls({ page, pageCount, onPageChange, variant = "pages", disabled = false, labels: labelOverrides, ...props }: PaginationControlsProps) {
  const labels = resolveLabels(defaultPaginationControlsLabels, labelOverrides);
  const count = Math.max(1, Math.floor(pageCount) || 1);
  const current = Math.min(Math.max(1, Math.floor(page) || 1), count);
  const pressed = useRef<HTMLButtonElement | null>(null);

  // A focused button that becomes disabled drops keyboard focus: the arrow at either end of the
  // range, or every button while `disabled`. Once a button is enabled again, give focus back to
  // the pressed one, or to the current page (or the other arrow) when it stays disabled.
  useEffect(() => {
    const control = pressed.current;
    if (!control) return;
    const focused = control.ownerDocument.activeElement;
    const movedOn = focused !== null && focused !== control && focused !== control.ownerDocument.body;
    if (movedOn || !control.isConnected) { pressed.current = null; return; }
    let target: HTMLElement | null | undefined = control;
    if (control.disabled) {
      const nav = control.closest('[data-slot="pagination"]');
      target = nav?.querySelector<HTMLElement>('button[aria-current="page"]:not(:disabled)') ?? nav?.querySelector<HTMLElement>("button:not(:disabled)");
      // Every button is disabled: try again when that changes.
      if (!target) return;
    }
    pressed.current = null;
    if (target !== focused) target.focus();
  }, [current, count, disabled]);

  // Focus that lands on another element, even for a moment, means the user moved on, so a pending
  // recovery is dropped. The body is where focus falls when a button is disabled, so it does not count.
  useEffect(() => {
    const moved = (event: Event) => { if (event.target !== pressed.current && event.target !== document.body) pressed.current = null; };
    document.addEventListener("focusin", moved);
    return () => document.removeEventListener("focusin", moved);
  }, []);

  const press = (next: number) => ({
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      const control = event.currentTarget;
      // Only a button that holds focus can lose it; Safari does not focus a clicked button.
      pressed.current = control.ownerDocument.activeElement === control ? control : null;
      if (next !== current) onPageChange(next);
    },
    onBlur: (event: FocusEvent<HTMLButtonElement>) => {
      // Focus left an enabled button, so the user moved on.
      if (pressed.current === event.currentTarget && !event.currentTarget.disabled) pressed.current = null;
    },
  });

  return (
    <Pagination aria-label={labels.navigation} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious asChild label={labels.previousPage} disabled={disabled || current === 1}>
            <button type="button" {...press(current - 1)}><span>{labels.previous}</span></button>
          </PaginationPrevious>
        </PaginationItem>
        {variant === "summary"
          ? <PaginationItem><PaginationSummary>{labels.summary(current, count)}</PaginationSummary></PaginationItem>
          : paginationPages(current, count).map((number) => (
            <PaginationItem key={number}>{typeof number === "number"
              ? <PaginationLink asChild label={labels.goToPage(number)} disabled={disabled} isActive={number === current}><button type="button" {...press(number)}>{number}</button></PaginationLink>
              : <PaginationEllipsis label={labels.morePages} />}</PaginationItem>
          ))}
        <PaginationItem>
          <PaginationNext asChild label={labels.nextPage} disabled={disabled || current === count}>
            <button type="button" {...press(current + 1)}><span>{labels.next}</span></button>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
