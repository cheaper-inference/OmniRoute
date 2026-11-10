// @vitest-environment jsdom
/**
 * ActivityCalendar — the 365-day activity grid over the kit CalendarHeatmap, shared by the usage
 * analytics card and the costs overview.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ActivityCalendar } from "@/shared/components/analytics/ActivityCalendar";

const mounted: Array<{ root: Root; container: HTMLDivElement }> = [];

function localKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function render(activityMap?: Record<string, number>) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mounted.push({ root, container });
  act(() => {
    root.render(
      <ActivityCalendar
        ariaLabel="Activity"
        activityMap={activityMap}
        lessLabel="Fewer"
        moreLabel="Plenty"
        locale="en"
        valueFormatter={(value) => `${value} tokens`}
      />
    );
  });
  return container;
}

describe("ActivityCalendar", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers({ toFake: ["Date"], now: new Date(2026, 9, 15, 12) });
  });

  afterEach(() => {
    vi.useRealTimers();
    for (const { root, container } of mounted.splice(0)) {
      act(() => root.unmount());
      container.remove();
    }
  });

  it("draws one cell per day of the last 365, ending today", () => {
    const container = render({});
    const cells = container.querySelectorAll("[role='gridcell']");
    expect(cells).toHaveLength(365);
    const labels = Array.from(cells, (cell) => cell.getAttribute("aria-label"));
    expect(labels.some((label) => label?.startsWith("Oct 15, 2026:"))).toBe(true);
    expect(labels.some((label) => label?.startsWith("Oct 16, 2026:"))).toBe(false);
    expect(labels.some((label) => label?.startsWith("Oct 16, 2025:"))).toBe(true);
    expect(labels.some((label) => label?.startsWith("Oct 15, 2025:"))).toBe(false);
  });

  it("reads days without activity as zero, not as unavailable", () => {
    const container = render(undefined);
    expect(container.querySelector("[role='gridcell'] [data-unavailable]")).toBeNull();
    expect(container.querySelectorAll("[role='gridcell'] [data-level='0']")).toHaveLength(365);
  });

  it("scales a day's level against the busiest day and names the value", () => {
    const today = new Date(2026, 9, 15);
    const yesterday = new Date(2026, 9, 14);
    const container = render({ [localKey(today)]: 700, [localKey(yesterday)]: 100 });
    expect(container.querySelector("[data-level='7']")).not.toBeNull();
    const cells = Array.from(container.querySelectorAll("[role='gridcell']"));
    const cell = cells.find((node) => node.getAttribute("aria-label")?.startsWith("Oct 14, 2026"));
    expect(cell?.getAttribute("aria-label")).toContain("100 tokens");
    expect(cell?.querySelector("[data-level='1']")).not.toBeNull();
  });

  it("uses the caller's legend labels", () => {
    const container = render({});
    expect(container.textContent).toContain("Fewer");
    expect(container.textContent).toContain("Plenty");
  });

  it("starts scrolled to the right edge so today is in view", () => {
    const scrollWidth = vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(900);
    const container = render({});
    const scroller = container.querySelector<HTMLElement>(".ci-calendar-heatmap__scroll");
    expect(scroller?.scrollLeft).toBe(900);
    scrollWidth.mockRestore();
  });
});
