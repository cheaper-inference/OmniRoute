"use client";

import Input from "@/shared/components/Input";
import { getI18nOrFallback } from "./comboPageHelpers";

type TranslationFn = {
  (key: string, values?: Record<string, unknown>): string;
  has?: (key: string) => boolean;
};

type Props = {
  contextLength: number | undefined;
  setContextLength: (value: number | undefined) => void;
  contextLengthError: string;
  setContextLengthError: (message: string) => void;
  t: TranslationFn;
  showHint?: boolean;
};

/** Agent features → context length (#454), extracted from ComboFormModal. */
export default function ComboContextLengthField({
  contextLength,
  setContextLength,
  contextLengthError,
  setContextLengthError,
  t,
  showHint = true,
}: Props) {
  return (
    <div>
      <Input
        label={getI18nOrFallback(t, "agentFeaturesContextLength", "Context length")}
        type="number"
        min="1000"
        max="2000000"
        step="1000"
        value={contextLength || ""}
        onChange={(e) => {
          const value = e.target.value;
          setContextLengthError("");
          if (value === "") {
            setContextLength(undefined);
            return;
          }
          const num = Number(value);
          if (isNaN(num) || !Number.isInteger(num)) {
            setContextLengthError(t("agentFeaturesContextLengthErrorInteger"));
            // Keep the raw input value so the user can correct it
          } else if (num < 1000 || num > 2000000) {
            setContextLengthError(t("agentFeaturesContextLengthErrorRange"));
            setContextLength(num);
          } else {
            setContextLength(num);
          }
        }}
        placeholder={getI18nOrFallback(t, "agentFeaturesContextLengthPlaceholder", "e.g. 128000")}
        // Error and hint go through the adapter: aria-invalid + aria-describedby on the input.
        error={contextLengthError || undefined}
        hint={
          showHint
            ? getI18nOrFallback(
                t,
                "agentFeaturesContextLengthHint",
                "Defines the context window for this combo in /v1/models."
              )
            : undefined
        }
      />
    </div>
  );
}
