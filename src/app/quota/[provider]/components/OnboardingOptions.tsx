"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";

import Checkbox from "@/shared/components/Checkbox";
import Select from "@/shared/components/Select";

import type { OnboardingState } from "../lib/onboardingState";

interface OnboardingOptionsProps {
  state: OnboardingState;
  includeKey: boolean;
  onIncludeKey: (next: boolean) => void;
  onMainModel: (id: string) => void;
  onLongContext: (next: boolean) => void;
}

/** The choices that shape the generated settings: the key, the main model and the 1M window. */
export default function OnboardingOptions({
  state,
  includeKey,
  onIncludeKey,
  onMainModel,
  onLongContext,
}: OnboardingOptionsProps) {
  const t = useTranslations("quotaSelf");
  const includeKeyHintId = useId();
  const longContextHintId = useId();

  return (
    <div className="min-w-0 space-y-4">
      <div className="min-w-0 space-y-1">
        <Checkbox
          label={t("onboardingIncludeKey")}
          checked={includeKey}
          aria-describedby={includeKeyHintId}
          onChange={(event) => onIncludeKey(event.target.checked)}
        />
        <p id={includeKeyHintId} className="break-words text-xs text-text-muted">
          {t("onboardingIncludeKeyHint")}
        </p>
      </div>
      {state.models.length > 1 ? (
        <Select
          native
          label={t("onboardingMainModel")}
          options={state.models.map((id) => ({ value: id, label: id }))}
          value={state.mainModel ?? ""}
          onChange={(event) => onMainModel(event.target.value)}
          className="min-w-0 max-w-full"
          selectClassName="min-w-0 max-w-full"
        />
      ) : null}
      {state.totalModels > state.models.length ? (
        <p className="break-words text-xs text-text-muted">
          {t("onboardingModelsTruncated", {
            shown: state.models.length,
            total: state.totalModels,
          })}
        </p>
      ) : null}
      {state.longContextAvailable ? (
        <div className="min-w-0 space-y-1">
          <Checkbox
            label={t("onboardingLongContext")}
            checked={state.longContext}
            aria-describedby={longContextHintId}
            onChange={(event) => onLongContext(event.target.checked)}
          />
          <p id={longContextHintId} className="break-words text-xs text-text-muted">
            {t("onboardingLongContextHint")}
          </p>
        </div>
      ) : null}
    </div>
  );
}
