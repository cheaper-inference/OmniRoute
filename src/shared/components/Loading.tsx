"use client";

import type { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@omniroute/ui-kit/card";
import { LoadingState } from "@omniroute/ui-kit/loading-state";
import { Skeleton as KitSkeleton } from "@omniroute/ui-kit/skeleton";
import {
  Spinner as KitSpinner,
  type SpinnerProps as KitSpinnerProps,
} from "@omniroute/ui-kit/spinner";
import { cn } from "@/shared/utils/cn";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
type LoadingType = "spinner" | "page" | "skeleton" | "card";

// 12/16/24/32/48px. The kit box stops at 20px and calls that `md`, so the steps above `sm` keep
// this scale with a utility, which beats the kit rule (`@layer components`).
const SPINNER_BOX: Partial<Record<SpinnerSize, string>> = {
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
};

interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  className?: string;
  label?: string;
  /**
   * Hidden from assistive technology and drawn in the surrounding text colour, for a spinner in a
   * named button or next to text that already says what is loading. Ignores `label`.
   */
  decorative?: boolean;
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

// A separate component so a decorative spinner needs no translations.
function StatusSpinner({
  label,
  className,
  ...props
}: Omit<KitSpinnerProps, "label"> & { label?: string }) {
  const t = useTranslations("common");
  const ariaLabel = label ?? t("loading");
  return (
    <KitSpinner
      aria-live="polite"
      aria-label={ariaLabel}
      label={ariaLabel}
      className={cn("text-primary", className)}
      {...props}
    />
  );
}

// Spinner loading — the kit spinner, a labelled status unless `decorative`.
export function Spinner({
  size = "md",
  className,
  label,
  decorative = false,
  ...props
}: SpinnerProps) {
  const kitSize = size === "xs" ? "xs" : "sm";
  const box = cn(SPINNER_BOX[size], className);
  if (decorative) return <KitSpinner size={kitSize} className={box} {...props} />;
  return <StatusSpinner size={kitSize} className={box} label={label} {...props} />;
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
