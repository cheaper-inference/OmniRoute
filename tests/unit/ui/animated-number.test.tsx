// @vitest-environment jsdom
// Kit #221 (dataviz-additions): the analytics counters ease toward a new value with the kit
// NumberTicker (`from="previous"`, `initial="static"`, `valueFormatter`). `AnimatedNumber` used to
// carry its own requestAnimationFrame loop and easing; it is now the thin wrapper that maps the
// screen's props (`format`, `integer`, a possibly missing value) onto the kit component. This
// file pins what the screens rely on: no count-up on mount, the caller's exact formatting on
// every frame, whole numbers for counters, cents for money, and reduced motion.
import React from "react";
import { act } from "react";
import { readFileSync } from "node:fs";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AnimatedNumber from "@/shared/components/AnimatedNumber";
import { StatCard } from "@/shared/components/analytics/charts";
import { fmtCost, fmtFull } from "@/shared/utils/formatting";

// Deterministic requestAnimationFrame: callbacks queue up and run only when a test flushes a
// frame with an explicit timestamp, so the easing can be asserted at exact points.
let frames = new Map<number, FrameRequestCallback>();
let nextFrameId = 0;
// The kit ticker reads the clock when a count starts; the tests own that clock.
const COUNT_STARTS_AT = 1000;
// Kit easing (easeOutQuart): halfway in time is 93.75% of the way.
const HALFWAY = 1 - Math.pow(0.5, 4);

function flushFrame(now: number) {
  const callbacks = [...frames.values()];
  frames.clear();
  act(() => {
    for (const cb of callbacks) cb(now);
  });
}

/** The kit starts a count from a zero-delay timer; let it run so the first frame is queued. */
async function startCount() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5));
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

