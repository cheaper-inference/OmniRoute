"use client";

import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

interface SegmentedOption {
  value: string;
  label: string;
  icon?: string;
}

interface SegmentedControlProps {
  options?: SegmentedOption[];
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

// On the triggers: the kit's `.ci-tabs__trigger` sets the `font` shorthand, so a size on the
// Tabs root would never reach them (utilities win over the kit's components layer).
const SIZES = {
  // min-h-7: the kit capsule trigger's min-height (~30px) would otherwise beat h-7; lg's h-10
  // is already above it.
  sm: "h-7 min-h-7 px-2 text-xs",
  md: "",
  lg: "h-10 px-4 text-base",
};

/**
 * Segmented control over the kit capsule `Tabs` (KEA-7886): `role="tablist"` with
 * `role="tab"` + `aria-selected` triggers and arrow-key navigation from the kit.
 */
export default function SegmentedControl({
  options = [],
  value,
  onChange,
  size = "md",
  className,
  "aria-label": ariaLabel,
}: SegmentedControlProps) {
  return (
    <Tabs
      variant="capsule"
      value={value}
      onValueChange={(next) => onChange?.(next)}
      className={cn("max-w-full", className)}
    >
      {/* Phones: full width, segments share the line; from sm up, natural width (legacy). */}
      <TabsList
        aria-label={ariaLabel}
        className="w-full flex-wrap sm:w-auto [&>*]:flex-1 sm:[&>*]:flex-none"
      >
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            // No TabsContent is rendered: drop the kit's aria-controls (it would dangle).
            aria-controls={undefined}
            className={cn("gap-1.5 whitespace-nowrap", SIZES[size])}
          >
            {option.icon && <Icon name={option.icon} size={16} />}
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
