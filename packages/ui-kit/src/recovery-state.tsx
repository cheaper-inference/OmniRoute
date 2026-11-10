import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "./lib/utils";

export interface RecoveryStateProps extends Omit<ComponentProps<"section">, "title"> {
  /** Page replaces a failed layout; section keeps the surrounding navigation. */
  variant?: "page" | "section";
  brand?: ReactNode;
  headerAction?: ReactNode;
  icon?: ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
  reference?: string;
  actions?: ReactNode;
  help?: ReactNode;
  announce?: boolean;
}

/** Router- and provider-independent recovery for failed pages and sections. */
export function RecoveryState({ variant = "page", brand, headerAction, icon, eyebrow, title, description, reference, actions, help, announce = true, className, ...props }: RecoveryStateProps) {
  const id = useId();
  const Heading = variant === "page" ? "h1" : "h2";
  return <section data-slot="recovery-state" data-variant={variant} className={cn("ci-recovery-state", className)} aria-labelledby={id} {...props}>
    {(brand || headerAction) && <header className="ci-recovery-state__header">{brand}<div>{headerAction}</div></header>}
    <div className="ci-recovery-state__body">
      <div className="ci-recovery-state__panel">
        {icon && <span className="ci-recovery-state__icon" aria-hidden="true">{icon}</span>}
        <div className="ci-recovery-state__copy" role={announce ? "alert" : undefined}>
          {eyebrow && <p className="ci-recovery-state__eyebrow">{eyebrow}</p>}
          <Heading id={id} className="ci-recovery-state__title">{title}</Heading>
          <p className="ci-recovery-state__description">{description}</p>
        </div>
        {actions && <div className="ci-recovery-state__actions">{actions}</div>}
        {(help || reference) && <footer className="ci-recovery-state__footer">
          {help && <div>{help}</div>}
          {reference && <p className="ci-recovery-state__reference">Support reference <code>{reference}</code></p>}
        </footer>}
      </div>
    </div>
  </section>;
}
