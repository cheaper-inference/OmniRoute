"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, type PopoverAlign } from "./popover";
import { Input } from "./input";
import { cn } from "./lib/utils";

export interface SearchableSelectOption {
  value: string;
  label: string;
  description?: string;
  keywords?: string;
  icon?: ReactNode;
  disabled?: boolean;
  /** Consecutive options with the same group share an accessible heading. */
  group?: string;
  /** Compact secondary information beside a model ID. */
  metadata?: string;
  trailingLabel?: string;
}

export interface SearchableSelectProps {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SearchableSelectOption[];
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  /** Full-width, rounded rectangular form field, or the compact capsule. */
  variant?: "capsule" | "field";
  /** Align the menu with either edge of the trigger. */
  align?: PopoverAlign;
  /** Compact model rows with IDs, inline metadata, and right-aligned pricing. */
  optionLayout?: "default" | "model";
  /** Always available at the end of the results, including an empty search. */
  action?: { label: string; icon?: ReactNode; disabled?: boolean; onSelect: () => void };
}

/** Single selection with searchable labels, descriptions, and aliases. */
export function SearchableSelect({
  id, value, onValueChange, options, label = "Choose an option",
  placeholder = "Select…", searchPlaceholder = "Search options…",
  emptyMessage = "No matching options", disabled, className,
  variant = "capsule", align = "start", optionLayout = "default", action,
}: SearchableSelectProps) {
  const listId = useId();
  const input = useRef<HTMLInputElement>(null);
  const actionSelected = useRef(false);
  const list = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const selected = options.find((option) => option.value === value);
  const terms = query.toLocaleLowerCase().trim().split(/\s+/);
  const matches = options.filter((option) => {
    const text = `${option.label} ${option.description ?? ""} ${option.keywords ?? ""} ${option.group ?? ""}`.toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
  const actionOption: SearchableSelectOption | undefined = action ? {
    value: `${listId}-action`, label: action.label, icon: action.icon, disabled: action.disabled,
  } : undefined;
  const filtered = actionOption ? [...matches, actionOption] : matches;
  const groups: { label?: string; start: number; options: SearchableSelectOption[] }[] = [];
  matches.forEach((option, index) => {
    const last = groups[groups.length - 1];
    if (last && last.label === option.group) last.options.push(option);
    else groups.push({ label: option.group, start: index, options: [option] });
  });
  const activeOption = filtered[active];
  const optionId = (index: number) => `${listId}-${index}`;

  useEffect(() => {
    if (!open) return;
    // Keep the first group heading visible when opening or clearing a search.
    if (active === 0 && list.current) list.current.scrollTop = 0;
    else document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, listId, query]);

  function changeOpen(next: boolean) {
    setOpen(next);
    if (next) {
      actionSelected.current = false;
      setQuery("");
      const index = options.findIndex((option) => option.value === value && !option.disabled);
      const firstEnabled = options.findIndex(option => !option.disabled);
      setActive(index >= 0 ? index : firstEnabled >= 0 ? firstEnabled : action && !action.disabled ? options.length : 0);
    }
  }
  function select(option: SearchableSelectOption) {
    if (option.disabled) return;
    if (option === actionOption && action) {
      actionSelected.current = true;
      changeOpen(false);
      action.onSelect();
    } else {
      onValueChange(option.value);
      changeOpen(false);
    }
  }
  function move(direction: number) {
    for (let step = 1; step <= filtered.length; step++) {
      const index = (active + direction * step + filtered.length) % filtered.length;
      if (!filtered[index].disabled) { setActive(index); return; }
    }
  }

  function renderOption(option: SearchableSelectOption, index: number, isAction = false) {
    return <div key={option.value} id={optionId(index)}
      role="option" aria-selected={!isAction && option.value === value} aria-disabled={option.disabled || undefined}
      data-active={index === active || undefined}
      className={cn("ci-searchable-select__option", isAction && "ci-searchable-select__action")}
      onMouseMove={() => { if (!option.disabled) setActive(index); }}
      onMouseDown={(event) => event.preventDefault()} onClick={() => select(option)}>
      {option.icon && <span className="ci-searchable-select__icon" aria-hidden="true">{option.icon}</span>}
      <span className="ci-searchable-select__text"><span className="ci-searchable-select__identity">
        <span className="ci-searchable-select__name" title={optionLayout === "model" ? option.label : undefined}>{option.label}</span>
        {option.metadata && <small>{option.metadata}</small>}
      </span>{option.description && <small>{option.description}</small>}</span>
      {option.trailingLabel && <small className="ci-searchable-select__trailing">{option.trailingLabel}</small>}
      {!isAction && optionLayout !== "model" && option.value === value && <Check size={16} aria-hidden="true" />}
    </div>;
  }

  return <Popover open={open} onOpenChange={changeOpen}>
    <PopoverTrigger asChild>
      <button id={id} type="button" disabled={disabled} aria-label={label}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? listId : undefined}
        className={cn("ci-searchable-select__trigger", `ci-searchable-select__trigger--${variant}`, optionLayout === "model" && selected && "ci-searchable-select__trigger--model", className)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault(); changeOpen(true);
          }
        }}>
        {selected?.icon && <span className="ci-searchable-select__icon" aria-hidden="true">{selected.icon}</span>}
        <span className="ci-searchable-select__label">{selected?.label ?? placeholder}</span>
        {optionLayout === "model" && selected?.trailingLabel && <small className="ci-searchable-select__trailing">{selected.trailingLabel}</small>}
        <ChevronDown aria-hidden="true" size={16} />
      </button>
    </PopoverTrigger>
    <PopoverContent className={cn("ci-searchable-select__popover", `ci-searchable-select__popover--${variant}`, optionLayout === "model" && "ci-searchable-select__popover--model")} align={align}
      onCloseAutoFocus={(event) => { if (actionSelected.current) event.preventDefault(); }}
      onOpenAutoFocus={(event) => { event.preventDefault(); input.current?.focus(); }}>
      <div className="ci-searchable-select__search">
        <Input ref={input} type="search" name="option-query" autoComplete="off" autoCorrect="off"
          autoCapitalize="none" spellCheck={false} role="combobox" aria-label={searchPlaceholder}
          aria-expanded={open} aria-autocomplete="list" aria-controls={listId}
          aria-activedescendant={activeOption ? optionId(active) : undefined}
          leadingIcon={<Search size={16} />} value={query} placeholder={searchPlaceholder}
          onChange={(event) => { setQuery(event.target.value); setActive(0); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault(); move(event.key === "ArrowDown" ? 1 : -1);
            } else if (event.key === "Enter") {
              event.preventDefault(); if (activeOption) select(activeOption);
            } else if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              const indices = filtered.map((option, index) => option.disabled ? -1 : index).filter((index) => index >= 0);
              setActive((event.key === "Home" ? indices[0] : indices[indices.length - 1]) ?? 0);
            }
          }} />
      </div>
      <div ref={list} id={listId} role="listbox" aria-label={label} className="ci-searchable-select__options">
        {groups.map((group) => <div key={group.start} role={group.label ? "group" : undefined}
          aria-labelledby={group.label ? `${listId}-group-${group.start}` : undefined}>
          {group.label && <div id={`${listId}-group-${group.start}`} className="ci-searchable-select__group-label">{group.label}</div>}
          {group.options.map((option, offset) => renderOption(option, group.start + offset))}
        </div>)}
        {matches.length === 0 && <p role="status" className="ci-searchable-select__empty">{emptyMessage}</p>}
        {actionOption && renderOption(actionOption, matches.length, true)}
      </div>
    </PopoverContent>
  </Popover>;
}
