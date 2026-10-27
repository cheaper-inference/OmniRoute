"use client";

import { useState, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, type CardProps } from "./card";
import { cn } from "./lib/utils";
import { MetricMotionContext } from "./metric-motion";

export type OverviewTone = "accent" | "info" | "success";
export interface OverviewMetric {
  label: string;
  value: ReactNode;
}
export interface OverviewCardProps extends Omit<CardProps, "title" | "description" | "action" | "footer"> {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  tone?: OverviewTone;
  metrics?: OverviewMetric[];
  actions?: ReactNode;
  /** Replay compatible metric charts on mouse entry. Actions and focus stay mounted. */
  replayOnHover?: boolean;
}

export function OverviewCard({
  title, description, icon, tone = "accent", metrics = [], actions,
  replayOnHover = false, className, children, onPointerEnter, ...props
}: OverviewCardProps) {
  const [replay, setReplay] = useState(0);
  return <Card {...props} className={cn("ci-overview-card", `ci-overview-card--${tone}`, className)}
    data-chart-replay={replay}
    onPointerEnter={(event) => {
      onPointerEnter?.(event);
      if (!event.defaultPrevented && replayOnHover && event.pointerType === "mouse" &&
        window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
        setReplay((value) => value + 1);
      }
    }}>
    <CardHeader className="ci-overview-card__header">
      <div className="ci-overview-card__title-row">
        {icon && <span className="ci-overview-card__icon" aria-hidden>{icon}</span>}
        <CardTitle role="heading" aria-level={2}>{title}</CardTitle>
      </div>
      <p className="ci-overview-card__description">{description}</p>
    </CardHeader>
    <CardContent className="ci-overview-card__body">
      <div className="ci-overview-card__insights">
        <MetricMotionContext.Provider value={replay}>{children}</MetricMotionContext.Provider>
        {!!metrics.length && <dl className="ci-overview-card__metrics">
          {metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
        </dl>}
      </div>
      {actions && <div className="ci-overview-card__actions">{actions}</div>}
    </CardContent>
  </Card>;
}
