"use client";

import { useFormatter, useTranslations } from "next-intl";

import Badge from "@/shared/components/Badge";

import { DATE_TIME_FORMAT, describeExpiry, type ExpiryView } from "../lib/quotaFormat";

interface ExpiryBadgeProps {
  expiresAt: string | null;
  /** The answer's generatedAt: the time left is counted from it. */
  now: string;
}

/** The catalog key and values of the badge text. */
function badgeMessage(view: ExpiryView): [string, Record<string, number>?] {
  switch (view.kind) {
    case "none":
      return ["expiryNone"];
    case "soon":
      return ["expirySoon"];
    case "hours":
      return ["expiryHours", { hours: view.hours }];
    case "days":
      return ["expiryDays", { days: view.days }];
  }
}

function badgeVariant(view: ExpiryView): "default" | "error" | "warning" | "success" {
  if (view.kind === "none") return "default";
  if (view.kind === "days") return view.tone;
  return "error";
}

/** How long the key has left, with its exact date on hover. */
export default function ExpiryBadge({ expiresAt, now }: ExpiryBadgeProps) {
  const t = useTranslations("quotaSelf");
  const format = useFormatter();
  const view = describeExpiry(expiresAt, now);
  const title =
    view.kind === "none" || expiresAt === null
      ? undefined
      : t("expiryOn", { date: format.dateTime(new Date(expiresAt), DATE_TIME_FORMAT) });

  return (
    <Badge variant={badgeVariant(view)} title={title}>
      {t(...badgeMessage(view))}
    </Badge>
  );
}
