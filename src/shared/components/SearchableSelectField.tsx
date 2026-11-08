"use client";

import {
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Search, X } from "lucide-react";
import { Button } from "@omniroute/ui-kit/button";
import { Field } from "@omniroute/ui-kit/field";
import { Input } from "@omniroute/ui-kit/input";
import { Popover, PopoverContent, PopoverTrigger } from "@omniroute/ui-kit/popover";
import { cn } from "@/shared/utils/cn";
import {
  filterEntityOptions,
  indexEntityOptions,
  type EntitySearchOption,
} from "@/shared/utils/entitySearch";
import { useSelectWindow } from "./useSelectWindow";

export type SearchableSelectOption = EntitySearchOption;
export interface SearchableSelectFieldProps {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly SearchableSelectOption[];
  label?: ReactNode;
  id?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  noOptionsMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: ReactNode;
  hint?: ReactNode;
  name?: string;
  className?: string;
  "data-testid"?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  resetKey?: string | number;
}

function usePickerState(props: SearchableSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeValue, setActiveValue] = useState<string | undefined>();
  const [inDialog, setInDialog] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const composingRef = useRef(false);
  const tabDismissedRef = useRef(false);
  const [previousResetKey, setPreviousResetKey] = useState(props.resetKey);
  // A real scope/privacy change resets query without remounting the focused input.
  if (previousResetKey !== props.resetKey) {
    setPreviousResetKey(props.resetKey);
    setQuery("");
    setActiveValue(undefined);
  }
  if (props.disabled && open) {
    setOpen(false);
    setQuery("");
  }
  function changeOpen(next: boolean) {
    if (next && props.disabled) return;
    if (next) {
      tabDismissedRef.current = false;
      composingRef.current = false;
      setInDialog(!!triggerRef.current?.closest('[data-slot="dialog-content"]'));
    }
    setQuery("");
    setActiveValue(next ? props.value : undefined);
    setOpen(next);
  }
  function changeQuery(next: string) {
    setQuery(next);
    setActiveValue(undefined);
  }
  return {
    open,
    query,
    activeValue,
    inDialog,
    triggerRef,
    inputRef,
    clearButtonRef,
    composingRef,
    tabDismissedRef,
    changeOpen,
    changeQuery,
    setActiveValue,
  };
}

function findActiveOption(
  options: readonly SearchableSelectOption[],
  value: string | undefined,
  query: string
) {
  const current = options.find((option) => !option.disabled && option.value === value);
  const named = query.trim()
    ? options.find((option) => !option.disabled && !option.alwaysVisible)
    : undefined;
  return current ?? named ?? options.find((option) => !option.disabled);
}

function getStatusText(
  props: SearchableSelectFieldProps,
  fallback: { empty: string; noResults: string; loading: string }
) {
  const emptyText =
    props.options.length === 0
      ? (props.noOptionsMessage ?? fallback.empty)
      : (props.emptyMessage ?? fallback.noResults);
  return props.loading ? fallback.loading : props.error || emptyText;
}

function useFieldLabels(props: SearchableSelectFieldProps) {
  const t = useTranslations("common");
  const tSearch = useTranslations("sidebar.commandPalette");
  const generatedId = useId();
  const id = props.id ?? generatedId;
  const detailId = props.error ? `${id}-error` : props.hint ? `${id}-hint` : undefined;
  const describedBy = [props["aria-describedby"], detailId].filter(Boolean).join(" ") || undefined;
  const searchLabel = props.searchPlaceholder ?? t("search");
  const accessibleLabel =
    props["aria-label"] ?? (typeof props.label === "string" ? props.label : searchLabel);
  const statusText = getStatusText(props, {
    empty: t("noData"),
    noResults: t("noResults"),
    loading: t("loading"),
  });
  const selected = props.options.find((option) => option.value === props.value);
  const triggerLabel =
    selected?.label ??
    (props.value !== "" ? props.value : (props.placeholder ?? t("selectOption")));
  return {
    id,
    listId: `${id}-list`,
    describedBy,
    searchLabel,
    accessibleLabel,
    statusText,
    triggerLabel,
    clearLabel: tSearch("clearSearch"),
  };
}

