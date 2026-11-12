"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import CodexResetCreditsModal from "../../../usage/components/ProviderLimits/CodexResetCreditsModal";
import { useCodexResetCreditRedemption } from "../../../usage/components/ProviderLimits/useCodexResetCreditRedemption";
import { translateUsageOrFallback } from "../../../usage/components/ProviderLimits/i18nFallback";

export default function CodexResetCreditsAction({
  connectionId,
  count,
  onRefresh,
}: {
  connectionId: string;
  count?: number;
  onRefresh?: () => void;
}) {
  const t = useTranslations("usage");
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [, setQuotaData] = useState<Record<string, unknown>>({});
  const [, setLastRefreshedAt] = useState<Record<string, string>>({});
  const redemption = useCodexResetCreditRedemption(
    (key, fallback, values) => translateUsageOrFallback(t, key, fallback, values),
    setErrors,
    setQuotaData,
    setLastRefreshedAt,
    () => onRefresh?.()
  );
  const picker = redemption.resetCreditPicker;
  if (typeof count !== "number" || !Number.isFinite(count) || count <= 0) return null;
  return (
    <>
      <Button
        size="sm"
        variant="outline"
        icon="restart_alt"
        loading={redemption.loadingResetCreditsId !== null}
        disabled={
          redemption.loadingResetCreditsId !== null || redemption.redeemingResetCreditId !== null
        }
        onClick={() => void redemption.openCodexResetCredits(connectionId, "codex")}
      >
        {translateUsageOrFallback(t, "redeemResetCredit", "Redeem reset")} ({count})
      </Button>
      {errors[connectionId] && (
        <span role="alert" className="max-w-xs break-words text-xs text-error">
          {errors[connectionId]}
        </span>
      )}
      {picker && (
        <CodexResetCreditsModal
          isOpen
          credits={picker.credits}
          availableCount={picker.availableCount}
          provider={picker.provider}
          loading={redemption.redeemingResetCreditId !== null}
          onClose={redemption.closeResetCreditPicker}
          onRedeem={redemption.redeemCodexResetCredit}
        />
      )}
    </>
  );
}
