"use client";

// Shared primitive form fields for the Resilience settings tab. Extracted out
// of ResilienceTab.tsx (DRY, keeps ResilienceTab.tsx under the frozen
// file-size cap) — no behavior change from the extraction itself.

import { Checkbox } from "@omniroute/ui-kit/checkbox";
import { Input } from "@/shared/components";

export function NumberField({
  label,
  value,
  suffix,
  min = 0,
  max,
  onChange,
}: {
  label: string;
  value: number;
  suffix?: string;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-end gap-2">
      <Input
        type="number"
        label={label}
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => {
          if (event.target.value === "") return;
          const nextValue = Number(event.target.value);
          if (Number.isFinite(nextValue)) {
            // Clamp before propagating so out-of-range typed values can never
            // reach the Save handler — the HTML min/max/step attributes above
            // are advisory only and do not block onChange (#8107).
            const clamped = Math.max(min, Math.min(max ?? nextValue, nextValue));
            onChange(clamped);
          }
        }}
        className="min-w-0 flex-1"
      />
      {suffix ? <span className="pb-2.5 text-xs text-text-muted">{suffix}</span> : null}
    </div>
  );
}

export function BooleanField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Checkbox
      card
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      label={label}
      description={description}
    />
  );
}
