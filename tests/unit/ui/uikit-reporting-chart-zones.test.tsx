// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  StackedBarChart,
  type ChartSeries,
  type StackedBarChartProps,
  type StackedBarDatum,
} from "@omniroute/ui-kit/reporting-charts";

const points: readonly StackedBarDatum[] = [
  { id: "first", label: "Monday", values: { requests: 3, tokens: 7 } },
  { id: "second", label: "Tuesday", values: { requests: 5, tokens: 11 } },
];
const series: readonly ChartSeries[] = [
  { key: "requests", label: "Requests" },
  { key: "tokens", label: "Tokens" },
];

// jsdom has no layout. Supply only dimensions; every Recharts component and hook is real.
class LayoutObserver implements ResizeObserver {
  constructor(private readonly callback: ResizeObserverCallback) {}

  observe(target: Element) {
    this.callback(
      [
        {
          target,
          contentRect: new DOMRect(0, 0, 640, 240),
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: [],
        },
      ],
      this
    );
  }

  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", LayoutObserver);
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    () => new DOMRect(0, 0, 640, 240)
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function mountChart(overrides: Partial<StackedBarChartProps> = {}) {
  const onPointSelect = vi.fn();
  const view = render(
    <StackedBarChart
      ariaLabel="Traffic"
      data={points}
      series={series}
      height={240}
      valueFormatter={String}
      onPointSelect={onPointSelect}
      {...overrides}
    />
  );
  return { ...view, onPointSelect };
}

async function pointZones(view: ReturnType<typeof mountChart>) {
  // A broken sizing fixture must not masquerade as the missing custom-zone regression.
  await waitFor(() =>
    expect(
      view.container.querySelectorAll(".recharts-bar-rectangle").length,
      "P2_REAL_BARS_MISSING"
    ).toBeGreaterThan(0)
  );
  await waitFor(() =>
    expect(
      view.queryByRole("group", { name: "Traffic data points" }),
      "P2_POINT_ZONES_MISSING"
    ).not.toBeNull()
  );
  return within(view.getByRole("group", { name: "Traffic data points" })).getAllByRole("button");
}

describe("StackedBarChart with the installed Recharts", () => {
  it("renders finite adjacent point zones alongside the real bars", async () => {
    const view = mountChart();
    const zones = await pointZones(view);
    expect(zones).toHaveLength(2);
    const firstX = Number(zones[0].getAttribute("x"));
    const width = Number(zones[0].getAttribute("width"));
    const height = Number(zones[0].getAttribute("height"));
    expect(Number.isFinite(firstX)).toBe(true);
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    expect(Number(zones[1].getAttribute("x"))).toBeCloseTo(firstX + width);
    expect(Number(zones[1].getAttribute("width"))).toBeCloseTo(width);
    expect(zones[0].getAttribute("tabindex")).toBe("0");
    expect(zones[1].getAttribute("tabindex")).toBe("-1");
  });

  it("moves keyboard focus and announces values without selecting on focus", async () => {
    const view = mountChart();
    const zones = await pointZones(view);
    act(() => zones[0].focus());
    expect(document.activeElement).toBe(zones[0]);
    const tooltipId = zones[0].getAttribute("aria-describedby");
    expect(tooltipId).toBeTruthy();
    const tooltip = document.getElementById(tooltipId!);
    expect(tooltip?.getAttribute("role")).toBe("tooltip");
    expect(tooltip?.textContent).toContain("Monday");
    expect(tooltip?.textContent).toContain("Requests");
    expect(tooltip?.textContent).toContain("Tokens");
    expect(tooltip?.textContent).toContain("3");
    expect(tooltip?.textContent).toContain("7");
    expect(view.onPointSelect).not.toHaveBeenCalled();

    fireEvent.keyDown(zones[0], { key: "ArrowRight" });
    expect(document.activeElement).toBe(zones[1]);
    expect(zones[1].getAttribute("tabindex")).toBe("0");
    fireEvent.keyDown(zones[1], { key: "ArrowRight" });
    expect(document.activeElement).toBe(zones[0]);
    fireEvent.keyDown(zones[0], { key: "ArrowLeft" });
    expect(document.activeElement).toBe(zones[1]);
    fireEvent.keyDown(zones[1], { key: "Home" });
    expect(document.activeElement).toBe(zones[0]);
    fireEvent.keyDown(zones[0], { key: "End" });
    expect(document.activeElement).toBe(zones[1]);
    fireEvent.keyDown(zones[1], { key: "Escape" });
    expect(zones[1].getAttribute("aria-describedby")).toBeNull();
    expect(document.getElementById(tooltipId!)).toBeNull();
    expect(view.onPointSelect).not.toHaveBeenCalled();
  });

  it("selects the correct datum by click, Enter and Space", async () => {
    const view = mountChart({ selectedId: "second" });
    const zones = await pointZones(view);
    expect(zones[0].getAttribute("aria-pressed")).toBe("false");
    expect(zones[1].getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(zones[0]);
    fireEvent.keyDown(zones[1], { key: "Enter" });
    fireEvent.keyDown(zones[1], { key: " " });
    expect(view.onPointSelect.mock.calls).toEqual([
      [points[0], 0],
      [points[1], 1],
      [points[1], 1],
    ]);
  });

  it("keeps null and non-finite measurements unavailable in labels and tooltips", async () => {
    const view = mountChart({
      data: [
        { id: "first", label: "Monday", values: { requests: null, tokens: 4 } },
        {
          id: "second",
          label: "Tuesday",
          values: { requests: Number.POSITIVE_INFINITY, tokens: 8 },
        },
      ],
    });
    const zones = await pointZones(view);
    expect(zones[0].getAttribute("aria-label")).toContain(
      "Requests Unavailable, Tokens 4. Total Unavailable"
    );
    expect(zones[1].getAttribute("aria-label")).toContain(
      "Requests Unavailable, Tokens 8. Total Unavailable"
    );
    act(() => zones[0].focus());
    const tooltip = document.getElementById(zones[0].getAttribute("aria-describedby")!);
    expect(tooltip?.textContent).toContain("Unavailable");
    expect(tooltip?.textContent).not.toContain("Infinity");
    expect(view.onPointSelect).not.toHaveBeenCalled();
  });

  it("preserves the empty state without exposing phantom point zones", () => {
    const view = mountChart({ data: [], emptyLabel: "No events" });
    expect(view.getByText("No events")).not.toBeNull();
    expect(view.queryByRole("group", { name: "Traffic data points" })).toBeNull();
    expect(view.onPointSelect).not.toHaveBeenCalled();
  });
});
