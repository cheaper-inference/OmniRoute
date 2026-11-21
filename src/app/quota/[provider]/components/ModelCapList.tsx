"use client";

import { useTranslations } from "next-intl";

import Badge from "@/shared/components/Badge";
import Card from "@/shared/components/Card";
import type { SelfQuotaBlocks } from "@/shared/schemas/selfQuota";

import { amountText, usedText } from "../lib/quotaText";
import { useFormatNumber } from "../lib/useFormatNumber";

interface ModelCapListProps {
  caps: SelfQuotaBlocks["modelCaps"];
  /** Pool ref to pool name, for the pools of this answer. */
  poolNames: ReadonlyMap<string, string>;
}

/**
 * Hourly ceilings on single models for this key: how much of each is used, and which is full.
 * When the caps come from more than one pool, each row also names its pool.
 */
export default function ModelCapList({ caps, poolNames }: ModelCapListProps) {
  const t = useTranslations("quotaSelf");
  const number = useFormatNumber();
  const showPool = new Set(caps.map((cap) => cap.pool)).size > 1;

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
                {showPool ? (
                  <span className="min-w-0 break-words text-text-muted">
                    {t("modelCapPool", { pool: poolNames.get(cap.pool) ?? cap.pool })}
                  </span>
                ) : null}
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
