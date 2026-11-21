"use client";

import { useTranslations } from "next-intl";

import Card from "@/shared/components/Card";
import type { SelfQuotaPool } from "@/shared/schemas/selfQuota";

import { accountRowIsEmpty, hasDrawnAccountReading } from "../lib/quotaText";
import AccountRow from "./AccountRow";
import PoolFacts from "./PoolFacts";
import WindowCard from "./WindowCard";

interface PoolSectionProps {
  pool: SelfQuotaPool;
}

/** One Quota Share pool the key belongs to. */
export default function PoolSection({ pool }: PoolSectionProps) {
  const t = useTranslations("quotaSelf");
  const { accounts, dimensions } = pool;
  // An account with no window and nothing else to show gets no row (not a bare heading).
  const rows = accounts.filter((account) => !accountRowIsEmpty(account));
  const lagNote = pool.accountVisible && accounts.some(hasDrawnAccountReading);
  const noWindows =
    dimensions.length === 0 && accounts.every((account) => account.dimensions.length === 0);

  return (
    <Card padding="md">
      <section className="min-w-0 space-y-4">
        <h2 className="ci-heading break-words">{pool.name}</h2>
        <PoolFacts pool={pool} />
        {dimensions.length > 0 ? (
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
            {dimensions.map((dimension) => (
              <WindowCard
                key={`${dimension.unit}:${dimension.window}`}
                window={dimension.window}
                unit={dimension.unit}
                limit={dimension.limit}
                reading={dimension.total}
                readingLabel={t("barPool")}
                share={dimension.yourShare}
                policy={pool.policy}
                members={dimension.members}
              />
            ))}
          </div>
        ) : null}
        {rows.map((account) => (
          <AccountRow
            key={account.slot}
            account={account}
            policy={pool.policy}
            showLabel={accounts.length > 1}
            accountVisible={pool.accountVisible}
          />
        ))}
        {lagNote ? <p className="text-xs text-text-muted">{t("accountLagNote")}</p> : null}
        {noWindows ? <p className="text-sm text-text-muted">{t("noWindows")}</p> : null}
      </section>
    </Card>
  );
}
