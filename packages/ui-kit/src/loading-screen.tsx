"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { BRAND_PATHS } from "./lib/brand-loader-geometry";
import { cn } from "./lib/utils";

export interface LoadingMessage {
  /** Time since mounting, in milliseconds. Messages describe a wait, not measured progress. */
  afterMs: number;
  label: string;
  description: string;
}

const DEFAULT_MESSAGES: readonly LoadingMessage[] = [
  { afterMs: 0, label: "A little less waiting. A lot more saving.", description: "Getting your workspace ready…" },
  { afterMs: 3000, label: "Great models. Better prices.", description: "Fetching the cheapest models…" },
  { afterMs: 7000, label: "Your next great idea starts here.", description: "Preparing your dashboard…" },
  { afterMs: 12000, label: "Almost there…", description: "Thanks for hanging tight while your workspace loads." },
  { afterMs: 22000, label: "Taking a little longer than usual.", description: "We’re still working. Your workspace will appear when it’s ready." },
];

export interface LoadingScreenProps extends ComponentProps<"div"> {
  title?: string;
  /** Ordered, elapsed-time copy. The last message remains visible for long waits. */
  messages?: readonly LoadingMessage[];
}

/** CSS-only artwork avoids an animation-frame React loop inside Suspense fallbacks. */
export function LoadingScreen({ title = "Cheaper Inference", messages = DEFAULT_MESSAGES, className, ...props }: LoadingScreenProps) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
    const started = Date.now();
    const timers = messages.slice(1).map((message, next) => window.setTimeout(
      () => setIndex(next + 1), Math.max(0, message.afterMs - (Date.now() - started)),
    ));
    return () => timers.forEach(window.clearTimeout);
  }, [messages]);
  const message = messages[Math.min(index, messages.length - 1)] ?? DEFAULT_MESSAGES[0];

  return (
    <div {...props} data-slot="loading-screen" className={cn("ci-loading-screen", className)}>
      <div className="ci-loading-screen__content">
        <div className="ci-loading-screen__art" aria-hidden="true">
          <div className="ci-loading-screen__halo" />
          <div className="ci-loading-screen__orbit"><span /></div>
          <div className="ci-loading-screen__orbit ci-loading-screen__orbit--inner"><span /></div>
          <div className="ci-loading-screen__mark">
            <svg viewBox="40 32 156 174" fill="currentColor" focusable="false">
              {BRAND_PATHS.map((path, key) => <path key={key} d={path} />)}
            </svg>
          </div>
        </div>
        <p className="ci-loading-screen__title">{title}</p>
        <div className="ci-loading-screen__copy" role="status" aria-live="polite" aria-atomic="true">
          <div key={index} className="ci-loading-screen__message">
            <p className="ci-loading-screen__label">{message.label}</p>
            <p className="ci-loading-screen__description">{message.description}</p>
          </div>
        </div>
        <div className="ci-loading-screen__track" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
