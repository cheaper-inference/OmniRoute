"use client";

import {
  cloneElement,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useState,
} from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

/**
 * RadioGroup — a set of checkable buttons where at most one can be checked.
 *
 *   <RadioGroup defaultValue="comfortable" label="Density">
 *     <RadioGroupItem value="default" label="Default" />
 *     <RadioGroupItem value="comfortable" label="Comfortable" />
 *     <RadioGroupItem value="compact" label="Compact" />
 *   </RadioGroup>
 *
 * The group owns the selected `value` (controlled or uncontrolled) and hands each
 * item a shared `name`, so native radio semantics — single selection, arrow-key
 * navigation — come for free. Items mirror Checkbox: pass `label` / `description`
 * / `card` / `side`, or nothing for the bare control. See [[checkbox]].
 */

export type RadioOrientation = "vertical" | "horizontal";
export type RadioSide = "left" | "right";

interface RadioGroupContextValue {
  value: string | undefined;
  select: (value: string) => void;
  name: string;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext(component: string): RadioGroupContextValue {
  const context = useContext(RadioGroupContext);
  if (!context)
    throw new Error(`<${component}> must be used inside <RadioGroup>`);
  return context;
}

export interface RadioGroupProps extends Omit<
  ComponentProps<"div">,
  "onChange" | "defaultValue"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Shared radio `name`; defaults to a generated id. */
  name?: string;
  label?: ReactNode;
  description?: ReactNode;
  /** Error message under the group (string) — also flips the pink styling. */
  error?: ReactNode;
  orientation?: RadioOrientation;
  /** Disable every item in the group. */
  disabled?: boolean;
}

export function RadioGroup({
  className,
  value: controlled,
  defaultValue,
  onValueChange,
  name,
  label,
  description,
  error,
  orientation = "vertical",
  disabled = false,
  children,
  ...props
}: RadioGroupProps) {
  const reactId = useId();
  const groupName = name ?? `${reactId}-radio`;
  const labelId = label != null ? `${reactId}-label` : undefined;
  const [uncontrolled, setUncontrolled] = useState<string | undefined>(
    defaultValue,
  );
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;
  const hasError = error != null && error !== false;

  const select = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return (
    <RadioGroupContext.Provider
      value={{ value, select, name: groupName, disabled }}
    >
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        data-slot="radio-group"
        data-error={hasError || undefined}
        className={cn("ci-radio-group", className)}
        {...props}
      >
        {(label != null || description != null) && (
          <div className="ci-radio-group__head">
            {label != null && (
              <span id={labelId} className="ci-radio-group__label">
                {label}
              </span>
            )}
            {description != null && (
              <span className="ci-radio-group__description">
                {description}
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            "ci-radio-group__items",
            `ci-radio-group__items--${orientation}`,
          )}
        >
          {children}
        </div>
        {hasError && typeof error !== "boolean" && (
          <span className="ci-radio-group__error">{error}</span>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps extends Omit<
  ComponentProps<"input">,
  "type" | "value" | "onChange" | "checked" | "defaultChecked"
> {
  value: string;
  label?: ReactNode;
  description?: ReactNode;
  /** Which side of the label the control sits on. Default "left". */
  side?: RadioSide;
  /** Wrap the row in a bordered, clickable card (highlights when selected). */
  card?: boolean;
  /** Error styling — pink control border, label and (card) border. */
  error?: boolean;
}

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  function RadioGroupItem(
    {
      className,
      value,
      label,
      description,
      side = "left",
      card = false,
      error = false,
      disabled,
      id,
      ...props
    },
    ref,
  ) {
    const group = useRadioGroupContext("RadioGroupItem");
    const reactId = useId();
    const inputId = id ?? `${reactId}-radio`;
    const descriptionId =
      description != null ? `${reactId}-description` : undefined;
    const isDisabled = disabled || group.disabled;
    const checked = group.value === value;

    const control = (
      <span
        className="ci-radio__control"
        data-error={error || undefined}
        data-disabled={isDisabled || undefined}
      >
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={group.name}
          className="ci-radio__input"
          value={value}
          checked={checked}
          disabled={isDisabled}
          aria-invalid={error || undefined}
          aria-describedby={descriptionId}
          onChange={() => group.select(value)}
          {...props}
        />
        <span className="ci-radio__box" aria-hidden="true" />
      </span>
    );

    // No label/description/card → just the control, for custom layouts.
    if (label == null && description == null && !card) {
      return cloneElement(control, {
        className: cn("ci-radio__control", className),
      });
    }

    const text = (label != null || description != null) && (
      <span className="ci-radio__text">
        {label != null && <span className="ci-radio__label">{label}</span>}
        {description != null && (
          <span id={descriptionId} className="ci-radio__description">
            {description}
          </span>
        )}
      </span>
    );

    return (
      <label
        htmlFor={inputId}
        data-slot="radio"
        data-side={side}
        data-card={card || undefined}
        data-error={error || undefined}
        data-disabled={isDisabled || undefined}
        data-description={description != null || undefined}
        className={cn("ci-radio", card && "ci-radio--card", className)}
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
