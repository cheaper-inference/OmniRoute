import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { brandTintVars } from "./brand-tint";
import { cn } from "./lib/utils";

export type CardFooterAlign = "start" | "between" | "end";
export type CardSurface = "default" | "subtle" | "inset";
export interface CardProps extends Omit<ComponentProps<"div">, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  footerAlign?: CardFooterAlign;
  /** Renders `children` edge to edge instead of inside the padded content slot. */
  flush?: boolean;
  /**
   * `subtle`: a neutral gradient for grouped secondary actions.
   * `inset`: a flat, compact panel for one level of nesting inside a card or dialog. It pads itself,
   * so children need no `CardContent` wrapper.
   */
  surface?: CardSurface;
  /** A third-party brand as a tint: `#rgb` or `#rrggbb`. Replaces the `subtle` gradient and recolours an inset; other values are ignored. */
  brandColor?: string;
}

export function Card({ className, title, description, action, footer, footerAlign = "end", flush = false, surface = "default", brandColor, style, children, ...props }: CardProps) {
  const brand = brandTintVars(brandColor);
  const hasHeader = title != null || description != null || action != null;
  const structured = hasHeader || footer != null;
  const inset = surface === "inset";
  return (
    <div data-slot="card" data-surface={inset || (surface === "subtle" && !brand) ? surface : undefined} data-flush={inset && flush ? "" : undefined} className={cn("ci-card", brand && "ci-brand-tint", className)} style={brand ? { ...brand, ...style } as CSSProperties : style} {...props}>
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
