"use client";
import { useCallback, useEffect, useId, useRef } from "react";
import type { ComponentProps, ReactNode } from "react";
import { CircleCheck } from "lucide-react";
import { Button } from "./button";
import { cn } from "./lib/utils";

export interface SuccessTransitionProps extends Omit<ComponentProps<"section">, "title"> {
  title: ReactNode;
  description?: ReactNode;
  onComplete: () => void;
  /** Confirmation dwell only. Reduced-motion users continue immediately. */
  durationMs?: number;
  continueLabel?: string;
  /** Center the handoff in the available app workspace. */
  presentation?: "card" | "stage";
}
/** A brief verified-success handoff. It never performs or infers a payment. */
export function SuccessTransition({ title, description, onComplete, durationMs = 1100, continueLabel = "Continue to dashboard", presentation = "card", className, ...props }: SuccessTransitionProps) {
  const id = useId(), completed = useRef(false), complete = useRef(onComplete);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);
  const finish = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    complete.current();
  }, []);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setTimeout(finish, motion.matches ? 0 : Math.max(0, durationMs));
    const reduce = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", reduce);
    return () => { window.clearTimeout(timer); motion.removeEventListener("change", reduce); };
  }, [durationMs, finish]);
  return <section role="status" aria-live="polite" aria-atomic="true" aria-labelledby={id} data-slot="success-transition"
    data-presentation={presentation} className={cn("ci-success-transition", className)} {...props}>
    <span className="ci-success-transition__icon"><span className="ci-success-transition__ring" aria-hidden="true" /><CircleCheck aria-hidden="true" /></span>
    <div className="ci-success-transition__copy"><h2 id={id}>{title}</h2>{description && <p>{description}</p>}</div>
    <Button type="button" variant="ghost" size="sm" onClick={finish}>{continueLabel}</Button>
  </section>;
}
