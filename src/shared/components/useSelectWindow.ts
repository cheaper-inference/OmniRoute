import { useEffectEvent, useLayoutEffect, useMemo, useRef, useState } from "react";

const ESTIMATED_HEIGHT = 48;
const OVERSCAN = 5;
const WINDOW_THRESHOLD = 100;
const INITIAL_VIEWPORT_HEIGHT = 320;

function indexAt(offsets: number[], position: number) {
  let low = 0;
  let high = offsets.length - 2;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (offsets[middle] <= position) low = middle;
    else high = middle - 1;
  }
  return low;
}

/** Variable-height rows: only the visible window and active descendant are mounted.
 * Heights are measured, never imposed, so translated/wrapped labels remain intact.
 * The caller remounts the list on query changes to discard stale measurements/scroll.
 */
export function useSelectWindow(count: number, activeIndex: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState(() => new Map<number, number>());
  const revealActive = useRef(false);
  const previousActive = useRef<number | undefined>(undefined);
  const observerRef = useRef<ResizeObserver | null>(null);
  const observedRows = useRef(new Set<Element>());
  const [viewport, setViewport] = useState({ top: 0, height: INITIAL_VIEWPORT_HEIGHT });
  const enabled = count > WINDOW_THRESHOLD;
  const offsets = useMemo(() => {
    const result = [0];
    for (let index = 0; index < count; index++)
      result.push(result[index] + (heights.get(index) ?? ESTIMATED_HEIGHT));
    return result;
  }, [count, heights]);
  const first = Math.max(0, indexAt(offsets, viewport.top) - OVERSCAN);
  const last = Math.min(count - 1, indexAt(offsets, viewport.top + viewport.height) + OVERSCAN);
  const indexes = enabled
    ? Array.from({ length: last - first + 1 }, (_, index) => first + index)
    : Array.from({ length: count }, (_, index) => index);
  if (enabled && activeIndex >= 0 && !indexes.includes(activeIndex)) {
    indexes.push(activeIndex);
    indexes.sort((a, b) => a - b);
  }
  function syncViewport() {
    const node = ref.current;
    if (!node) return;
    const top = node.scrollTop;
    const height = Math.min(node.clientHeight || INITIAL_VIEWPORT_HEIGHT, INITIAL_VIEWPORT_HEIGHT);
    setViewport((previous) =>
      previous.top === top && previous.height === height ? previous : { top, height }
    );
  }
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || activeIndex < 0 || previousActive.current === activeIndex) return;
    previousActive.current = activeIndex;
    if (!enabled) {
      node
        .querySelector<HTMLElement>(`[data-option-index="${activeIndex}"]`)
        ?.scrollIntoView?.({ block: "nearest" });
      return;
    }
    revealActive.current = true;
    const top = offsets[activeIndex];
    const bottom = offsets[activeIndex + 1];
    const height = Math.min(node.clientHeight || INITIAL_VIEWPORT_HEIGHT, INITIAL_VIEWPORT_HEIGHT);
    if (top < node.scrollTop) node.scrollTop = top;
    else if (bottom > node.scrollTop + height) node.scrollTop = bottom - height;
    syncViewport();
  });
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || !revealActive.current || !heights.has(activeIndex)) return;
    // The measured spacer height must be committed before scrolling to its tail.
    // Scrolling inside ResizeObserver would clamp against the previous DOM height.
    const top = offsets[activeIndex];
    const style = getComputedStyle(node);
    const padding = (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0);
    const bottom = offsets[activeIndex + 1] + padding;
    const height = Math.min(node.clientHeight || INITIAL_VIEWPORT_HEIGHT, INITIAL_VIEWPORT_HEIGHT);
    if (top < node.scrollTop) node.scrollTop = top;
    else if (bottom > node.scrollTop + height) node.scrollTop = bottom - height;
    revealActive.current = false;
    syncViewport();
  });
  const measure = useEffectEvent((entries: ResizeObserverEntry[]) => {
    const node = ref.current;
    if (!node) return;
    const anchor = indexAt(offsets, node.scrollTop);
    const measured = new Map(heights);
    let correction = 0;
    let changed = false;
    for (const entry of entries) {
      const row = entry.target as HTMLElement;
      if (row.dataset.optionIndex === undefined) continue;
      const index = Number(row.dataset.optionIndex);
      // Observer border boxes exclude the popover's scale animation. Do not force
      // per-row synchronous layout with offsetHeight/getBoundingClientRect.
      const height = entry.borderBoxSize?.[0]?.blockSize;
      const previous = heights.get(index) ?? ESTIMATED_HEIGHT;
      if (height > 0 && (!heights.has(index) || Math.abs(height - previous) > 0.01)) {
        measured.set(index, height);
        if (index < anchor) correction += height - previous;
        changed = true;
      }
    }
    if (correction) node.scrollTop += correction;
    if (changed) setHeights(measured);
    syncViewport();
  });
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;
    const observer = new ResizeObserver((entries) => measure(entries));
    observerRef.current = observer;
    observer.observe(node);
    return () => {
      observer.disconnect();
      observerRef.current = null;
      observedRows.current = new Set();
    };
  }, [enabled]);
  useLayoutEffect(() => {
    const observer = observerRef.current;
    const node = ref.current;
    if (!observer || !node) return;
    const next = new Set(node.querySelectorAll<HTMLElement>("[data-option-index]"));
    for (const row of observedRows.current) {
      if (!next.has(row as HTMLElement)) observer.unobserve(row);
    }
    for (const row of next) {
      if (!observedRows.current.has(row)) observer.observe(row);
    }
    observedRows.current = next;
  });
  return { ref, indexes, offsets, enabled, onScroll: syncViewport };
}
