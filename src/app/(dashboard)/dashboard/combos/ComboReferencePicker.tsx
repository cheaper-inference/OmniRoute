"use client";

import { useId, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { SearchableSelect } from "@omniroute/ui-kit/searchable-select";
import type { ComboBuilderComboRefOption } from "@/lib/combos/builderOptions";
import Button from "@/shared/components/Button";
import { normalizeEntitySearch } from "@/shared/utils/entitySearch";
import { filterComboSearchOption, withCurrentAndDefaultOptions } from "./comboSearchOptions";

/**
 * "Reference another combo" picker of the combo builder. Extracted from page.tsx to keep that
 * frozen god-file under its file-size ceiling; the builder hides it for `jev` combos, whose
 * ordered list must stay a flat set of provider models.
 */
export default function ComboReferencePicker({
  value,
  onChange,
  options,
  onAdd,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Pick<ComboBuilderComboRefOption, "name" | "strategy" | "stepCount">[];
  onAdd: () => void;
}) {
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const id = useId();
  const label = t("builderComboRef");
  const referenceOptions = useMemo(
    () =>
      options.map(({ name, strategy, stepCount }) => ({
        value: name,
        label: name,
        description: `${strategy} · ${stepCount} step${stepCount === 1 ? "" : "s"}`,
        keywords: normalizeEntitySearch(`${name} ${strategy}`),
      })),
    [options]
  );

  return (
    <div className="mt-3 pt-3 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-end gap-2">
        <Field
          htmlFor={id}
          label={label}
          className="min-w-0 flex-1"
          data-testid="combo-builder-reference"
        >
          <SearchableSelect
            id={id}
            variant="field"
            label={label}
            searchPlaceholder={tc("search")}
            emptyMessage={tc("noResults")}
            value={value}
            options={withCurrentAndDefaultOptions(referenceOptions, value, {
              value: "",
              label: t("selectComboToReference"),
            })}
            filter={filterComboSearchOption}
            onValueChange={(next) => {
              if (next !== value) onChange(next);
            }}
          />
        </Field>
        <Button
          onClick={onAdd}
          variant="ghost"
          size="sm"
          disabled={!referenceOptions.some((option) => option.value === value)}
        >
          {t("builderAddComboRef")}
        </Button>
      </div>
    </div>
  );
}
