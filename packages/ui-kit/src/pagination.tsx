import { cloneElement, isValidElement } from "react";
import type { ComponentProps, MouseEvent, ReactElement, ReactNode } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "./lib/utils";

export function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return <nav role="navigation" aria-label="Pagination" data-slot="pagination" className={cn("ci-pagination", className)} {...props} />;
}

export function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("ci-pagination__content", className)} {...props} />;
}

export function PaginationItem(props: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

export interface PaginationLinkProps extends ComponentProps<"a"> {
  isActive?: boolean;
  disabled?: boolean;
  /** Accessible name. PaginationPrevious/Next default to "Go to previous page"/"Go to next page"; pass children to replace the visible text. */
  label?: string;
  /**
   * Render the single child with the pagination treatment instead of an `<a>`: a `<button>` for paging
   * kept in state, or a router link. A `<button>` child gets `type="button"` and the real `disabled`
   * attribute; any other child is disabled the way the link is (`aria-disabled`, out of the tab order).
   */
  asChild?: boolean;
}

/** cloneElement overrides with `undefined` too, so only the keys that carry a value reach the child. */
function defined(props: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined));
}

export function PaginationLink({ className, isActive = false, disabled = false, label, asChild = false, onClick, children, ...props }: PaginationLinkProps) {
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    const childClick = child.props.onClick as ((event: MouseEvent<HTMLElement>) => void) | undefined;
    const nativeButton = child.type === "button";
    // A button the caller disabled itself looks disabled too.
    const inactive = disabled || (nativeButton && Boolean(child.props.disabled));
    const state = nativeButton
      ? { type: child.props.type ?? "button", disabled: disabled || undefined }
      : { "aria-disabled": disabled || undefined, tabIndex: disabled ? -1 : undefined };
    return cloneElement(child, defined({
      ...state,
      "aria-current": isActive ? "page" : undefined,
      "aria-label": label,
      "data-slot": "pagination-link",
      "data-active": isActive || undefined,
      "data-disabled": inactive || undefined,
      ...props,
      className: cn("ci-pagination__link", className, child.props.className as string | undefined),
      onClick: (event: MouseEvent<HTMLElement>) => {
        if (disabled) { event.preventDefault(); return; }
        childClick?.(event);
        onClick?.(event as MouseEvent<HTMLAnchorElement>);
      },
    }));
  }
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled || undefined}
      aria-label={label}
      data-slot="pagination-link"
      data-active={isActive || undefined}
      data-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : props.tabIndex}
      className={cn("ci-pagination__link", className)}
      onClick={(event) => { if (disabled) event.preventDefault(); else onClick?.(event); }}
      {...props}
    >
      {children}
    </a>
  );
}

/** With `asChild` the arrow and the text go inside the child, which stays the only element. */
function edgeContent(children: ReactNode, slot: boolean, content: (text: ReactNode) => ReactNode) {
  if (slot && isValidElement(children)) {
    const child = children as ReactElement<{ children?: ReactNode }>;
    return cloneElement(child, undefined, content(child.props.children));
  }
  return content(children);
}

/** The default name yields to one the `asChild` child already carries. */
function edgeLabel(children: ReactNode, slot: boolean, fallback: string) {
  if (!slot || !isValidElement(children)) return fallback;
  const named = children.props as Record<string, unknown>;
  return named["aria-label"] == null && named["aria-labelledby"] == null ? fallback : undefined;
}

export function PaginationPrevious({ className, children, asChild, ...props }: PaginationLinkProps) {
  const slot = Boolean(asChild) && isValidElement(children);
  return <PaginationLink label={edgeLabel(children, slot, "Go to previous page")} className={cn("ci-pagination__link--edge", className)} asChild={slot} {...props}>{edgeContent(children, slot, (text) => <><ChevronLeft />{text ?? <span>Previous</span>}</>)}</PaginationLink>;
}

export function PaginationNext({ className, children, asChild, ...props }: PaginationLinkProps) {
  const slot = Boolean(asChild) && isValidElement(children);
  return <PaginationLink label={edgeLabel(children, slot, "Go to next page")} className={cn("ci-pagination__link--edge", className)} asChild={slot} {...props}>{edgeContent(children, slot, (text) => <>{text ?? <span>Next</span>}<ChevronRight /></>)}</PaginationLink>;
}

export interface PaginationEllipsisProps extends ComponentProps<"span"> {
  /** Text alternative of the gap, read by screen readers (default "More pages"). */
  label?: string;
}

export function PaginationEllipsis({ className, label = "More pages", ...props }: PaginationEllipsisProps) {
  return <span data-slot="pagination-ellipsis" className={cn("ci-pagination__ellipsis", className)} {...props}><MoreHorizontal aria-hidden="true" /><span className="ci-sr-only">{label}</span></span>;
}

/** "Page X of Y" text for a pager without page numbers; a change of page is announced politely. */
export function PaginationSummary({ className, ...props }: ComponentProps<"span">) {
  return <span aria-live="polite" aria-atomic="true" data-slot="pagination-summary" className={cn("ci-pagination__summary", className)} {...props} />;
}
