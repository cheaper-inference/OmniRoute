"use client";

import { useFormatter, useTranslations } from "next-intl";

import type { SelfQuotaPool } from "@/shared/schemas/selfQuota";

import { amountText, policyKey, type FormatNumber } from "../lib/quotaText";

interface PoolFactsProps {
  pool: SelfQuotaPool;
}

/** The pool's rules in words: the key's weight, the policy past the share, a fixed cap. */
export default function PoolFacts({ pool }: PoolFactsProps) {
  const t = useTranslations("quotaSelf");
  const format = useFormatter();
  const number: FormatNumber = (value, options) => format.number(value, options);
  const { cap } = pool;

  return (
    <div className="min-w-0 space-y-1 text-sm">
      <p className="font-medium">{t("poolShare", { weight: Math.round(pool.weight * 10) / 10 })}</p>
      <p className="text-text-muted">{t(policyKey(pool.policy))}</p>
      {cap ? (
        <p className="text-text-muted">
          {t("poolCap", { amount: amountText(cap.unit, cap.value, t, number) })}
        </p>
      ) : null}
      {pool.accountVisible ? null : <p className="text-text-muted">{t("accountHidden")}</p>}
    </div>
  );
}
