"use client";

import { forwardRef, useId, useMemo, useRef, useState } from "react";
import type { ChangeEvent, CompositionEvent, FocusEvent, KeyboardEvent, ReactNode } from "react";
import { Input, type InputProps } from "./input";
import { cn } from "./lib/utils";

export interface NumberInputProps extends Omit<InputProps, "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"> {
  /** Controlled value. `null` is an empty field; `NaN` and `Infinity` are shown as empty. */
  value?: number | null;
  /** Starting value when the field is uncontrolled. */
  defaultValue?: number | null;
  /** Called with the number as the person types, steps or leaves the field; `null` when there is no number yet. Never `NaN`. */
  onValueChange?: (value: number | null) => void;
  /** Called once with the final value when an edit ends, on blur or Enter. Use it to save. */
  onValueCommit?: (value: number | null) => void;
  /** Lower bound, applied by the arrow keys and, with `clamp`, on blur. `0` or more also blocks the minus sign. */
  min?: number;
  /** Upper bound, applied by the arrow keys and, with `clamp`, on blur. */
  max?: number;
  /** Arrow key increment, counted from `min` (or `0`). Its decimal places set the default `precision`. Default `1`. */
  step?: number;
  /** Most decimal places the person can type. Defaults to the decimal places of `step` and `min`; `0` is whole numbers. */
  precision?: number;
  /** Bring an edited value into `min`/`max` on blur and Enter. Default `true`; an empty field stays empty. */
  clamp?: boolean;
  /** Unit shown at the inline end (`ms`, `%`) and read as the field's description. */
  unit?: ReactNode;
  /** Sets the decimal separator the field shows (`pt-BR` shows `0,7`). Typing accepts `.` and `,` in every locale. */
  locale?: Intl.LocalesArgument;
}

type Separator = "." | ",";
type Draft = { text: string; value: number | null };

const finite = (value: number | null | undefined): number | null => {
  if (value == null || !Number.isFinite(value)) return null;
  return value === 0 ? 0 : value;
};

function localeSeparator(locale: Intl.LocalesArgument | undefined): Separator | undefined {
  if (locale === undefined) return undefined;
  try {
    const decimal = new Intl.NumberFormat(locale).formatToParts(1.5).find((part) => part.type === "decimal")?.value;
    return decimal === "," ? "," : ".";
  } catch {
    return ".";
  }
}

function format(value: number | null, separator: Separator): string {
  if (value === null) return "";
  let text = String(value);
  if (text.includes("e")) text = value.toLocaleString("en-US", { useGrouping: false, maximumFractionDigits: 20 });
  return separator === "," ? text.replace(".", ",") : text;
}

/** Full-width, Arabic-Indic and Persian digits become ASCII; the typographic minus becomes a hyphen; spaces go. */
function normalize(raw: string): string {
  return raw
    .normalize("NFKC")
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
    .replace(/٫/g, ".")
    .replace(/−/g, "-")
    .replace(/\s+/g, "");
}

const SHAPE = /^(-?)(\d*)(?:([.,])(\d*))?$/;

function parse(text: string): number | null {
  const match = SHAPE.exec(text);
  if (!match || (match[2] === "" && !match[4])) return null;
  return finite(Number(text.replace(",", ".")));
}

/** A partial entry (`-`, `1.`, empty) is acceptable. What the current text already has is never refused, so it can be edited down. */
function acceptable(next: string, current: string, allowNegative: boolean, precision: number): boolean {
  const match = SHAPE.exec(next);
  if (!match) return false;
  const before = SHAPE.exec(current);
  if (match[1] && !allowNegative && !before?.[1]) return false;
  if (match[3] && precision === 0 && !before?.[3]) return false;
  const decimals = match[4]?.length ?? 0;
  if (decimals > precision && decimals > (before?.[4]?.length ?? 0)) return false;
  const hasDigits = match[2] !== "" || Boolean(match[4]);
  return !hasDigits || parse(next) !== null;
}

function decimalsOf(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const [mantissa, exponent] = String(value).split("e");
  return Math.max(0, (mantissa.split(".")[1]?.length ?? 0) - Number(exponent ?? 0));
}

/** Rounds away floating-point noise; a result of `-0` (from `-1e-16`) becomes `0`. */
const round = (value: number, decimals: number) => {
  const rounded = Number(value.toFixed(Math.min(decimals, 100)));
  return rounded === 0 ? 0 : rounded;
};

function clampTo(value: number, min: number | undefined, max: number | undefined): number {
  let next = value;
  if (max !== undefined && next > max) next = max;
  if (min !== undefined && next < min) next = min;
  return next;
}

/** The next value on the step grid, which starts at `min` (or `0`), kept inside the range. */
function stepFrom(current: number | null, direction: 1 | -1, step: number, min: number | undefined, max: number | undefined): number {
  if (current === null) {
    const start = clampTo(0, min, max);
    return start === 0 ? clampTo(round(direction * step, decimalsOf(step)), min, max) : start;
  }
  const base = min ?? 0;
  const ratio = (current - base) / step;
  const nearest = Math.round(ratio);
  const onGrid = Math.abs(ratio - nearest) < 1e-9;
  const index = onGrid ? nearest + direction : direction > 0 ? Math.ceil(ratio) : Math.floor(ratio);
  return clampTo(round(base + index * step, Math.max(decimalsOf(step), decimalsOf(base))), min, max);
}

