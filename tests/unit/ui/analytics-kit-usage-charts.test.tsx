// @vitest-environment jsdom
// Kit #303 (charts-domain-stacked-area): the two usage charts of the analytics screen are the kit
// StackedBarChart (tokens per day, with the cost as a line on a second axis) and the kit
// StackedAreaChart (usage per model). They used to be hand-composed recharts plots with their own
// tooltip and legend. This file pins the data handed to the kit and the translated labels.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key}:${JSON.stringify(values)}` : key,
}));

// Render the lazily imported kit module as soon as it resolves.
vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<React.ComponentType<Record<string, unknown>>>) => {
    const Loaded = React.lazy(async () => ({ default: await loader() }));
    return function DynamicWrapper(props: Record<string, unknown>) {
      return (
        <React.Suspense fallback={<div data-testid="chart-loading" />}>
          <Loaded {...props} />
        </React.Suspense>
      );
    };
  },
}));

const barProps: Array<Record<string, any>> = [];
const areaProps: Array<Record<string, any>> = [];
vi.mock("@omniroute/ui-kit/reporting-charts", () => ({
  StackedBarChart: (props: Record<string, any>) => {
    barProps.push(props);
    return <figure data-testid="kit-stacked-bar" aria-label={props.ariaLabel} />;
  },
  StackedAreaChart: (props: Record<string, any>) => {
    areaProps.push(props);
    return <figure data-testid="kit-stacked-area" aria-label={props.ariaLabel} />;
  },
}));

const { DailyTrendChart, ModelOverTimeChart } =
  await import("@/shared/components/analytics/rechartsUsageCharts");

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  barProps.length = 0;
  areaProps.length = 0;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

async function render(node: React.ReactNode) {
  await act(async () => {
    root.render(node);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe("DailyTrendChart", () => {
  const trend = [
    { date: "2026-11-01", promptTokens: 1200, completionTokens: 300, cost: 0.5 },
    { date: "2026-11-02", promptTokens: 800, completionTokens: 100, cost: 0 },
  ];

  it("draws the tokens as the kit stacked bars, with the cost as a line on its own axis", async () => {
    await render(<DailyTrendChart dailyTrend={trend} />);
    expect(container.querySelector('[data-testid="kit-stacked-bar"]')).not.toBeNull();
    const props = barProps.at(-1)!;
    expect(props.ariaLabel).toBe("chartModelUsageOverTime");
    expect(props.data).toEqual([
      {
        id: "2026-11-01",
        label: "11-01",
        tooltipLabel: "2026-11-01",
        values: { input: 1200, output: 300, cost: 0.5 },
      },
      {
        id: "2026-11-02",
        label: "11-02",
        tooltipLabel: "2026-11-02",
        values: { input: 800, output: 100, cost: 0 },
      },
    ]);
    expect(props.series.map((item: any) => [item.key, item.label, item.color])).toEqual([
      ["input", "chartInput", "var(--color-chart-1)"],
      ["output", "chartOutput", "var(--color-chart-4)"],
    ]);
    expect(props.lineSeries.key).toBe("cost");
    expect(props.lineSeries.label).toBe("chartCost");
    expect(props.lineSeries.color).toBe("var(--color-chart-5)");
    expect(props.lineSeries.valueFormatter(0.5)).toBe("$0.5000");
    expect(props.valueFormatter(1200)).toBe("1.2K");
  });

  it("passes the translated texts the kit would otherwise write in English", async () => {
    await render(<DailyTrendChart dailyTrend={trend} />);
    const props = barProps.at(-1)!;
    expect(props.totalLabel).toBe("chartTotal");
    expect(props.unavailableLabel).toBe("notAvailable");
    expect(props.emptyLabel).toBe("chartNoData");
    expect(props.dataPointsLabel("Usage")).toBe('chartDataPoints:{"name":"Usage"}');
  });

  it("leaves the cost line out when no day has a cost", async () => {
    await render(
      <DailyTrendChart
        dailyTrend={[{ date: "2026-11-01", promptTokens: 10, completionTokens: 5 }]}
      />
    );
    expect(barProps.at(-1)!.lineSeries).toBeUndefined();
  });

  it("keeps the hand-written empty card when there is no trend", async () => {
    await render(<DailyTrendChart dailyTrend={[]} />);
    expect(barProps.length).toBe(0);
    expect(container.textContent).toContain("chartNoData");
  });

  it("no longer writes its own legend or tooltip", async () => {
    await render(<DailyTrendChart dailyTrend={trend} />);
    expect(container.querySelector(".rounded-full")).toBeNull();
    expect(container.querySelector('[class*="text-[10px]"]')).toBeNull();
  });
});

describe("ModelOverTimeChart", () => {
  it("draws the usage per model as the kit stacked areas, one pinned colour per model", async () => {
    await render(
      <ModelOverTimeChart
        dailyByModel={[
          { date: "2026-11-01", "gpt-a": 100, "claude-b": 50 },
          { date: "2026-11-02", "gpt-a": 20 },
        ]}
        modelNames={["gpt-a", "claude-b"]}
      />
    );
    expect(container.querySelector('[data-testid="kit-stacked-area"]')).not.toBeNull();
    const props = areaProps.at(-1)!;
    expect(props.data).toEqual([
      {
        id: "2026-11-01",
        label: "11/01",
        tooltipLabel: "2026-11-01",
        values: { "gpt-a": 100, "claude-b": 50 },
      },
      {
        id: "2026-11-02",
        label: "11/02",
        tooltipLabel: "2026-11-02",
        values: { "gpt-a": 20, "claude-b": 0 },
      },
    ]);
    expect(props.series.map((item: any) => item.key)).toEqual(["gpt-a", "claude-b"]);
    expect(new Set(props.series.map((item: any) => item.color)).size).toBe(2);
    expect(props.totalLabel).toBe("chartTotal");
    expect(props.unavailableLabel).toBe("notAvailable");
    expect(container.querySelector(".rounded-full")).toBeNull();
  });
});
