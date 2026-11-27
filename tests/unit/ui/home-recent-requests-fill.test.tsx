// @vitest-environment jsdom
// Kit #285 (table-fill-height): the home "Recent requests" card has a fixed height and its rows
// scroll inside it. The scroll used to live on a hand-made `overflow-y-auto` wrapper with a
// hand-pinned header; the kit Table now fills the card (`fill`), so the kit container is the
// scroll box (a named tab stop while it overflows) and pins the header itself.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

const { default: HomeRecentRequests } =
  await import("../../../src/app/(dashboard)/home/HomeRecentRequests");

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      Response.json([
        {
          id: "r1",
          timestamp: new Date().toISOString(),
          status: 200,
          model: "gpt-fill",
          tokens: { in: 1200, out: 300 },
        },
      ])
    )
  );
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

async function render() {
  await act(async () => {
    root.render(<HomeRecentRequests />);
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  for (let attempt = 0; attempt < 50 && !container.querySelector("tbody tr"); attempt += 1) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
}

describe("HomeRecentRequests table", () => {
  it("fills the card with the kit scroll container instead of a hand-made scroll wrapper", async () => {
    await render();
    const tableContainer = container.querySelector<HTMLElement>('[data-slot="table-container"]')!;
    expect(tableContainer.hasAttribute("data-fill")).toBe(true);
    expect(tableContainer.hasAttribute("data-capped")).toBe(true);
    expect(tableContainer.getAttribute("data-variant")).toBe("plain");
    expect(tableContainer.className).not.toMatch(/overflow-visible|rounded-none|border-0/);

    // The parent is the flex item that gives the table its height.
    const parent = tableContainer.parentElement!;
    expect(parent.className).toMatch(/\bflex-1\b/);
    expect(parent.className).toMatch(/\bmin-h-0\b/);
    expect(container.querySelector(".overflow-y-auto")).toBeNull();

    // The kit pins the header of a filled table; no hand-made sticky header.
    expect(container.querySelector("thead")!.className).not.toMatch(/sticky/);
  });

  it("marks the two number columns as numeric instead of right-aligning them by class", async () => {
    await render();
    const heads = Array.from(container.querySelectorAll("thead th"));
    expect(heads.map((th) => th.classList.contains("ci-table__head--numeric"))).toEqual([
      false,
      false,
      true,
      true,
    ]);
    const cells = Array.from(container.querySelectorAll("tbody tr:first-child td"));
    expect(cells.map((td) => td.classList.contains("ci-table__cell--numeric"))).toEqual([
      false,
      false,
      true,
      true,
    ]);
    expect(container.querySelector(".text-right")).toBeNull();
  });
});
