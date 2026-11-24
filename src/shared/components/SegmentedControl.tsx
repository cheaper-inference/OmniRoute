"use client";

import type { ReactNode } from "react";
import { SegmentedControl as KitSegmentedControl } from "@omniroute/ui-kit/segmented-control";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

interface SegmentedOption {
  value: string;
  label: string;
  icon?: string;
}

interface SegmentedCommonProps {
  options?: SegmentedOption[];
  /** `md` lines up with 36px controls; `sm` is the 24px segment for dense toolbars. */
  size?: "sm" | "md";
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

interface SegmentedRadioProps extends SegmentedCommonProps {
  /** One value out of a set, over content that stays the same (period, density, a form field). */
  semantics: "radio";
  value?: string;
  onChange?: (value: string) => void;
  /** The id of a hint that describes the group. */
  "aria-describedby"?: string;
}

interface SegmentedTabsListProps extends SegmentedCommonProps {
  /** Switches panels. Must sit inside `SegmentedTabs`, which owns the value; see `SegmentedPanel`. */
  semantics: "tabs";
  value?: never;
  onChange?: never;
}

export type SegmentedControlProps = SegmentedRadioProps | SegmentedTabsListProps;

interface SegmentedTabsProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
}

interface SegmentedPanelProps {
  value: string;
  className?: string;
  children: ReactNode;
}

// Tabs branch, on the triggers: the kit's `.ci-tabs__trigger` sets the `font` shorthand, so a
// size on the Tabs root would never reach them (utilities win over the kit's components layer).
const TAB_SIZES = {
  // 24px with 12px text, the kit `sm` segment (and its `Tabs size="sm"`), so a tab set and a
  // radio set are the same height. min-h-6: the kit capsule trigger's min-height (~30px) would
  // otherwise beat h-6.
  sm: "h-6 min-h-6 px-2 text-xs",
  md: "",
};

// Tabs branch. Phones: full width, segments share the line; from sm up, natural width (legacy).
// A set too long for the line scrolls sideways inside the capsule instead of wrapping it.
const LIST_CLASS = "w-full flex-nowrap overflow-x-auto sm:w-auto [&>*]:flex-1 sm:[&>*]:flex-none";

// Radio branch. Phones: the capsule takes the line and the kit lets the segments share it; from
// sm up the kit default applies (it hugs its segments). A caller width (`w-full`) wins everywhere.
const RADIO_CLASS = "max-sm:w-full";

/** The kit asks for one of the two names in its type; the adapter keeps both optional. */
type KitName = { "aria-label": string; "aria-labelledby"?: string };

function SegmentedLabel({ option }: { option: SegmentedOption }) {
  return (
    <>
      {option.icon && <Icon name={option.icon} size={16} />}
      {option.label}
    </>
  );
}

/**
 * Root of a real tab set: holds the value and lets the list and the panels live anywhere below
 * it (a page header, a top bar). Render one `SegmentedControl semantics="tabs"` and the
 * `SegmentedPanel`s inside.
 */
export function SegmentedTabs({ value, onChange, className, children }: SegmentedTabsProps) {
  return (
    <Tabs
      variant="capsule"
      value={value}
      onValueChange={(next) => onChange?.(next)}
      className={className}
    >
      {children}
    </Tabs>
  );
}

/** Panel of a `SegmentedTabs` set: the kit `TabsContent`, mounted only while selected. */
export function SegmentedPanel({ value, className, children }: SegmentedPanelProps) {
  return (
    <TabsContent value={value} className={className}>
      {children}
    </TabsContent>
  );
}

/**
 * Segmented control. `semantics` says what it is:
 *
 * - `"radio"`: the kit `SegmentedControl`, a `radiogroup` of `radio`s with `aria-checked`, for
 *   filters and single-choice fields. The arrows move the selection.
 * - `"tabs"`: the `tablist` of a `SegmentedTabs` (kit capsule `Tabs`), whose triggers point at
 *   `SegmentedPanel`s.
 */
export default function SegmentedControl(props: SegmentedControlProps) {
  const {
    options = [],
    size = "md",
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  } = props;

  if (props.semantics === "tabs") {
    const triggerClass = cn("gap-1.5 whitespace-nowrap", TAB_SIZES[size]);
    return (
      // Same box the kit Tabs root gave the list before panels moved under SegmentedTabs.
      <div className={cn("flex max-w-full min-w-0 flex-col", className)}>
        <TabsList aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} className={LIST_CLASS}>
          {options.map((option) => (
            <TabsTrigger key={option.value} value={option.value} className={triggerClass}>
              <SegmentedLabel option={option} />
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    );
  }

  const { value, onChange, "aria-describedby": ariaDescribedBy } = props;
  const name = { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy } as KitName;
  return (
    <KitSegmentedControl
      {...name}
      options={options.map((option) => ({
        value: option.value,
        label: option.label,
        icon: option.icon ? <Icon name={option.icon} size={16} /> : undefined,
      }))}
      value={value}
      onValueChange={(next) => onChange?.(next)}
      aria-describedby={ariaDescribedBy}
      size={size === "sm" ? "sm" : "default"}
      className={cn(RADIO_CLASS, className)}
    />
  );
}
