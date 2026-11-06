import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export interface PageHeaderProps extends Omit<ComponentProps<"header">, "title"> {
  eyebrow?: ReactNode;
  breadcrumbs?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
}

export function PageHeader({ className, eyebrow, breadcrumbs, title, description, actions, compact = false, ...props }: PageHeaderProps) {
  return (
    <header data-slot="page-header" data-compact={compact || undefined} className={cn("ci-page-header", className)} {...props}>
      {breadcrumbs != null && <div className="ci-page-header__breadcrumbs">{breadcrumbs}</div>}
      <div className="ci-page-header__row">
        <div className="ci-page-header__content">
          {eyebrow != null && <div className="ci-eyebrow">{eyebrow}</div>}
          <h1 className="ci-page-header__title">{title}</h1>
          {description != null && <p className="ci-page-header__description">{description}</p>}
        </div>
        {actions != null && <div className="ci-page-header__actions">{actions}</div>}
      </div>
    </header>
  );
}

export interface SectionHeaderProps extends Omit<ComponentProps<"header">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export function SectionHeader({ className, title, description, actions, ...props }: SectionHeaderProps) {
  return (
    <header data-slot="section-header" className={cn("ci-section-header", className)} {...props}>
      <div>
        <h2 className="ci-section-header__title">{title}</h2>
        {description != null && <p className="ci-section-header__description">{description}</p>}
      </div>
      {actions != null && <div className="ci-section-header__actions">{actions}</div>}
    </header>
  );
}
