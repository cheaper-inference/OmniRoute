import type { ComponentProps } from "react";
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
  label?: string;
}

export function PaginationLink({ className, isActive = false, disabled = false, label, onClick, ...props }: PaginationLinkProps) {
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
    />
  );
}

export function PaginationPrevious({ className, children, ...props }: PaginationLinkProps) {
  return <PaginationLink label="Go to previous page" className={cn("ci-pagination__link--edge", className)} {...props}><ChevronLeft />{children ?? <span>Previous</span>}</PaginationLink>;
}

export function PaginationNext({ className, children, ...props }: PaginationLinkProps) {
  return <PaginationLink label="Go to next page" className={cn("ci-pagination__link--edge", className)} {...props}>{children ?? <span>Next</span>}<ChevronRight /></PaginationLink>;
}

export function PaginationEllipsis({ className, ...props }: ComponentProps<"span">) {
  return <span aria-hidden="true" data-slot="pagination-ellipsis" className={cn("ci-pagination__ellipsis", className)} {...props}><MoreHorizontal /><span className="ci-sr-only">More pages</span></span>;
}
