// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { SidebarProvider, Sidebar as KitSidebar } from "@omniroute/ui-kit/sidebar";
import Sidebar from "@/shared/components/Sidebar";
import FeatureFlagsGrid from "@/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid";

vi.mock("next/navigation", () => ({ usePathname: () => "/dashboard/settings/feature-flags" }));
vi.mock("@/shared/components/CloudSyncStatus", () => ({ default: () => null }));

let root: Root;
let container: HTMLDivElement;

function Harness() {
  return (
    <SidebarProvider>
      <KitSidebar collapsible="icon">
        <Sidebar />
      </KitSidebar>
      <main>
        <FeatureFlagsGrid />
      </main>
    </SidebarProvider>
  );
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  localStorage.clear();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url.endsWith("/feature-flags")
          ? {
              flags: [],
              summary: { total: 0, active: 0, inactive: 0, overriddenByDb: 0, overriddenByEnv: 0 },
            }
          : { hiddenSidebarItems: ["settings-feature-flags"] },
    }))
  );
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  localStorage.clear();
  vi.unstubAllGlobals();
});

it("has a visible page pin control that immediately adds and removes the sidebar shortcut", async () => {
  await act(async () => {
    root.render(<Harness />);
  });
  const button = container.querySelector<HTMLButtonElement>("main button[aria-pressed]");
  expect(button).not.toBeNull();
  expect(button!.textContent).toMatch(/Pin/i);
  expect(button!.getAttribute("aria-pressed")).toBe("false");
  expect(container.querySelector('a[href="/dashboard/settings/feature-flags"]')).toBeNull();
  await act(async () => {
    button!.click();
  });
  expect(button!.getAttribute("aria-pressed")).toBe("true");
  expect(JSON.parse(localStorage.getItem("sidebar-pinned-items") || "[]")).toEqual([
    "settings-feature-flags",
  ]);
  expect(container.querySelectorAll('a[href="/dashboard/settings/feature-flags"]')).toHaveLength(1);
  await act(async () => {
    button!.click();
  });
  expect(button!.getAttribute("aria-pressed")).toBe("false");
  expect(container.querySelector('a[href="/dashboard/settings/feature-flags"]')).toBeNull();
});

it("restores persisted pins and reflects unpinning from the sidebar on the page", async () => {
  localStorage.setItem(
    "sidebar-pinned-items",
    JSON.stringify(["analytics", "settings-feature-flags"])
  );
  await act(async () => {
    root.render(<Harness />);
  });
  const button = container.querySelector<HTMLButtonElement>("main button[aria-pressed]")!;
  expect(button.getAttribute("aria-pressed")).toBe("true");
  const link = container.querySelector('a[href="/dashboard/settings/feature-flags"]')!;
  const unpin = link.parentElement!.querySelector<HTMLButtonElement>(
    'button[aria-label="Unpin item"]'
  )!;
  await act(async () => {
    unpin.click();
  });
  expect(button.getAttribute("aria-pressed")).toBe("false");
  expect(JSON.parse(localStorage.getItem("sidebar-pinned-items") || "[]")).toEqual(["analytics"]);
});

it("synchronizes pin changes and storage clearing from another tab", async () => {
  await act(async () => {
    root.render(<Harness />);
  });
  const button = container.querySelector<HTMLButtonElement>("main button[aria-pressed]")!;
  await act(async () => {
    localStorage.setItem("sidebar-pinned-items", JSON.stringify(["settings-feature-flags"]));
    window.dispatchEvent(
      new StorageEvent("storage", { key: "sidebar-pinned-items", storageArea: localStorage })
    );
  });
  expect(button.getAttribute("aria-pressed")).toBe("true");
  expect(container.querySelectorAll('a[href="/dashboard/settings/feature-flags"]')).toHaveLength(1);
  await act(async () => {
    localStorage.clear();
    window.dispatchEvent(new StorageEvent("storage", { key: null, storageArea: localStorage }));
  });
  expect(button.getAttribute("aria-pressed")).toBe("false");
  expect(container.querySelector('a[href="/dashboard/settings/feature-flags"]')).toBeNull();
});

it("hydrates a stored page pin without mismatching the server markup", async () => {
  localStorage.setItem("sidebar-pinned-items", JSON.stringify(["settings-feature-flags"]));
  const markup = renderToString(<FeatureFlagsGrid />);
  expect(markup).toContain('aria-pressed="false"');
  act(() => root.unmount());
  container.innerHTML = markup;
  const recoverableError = vi.fn();
  await act(async () => {
    root = hydrateRoot(container, <FeatureFlagsGrid />, { onRecoverableError: recoverableError });
  });
  expect(recoverableError).not.toHaveBeenCalled();
  expect(container.querySelector("button[aria-pressed]")?.getAttribute("aria-pressed")).toBe(
    "true"
  );
});

it("recovers from malformed stored pins and keeps controls usable when a write fails", async () => {
  localStorage.setItem("sidebar-pinned-items", "not json");
  await act(async () => {
    root.render(<Harness />);
  });
  const button = container.querySelector<HTMLButtonElement>("main button[aria-pressed]")!;
  const write = vi.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => {
    throw new DOMException("Storage full", "QuotaExceededError");
  });
  await act(async () => {
    button.click();
  });
  expect(button.getAttribute("aria-pressed")).toBe("true");
  expect(container.querySelectorAll('a[href="/dashboard/settings/feature-flags"]')).toHaveLength(1);
  write.mockRestore();
  await act(async () => {
    button.click();
  });
  expect(button.getAttribute("aria-pressed")).toBe("false");
  expect(localStorage.getItem("sidebar-pinned-items")).toBe("[]");
});
