"use client";

import type { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@omniroute/ui-kit/card";
import { LoadingState } from "@omniroute/ui-kit/loading-state";
import { Skeleton as KitSkeleton } from "@omniroute/ui-kit/skeleton";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type LoadingType = "spinner" | "page" | "skeleton" | "card";

// Box and glyph share one size so the icon spins around its own centre.
const SPINNER_PX: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 32, xl: 48 };

interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

interface PageLoadingProps {
  message?: string;
  className?: string;
}

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  type?: LoadingType;
  className?: string;
  message?: string;
  size?: SpinnerSize;
  label?: string;
}

// Spinner loading — a labelled status with a decorative Lucide spinner.
export function Spinner({ size = "md", className, label, ...props }: SpinnerProps) {
  const t = useTranslations("common");
  const ariaLabel = label ?? t("loading");
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span className="sr-only">{ariaLabel}</span>
      <Icon
        name="progress_activity"
        size={SPINNER_PX[size]}
        className="text-primary animate-spin motion-reduce:animate-none"
      />
    </span>
  );
}

// Full page loading — the kit panel loader, centred over the viewport (route-level fallback).
export function PageLoading({ message, className }: PageLoadingProps) {
  const t = useTranslations("common");
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg px-6",
        className
      )}
    >
      <LoadingState variant="panel" label={message ?? t("loading")} aria-busy="true" />
    </div>
  );
}

// Skeleton loading — the kit skeleton is aria-hidden and carries `ci-skeleton`.
export function Skeleton({ className, ...props }: SkeletonProps) {
  return <KitSkeleton aria-hidden="true" className={className} {...props} />;
}

// Card skeleton
export function CardSkeleton() {
  return (
    <Card aria-hidden="true">
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <KitSkeleton variant="text" width="40%" />
          <KitSkeleton width={40} height={40} />
        </div>
        <KitSkeleton variant="text" width="30%" />
        <KitSkeleton variant="text" width="50%" />
      </CardContent>
    </Card>
  );
}

// Default export
export default function Loading({
  type = "spinner",
  className,
  message,
  size,
  label,
  ...props
}: LoadingProps) {
  switch (type) {
    case "page":
      return <PageLoading message={message} className={className} />;
    case "skeleton":
      return <Skeleton className={className} {...props} />;
    case "card":
      return <CardSkeleton />;
    default:
      return <Spinner size={size} className={className} label={label} />;
  }
}
