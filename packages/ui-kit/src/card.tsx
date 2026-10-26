import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export type CardFooterAlign = "start" | "between" | "end";
export interface CardProps extends Omit<ComponentProps<"div">, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  footerAlign?: CardFooterAlign;
  flush?: boolean;
  /** A subtle neutral gradient for grouped secondary actions. */
  surface?: "default" | "subtle";
}

export function Card({ className, title, description, action, footer, footerAlign = "end", flush = false, surface = "default", children, ...props }: CardProps) {
  const hasHeader = title != null || description != null || action != null;
  const structured = hasHeader || footer != null;
  return (
    <div data-slot="card" data-surface={surface === "subtle" ? surface : undefined} className={cn("ci-card", className)} {...props}>
      {hasHeader && <CardHeader>{title != null && <CardTitle>{title}</CardTitle>}{description != null && <CardDescription>{description}</CardDescription>}{action != null && <CardAction>{action}</CardAction>}</CardHeader>}
      {structured && !flush ? <CardContent>{children}</CardContent> : children}
      {footer != null && <CardFooter align={footerAlign}>{footer}</CardFooter>}
    </div>
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) { return <div data-slot="card-header" className={cn("ci-card__header", className)} {...props} />; }
export function CardTitle({ className, ...props }: ComponentProps<"div">) { return <div data-slot="card-title" className={cn("ci-card__title", className)} {...props} />; }
export function CardDescription({ className, ...props }: ComponentProps<"div">) { return <div data-slot="card-description" className={cn("ci-card__description", className)} {...props} />; }
export function CardAction({ className, ...props }: ComponentProps<"div">) { return <div data-slot="card-action" className={cn("ci-card__action", className)} {...props} />; }
export function CardContent({ className, ...props }: ComponentProps<"div">) { return <div data-slot="card-content" className={cn("ci-card__content", className)} {...props} />; }
export interface CardFooterProps extends ComponentProps<"div"> { align?: CardFooterAlign; }
export function CardFooter({ className, align = "start", ...props }: CardFooterProps) { return <div data-slot="card-footer" className={cn("ci-card__footer", `ci-card__footer--${align}`, className)} {...props} />; }
