"use client";

import { useId, useState } from "react";
import type { ComponentProps, CSSProperties } from "react";
import { cn } from "./lib/utils";
import { Button } from "./button";

export interface SliderPreset { value: number; label: string }

export interface SliderProps extends Omit<ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  /** Optional shortcuts; dragging and keyboard adjustment remain continuous. */
  presets?: SliderPreset[];
  presetsLabel?: string;
}

export function Slider({
  className,
  value: controlled,
  defaultValue = 50,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  formatValue = (value) => String(value),
  id,
  presets,
  presetsLabel = "Slider presets",
  ...props
}: SliderProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled ?? uncontrolled;
  const percent = ((value - Number(min)) / (Number(max) - Number(min))) * 100;
  const select = (next: number) => {
    if (controlled === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };
  return (
    <div className={cn("ci-slider", className)}>
      {label || showValue ? <div className="ci-slider__header">{label ? <label htmlFor={inputId}>{label}</label> : <span />}{showValue ? <output htmlFor={inputId}>{formatValue(value)}</output> : null}</div> : null}
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--ci-slider-value": `${percent}%` } as CSSProperties}
        onChange={(event) => {
          const next = Number(event.target.value);
          select(next);
        }}
        {...props}
      />
      {presets?.length ? <div className="ci-slider__presets" role="group" aria-label={presetsLabel}>
        {presets.filter(preset => Number.isFinite(preset.value) && preset.value >= Number(min) && preset.value <= Number(max)).map(preset => {
          const position = (preset.value - Number(min)) / (Number(max) - Number(min)) * 100;
          return <Button key={preset.value} type="button" variant="ghost" size="sm"
            className="ci-slider__preset" style={{ left: `${position}%` }}
            data-edge={position === 0 ? "start" : position === 100 ? "end" : undefined}
            aria-pressed={value === preset.value} disabled={props.disabled}
            onClick={() => select(preset.value)}>{preset.label}</Button>;
        })}
      </div> : null}
    </div>
  );
}
