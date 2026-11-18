// @vitest-environment jsdom
/**
 * The simple line charts run on the kit LineChart. Its per-point hit areas are plain HTML, so what
 * a reader gets at each point can be asserted without a recharts layout.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { CostTrendCard } from "@/app/(dashboard)/dashboard/costs/components/CostCharts";
import StatsCharts from "@/app/(dashboard)/dashboard/tools/traffic-inspector/components/tabs/StatsCharts";
import type { InterceptedRequest } from "@/mitm/inspector/types";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

const mounted: Array<{ root: Root; container: HTMLDivElement }> = [];

function render(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mounted.push({ root, container });
  act(() => root.render(ui));
  return container;
}

const points = (container: HTMLElement) =>
  Array.from(container.querySelectorAll(".ci-line-chart__zone"), (zone) =>
    zone.getAttribute("aria-label")
  );

describe("kit line charts", () => {
  beforeAll(() => {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  });

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, container } of mounted.splice(0)) {
      act(() => root.unmount());
      container.remove();
    }
  });

  it("CostTrendCard reads each day's cost as currency, named by the card title", () => {
    const container = render(
      <CostTrendCard
        title="Cost trend"
        locale="en-US"
        rows={[
          { date: "2026-10-01", cost: 1.5 },
          { date: "2026-10-02", cost: 0 },
        ]}
      />
    );
    expect(container.querySelector("figure")?.getAttribute("aria-label")).toBe("Cost trend");
    expect(points(container)).toEqual(["10-01: Cost trend $1.50", "10-02: Cost trend $0.00"]);
  });

  it("StatsCharts reads the latency of each request in order, in milliseconds", () => {
    const requests = [
      { id: "a", status: 200, totalLatencyMs: 120 },
      { id: "b", status: 200, totalLatencyMs: null },
      { id: "c", status: 500, totalLatencyMs: 80 },
    ] as unknown as InterceptedRequest[];
    const container = render(<StatsCharts requests={requests} />);
    expect(points(container)).toEqual(["1: statsLatency 120ms", "2: statsLatency 80ms"]);
  });

  it("StatsCharts hides the latency chart until there are two measurements to join", () => {
    const requests = [{ id: "a", status: 200, totalLatencyMs: 120 }];
    const container = render(
      <StatsCharts requests={requests as unknown as InterceptedRequest[]} />
    );
    expect(points(container)).toEqual([]);
  });
});