/**
 * A numeric field on `Input`: the value is `number | null`, the text stays the person's while
 * they type, and `min`/`max` apply when they leave. It is a text field with `inputmode`, not
 * `type="number"`, so a decimal comma works, the mouse wheel does not change the value and
 * partial entries are not lost.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value,
    defaultValue,
    onValueChange,
    onValueCommit,
    min,
    max,
    step: stepProp = 1,
    precision: precisionProp,
    clamp = true,
    unit,
    locale,
    className,
    inputMode,
    trailingIcon,
    name,
    form,
    disabled,
    readOnly,
    "aria-describedby": describedBy,
    onKeyDown,
    onBlur,
    onCompositionStart,
    onCompositionEnd,
    ...props
  },
  ref,
) {
  const controlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<number | null>(() => finite(defaultValue));
  const current = controlled ? finite(value) : uncontrolled;

  const step = Number.isFinite(stepProp) && stepProp > 0 ? stepProp : 1;
  const precision = Math.max(0, Math.floor(precisionProp ?? Math.max(decimalsOf(step), decimalsOf(min ?? 0))));
  const allowNegative = min === undefined || !(min >= 0);
  const shownSeparator = useMemo(() => localeSeparator(locale), [locale]);

  // The typed text is kept only while it still stands for the current value, so an outside
  // change, or a change the owner did not accept, shows the owner's value again.
  const [draft, setDraft] = useState<Draft | null>(null);
  const [composing, setComposing] = useState<string | null>(null);
  const isComposing = useRef(false);
  const edited = useRef(false);
  const settled = draft && Object.is(draft.value, current) ? draft.text : format(current, shownSeparator ?? ".");
  // While an input method composes, the field shows its text untouched; it is read when composition ends.
  const text = composing ?? settled;
  // Without a locale, a comma the person typed is kept when the field rewrites the text.
  const separator: Separator = shownSeparator ?? (settled.includes(",") ? "," : ".");

  const unitId = useId();
  const hasUnit = unit != null && unit !== false && unit !== "";

  const emit = (next: number | null) => {
    if (Object.is(next, current)) return;
    if (!controlled) setUncontrolled(next);
    onValueChange?.(next);
  };

  const read = (element: HTMLInputElement) => {
    const raw = element.value;
    const next = normalize(raw);
    if (!acceptable(next, settled, allowNegative, precision)) {
      // Put the text and the caret back where they were instead of letting React move the caret to the end.
      const caret = Math.max(0, (element.selectionStart ?? raw.length) - Math.max(raw.length - settled.length, 0));
      element.value = settled;
      element.setSelectionRange(caret, caret);
      return;
    }
    const parsed = parse(next);
    edited.current = true;
    setDraft({ text: next, value: parsed });
    emit(parsed);
  };

  const commit = () => {
    if (!edited.current) return;
    edited.current = false;
    const final = clamp && current !== null ? clampTo(current, min, max) : current;
    setDraft({ text: format(final, separator), value: final });
    emit(final);
    onValueCommit?.(final);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isComposing.current) setComposing(event.target.value);
    else read(event.target);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || isComposing.current || event.nativeEvent.isComposing) return;
    if (event.key === "Enter") {
      commit();
      return;
    }
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    if (disabled || readOnly || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const next = stepFrom(current, event.key === "ArrowUp" ? 1 : -1, step, min, max);
    // A step past the largest number would be Infinity; the value stays where it is.
    if (!Number.isFinite(next)) return;
    edited.current = true;
    setDraft({ text: format(next, separator), value: next });
    emit(next);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    commit();
  };

  const handleCompositionStart = (event: CompositionEvent<HTMLInputElement>) => {
    isComposing.current = true;
    onCompositionStart?.(event);
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposing.current = false;
    setComposing(null);
    read(event.currentTarget);
    onCompositionEnd?.(event);
  };

  const trailing: ReactNode = hasUnit || trailingIcon != null
    ? <>{hasUnit && <span id={unitId} className="ci-number-input__unit">{unit}</span>}{trailingIcon}</>
    : undefined;

  return (
    <>
      <Input
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        {...props}
        ref={ref}
        type="text"
        inputMode={inputMode ?? (allowNegative ? "text" : precision > 0 ? "decimal" : "numeric")}
        className={cn("ci-number-input", className)}
        trailingIcon={trailing}
        value={text}
        form={form}
        disabled={disabled}
        readOnly={readOnly}
        aria-describedby={[hasUnit ? unitId : null, describedBy].filter(Boolean).join(" ") || undefined}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      {name != null && <input type="hidden" name={name} form={form} disabled={disabled} value={current === null ? "" : String(current)} />}
    </>
  );
});
