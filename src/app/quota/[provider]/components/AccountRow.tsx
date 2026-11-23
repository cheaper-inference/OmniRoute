"use client";

import { useTranslations } from "next-intl";

import type { Policy } from "@/lib/quota/dimensions";
import type { SelfQuotaAccount } from "@/shared/schemas/selfQuota";

import { hasAccountReading, modelWindowsRepeatReason } from "../lib/quotaText";
import ModelWindowList from "./ModelWindowList";
import WindowCard from "./WindowCard";

interface AccountRowProps {
  account: SelfQuotaAccount;
  policy: Policy;
  /** The API's label ("Account 1") is shown only when the pool has several accounts. */
  showLabel: boolean;
  /** The pool lets the key see account readings; an account that still has none says why. */
  accountVisible: boolean;
}

/** One account of the pool: its windows and the key's part of each. */
export default function AccountRow({
  account,
  policy,
  showLabel,
  accountVisible,
}: AccountRowProps) {
  const t = useTranslations("quotaSelf");
  // Windows but no account reading: the key's allowed connections leave this account out.
  const withoutReadings =
    accountVisible &&
    account.dimensions.length > 0 &&
    !hasAccountReading(account) &&
    !account.modelWindows;

  return (
    <section className="min-w-0 space-y-3">
      {showLabel ? <h3 className="break-words text-sm">{account.label}</h3> : null}
      {withoutReadings ? (
        <p className="min-w-0 break-words text-sm text-text-muted">{t("accountHidden")}</p>
      ) : null}
      {account.dimensions.length > 0 ? (
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
          {account.dimensions.map((dimension) => (
            <WindowCard
              key={`${dimension.unit}:${dimension.window}`}
              window={dimension.window}
              unit={dimension.unit}
              limit={dimension.limit}
              reading={dimension.account}
              readingLabel={t("barAccount")}
              share={dimension.yourShare}
              policy={policy}
              members={dimension.members}
            />
          ))}
        </div>
      ) : null}
      {/* Skipped when an account bar of this row already prints the same reason. */}
      {account.modelWindows && !modelWindowsRepeatReason(account) ? (
        <ModelWindowList modelWindows={account.modelWindows} />
      ) : null}
    </section>
  );
}
