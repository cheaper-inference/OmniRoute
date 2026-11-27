"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { MousePointer2, X } from "lucide-react";
import { Button } from "./button";
import { resolveLabels } from "./lib/labels";

export interface GuidedWalkthroughLabels {
  /** Step counter in the card heading. */
  stepCount: (step: number, totalSteps: number) => string;
  /** Accessible name of the button that stops the walkthrough. */
  stop: string;
  /** Status text while the target is missing or hidden. */
  unavailable: string;
  /** Text of the back button. */
  back: string;
}

export const defaultGuidedWalkthroughLabels: GuidedWalkthroughLabels = {
  stepCount: (step, totalSteps) => `Step ${step} of ${totalSteps}`,
  stop: "Stop walkthrough",
  unavailable:
    "This control is not currently available. Open the relevant page or stop this walkthrough and ask for help.",
  back: "Back",
};

export interface GuidedWalkthroughProps {
  /** Application-resolved target. Never a model-supplied selector. */
  target: HTMLElement | null;
  title: string;
  children: ReactNode;
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack?: () => void;
  onStop: () => void;
  /** Preparation only; never an implicit submit. */
  onPrepare?: () => void;
  prepareLabel?: string;
  nextLabel?: string;
  /** Localized text of the card; omitted or `undefined` keys fall back to defaultGuidedWalkthroughLabels. */
  labels?: Partial<GuidedWalkthroughLabels>;
}
interface Geometry {
  left: number;
  top: number;
  width: number;
  height: number;
  panelLeft: number;
  panelTop: number;
  panelMaxHeight: number;
}

/** Non-modal guidance. The caller owns actions, authorization and focus restoration. */
export function GuidedWalkthrough({
  target,
  title,
  children,
  step,
  totalSteps,
  onNext,
  onBack,
  onStop,
  onPrepare,
  prepareLabel = "Prepare this step",
  nextLabel = "Next",
  labels: labelOverrides,
}: GuidedWalkthroughProps) {
  const labels = resolveLabels(defaultGuidedWalkthroughLabels, labelOverrides);
  const id = useId();
  const portal = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const [rect, setRect] = useState<Geometry | null>(null);
  const [theme, setTheme] = useState<string | undefined>();
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const scope = target?.closest("[data-theme]") ?? document.documentElement;
      const nextTheme = scope.getAttribute("data-theme");
      setTheme(
        nextTheme === "dark" || nextTheme === "light" ? nextTheme : undefined,
      );
      if (
        !target?.isConnected ||
        target.getClientRects().length === 0 ||
        ["hidden", "collapse"].includes(getComputedStyle(target).visibility) ||
        target.closest("[inert]")
      ) {
        setRect(null);
        return;
      }
      const box = target.getBoundingClientRect(),
        margin = 16,
        gap = 18;
      const width = Math.min(
        panel.current?.getBoundingClientRect().width ?? 352,
        window.innerWidth - margin * 2,
      );
      const height = Math.min(
        panel.current ? Math.ceil(Math.max(panel.current.getBoundingClientRect().height, panel.current.scrollHeight + panel.current.offsetHeight - panel.current.clientHeight)) : 280,
        window.innerHeight - margin * 2,
      );
      const clampX = (x: number) =>
        Math.max(margin, Math.min(x, window.innerWidth - width - margin));
      const clampY = (y: number) =>
        Math.max(margin, Math.min(y, window.innerHeight - height - margin));
      const below = window.innerHeight - margin - box.bottom - gap;
      const above = box.top - gap - margin;
      let panelLeft = clampX(box.left),
        panelTop: number,
        panelMaxHeight = window.innerHeight - margin * 2;
      if (below >= height) panelTop = clampY(box.bottom + gap);
      else if (above >= height) panelTop = clampY(box.top - gap - height);
      else if (window.innerWidth - margin - box.right - gap >= width) {
        panelLeft = box.right + gap;
        panelTop = clampY(box.top);
      } else if (box.left - gap - margin >= width) {
        panelLeft = box.left - gap - width;
        panelTop = clampY(box.top);
      } else if (Math.max(above, below) >= 160) {
        panelMaxHeight = Math.max(above, below);
        panelTop = above > below ? margin : box.bottom + gap;
      } else {
        panelLeft = clampX(window.innerWidth - width - margin);
        panelTop = clampY(window.innerHeight - height - margin);
      }
      const next: Geometry = {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        panelLeft,
        panelTop,
        panelMaxHeight,
      };
      setRect((previous) =>
        previous &&
        (Object.keys(next) as Array<keyof Geometry>).every(
          (key) => previous[key] === next[key],
        )
          ? previous
          : next,
      );
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    const resize = new ResizeObserver(schedule);
    if (target) resize.observe(target);
    if (panel.current) resize.observe(panel.current);
    resize.observe(document.documentElement);
    const mutations = new MutationObserver((records) => {
      if (records.some((record) => !portal.current?.contains(record.target)))
        schedule();
    });
    mutations.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "inert", "data-theme"],
    });
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, true);
    document.fonts?.addEventListener("loadingdone", schedule);
    measure();
    return () => {
      resize.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
      document.fonts?.removeEventListener("loadingdone", schedule);
    };
  }, [target]);
  useEffect(() => {
    const stop = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onStop();
      }
    };
    window.addEventListener("keydown", stop);
    return () => window.removeEventListener("keydown", stop);
  }, [onStop]);
  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      ref={portal}
      className="ci-theme ci-guided-walkthrough"
      data-theme={theme}
      data-slot="guided-walkthrough"
    >
      {rect && (
        <div
          aria-hidden="true"
          className="ci-guided-walkthrough__highlight"
          style={{
            left: rect.left - 4,
            top: rect.top - 4,
            width: rect.width + 8,
            height: rect.height + 8,
          }}
        >
          <MousePointer2 className="ci-guided-walkthrough__pointer" size={25} />
        </div>
      )}
      <section
        ref={panel}
        className="ci-guided-walkthrough__panel"
        aria-labelledby={id}
        style={
          rect
            ? {
                left: rect.panelLeft,
                top: rect.panelTop,
                maxHeight: rect.panelMaxHeight,
              }
            : undefined
        }
      >
        <div className="ci-guided-walkthrough__heading">
          <span>{labels.stepCount(step, totalSteps)}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={labels.stop}
            onClick={onStop}
          >
            <X aria-hidden="true" size={16} />
          </Button>
        </div>
        <h2 id={id}>{title}</h2>
        <div role="status">
          {rect ? children : labels.unavailable}
        </div>
        <div className="ci-guided-walkthrough__actions">
          {onBack && (
            <Button type="button" variant="outline" size="sm" onClick={onBack}>
              {labels.back}
            </Button>
          )}
          {rect && onPrepare && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onPrepare}
            >
              {prepareLabel}
            </Button>
          )}
          <Button type="button" size="sm" onClick={onNext} disabled={!rect}>
            {nextLabel}
          </Button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
