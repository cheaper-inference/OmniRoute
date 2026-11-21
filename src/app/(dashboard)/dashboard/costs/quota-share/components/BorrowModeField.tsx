"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import SegmentedControl from "@/shared/components/SegmentedControl";
import type { BorrowMode } from "@/lib/quota/dimensions";

interface BorrowModeFieldProps {
  value: BorrowMode;
  onChange: (mode: BorrowMode) => void;
}

const MODES: BorrowMode[] = ["saturation", "consent"];

/** The pool's borrow mode, chosen by the administrator in the pool wizard. */
export default function BorrowModeField({ value, onChange }: BorrowModeFieldProps) {
  const t = useTranslations("quotaShare");
  const hintId = useId();
  const labels: Record<BorrowMode, string> = {
    saturation: t("borrowModeSaturation"),
    consent: t("borrowModeConsent"),
  };
  const hints: Record<BorrowMode, string> = {
    saturation: t("borrowModeSaturationHint"),
    consent: t("borrowModeConsentHint"),
  };

  return (
    <div>
      <span className="ci-eyebrow mb-1 block">{t("borrowModeLabel")}</span>
      <SegmentedControl
        semantics="radio"
        aria-label={t("borrowModeLabel")}
        aria-describedby={hintId}
        size="sm"
        value={value}
        onChange={(next) => onChange(next === "consent" ? "consent" : "saturation")}
        options={MODES.map((mode) => ({ value: mode, label: labels[mode] }))}
      />
      <p id={hintId} className="mt-1 text-xs text-text-muted">
        {hints[value]}
      </p>
    </div>
  );
}
