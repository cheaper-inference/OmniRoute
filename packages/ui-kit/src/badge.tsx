import { cloneElement, isValidElement } from "react";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { cn } from "./lib/utils";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "live";
export type BadgeShape = "rounded" | "pill" | "circle";
/** Semantic colour on a subtle tint with AA ink. Omit it to keep the variant's own colours. */
export type BadgeTone = "neutral" | "success" | "warning" | "info" | "danger" | "accent";
/** Chart-series colour: the series ink on its subtle tint, for a badge that names a series drawn in a chart. */
export type BadgeChartTone = "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | "chart-6" | "chart-7" | "chart-8";
/** `sm` is 20px tall for dense tables and card headers; the text stays at 12px. */
export type BadgeSize = "sm" | "md";

export function badgeVariants(
  options: { variant?: BadgeVariant; shape?: BadgeShape; size?: BadgeSize; tone?: BadgeTone | BadgeChartTone; className?: string } = {},
): string {
  const { variant = "default", shape = "rounded", size = "md", tone, className } = options;
  return cn("ci-badge", `ci-badge--${variant}`, `ci-badge--${shape}`, size === "sm" && "ci-badge--sm", tone && `ci-badge--tone-${tone}`, className);
}

export interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
  shape?: BadgeShape;
  /** `md` (24px) by default. `sm` is 20px tall with the same 12px text. */
  size?: BadgeSize;
  /** Status or chart-series colour and tint, on any variant: `outline` also draws its border in the tone. */
  tone?: BadgeTone | BadgeChartTone;
  icon?: ReactNode;
  asChild?: boolean;
}

export function Badge({
  className,
  variant = "default",
  shape = "rounded",
  size = "md",
  tone,
  icon,
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const classes = badgeVariants({ variant, shape, size, tone, className });
  // The default size adds no class or attribute, so existing markup is unchanged.
  const dataSize = size === "sm" ? size : undefined;
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ...props,
      ...(dataSize ? { "data-size": dataSize } : {}),
      ...(tone ? { "data-tone": tone } : {}),
      className: cn(classes, child.props.className as string | undefined),
      children: <>{icon}{child.props.children as ReactNode}</>,
    });
  }
  return <span data-slot="badge" data-variant={variant} data-shape={shape} data-size={dataSize} data-tone={tone} className={classes} {...props}>{icon}{children}</span>;
}
