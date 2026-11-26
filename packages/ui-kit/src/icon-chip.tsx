import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import type { BadgeTone } from "./badge";
import { cn } from "./lib/utils";
import type { CiChartSlot } from "./tokens";

/** The `Badge` status tones, or a chart series: the same ink on the same tint. */
export type IconChipTone = BadgeTone | `chart-${CiChartSlot}`;
/** The `Avatar` scale: 24, 32, 40, 48 and 64px. */
export type IconChipSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconChipShape = "rounded" | "circle";

export interface IconChipProps extends ComponentPropsWithoutRef<"span"> {
  /** Ink and tint of the chip. Defaults to "neutral". */
  tone?: IconChipTone;
  /** Width and height: `xs` 24px, `sm` 32px, `md` 40px (default), `lg` 48px, `xl` 64px. The icon is half the chip. */
  size?: IconChipSize;
  /** "rounded" uses the control radius (default); "circle" is fully round. */
  shape?: IconChipShape;
}

/**
 * An icon on a tinted square or circle, for card headers, list rows, empty states and status
 * indicators. Decorative by default; pass `aria-label` or `aria-labelledby` when the chip is the
 * only carrier of the information, and it becomes an image with that name.
 */
export const IconChip = forwardRef<HTMLSpanElement, IconChipProps>(function IconChip(
  { tone = "neutral", size = "md", shape = "rounded", className, ...props },
  ref,
) {
  const named = Boolean(props["aria-label"] || props["aria-labelledby"]);
  return (
    <span
      ref={ref}
      role={named ? "img" : undefined}
      aria-hidden={named ? undefined : true}
      {...props}
      data-slot="icon-chip"
      data-tone={tone}
      data-size={size}
      data-shape={shape}
      className={cn("ci-icon-chip", className)}
    />
  );
});
