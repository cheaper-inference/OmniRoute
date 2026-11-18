// @vitest-environment jsdom
/**
 * Provider stats page: the 30-second auto-refresh pauses while the tab is hidden
 * and resumes on `visibilitychange`, and the stats card shows the start of the
 * 7-day window (windowSince) reported by the API.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import enMessages from "@/i18n/messages/en.json";

vi.mock("next-intl", () => {
  // Stable per namespace, like the real hook: the page's refresh effect depends
  // on the translator identity, so a fresh function per render would loop.
  const stable = new Map<string, unknown>();
  return {
    useTranslations: (ns: string = "common") => {
      if (!stable.has(ns)) {
        const bag = ((enMessages as Record<string, unknown>)[ns] || {}) as Record<string, string>;
        const translate = (key: string, params?: Record<string, unknown>) => {
          let str = bag[key] ?? key;
          if (params) {
            for (const [pKey, pVal] of Object.entries(params)) {
              str = str.replace(new RegExp(`\\{${pKey}\\}`, "g"), String(pVal));
            }
          }
          return str;
        };
        stable.set(ns, Object.assign(translate, { has: (key: string) => key in bag }));
      }
      return stable.get(ns);
    },
  };
});

vi.mock("@/lib/display/useProviderNodeMap", () => ({
  useProviderNodeMap: () => new Map<string, unknown>(),
  resolveProviderName: (id: string | null | undefined) => id ?? "",
}));

import ProviderStatsPage from "@/app/(dashboard)/dashboard/provider-stats/page";

function setVisibility(state: "visible" | "hidden") {
  Object.defineProperty(document, "visibilityState", { configurable: true, get: () => state });
}

describe("ProviderStatsPage", () => {
  let container: HTMLDivElement;
  let root: Root;
  let fetchCalls: number;

  const windowSince = "2026-10-12T10:00:00.000Z";
  const payload = {
    providers: [{ provider: "openai", totalRequests: 2, successfulRequests: 1, avgLatencyMs: 200 }],
    models: [],
    comboMetrics: {},
    telemetry: {},
    toolLatency: {},
    windowSince,
  };

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"] });
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchCalls = 0;
    setVisibility("visible");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        fetchCalls += 1;
        return new Response(JSON.stringify(payload), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      })
    );
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    setVisibility("visible");
  });

  async function mount() {
    await act(async () => {
      root.render(<ProviderStatsPage />);
    });
    // Settle the initial fetch (microtasks only — no timer advance, so the
    // 30-second interval cannot fire here).
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });
  }

  it("labels the stats with the start of the 7-day window", async () => {
    await mount();
    const expected = new Date(payload.windowSince).toLocaleDateString();
    expect(container.textContent).toContain(`Since ${expected}`);
    expect(container.textContent).not.toContain(payload.windowSince); // no raw ISO date
    // Unmount before the next test: the page's 30-second interval would otherwise
    // fire against the next test's fetch counter.
    act(() => root.unmount());
  });

  it("pauses the 30-second refresh while hidden and resumes on visibilitychange", async () => {
    setVisibility("hidden");
    await mount();
    expect(fetchCalls).toBe(1);

    // Two full 30-second ticks while the tab is hidden: no refetch.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(60000);
    });
    expect(fetchCalls).toBe(1);

    setVisibility("visible");
    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(fetchCalls).toBe(2);

    // The interval keeps running once the tab is visible.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(30000);
    });
    expect(fetchCalls).toBe(3);
  });
});
