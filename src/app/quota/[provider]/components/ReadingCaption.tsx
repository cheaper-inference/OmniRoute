"use client";

import { useFormatter, useTranslations } from "next-intl";

import Badge from "@/shared/components/Badge";

import { DATE_TIME_FORMAT } from "../lib/quotaFormat";

interface ReadingCaptionProps {
  /** A stale reading gets the "may be out of date" badge and its note. */
  stale: boolean;
  resetAt?: string | null;
  footnote?: string;
}

/** The lines under a bar: the stale badge and note, the reset time, then an optional footnote. */
export default function ReadingCaption({ stale, resetAt, footnote }: ReadingCaptionProps) {
  const t = useTranslations("quotaSelf");
  const format = useFormatter();

  return (
    <span className="flex min-w-0 flex-col gap-1">
      {stale ? (
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <Badge variant="warning" size="sm">
            {t("staleBadge")}
          </Badge>
          <span className="min-w-0 break-words">{t("staleNote")}</span>
        </span>
      ) : null}
      {resetAt ? (
        <span>{t("resetsOn", { time: format.dateTime(new Date(resetAt), DATE_TIME_FORMAT) })}</span>
      ) : null}
      {footnote ? <span className="min-w-0 break-words">{footnote}</span> : null}
    </span>
  );
}
