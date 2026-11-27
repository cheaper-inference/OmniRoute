"use client";

import { forwardRef, useId } from "react";
import { useLocale } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import {
  NumberInput as KitNumberInput,
  type NumberInputProps as KitNumberInputProps,
} from "@omniroute/ui-kit/number-input";
import { cn } from "@/shared/utils/cn";

export interface NumberInputProps extends Omit<
  KitNumberInputProps,
  "error" | "unit" | "className" | "leadingIcon" | "trailingIcon"
> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  hint?: React.ReactNode;
  /** Unit shown at the end of the field (`ms`, `%`) and read as part of its description. */
  suffix?: React.ReactNode;
  /** Classes for the kit `Field` wrapper: its place in the layout (`w-24`, `flex-1`). */
  className?: string;
  /** Classes for the `<input>` itself. */
  inputClassName?: string;
}

/**
 * For an owner whose state is a plain `number`: runs `apply` with each number and skips the
 * empty field (`null`), so the last number stays in the state.
 *
 *   <NumberInput value={ms} onValueChange={whenNumber(setMs)} />
 */
export function whenNumber(apply: (value: number) => void) {
  return (value: number | null) => {
    if (value !== null) apply(value);
  };
}

/**
 * NumberInput — the kit numeric field inside the kit `Field`, like the `Input` adapter: `label`,
 * `hint` and `error` with their ids linked to the control.
 *
 * The value is `number | null` (`null` is an empty field). `onValueChange` follows the typing;
 * `onValueCommit` runs once when the edit ends (blur or Enter), after the value was brought into
 * `min`/`max`, and is the place to save. It is a text field with a numeric keyboard, not
 * `type="number"`: a decimal comma works and the mouse wheel does not change the value. The
 * decimal separator shown follows the app locale.
 */
const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    label,
    error,
    hint,
    suffix,
    className,
    inputClassName,
    locale,
    required,
    id: externalId,
    "aria-describedby": describedBy,
    ...props
  },
  ref
) {
  const appLocale = useLocale();
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint && !error ? `${inputId}-hint` : undefined;

  return (
    <Field
      htmlFor={inputId}
      label={label != null && label !== "" ? label : undefined}
      required={required}
      hint={hintId ? <span id={hintId}>{hint}</span> : undefined}
      error={
        error ? (
          <span id={errorId} role="alert">
            {error}
          </span>
        ) : undefined
      }
      className={cn("gap-1.5", className)}
    >
      <KitNumberInput
        {...props}
        ref={ref}
        id={inputId}
        required={required}
        locale={locale ?? appLocale}
        unit={suffix}
        error={Boolean(error)}
        aria-describedby={[errorId, hintId, describedBy].filter(Boolean).join(" ") || undefined}
        className={inputClassName}
      />
    </Field>
  );
});

export default NumberInput;
