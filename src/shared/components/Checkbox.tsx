"use client";

import { forwardRef } from "react";
import { Checkbox as KitCheckbox } from "@omniroute/ui-kit/checkbox";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  /** The kit's "–" mixed state (a DOM property applied via ref, not an HTML attribute). */
  indeterminate?: boolean;
}

/**
 * Checkbox — adapter over the kit Checkbox (a real <input type="checkbox"> behind a styled
 * box). Optional `label` renders the kit's clickable row; without it, just the control.
 * `className` lands on the kit label row (or on the control when there is no label), not on
 * the native <input> as in the legacy Checkbox.
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, indeterminate, ...props },
  ref
) {
  return (
    <KitCheckbox
      ref={ref}
      label={label}
      className={className}
      indeterminate={indeterminate}
      {...props}
    />
  );
});

export default Checkbox;
