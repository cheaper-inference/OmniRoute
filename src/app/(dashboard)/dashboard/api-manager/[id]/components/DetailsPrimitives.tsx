"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import Icon from "@/shared/components/Icon";
import { formatUsdCost } from "../../apiManagerPageUtils";

export function formatCount(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? value : 0
  );
}

export function formatMetricValue(value: number, metric: string, locale: string): string {
  return metric === "usd" ? formatUsdCost(value, locale) : formatCount(value, locale);
}

export function formatDateTime(iso: string | null, locale: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return null;
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

/** Card-like page section with a real `h2` so the page keeps a proper heading outline. */
export function DetailsSection({
  title,
  description,
  icon,
  action,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  icon?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className="min-w-0 rounded-card border border-border bg-surface p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {icon && (
            <span className="rounded-lg bg-bg p-2 text-text-muted">
              <Icon name={icon} size={20} />
            </span>
          )}
          <div className="min-w-0">
            <h2 id={headingId} className="text-base font-semibold text-text-main">
              {title}
            </h2>
            {description && <p className="mt-0.5 text-xs text-text-muted">{description}</p>}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-border px-3 py-4 text-center text-sm text-text-muted">
      {children}
    </p>
  );
}

/** Horizontal utilization bar; `value` is a 0..1 fraction. */
export function UtilizationBar({
  value,
  exceeded = false,
  label,
}: {
  value: number;
  exceeded?: boolean;
  label: string;
}) {
  const percent = Math.round(Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), 1) * 100);
  const color =
    exceeded || percent >= 90 ? "bg-error" : percent >= 70 ? "bg-warning" : "bg-success";
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="h-2 w-full overflow-hidden rounded-full bg-surface-2"
    >
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
    </div>
  );
}

const BADGE_TONES = {
  neutral: "bg-surface-2 text-text-muted",
  good: "bg-success/10 text-success",
  warn: "bg-warning/10 text-warning",
  bad: "bg-error/10 text-error",
} as const;

export function StatusBadge({
  tone = "neutral",
  icon,
  children,
}: {
  tone?: keyof typeof BADGE_TONES;
  icon?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${BADGE_TONES[tone]}`}
    >
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}

/** Inline save/error feedback line shared by the editors. */
export function SaveFeedback({ error, saved }: { error: string | null; saved?: string | null }) {
  if (error) {
    return (
      <p role="alert" className="text-xs text-error">
        {error}
      </p>
    );
  }
  if (saved) {
    return (
      <p role="status" className="text-xs text-success">
        {saved}
      </p>
    );
  }
  return null;
}
