import { cloneElement, isValidElement } from "react";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { cn } from "./lib/utils";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "live";
export type BadgeShape = "rounded" | "pill" | "circle";
/** Semantic colour on a subtle tint with AA ink. Omit it to keep the variant's own colours. */
export type BadgeTone = "neutral" | "success" | "warning" | "info" | "danger" | "accent";

export function badgeVariants(
  options: { variant?: BadgeVariant; shape?: BadgeShape; tone?: BadgeTone; className?: string } = {},
): string {
  const { variant = "default", shape = "rounded", tone, className } = options;
  return cn("ci-badge", `ci-badge--${variant}`, `ci-badge--${shape}`, tone && `ci-badge--tone-${tone}`, className);
}

export interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
  shape?: BadgeShape;
  /** Status colour and tint, on any variant: `outline` also draws its border in the tone. */
  tone?: BadgeTone;
  icon?: ReactNode;
  asChild?: boolean;
}

export function Badge({
  className,
  variant = "default",
  shape = "rounded",
  tone,
  icon,
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const classes = badgeVariants({ variant, shape, tone, className });
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ...props,
      ...(tone ? { "data-tone": tone } : {}),
      className: cn(classes, child.props.className as string | undefined),
      children: <>{icon}{child.props.children as ReactNode}</>,
    });
  }
  return <span data-slot="badge" data-variant={variant} data-shape={shape} data-tone={tone} className={classes} {...props}>{icon}{children}</span>;
}
