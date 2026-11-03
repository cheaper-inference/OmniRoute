"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Megaphone, Minus } from "lucide-react";
import { Button } from "./button";

export interface AnnouncementMediaState {
  /** Pause timers/animations for dialogs and hidden/offscreen cards. */
  paused: boolean;
  /** Render a complete, still example instead of playing a sequence. */
  reducedMotion: boolean;
}
export interface AnnouncementItem {
  id: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  tone?: "neutral" | "accent" | "info" | "success" | "warning" | "violet";
  /** Decorative media only; the carousel makes this subtree inert and hides it from AT. */
  media?: ReactNode | ((state: AnnouncementMediaState) => ReactNode);
}
export interface AnnouncementCarouselProps {
  items: readonly AnnouncementItem[];
  /** Minimize/restore is available by default. Set false to keep the section expanded. */
  minimizable?: boolean;
  /** Controlled preference. Pair with onCollapsedChange to persist it in the consumer. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Pause for related dialogs. Hover/focus pause rotation while the active example remains readable. */
  paused?: boolean;
  /** Defaults to 5 seconds for all usages. Rich-media stories can explicitly choose a longer interval. */
  interval?: number;
  label?: string;
  /** The media variant places illustration/UI media beside copy, then above it on mobile. */
  variant?: "compact" | "media";
}

/** Links, dialogs, eligibility and decorative scenes remain consumer-owned. */
export function AnnouncementCarousel({
  items,
  minimizable = true,
  collapsed,
  onCollapsedChange,
  paused = false,
  interval = 5000,
  label = "Announcements",
  variant = "compact",
}: AnnouncementCarouselProps) {
  const root = useRef<HTMLElement>(null);
  const contentId = useId();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const minimized = minimizable && (collapsed ?? internalCollapsed);
  const changeCollapsed = (value: boolean) => {
    setInternalCollapsed(value);
    onCollapsedChange?.(value);
  };
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  // SSR starts still, matching the first client render.
  const [reducedMotion, setReducedMotion] = useState(true);
  const active = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  );
  const current = items[active];
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReducedMotion(media.matches);
    const visibility = () => setHidden(document.hidden);
    motion();
    visibility();
    media.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (
      minimized ||
      variant !== "media" ||
      !root.current ||
      typeof IntersectionObserver === "undefined"
    )
      return;
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [variant, items.length > 0, minimized]);
  const mediaPaused = paused || hidden || offscreen || reducedMotion;
  const stopped = mediaPaused || hovered || focused || minimized;
  useEffect(() => {
    if (stopped || items.length < 2 || interval <= 0) return;
    const timer = window.setTimeout(
      () => setActiveId(items[(active + 1) % items.length].id),
      interval,
    );
    return () => window.clearTimeout(timer);
  }, [active, current?.id, interval, items, stopped]);
  if (!current) return null;
  const move = (delta: number) =>
    setActiveId(items[(active + delta + items.length) % items.length].id);
  const rich = variant === "media";
  return (
    <section
      ref={root}
      className={minimized ? "ci-announcements-collapsed" : "ci-announcements"}
      data-variant={variant}
      data-tone={current.tone || "info"}
      data-controls={
        items.length > 1 || minimizable || undefined
      }
      data-collapsible={minimizable || undefined}
      aria-label={label}
      aria-roledescription={minimized ? undefined : "carousel"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false);
      }}
    >
      <div className="ci-announcements__controls">
        {!minimized && items.length > 1 && (
          <>
            <span>
              {active + 1} / {items.length}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Previous announcement"
              onClick={() => move(-1)}
            >
              <ChevronLeft aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Next announcement"
              onClick={() => move(1)}
            >
              <ChevronRight aria-hidden />
            </Button>
          </>
        )}
        {minimizable && (
          <Button
            key="toggle"
            className={minimized ? "ci-announcements__restore" : undefined}
            type="button"
            variant="ghost"
            size={minimized ? "sm" : "icon-xs"}
            aria-label={
              minimized ? "Show announcements" : "Minimize announcements"
            }
            title={minimized ? "Show announcements" : "Minimize announcements"}
            aria-expanded={!minimized}
            aria-controls={contentId}
            onClick={() => changeCollapsed(!minimized)}
          >
            {minimized ? (
              <>
                <Megaphone aria-hidden />
                <span className="ci-announcements__restore-label">{label}</span>
                <ChevronDown className="ci-announcements__restore-chevron" aria-hidden />
              </>
            ) : <Minus aria-hidden />}
          </Button>
        )}
      </div>
      <div id={contentId} hidden={minimized}>
        {!minimized && (
          <>
            <div
              className="ci-announcements__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${active + 1} of ${items.length}: ${current.label}`}
            >
              {!rich && current.icon && (
                <span className="ci-announcements__icon" aria-hidden>
                  {current.icon}
                </span>
              )}
              {rich && (
                <div
                  className="ci-announcements__media"
                  aria-hidden="true"
                  inert
                  key={current.id}
                  data-paused={mediaPaused}
                  data-reduced-motion={reducedMotion}
                >
                  <div className="ci-announcements__media-content">
                    {typeof current.media === "function"
                      ? current.media({ paused: mediaPaused, reducedMotion })
                      : (current.media ?? current.icon)}
                  </div>
                </div>
              )}
              <div
                className="ci-announcements__copy"
                aria-live={stopped ? "polite" : "off"}
              >
                <h2>{current.title}</h2>
                {current.description && <p>{current.description}</p>}
                {current.actions && (
                  <div className="ci-announcements__actions">
                    {current.actions}
                  </div>
                )}
              </div>
            </div>
            {items.length > 1 && (
              <div className="ci-announcements__dots">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.label} announcement`}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => setActiveId(item.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
