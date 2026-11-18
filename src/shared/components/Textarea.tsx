"use client";

import { forwardRef, useId } from "react";
import { Field } from "@omniroute/ui-kit/field";
import { Textarea as KitTextarea } from "@omniroute/ui-kit/textarea";
import { cn } from "@/shared/utils/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  /** Visible label: wraps the control in the kit `Field` (like `Input`). */
  label?: React.ReactNode;
  /** Helper text under the control, announced through aria-describedby. Needs `label`. */
  hint?: React.ReactNode;
  /** Classes for the `Field` wrapper; `className` stays on the textarea. */
  fieldClassName?: string;
}

/**
 * Textarea — adapter over the kit Textarea (same border, focus ring and radius as Input).
 * `error` maps to the kit's error border and marks the control `aria-invalid`. Without a
 * `label` it renders the bare control, as it always did.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { error = false, className, label, hint, fieldClassName, id: externalId, ...props },
  ref
) {
  const generatedId = useId();
  const hasLabel = label != null && label !== "";
  const textareaId = externalId || (hasLabel ? generatedId : undefined);
  const hintId = hasLabel && hint ? `${textareaId}-hint` : undefined;
  const describedBy = [props["aria-describedby"], hintId].filter(Boolean).join(" ") || undefined;

  const control = (
    <KitTextarea
      ref={ref}
      id={textareaId}
      error={error}
      aria-invalid={error || undefined}
      className={className}
      {...props}
      aria-describedby={describedBy}
    />
  );
  if (!hasLabel) return control;

  return (
    <Field
      htmlFor={textareaId}
      label={label}
      required={props.required}
      hint={hint ? <span id={hintId}>{hint}</span> : undefined}
      className={cn("gap-1.5", fieldClassName)}
    >
      {control}
    </Field>
  );
});

export default Textarea;
