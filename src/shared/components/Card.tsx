"use client";

import {
  Card as KitCard,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@omniroute/ui-kit/card";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Material Symbols name, rendered through <Icon> in the header chip. */
  icon?: string;
  action?: React.ReactNode;
  padding?: "none" | "xs" | "sm" | "md" | "lg";
  hover?: boolean;
  /** Kit surface: `subtle` is the neutral gradient for grouped secondary actions (spec §3.6). */
  surface?: "default" | "subtle";
  className?: string;
}

// Legacy box model: the padding lives on the card root and the children render straight into
// it, so a caller's `className` (`p-4`, `flex gap-2`, `grid`, `text-center` — ~180 call sites)
// keeps acting on the element that holds the children. `cn` (tailwind-merge) lets a caller's
// `p-*` replace the default. The kit's own padding lives on CardHeader/CardContent, so the
// adapter never wraps the children in CardContent and zeroes the header padding.
const PADDING = { none: "", xs: "p-3", sm: "p-4", md: "p-6", lg: "p-8" } as const;

/**
 * Card — adapter over the kit Card + CardHeader/CardTitle/CardDescription/CardAction.
 * The title keeps its <h3> (heading semantics) and the subtitle its <p> inside the kit slots.
 */
function Card({
  children,
  title,
  subtitle,
  icon,
  action,
  padding = "md",
  hover = false,
  className,
  ...props
}: CardProps) {
  const hasHeader = Boolean(title || subtitle || action);
  return (
    <KitCard
      className={cn(
        PADDING[padding] ?? PADDING.md,
        hover && "oi-card--hover cursor-pointer transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    >
      {hasHeader && (
        <CardHeader className="mb-4 flex items-center justify-between gap-3 p-0">
          {icon && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-bg-subtle text-text-muted">
              <Icon name={icon} size={20} />
            </span>
          )}
          <div className="min-w-0 flex-1">
            {title && (
              <CardTitle>
                <h3>{title}</h3>
              </CardTitle>
            )}
            {subtitle && (
              <CardDescription>
                <p>{subtitle}</p>
              </CardDescription>
            )}
          </div>
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
      )}
      {children}
    </KitCard>
  );
}

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// Sub-component: Bordered section inside Card
function CardSection({ children, className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn("p-4 rounded-lg", "bg-surface-2", "border border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

// Sub-component: Hoverable row inside Card
function CardRow({ children, className, ...props }: CardRowProps) {
  return (
    <div
      className={cn(
        "p-3 -mx-3 px-3 transition-colors",
        "border-b border-border last:border-b-0",
        "hover:bg-surface-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

// Sub-component: List item with hover actions (macOS style)
function CardListItem({ children, actions, className, ...props }: CardListItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between p-3 -mx-3 px-3",
        "border-b border-border last:border-b-0",
        "hover:bg-surface-2",
        "transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {actions && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          {actions}
        </div>
      )}
    </div>
  );
}

Card.Section = CardSection;
Card.Row = CardRow;
Card.ListItem = CardListItem;

export { CardSection, CardRow, CardListItem };
export default Card;
