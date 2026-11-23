"use client";

import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Toggle from "@/shared/components/Toggle";
import { useTranslations } from "next-intl";
import { KEY_EXPIRY_PRESET_DAYS, wholeDaysFromTtlSeconds } from "@/shared/utils/keyExpiry";
import { composeTtlSeconds, type PolicyEditorFormState } from "../keyTemplatePolicyUtils";

type ExpiryFormState = Pick<
  PolicyEditorFormState,
  "expiryMode" | "expiryTtlValue" | "expiryTtlUnit"
>;

/** Whole days of a relative expiry, or null for "never" and for any non-day duration. */
function relativeWholeDays(formState: ExpiryFormState): number | null {
  if (formState.expiryMode !== "relative") return null;
  return wholeDaysFromTtlSeconds(
    composeTtlSeconds(formState.expiryTtlValue, formState.expiryTtlUnit)
  );
}

/**
 * Quick validity choice for the create-key dialog. It writes the same expiry fields as the full
 * policy editor; "until end of day" is applied to whole-day TTLs when the key is submitted.
 */
export default function KeyExpiryQuickPicker({
  formState,
  onFormStateChange,
  endOfDay,
  onEndOfDayChange,
  disabled = false,
}: {
  formState: ExpiryFormState;
  onFormStateChange: (update: (previous: PolicyEditorFormState) => PolicyEditorFormState) => void;
  endOfDay: boolean;
  onEndOfDayChange: (endOfDay: boolean) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("apiManager");
  const isNever = formState.expiryMode === "none";
  const wholeDays = relativeWholeDays(formState);

  const choosePreset = (days: number) => {
    onFormStateChange((previous) => ({
      ...previous,
      expiryMode: "relative",
      expiryTtlValue: String(days),
      expiryTtlUnit: "days",
    }));
    onEndOfDayChange(true);
  };

  return (
    <Card.Section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("keyValidity")}</p>
        <p className="text-xs text-text-muted">{t("keyValidityDesc")}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={isNever ? "primary" : "ghost"}
          aria-pressed={isNever}
          disabled={disabled}
          onClick={() => onFormStateChange((previous) => ({ ...previous, expiryMode: "none" }))}
        >
          {t("never")}
        </Button>
        {KEY_EXPIRY_PRESET_DAYS.map((days) => (
          <Button
            key={days}
            size="sm"
            variant={wholeDays === days ? "primary" : "ghost"}
            aria-pressed={wholeDays === days}
            disabled={disabled}
            onClick={() => choosePreset(days)}
          >
            {t("keyExpiryPresetDays", { days })}
          </Button>
        ))}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-text-main">{t("keyExpiryEndOfDay")}</p>
          <p className="text-xs text-text-muted">{t("keyExpiryEndOfDayDesc")}</p>
        </div>
        <Toggle
          size="sm"
          className="shrink-0"
          checked={endOfDay}
          disabled={disabled || wholeDays === null}
          onChange={() => onEndOfDayChange(!endOfDay)}
          ariaLabel={t("keyExpiryEndOfDay")}
        />
      </div>
    </Card.Section>
  );
}
