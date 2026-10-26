// @vitest-environment jsdom
/**
 * F4 (KEA-7886, review M-4): render tests for widgets the F4 sweep moved onto the kit adapters —
 * MaintenanceBanner, CloudSyncStatus, MitmProxyTab. Each must render without Material ligatures,
 * with token colours and the adapter controls.
 */
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => Object.assign((key: string) => key, { has: () => false }),
}));
const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push, refresh: vi.fn() }) }));

const json = (body: unknown, ok = true) =>
  ({ ok, status: ok ? 200 : 500, json: async () => body }) as Response;

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  push.mockClear();
});

describe("MaintenanceBanner", () => {
  it("shows a token-coloured warning after two failed pings and the ghost close button hides it", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => json({}, false))
    );
    const { default: MaintenanceBanner } = await import("@/shared/components/MaintenanceBanner");
    const { container } = render(<MaintenanceBanner />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_050);
    });
    const banner = container.querySelector<HTMLElement>('[role="status"]')!;
    expect(banner).not.toBeNull();
    expect(banner.className).toContain("bg-warning-bg");
    expect(banner.className).not.toMatch(/amber-\d/);
    expect(banner.querySelector('svg[data-icon="warning"]')).not.toBeNull();
    expect(banner.querySelector(".material-symbols-outlined")).toBeNull();
    const close = screen.getByRole("button", { name: "close" });
    expect(close.className).toContain("ci-button");
    act(() => fireEvent.click(close));
    expect(container.querySelector('[role="status"]')).toBeNull();
  });
});

describe("CloudSyncStatus", () => {
  it("renders a ghost kit Button with a Lucide icon and success token ink when synced", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => json({ enabled: true, connected: true, lastSync: null }))
    );
    const { default: CloudSyncStatus } = await import("@/shared/components/CloudSyncStatus");
    render(<CloudSyncStatus />);
    const button = await screen.findByRole("button", { name: "statusLabel" });
    expect(button.className).toContain("ci-button");
    const icon = button.querySelector('svg[data-icon="cloud_done"]')!;
    expect(icon).not.toBeNull();
    expect(icon.getAttribute("class")).toContain("text-success");
    expect(button.querySelector(".material-symbols-outlined")).toBeNull();
    expect(button.innerHTML).not.toMatch(/(green|blue|amber|red)-\d/);
    act(() => fireEvent.click(button));
    expect(push).toHaveBeenCalledWith("/dashboard/endpoint");
  });
});

describe("MitmProxyTab", () => {
  it(
    "renders labelled adapter fields, kit badges and a kit table for the target routes",
    { timeout: 30_000 },
    async () => {
      // The kit Table watches its scroll container.
      vi.stubGlobal(
        "ResizeObserver",
        class {
          observe() {}
          unobserve() {}
          disconnect() {}
        }
      );
      vi.stubGlobal(
        "fetch",
        vi.fn(async () =>
          json({
            running: true,
            pid: 4242,
            dnsConfigured: true,
            certExists: false,
            hasCachedPassword: false,
            port: 443,
            targets: [
              {
                id: "t1",
                name: "Copilot",
                targetHost: "api.example.com",
                targetPort: 443,
                localPort: 8443,
                endpoints: ["/v1/chat"],
                enabled: true,
              },
            ],
            stats: {
              startedAt: null,
              totalRequests: 3,
              interceptedRequests: 2,
              activeConnections: 1,
              lastInterceptAt: null,
            },
          })
        )
      );
      const { default: MitmProxyTab } =
        await import("@/app/(dashboard)/dashboard/settings/components/MitmProxyTab");
      const { container } = render(<MitmProxyTab />);
      await screen.findByText("Copilot");
      expect(screen.getByLabelText("port")).toBeTruthy();
      expect(screen.getByLabelText("apiKey").getAttribute("type")).toBe("password");
      expect(container.querySelector("table.ci-table")).not.toBeNull();
      expect(screen.getByRole("button", { name: /stop/ }).className).toContain("ci-button");
      expect(container.querySelectorAll(".ci-badge").length).toBeGreaterThan(2);
      expect(container.querySelector(".material-symbols-outlined")).toBeNull();
      expect(container.innerHTML).not.toMatch(/(emerald|amber|red)-\d/);
    }
  );
});
