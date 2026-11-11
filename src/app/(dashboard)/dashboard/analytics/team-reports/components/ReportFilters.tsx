"use client";

import { useTranslations } from "next-intl";

import type { AgentSessionReport, ReportBreakdownRow } from "@/lib/usage/agentSessionReports";
import { Button, Input, SegmentedControl, Select } from "@/shared/components";

import {
  FILTER_NONE,
  TIME_PRESETS,
  type ReportFilterState,
  type TimePreset,
} from "../reportFilters";

interface ReportFiltersProps {
  filters: ReportFilterState;
  preset: TimePreset | "custom";
  /** Report for the time window only, so every option stays listed while a filter is active. */
  options: AgentSessionReport["breakdowns"] | null;
  onPreset: (preset: TimePreset) => void;
  onChange: (patch: Partial<ReportFilterState>) => void;
  onClear: () => void;
}

const DIMENSION_FILTERS = [
  { field: "apiKeyId", dimension: "members", labelKey: "member", noneKey: "noneMember" },
  { field: "projectName", dimension: "projects", labelKey: "project", noneKey: "noneProject" },
  { field: "client", dimension: "clients", labelKey: "client", noneKey: "noneClient" },
  { field: "provider", dimension: "providers", labelKey: "provider" },
  { field: "model", dimension: "models", labelKey: "colModel" },
  { field: "connectionId", dimension: "accounts", labelKey: "account" },
] as const;

function optionLabel(row: ReportBreakdownRow): string {
  const name = row.label || row.key;
  return row.detail && row.label ? `${name} (${row.detail})` : name;
}

export default function ReportFilters({
  filters,
  preset,
  options,
  onPreset,
  onChange,
  onClear,
}: ReportFiltersProps) {
  const t = useTranslations("reports");
  const hasDimensionFilter = DIMENSION_FILTERS.some(({ field }) => filters[field]);

  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedControl
          size="sm"
          aria-label={t("timeRange")}
          value={preset}
          onChange={(value) => onPreset(value as TimePreset)}
          options={TIME_PRESETS.map((value) => ({ value, label: t(`preset_${value}`) }))}
        />
        {hasDimensionFilter && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            {t("clearFilters")}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        {(["from", "to"] as const).map((field) => (
          <Input
            key={field}
            type="datetime-local"
            label={t(field)}
            value={filters[field]}
            onChange={(event) => onChange({ [field]: event.target.value })}
          />
        ))}
        {DIMENSION_FILTERS.map((filter) => {
          const { field, dimension, labelKey } = filter;
          const noneKey = "noneKey" in filter ? filter.noneKey : null;
          const rows = (options?.[dimension] ?? []).filter((row) => row.key);
          const selected = filters[field];
          const listed = rows.some((row) => row.key === selected) || selected === FILTER_NONE;
          return (
            <Select
              key={field}
              label={t(labelKey)}
              value={selected}
              placeholder={t("all")}
              placeholderDisabled={false}
              onChange={(event) => onChange({ [field]: event.target.value })}
              options={[
                ...(noneKey ? [{ value: FILTER_NONE, label: t(noneKey) }] : []),
                ...rows.map((row) => ({ value: row.key, label: optionLabel(row) })),
                ...(selected && !listed ? [{ value: selected, label: selected }] : []),
              ]}
            />
          );
        })}
      </div>
    </div>
  );
}
