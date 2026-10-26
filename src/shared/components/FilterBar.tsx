"use client";

/**
 * FilterBar — search input + one select per filter + "clear filters" (KEA-7886 adapters).
 * Used by RequestLoggerV2, ProxyLogger, and similar data tables.
 *
 * Usage:
 *   <FilterBar
 *     searchValue={search}
 *     onSearchChange={setSearch}
 *     placeholder="Search logs..."
 *     filters={[
 *       { key: 'status', label: 'Status', options: ['ok', 'error'] },
 *       { key: 'provider', label: 'Provider', options: ['openai', 'anthropic'] },
 *     ]}
 *     activeFilters={activeFilters}
 *     onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
 *   />
 */

import { useCallback, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

interface FilterDefinition {
  key: string;
  label: string;
  options?: string[];
}

interface FilterBarProps {
  searchValue?: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  filters?: FilterDefinition[];
  activeFilters?: Record<string, string | undefined>;
  onFilterChange: (key: string, value: string) => void;
  children?: ReactNode;
}

export default function FilterBar({
  searchValue = "",
  onSearchChange,
  placeholder,
  filters = [],
  activeFilters = {},
  onFilterChange,
  children,
}: FilterBarProps) {
  const t = useTranslations("common");

  const handleClear = useCallback(() => {
    onSearchChange("");
    filters.forEach((f) => onFilterChange(f.key, ""));
  }, [onSearchChange, filters, onFilterChange]);

  const hasActiveFilters = searchValue || Object.values(activeFilters).some((v) => v && v !== "");

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <Input
        type="search"
        icon="search"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder || t("search")}
        aria-label={t("search")}
        className="min-w-[200px] flex-[1_1_200px]"
      />

      {filters.map((filter) => (
        <Select
          key={filter.key}
          compact
          aria-label={filter.label}
          // The empty option doubles as "all" for this filter, so keep it selectable.
          placeholder={filter.label}
          placeholderDisabled={false}
          options={(filter.options || []).map((opt) => ({ value: opt, label: opt }))}
          value={activeFilters[filter.key] ?? ""}
          onChange={(e) => onFilterChange(filter.key, e.target.value)}
        />
      ))}

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" icon="close" onClick={handleClear}>
          {t("clearFilters")}
        </Button>
      )}

      {/* Extra controls (e.g. refresh button) */}
      {children}
    </div>
  );
}
