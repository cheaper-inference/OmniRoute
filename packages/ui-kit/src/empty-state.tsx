import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export interface EmptyStateProps extends Omit<ComponentProps<"div">, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
}

export function EmptyState({ className, icon, title, description, actions, compact = false, ...props }: EmptyStateProps) {
  return (
    <div data-slot="empty-state" data-compact={compact || undefined} className={cn("ci-empty-state", className)} {...props}>
      {icon != null && <span className="ci-empty-state__icon">{icon}</span>}
      <div className="ci-empty-state__content">
        <h3 className="ci-empty-state__title">{title}</h3>
        {description != null && <p className="ci-empty-state__description">{description}</p>}
      </div>
      {actions != null && <div className="ci-empty-state__actions">{actions}</div>}
    </div>
  );
}
