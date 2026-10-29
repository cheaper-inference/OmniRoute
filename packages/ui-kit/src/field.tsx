import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";
import { Label } from "./label";

export type FieldWidth = "compact" | "standard" | "wide" | "full";

/**
 * Field — a labelled form row: Label + control + an optional hint/error message.
 * `error` wins over `hint` and colours the message. Pair `htmlFor` with the
 * control's `id` so clicking the label focuses it.
 */
export interface FieldProps extends ComponentProps<"div"> {
  label?: ReactNode;
  /** Forwarded to the label; should match the control's `id`. */
  htmlFor?: string;
  hint?: ReactNode;
  /** Message text (or just `true` for the red styling with no copy). */
  error?: ReactNode;
  /** Success message (or `true` for green styling with no copy). Error wins. */
  success?: ReactNode;
  /** Appends a red asterisk to the label. */
  required?: boolean;
  /** Span every column when inside a <FieldGroup columns={2}>. */
  full?: boolean;
  /** Constrains the readable control width while still shrinking responsively. */
  width?: FieldWidth;
}

export function Field({
  className,
  label,
  htmlFor,
  hint,
  error,
  success,
  required,
  full,
  width = "full",
  children,
  ...props
}: FieldProps) {
  // Precedence: error → success → hint.
  const isError = Boolean(error);
  const isSuccess = !isError && Boolean(success);
  let message: ReactNode = hint;
  if (isError) message = error === true ? null : error;
  else if (isSuccess) message = success === true ? null : success;

  return (
    <div
      data-slot="field"
      className={cn(
        "ci-field",
        full && "ci-field--full",
        `ci-field--width-${width}`,
        className,
      )}
      {...props}
    >
      {label != null && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="ci-field__required">*</span>}
        </Label>
      )}
      {children}
      {message != null && (
        <div
          className={cn(
            "ci-field__msg",
            isError && "ci-field__msg--error",
            isSuccess && "ci-field__msg--success",
          )}
        >
          {message}
        </div>
      )}
    </div>
  );
}

/** Lays fields out in a responsive 1- or 2-column grid. */
export interface FieldGroupProps extends ComponentProps<"div"> {
  columns?: 1 | 2;
}

export function FieldGroup({
  className,
  columns = 1,
  ...props
}: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "ci-field-group",
        `ci-field-group--${columns}`,
        className,
      )}
      {...props}
    />
  );
}
