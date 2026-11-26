import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export interface PageHeaderProps extends Omit<ComponentProps<"header">, "title"> {
  eyebrow?: ReactNode;
  breadcrumbs?: ReactNode;
  title: ReactNode;
  /**
   * An icon or a logo before the title, sized from the title and centred on its first line. It is
   * decorative: it sits outside the `<h1>`, hidden from assistive technology, so the heading holds
   * only `title`.
   */
  icon?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
}

export function PageHeader({ className, eyebrow, breadcrumbs, title, icon, description, actions, compact = false, ...props }: PageHeaderProps) {
  const heading = <h1 className="ci-page-header__title">{title}</h1>;
  return (
    <header data-slot="page-header" data-compact={compact || undefined} className={cn("ci-page-header", className)} {...props}>
      {breadcrumbs != null && <div className="ci-page-header__breadcrumbs">{breadcrumbs}</div>}
      <div className="ci-page-header__row">
        <div className="ci-page-header__content">
          {eyebrow != null && <div className="ci-eyebrow">{eyebrow}</div>}
          {icon != null && icon !== false ? (
            <div className="ci-page-header__heading">
              <span className="ci-page-header__icon" aria-hidden="true">{icon}</span>
              {heading}
            </div>
          ) : heading}
          {description != null && <p className="ci-page-header__description">{description}</p>}
        </div>
        {actions != null && <div className="ci-page-header__actions">{actions}</div>}
      </div>
    </header>
  );
}

/** Steps of the interface heading scale (`--ci-type-heading-size-*`): 12, 14, 16, 18 and 20px. */
export type SectionHeaderSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SectionHeaderProps extends Omit<ComponentProps<"header">, "title"> {
  title: ReactNode;
  /** Title size on the heading scale. Without it the title is 18px (`lg`). `xs` and `sm` also set the description to 12px. */
  size?: SectionHeaderSize;
  description?: ReactNode;
  actions?: ReactNode;
  /**
   * The element of the title, `<h2>` by default. Pick the level that keeps the page outline in
   * order, such as `3` for a header inside a card under an `<h2>`. The title looks the same at
   * every level.
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** `bordered` (default) draws the rule under the header; `plain` drops the rule and its padding. */
  variant?: "bordered" | "plain";
}

export function SectionHeader({ className, title, description, actions, size, headingLevel = 2, variant = "bordered", ...props }: SectionHeaderProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6";
  return (
    <header data-slot="section-header" data-size={size} className={cn("ci-section-header", variant === "plain" && "ci-section-header--plain", className)} {...props}>
      <div>
        <Heading className="ci-section-header__title">{title}</Heading>
        {description != null && <p className="ci-section-header__description">{description}</p>}
      </div>
      {actions != null && <div className="ci-section-header__actions">{actions}</div>}
    </header>
  );
}
