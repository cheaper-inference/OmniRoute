// @vitest-environment jsdom
// Kit #221 / #262 (dataviz-additions, radial-meter-heat): the seven-day strip of the analytics
// screen is drawn with the kit HeatCell on the same ramp as the calendar beside it, and the two
// mini bar graphs of the usage overview are the kit Sparkline (`variant="bar"`, `height`). Both
// used to be hand-made `div`s whose values only showed in a `title`.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key}:${JSON.stringify(values)}` : key,
}));

vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<React.ComponentType<Record<string, unknown>>>) => {
    const Loaded = React.lazy(async () => ({ default: await loader() }));
    return function DynamicWrapper(props: Record<string, unknown>) {
      return (
        <React.Suspense fallback={null}>
          <Loaded {...props} />
        </React.Suspense>
      );
    };
  },
}));

const sparklineProps: Array<Record<string, any>> = [];
vi.mock("@omniroute/ui-kit/reporting-charts", () => ({
  Sparkline: (props: Record<string, any>) => {
    sparklineProps.push(props);
    return <div data-testid="kit-sparkline" role="img" aria-label={props.ariaLabel} />;
  },
}));

const { WeeklySquares7d } = await import("@/shared/components/analytics/charts");
const { default: UsageOverview } = await import("@/shared/components/UsageOverview");

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  sparklineProps.length = 0;
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

function dayKey(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

describe("WeeklySquares7d", () => {
  it("draws the seven days as kit heat cells, named with the day and its tokens", async () => {
    await render(<WeeklySquares7d activityMap={{ [dayKey(0)]: 700, [dayKey(2)]: 100 }} />);
    const cells = Array.from(container.querySelectorAll<HTMLElement>(".ci-heat-cell"));
    expect(cells.length).toBe(7);
    expect(cells.every((cell) => cell.dataset.size === "lg")).toBe(true);
    expect(cells.every((cell) => cell.getAttribute("role") === "img")).toBe(true);
    expect(cells[6].getAttribute("aria-label")).toContain("activityCellTitle:");
    expect(cells[6].getAttribute("aria-label")).toContain('"tokens":"700"');
    const levels = cells.map((cell) =>
      cell.querySelector(".ci-heat-cell__mark")!.getAttribute("data-level")
    );
    expect(levels).toEqual(["0", "0", "0", "0", "1", "0", "7"]);
    // No hand-mixed colour left on the strip.
    expect(container.innerHTML).not.toContain("color-mix");
  });

  it("puts a day on the step the calendar gives it: the scale is the year's peak, not the week's", async () => {
    await render(<WeeklySquares7d activityMap={{ [dayKey(0)]: 100, [dayKey(40)]: 700 }} />);
    const today = container.querySelectorAll(".ci-heat-cell__mark")[6];
    expect(today.getAttribute("data-level")).toBe("1");
  });
});

describe("UsageOverview mini graphs", () => {
  it("draws the last-minutes series as kit bar sparklines with a translated name", async () => {
    await render(
      <UsageOverview
        stats={{
          totalRequests: 6,
          totalPromptTokens: 60,
          totalCompletionTokens: 5,
          totalCost: 0.01,
          last10Minutes: Array.from({ length: 10 }, (_, i) => ({
            requests: i,
            promptTokens: i * 10,
          })),
        }}
      />
    );
    expect(container.querySelectorAll('[data-testid="kit-sparkline"]').length).toBe(2);
    const [requests, tokens] = sparklineProps.slice(-2);
    expect(requests.variant).toBe("bar");
    expect(requests.height).toBe(32);
    // The last nine minutes, as before.
    expect(requests.values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(requests.ariaLabel).toBe(
      'requestsPerMinuteTrend:{"values":"1, 2, 3, 4, 5, 6, 7, 8, 9"}'
    );
    expect(tokens.values).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90]);
    expect(tokens.ariaLabel).toContain("inputTokensPerMinuteTrend:");
    expect(container.querySelector('[title="9"]')).toBeNull();
  });
});
