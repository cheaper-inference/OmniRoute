// @vitest-environment jsdom
// #18069: the compression analytics tab at 390 px — the 24-bar hourly chart must stay inside its
// card (a keyboard-focusable horizontal scroll region with a floor width), the KPI tiles are the
// kit `Stat` (format "text": the values are preformatted strings), and the "skipped" note keeps the
// full muted colour instead of an opacity-reduced one that falls below AA.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const translate = Object.assign(
  (key: string, params?: Record<string, unknown>) =>
    params ? `${key}:${JSON.stringify(params)}` : key,
  { rich: (key: string) => key }
);
vi.mock("next-intl", () => ({ useTranslations: () => translate }));

const CompressionAnalyticsTab = (
  await import("../../../src/app/(dashboard)/dashboard/analytics/CompressionAnalyticsTab")
).default;

const HOURS = Array.from({ length: 24 }, (_, i) => ({
  hour: `2026-11-09T${String(i).padStart(2, "0")}:00:00`,
  count: i + 1,
  tokensSaved: (i + 1) * 100,
}));

const STATS = {
  totalRequests: 300,
  totalTokensSaved: 30000,
  avgSavingsPct: 42,
  avgDurationMs: 12,
  byMode: { lite: { count: 300, tokensSaved: 30000, avgSavingsPct: 42, skipped: 4 } },
  byProvider: {},
  last24h: HOURS,
  totalSkipped: 4,
  validationFallbacks: 2,
  realUsage: {
    requestsWithReceipts: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    estimatedUsdSaved: 0,
    bySource: {},
  },
};

let el: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

async function mount() {
  el = document.createElement("div");
  document.body.appendChild(el);
  root = createRoot(el);
  await act(async () => {
    root.render(<CompressionAnalyticsTab />);
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe("CompressionAnalyticsTab at narrow widths (#18069)", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => ({
        ok: true,
        json: async () => (String(url).includes("/api/analytics/compression") ? STATS : {}),
      }))
    );
  });

  afterEach(() => {
    act(() => root?.unmount());
    el?.remove();
    vi.unstubAllGlobals();
  });

  it("keeps the 24 hourly bars in a focusable horizontal scroll region with a floor width", async () => {
    await mount();
    const region = el.querySelector<HTMLElement>('[data-testid="compression-hourly-chart"]');
    expect(region).not.toBeNull();
    expect(region!.className).toContain("overflow-x-auto");
    // axe scrollable-region-focusable: a scroll container with no focusable content must be
    // focusable itself, and a focusable region needs a name.
    expect(region!.getAttribute("tabindex")).toBe("0");
    expect(region!.getAttribute("role")).toBe("region");
    expect(region!.getAttribute("aria-label")).toBe("compressionAnalyticsLast24HoursActivity");
    const track = region!.firstElementChild as HTMLElement;
    expect(track.className).toMatch(/\bmin-w-\[/);
    expect(track.children).toHaveLength(24);
  });

  it("renders the six KPI tiles as kit Stat with their preformatted values", async () => {
    await mount();
    const stats = el.querySelectorAll<HTMLElement>(".ci-stat");
    expect(stats).toHaveLength(6);
    for (const stat of stats) expect(stat.getAttribute("data-value-format")).toBe("text");
    expect(el.querySelector(".ci-stat-row")).not.toBeNull();
    const values = [...stats].map((s) => s.querySelector(".ci-stat__value")?.textContent);
    expect(values).toContain((304).toLocaleString());
    expect(values).toContain("42%");
    expect(values).toContain("12ms");
  });

  it("keeps the skipped note at full muted contrast", async () => {
    await mount();
    const skipped = [...el.querySelectorAll("span")].find((s) =>
      s.textContent?.startsWith("compressionAnalyticsSkipped")
    );
    expect(skipped).toBeDefined();
    expect(skipped!.className).not.toMatch(/text-text-muted\/\d+/);
  });
});
