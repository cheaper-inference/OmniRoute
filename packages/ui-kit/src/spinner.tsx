import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";
import { SpinnerGraphic } from "./lib/spinner-graphic";

export type SpinnerSize = "xs" | "sm" | "md";

export interface SpinnerProps extends Omit<ComponentProps<"span">, "children"> {
  /** `xs` is 12px, `sm` 16px (default) and `md` 20px: the kit icon sizes. */
  size?: SpinnerSize;
  /**
   * Visually hidden status text, such as "Loading models". With a label (or `aria-label` /
   * `aria-labelledby`) the spinner is a `role="status"` region; without one it is decorative
   * and hidden from assistive technology, for use next to text that already says what is loading.
   */
  label?: ReactNode;
}

/**
 * An inline loading indicator for table cells, badges and controls outside `Button`, drawn in
 * `currentColor`. It stops rotating under `prefers-reduced-motion: reduce`.
 */
export function Spinner({ size = "sm", label, className, ...props }: SpinnerProps) {
  const hasLabel = label !== undefined && label !== null && label !== false && label !== "";
  const named = hasLabel || props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;
  return (
    <span
      role={named ? "status" : undefined}
      aria-hidden={named ? undefined : true}
      {...props}
      data-slot="spinner"
      data-size={size}
      className={cn("ci-spinner", className)}
    >
      <SpinnerGraphic className="ci-spinner__graphic" />
      {hasLabel ? <span className="ci-sr-only">{label}</span> : null}
    </span>
  );
}
