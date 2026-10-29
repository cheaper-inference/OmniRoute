"use client";

import { useEffect, useState } from "react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cn } from "./lib/utils";

export type LoadingStateVariant = "inline" | "panel";
export interface LoadingStateProps extends ComponentProps<"div"> {
  /** Use span for feedback inside links, paragraphs, or other phrasing content. */
  as?: "div" | "span";
  label?: ReactNode;
  description?: ReactNode;
  variant?: LoadingStateVariant;
  showElapsed?: boolean;
  startedAt?: number;
}

function useElapsed(enabled: boolean, startedAt?: number) {
  const [elapsed, setElapsed] = useState("0.0s");
  useEffect(() => {
    if (!enabled) return;
    const start = startedAt ?? Date.now();
    const update = () => setElapsed(`${((Date.now() - start) / 1000).toFixed(1)}s`);
    update();
    const timer = window.setInterval(update, 100);
    return () => window.clearInterval(timer);
  }, [enabled, startedAt]);
  return elapsed;
}

export function LoadingState({ as: Element = "div", className, label = "Loading", description, variant = "inline", showElapsed = false, startedAt, ...props }: LoadingStateProps) {
  const elapsed = useElapsed(showElapsed, startedAt);
  return (
    <Element role="status" aria-live="polite" data-slot="loading-state" data-variant={variant} className={cn("ci-loading", `ci-loading--${variant}`, className)} {...props}>
      <span className="ci-loading__grid" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <span key={index} style={{ "--ci-loading-index": index } as CSSProperties} />)}
      </span>
      <span className="ci-loading__content">
        <span className="ci-loading__label">{label}</span>
        {description != null && <span className="ci-loading__description">{description}</span>}
      </span>
      {showElapsed && <span className="ci-loading__elapsed">{elapsed}</span>}
    </Element>
  );
}
