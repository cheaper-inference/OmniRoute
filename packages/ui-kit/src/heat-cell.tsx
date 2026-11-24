import type { ComponentProps } from "react";
import { cn } from "./lib/utils";

/** A step of the `--ci-scale-seq` ramp. 0 is off the ramp: zero or nothing measured. 1 is nearest the surface, 7 the strongest. */
export type HeatLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type HeatCellSize = "sm" | "md" | "lg";
/** Every level in order, for a "less to more" key. */
export const heatLevels = [0, 1, 2, 3, 4, 5, 6, 7] as const satisfies readonly HeatLevel[];

/**
 * The step of the `--ci-scale-seq` ramp for `value`, as `CalendarHeatmap` draws it.
 *
 * - Missing and non-finite values are `null`: unavailable, never zero. `HeatCell` takes it as it is.
 * - Zero and negative values are level 0: a measurement that is off the ramp.
 * - Without `thresholds`, levels 1 to 7 divide the range up to `max` evenly; a value above `max` stays on 7.
 *   When `max` is not a positive number there is no range to divide, so every positive value is 7.
 * - `thresholds` are six ascending lower bounds for levels 2 to 7 (quantiles or fixed bands); `max` is then unused.
 */
export function heatLevel(value: number | null | undefined, max: number, thresholds?: readonly number[]): HeatLevel | null {
  if (value == null || !Number.isFinite(value)) return null;
  if (value <= 0) return 0;
  if (thresholds) return Math.min(7, 1 + thresholds.filter((bound) => value >= bound).length) as HeatLevel;
  if (!(max > 0)) return 7;
  return Math.max(1, Math.min(7, Math.ceil((value / max) * 7))) as HeatLevel;
}

interface HeatCellBaseProps extends Omit<ComponentProps<"span">, "children" | "aria-label" | "aria-hidden"> {
  /** Step to paint: pass `heatLevel(value, max)` as it is. `null` is unavailable: a dashed outline, never zero. */
  level: HeatLevel | null;
  /** `sm` is 14px, the `CalendarHeatmap` cell; `md` (default) is 24px and `lg` is 36px. */
  size?: HeatCellSize;
}

interface NamedHeatCellProps extends HeatCellBaseProps {
  /** Accessible text with what the cell stands for and its value, for example "Tuesday: 1,204 requests". */
  label: string;
  "aria-hidden"?: undefined;
}

interface HiddenHeatCellProps extends HeatCellBaseProps {
  label?: undefined;
  /** Hides the cell from assistive technology, for a key or a cell whose value is written beside it. */
  "aria-hidden": true;
}

/** A cell is either named by `label` or explicitly hidden with `aria-hidden`. */
export type HeatCellProps = NamedHeatCellProps | HiddenHeatCellProps;

/**
 * One cell on the `--ci-scale-seq` ramp, for a short heat strip or a small matrix beside a `CalendarHeatmap`.
 * The mark grows with the level, as in the calendar, so the level never depends on colour alone.
 */
export function HeatCell({ level, size = "md", label, className, ...props }: HeatCellProps) {
  // Callers without types can pass anything; the mark only has the eight levels.
  const step = level === null ? null : Math.min(7, Math.max(0, Math.round(level) || 0));
  return (
    <span
      role={label === undefined ? undefined : "img"}
      aria-label={label}
      {...props}
      className={cn("ci-heat-cell", className)}
      data-size={size}
    >
      <span aria-hidden="true" className="ci-heat-cell__mark" data-level={step ?? undefined} data-unavailable={step === null || undefined} />
    </span>
  );
}
