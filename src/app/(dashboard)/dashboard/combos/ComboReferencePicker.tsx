"use client";

import Button from "@/shared/components/Button";
import SearchableSelectField from "@/shared/components/SearchableSelectField";
import { getI18nOrFallback } from "./comboPageHelpers";

/**
 * "Reference another combo" picker of the combo builder. Extracted from page.tsx to keep that
 * frozen god-file under its file-size ceiling; the builder hides it for `jev` combos, whose
 * ordered list must stay a flat set of provider models.
 */
export default function ComboReferencePicker({ t, value, onChange, options, onAdd, resetKey }) {
  return (
    <div className="mt-3 pt-3 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-end gap-2">
        <SearchableSelectField
          className="flex-1"
          label={getI18nOrFallback(t, "builderComboRef", "Reference another combo")}
          value={value}
          onValueChange={onChange}
          data-testid="combo-builder-reference"
          resetKey={resetKey}
          placeholder={getI18nOrFallback(
            t,
            "selectComboToReference",
            "Select an existing combo to reference"
          )}
          options={options.map((comboRef) => ({
            value: comboRef.name,
            label: comboRef.name,
            description: `${comboRef.strategy} · ${t("reviewSteps")}: ${comboRef.stepCount}`,
            keywords: [comboRef.strategy],
          }))}
        />
        <Button onClick={onAdd} variant="ghost" size="sm" disabled={!value}>
          {getI18nOrFallback(t, "builderAddComboRef", "Add combo ref")}
        </Button>
      </div>
    </div>
  );
}
