"use client";

import { useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export interface LanguageSegmentedOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
}

export interface LanguageSegmentedControlProps extends Omit<ComponentProps<"div">, "defaultValue" | "onChange"> {
  options: LanguageSegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
}

export function LanguageSegmentedControl({
  className,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  label = "Code language",
  ...props
}: LanguageSegmentedControlProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const value = controlledValue ?? uncontrolledValue;

  function select(nextValue: string) {
    if (controlledValue === undefined) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      data-slot="language-segmented-control"
      className={cn("ci-language-control", className)}
      {...props}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          data-active={value === option.value || undefined}
          className="ci-language-control__item"
          onClick={() => select(option.value)}
        >
          {option.icon != null && <span className="ci-language-control__icon" aria-hidden="true">{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  );
}
