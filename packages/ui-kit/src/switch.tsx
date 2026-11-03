"use client";

import { cloneElement, forwardRef, useId } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export type SwitchSide = "left" | "right";
export type SwitchSize = "default" | "sm";
export interface SwitchProps extends Omit<ComponentProps<"input">, "type" | "size"> {
  /** Numeric values retain the legacy native input size attribute. */
  size?: SwitchSize | ComponentProps<"input">["size"];
  label?: ReactNode;
  description?: ReactNode;
  side?: SwitchSide;
  card?: boolean;
  error?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ className, label, description, side = "left", size = "default", card = false, error = false, disabled, id, onCheckedChange, onChange, ...props }, ref) {
  const visualSize = typeof size === "number" ? "default" : size;
  const reactId = useId();
  const inputId = id ?? `${reactId}-switch`;
  const descriptionId = description != null ? `${reactId}-description` : undefined;
  const control = <span className="ci-switch__control"><input ref={ref} type="checkbox" role="switch" size={typeof size === "number" ? size : undefined} id={inputId} className="ci-switch__input" disabled={disabled} aria-invalid={error || undefined} aria-describedby={descriptionId} onChange={(event) => { onChange?.(event); onCheckedChange?.(event.target.checked); }} {...props} /><span className="ci-switch__track" aria-hidden="true"><span className="ci-switch__thumb" /></span></span>;
  if (label == null && description == null && !card) return cloneElement(control, { className: cn("ci-switch__control", `ci-switch--size-${visualSize}`, className), "data-size": visualSize });
  const text = <span className="ci-switch__text">{label != null && <span className="ci-switch__label">{label}</span>}{description != null && <span id={descriptionId} className="ci-switch__description">{description}</span>}</span>;
  return <label htmlFor={inputId} data-slot="switch" data-size={visualSize} data-side={side} data-card={card || undefined} data-error={error || undefined} data-disabled={disabled || undefined} className={cn("ci-switch", `ci-switch--size-${visualSize}`, card && "ci-switch--card", className)}>{side === "left" ? <>{control}{text}</> : <>{text}{control}</>}</label>;
});
