// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Kit 0.0.114 (keak-ai/cheaper-inference-ui-kit#192, #19620 axe `scrollable-region-focusable` on
// /dashboard/analytics at 390 px): an overflowing kit Table container joins the tab order, and it
// becomes a named `region` only when it has a name (`scrollLabel`, a caption, or the table's
// aria-label). `scrollbarLabel` names the persistent scrollbar, not the container, so without
// `scrollLabel` the analytics tables would be focusable but unnamed.

const translate = (key: string) => key;
translate.has = () => true;

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => translate,
}));

vi.mock("@/shared/components/analytics/rechartsCore", () => ({
  loadRecharts: vi.fn(),
  useRecharts: () => null,
  ChartLoadingCard: () => <div data-testid="chart-loading" />,
  DarkTooltip: () => null,
}));

const { ApiKeyTable, ProviderTable } = await import("@/shared/components/analytics/charts");
const { ModelTable } = await import("@/shared/components/analytics/ModelTable");
const { default: RequestCountTable } =
  await import("@/shared/components/analytics/RequestCountTable");

const { default: CacheHealthTab } =
  await import("@/app/(dashboard)/dashboard/analytics/CacheHealthTab");

const row = { requests: 3, promptTokens: 100, completionTokens: 50, totalTokens: 150, cost: 1 };

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  // jsdom has no layout: make every box report a table wider than its container (phone width).
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(900);
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(358);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

function render(ui: React.ReactElement) {
  act(() => root.render(ui));
  const scroller = container.querySelector<HTMLElement>("[data-slot='table-container']");
  expect(scroller).not.toBeNull();
  return scroller!;
}

function expectNamedScrollRegion(scroller: HTMLElement, name: string) {
  expect(scroller.dataset.overflowing).toBe("true");
  expect(scroller.tabIndex).toBe(0);
  expect(scroller.getAttribute("role")).toBe("region");
  expect(scroller.getAttribute("aria-label")).toBe(name);
}

describe("analytics tables name their overflowing scroll container", () => {
  it("model breakdown", () => {
    const scroller = render(
      <ModelTable byModel={[{ model: "m", ...row }]} summary={{ totalTokens: 150 }} />
    );
    expectNamedScrollRegion(scroller, "chartModelBreakdown");
  });

  it("API key breakdown", () => {
    const scroller = render(
      <ApiKeyTable byApiKey={[{ apiKeyId: "k", apiKeyName: "Key", ...row }]} />
    );
    expectNamedScrollRegion(scroller, "chartApiKeyBreakdown");
  });

  it("provider breakdown", () => {
    const scroller = render(<ProviderTable byProvider={[{ provider: "openai", ...row }]} />);
    expectNamedScrollRegion(scroller, "chartProviderBreakdown");
  });

  it("requests by provider and date", () => {
    const scroller = render(
      <RequestCountTable
        rows={[{ date: "2026-11-13", provider: "openai", ...row }]}
        sortBy="date"
        sortOrder="desc"
        onToggleSort={() => {}}
        tableLabel="Requests by provider and date"
        dateLabel="Date"
        providerLabel="Provider"
        requestsLabel="Requests"
        totalLabel="Total"
      />
    );
    expectNamedScrollRegion(scroller, "Requests by provider and date");
  });

  it("falls back to the requests column label when no table label is given", () => {
    const scroller = render(
      <RequestCountTable
        rows={[{ date: "2026-11-13", provider: "openai", ...row }]}
        sortBy="date"
        sortOrder="desc"
        onToggleSort={() => {}}
        dateLabel="Date"
        providerLabel="Provider"
        requestsLabel="Requests"
        totalLabel="Total"
      />
    );
    expectNamedScrollRegion(scroller, "Requests");
  });

  it("cache health by model (analytics Cache tab)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json(cacheHealthSummary))
    );
    act(() => root.render(<CacheHealthTab />));
    await vi.waitFor(() => {
      expect(container.querySelector("[data-slot='table-container']")).not.toBeNull();
    });
    // Let the kit measure the container after the table mounts.
    await act(async () => {});
    expectNamedScrollRegion(
      container.querySelector<HTMLElement>("[data-slot='table-container']")!,
      "cacheHealthByModel"
    );
    vi.unstubAllGlobals();
  });
});

const cacheHealthSummary = {
  totalCalls: 3,
  cacheReadTotal: 500,
  cacheWriteTotal: 150,
  writeReadRatio: 0.3,
  warmCalls: 2,
  coldCalls: 1,
  rewriteCalls: 0,
  uncachedCalls: 0,
  writeP50: 20,
  writeP90: 100,
  writeP99: 100,
  writeMax: 100,
  heavyWriteCalls: 0,
  heavyWriteCallShare: 0,
  heavyWriteTokenShare: 0,
  heavyWriteThreshold: 1024,
  verdict: "healthy",
  byModel: [
    {
      model: "claude-sonnet",
      calls: 3,
      cacheReadTotal: 500,
      cacheWriteTotal: 150,
      writeReadRatio: 0.3,
      heavyWriteCalls: 0,
    },
  ],
  timeRange: "24h",
  since: "2026-01-01T00:00:00Z",
  truncated: false,
  cacheWrite5mTotal: 30,
  cacheWrite1hTotal: 70,
  cacheWriteUnknownTotal: 50,
  cacheWriteUnreportedCalls: 0,
  cacheWriteInvalidCalls: 0,
  cacheWriteUnpricedTotal: 50,
  cacheWriteKnownTierCostUsd: 0.0001775,
};
