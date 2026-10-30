// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AnimatedNumber, { computeAnimatedFrame } from "@/shared/components/AnimatedNumber";
import { StatCard } from "@/shared/components/analytics/charts";
import { fmtCost, fmtFull } from "@/shared/utils/formatting";

// Deterministic requestAnimationFrame: callbacks queue up and run only when a test flushes a
// frame with an explicit timestamp, so the easing can be asserted at exact points.
let frames = new Map<number, FrameRequestCallback>();
let nextFrameId = 0;

function flushFrame(now: number) {
  const callbacks = [...frames.values()];
  frames.clear();
  act(() => {
    for (const cb of callbacks) cb(now);
  });
}

function stubReducedMotion(reduced: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduced && query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
}

describe("computeAnimatedFrame", () => {
  it("starts at the previous value and lands exactly on the target", () => {
    expect(computeAnimatedFrame(100, 200, 0)).toBe(100);
    expect(computeAnimatedFrame(100, 200, 1)).toBe(200);
    expect(computeAnimatedFrame(0.37, 0.52, 1)).toBe(0.52);
  });

  it("eases out (easeOutCubic): halfway in time is 87.5% of the way", () => {
    expect(computeAnimatedFrame(0, 1000, 0.5)).toBeCloseTo(875, 6);
    expect(computeAnimatedFrame(1000, 0, 0.5)).toBeCloseTo(125, 6);
  });

  it("clamps progress outside 0..1", () => {
    expect(computeAnimatedFrame(10, 20, -1)).toBe(10);
    expect(computeAnimatedFrame(10, 20, 3)).toBe(20);
  });
});

describe("AnimatedNumber", () => {
  let container: HTMLElement;
  let root: Root | undefined;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    frames = new Map();
    nextFrameId = 0;
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      nextFrameId += 1;
      frames.set(nextFrameId, cb);
      return nextFrameId;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => {
      frames.delete(id);
    });
    stubReducedMotion(false);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    root = undefined;
    container.remove();
    vi.unstubAllGlobals();
  });

  function render(node: React.ReactNode) {
    act(() => {
      root!.render(node);
    });
  }

  it("renders the formatted value immediately on first mount (no count-up from zero)", () => {
    render(<AnimatedNumber value={19433} format={fmtFull} />);
    expect(container.textContent).toBe(fmtFull(19433));
    expect(frames.size).toBe(0);
  });

  it("eases integer counters toward the new value and never shows fractions", () => {
    render(<AnimatedNumber value={0} format={fmtFull} />);
    render(<AnimatedNumber value={1000} format={fmtFull} />);

    flushFrame(1000); // first frame anchors the start time → t = 0
    expect(container.textContent).toBe(fmtFull(0));

    flushFrame(1300); // t = 0.5 of the default 600 ms → 875
    expect(container.textContent).toBe(fmtFull(875));

    flushFrame(1700); // past the 600 ms duration
    expect(container.textContent).toBe(fmtFull(1000));
    expect(frames.size).toBe(0);
  });

  it("keeps cents on the cost card mid-animation (no whole-dollar rounding)", () => {
    render(<AnimatedNumber value={0.37} format={fmtCost} integer={false} />);
    expect(container.textContent).toBe("$0.3700");

    render(<AnimatedNumber value={0.52} format={fmtCost} integer={false} />);
    flushFrame(0);
    flushFrame(300);
    const mid = container.textContent ?? "";
    expect(mid).toBe(fmtCost(computeAnimatedFrame(0.37, 0.52, 0.5)));
    expect(mid).not.toBe("$0.00");
    expect(mid).not.toBe("$1.00");
    expect(mid).toMatch(/^\$0\.\d{4}$/);

    flushFrame(700);
    expect(container.textContent).toBe("$0.5200");
  });

  it("keeps the dollar-and-cents format for large costs", () => {
    render(<AnimatedNumber value={1180.27} format={fmtCost} integer={false} />);
    expect(container.textContent).toBe("$1180.27");
    render(<AnimatedNumber value={1200.5} format={fmtCost} integer={false} />);
    flushFrame(0);
    flushFrame(600);
    expect(container.textContent).toBe("$1200.50");
  });

  it("restarts from the currently displayed value when the target changes mid-animation", () => {
    render(<AnimatedNumber value={0} format={fmtFull} />);
    render(<AnimatedNumber value={1000} format={fmtFull} />);
    flushFrame(0);
    flushFrame(300); // showing 875
    render(<AnimatedNumber value={2000} format={fmtFull} />);
    flushFrame(1000); // new animation starts at 875, not at 0 or 1000
    expect(container.textContent).toBe(fmtFull(875));
    flushFrame(1600);
    expect(container.textContent).toBe(fmtFull(2000));
  });

  it("respects prefers-reduced-motion: jumps straight to the new value without animating", () => {
    stubReducedMotion(true);
    render(<AnimatedNumber value={0} format={fmtFull} />);
    render(<AnimatedNumber value={1000} format={fmtFull} />);
    expect(container.textContent).toBe(fmtFull(1000));

    render(<AnimatedNumber value={0.52} format={fmtCost} integer={false} />);
    expect(container.textContent).toBe("$0.5200");
    flushFrame(300);
    expect(container.textContent).toBe("$0.5200");
  });

  it("treats a missing value as zero", () => {
    render(<AnimatedNumber value={null} format={fmtCost} integer={false} />);
    expect(container.textContent).toBe("$0.00");
  });

  it("does not leak a node into the StatCard title when there is no tooltip", () => {
    render(
      <StatCard
        icon="payments"
        label="Est. Cost"
        value={<AnimatedNumber value={0.37} format={fmtCost} integer={false} />}
      />
    );
    expect(container.textContent).toContain("$0.3700");
    expect(container.querySelector('[title="[object Object]"]')).toBeNull();
  });
});
