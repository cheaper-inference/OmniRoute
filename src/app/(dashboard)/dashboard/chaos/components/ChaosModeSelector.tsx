"use client";

import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import Icon from "@/shared/components/Icon";

/**
 * Parallel / Collaborative mode selector for the Chaos Mode config page.
 * Extracted out of ChaosConfigPageClient.tsx to keep the page component under
 * the complexity/size ratchet (config/quality/complexity-baseline.json).
 */
export function ChaosModeSelector({
  mode,
  onChange,
  label,
  parallelLabel,
  parallelDesc,
  collaborativeLabel,
  collaborativeDesc,
}: {
  mode: "parallel" | "collaborative";
  onChange: (mode: "parallel" | "collaborative") => void;
  label: string;
  parallelLabel: string;
  parallelDesc: string;
  collaborativeLabel: string;
  collaborativeDesc: string;
}) {
  return (
    <RadioGroup
      label={label}
      orientation="horizontal"
      value={mode}
      onValueChange={(next) => onChange(next as "parallel" | "collaborative")}
    >
      <RadioGroupItem
        card
        value="parallel"
        label={
          <span className="inline-flex items-center gap-1">
            <Icon name="call_split" size={16} />
            {parallelLabel}
          </span>
        }
        description={parallelDesc}
      />
      <RadioGroupItem
        card
        value="collaborative"
        label={
          <span className="inline-flex items-center gap-1">
            <Icon name="merge" size={16} />
            {collaborativeLabel}
          </span>
        }
        description={collaborativeDesc}
      />
    </RadioGroup>
  );
}
