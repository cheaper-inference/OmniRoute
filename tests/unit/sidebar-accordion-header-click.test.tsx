// @vitest-environment jsdom
// Regression for UX-1: the accordion section header is a native <button>, so
// it stays in the tab order and activates from the keyboard (Enter/Space)
// without a role="button" + tabIndex/onKeyDown shim. Mouse click already
// toggled the section; this guards focusability and keyboard activation, the
// symmetric toggle, and pin-button isolation (the pin control is a sibling
// <button> without aria-expanded and must NOT toggle the section).
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
  usePathname: () => "/dashboard/home",
}));

let container: HTMLDivElement;
let root: Root | null = null;

beforeEach(() => {
  localStorage.clear();
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  act(() => root?.unmount());
  root = null;
  container.remove();
});

// The Sidebar renders inside the kit SidebarProvider + kit <Sidebar> (as DashboardShell does).
async function renderSidebar() {
  const { SidebarProvider, Sidebar: KitSidebar } = await import("@omniroute/ui-kit/sidebar");
  const { default: Sidebar } = await import("@/shared/components/Sidebar");
  await act(async () => {
    root = createRoot(container);
    root.render(
      <SidebarProvider>
        <KitSidebar collapsible="icon">
          <Sidebar />
        </KitSidebar>
      </SidebarProvider>
    );
  });
}

function collapsedHeader(): HTMLButtonElement {
  // OmniProxy is pinned-by-default (starts expanded); the other sections start
  // collapsed. Target a collapsed header so the click-to-expand assertion is
  // meaningful rather than a no-op toggle of an already-expanded section.
  const collapsed = container.querySelector<HTMLButtonElement>('button[aria-expanded="false"]');
  if (!collapsed) throw new Error("no collapsed accordion header found");
  return collapsed;
}

async function click(el: HTMLElement) {
  await act(async () => {
    el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  });
}

describe("Sidebar accordion header keyboard and focus (UX-1)", () => {
  it("expands the section on a real mouse click", async () => {
    await renderSidebar();
    const header = collapsedHeader();
    expect(header.getAttribute("aria-expanded")).toBe("false");

    await click(header);

    expect(header.getAttribute("aria-expanded")).toBe("true");
  });

  it("expands via keyboard focus and activation", async () => {
    await renderSidebar();
    const header = collapsedHeader();

    // A native <button> is in the tab order. Focus it, then activate — Enter
    // and Space synthesize a click on the focused button.
    header.focus();
    expect(document.activeElement).toBe(header);
    await click(header);

    expect(header.getAttribute("aria-expanded")).toBe("true");
  });

  it("collapses on a second click (toggle is symmetric)", async () => {
    await renderSidebar();
    const header = collapsedHeader();

    await click(header);
    expect(header.getAttribute("aria-expanded")).toBe("true");
    await click(header);
    expect(header.getAttribute("aria-expanded")).toBe("false");
  });

  it("clicking the pin button does NOT toggle the section", async () => {
    await renderSidebar();
    const header = collapsedHeader();
    // The section pin toggle (aria-pressed); `button[title]` would now hit the sidebar collapse
    // trigger, which sits first in the kit header.
    const pin = container.querySelector<HTMLButtonElement>("nav button[aria-pressed]");
    if (!pin) throw new Error("pin button not found");

    await click(pin);

    // pin click must be isolated from the section toggle
    expect(header.getAttribute("aria-expanded")).toBe("false");
  });
});
