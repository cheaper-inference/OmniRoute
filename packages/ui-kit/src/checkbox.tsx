"use client";

import { cloneElement, forwardRef, useEffect, useId, useRef, useState } from "react";
import type { ComponentProps, MutableRefObject, ReactNode } from "react";
import { cn } from "./lib/utils";

/**
 * Checkbox — a control that toggles between checked and not checked.
 *
 *   <Checkbox label="Accept terms and conditions" />
 *   <Checkbox label="Enable notifications" description="You can disable it any time." />
 *   <Checkbox label="Marketing" side="right" />        // checkbox trails the label
 *   <Checkbox label="Analytics" card defaultChecked />  // boxed, clickable card
 *   <Checkbox label="Required" error />                 // pink error styling
 *   <Checkbox indeterminate />                           // bare control, "–" state
 *
 * A real <input type="checkbox"> drives it (free keyboard + form semantics),
 * visually hidden behind a styled box. Check vs. minus is pure CSS off the
 * `:checked` / `:indeterminate` states; `indeterminate` is applied to the input
 * via ref since it has no HTML attribute. Pass `label` / `description` / `card`
 * for the built row, or nothing for just the control (compose your own layout).
 * The state is mirrored as `data-state` ("checked" | "unchecked" | "indeterminate") on the input, control and row.
 */

export type CheckboxSide = "left" | "right";

/**
 * Mirrors the native state for styling and tests: `data-state` on the input, control and row.
 * It follows controlled props, `defaultChecked` and user toggles. An uncontrolled checkbox
 * reset by `form.reset()` keeps its last `data-state`, because React is not notified of the
 * reset; control `checked` when the mirror must follow form resets.
 */
export type CheckboxState = "checked" | "unchecked" | "indeterminate";

export interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  label?: ReactNode;
  description?: ReactNode;
  /** Which side of the label the box sits on. Default "left". */
  side?: CheckboxSide;
  /** Wrap the row in a bordered, clickable card. */
  card?: boolean;
  /** Error styling — pink box border, label and (card) border. */
  error?: boolean;
  /** The "–" mixed state. Applied to the input via ref (no HTML attribute). */
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      className,
      label,
      description,
      side = "left",
      card = false,
      error = false,
      indeterminate = false,
      disabled = false,
      id,
      onCheckedChange,
      onChange,
      ...props
    },
    forwardedRef,
  ) {
    const reactId = useId();
    const inputId = id ?? `${reactId}-checkbox`;
    const descriptionId =
      description != null ? `${reactId}-description` : undefined;
    const innerRef = useRef<HTMLInputElement | null>(null);
    const isControlled = props.checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState(
      Boolean(props.defaultChecked),
    );
    const [mixed, setMixed] = useState(indeterminate);
    const checked = isControlled ? Boolean(props.checked) : uncontrolledChecked;
    const state: CheckboxState = mixed
      ? "indeterminate"
      : checked
        ? "checked"
        : "unchecked";

    const setRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef)
        (forwardedRef as MutableRefObject<HTMLInputElement | null>).current =
          node;
    };

    // `indeterminate` is a DOM property, not an attribute — keep it (and data-state) in sync.
    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
      setMixed(indeterminate);
    }, [indeterminate, props.checked]);

    const control = (
      <span
        className="ci-checkbox__control"
        data-state={state}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
      >
        <input
          ref={setRef}
          type="checkbox"
          id={inputId}
          className="ci-checkbox__input"
          data-state={state}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={descriptionId}
          onChange={(event) => {
            // A user toggle clears the native mixed state; mirror it before notifying.
            setMixed(event.target.indeterminate);
            if (!isControlled) setUncontrolledChecked(event.target.checked);
            onChange?.(event);
            onCheckedChange?.(event.target.checked);
          }}
          {...props}
        />
        <span className="ci-checkbox__box" aria-hidden="true">
          <svg className="ci-checkbox__check" viewBox="0 0 24 24" fill="none">
            <path
              d="m5 12 5 5L20 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg className="ci-checkbox__minus" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 12h12"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </span>
    );

    // No label/description/card → just the control, for custom layouts.
    if (label == null && description == null && !card) {
      return cloneElement(control, {
        className: cn("ci-checkbox__control", className),
      });
    }

    const text = (label != null || description != null) && (
      <span className="ci-checkbox__text">
        {label != null && <span className="ci-checkbox__label">{label}</span>}
        {description != null && (
          <span id={descriptionId} className="ci-checkbox__description">
            {description}
          </span>
        )}
      </span>
    );

    return (
      <label
        htmlFor={inputId}
        data-slot="checkbox"
        data-state={state}
        data-side={side}
        data-card={card || undefined}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        data-description={description != null || undefined}
        className={cn(
          "ci-checkbox",
          card && "ci-checkbox--card",
          className,
        )}
      >
        {side === "left" ? (
          <>
            {control}
            {text}
          </>
        ) : (
          <>
            {text}
            {control}
          </>
        )}
      </label>
    );
  },
);

export interface CheckboxGroupProps extends ComponentProps<"div"> {
  label?: ReactNode;
  description?: ReactNode;
  /** Error message shown under the group (string) — also flips the pink styling. */
  error?: ReactNode;
}

/**
 * CheckboxGroup — a labelled cluster of checkboxes with an optional heading,
 * description and trailing error message (the "Sidebar" pattern from the design).
 */
export function CheckboxGroup({
  className,
  label,
  description,
  error,
  children,
  ...props
}: CheckboxGroupProps) {
  const reactId = useId();
  const labelId = label != null ? `${reactId}-label` : undefined;
  const descriptionId = description != null ? `${reactId}-description` : undefined;
  const hasError = error != null && error !== false;

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      data-slot="checkbox-group"
      data-error={hasError || undefined}
      className={cn("ci-checkbox-group", className)}
      {...props}
    >
      {(label != null || description != null) && (
        <div className="ci-checkbox-group__head">
          {label != null && (
            <span id={labelId} className="ci-checkbox-group__label">
              {label}
            </span>
          )}
          {description != null && (
            <span id={descriptionId} className="ci-checkbox-group__description">
              {description}
            </span>
          )}
        </div>
      )}
      <div className="ci-checkbox-group__items">{children}</div>
      {hasError && typeof error !== "boolean" && (
        <span className="ci-checkbox-group__error">{error}</span>
      )}
    </div>
  );
}
