"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { resolveLabels } from "./lib/labels";
import { cn } from "./lib/utils";
import { TableScrollAreaContext, TableScrollAreaNameContext } from "./table-scroll-context";

type ScrollbarMetrics = {
  maximum: number;
  thumbLeft: number;
  thumbWidth: number;
  value: number;
};

const EMPTY_METRICS: ScrollbarMetrics = {
  maximum: 0,
  thumbLeft: 0,
  thumbWidth: 0,
  value: 0,
};

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

/** Interface text of the persistent scrollbar. */
export interface TableScrollAreaLabels {
  /** Accessible name of the scrollbar, built from `scrollbarLabel`. */
  scrollbar: (label: string) => string;
}
export const defaultTableScrollAreaLabels: TableScrollAreaLabels = {
  scrollbar: (label) => `Top ${label} horizontal scrollbar`,
};

const TableScrollAreaLabelsContext = createContext(defaultTableScrollAreaLabels);

export interface TableScrollAreaLabelsProviderProps {
  /** Missing or `undefined` keys keep the value of the provider above, or the English default. */
  labels: Partial<TableScrollAreaLabels>;
  children?: ReactNode;
}

/**
 * Sets the scrollbar text once for every Table and TableScrollArea below it, so an app does not
 * repeat `labels` on each table. A `labels` prop on a table still wins.
 */
export function TableScrollAreaLabelsProvider({ labels, children }: TableScrollAreaLabelsProviderProps) {
  const inherited = useContext(TableScrollAreaLabelsContext);
  const resolved = useMemo(() => resolveLabels(inherited, labels), [inherited, labels]);
  return <TableScrollAreaLabelsContext.Provider value={resolved}>{children}</TableScrollAreaLabelsContext.Provider>;
}

