// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProviderCharts from "@/app/(dashboard)/dashboard/analytics/components/ProviderCharts";

// The chart is the kit LineChart: the tooltip, the legend and their stacking order are the kit's.
// The mock records what the screen hands to it.
const chartProps: Array<Record<string, any>> = [];
vi.mock("@omniroute/ui-kit/reporting-charts", () => ({
  LineChart: (props: Record<string, any>) => {
    chartProps.push(props);
    return (
      <figure data-testid="kit-line-chart" aria-label={props.ariaLabel}>
        {props.series.map((item: { key: string; label: string; color?: string }) => (
          <span
            key={item.key}
            data-testid="chart-line"
            data-key={item.key}
            data-name={item.label}
            data-color={item.color}
          />
        ))}
      </figure>
    );
  },
}));

describe("ProviderCharts Component", () => {
  let container: HTMLElement;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    chartProps.length = 0;
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.body.innerHTML = "";
  });

  it("draws the kit LineChart on a fixed 0–100 axis, joined across missing samples", async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ProviderCharts
          ariaLabel="Provider utilization"
          chartData={[
            { timestamp: "2026-09-08T00:00:00Z", "antigravity:conn-1": 100 },
            { timestamp: "2026-09-08T01:00:00Z" },
          ]}
          providers={["antigravity:conn-1"]}
          providerColors={new Map([["antigravity:conn-1", "#10b981"]])}
          range="24h"
          resolveProviderName={(p) => (p === "antigravity:conn-1" ? "user@example.com" : p)}
          nodeMap={{}}
          formatTimestamp={(v) => `tick ${v}`}
          formatPercent={(v) => `${v}%`}
          formatTooltipTimestamp={(v) => `tip ${v}`}
        />
      );
    });

    const chart = container.querySelector('[data-testid="kit-line-chart"]');
    expect(chart).not.toBeNull();
    expect(chart?.getAttribute("aria-label")).toBe("Provider utilization");
    const props = chartProps[chartProps.length - 1];
    expect(props.yDomain).toEqual([0, 100]);
    expect(props.connectNulls).toBe(true);
    expect(props.valueFormatter(42)).toBe("42%");
    // One datum per sample, in order; a provider with no sample has no measurement (null, not 0).
    expect(props.data.map((d: { label: string }) => d.label)).toEqual([
      "tick 2026-09-08T00:00:00Z",
      "tick 2026-09-08T01:00:00Z",
    ]);
    expect(props.data[0].tooltipLabel).toBe("tip 2026-09-08T00:00:00Z");
    expect(props.data[0].values["antigravity:conn-1"]).toBe(100);
    expect(props.data[1].values["antigravity:conn-1"]).toBeNull();
    expect(new Set(props.data.map((d: { id: string }) => d.id)).size).toBe(2);
  });

  it("resolves account connection IDs to display names for the series and legend labels", async () => {
    const root = createRoot(container);
    const mockResolve = vi.fn((key: string) => {
      if (key === "antigravity:uuid-1234") return "games.zaim@gmail.com";
      return key;
    });

    await act(async () => {
      root.render(
        <ProviderCharts
          ariaLabel="Provider utilization"
          chartData={[{ timestamp: "2026-09-08T00:00:00Z", "antigravity:uuid-1234": 85 }]}
          providers={["antigravity:uuid-1234"]}
          providerColors={new Map([["antigravity:uuid-1234", "#10b981"]])}
          range="24h"
          resolveProviderName={mockResolve}
          nodeMap={{}}
          formatTimestamp={(v) => v}
          formatPercent={(v) => `${v}%`}
          formatTooltipTimestamp={(v) => v}
        />
      );
    });

    expect(mockResolve).toHaveBeenCalledWith("antigravity:uuid-1234", expect.anything());

    const line = container.querySelector('[data-testid="chart-line"]');
    expect(line).not.toBeNull();
    expect(line?.getAttribute("data-key")).toBe("antigravity:uuid-1234");
    expect(line?.getAttribute("data-name")).toBe("games.zaim@gmail.com");
    expect(line?.getAttribute("data-color")).toBe("#10b981");
  });
});
