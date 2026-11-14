// @vitest-environment jsdom
/**
 * The batch page rendered two "New batch" buttons: one in the PageHeader actions and a
 * second in the toolbar above the list (visual pass 2026-11-13, #19620). The header one is
 * rendered unconditionally, so it is the single entry point; the toolbar keeps Refresh.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => {
    const t = (key: string) => key;
    t.has = () => false;
    return t;
  },
}));

globalThis.IntersectionObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;

const { default: BatchPage } = await import("../../../../src/app/(dashboard)/dashboard/batch/page");

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: [], has_more: false, total_count: 0, connections: [] }),
      } as unknown as Response)
    )
  );
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

function newBatchButtons() {
  return Array.from(container.querySelectorAll("button")).filter((b) =>
    (b.textContent || "").includes("batchListNewButton")
  );
}

describe("BatchPage — New batch entry point", () => {
  it("renders exactly one New batch button, in the page header", async () => {
    await act(async () => {
      root.render(<BatchPage />);
    });
    await act(async () => {
      await Promise.resolve();
    });

    const buttons = newBatchButtons();
    expect(buttons).toHaveLength(1);
    expect(buttons[0].closest("[data-slot=page-header], header")).not.toBeNull();
  });

  it("keeps the Refresh button in the list toolbar", async () => {
    await act(async () => {
      root.render(<BatchPage />);
    });
    await act(async () => {
      await Promise.resolve();
    });

    const refresh = Array.from(container.querySelectorAll("button")).find((b) =>
      /batchListRefresh/.test(b.textContent || "")
    );
    expect(refresh).toBeTruthy();
  });

  it("opens the wizard from the header button", async () => {
    await act(async () => {
      root.render(<BatchPage />);
    });
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      newBatchButtons()[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(document.body.querySelector("[role=dialog]")).not.toBeNull();
  });
});
