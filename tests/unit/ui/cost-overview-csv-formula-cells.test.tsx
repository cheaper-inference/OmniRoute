// @vitest-environment jsdom
/**
 * The cost export writes model, provider, account and API key names into CSV
 * cells. A client controls the model name (and a key name is free text), so a
 * value that starts with = + - @ becomes a formula when the file is opened in a
 * spreadsheet. The export must prefix such cells with a single quote.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(""),
}));

vi.mock("@/app/(dashboard)/dashboard/costs/components/CostCharts", () => ({
  CostTrendCard: () => <div />,
  ProviderSpendCard: () => <div />,
  WeeklyPatternCard: () => <div />,
}));

vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  EmptyState: () => <div />,
  SegmentedControl: () => <div />,
  CardSkeleton: () => <div />,
}));

const { default: CostOverviewTab } =
  await import("../../../src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx");

function buildPayload() {
  return {
    summary: {
      totalCost: 3,
      totalRequests: 4,
      uniqueModels: 3,
      uniqueAccounts: 1,
      uniqueApiKeys: 1,
      totalTokens: 100,
      promptTokens: 50,
      completionTokens: 50,
      fallbackCount: 0,
      fallbackRatePct: 0,
      requestedModelCoveragePct: 100,
      streak: 0,
    },
    byProvider: [{ provider: "openai", requests: 4, totalTokens: 100, cost: 3 }],
    byModel: [
      { model: '=HYPERLINK("http://x.test","a")', requests: 1, totalTokens: 10, cost: 1 },
      { model: "+1+1", requests: 1, totalTokens: 10, cost: 1 },
      { model: "-2+3", requests: 1, totalTokens: 10, cost: 0.5 },
      { model: "@SUM(A1)", requests: 1, totalTokens: 10, cost: 0.25 },
      { model: "\t=1+1", requests: 1, totalTokens: 10, cost: 0.25 },
      { model: "gpt-4o", requests: 1, totalTokens: 10, cost: 0 },
    ],
    byApiKey: [],
    byAccount: [],
    dailyTrend: [{ date: "2026-08-25", cost: 3 }],
    weeklyPattern: [],
    activityMap: {},
    presetSummaries: { "1d": { totalCost: 3 }, "7d": { totalCost: 3 }, "30d": { totalCost: 3 } },
  };
}

let container: HTMLDivElement;
let root: Root;
let downloadedBlobs: Blob[];

beforeEach(() => {
  downloadedBlobs = [];
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  vi.stubGlobal("URL", {
    ...URL,
    createObjectURL: vi.fn((blob: Blob) => {
      downloadedBlobs.push(blob);
      return "blob:mock";
    }),
    revokeObjectURL: vi.fn(),
  });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const body = String(input).includes("/api/usage/analytics") ? buildPayload() : [];
      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    })
  );
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

async function exportCsvLines(): Promise<string[]> {
  await act(async () => {
    root.render(<CostOverviewTab />);
  });
  await act(async () => {
    await Promise.resolve();
  });
  const csvButton = Array.from(container.querySelectorAll("button")).find((button) =>
    button.getAttribute("title")?.includes("CSV")
  );
  expect(csvButton, "CSV export button should be rendered").not.toBeUndefined();
  await act(async () => {
    csvButton!.click();
  });
  expect(downloadedBlobs.length).toBe(1);
  return (await downloadedBlobs[0].text()).split("\n");
}

describe("cost export CSV — spreadsheet formula cells", () => {
  it("prefixes model names that start with = + - @ or a tab-led formula with a single quote", async () => {
    const lines = await exportCsvLines();
    const modelRows = lines.slice(lines.indexOf("Model,Requests,Total Tokens,Cost (USD)") + 1);

    expect(modelRows).toContain(`"'=HYPERLINK(""http://x.test"",""a"")",1,10,1.000000`);
    expect(modelRows).toContain("'+1+1,1,10,1.000000");
    expect(modelRows).toContain("'-2+3,1,10,0.500000");
    expect(modelRows).toContain("'@SUM(A1),1,10,0.250000");
    expect(modelRows).toContain("'\t=1+1,1,10,0.250000");
  });

  it("leaves plain names and numeric columns unchanged", async () => {
    const lines = await exportCsvLines();
    expect(lines).toContain("gpt-4o,1,10,0.000000");
    expect(lines).toContain("openai,4,100,3.000000");
    expect(lines).toContain("Total Cost,$3.00");
  });
});
