// @vitest-environment jsdom
import React from "react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("@/shared/components/Sidebar", () => ({
  default: () => <nav data-testid="kit-sidebar" />,
  useSidebarSide: () => "left",
}));
vi.mock("@/shared/components/Header", () => ({
  default: () => <header data-testid="kit-header" />,
}));
vi.mock("@/shared/components/CommandPalette", () => ({ default: () => null }));
vi.mock("@/shared/components/MaintenanceBanner", () => ({ default: () => null }));
vi.mock("@/shared/components/NavigationProgress", () => ({ default: () => null }));

const { default: DashboardLayout } = await import("@/shared/components/layouts/DashboardLayout");

afterEach(() => cleanup());

describe("DashboardLayout — the kit shell is the only shell (KEA-7886 F4)", () => {
  it("renders SidebarProvider + SidebarInset with the kit sidebar/header", () => {
    const { container, getByTestId } = render(
      <DashboardLayout>
        <p>page</p>
      </DashboardLayout>
    );
    expect(container.querySelector("[data-slot=sidebar-provider]")).not.toBeNull();
    expect(container.querySelector("main[data-slot=sidebar-inset]#main-content")).not.toBeNull();
    getByTestId("kit-sidebar");
    getByTestId("kit-header");
    expect(container.querySelector(".dashboard-sidebar-desktop")).toBeNull();
  });

  it("renders one skip link to #main-content outside the sidebar, also below the mobile breakpoint", () => {
    // Below 1024 px the kit <Sidebar> exists only inside the (closed) Sheet, so a skip link
    // rendered by Sidebar.tsx would be absent; the shell renders it before the sidebar.
    const original = window.matchMedia;
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
    try {
      const { container } = render(
        <DashboardLayout>
          <p>page</p>
        </DashboardLayout>
      );
      const skips = document.querySelectorAll('a[href="#main-content"]');
      expect(skips).toHaveLength(1);
      expect(skips[0].closest("aside")).toBeNull();
      expect(skips[0].className).toContain("focus:text-accent-foreground");
      // The skip link is the first focusable element of the shell (the Sheet is closed here).
      const focusables = document.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      expect(focusables.length).toBeGreaterThan(0);
      expect(focusables[0]).toBe(skips[0]);
      expect(container.querySelector("#main-content")).not.toBeNull();
    } finally {
      window.matchMedia = original;
    }
  });

  it("on desktop the skip link precedes the kit sidebar in document order", () => {
    render(
      <DashboardLayout>
        <p>page</p>
      </DashboardLayout>
    );
    const skip = document.querySelector('a[href="#main-content"]');
    const aside = document.querySelector("aside[data-slot=sidebar]");
    expect(skip).not.toBeNull();
    expect(aside).not.toBeNull();
    expect(skip!.compareDocumentPosition(aside!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("starts expanded by default and collapsed when the server cookie says so", () => {
    const { container, unmount } = render(
      <DashboardLayout>
        <p>page</p>
      </DashboardLayout>
    );
    const provider = () => container.querySelector("[data-slot=sidebar-provider]");
    expect(provider()!.getAttribute("data-state")).toBe("expanded");
    unmount();
    const collapsed = render(
      <DashboardLayout sidebarDefaultOpen={false}>
        <p>page</p>
      </DashboardLayout>
    );
    expect(
      collapsed.container.querySelector("[data-slot=sidebar-provider]")!.getAttribute("data-state")
    ).toBe("collapsed");
  });

  it("has no shell switch left: no shell prop, no legacy import, no UI_KIT_SHELL read", () => {
    const layout = readFileSync(
      resolve(process.cwd(), "src/shared/components/layouts/DashboardLayout.tsx"),
      "utf8"
    );
    expect(layout).not.toMatch(/\bshell\??:|shell=|DashboardShellMode|[Ll]egacy/);
    const serverLayout = readFileSync(
      resolve(process.cwd(), "src/app/(dashboard)/layout.tsx"),
      "utf8"
    );
    expect(serverLayout).not.toMatch(/UI_KIT_SHELL|isUiKitShellEnabled|shell=/);
  });
});