function PersistentTableScrollbar({
  areaRef,
  name,
  targetId,
}: {
  areaRef: RefObject<HTMLDivElement | null>;
  name: string;
  targetId: string;
}) {
  const targetRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startClientX: number;
    startScrollLeft: number;
  } | null>(null);
  const [metrics, setMetrics] = useState(EMPTY_METRICS);

  const updateMetrics = (target = targetRef.current) => {
    if (!target) return;
    const viewportWidth = target.clientWidth;
    const trackWidth = trackRef.current?.clientWidth || viewportWidth;
    const contentWidth = target.scrollWidth;
    const maximum = Math.max(0, contentWidth - viewportWidth);
    const thumbWidth =
      maximum === 0
        ? trackWidth
        : Math.max(32, (viewportWidth / contentWidth) * trackWidth);
    const maxThumbLeft = Math.max(0, trackWidth - thumbWidth);
    const value = clamp(target.scrollLeft, 0, maximum);
    const thumbLeft =
      maximum === 0 ? 0 : (value / maximum) * maxThumbLeft;

    setMetrics({ maximum, thumbLeft, thumbWidth, value });
  };

  useEffect(() => {
    const target = areaRef.current?.querySelector<HTMLElement>(
      ':scope > [data-slot="table-container"], :scope > [data-slot="table-loading-region"] > [data-slot="table-loading-content"] > [data-slot="table-container"]',
    );
    if (!target) return;

    targetRef.current = target;
    target.id = targetId;
    const sync = () => updateMetrics(target);
    sync();
    target.addEventListener("scroll", sync, { passive: true });

    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(target);
    const table = target.querySelector("table");
    if (table) resizeObserver.observe(table);

    // Cell content can widen a fixed-layout table past its container without resizing either
    // observed box. The metrics decide whether the bar is a tab stop, so remeasure on content
    // changes too (one layout read per batch of mutations), as Table does for its container.
    const mutationObserver = typeof MutationObserver === "undefined" ? undefined : new MutationObserver(sync);
    if (table) {
      mutationObserver?.observe(table, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["style", "class"] });
    }

    return () => {
      target.removeEventListener("scroll", sync);
      resizeObserver.disconnect();
      mutationObserver?.disconnect();
      targetRef.current = null;
    };
  }, [areaRef, targetId]);

  const setScrollLeft = (value: number) => {
    const target = targetRef.current;
    if (!target) return;
    target.scrollLeft = clamp(value, 0, metrics.maximum);
    updateMetrics(target);
  };

  const scrollFromTrack = (clientX: number) => {
    const target = targetRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!target || !track || !thumb) return;

    const trackBounds = track.getBoundingClientRect();
    const maxThumbLeft = Math.max(0, track.clientWidth - thumb.offsetWidth);
    const requestedThumbLeft = clamp(
      clientX - trackBounds.left - thumb.offsetWidth / 2,
      0,
      maxThumbLeft,
    );
    setScrollLeft(
      maxThumbLeft === 0
        ? 0
        : (requestedThumbLeft / maxThumbLeft) * metrics.maximum,
    );
  };

  const moveThumb = (clientX: number) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!drag || !track || !thumb) return;

    const maxThumbLeft = Math.max(0, track.clientWidth - thumb.offsetWidth);
    const scrollPerPixel =
      maxThumbLeft === 0 ? 0 : metrics.maximum / maxThumbLeft;
    setScrollLeft(
      drag.startScrollLeft +
        (clientX - drag.startClientX) * scrollPerPixel,
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextValue: number | undefined;
    if (event.key === "ArrowLeft") nextValue = metrics.value - 40;
    if (event.key === "ArrowRight") nextValue = metrics.value + 40;
    if (event.key === "PageUp") {
      nextValue = metrics.value - (targetRef.current?.clientWidth ?? 0);
    }
    if (event.key === "PageDown") {
      nextValue = metrics.value + (targetRef.current?.clientWidth ?? 0);
    }
    if (event.key === "Home") nextValue = 0;
    if (event.key === "End") nextValue = metrics.maximum;
    if (nextValue === undefined) return;

    event.preventDefault();
    setScrollLeft(nextValue);
  };

  const startThumbDrag = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startScrollLeft: metrics.value,
    };
  };

  // With nothing to scroll the bar keeps its box, so the layout does not shift, but it is neither
  // a tab stop nor a scrollbar a screen reader can find. The server renders this state.
  const overflowing = metrics.maximum > 0;

  return (
    <div
      data-slot="table-scrollbar"
      className="ci-table-scrollbar"
      role="scrollbar"
      aria-label={name}
      aria-controls={targetId}
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={Math.round(metrics.maximum)}
      aria-valuenow={Math.round(metrics.value)}
      aria-hidden={overflowing ? undefined : true}
      tabIndex={overflowing ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={trackRef}
        className="ci-table-scrollbar__track"
        data-overflowing={overflowing ? "true" : "false"}
        onPointerDown={(event) => scrollFromTrack(event.clientX)}
      >
        <div
          ref={thumbRef}
          className="ci-table-scrollbar__thumb"
          style={{
            width: `${metrics.thumbWidth}px`,
            transform: `translateX(${metrics.thumbLeft}px)`,
          }}
          onPointerDown={startThumbDrag}
          onPointerMove={(event) => {
            if (dragRef.current?.pointerId === event.pointerId) {
              moveThumb(event.clientX);
            }
          }}
          onPointerUp={(event) => {
            if (dragRef.current?.pointerId === event.pointerId) {
              dragRef.current = null;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerCancel={() => {
            dragRef.current = null;
          }}
        />
      </div>
    </div>
  );
}

export interface TableScrollAreaProps extends ComponentProps<"div"> {
  /**
   * Accessible noun phrase used to label the persistent horizontal scrollbar. A Table inside
   * with no other name also uses it for its scroll container.
   */
  scrollbarLabel?: string;
  /** Localized scrollbar text; missing or `undefined` keys fall back to the provider, then to defaultTableScrollAreaLabels. */
  labels?: Partial<TableScrollAreaLabels>;
}

/**
 * Wraps one Table with a synchronized top horizontal scrollbar that stays
 * visible at every viewport width.
 */
export function TableScrollArea({
  children,
  className,
  scrollbarLabel,
  labels: labelOverrides,
  ...props
}: TableScrollAreaProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const targetId = useId();
  const labels = resolveLabels(useContext(TableScrollAreaLabelsContext), labelOverrides);

  return (
    <div
      ref={areaRef}
      data-slot="table-scroll-area"
      className={cn("ci-table-scroll-area", className)}
      {...props}
    >
      <TableScrollAreaContext.Provider value={true}>
        <PersistentTableScrollbar
          areaRef={areaRef}
          name={labels.scrollbar(scrollbarLabel ?? "Table")}
          targetId={targetId}
        />
        <TableScrollAreaNameContext.Provider value={scrollbarLabel || undefined}>
          {children}
        </TableScrollAreaNameContext.Provider>
      </TableScrollAreaContext.Provider>
    </div>
  );
}
