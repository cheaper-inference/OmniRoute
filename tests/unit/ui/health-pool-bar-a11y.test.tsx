// @vitest-environment jsdom
/**
 * KEA-7886 lote 1: the learned-limit pool bar on /dashboard/health is the kit Progress. Since kit
 * 0.0.116 the Progress forwards its name to the inner role="progressbar" and has a `tone`, so the
 * bar is exposed to assistive tech with its name and spoken value (UI review 2026-11-15, defect 13)
 * instead of being hidden behind aria-hidden and recoloured from the outside.
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

it("exposes the pool bar as a named progressbar with its remaining value", async () => {
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
  // The bar is reachable: nothing above it hides it from assistive tech.
  expect(bar.closest('[aria-hidden="true"]')).toBeNull();
  const progressbar = bar.querySelector('[role="progressbar"]');
  expect(progressbar).not.toBeNull();
  expect(progressbar?.getAttribute("aria-label")).toBe(messages.health.learnedFromHeaders);
  expect(progressbar?.getAttribute("aria-valuenow")).toBe("40");
  expect(progressbar?.getAttribute("aria-valuemax")).toBe("100");
  expect(progressbar?.getAttribute("aria-valuetext")).toContain("40");
  // The status colour is the kit tone, not a class override on the indicator.
  expect(bar.querySelector(".ci-progress__indicator")?.getAttribute("data-tone")).toBe("success");
  expect(bar.className).not.toContain("ci-progress__indicator");
  // No aria-label is stranded on the kit's non-role outer div.
  expect(bar.matches(".ci-progress[aria-label]")).toBe(false);
  // Every progressbar on the page is named.
  for (const el of container.querySelectorAll('[role="progressbar"]')) {
    expect(el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby")).toBe(true);
  }

  const results = await axe.run(bar.parentElement as HTMLElement, {
    runOnly: { type: "rule", values: ["aria-progressbar-name", "aria-prohibited-attr"] },
  });
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
