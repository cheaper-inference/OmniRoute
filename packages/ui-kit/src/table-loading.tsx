"use client";

import type { ComponentProps, ReactNode } from "react";
import { BrandLoader } from "./brand-loader";
import { cn } from "./lib/utils";

export interface TableLoadingRegionProps extends ComponentProps<"div"> {
  /** The consumer owns request/transition timing; the kit owns the presentation. */
  loading?: boolean;
  loadingLabel?: string;
  loadingIndicator?: ReactNode;
}

/** Retains the current content and scroll position while remote data updates. */
export function TableLoadingRegion({
  loading = false,
  loadingLabel = "Loading table",
  loadingIndicator,
  children,
  className,
  ...props
}: TableLoadingRegionProps) {
  return (
    <div
      {...props}
      data-slot="table-loading-region"
      data-loading={loading ? "true" : undefined}
      className={cn("ci-table-loading-region", className)}
    >
      <div data-slot="table-loading-content" aria-busy={loading} inert={loading || undefined} aria-hidden={loading || undefined}>
        {children}
      </div>
      {loading ? (
        <div data-slot="table-loading-overlay" className="ci-table-loading-overlay">
          <div className="ci-table-loading-overlay__indicator">
            {loadingIndicator ?? <BrandLoader variant="axis" intro={false} size={144} label={loadingLabel} />}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export interface TableLoadingStateProps extends Omit<ComponentProps<"div">, "children"> {
  label?: string;
}

/** Initial-load fallback for routes and asynchronously expanded table content. */
export function TableLoadingState({ label = "Loading table", className, ...props }: TableLoadingStateProps) {
  return (
    <TableLoadingRegion {...props} loading loadingLabel={label} className={cn("ci-table-loading-state", className)}>
      <div className="ci-table-loading-state__rows" aria-hidden="true">
        {Array.from({ length: 6 }, (_, row) => (
          <div key={row} className="ci-table-loading-state__row">
            {Array.from({ length: 4 }, (_, cell) => <span key={cell} />)}
          </div>
        ))}
      </div>
    </TableLoadingRegion>
  );
}
