// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SidebarProvider } from "@omniroute/ui-kit/sidebar";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/providers",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));
let isElectron = false;
vi.mock("@/shared/hooks/useElectron", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/shared/hooks/useElectron")>()),
  useIsElectron: () => isElectron,
}));
vi.mock("@/shared/components/LanguageSelector", () => ({
  default: () => <div data-testid="lang" />,
}));

const { default: Header } = await import("@/shared/components/Header");
const { default: ThemeToggle } = await import("@/shared/components/ThemeToggle");

afterEach(() => {
  cleanup();
  isElectron = false;
  delete (window as unknown as { electronAPI?: unknown }).electronAPI;
});

describe("Header on the kit shell", () => {
  it(
    "renders the sidebar trigger, page title, product switcher and actions",
    { timeout: 20_000 },
    () => {
      const open = vi.fn();
      render(
        <SidebarProvider>
          <Header onOpenCommandPalette={open} />
        </SidebarProvider>
      );
      const header = document.querySelector<HTMLElement>("header.ci-sidebar-shell-header")!;
      expect(header).not.toBeNull();
      // F renders the header inside the kit inset's <main>: it must not claim the page banner
      expect(header.getAttribute("role")).toBeNull();
      expect(screen.getByRole("button", { name: "Collapse sidebar" })).not.toBeNull();
      expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/Providers/);
      expect(screen.getByRole("navigation", { name: "Keak products" })).not.toBeNull();
      const quickNav = screen.getAllByRole("button", { name: "Open quick navigation" });
      expect(quickNav).toHaveLength(2); // desktop outline + mobile icon (jsdom ignores md:hidden)
      fireEvent.click(quickNav[0]);
      expect(open).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("button", { name: "Logout" }).className).toContain(
        "ci-button--ghost"
      );
      expect(header.querySelector(".material-symbols-outlined")).toBeNull();
    }
  );

  // F4 (wave-1 checkpoint, api-manager/endpoint): 67+ dashboard pages render a kit PageHeader
  // (its own h1), so the shell title repeated it ("API Keys" × "API Key Management") and the
  // page carried two h1s. The shell drops its title while a PageHeader is mounted (removed from
  // the DOM, not CSS-hidden, so h1 locators still find the page's own heading first).
  it("drops its title and icon tile while the page renders a kit PageHeader, and brings them back after", async () => {
    // The shell renders the Header inside #main-content (SidebarInset); the detection is scoped there.
    render(
      <SidebarProvider>
        <main id="main-content">
          <Header />
        </main>
      </SidebarProvider>
    );
    const shell = () => document.querySelector("header.ci-sidebar-shell-header")!;
    const tile = () => shell().querySelector("span.size-9");
    expect(shell().querySelector("h1")?.textContent).toMatch(/Providers/);
    const hadTile = tile() !== null;

    const pageHeader = document.createElement("header");
    pageHeader.className = "ci-page-header";
    pageHeader.innerHTML = "<h1>Providers page</h1>";
    await act(async () => {
      document.getElementById("main-content")!.appendChild(pageHeader);
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(shell().querySelector("h1")).toBeNull();
    expect(tile()).toBeNull();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    await act(async () => {
      pageHeader.remove();
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(shell().querySelector("h1")?.textContent).toMatch(/Providers/);
    expect(tile() !== null).toBe(hadTile);
  });

  it("ignores a PageHeader outside the content region (e.g. inside a portalled dialog)", async () => {
    render(
      <SidebarProvider>
        <main id="main-content">
          <Header />
        </main>
      </SidebarProvider>
    );
    const portal = document.createElement("div");
    portal.setAttribute("role", "dialog");
    portal.innerHTML = '<header class="ci-page-header"><h1>Dialog</h1></header>';
    await act(async () => {
      document.body.appendChild(portal);
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(document.querySelector("header.ci-sidebar-shell-header h1")?.textContent).toMatch(
      /Providers/
    );
    portal.remove();
  });

  it(
    "grows the kit header by the safe-area inset instead of squeezing its controls",
    { timeout: 20_000 },
    () => {
      const { unmount } = render(
        <SidebarProvider>
          <Header />
        </SidebarProvider>
      );
      let style = document.querySelector("header")!.getAttribute("style") ?? "";
      expect(style).toContain("padding-top: var(--ios-safe-top, 0px)");
      expect(style).toContain(
        "height: calc(4rem + var(--ci-border-default) + var(--ios-safe-top, 0px))"
      );
      unmount();

      isElectron = true;
      (window as unknown as { electronAPI?: unknown }).electronAPI = { platform: "darwin" };
      render(
        <SidebarProvider>
          <Header />
        </SidebarProvider>
      );
      style = document.querySelector("header")!.getAttribute("style") ?? "";
      expect(style).toContain("padding-top: var(--desktop-safe-top)");
      expect(style).toContain(
        "height: calc(4rem + var(--ci-border-default) + var(--desktop-safe-top))"
      );
    }
  );

  it(
    "ThemeToggle is a ghost icon button with a translated name that flips",
    { timeout: 20_000 },
    () => {
      render(<ThemeToggle />);
      const btn = screen.getByRole("button", { name: /Switch to (dark|light) mode/ });
      expect(btn.className).toContain("ci-button--ghost");
      expect(btn.querySelector("svg.oi-icon")).not.toBeNull();
      const before = btn.getAttribute("aria-label");
      fireEvent.click(btn);
      expect(
        screen
          .getByRole("button", { name: /Switch to (dark|light) mode/ })
          .getAttribute("aria-label")
      ).not.toBe(before);
    }
  );
});
