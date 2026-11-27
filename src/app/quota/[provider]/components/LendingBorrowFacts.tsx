"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";

import type { SelfQuotaPool } from "@/shared/schemas/selfQuota";

import { lendingBorrowRows } from "../lib/lendingForm";
import { amountText, windowKey } from "../lib/quotaText";
import { useFormatNumber } from "../lib/useFormatNumber";

interface LendingBorrowFactsProps {
  pool: SelfQuotaPool;
}

/** What other keys lend to this key now, in aggregate, or why no figure applies. */
export default function LendingBorrowFacts({ pool }: LendingBorrowFactsProps) {
  const t = useTranslations("quotaSelf");
  const number = useFormatNumber();
  const titleId = useId();
  const facts = lendingBorrowRows(pool);

  if (facts.kind === "none") return null;
  if (facts.kind === "not-applicable") {
    return <p className="break-words text-sm text-text-muted">{t("lendingBorrowNotApplicable")}</p>;
  }
  return (
    <div className="min-w-0 space-y-1">
      <p id={titleId} className="break-words text-sm">
        {t("lendingBorrowTitle")}
      </p>
      <ul aria-labelledby={titleId} className="min-w-0 space-y-1 text-sm text-text-muted">
        {facts.rows.map((row) => {
          const windowName = t(windowKey(row.window));
          return (
            <li key={`${row.unit}:${row.window}`} className="break-words">
              {row.amount === null
                ? t("lendingBorrowUnknown", { window: windowName })
                : t("lendingBorrowAmount", {
                    window: windowName,
                    amount: amountText(row.unit, row.amount, t, number),
                  })}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
