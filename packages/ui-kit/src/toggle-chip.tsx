"use client";

import { forwardRef, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { BadgeChartTone, BadgeTone } from "./badge";
import { cn } from "./lib/utils";

export type ToggleChipSize = "sm" | "md";

export interface ToggleChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  /** Decorative leading mark. */
  icon?: ReactNode;
  /** Trailing count, e.g. matching rows. Part of the accessible name. */
  count?: ReactNode;
  size?: ToggleChipSize;
  /**
   * Colours the pressed state with a Badge tone (ink, border and tint) instead of the
   * active-control colours. The unpressed chip does not change. Keep the label: the
   * tone never carries the meaning alone.
   */
  tone?: BadgeTone | BadgeChartTone;
}

/** A pill toggle button (`aria-pressed`) for filter and selection chips. */
export const ToggleChip = forwardRef<HTMLButtonElement, ToggleChipProps>(function ToggleChip({
  className,
  pressed: controlled,
  defaultPressed = false,
  onPressedChange,
  icon,
  count,
  size = "md",
  tone,
  children,
  onClick,
  type = "button",
  ...props
}, ref) {
  const [uncontrolled, setUncontrolled] = useState(defaultPressed);
  const pressed = controlled ?? uncontrolled;
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={pressed}
      data-slot="toggle-chip"
      data-state={pressed ? "on" : "off"}
      data-size={size}
      data-tone={tone}
      className={cn("ci-toggle-chip", className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (controlled === undefined) setUncontrolled(!pressed);
        onPressedChange?.(!pressed);
      }}
      {...props}
    >
      {icon != null && <span className="ci-toggle-chip__icon" aria-hidden="true">{icon}</span>}
      <span className="ci-toggle-chip__label">{children}</span>
      {count != null && <>{" "}<span className="ci-toggle-chip__count">{count}</span></>}
    </button>
  );
});
