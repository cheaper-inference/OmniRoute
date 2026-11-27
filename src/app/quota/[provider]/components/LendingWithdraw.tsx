"use client";

import { useTranslations } from "next-intl";

import Button from "@/shared/components/Button";
import type { SelfQuotaPool } from "@/shared/schemas/selfQuota";

import type { LendingActions } from "../lib/useLendingSave";
import { useLendingSubmit, type LendingSaveWatch } from "../lib/useLendingSubmit";
import LendingMessage from "./LendingMessage";

interface LendingWithdrawProps {
  pool: SelfQuotaPool;
  lending: LendingActions;
  watch: LendingSaveWatch;
}

/**
 * A pool that does not lend by consent still lets the holder withdraw a stored percentage, so it
 * cannot apply if the pool lends by consent again. Once the view reports 0, only the message stays.
 */
export default function LendingWithdraw({ pool, lending, watch }: LendingWithdrawProps) {
  const t = useTranslations("quotaSelf");
  const { notice, saving, busy, send, messageRef } = useLendingSubmit(lending, watch);
  const stored = pool.lendingPercent;

  const withdraw = () => {
    if (busy()) return;
    void send({ pool: pool.ref, lendingPercent: 0, lendingUntil: null });
  };

  return (
    <div className="min-w-0 space-y-3">
      {stored > 0 ? (
        <>
          <p className="break-words text-sm">{t("lendingStoredInactive", { percent: stored })}</p>
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            loading={saving}
            onClick={withdraw}
          >
            {t("lendingWithdraw")}
          </Button>
        </>
      ) : null}
      <LendingMessage notice={notice} onReload={lending.reload} ref={messageRef} />
    </div>
  );
}
