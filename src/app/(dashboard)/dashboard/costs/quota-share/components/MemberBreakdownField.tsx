"use client";

/**
 * Pool wizard option: show key holders usage bars, without names, for the other members of the
 * pool. The privacy warning is always visible. When the option is on, a note appears for a pool
 * with fewer than three keys or more than 20, because the self-service view then sends no bars.
 * The wizard counts the keys of its form: it cannot tell which of them can make requests.
 */

import { useTranslations } from "next-intl";
import Checkbox from "@/shared/components/Checkbox";

const MIN_MEMBER_KEYS = 3;
const MAX_MEMBER_KEYS = 20;

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
      {checked && keyCount > MAX_MEMBER_KEYS && (
        <p className="mt-1 break-words text-xs text-text-main">{t("memberBreakdownTooMany")}</p>
      )}
    </div>
  );
}
