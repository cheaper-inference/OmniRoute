"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { Select as KitSelect, SelectItem as KitSelectItem } from "@omniroute/ui-kit/select";
import { cn } from "@/shared/utils/cn";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: React.ReactNode;
  options?: SelectOption[];
  placeholder?: string;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  selectClassName?: string;
  /** Keep the placeholder selectable after a real value is chosen. */
  placeholderDisabled?: boolean;
  /** Label and select on one line, with a shorter select (settings rows, cards). */
  compact?: boolean;
}

// Radix Select reserves the empty string for "no value" (it shows the placeholder), so an
// option whose value is "" — e.g. "Auto" / "Default" entries — travels under a sentinel and
// is mapped back to "" before it reaches the caller.
const EMPTY_VALUE = "__omniroute-select-empty__";
const fromKitValue = (value: string) => (value === EMPTY_VALUE ? "" : value);

/**
 * Select — adapter over the kit Field + Select.
 *
 * - `options` → the kit (Radix) Select; `onValueChange` is turned into the legacy
 *   `onChange({ target: { value, name } })` shape every caller reads.
 * - `<option>` children → a native `<select className="ci-select-native">`, because Radix
 *   Select has no DOM `<option>`s; the real change event is passed through untouched.
 */
export default function Select({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  error,
  hint,
  disabled = false,
  required = false,
  className,
  selectClassName,
  placeholderDisabled = true,
  compact = false,
  id: externalId,
  name,
  children,
  "aria-describedby": callerDescribedBy,
  ...props
}: SelectProps) {
  const t = useTranslations("common");
  const generatedId = useId();
  const selectId = externalId || generatedId;
  const errorId = error ? `${selectId}-error` : undefined;
  const hintId = hint && !error ? `${selectId}-hint` : undefined;
  // A caller's aria-describedby is kept and the hint/error ids are appended (legacy let the
  // caller's value through; the adapter must not overwrite it).
  const describedBy = [callerDescribedBy, errorId, hintId].filter(Boolean).join(" ") || undefined;
  // Uncontrolled kit mode: remember the last pick so the hidden form input stays in sync.
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue == null ? "" : String(defaultValue)
  );
  const resolvedPlaceholder = placeholder ?? t("selectOption");
  const useKit = options !== undefined && children == null;

  let control: React.ReactNode;
  if (useKit) {
    const hasEmptyOption = options.some((option) => option.value === "");
    // Legacy: placeholderDisabled={false} left the placeholder <option value=""> pickable
    // (e.g. "All providers" resets a filter). The kit needs it as a real item.
    const pickablePlaceholder = !placeholderDisabled && !hasEmptyOption && !!resolvedPlaceholder;
    const emptyMapsToItem = hasEmptyOption || pickablePlaceholder;
    const toKitValue = (raw: unknown): string | undefined => {
      if (raw === undefined) return undefined;
      const text = raw == null ? "" : String(raw);
      return text === "" && emptyMapsToItem ? EMPTY_VALUE : text;
    };
    const items = [
      ...(pickablePlaceholder ? [{ value: "", label: resolvedPlaceholder, disabled: false }] : []),
      ...options,
    ];
    const kitValue = toKitValue(value);
    control = (
      <KitSelect
        // The remaining <select> attributes (aria-*, data-*, title, focus handlers…) land on the
        // kit root <div>; the kit lifts aria-label/-labelledby/-describedby onto the trigger.
        {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}
        id={selectId}
        // `name` is not forwarded: Radix's hidden <select> would submit the internal empty-value
        // sentinel. The adapter renders its own hidden input with the legacy value instead.
        disabled={disabled}
        required={required}
        error={Boolean(error)}
        size={compact ? "sm" : "md"}
        placeholder={resolvedPlaceholder}
        value={kitValue}
        defaultValue={toKitValue(defaultValue)}
        // DOM hook mirroring the legacy <select>.value (controlled callers) for e2e/tests.
        data-value={kitValue === undefined ? undefined : fromKitValue(kitValue)}
        onValueChange={(next) => {
          if (value === undefined) setUncontrolledValue(fromKitValue(next));
          const target = { value: fromKitValue(next), name };
          onChange?.({
            target,
            currentTarget: target,
          } as unknown as React.ChangeEvent<HTMLSelectElement>);
        }}
        aria-describedby={describedBy}
        className={selectClassName}
      >
        {/* Items rendered by hand (not via `options`) so each keeps its legacy value as
            data-value — the kit Item has no DOM value, unlike the legacy <option>. */}
        {items.map((option) => (
          <KitSelectItem
            key={option.value === "" ? EMPTY_VALUE : option.value}
            value={option.value === "" ? EMPTY_VALUE : option.value}
            disabled={option.disabled}
            data-value={option.value}
          >
            {option.label}
          </KitSelectItem>
        ))}
      </KitSelect>
    );
    if (name) {
      const submitted =
        value === undefined ? uncontrolledValue : value == null ? "" : String(value);
      control = (
        <>
          {control}
          <input type="hidden" name={name} value={submitted} disabled={disabled} />
        </>
      );
    }
  } else {
    control = (
      <select
        id={selectId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "ci-select-native",
          compact && "ci-select-native--sm",
          error && "ci-select-native--error",
          selectClassName
        )}
        {...props}
      >
        {!children && resolvedPlaceholder && (
          <option value="" disabled={placeholderDisabled}>
            {resolvedPlaceholder}
          </option>
        )}
        {children}
      </select>
    );
  }

  // Same a11y workaround as the Input adapter: the kit Field's asterisk is plain text inside
  // the <label> and would end up in the control's accessible name ("Mode*").
  const fieldLabel =
    label != null && label !== "" ? (
      <>
        {label}
        {required && (
          <span className="ci-field__required" aria-hidden="true">
            *
          </span>
        )}
      </>
    ) : undefined;

  return (
    <Field
      htmlFor={selectId}
      label={fieldLabel}
      hint={hint && !error ? <span id={hintId}>{hint}</span> : undefined}
      error={
        error ? (
          <span id={errorId} role="alert">
            {error}
          </span>
        ) : undefined
      }
      className={cn(
        compact ? "flex flex-wrap items-center justify-between gap-x-3 gap-y-1" : "gap-1.5",
        className
      )}
    >
      {compact ? <div className="min-w-0 flex-1 sm:flex-none">{control}</div> : control}
    </Field>
  );
}
