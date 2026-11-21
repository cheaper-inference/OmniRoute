"use client";

import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import { LENDING_UNTIL_MAX_MS, LENDING_UNTIL_MIN_MS } from "@/shared/constants/quotaLending";

interface LendingBadgeProps {
  percent?: number;
  until?: number | null;
  /** The time the consent is judged at (the usage snapshot time), or null when unknown. */
  nowMs: number | null;
}

const DEADLINE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
  timeZoneName: "short",
};

type LendingState =
  | { kind: "open"; percent: number }
  | { kind: "until"; percent: number; until: number }
  | { kind: "expired" };

/**
 * Same bounds as the request schema and the database reader. Outside them a deadline counts as
 * expired: the reader stores 0 for a damaged value, which must never print as a date in 1970.
 */
function readableDeadline(until: number): boolean {
  return Number.isFinite(until) && until >= LENDING_UNTIL_MIN_MS && until <= LENDING_UNTIL_MAX_MS;
}

function lendingState(
  percent: number,
  until: number | null | undefined,
  nowMs: number | null
): LendingState {
  if (until === null || until === undefined) return { kind: "open", percent };
  if (!readableDeadline(until)) return { kind: "expired" };
  if (nowMs !== null && until <= nowMs) return { kind: "expired" };
  return { kind: "until", percent, until };
}

function formatDeadline(until: number): string {
  try {
    return new Date(until).toLocaleString(undefined, DEADLINE_FORMAT);
  } catch {
    return new Date(until).toISOString();
  }
}

/** Read-only badge next to a key that lends part of its idle share. */
export default function LendingBadge({ percent, until, nowMs }: LendingBadgeProps) {
  const t = useTranslations("quotaShare");
  if (typeof percent !== "number" || !(percent > 0)) return null;

  const state = lendingState(Math.min(percent, 100), until, nowMs);
  const text =
    state.kind === "expired"
      ? t("lendingBadgeExpired")
      : state.kind === "until"
        ? t("lendingBadgeUntil", { percent: state.percent, date: formatDeadline(state.until) })
        : t("lendingBadge", { percent: state.percent });

  return (
    <Badge
      size="sm"
      variant={state.kind === "expired" ? "default" : "info"}
      className="shrink-0 text-xs"
      title={text}
    >
      {text}
    </Badge>
  );
}