describe("AnimatedNumber source", () => {
  const source = readFileSync("src/shared/components/AnimatedNumber.tsx", "utf8");

  it("is the kit NumberTicker, with no animation loop of its own", () => {
    expect(source).toMatch(/from "@omniroute\/ui-kit\/number-ticker"/);
    expect(source).toMatch(/<NumberTicker\b/);
    expect(source).toMatch(/from="previous"/);
    expect(source).toMatch(/initial="static"/);
    expect(source).toMatch(/valueFormatter=/);
    expect(source).not.toMatch(/requestAnimationFrame|cancelAnimationFrame|matchMedia/);
    expect(source).not.toMatch(/computeAnimatedFrame/);
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
    vi.spyOn(performance, "now").mockReturnValue(COUNT_STARTS_AT);
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
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function render(node: React.ReactNode) {
    act(() => {
      root!.render(node);
    });
  }

  it("renders the formatted value immediately on first mount (no count-up from zero)", async () => {
    render(<AnimatedNumber value={19433} format={fmtFull} />);
    expect(container.textContent).toBe(fmtFull(19433));
    await startCount();
    expect(frames.size).toBe(0);
    expect(container.textContent).toBe(fmtFull(19433));
  });

  it("renders the kit ticker and states the final value for assistive tech", () => {
    render(<AnimatedNumber value={19433} format={fmtFull} className="text-warning" />);
    const ticker = container.querySelector(".ci-number-ticker");
    expect(ticker).not.toBeNull();
    expect(ticker!.classList.contains("text-warning")).toBe(true);
    expect(ticker!.getAttribute("aria-label")).toBe(fmtFull(19433));
  });

  it("takes no name of its own when an ancestor already carries the accessible value", () => {
    render(<AnimatedNumber value={19433} format={fmtFull} decorative />);
    const ticker = container.querySelector(".ci-number-ticker")!;
    expect(ticker.hasAttribute("aria-label")).toBe(false);
    expect(ticker.textContent).toBe(fmtFull(19433));
  });

  it("eases integer counters toward the new value and never shows fractions", async () => {
    render(<AnimatedNumber value={0} format={fmtFull} />);
    render(<AnimatedNumber value={1000} format={fmtFull} />);
    expect(container.textContent).toBe(fmtFull(0));
    await startCount();

    flushFrame(COUNT_STARTS_AT); // t = 0
    expect(container.textContent).toBe(fmtFull(0));

    flushFrame(COUNT_STARTS_AT + 600); // t = 0.5 of the kit's 1.2 s
    expect(container.textContent).toBe(fmtFull(Math.round(1000 * HALFWAY)));
    expect(container.textContent).not.toMatch(/[.,]\d{1,2}$/);

    flushFrame(COUNT_STARTS_AT + 1300); // past the duration
    expect(container.textContent).toBe(fmtFull(1000));
    expect(frames.size).toBe(0);
  });

  it("honours a custom duration given in milliseconds", async () => {
    render(<AnimatedNumber value={0} format={fmtFull} duration={600} />);
    render(<AnimatedNumber value={1000} format={fmtFull} duration={600} />);
    await startCount();
    flushFrame(COUNT_STARTS_AT + 300); // t = 0.5 of 600 ms
    expect(container.textContent).toBe(fmtFull(Math.round(1000 * HALFWAY)));
    flushFrame(COUNT_STARTS_AT + 600);
    expect(container.textContent).toBe(fmtFull(1000));
  });

  it("keeps cents on the cost card mid-animation (no whole-dollar rounding)", async () => {
    render(<AnimatedNumber value={0.37} format={fmtCost} integer={false} />);
    expect(container.textContent).toBe("$0.3700");

    render(<AnimatedNumber value={0.52} format={fmtCost} integer={false} />);
    await startCount();
    flushFrame(COUNT_STARTS_AT + 600);
    const mid = container.textContent ?? "";
    expect(mid).toBe(fmtCost(0.37 + (0.52 - 0.37) * HALFWAY));
    expect(mid).not.toBe("$0.00");
    expect(mid).not.toBe("$1.00");
    expect(mid).toMatch(/^\$0\.\d{4}$/);

    flushFrame(COUNT_STARTS_AT + 1300);
    expect(container.textContent).toBe("$0.5200");
  });

  it("keeps the dollar-and-cents format for large costs", async () => {
    render(<AnimatedNumber value={1180.27} format={fmtCost} integer={false} />);
    expect(container.textContent).toBe("$1180.27");
    render(<AnimatedNumber value={1200.5} format={fmtCost} integer={false} />);
    await startCount();
    flushFrame(COUNT_STARTS_AT + 1300);
    expect(container.textContent).toBe("$1200.50");
  });

  it("restarts from the currently displayed value when the target changes mid-animation", async () => {
    render(<AnimatedNumber value={0} format={fmtFull} />);
    render(<AnimatedNumber value={1000} format={fmtFull} />);
    await startCount();
    flushFrame(COUNT_STARTS_AT + 600); // showing 938
    const shown = Math.round(1000 * HALFWAY);
    expect(container.textContent).toBe(fmtFull(shown));

    render(<AnimatedNumber value={2000} format={fmtFull} />);
    await startCount();
    flushFrame(COUNT_STARTS_AT); // the new count starts at the number on screen, not 0 or 1000
    expect(container.textContent).toBe(fmtFull(shown));
    flushFrame(COUNT_STARTS_AT + 1300);
    expect(container.textContent).toBe(fmtFull(2000));
  });

  it("respects prefers-reduced-motion: jumps straight to the new value without animating", async () => {
    stubReducedMotion(true);
    render(<AnimatedNumber value={0} format={fmtFull} />);
    render(<AnimatedNumber value={1000} format={fmtFull} />);
    expect(container.textContent).toBe(fmtFull(1000));

    render(<AnimatedNumber value={0.52} format={fmtCost} integer={false} />);
    expect(container.textContent).toBe("$0.5200");
    await startCount();
    flushFrame(COUNT_STARTS_AT + 300);
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
