"use client";

import { ToggleChip } from "@omniroute/ui-kit/toggle-chip";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

export interface FilterPillOption {
  value: string;
  label: string;
  icon?: string;
  count?: number;
}

interface FilterPillsProps {
  options: FilterPillOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * Single-select filter chips over the kit `ToggleChip` (`aria-pressed`, #19066). Clicking a pill
 * always reports its value, so the active pill stays active. They wrap instead of overflowing:
 * on narrow screens each line is stretched to the full width (pills grow), from `sm` up they
 * keep their natural size.
 */
export default function FilterPills({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
}: FilterPillsProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("flex w-full flex-wrap items-center gap-1.5 sm:w-auto", className)}
    >
      {options.map((opt) => (
        <ToggleChip
          key={opt.value}
          size="sm"
          pressed={value === opt.value}
          icon={opt.icon ? <Icon name={opt.icon} /> : undefined}
          count={opt.count}
          onClick={() => onChange(opt.value)}
          className="inline-flex grow items-center justify-center sm:grow-0"
        >
          {opt.label}
        </ToggleChip>
      ))}
    </div>
  );
}
