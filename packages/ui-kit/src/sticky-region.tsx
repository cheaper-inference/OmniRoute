"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "./lib/utils";

export interface StickyRegionProps extends Omit<ComponentProps<"div">, "ref"> {
  /** Space above the pinned region, in nonnegative CSS pixels. Defaults to 0. */
  topOffset?: number;
  /** Space reserved below the region when checking whether it fits, in CSS pixels. */
  bottomGap?: number;
  /** Minimum browser viewport width for sticky positioning. Defaults to 1024 CSS pixels. */
  minWidth?: number;
}

/** Keep invalid layout inputs from enabling an unmeasurable sticky region. */
function nonnegative(value: number, fallback: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : fallback;
}

/** CSS sticky follows the nearest scrolling ancestor, including overflow:hidden. */
function nearestScrollport(region: HTMLElement): HTMLElement | null {
  for (let element = region.parentElement; element; element = element.parentElement) {
    if (element === region.ownerDocument.scrollingElement) return null;
    const style = getComputedStyle(element);
    if (/^(auto|scroll|hidden|overlay)$/.test(style.overflowY || style.overflow)) return element;
  }
  return null;
}

/**
 * Pins ordinary content only while the whole region fits its scrollport and the
 * visible browser viewport. Oversized or narrow layouts stay in normal flow so
 * their lower fields and keyboard controls remain reachable. Server output is
 * static; resize measurements enable sticky positioning after mount.
 */
export const StickyRegion = forwardRef<HTMLDivElement, StickyRegionProps>(function StickyRegion({
  topOffset = 0, bottomGap = 0, minWidth = 1024, className, style, children, ...props
}, ref) {
  const regionRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);
  const top = nonnegative(topOffset, 0);
  const bottom = nonnegative(bottomGap, 0);
  const minimumWidth = nonnegative(minWidth, 1024);
  useImperativeHandle(ref, () => regionRef.current!, []);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    let scrollport: HTMLElement | null = null;
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);

    /** Recheck both boundaries and retarget the observer if responsive overflow changes. */
    function measure() {
      const nextScrollport = nearestScrollport(region!);
      if (nextScrollport !== scrollport) {
        if (scrollport) observer?.unobserve(scrollport);
        scrollport = nextScrollport;
        if (scrollport) observer?.observe(scrollport, { box: "border-box" });
      }
      const viewportHeight = Math.min(window.innerHeight,
        document.documentElement.clientHeight || window.innerHeight,
        window.visualViewport?.height ?? window.innerHeight);
      const scrollportStyle = scrollport ? getComputedStyle(scrollport) : null;
      // clientHeight excludes borders but includes padding. Native sticky
      // positioning reserves the scrollport's padding, so it is not usable room.
      const scrollportHeight = scrollport ? scrollport.clientHeight
        - (Number.parseFloat(scrollportStyle!.paddingTop) || 0)
        - (Number.parseFloat(scrollportStyle!.paddingBottom) || 0) : viewportHeight;
      const availableHeight = Math.min(viewportHeight, scrollportHeight);
      const height = region!.getBoundingClientRect().height;
      setSticky(window.innerWidth >= minimumWidth && height > 0 && height + top + bottom <= availableHeight);
    }

    observer?.observe(region, { box: "border-box" });
    // Overflow can change without resizing an ancestor (for example, a panel
    // becoming scrollable). Observe only ancestor classes/styles, not subtrees.
    const ancestorObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(measure);
    for (let ancestor = region.parentElement; ancestor; ancestor = ancestor.parentElement) {
      ancestorObserver?.observe(ancestor, { attributes: true, attributeFilter: ["class", "style"] });
    }
    measure();
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      ancestorObserver?.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [minimumWidth, top, bottom]);

  return <div {...props} ref={regionRef} data-slot="sticky-region" data-sticky={sticky ? "" : undefined}
    className={cn("ci-sticky-region", className)} style={{ ...style, top }}>{children}</div>;
});
