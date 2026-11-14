"use client";

import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import { getI18nOrFallback } from "./comboPageHelpers";

/**
 * "Reference another combo" picker of the combo builder. Extracted from page.tsx to keep that
 * frozen god-file under its file-size ceiling; the builder hides it for `jev` combos, whose
 * ordered list must stay a flat set of provider models.
 */
export default function ComboReferencePicker({ t, value, onChange, options, onAdd }) {
  return (
    <div className="mt-3 pt-3 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-end gap-2">
        <Select
          className="flex-1"
          label={getI18nOrFallback(t, "builderComboRef", "Reference another combo")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={getI18nOrFallback(
            t,
            "selectComboToReference",
            "Select an existing combo to reference"
          )}
          options={options.map((comboRef) => ({
            value: comboRef.name,
            label: `${comboRef.name} · ${comboRef.strategy} · ${comboRef.stepCount} step${
              comboRef.stepCount === 1 ? "" : "s"
            }`,
          }))}
        />
        <Button onClick={onAdd} variant="ghost" size="sm" disabled={!value}>
          {getI18nOrFallback(t, "builderAddComboRef", "Add combo ref")}
        </Button>
      </div>
    </div>
  );
}
