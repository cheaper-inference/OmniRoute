"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { cn } from "./lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type MultiSelectFilterValue =
  | { mode: "all" }
  | { mode: "none" }
  | { mode: "some"; values: string[] };

export interface MultiSelectFilterOption {
  value: string;
  label?: string;
  icon?: ReactNode;
  keywords?: string[];
  disabled?: boolean;
}

export interface MultiSelectFilterProps {
  label: string;
  allLabel: string;
  noneLabel?: string;
  options: MultiSelectFilterOption[];
  value: MultiSelectFilterValue;
  onValueChange: (value: MultiSelectFilterValue) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  align?: "start" | "center" | "end";
  className?: string;
  popoverClassName?: string;
}

export function multiSelectFilterValues(
  options: readonly MultiSelectFilterOption[],
  value: MultiSelectFilterValue,
): string[] {
  if (value.mode === "none") return [];
  if (value.mode === "all") return options.filter((option) => !option.disabled).map((option) => option.value);
  return value.values;
}

export function toggleMultiSelectFilterAll(value: MultiSelectFilterValue): MultiSelectFilterValue {
  return value.mode === "all" ? { mode: "none" } : { mode: "all" };
}

export function toggleMultiSelectFilterOption(
  options: readonly MultiSelectFilterOption[],
  value: MultiSelectFilterValue,
  optionValue: string,
): MultiSelectFilterValue {
  if (options.find((option) => option.value === optionValue)?.disabled) {
    return value;
  }
  const enabledValues = options.filter((option) => !option.disabled).map((option) => option.value);
  const current = multiSelectFilterValues(options, value);
  const next = current.includes(optionValue)
    ? current.filter((candidate) => candidate !== optionValue)
    : [...current, optionValue];
  if (next.length === 0) return { mode: "none" };
  if (enabledValues.length > 0 && enabledValues.every((candidate) => next.includes(candidate))) {
    return { mode: "all" };
  }
  return { mode: "some", values: next };
}

export function filterMultiSelectFilterOptions(
  options: readonly MultiSelectFilterOption[],
  query: string,
): MultiSelectFilterOption[] {
  const wanted = query.trim().toLocaleLowerCase();
  if (!wanted) return [...options];
  return options.filter((option) =>
    [option.label, option.value, ...(option.keywords ?? [])]
      .filter((candidate): candidate is string => Boolean(candidate))
      .some((candidate) => candidate.toLocaleLowerCase().includes(wanted)),
  );
}

export function multiSelectFilterDisplayLabel({
  allLabel,
  noneLabel = "None selected",
  options,
  value,
}: {
  allLabel: string;
  noneLabel?: string;
  options: readonly MultiSelectFilterOption[];
  value: MultiSelectFilterValue;
}): string {
  if (value.mode === "all") return allLabel;
  if (value.mode === "none") return noneLabel;
  if (value.values.length > 1) return `${value.values.length} selected`;
  const selected = value.values[0];
  return options.find((option) => option.value === selected)?.label ?? selected ?? noneLabel;
}

/** Controlled All/Some/None checkbox filter with optional search. */
export function MultiSelectFilter({
  label,
  allLabel,
  noneLabel = "None selected",
  options,
  value,
  onValueChange,
  searchable = false,
  searchPlaceholder = "Search options…",
  align = "start",
  className,
  popoverClassName,
}: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuId = useId();
  const visibleOptions = useMemo(
    () => filterMultiSelectFilterOptions(options, query),
    [options, query],
  );
  const selectedValues = multiSelectFilterValues(options, value);
  const singleOption =
    value.mode === "some" && selectedValues.length === 1
      ? options.find((option) => option.value === selectedValues[0])
      : undefined;
  const displayLabel = multiSelectFilterDisplayLabel({ allLabel, noneLabel, options, value });

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`${label} filter`}
          className={cn("ci-multi-select-filter__trigger", className)}
        >
          <span className="ci-multi-select-filter__value">
            {singleOption?.icon ? <span className="ci-multi-select-filter__icon">{singleOption.icon}</span> : null}
            <span>{displayLabel}</span>
          </span>
          <ChevronDown aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={menuId}
        role="dialog"
        aria-label={`${label} filter options`}
        align={align}
        sideOffset={6}
        className={cn("ci-multi-select-filter__popover", popoverClassName)}
      >
        {searchable && options.length > 0 ? (
          <div className="ci-multi-select-filter__search">
            <Search aria-hidden="true" />
            <Input
              type="text"
              role="searchbox"
              inputMode="search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder.replace(/…$/, "")}
            />
            {query ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`Clear ${label.toLowerCase()} search`}
                onClick={() => setQuery("")}
                className="ci-multi-select-filter__clear"
              >
                <X aria-hidden="true" />
              </Button>
            ) : null}
          </div>
        ) : null}
        <div role="group" aria-label={`${label} options`} className="ci-multi-select-filter__options">
          <div className="ci-multi-select-filter__option" data-selected={value.mode === "all" || undefined}>
            <Checkbox
              checked={value.mode === "all"}
              onCheckedChange={() => onValueChange(toggleMultiSelectFilterAll(value))}
              label={allLabel}
            />
          </div>
          <div className="ci-multi-select-filter__separator" aria-hidden="true" />
          {visibleOptions.map((option) => {
            const checked =
              (value.mode === "all" && !option.disabled) ||
              selectedValues.includes(option.value);
            return (
              <div
                key={option.value}
                className="ci-multi-select-filter__option"
                data-selected={checked || undefined}
              >
                <Checkbox
                  checked={checked}
                  disabled={option.disabled}
                  onCheckedChange={() => onValueChange(toggleMultiSelectFilterOption(options, value, option.value))}
                  label={
                    <span className="ci-multi-select-filter__option-label">
                      {option.icon ? <span className="ci-multi-select-filter__icon">{option.icon}</span> : null}
                      <span>{option.label ?? option.value}</span>
                    </span>
                  }
                />
              </div>
            );
          })}
          {visibleOptions.length === 0 ? (
            <p className="ci-multi-select-filter__empty">No options found.</p>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}
