// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import CacheHealthTab from "@/app/(dashboard)/dashboard/analytics/CacheHealthTab";

vi.mock("next-intl", () => ({
  useTranslations: () => Object.assign((key: string) => key, { has: () => false }),
}));
const summary = {
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
  byModel: [],
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
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("shows reported tiers, unknown legacy usage and a labeled known-tier estimate", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json(summary))
  );
  render(<CacheHealthTab />);
  expect(await screen.findByText("5m cache-write tokens")).toBeTruthy();
  expect(screen.getByText("1h cache-write tokens")).toBeTruthy();
  expect(screen.getByText("Unknown-tier tokens")).toBeTruthy();
  expect(screen.getByText("$0.000178")).toBeTruthy();
  expect(screen.getByText(/not cash spend or subscription quota/i)).toBeTruthy();
});

it("does not display missing price as zero dollars", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ ...summary, cacheWriteKnownTierCostUsd: null }))
  );
  render(<CacheHealthTab />);
  expect(await screen.findByText("Not available")).toBeTruthy();
  expect(screen.queryByText("$0.000000")).toBeNull();
});

it("shows the real reported zero estimate", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ ...summary, cacheWriteKnownTierCostUsd: 0 }))
  );
  render(<CacheHealthTab />);
  expect(await screen.findByText("$0.000000")).toBeTruthy();
});

it("shows loading, empty and error states without invented tier values", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ ...summary, verdict: "no-data", totalCalls: 0 }))
  );
  const view = render(<CacheHealthTab />);
  expect(screen.queryByText("5m cache-write tokens")).toBeNull();
  expect(await screen.findByText("No calls with cache accounting in this window.")).toBeTruthy();
  view.unmount();
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(null, { status: 500 }))
  );
  render(<CacheHealthTab />);
  expect(await screen.findByText("Could not load the prompt-cache summary.")).toBeTruthy();
});
