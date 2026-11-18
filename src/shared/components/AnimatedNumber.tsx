"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Value of an easeOutCubic tween from `from` to `to` at progress `t` (0..1, clamped).
 * Lands exactly on `to` at t = 1 so the last frame never shows a float residue.
 */
export function computeAnimatedFrame(from: number, to: number, t: number): number {
  const progress = Math.min(1, Math.max(0, t));
  if (progress >= 1) return to;
  const eased = 1 - Math.pow(1 - progress, 3);
  return from + (to - from) * eased;
}

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener?.("change", onChange);
  return () => mql.removeEventListener?.("change", onChange);
}

function getReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return Boolean(window.matchMedia(REDUCED_MOTION_QUERY)?.matches);
}

const defaultFormat = (n: number) => new Intl.NumberFormat().format(n);

/**
 * Renders a number that eases toward its new value whenever `value` changes, so a counter
 * that moved is noticeable. The first render shows the value as-is (no count-up from zero).
 *
 * - `format` is applied to every frame, so the output keeps the caller's exact formatting.
 * - `integer` (default) rounds the in-flight value before formatting — counters never show
 *   fractions mid-animation. Pass `integer={false}` for money so cents are preserved.
 * - Honours `prefers-reduced-motion`: the new value is shown immediately.
 */
export default function AnimatedNumber({
  value,
  format = defaultFormat,
  duration = 600,
  integer = true,
  className,
}: {
  value: number | null | undefined;
  format?: (n: number) => string;
  duration?: number;
  integer?: boolean;
  className?: string;
}) {
  const target = Number.isFinite(Number(value)) ? Number(value) : 0;
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const animate = !reducedMotion && duration > 0;
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);

  useEffect(() => {
    const from = displayRef.current;
    if (from === target) return undefined;

    let frameId = 0;
    if (!animate) {
      // Rendering already shows `target` directly; just keep the state in sync off the
      // effect body so re-enabling motion later starts from the right number.
      displayRef.current = target;
      frameId = requestAnimationFrame(() => setDisplay(target));
      return () => cancelAnimationFrame(frameId);
    }

    let startedAt: number | null = null;
    const tick = (now: number) => {
      if (startedAt === null) startedAt = now;
      const t = (now - startedAt) / duration;
      const next = computeAnimatedFrame(from, target, t);
      displayRef.current = next;
      setDisplay(next);
      if (t < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, animate]);

  const shown = animate ? display : target;
  return <span className={className}>{format(integer ? Math.round(shown) : shown)}</span>;
}
