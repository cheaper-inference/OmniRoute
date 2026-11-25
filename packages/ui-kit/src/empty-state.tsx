import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export type EmptyStateLayout = "stacked" | "inline";
export type EmptyStateBorder = "solid" | "dashed" | "none";

export interface EmptyStateProps extends Omit<ComponentProps<"div">, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Shorter panel (10rem instead of 16rem). Only the `stacked` layout has a minimum height. */
  compact?: boolean;
  /**
   * `stacked` (default) is the centered panel. `inline` is one line for the empty state of a short
   * list, a field or a table cell: no minimum height, 14px text, a small icon beside the text and the
   * actions at the end of the line. Its title is a paragraph, not a heading.
   */
  layout?: EmptyStateLayout;
  /** Box around the empty state. Defaults to `solid` in the `stacked` layout and `none` in `inline`. */
  border?: EmptyStateBorder;
}

export function EmptyState({ className, icon, title, description, actions, compact = false, layout = "stacked", border, ...props }: EmptyStateProps) {
  const Title = layout === "inline" ? "p" : "h3";
  return (
    <div
      data-slot="empty-state"
      data-compact={compact || undefined}
      data-layout={layout === "inline" ? "inline" : undefined}
      data-border={border}
      className={cn("ci-empty-state", className)}
      {...props}
    >
      {icon != null && <span className="ci-empty-state__icon">{icon}</span>}
      <div className="ci-empty-state__content">
        <Title className="ci-empty-state__title">{title}</Title>
        {description != null && <p className="ci-empty-state__description">{description}</p>}
      </div>
      {actions != null && <div className="ci-empty-state__actions">{actions}</div>}
    </div>
  );
}
