"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";

import Button from "@/shared/components/Button";
import type { SelfQuotaAccount } from "@/shared/schemas/selfQuota";

import { reasonKey } from "../lib/quotaText";
import QuotaReading from "./QuotaReading";

// A phone shows this many limits before the "show all" button.
const MODEL_WINDOWS_COLLAPSED_COUNT = 6;

interface ModelWindowListProps {
  modelWindows: NonNullable<SelfQuotaAccount["modelWindows"]>;
}

/**
 * The account's own per-model limits, as reported by the provider. They belong to the whole
 * account, so nothing here speaks of the key's share.
 */
export default function ModelWindowList({ modelWindows }: ModelWindowListProps) {
  const t = useTranslations("quotaSelf");
  const titleId = useId();
  const [expanded, setExpanded] = useState(false);
  const { status, reason, windows } = modelWindows;

  if (status === "unavailable") {
    return (
      <section className="min-w-0 space-y-1">
        <h4 className="text-sm">{t("modelWindowsTitle")}</h4>
        <p className="min-w-0 break-words text-sm text-text-muted">{t(reasonKey(reason))}</p>
      </section>
    );
  }
  if (windows.length === 0) return null;

  const collapsible = windows.length > MODEL_WINDOWS_COLLAPSED_COUNT;
  const shown =
    collapsible && !expanded ? windows.slice(0, MODEL_WINDOWS_COLLAPSED_COUNT) : windows;

  return (
    <section className="min-w-0 space-y-2">
      <h4 id={titleId} className="text-sm">
        {t("modelWindowsTitle")}
      </h4>
      <p className="min-w-0 break-words text-xs text-text-muted">{t("modelWindowsNote")}</p>
      <ul aria-labelledby={titleId} className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
        {shown.map((window, index) => (
          // Labels come from the provider and may repeat; the position keeps keys unique.
          <li key={`${index}:${window.label}`} className="min-w-0">
            <QuotaReading
              label={window.label}
              unit="percent"
              limit={100}
              used={window.usedPercent}
              status={status}
              resetAt={window.resetAt}
            />
          </li>
        ))}
      </ul>
      {collapsible ? (
        <Button
          variant="ghost"
          size="sm"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded
            ? t("modelWindowsShowFewer")
            : t("modelWindowsShowAll", { count: windows.length })}
        </Button>
      ) : null}
    </section>
  );
}
