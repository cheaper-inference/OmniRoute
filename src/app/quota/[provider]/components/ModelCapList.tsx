"use client";

import { useTranslations } from "next-intl";

import Badge from "@/shared/components/Badge";
import Card from "@/shared/components/Card";
import type { SelfQuotaBlocks } from "@/shared/schemas/selfQuota";

import { amountText, usedText } from "../lib/quotaText";
import { useFormatNumber } from "../lib/useFormatNumber";

interface ModelCapListProps {
  caps: SelfQuotaBlocks["modelCaps"];
}

/** Hourly ceilings on single models for this key: how much of each is used, and which is full. */
export default function ModelCapList({ caps }: ModelCapListProps) {
  const t = useTranslations("quotaSelf");
  const number = useFormatNumber();

  return (
    <Card padding="md">
      <section className="min-w-0 space-y-3">
        <h2 className="ci-heading break-words">{t("modelCapsTitle")}</h2>
        <ul className="min-w-0 space-y-2 text-sm">
          {caps.map((cap) => {
            const limit = amountText(cap.unit, cap.cap, t, number);
            return (
              <li key={`${cap.pool}:${cap.model}`} className="flex min-w-0 flex-col gap-1">
                <span className="min-w-0 break-words">
                  {cap.consumed === null
                    ? t("modelCapUnknown", { model: cap.model, limit })
                    : t("modelCapUsage", {
                        model: cap.model,
                        used: usedText(cap.unit, cap.consumed, t, number),
                        limit,
                      })}
                </span>
                {cap.reached === true ? (
                  <span className="flex min-w-0 items-center gap-2">
                    {/* Decorative: the sentence next to it carries the meaning. */}
                    <Badge variant="warning" size="sm" icon="warning" />
                    <span className="min-w-0 break-words text-warning">{t("modelCapReached")}</span>
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </Card>
  );
}
