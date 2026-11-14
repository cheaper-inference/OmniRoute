// @vitest-environment jsdom
/**
 * Free Provider Rankings: Top category selector, free models filter, and considered models dropdown tests.
 */

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const stableT = (key: string, values?: Record<string, unknown>) => {
  if (values && "count" in values) {
    return `${key}:${values.count}`;
  }
  return key;
};

vi.mock("next-intl", () => ({
  useTranslations: () => stableT,
}));

const { default: FreeProviderRankingsPage } =
  await import("@/app/(dashboard)/dashboard/free-provider-rankings/page");
const { formatBenchmarkMetric } = await import("@/lib/freeProviderRankingsMetric");

function makeRanking(
  overrides: Partial<{
    id: string;
    name: string;
    category: "noauth" | "oauth" | "apikey";
    averageScore: number;
    models: Array<{
      modelId: string;
      modelName: string;
      score: number;
      eloRaw?: number;
      confidence?: string;
      category: string;
      isFree: boolean;
      permaslug?: string;
    }>;
  }> = {}
) {
  const models = overrides.models ?? [
    {
      modelId: "gemini-2.5-flash",
      modelName: "Gemini 2.5 Flash",
      score: 0.94,
      eloRaw: 1350,
      confidence: "high",
      category: "default",
      isFree: true,
      permaslug: "google/gemini-2.5-flash",
    },
    {
      modelId: "gemini-1.5-pro",
      modelName: "Gemini 1.5 Pro",
      score: 0.91,
      eloRaw: 1300,
      confidence: "medium",
      category: "default",
      isFree: false,
      permaslug: "google/gemini-1.5-pro",
    },
  ];

  return {
    id: overrides.id ?? "provider-test",
    name: overrides.name ?? "Provider Test",
    icon: "",
    color: "#4285F4",
    textIcon: "P",
    category: overrides.category ?? "apikey",
    topModel: models[0],
    averageScore: overrides.averageScore ?? 0.925,
    modelCount: models.length,
    models,
  };
}

const FIXTURE_RANKINGS = [
  makeRanking({ id: "p1", name: "Alpha Provider" }),
  makeRanking({ id: "p2", name: "Beta Provider" }),
  makeRanking({ id: "p3", name: "Gamma Provider" }),
];

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function makeDiv() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  return el;
}

function render(jsx: React.ReactElement) {
  const el = makeDiv();
  const root = createRoot(el);
  act(() => {
    root.render(jsx);
  });
  containers.push({ root, el });
  return el;
}

async function waitForNotLoading(el: HTMLDivElement, maxAttempts = 40) {
  for (let i = 0; i < maxAttempts && el.textContent?.includes("loading"); i++) {
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ rankings: FIXTURE_RANKINGS }),
    })
  );
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("FreeProviderRankingsPage — Category Filter & Models Dropdown", () => {
  it("defaults to category 'default' (AA Intelligence Index) on initial fetch", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ rankings: FIXTURE_RANKINGS }),
    });
    vi.stubGlobal("fetch", fetchSpy);

    const el = render(<FreeProviderRankingsPage />);
    await waitForNotLoading(el);

    // Check fetch query parameters
    expect(fetchSpy).toHaveBeenCalled();
    const firstCallUrl = fetchSpy.mock.calls[0][0] as string;
    expect(firstCallUrl).toContain("category=default");

    // Check the selected radio segment
    const activeBtn = el.querySelector('[role="radio"][aria-checked="true"]');
    expect(activeBtn?.textContent).toContain("categoryDefault");
  }, 15000);

  it("changing category via category buttons triggers a fetch with the new category", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ rankings: FIXTURE_RANKINGS }),
    });
    vi.stubGlobal("fetch", fetchSpy);

    const el = render(<FreeProviderRankingsPage />);
    await waitForNotLoading(el);

    const codingBtn = Array.from(el.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("categoryCoding")
    );
    expect(codingBtn).toBeDefined();

    act(() => {
      codingBtn!.click();
    });
    await waitForNotLoading(el);

    const lastCallUrl = fetchSpy.mock.calls[fetchSpy.mock.calls.length - 1][0] as string;
    expect(lastCallUrl).toContain("category=coding");
  }, 15000);

  it("toggling the freeModelsOnly filter button updates query param and refetches", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ rankings: FIXTURE_RANKINGS }),
    });
    vi.stubGlobal("fetch", fetchSpy);

    const el = render(<FreeProviderRankingsPage />);
    await waitForNotLoading(el);

    const freeButton = Array.from(el.querySelectorAll("button")).find((btn) =>
      btn.textContent?.includes("filterFreeModelsOnly")
    );
    expect(freeButton).not.toBeUndefined();

    act(() => {
      freeButton!.click();
    });
    await waitForNotLoading(el);

    const lastCallUrl = fetchSpy.mock.calls[fetchSpy.mock.calls.length - 1][0] as string;
    expect(lastCallUrl).toContain("freeModelsOnly=1");
  }, 15000);

  it("expanding a provider displays considered models details and FREE/PAID status", async () => {
    const el = render(<FreeProviderRankingsPage />);
    await waitForNotLoading(el);

    // Expand button for provider in table
    const expandBtn = el.querySelector<HTMLButtonElement>("tbody button[title='expandModels']");
    expect(expandBtn).not.toBeNull();

    act(() => {
      expandBtn!.click();
    });

    expect(el.textContent).toContain("Gemini 2.5 Flash");
    expect(el.textContent).toContain("gemini-2.5-flash");
    expect(el.textContent).toContain("google/gemini-2.5-flash");
    expect(el.textContent).toContain("FREE");
    expect(el.textContent).toContain("PAID");
    expect(el.textContent).toContain("ELO 1350");
  }, 15000);
});

describe("formatBenchmarkMetric — Arena sources", () => {
  it("labels each Arena upstream", () => {
    expect(formatBenchmarkMetric({ metric: "wulong:elo", eloRaw: 1350 })).toBe(
      "ELO 1350 (Arena AI)"
    );
    expect(formatBenchmarkMetric({ metric: "huggingface:elo", eloRaw: 1350 })).toBe(
      "ELO 1350 (Arena AI · HF)"
    );
    // rows synced before the source-specific metric existed
    expect(formatBenchmarkMetric({ metric: "arena-ai:elo", eloRaw: 1350 })).toBe(
      "ELO 1350 (Arena AI)"
    );
  });
});
