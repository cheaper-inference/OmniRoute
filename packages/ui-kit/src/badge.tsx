import { cloneElement, isValidElement } from "react";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { cn } from "./lib/utils";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "live";
export type BadgeShape = "rounded" | "pill" | "circle";

export function badgeVariants(
  options: { variant?: BadgeVariant; shape?: BadgeShape; className?: string } = {},
): string {
  const { variant = "default", shape = "rounded", className } = options;
  return cn("ci-badge", `ci-badge--${variant}`, `ci-badge--${shape}`, className);
}

export interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
  shape?: BadgeShape;
  icon?: ReactNode;
  asChild?: boolean;
}

export function Badge({
  className,
  variant = "default",
  shape = "rounded",
  icon,
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const classes = badgeVariants({ variant, shape, className });
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ...props,
      className: cn(classes, child.props.className as string | undefined),
      children: <>{icon}{child.props.children as ReactNode}</>,
    });
  }
  return <span data-slot="badge" data-variant={variant} data-shape={shape} className={classes} {...props}>{icon}{children}</span>;
}
