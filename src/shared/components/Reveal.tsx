"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/shared/lib/gsap";

// Only animate when the OS-level "reduce motion" setting is off; otherwise the
// content renders in place with no tween and no ScrollTrigger.
const MOTION_OK_QUERY = "(prefers-reduced-motion: no-preference)";

interface RevealProps {
  children: ReactNode;
  /** Element to render, so callers can swap their own wrapper for <Reveal>. */
  as?: "div" | "section";
  className?: string;
  /** Seconds to wait after the block scrolls into view (useful for staggering siblings). */
  delay?: number;
}

/**
 * Fades and slides its content up the first time it scrolls into view.
 *
 * The animation is scoped to this component: unmounting reverts the tween and
 * kills its ScrollTrigger. `clamp()` keeps the trigger reachable for blocks near
 * the bottom of a short page, so content can never stay hidden.
 */
export default function Reveal({ children, as = "div", className, delay = 0 }: RevealProps) {
  // Typed for the <div> case so it fits both tags; GSAP only needs an element.
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK_QUERY, () => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        delay,
        ease: "power2.out",
        // Drop the inline transform once done so fixed-position descendants
        // (overlays, popovers) are not trapped by a transformed ancestor.
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: el, start: "clamp(top 90%)", once: true },
      });
    });

    return () => mm.revert();
  }, [delay]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