function useSearchableField(props: SearchableSelectFieldProps) {
  const state = usePickerState(props);
  const labels = useFieldLabels(props);
  const searching = state.query.trim() !== "";
  const index = useMemo(() => indexEntityOptions(props.options), [props.options]);
  const matches = useMemo(
    () => (searching ? filterEntityOptions(index, state.query) : props.options),
    [index, state.query, searching, props.options]
  );
  const active = props.loading
    ? undefined
    : findActiveOption(matches, state.activeValue, state.query);
  const activeIndex = active ? matches.indexOf(active) : -1;
  const showStatus =
    props.loading ||
    matches.length === 0 ||
    (state.query.trim() !== "" && matches.every((option) => option.alwaysVisible));
  function select(option: SearchableSelectOption) {
    if (props.disabled || props.loading || option.disabled) return;
    if (option.value !== props.value) props.onValueChange(option.value);
    state.changeOpen(false);
  }
  function move(direction: number) {
    for (let step = 1; step <= matches.length; step++) {
      const next = matches[(activeIndex + direction * step + matches.length) % matches.length];
      if (!next.disabled) {
        state.setActiveValue(next.value);
        return;
      }
    }
  }
  return { ...state, ...labels, matches, active, activeIndex, showStatus, select, move };
}

type Controller = ReturnType<typeof useSearchableField>;
type PartProps = { props: SearchableSelectFieldProps; state: Controller };

function FieldTrigger({ props, state }: PartProps) {
  const { triggerRef } = state;
  return (
    <PopoverTrigger asChild>
      {/* kit-exception: kit searchable field trigger styling without Button variant overrides. */}
      <button
        ref={triggerRef}
        id={state.id}
        type="button"
        disabled={props.disabled}
        data-testid={props["data-testid"]}
        data-value={props.value}
        aria-label={props["aria-label"]}
        aria-haspopup="listbox"
        aria-expanded={state.open}
        aria-controls={state.open ? state.listId : undefined}
        data-invalid={!!props.error || undefined}
        aria-describedby={state.describedBy}
        className="ci-searchable-select__trigger ci-searchable-select__trigger--field text-start"
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
            event.preventDefault();
            event.stopPropagation();
            state.changeOpen(true);
          }
        }}
      >
        <bdi className="ci-searchable-select__label">{state.triggerLabel}</bdi>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
    </PopoverTrigger>
  );
}

function handleQueryKey(event: KeyboardEvent<HTMLInputElement>, state: Controller) {
  if (event.key === "Enter") {
    event.stopPropagation();
    if (state.composingRef.current || event.nativeEvent.isComposing || event.keyCode === 229)
      return;
    event.preventDefault();
    if (state.active) state.select(state.active);
  } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    if (state.composingRef.current) return;
    event.preventDefault();
    state.move(event.key === "ArrowDown" ? 1 : -1);
  } else if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    state.changeOpen(false);
  }
}

