"use client";

import type { ComponentProps, ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUp, Minus } from "lucide-react";
import { cn } from "./lib/utils";
import { Card } from "./card";
import { Stat, type StatProps } from "./stat";
import { Skeleton } from "./skeleton";
import { EmptyState } from "./empty-state";
import { Button } from "./button";

export interface MetricTrendProps extends ComponentProps<"div"> {
  /** Already formatted change. No percentage or comparison-period math happens here. */
  value: ReactNode;
  direction?: "up" | "down" | "flat";
  tone?: "neutral" | "positive" | "negative";
  comparison?: ReactNode;
}

export function MetricTrend({ value, direction, tone = "neutral", comparison, className, ...props }: MetricTrendProps) {
  const Icon = direction === "up" ? ArrowUp : direction === "down" ? ArrowDown : direction === "flat" ? Minus : null;
  return <div {...props} className={cn("ci-metric-trend", className)} data-tone={tone}>
    <div className="ci-metric-trend__value">{Icon && <Icon size={17} aria-hidden="true" />}{direction && <span className="ci-sr-only">{direction === "up" ? "Increase " : direction === "down" ? "Decrease " : "No change "}</span>}{value}</div>
    {comparison != null && <div className="ci-metric-trend__comparison">{comparison}</div>}
  </div>;
}

type SelectionProps =
  | { onSelect: () => void; selectionLabel: string; selected?: boolean; disabled?: boolean }
  | { onSelect?: undefined; selectionLabel?: never; selected?: never; disabled?: never };

export type MetricCardProps = Omit<ComponentProps<"div">, "onSelect"> & SelectionProps & {
  stat: StatProps;
  /** The two approved preview compositions: full chart, or compact selectable summary. */
  presentation?: "primary" | "secondary";
  /** Tabs/actions are independent from the optional whole-card selection button. */
  controls?: ReactNode;
  comparison?: ReactNode;
  footer?: ReactNode;
  state?: "ready" | "loading" | "empty" | "error";
  loadingLabel?: string;
  emptyLabel?: string;
  errorLabel?: string;
  stateActions?: ReactNode;
  sparkline?: ReactNode;
  selectionText?: ReactNode;
};

/** Presentation only: compose existing Card/Stat with trend, chart and scope slots. */
export function MetricCard({
  stat, controls, comparison, footer, children, className, onSelect, selectionLabel, selected, presentation = "primary", sparkline, selectionText = "View chart",
  disabled, state = "ready", loadingLabel = "Loading metric", emptyLabel,
  errorLabel = typeof stat.label === "string" ? `Couldn’t load ${stat.label.toLowerCase()}. Try again.` : "Couldn’t load this metric. Try again.", stateActions, ...props
}: MetricCardProps) {
  const selectable = !disabled && (state === "ready" || state === "empty");
  return <Card {...props} className={cn("ci-metric-card", className)} data-presentation={presentation} data-state={state} data-selected={selected || undefined} data-disabled={disabled || undefined} aria-busy={state === "loading" || undefined}>
    {onSelect && <button type="button" className="ci-metric-card__select" aria-label={selectionLabel} aria-pressed={selected} disabled={!selectable} onClick={onSelect} />}
    {presentation === "secondary" && onSelect && <Button type="button" variant="outline" size="sm" className="ci-metric-card__view" tabIndex={-1} aria-hidden="true" onPointerDown={event => event.preventDefault()} onClick={onSelect} disabled={!selectable}>{selectionText}<ArrowRight size={12} /></Button>}
    {state === "loading" ? <div className="ci-metric-card__loading" role="status" aria-label={loadingLabel}><div><Skeleton width="55%" height={16} /><Skeleton width="75%" height={32} /><Skeleton width="90%" height={12} /></div><div><Skeleton width="75%" height={18} /><Skeleton width="100%" height={12} /></div><Skeleton width="100%" height={48} /></div> : state === "error" ? <div className="ci-metric-card__error" role="alert">{errorLabel}{stateActions}</div> : state === "empty" && emptyLabel != null ? <EmptyState compact title={emptyLabel} actions={stateActions} /> : <>
      <div className="ci-metric-card__head">
        <Stat {...stat} className={cn("ci-metric-card__stat", stat.className)} />
        {(controls != null || comparison != null) && <div className="ci-metric-card__side">
          {controls != null && <div className="ci-metric-card__controls">{controls}</div>}
          {comparison}
        </div>}
        {presentation === "secondary" && <div className="ci-metric-card__sparkline" aria-hidden="true">{sparkline}</div>}
      </div>
      {children != null && <div className="ci-metric-card__body">{children}</div>}
      {footer != null && <div className="ci-metric-card__footer">{footer}</div>}
    </>}
  </Card>;
}
