// @vitest-environment jsdom
/**
 * KEA-7886 lote 1: the learned-limit pool bar on /dashboard/health is the kit Progress. The kit
 * spreads aria-* onto its outer div and never names the inner role="progressbar", so the bar is
 * decorative (aria-hidden) and the visible "remaining of limit" text carries the value.
 */
import React from "react";
import axe from "axe-core";
import { act, cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, expect, it, vi } from "vitest";
import HealthPage from "../../../src/app/(dashboard)/dashboard/health/page";
import messages from "../../../src/i18n/messages/en.json";

vi.mock("@/lib/display/useProviderNodeMap", () => ({
  useProviderNodeMap: () => ({}),
  resolveProviderName: (provider: string) => provider,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/health/TelemetryCard", () => ({
  default: () => null,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/health/ProviderHealthAutopilotCard", () => ({
  default: () => null,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/health/ProviderHealthMatrixCard", () => ({
  default: () => null,
}));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const HEALTH = {
  status: "healthy",
  system: {
    uptime: 120,
    version: "test",
    nodeVersion: "v24",
    memoryUsage: { rss: 1, heapUsed: 1 },
  },
  providerHealth: {},
  providerSummary: {},
  rateLimitStatus: { "openai:conn1": { queued: 0, running: 0 } },
  learnedLimits: { "openai:conn1": { limit: 100, remaining: 40 } },
  lockouts: {},
  sessions: {},
  quotaMonitor: {},
};

it("keeps the pool bar decorative and the progressbar out of the accessibility tree", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === "/api/monitoring/health") return new Response(JSON.stringify(HEALTH));
      if (url === "/api/admin/concurrency") {
        return new Response(
          JSON.stringify({ timestamp: new Date().toISOString(), comboQueues: {}, semaphores: {} })
        );
      }
      return new Response("{}");
    })
  );
  const { container } = render(
    <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
      <HealthPage />
    </NextIntlClientProvider>
  );
  await act(async () => {});
  await act(async () => {});

  const bar = await screen.findByTestId("health-pool-bar");
  expect(bar.getAttribute("aria-hidden")).toBe("true");
  // The kit progressbar is inside the hidden wrapper…
  const progressbar = bar.querySelector('[role="progressbar"]');
  expect(progressbar).not.toBeNull();
  // …and no aria-label is stranded on the kit's non-role outer div.
  expect(bar.querySelector(".ci-progress[aria-label]")).toBeNull();
  // Every progressbar on the page is either named or hidden from assistive tech.
  for (const el of container.querySelectorAll('[role="progressbar"]')) {
    const named = el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby");
    expect(named || el.closest('[aria-hidden="true"]') !== null).toBe(true);
  }

  const results = await axe.run(bar.parentElement as HTMLElement, {
    runOnly: { type: "rule", values: ["aria-progressbar-name", "aria-prohibited-attr"] },
  });
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
