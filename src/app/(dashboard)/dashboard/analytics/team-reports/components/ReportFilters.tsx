"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import type { AgentSessionReportFacets } from "@/lib/db/agentSessionReports";
import { Input, SegmentedControl, Select } from "@/shared/components";

import {
  FILTER_DIMENSIONS,
  FILTER_NONE,
  TIME_PRESETS,
  facetName,
  type FilterField,
  type PresetChoice,
  type ReportFilterState,
  type ReportOutcome,
  type TimePreset,
} from "../reportFilters";
import MultiFilter from "./MultiFilter";

/** How long typing pauses before the search text is sent. */
export const SEARCH_DEBOUNCE_MS = 300;

interface ReportFiltersProps {
  filters: ReportFilterState;
  preset: PresetChoice;
  /** Values each dropdown can offer; the API leaves a dropdown's own filter out of its counts. */
  facets: AgentSessionReportFacets | null;
  onPreset: (preset: TimePreset) => void;
  onChange: (patch: Partial<ReportFilterState>) => void;
}

const OUTCOMES = ["success", "error"] as const;

/** Search box that reports its text only after typing pauses. */
function SearchBox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const t = useTranslations("reports");
  const [text, setText] = useState(value);
  const [seen, setSeen] = useState(value);
  // Follow outside changes, such as "Clear all" (state derived from props, no effect needed).
  if (value !== seen) {
    setSeen(value);
    setText(value);
  }
  useEffect(() => {
    if (text === value) return;
    const timer = setTimeout(() => onChange(text), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [text, value, onChange]);

  return (
    <Input
      type="search"
      label={t("search")}
      placeholder={t("searchPlaceholder")}
      value={text}
      maxLength={200}
      onChange={(event) => setText(event.target.value)}
    />
  );
}

export default function ReportFilters({
  filters,
  preset,
  facets,
  onPreset,
  onChange,
}: ReportFiltersProps) {
  const t = useTranslations("reports");
  const onSearch = useCallback((search: string) => onChange({ search }), [onChange]);

  const optionsFor = (
    field: FilterField,
    facet: keyof AgentSessionReportFacets,
    noneKey?: string
  ) => {
    const entries = (facets?.[facet] ?? []).filter((entry) => entry.value);
    const selected = filters[field];
    // A chosen value with no requests under the other filters is still shown, so it can be unticked.
    const missing = selected.filter(
      (value) => value !== FILTER_NONE && !entries.some((e) => e.value === value)
    );
    return [
      ...(noneKey ? [{ value: FILTER_NONE, label: t(noneKey) }] : []),
      ...entries.map((entry) => ({ value: entry.value, label: facetName(entry) })),
      ...missing.map((value) => ({ value, label: value })),
    ];
  };

  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface/30 p-4">
      <SegmentedControl
        semantics="radio"
        size="sm"
        aria-label={t("timeRange")}
        value={preset}
        onChange={(value) => onPreset(value as TimePreset)}
        options={TIME_PRESETS.map((value) => ({ value, label: t(`preset_${value}`) }))}
      />

      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {(["from", "to"] as const).map((field) => (
          <Input
            key={field}
            type="datetime-local"
            label={t(field)}
            value={filters[field]}
            onChange={(event) => onChange({ [field]: event.target.value })}
          />
        ))}
        <Select
          label={t("outcome")}
          value={filters.outcome}
          placeholder={t("all")}
          placeholderDisabled={false}
          onChange={(event) => onChange({ outcome: event.target.value as ReportOutcome })}
          options={OUTCOMES.map((value) => ({ value, label: t(`outcome_${value}`) }))}
        />
        <SearchBox value={filters.search} onChange={onSearch} />
        {FILTER_DIMENSIONS.map(({ field, facet, labelKey, noneKey }) => (
          <MultiFilter
            key={field}
            label={t(labelKey)}
            options={optionsFor(field, facet, noneKey)}
            selected={filters[field]}
            onChange={(values) => onChange({ [field]: values })}
          />
        ))}
      </div>
    </div>
  );
}
