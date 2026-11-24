"use client";

// Shared primitive form fields for the Resilience settings tab. Extracted out
// of ResilienceTab.tsx (DRY, keeps ResilienceTab.tsx under the frozen
// file-size cap) — no behavior change from the extraction itself.

import { Checkbox } from "@omniroute/ui-kit/checkbox";

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
