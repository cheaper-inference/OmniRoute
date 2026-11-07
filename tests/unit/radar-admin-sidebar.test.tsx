// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
// Render budget, not an import budget. Measured in review: the kit Sidebar mounts about 1.3–2×
// slower than the legacy one (SidebarMenuButton asChild wrapping, a Radix tooltip per rail item);
// under 5 s at host load 10–16, 9–16 s for the slowest cases at load 25–48. 30 s is headroom for
// that load, not a mask for an eager-render bug.
vi.setConfig({ testTimeout: 30_000 });

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const translate = (key: string) => key;
    translate.has = () => false;
    return translate;
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/radar",
}));

function jsonResponse(body: unknown) {
  return { ok: true, status: 200, json: async () => body } as Response;
}

// The Sidebar renders inside the kit SidebarProvider + kit <Sidebar> (as DashboardShell does).
async function loadSidebar() {
  const { SidebarProvider, Sidebar: KitSidebar } = await import("@omniroute/ui-kit/sidebar");
  const { default: Sidebar } = await import("@/shared/components/Sidebar");
  return function Harness() {
    return (
      <SidebarProvider>
        <KitSidebar collapsible="icon">
          <Sidebar />
        </KitSidebar>
      </SidebarProvider>
    );
  };
}

async function flushSettingsFetch() {
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("G17 Radar Admin owner-only sidebar link", () => {
  let root: Root | undefined;
  let container: HTMLElement;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.clear();
    localStorage.setItem("sidebar-expanded-sections", JSON.stringify(["costs"]));
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (root) {
      act(() => root!.unmount());
      root = undefined;
    }
    container.remove();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("keeps navigation inert when the authenticated settings response has no URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({ radarEnabled: true }))
    );
    const Sidebar = await loadSidebar();

    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
      await flushSettingsFetch();
    });

    expect(container.querySelector('a[href*="radar-admin.example"]')).toBeNull();
    expect(container.textContent).not.toContain("Radar Admin");
  });

  it("renders the configured private URL as a hardened external owner link", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({
          radarEnabled: true,
          radarAdminUrl: "https://radar-admin.example.test/ops",
        })
      )
    );
    const Sidebar = await loadSidebar();

    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
      await flushSettingsFetch();
    });

    const link = container.querySelector<HTMLAnchorElement>(
      'a[href="https://radar-admin.example.test/ops"]'
    );
    expect(link).not.toBeNull();
    expect(link?.target).toBe("_blank");
    expect(link?.rel).toContain("noopener");
    expect(link?.rel).toContain("noreferrer");
    expect(link?.textContent).toContain("Radar Admin ↗");
  });

  it("fails closed when the settings boundary returns an unsafe URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({
          radarEnabled: true,
          radarAdminUrl: "javascript:alert(document.cookie)",
        })
      )
    );
    const Sidebar = await loadSidebar();

    root = createRoot(container);
    await act(async () => {
      root!.render(<Sidebar />);
      await flushSettingsFetch();
    });

    expect(container.textContent).not.toContain("Radar Admin");
    expect(container.querySelector('a[href^="javascript:"]')).toBeNull();
  });
});
