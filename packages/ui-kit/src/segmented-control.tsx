"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentProps, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { cn } from "./lib/utils";

/**
 * SegmentedControl — one value out of a few, shown as a capsule of segments.
 *
 *   <SegmentedControl
 *     aria-label="Period"
 *     options={[{ value: "1d", label: "1d" }, { value: "7d", label: "7d" }]}
 *     value={period}
 *     onValueChange={setPeriod}
 *   />
 *
 * It is a `radiogroup`: the arrows move the selection, the group is one tab stop
 * and each segment carries `aria-checked`. Use it when the choice changes a value
 * (period, density, mode) and the content around it stays the same. When each
 * choice shows a different panel, use [[tabs]] (`variant="capsule"` looks the
 * same); for a form field with descriptions, use [[radio-group]].
 */

export type SegmentedControlSize = "default" | "sm";

export interface SegmentedControlOption<Value extends string = string> {
  value: Value;
  /** Visible text of the segment and its accessible name. */
  label: ReactNode;
  /** Decorative mark before the label; hidden from assistive technology. */
  icon?: ReactNode;
  disabled?: boolean;
}

/** A radiogroup has no visible label of its own, so one of the two is required. */
type SegmentedControlName =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };

export type SegmentedControlProps<Value extends string = string> = Omit<
  ComponentProps<"div">,
  "aria-label" | "aria-labelledby" | "children" | "defaultValue" | "onChange" | "role"
> &
  SegmentedControlName & {
    options: readonly SegmentedControlOption<Value>[];
    value?: Value;
    defaultValue?: Value;
    /** Called with the new value; not called again for the segment that is already checked. */
    onValueChange?: (value: Value) => void;
    /** `"sm"` is the 24px segment for dense toolbars; `"default"` lines up with 36px controls. */
    size?: SegmentedControlSize;
    /** Disable every segment. */
    disabled?: boolean;
  };

/** Radio pattern: the arrows move the selection, not just the focus, and wrap around. */
function onRadioKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
  // Alt/Ctrl/Cmd + arrow belong to the browser (history, word jumps).
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
  const group = event.currentTarget;
  const current = (event.target as Element).closest<HTMLButtonElement>('[role="radio"]');
  const radios = Array.from(group.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)'));
  const index = current ? radios.indexOf(current) : -1;
  if (index === -1) return;
  // Left and right follow what the eye sees, so they swap in a right-to-left group.
  const inlineStep = getComputedStyle(group).direction === "rtl" ? -1 : 1;
  let next = -1;
  if (event.key === "ArrowDown") next = index + 1;
  else if (event.key === "ArrowUp") next = index - 1;
  else if (event.key === "ArrowRight") next = index + inlineStep;
  else if (event.key === "ArrowLeft") next = index - inlineStep;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = radios.length - 1;
  else return;
  event.preventDefault();
  const target = radios[(next + radios.length) % radios.length];
  target.focus();
  target.click();
}

/**
 * A set too long for its container scrolls inside the capsule. Keep the checked segment
 * fully in view there (it also grows a little when its label turns semibold), moving only
 * the capsule's own scroll position, never the page.
 */
function revealSegment(segment: HTMLElement | null) {
  const capsule = segment?.parentElement;
  if (!segment || !capsule || capsule.scrollWidth <= capsule.clientWidth) return;
  const style = getComputedStyle(capsule);
  const view = capsule.getBoundingClientRect();
  const box = segment.getBoundingClientRect();
  const start = view.left + capsule.clientLeft + (parseFloat(style.paddingLeft) || 0);
  const end = view.left + capsule.clientLeft + capsule.clientWidth - (parseFloat(style.paddingRight) || 0);
  if (box.left < start) capsule.scrollLeft -= start - box.left;
  else if (box.right > end) capsule.scrollLeft += box.right - end;
}

export function SegmentedControl<Value extends string = string>({
  className,
  options,
  value: controlled,
  defaultValue,
  onValueChange,
  size = "default",
  disabled = false,
  onKeyDown,
  ...props
}: SegmentedControlProps<Value>) {
  const [uncontrolled, setUncontrolled] = useState<Value | undefined>(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;
  const checkedRef = useRef<HTMLButtonElement>(null);

  // Keyed on where the checked segment sits, so options that arrive after the value still
  // reveal it, while a re-render with the same options leaves the user's scroll alone.
  const checkedIndex = options.findIndex((option) => option.value === value);
  useEffect(() => revealSegment(checkedRef.current), [value, checkedIndex]);

  function select(next: Value) {
    if (next === value) return;
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(next);
  }

  // Roving tab stop: the checked segment, or the first one that can take focus when
  // nothing is checked (or the checked segment is disabled), so the group stays reachable.
  const enabled = options.filter((option) => !disabled && !option.disabled);
  const tabStop = (enabled.find((option) => option.value === value) ?? enabled[0])?.value;

  return (
    <div
      role="radiogroup"
      aria-disabled={disabled || undefined}
      data-slot="segmented-control"
      data-size={size}
      className={cn("ci-segmented", className)}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        onRadioKeyDown(event);
      }}
      {...props}
    >
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            ref={checked ? checkedRef : undefined}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={option.value === tabStop ? 0 : -1}
            disabled={disabled || option.disabled}
            data-slot="segmented-control-item"
            data-active={checked || undefined}
            className="ci-segmented__item"
            onClick={() => select(option.value)}
          >
            {option.icon != null && <span className="ci-segmented__icon" aria-hidden="true">{option.icon}</span>}
            <span className="ci-segmented__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
