"use client";

import { useTranslations } from "next-intl";
import {
  MultiSelectFilter,
  type MultiSelectFilterOption,
  type MultiSelectFilterValue,
} from "@omniroute/ui-kit/multi-select-filter";

import { MAX_FILTER_VALUES } from "../reportFilters";

interface MultiFilterProps {
  label: string;
  options: MultiSelectFilterOption[];
  /** Chosen values; empty means the filter is off (everything is included). */
  selected: string[];
  onChange: (values: string[]) => void;
}

/**
 * The kit's multi-select filter, with "nothing chosen" as its "all" state. The kit shows every
 * box ticked in that state, so the first click would uncheck one option; it is turned back into
 * "only this option" here, which is what picking a value from an unfiltered list means.
 */
export default function MultiFilter({ label, options, selected, onChange }: MultiFilterProps) {
  const t = useTranslations("reports");
  const value: MultiSelectFilterValue =
    selected.length === 0 ? { mode: "all" } : { mode: "some", values: selected };

  const handleChange = (next: MultiSelectFilterValue) => {
    if (selected.length === 0) {
      if (next.mode === "some") {
        const picked = options.filter((option) => !next.values.includes(option.value));
        onChange(picked.map((option) => option.value).slice(0, MAX_FILTER_VALUES));
      } else {
        // A single option unchecked leaves "none"; with one option that means "pick it".
        onChange(next.mode === "none" && options.length === 1 ? [options[0].value] : []);
      }
      return;
    }
    onChange(next.mode === "some" ? next.values.slice(0, MAX_FILTER_VALUES) : []);
  };

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-xs font-medium text-text-muted">{label}</span>
      <MultiSelectFilter
        label={label}
        allLabel={t("all")}
        options={options}
        value={value}
        onValueChange={handleChange}
        searchable
        searchPlaceholder={t("multiSearch")}
        triggerSize="sm"
        className="w-full justify-between"
        labels={{
          selectedCount: (count) => t("multiSelected", { count }),
          trigger: (name) => t("multiTrigger", { label: name }),
          popover: (name) => t("multiPopover", { label: name }),
          optionsGroup: (name) => t("multiOptions", { label: name }),
          clearSearch: (name) => t("multiClearSearch", { label: name }),
          noOptions: t("multiNoOptions"),
        }}
      />
    </div>
  );
}
