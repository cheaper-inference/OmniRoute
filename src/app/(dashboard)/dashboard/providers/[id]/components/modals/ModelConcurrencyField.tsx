"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { Textarea } from "@/shared/components";

export interface ModelConcurrencyFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/** Per-model concurrency caps editor (`model=cap`, one per line). */
export default function ModelConcurrencyField({ value, onChange }: ModelConcurrencyFieldProps) {
  const t = useTranslations("providers");
  const id = useId();
  return (
    <Field
      className="col-span-2"
      htmlFor={id}
      label={t("rateLimitOverridesModelConcurrencyLabel")}
      hint={t("rateLimitOverridesModelConcurrencyHint")}
    >
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("rateLimitOverridesModelConcurrencyPlaceholder")}
        rows={3}
        data-testid="model-concurrency-input"
      />
    </Field>
  );
}
