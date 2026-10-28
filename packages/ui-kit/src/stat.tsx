import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";
import { NumberTicker } from "./number-ticker";

export type StatTone = "default" | "positive" | "critical";
export type StatFormat = "number" | "compact" | "currency" | "percent" | "text";
export type StatLabelVariant = "default" | "eyebrow";

interface StatBaseProps extends ComponentProps<"div"> {
  label: ReactNode;
  /** Decorative mark displayed before the label. */
  icon?: ReactNode;
  /** Opt-in compact uppercase treatment for dashboard summary labels. */
  labelVariant?: StatLabelVariant;
  hint?: ReactNode;
  suffix?: ReactNode;
  tone?: StatTone;
  currency?: string;
  /** Locale used by both static and animated number formatting. */
  locale?: string;
  /** Fine-grained Intl overrides for product-specific currency and precision rules. */
  numberFormatOptions?: Intl.NumberFormatOptions;
  animate?: boolean;
  /** Optional NumberTicker duration override, in seconds. */
  animationDuration?: number;
  /** Optional NumberTicker viewport behavior override. */
  animateOnView?: boolean;
}

/** Text summaries use the same card structure with wrapping, compact typography.
 * Numeric options and animation only apply to numeric values. Null stays unknown.
 */
export type StatProps = StatBaseProps & (
  | { format?: Exclude<StatFormat, "text">; value: number | null }
  | { format: "text"; value: string | null }
);

function formatOptions(format: StatFormat, currency: string): Intl.NumberFormatOptions {
  if (format === "compact") return { notation: "compact", maximumFractionDigits: 1 };
  if (format === "currency") return { style: "currency", currency, maximumFractionDigits: 2 };
  if (format === "percent") return { style: "percent", maximumFractionDigits: 2 };
  return { maximumFractionDigits: 2 };
}

export function Stat({
  className,
  label,
  icon,
  labelVariant = "default",
  value,
  hint,
  suffix,
  tone = "default",
  format = "number",
  currency = "USD",
  locale,
  numberFormatOptions,
  animate = false,
  animationDuration,
  animateOnView,
  ...props
}: StatProps) {
  const options = { ...formatOptions(format, currency), ...numberFormatOptions };
  const rendered = value === null ? "—" : typeof value === "string" ? value : new Intl.NumberFormat(locale, options).format(value);
  return (
    <div
      data-label-variant={labelVariant}
      data-value-format={format}
      className={cn("ci-stat", `ci-stat--${tone}`, className)}
      {...props}
    >
      <div className="ci-stat__label">
        {icon != null ? (
          <span className="ci-stat__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className="ci-stat__label-text">{label}</span>
      </div>
      <div className="ci-stat__value">
        {value === null ? (
          "—"
        ) : animate && typeof value === "number" ? (
          <NumberTicker
            value={value}
            formatOptions={options}
            locale={locale}
            duration={animationDuration}
            animateOnView={animateOnView}
          />
        ) : (
          rendered
        )}
        {value !== null ? suffix : null}
      </div>
      {hint != null && <div className="ci-stat__hint">{hint}</div>}
    </div>
  );
}

export interface StatRowProps extends ComponentProps<"div"> {
  columns?: 2 | 3 | 4;
}

export function StatRow({ className, columns = 4, ...props }: StatRowProps) {
  return <div data-columns={columns} className={cn("ci-stat-row", className)} {...props} />;
}
