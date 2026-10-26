import type { ComponentProps } from "react";
import { cn } from "./lib/utils";

export type SkeletonVariant = "rectangular" | "circular" | "text";
export type SkeletonAnimation = "pulse" | "wave" | "none";
export interface SkeletonProps extends ComponentProps<"div"> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  animation?: SkeletonAnimation;
}
const dimension = (value: number | string | undefined) => typeof value === "number" ? `${value}px` : value;
export function Skeleton({ className, variant = "rectangular", width, height, animation = "pulse", style, ...props }: SkeletonProps) {
  return <div aria-hidden="true" data-slot="skeleton" data-variant={variant} className={cn("ci-skeleton", `ci-skeleton--${variant}`, animation !== "none" && `ci-skeleton--${animation}`, className)} style={{ width: dimension(width), height: dimension(height), ...style }} {...props} />;
}
