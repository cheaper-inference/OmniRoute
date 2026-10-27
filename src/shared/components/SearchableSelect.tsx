"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { matchesSearch } from "@/shared/utils/turkishText";

interface SearchableSelectProps {
  label: string;
  searchLabel: string;
  emptyLabel: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

type Option = { value: string; label: string };

function Trigger({
  id,
  triggerRef,
  label,
  emptyLabel,
  selected,
  expanded,
  disabled,
  listId,
  onToggle,
  onArrow,
}: {
  id: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  label: string;
  emptyLabel: string;
  selected: Option | undefined;
  expanded: boolean;
  disabled: boolean;
  listId: string;
  onToggle: () => void;
  onArrow: (last: boolean) => void;
}) {
  return (
    <button
      ref={triggerRef}
      id={id}
      type="button"
      disabled={disabled}
      aria-label={label}
      aria-haspopup="listbox"
      aria-expanded={expanded}
      aria-controls={expanded ? listId : undefined}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          onArrow(event.key === "ArrowUp");
        }
      }}
      className="flex w-full items-center gap-2 rounded-control border border-black/10 dark:border-white/10 bg-surface py-2 px-3 text-start text-[16px] sm:text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="min-w-0 flex-1 truncate" title={selected?.label}>
        {selected?.label || emptyLabel}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "material-symbols-outlined text-[20px] text-text-muted transition-transform",
          expanded && "rotate-180"
        )}
      >
        expand_more
      </span>
    </button>
  );
}

function SearchBox({
  inputRef,
  searchLabel,
  listId,
  activeId,
  query,
  onQuery,
  onKeyDown,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
  searchLabel: string;
  listId: string;
  activeId: string | undefined;
  query: string;
  onQuery: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-border/30 p-2">
      <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-text-muted">
        search
      </span>
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-label={searchLabel}
        aria-expanded="true"
        aria-autocomplete="list"
        aria-controls={listId}
        aria-activedescendant={activeId}
        autoComplete="off"
        placeholder={searchLabel}
        value={query}
        onChange={(event) => onQuery(event.target.value)}
        onKeyDown={onKeyDown}
        className="min-w-0 w-full rounded-control border border-border/30 bg-black/[0.03] dark:bg-white/[0.03] py-2 px-2.5 text-[16px] sm:text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
      />
    </div>
  );
}

function OptionList({
  listId,
  label,
  options,
  value,
  activeIndex,
  optionId,
  onChoose,
  onHover,
}: {
  listId: string;
  label: string;
  options: Option[];
  value: string;
  activeIndex: number;
  optionId: (at: number) => string;
  onChoose: (value: string) => void;
  onHover: (at: number) => void;
}) {
  return (
    <div
      id={listId}
      role="listbox"
      aria-label={label}
      className="max-h-64 overflow-y-auto overscroll-contain p-1.5"
    >
      {options.map((option, at) => (
        <button
          id={optionId(at)}
          key={option.value}
          type="button"
          role="option"
          aria-selected={option.value === value}
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onChoose(option.value)}
          onPointerMove={() => onHover(at)}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-start text-sm transition-colors",
            at === activeIndex
              ? "bg-primary/10 text-primary"
              : "text-text-main hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
          )}
        >
          <span className="min-w-0 flex-1 break-words">{option.label}</span>
          {option.value === value && (
            <span aria-hidden="true" className="material-symbols-outlined text-[18px] shrink-0">
              check
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/** Single selection with local search; typing never commits a new value. */
export default function SearchableSelect({
  label,
  searchLabel,
  emptyLabel,
  options,
  value,
  onChange,
  disabled = false,
  className,
}: SearchableSelectProps) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const expanded = open && !disabled;
  const filtered = options.filter((option) => matchesSearch(option.label, query));
  const index = Math.min(active, filtered.length - 1);
  const selected = options.find((option) => option.value === value);
  const listId = `${id}-list`;
  const optionId = (at: number) => `${id}-option-${at}`;

  function show(last = false) {
    if (trigger.current?.matches(":disabled")) return;
    setQuery("");
    setActive(
      last
        ? Math.max(0, options.length - 1)
        : Math.max(
            0,
            options.findIndex((o) => o.value === value)
          )
    );
    setOpen(true);
  }
  function close(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) trigger.current?.focus();
  }
  function choose(next: string) {
    if (disabled || trigger.current?.matches(":disabled")) return;
    onChange(next);
    close(true);
  }

  function onSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      close(true);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (filtered.length)
        setActive(
          (index + (event.key === "ArrowDown" ? 1 : -1) + filtered.length) % filtered.length
        );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (index >= 0) choose(filtered[index].value);
    }
  }

  useEffect(() => {
    if (!expanded) return;
    input.current?.focus();
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [expanded]);
  useEffect(() => {
    if (expanded && index >= 0)
      document.getElementById(`${id}-option-${index}`)?.scrollIntoView?.({ block: "nearest" });
  }, [expanded, index, id]);

  return (
    <div
      ref={root}
      className={cn("relative min-w-0 flex flex-col gap-1.5", className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <label htmlFor={id} className="text-sm font-medium text-text-main">
        {label}
      </label>
      <Trigger
        id={id}
        triggerRef={trigger}
        label={label}
        emptyLabel={emptyLabel}
        selected={selected}
        expanded={expanded}
        disabled={disabled}
        listId={listId}
        onToggle={() => (expanded ? close() : show())}
        onArrow={show}
      />
      {expanded && (
        <div className="absolute inset-x-0 top-full z-50 mt-1.5 rounded-xl border border-border/50 bg-surface shadow-xl">
          <SearchBox
            inputRef={input}
            searchLabel={searchLabel}
            listId={listId}
            activeId={index >= 0 ? optionId(index) : undefined}
            query={query}
            onQuery={(next) => {
              setQuery(next);
              setActive(0);
            }}
            onKeyDown={onSearchKeyDown}
          />
          <OptionList
            listId={listId}
            label={label}
            options={filtered}
            value={value}
            activeIndex={index}
            optionId={optionId}
            onChoose={choose}
            onHover={setActive}
          />
          {!filtered.length && (
            <p role="status" className="px-3 pb-3 text-sm text-text-muted">
              {emptyLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
