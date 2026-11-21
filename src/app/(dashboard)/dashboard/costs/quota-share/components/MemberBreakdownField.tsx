"use client";

/**
 * Pool wizard option: show key holders anonymous usage bars for the other members of the pool.
 * The privacy warning is always visible. The "too few keys" note appears when the option is on
 * and the pool has fewer than three keys, because the self-service view then sends no bars.
 */

import { useTranslations } from "next-intl";
import Checkbox from "@/shared/components/Checkbox";

const MIN_MEMBER_KEYS = 3;

export default function MemberBreakdownField({
  checked,
  onChange,
  keyCount,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  keyCount: number;
}) {
  const t = useTranslations("quotaShare");
  return (
    <div className="min-w-0 border-t border-border pt-2">
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        label={
          <span className="flex min-w-0 flex-col">
            <span className="text-sm font-semibold text-text-main">
              {t("memberBreakdownLabel")}
            </span>
            <span className="mt-0.5 break-words text-xs text-text-muted">
              {t("memberBreakdownHint")}
            </span>
          </span>
        }
      />
      <p className="mt-1 break-words text-xs text-text-muted">{t("memberBreakdownWarning")}</p>
      {checked && keyCount < MIN_MEMBER_KEYS && (
        <p className="mt-1 break-words text-xs text-text-main">{t("memberBreakdownTooFew")}</p>
      )}
    </div>
  );
}