function QueryField({ props, state }: PartProps) {
  const { inputRef, clearButtonRef, composingRef } = state;
  return (
    <div className="ci-searchable-select__search flex items-center gap-1">
      <Input
        ref={inputRef}
        value={state.query}
        role="combobox"
        aria-label={state.searchLabel}
        aria-expanded={state.open}
        aria-autocomplete="list"
        aria-controls={state.listId}
        aria-describedby={state.describedBy}
        aria-invalid={!!props.error || undefined}
        aria-activedescendant={state.active ? `${state.listId}-${state.activeIndex}` : undefined}
        placeholder={state.searchLabel}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        leadingIcon={<Search size={16} />}
        className="min-w-0"
        onChange={(event) => state.changeQuery(event.target.value)}
        onCompositionStart={() => {
          composingRef.current = true;
        }}
        onCompositionEnd={() => {
          composingRef.current = false;
        }}
        onKeyDown={(event) => handleQueryKey(event, state)}
      />
      {state.query && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={state.clearLabel}
          ref={clearButtonRef}
          onClick={() => {
            state.changeQuery("");
            state.inputRef.current?.focus();
          }}
        >
          <X size={16} aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}

function OptionRow({
  props,
  state,
  option,
  index,
  style,
}: PartProps & { option: SearchableSelectOption; index: number; style?: CSSProperties }) {
  return (
    <div
      id={`${state.listId}-${index}`}
      role="option"
      data-option-index={index}
      aria-posinset={index + 1}
      aria-setsize={state.matches.length}
      style={style}
      aria-label={[option.label, option.description].filter(Boolean).join(" ")}
      aria-selected={option.value === props.value}
      aria-disabled={option.disabled || undefined}
      data-active={option === state.active || undefined}
      data-value={option.value}
      className="ci-searchable-select__option"
      onMouseMove={() => {
        if (!option.disabled) state.setActiveValue(option.value);
      }}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => state.select(option)}
    >
      <span className="ci-searchable-select__text">
        <bdi className="whitespace-normal [overflow-wrap:anywhere]">{option.label}</bdi>
        {option.description && (
          <small className="whitespace-normal [overflow-wrap:anywhere]">
            <bdi>{option.description}</bdi>
          </small>
        )}
      </span>
    </div>
  );
}

function OptionList({ props, state }: PartProps) {
  const { ref, indexes, offsets, enabled, onScroll } = useSelectWindow(
    props.loading ? 0 : state.matches.length,
    state.activeIndex
  );
  const rows = indexes.map((index) => (
    <OptionRow
      key={state.matches[index].value}
      props={props}
      state={state}
      option={state.matches[index]}
      index={index}
      style={
        enabled
          ? {
              position: "absolute",
              top: offsets[index],
              width: "100%",
            }
          : undefined
      }
    />
  ));
  return (
    <div
      id={state.listId}
      role="listbox"
      ref={ref}
      onScroll={onScroll}
      style={{
        overflowAnchor: "none",
        contain: "layout paint",
        // Radix publishes available height after initial layout. Bound that first
        // layout too, before an estimated spacer can expand the viewport.
        maxHeight: "min(20rem, calc(var(--radix-popover-content-available-height, 25rem) - 5rem))",
      }}
      aria-label={state.accessibleLabel}
      aria-busy={props.loading || undefined}
      className="ci-searchable-select__options"
    >
      {enabled ? (
        <div
          role="presentation"
          style={{ position: "relative", height: offsets[state.matches.length] }}
        >
          {rows}
        </div>
      ) : (
        rows
      )}
      {state.showStatus && (
        <p role="status" className="ci-searchable-select__empty">
          {state.statusText}
        </p>
      )}
    </div>
  );
}

function handlePopupTab(event: KeyboardEvent<HTMLDivElement>, state: Controller) {
  if (event.key !== "Tab") return;
  const leaving = event.shiftKey
    ? event.target === state.inputRef.current
    : !state.query || event.target === state.clearButtonRef.current;
  if (leaving) {
    state.tabDismissedRef.current = true;
    state.triggerRef.current?.focus();
    state.changeOpen(false);
  }
}

function FieldPopup({ props, state }: PartProps) {
  return (
    <PopoverContent
      // Body portal avoids dialog clipping; the existing modal token avoids a magic z-index.
      style={state.inDialog ? { zIndex: "var(--ci-z-modal)" } : undefined}
      onCloseAutoFocus={(event) => {
        // Radix restores focus asynchronously. A second picker may already own focus.
        const focused = document.activeElement;
        if (
          state.tabDismissedRef.current ||
          (focused instanceof HTMLElement &&
            focused !== document.body &&
            focused !== state.triggerRef.current)
        )
          event.preventDefault();
      }}
      onKeyDown={(event) => handlePopupTab(event, state)}
      aria-label={state.accessibleLabel}
      className="ci-searchable-select__popover ci-searchable-select__popover--field"
      onOpenAutoFocus={(event) => {
        event.preventDefault();
        state.inputRef.current?.focus();
      }}
      onEscapeKeyDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        state.changeOpen(false);
      }}
    >
      <QueryField props={props} state={state} />
      <OptionList key={state.query} props={props} state={state} />
    </PopoverContent>
  );
}

/** App-owned filtering and editing over kit primitives. The high-level picker has no
 * controlled query/filter and captures Home/End. No value passes through a sentinel.
 */
export default function SearchableSelectField(props: SearchableSelectFieldProps) {
  const state = useSearchableField(props);
  return (
    <Field
      htmlFor={state.id}
      label={props.label}
      className={cn("min-w-0 gap-1.5", props.className)}
      hint={
        !props.error && props.hint ? <span id={`${state.id}-hint`}>{props.hint}</span> : undefined
      }
      error={
        props.error ? (
          <span id={`${state.id}-error`} role="alert">
            {props.error}
          </span>
        ) : undefined
      }
    >
      <Popover open={state.open} onOpenChange={state.changeOpen}>
        <FieldTrigger props={props} state={state} />
        <FieldPopup props={props} state={state} />
      </Popover>
      {/* kit-exception: exact-value form serialization; query input is deliberately unnamed. */}
      {props.name && (
        <input type="hidden" name={props.name} value={props.value} disabled={props.disabled} />
      )}
    </Field>
  );
}
