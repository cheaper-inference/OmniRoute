import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export interface SellerEarningsMetric {
  /** A unique label within this strip. */
  label: string;
  /** Already formatted by the caller, including currency, if applicable. */
  value: ReactNode;
  note: ReactNode;
}

export interface SellerEarningsSummaryStripProps extends ComponentProps<"div"> {
  metrics: readonly SellerEarningsMetric[];
  /** Overview uses four columns. Earnings and payments uses five. */
  variant?: "overview" | "payments";
}

export function SellerEarningsSummaryStrip({
  metrics,
  variant = "overview",
  className,
  ...props
}: SellerEarningsSummaryStripProps) {
  return (
    <div
      {...props}
      className={cn("ci-seller-earnings-summary-strip", className)}
      data-ci-seller=""
      data-variant={variant}
    >
      {metrics.map(({ label, value, note }) => (
        <div key={label}>
          <small>{label}</small>
          <strong>{value}</strong>
          <span>{note}</span>
        </div>
      ))}
    </div>
  );
}
