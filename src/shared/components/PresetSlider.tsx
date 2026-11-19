"use client";

import { Slider } from "@omniroute/ui-kit/slider";

interface PresetSliderProps {
  value: number;
  onChange: (value: number) => void;
  presets: { label: string; value: number }[];
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  /** Visible label, wired to the range input (`<label for>`). */
  label?: string;
  /** Formats the value shown next to the label (kit default: `String(value)`). */
  formatValue?: (value: number) => string;
}

/** Range slider with preset shortcuts — adapter over the kit `Slider presets` (KEA-7886). */
export default function PresetSlider({
  value,
  onChange,
  presets,
  min = 0,
  max = 100,
  step = 1,
  className,
  label,
  formatValue,
}: PresetSliderProps) {
  return (
    <Slider
      value={value}
      onValueChange={onChange}
      presets={presets}
      min={min}
      max={max}
      step={step}
      showValue
      label={label}
      formatValue={formatValue}
      className={className}
    />
  );
}
