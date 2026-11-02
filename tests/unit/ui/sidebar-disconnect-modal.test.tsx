// @vitest-environment jsdom
/**
 * F4 (KEA-7886, review M-4): after Shutdown the Sidebar showed a hand-rolled black overlay with no
 * dialog semantics. It is now a non-dismissible kit Modal: named by its title, Escape and the
 * overlay do not close it, focus moves inside onto "Reload page".
 */
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE = "1";
vi.setConfig({ testTimeout: 30_000 });

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const translate = (key: string) => key;
    translate.has = () => false;
    return translate;
  },
}));
vi.mock("next/navigation", () => ({ usePathname: () => "/dashboard/combos" }));

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

const flush = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 20)));
const dialogs = () => [...document.body.querySelectorAll<HTMLElement>('[role="dialog"]')];

describe("Sidebar disconnect notice", () => {
  let root: Root | undefined;
  let container: HTMLElement;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, status: 200, json: async () => ({}) }) as Response)
    );
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (root) act(() => root!.unmount());
    root = undefined;
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("is a named, non-dismissible kit dialog with focus on Reload page", async () => {
    const Harness = await loadSidebar();
    root = createRoot(container);
    await act(async () => root!.render(<Harness />));

    const shutdown = container.querySelector<HTMLButtonElement>('button[aria-label="shutdown"]')!;
    expect(shutdown).not.toBeNull();
    act(() => shutdown.click());
    await flush();
    const confirm = [...dialogs()[0].querySelectorAll("button")].find(
      (b) => b.textContent?.trim() === "shutdown"
    )!;
    await act(async () => confirm.click());
    await flush();

    const notice = dialogs().find((d) => d.textContent?.includes("serverDisconnectedMsg"))!;
    expect(notice).toBeDefined();
    expect(notice.className).toContain("ci-dialog");
    const labelledBy = notice.getAttribute("aria-labelledby");
    expect(labelledBy && document.getElementById(labelledBy)?.textContent).toBe(
      "serverDisconnected"
    );
    expect(notice.querySelector(".material-symbols-outlined")).toBeNull();
    // No close button; focus lands on the only action.
    const buttons = [...notice.querySelectorAll("button")];
    expect(buttons.map((b) => b.textContent?.trim())).toEqual(["reloadPage"]);
    expect(document.activeElement).toBe(buttons[0]);

    // Escape and an outside pointer interaction leave it open.
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    await flush();
    act(() => {
      document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    });
    await flush();
    expect(dialogs().some((d) => d.textContent?.includes("serverDisconnectedMsg"))).toBe(true);
  });
});
