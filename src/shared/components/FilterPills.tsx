"use client";

import { cn } from "@/shared/utils/cn";
import Badge from "./Badge";
import Button from "./Button";

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
 * Filter chips (toggle buttons, `aria-pressed`) over the `Button` adapter (KEA-7886). They
 * wrap instead of overflowing: on narrow screens each line is stretched to the full width
 * (pills grow), from `sm` up they keep their natural size.
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
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <Button
            key={opt.value}
            size="sm"
            variant={active ? "secondary" : "ghost"}
            icon={opt.icon}
            aria-pressed={active}
            onClick={() => onChange(opt.value)}
            className="inline-flex grow items-center justify-center gap-1 whitespace-nowrap sm:grow-0"
          >
            {opt.label}
            {opt.count !== undefined && <Badge size="sm">{opt.count}</Badge>}
          </Button>
        );
      })}
    </div>
  );
}
