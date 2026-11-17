// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import CachePage from "@/app/(dashboard)/dashboard/cache/page";
import messages from "@/i18n/messages/en.json";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
function fixture(value: number | null, complete: boolean) {
  const provider = {
    estimated: !complete && value !== null,
    requests: 0,
    totalRequests: 1,
    cachedRequests: 0,
    inputTokens: 10,
    cachedTokens: value,
    cacheCreationTokens: value,
    cachedTokensComplete: complete,
    cacheCreationTokensComplete: complete,
  };
  return {
    semanticCache: {
      memoryEntries: 0,
      dbEntries: 0,
      hits: 0,
      misses: 0,
      hitRate: "0",
      tokensSaved: 0,
    },
    promptCache: {
      estimated: !complete && value !== null,
      totalRequests: 1,
      requestsWithCacheControl: 0,
      totalInputTokens: 10,
      totalCachedTokens: value,
      totalCacheCreationTokens: value,
      totalCachedTokensComplete: complete,
      totalCacheCreationTokensComplete: complete,
      tokensSaved: value,
      estimatedCostSaved: value === null ? null : 0,
      savingsComplete: complete,
      byProvider: { synthetic: provider },
      byStrategy: {},
      lastUpdated: "2026-01-01T00:00:00Z",
    },
    trend: [{ ...provider, requests: 1, timestamp: "2026-01-01T00:00:00Z" }],
    idempotency: { activeKeys: 0, windowMs: 5000 },
  };
}
function load(value: number | null, complete: boolean) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string) => ({
      ok: true,
      json: async () => (String(input) === "/api/cache" ? fixture(value, complete) : {}),
    }))
  );
  render(<CachePage />);
}
it("renders unknown cache totals and rates as N/A", async () => {
  load(null, false);
  const row = (await screen.findByText("synthetic")).closest("tr")!;
  expect(within(row).getAllByText("N/A").length).toBeGreaterThanOrEqual(4);
  expect(screen.getAllByText("N/A").length).toBeGreaterThan(6);
});
it("preserves zero and labels mixed estimates and non-invoice costs", async () => {
  load(0, true);
  const row = (await screen.findByText("synthetic")).closest("tr")!;
  expect(within(row).getAllByText("0").length).toBe(2);
  cleanup();
  load(4, false);
  await screen.findByText("synthetic");
  expect(screen.getByText(messages.common.usageEvidence.containsEstimates)).toBeTruthy();
  expect(
    screen.getAllByText(new RegExp(messages.common.usageEvidence.historicalUnknown)).length
  ).toBeGreaterThan(0);
  expect(screen.getAllByText(messages.common.usageEvidence.catalogueCost).length).toBeGreaterThan(
    0
  );
});
it("loading remains distinct from failure and empty data", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => new Promise(() => {}))
  );
  const { container } = render(<CachePage />);
  expect(container.querySelector('[aria-busy="true"]')).toBeTruthy();
  expect(screen.queryByText(messages.cache.unavailable)).toBeNull();
  cleanup();
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: false }))
  );
  render(<CachePage />);
  expect(await screen.findByText(messages.cache.unavailable)).toBeTruthy();
  cleanup();
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      json: async () => ({ ...fixture(null, false), promptCache: null, trend: [] }),
    }))
  );
  render(<CachePage />);
  expect(await screen.findByText(messages.cache.noPromptCacheData)).toBeTruthy();
});
it("cache activity requires known reads and writes while reuse remains read-only", async () => {
  const data = fixture(0, true);
  data.promptCache.totalCacheCreationTokens = null;
  data.promptCache.totalCacheCreationTokensComplete = false;
  data.promptCache.byProvider.synthetic.cacheCreationTokens = null;
  data.promptCache.byProvider.synthetic.cacheCreationTokensComplete = false;
  data.trend[0].cacheCreationTokens = null;
  data.trend[0].cacheCreationTokensComplete = false;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: true, json: async () => data }))
  );
  render(<CachePage />);
  let row = (await screen.findByText("synthetic")).closest("tr")!;
  expect(within(row).getAllByRole("cell")[4].textContent).toBe("0.0%");
  expect(within(row).getAllByRole("cell")[5].textContent).toBe("N/A");
  cleanup();
  load(0, true);
  row = (await screen.findByText("synthetic")).closest("tr")!;
  expect(within(row).getAllByRole("cell")[5].textContent).toBe("0.0%");
});
