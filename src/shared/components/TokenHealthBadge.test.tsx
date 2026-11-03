// @vitest-environment jsdom
// The token health badge's "Refresh all" action: one click triggers the
// POST /api/token-health bulk refresh, the button stays disabled while the
// call is in flight, the result toast carries the route's counters, and the
// badge re-fetches its health state once the wave settles.
//
// Same runner pattern as src/shared/components/ProviderCooldownCard.test.tsx
// (react-dom/client directly, vi.mock("next-intl"), stubbed fetch).
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TokenHealthBadge from "./TokenHealthBadge";
import { useNotificationStore } from "@/store/notificationStore";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, string | number>) =>
    values ? `${key} (${Object.values(values).join(", ")})` : key,
}));

const HEALTH_OK = {
  total: 3,
  healthy: 2,
  errored: 1,
  warning: 0,
  lastCheckAt: "2026-11-03T00:00:00.000Z",
  status: "error",
};

let container: HTMLDivElement;
let root: Root;

const fetchCalls: Array<{ url: string; method: string }> = [];

function stubFetch(impl: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) {
  vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const method = (init?.method ?? "GET").toUpperCase();
    fetchCalls.push({ url, method });
    return impl(input, init);
  });
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("TokenHealthBadge — refresh all", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    fetchCalls.length = 0;
    useNotificationStore.getState().clearAll();
  });

  afterEach(() => {
    root.unmount();
    container.remove();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function refreshButton(): HTMLButtonElement {
    // Radix portals the PopoverContent to document.body, so the action is
    // looked up on the portal root rather than the render container.
    const portal = document.body.querySelector('[data-slot="popover-content"]');
    const button = Array.from(portal?.querySelectorAll("button") ?? []).find((b) =>
      b.textContent?.includes("refreshAll")
    ) as HTMLButtonElement;
    expect(button).toBeTruthy();
    return button;
  }

  it("shows the Refresh all action and triggers a bulk refresh with a counters toast and a re-fetch", async () => {
    const counters = { refreshed: 2, skipped: 1, failed: 1 };
    let settleWave: (() => void) | null = null;
    const waveGate = new Promise<void>((resolve) => {
      settleWave = resolve;
    });

    stubFetch((input, init) => {
      const url = String(typeof input === "string" ? input : ((input as URL).href ?? ""));
      const method = (init?.method ?? "GET").toUpperCase();
      if (method === "POST" && url.endsWith("/api/token-health")) {
        // The wave stays in flight until the test releases it, so the
        // disabled state is observable between the click and the settle.
        return waveGate.then(
          () => jsonResponse(counters),
          () => jsonResponse({ error: "refresh failed" }, 500)
        );
      }
      return Promise.resolve(jsonResponse(HEALTH_OK));
    });

    await act(async () => {
      root.render(<TokenHealthBadge />);
    });

    // First GET: the badge fetches its health state on mount.
    await act(async () => {
      await Promise.resolve();
    });
    expect(fetchCalls.some((c) => c.method === "GET" && c.url.endsWith("/api/token-health"))).toBe(
      true
    );

    // Open the detail panel to reveal the action.
    const trigger = container.querySelector("button[aria-label]") as HTMLButtonElement;
    await act(async () => {
      trigger.click();
      await Promise.resolve();
      await Promise.resolve();
    });

    const button = refreshButton();

    // The click handler is async: wait for the in-flight window, then settle
    // the wave inside act so the toast + re-fetch flush.
    await act(async () => {
      button.click();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(button.disabled).toBe(true);
      expect(
        fetchCalls.some((c) => c.method === "POST" && c.url.endsWith("/api/token-health"))
      ).toBe(true);
      settleWave?.();
      await Promise.resolve();
    });

    // Button re-enabled once the call settles.
    expect(button.disabled).toBe(false);

    // Counters toast from the route response.
    const notifications = useNotificationStore.getState().notifications;
    expect(notifications.length).toBe(1);
    expect(notifications[0].type).toBe("error");
    expect(notifications[0].message).toContain("2");
    expect(notifications[0].message).toContain("1");

    // The badge re-fetched its health state after the wave.
    const getAfterPost = fetchCalls.filter(
      (c) => c.method === "GET" && c.url.endsWith("/api/token-health")
    );
    expect(getAfterPost.length).toBe(2);
  });
});
