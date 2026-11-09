// @vitest-environment jsdom
import React from "react";
import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
// Real DashboardShell + real Header + real Sidebar: the budget covers mounting the whole shell.
vi.setConfig({ testTimeout: 60_000 });
vi.mock("next/navigation", () => ({
  usePathname: () => "/home",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("next/link", () => ({
  default: ({ href, children, prefetch: _p, ...p }: any) => (
    <a href={href} {...p}>
      {children}
    </a>
  ),
}));
vi.mock("@/shared/components/CommandPalette", () => ({ default: () => null }));
vi.mock("@/shared/components/MaintenanceBanner", () => ({ default: () => null }));
vi.mock("@/shared/components/NavigationProgress", () => ({ default: () => null }));
vi.mock("@/shared/components/NotificationToast", () => ({ default: () => null }));
vi.mock("@/shared/components/LanguageSelector", () => ({ default: () => null }));

const { default: DashboardShell } = await import("@/shared/components/layouts/DashboardShell");

const TRIGGER = /^(Collapse sidebar|Expand sidebar|Open menu|Close)$/;
const originalMatchMedia = window.matchMedia;
function emulateMobile() {
  window.matchMedia = ((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

async function mount() {
  await act(async () => {
    render(
      <DashboardShell>
        <p>page</p>
      </DashboardShell>
    );
  });
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ featureFlags: {}, hiddenSidebarItems: [], hiddenSidebarSections: [] }),
    }))
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  window.matchMedia = originalMatchMedia;
});

describe("kit shell has a single sidebar trigger (the Header's)", () => {
  it("desktop: one collapse/expand trigger, in the header, and it stays there when collapsed", async () => {
    const user = userEvent.setup();
    await mount();
    const triggers = screen.getAllByRole("button", { name: TRIGGER });
    expect(triggers).toHaveLength(1);
    expect(triggers[0].getAttribute("aria-label")).toBe("Collapse sidebar");
    expect(triggers[0].closest("header.ci-sidebar-shell-header")).not.toBeNull();
    await user.click(triggers[0]);
    const after = screen.getAllByRole("button", { name: TRIGGER });
    expect(after).toHaveLength(1);
    expect(after[0].getAttribute("aria-label")).toBe("Expand sidebar");
  });

  it("mobile: the header opens the drawer, and the open drawer offers exactly one Close", async () => {
    emulateMobile();
    const user = userEvent.setup();
    await mount();
    const triggers = screen.getAllByRole("button", { name: TRIGGER });
    expect(triggers).toHaveLength(1);
    expect(triggers[0].getAttribute("aria-label")).toBe("Open menu");
    await user.click(triggers[0]);
    const aside = await screen.findByRole("navigation", { name: "Main navigation" });
    // The modal Sheet hides the header from assistive tech; its own Close is the only trigger.
    const open = screen.getAllByRole("button", { name: TRIGGER });
    expect(open).toHaveLength(1);
    expect(open[0].getAttribute("aria-label")).toBe("Close");
    expect(within(aside.closest("aside")!).getByRole("button", { name: "Close" })).toBe(open[0]);
  });
});
