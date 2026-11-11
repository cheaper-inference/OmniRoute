"use client";

import { useTranslations } from "next-intl";
import { ScopeChip } from "@omniroute/ui-kit/scope-chip";

import type { AgentSessionReportFacets } from "@/lib/db/agentSessionReports";
import { Button } from "@/shared/components";

import {
  FILTER_DIMENSIONS,
  FILTER_NONE,
  facetName,
  hasDimensionFilter,
  type ReportFilterState,
} from "../reportFilters";

interface FilterChipsProps {
  filters: ReportFilterState;
  facets: AgentSessionReportFacets | null;
  onChange: (patch: Partial<ReportFilterState>) => void;
  onClear: () => void;
}

interface Chip {
  id: string;
  label: string;
  value: string;
  onRemove: () => void;
}

/** Every active filter as a removable chip; values show the facet label, not the raw id. */
export default function FilterChips({ filters, facets, onChange, onClear }: FilterChipsProps) {
  const t = useTranslations("reports");

  const valueLabel = (
    facet: keyof AgentSessionReportFacets,
    noneKey: string | undefined,
    value: string
  ) => {
    if (value === FILTER_NONE) return noneKey ? t(noneKey) : t("noValue");
    const entry = facets?.[facet]?.find((candidate) => candidate.value === value);
    return entry ? facetName(entry) : value;
  };

  const chips: Chip[] = FILTER_DIMENSIONS.flatMap(({ field, facet, labelKey, noneKey }) =>
    filters[field].map((value) => ({
      id: `${field}:${value}`,
      label: t(labelKey),
      value: valueLabel(facet, noneKey, value),
      onRemove: () => onChange({ [field]: filters[field].filter((other) => other !== value) }),
    }))
  );
  if (filters.outcome) {
    chips.push({
      id: "outcome",
      label: t("outcome"),
      value: t(`outcome_${filters.outcome}`),
      onRemove: () => onChange({ outcome: "" }),
    });
  }
  if (filters.search.trim()) {
    chips.push({
      id: "search",
      label: t("search"),
      value: filters.search.trim(),
      onRemove: () => onChange({ search: "" }),
    });
  }
  if (!hasDimensionFilter(filters)) return null;

  return (
    <div role="group" aria-label={t("activeFilters")} className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <ScopeChip
          key={chip.id}
          variant="outline"
          removeLabel={t("removeFilter", { name: `${chip.label}: ${chip.value}` })}
          onRemove={chip.onRemove}
        >
          {chip.label}: {chip.value}
        </ScopeChip>
      ))}
      <Button variant="ghost" size="sm" onClick={onClear}>
        {t("clearAll")}
      </Button>
    </div>
  );
}
