"use client";

import { useId } from "react";
import { useFormatter, useTranslations } from "next-intl";

import Badge from "@/shared/components/Badge";

import { DATE_TIME_FORMAT, describeExpiry, type ExpiryView } from "../lib/quotaFormat";

interface ExpiryBadgeProps {
  expiresAt: string | null;
  /** The answer's generatedAt: the time left is counted from it. */
  now: string;
}

/** The catalog key and values of the badge text. */
type ShownExpiry = Exclude<ExpiryView, { kind: "unreadable" }>;

function badgeMessage(view: ShownExpiry): [string, Record<string, number>?] {
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

function badgeVariant(view: ShownExpiry): "default" | "error" | "warning" | "success" {
  if (view.kind === "none") return "default";
  if (view.kind === "days") return view.tone;
  return "error";
}

/**
 * How long the key has left, with its exact date on hover and as a hidden description; nothing
 * when the expiry is unreadable.
 */
export default function ExpiryBadge({ expiresAt, now }: ExpiryBadgeProps) {
  const t = useTranslations("quotaSelf");
  const format = useFormatter();
  const descriptionId = useId();
  const view = describeExpiry(expiresAt, now);
  if (view.kind === "unreadable") return null;
  const title =
    view.kind === "none" || expiresAt === null
      ? undefined
      : t("expiryOn", { date: format.dateTime(new Date(expiresAt), DATE_TIME_FORMAT) });

  // The exact date also as a description, for keyboard and touch users who never get `title`.
  return (
    <>
      <Badge
        variant={badgeVariant(view)}
        title={title}
        aria-describedby={title ? descriptionId : undefined}
      >
        {t(...badgeMessage(view))}
      </Badge>
      {title ? (
        <span id={descriptionId} className="sr-only">
          {title}
        </span>
      ) : null}
    </>
  );
}
