"use client";

import type { KeyboardEvent, ReactNode } from "react";
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
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

interface SegmentedRadioProps extends SegmentedCommonProps {
  /** One value out of a set, over content that stays the same (period, density, a form field). */
  semantics: "radio";
  value?: string;
  onChange?: (value: string) => void;
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

// On the triggers: the kit's `.ci-tabs__trigger` sets the `font` shorthand, so a size on the
// Tabs root would never reach them (utilities win over the kit's components layer).
const SIZES = {
  // min-h-7: the kit capsule trigger's min-height (~30px) would otherwise beat h-7; lg's h-10
  // is already above it.
  sm: "h-7 min-h-7 px-2 text-xs",
  md: "",
  lg: "h-10 px-4 text-base",
};

// Phones: full width, segments share the line; from sm up, natural width (legacy). A set too
// long for the line scrolls sideways inside the capsule instead of wrapping it.
const LIST_CLASS = "w-full flex-nowrap overflow-x-auto sm:w-auto [&>*]:flex-1 sm:[&>*]:flex-none";

const NEXT_KEYS = new Set(["ArrowRight", "ArrowDown"]);
const PREVIOUS_KEYS = new Set(["ArrowLeft", "ArrowUp"]);

/** Radio pattern: the arrows move the selection, not just the focus, and wrap around. */
function onRadioKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
  // Alt/Ctrl/Cmd + arrow belong to the browser (history, word jumps): leave them alone.
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const group = event.currentTarget.closest('[role="radiogroup"]');
  if (!group) return;
  const radios = Array.from(group.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
  const index = radios.indexOf(event.currentTarget);
  let next = -1;
  if (NEXT_KEYS.has(event.key)) next = (index + 1) % radios.length;
  else if (PREVIOUS_KEYS.has(event.key)) next = (index - 1 + radios.length) % radios.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = radios.length - 1;
  if (next < 0) return;
  event.preventDefault();
  radios[next].focus();
  radios[next].click();
}

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
 * Segmented control over the kit capsule `Tabs` (KEA-7886). `semantics` says what it is:
 *
 * - `"radio"`: a `radiogroup` of `radio`s with `aria-checked`, for filters and single-choice
 *   fields. The arrows move the selection.
 * - `"tabs"`: the `tablist` of a `SegmentedTabs`, whose triggers point at `SegmentedPanel`s.
 */
export default function SegmentedControl(props: SegmentedControlProps) {
  const {
    options = [],
    size = "md",
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  } = props;
  const triggerClass = cn("gap-1.5 whitespace-nowrap", SIZES[size]);

  if (props.semantics === "tabs") {
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

  const { value, onChange } = props;
  // Roving tabindex: with no match (or no value yet) the group must still be reachable.
  const hasChecked = options.some((option) => option.value === value);
  return (
    <Tabs
      variant="capsule"
      value={value}
      onValueChange={(next) => onChange?.(next)}
      className={cn("max-w-full", className)}
    >
      <TabsList
        role="radiogroup"
        aria-orientation={undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={LIST_CLASS}
      >
        {options.map((option, index) => {
          const checked = option.value === value;
          return (
            <TabsTrigger
              key={option.value}
              value={option.value}
              role="radio"
              aria-checked={checked}
              // The kit trigger is a tab: these two do not exist on a radio.
              aria-selected={undefined}
              aria-controls={undefined}
              tabIndex={checked || (!hasChecked && index === 0) ? 0 : -1}
              onKeyDown={onRadioKeyDown}
              // The kit keys the selected weight on aria-selected, which a radio cannot carry.
              className={cn(triggerClass, checked && "font-semibold")}
            >
              <SegmentedLabel option={option} />
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
