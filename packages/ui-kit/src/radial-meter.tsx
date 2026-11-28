import { useId } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";
import type { ProgressTone } from "./progress";

export type RadialMeterSize = "sm" | "md" | "lg";

interface RadialMeterBaseProps extends Omit<ComponentProps<"div">, "children" | "aria-label" | "aria-labelledby"> {
  /** Current value, clamped to `[0, max]`. A value that is not a number counts as 0. */
  value: number;
  /** Top of the range. Defaults to 100; anything that is not a positive number counts as 1. */
  max?: number;
  /** Arc colour: the `Progress` tones. "default" is the accent ink. */
  tone?: ProgressTone;
  /** Ring diameter: `sm` is 48px, `md` (default) is 80px and `lg` is 120px. */
  size?: RadialMeterSize;
  /**
   * Text for the value, shown in the centre and spoken as `aria-valuetext`. Gets the clamped value and the
   * maximum in use. Defaults to the rounded percentage, such as "72%".
   */
  valueFormatter?: (value: number, max: number) => string;
  /** Show the value text in the centre. Set false for a ring too small or too busy for text; the value is still spoken. */
  showValue?: boolean;
  /** Draw the arc in when the meter mounts. Set false for a static ring; a new value still eases in. OS reduced-motion preferences always win. */
  animate?: boolean;
  /** Centre content in place of the value text. It is not exposed to assistive technology, so keep it non-interactive. */
  children?: ReactNode;
}

/** The meter needs a name: a visible `label`, an `aria-label`, or the id of the element that names it. */
type RadialMeterName =
  | { label: ReactNode; "aria-label"?: string; "aria-labelledby"?: string }
  | { label?: ReactNode; "aria-label": string; "aria-labelledby"?: string }
  | { label?: ReactNode; "aria-label"?: string; "aria-labelledby": string };

export type RadialMeterProps = RadialMeterBaseProps & RadialMeterName;

const present = (value: string | undefined) => (value != null && value.trim() !== "" ? value : undefined);

/**
 * A ring gauge for one value in a known range: quota used, coverage, a score, a share of a total.
 * It is a `role="meter"` with the naming rules of `Progress`: `aria-labelledby`, then `aria-label`, then `label`.
 */
export function RadialMeter({
  className,
  value,
  max = 100,
  tone = "default",
  size = "md",
  label,
  valueFormatter,
  showValue = true,
  animate = true,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-valuetext": ariaValueText,
  ...props
}: RadialMeterProps) {
  const labelId = useId();
  const safeMax = Number.isFinite(max) && max > 0 ? max : 1;
  // Only NaN has no position in the range; ±Infinity clamps to an end of it, as in Progress.
  const current = Math.min(Math.max(Number.isNaN(value) ? 0 : value, 0), safeMax);
  const percent = (current / safeMax) * 100;
  const valueText = valueFormatter ? valueFormatter(current, safeMax) : `${Math.round(percent)}%`;
  // The meter, not the wrapper, owns the accessible name: explicit aria-labelledby wins, then aria-label, then the visible `label`.
  // An empty attribute names nothing, so it counts as absent and does not switch the visible label off.
  const namedBy = present(ariaLabelledBy);
  const namedAs = present(ariaLabel);
  const hasVisibleLabel = label != null && label !== false && label !== "";
  const labelledBy = namedBy ?? (namedAs == null && hasVisibleLabel ? labelId : undefined);
  const hasChildren = children != null && children !== false && children !== "";

  return (
    <div
      {...props}
      className={cn("ci-radial-meter", className)}
      // After the forwarded props, so a consumer data attribute cannot replace the component's own.
      data-size={size}
      data-tone={tone === "default" ? undefined : tone}
      data-animate={animate ? "" : undefined}
    >
      <div
        role="meter"
        aria-label={namedAs}
        aria-labelledby={labelledBy}
        aria-describedby={ariaDescribedBy}
        aria-valuetext={ariaValueText ?? valueText}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={current}
        className="ci-radial-meter__gauge"
      >
        <svg className="ci-radial-meter__ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <circle className="ci-radial-meter__track" cx="50" cy="50" r="45" />
          {percent > 0 ? (
            <circle className="ci-radial-meter__arc" cx="50" cy="50" r="45" pathLength={100} strokeDasharray="100" strokeDashoffset={100 - percent} />
          ) : null}
        </svg>
        {hasChildren || showValue ? <span className="ci-radial-meter__center">{hasChildren ? children : valueText}</span> : null}
      </div>
      {hasVisibleLabel ? <span id={labelId} className="ci-radial-meter__label">{label}</span> : null}
    </div>
  );
}
