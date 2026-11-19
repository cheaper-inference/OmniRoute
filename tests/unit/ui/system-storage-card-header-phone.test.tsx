// @vitest-environment jsdom
/**
 * Settings → General → Storage card on a 390 px phone (visual pass 2026-11-13, #19620):
 * the header was one flex row `[icon][text][badge]`, so the icon kept its own column for
 * the whole height of the description and the text was squeezed into what was left.
 *
 * The header is now a 3-column grid: icon, title and badge share the first row, and the
 * description is a full-width second row below `sm`; from `sm` up it returns to the
 * title column with the icon and badge spanning both rows (the desktop look). jsdom has
 * no layout, so this pins the grid placement classes that produce it.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import SystemStorageTab from "@/app/(dashboard)/dashboard/settings/components/SystemStorageTab";

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: async () => ({}),
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

function classes(el: Element | null | undefined): string[] {
  return (el?.getAttribute("class") || "").split(/\s+/).filter(Boolean);
}

describe("SystemStorageTab — Storage card header on phones", () => {
  it("lets the description use the full card width below sm", async () => {
    await act(async () => {
      root.render(<SystemStorageTab />);
    });
    await act(async () => {
      await Promise.resolve();
    });

    const title = Array.from(container.querySelectorAll("h3")).find(
      (h) => h.textContent === "Storage"
    );
    expect(title, "Storage card title should render").toBeTruthy();

    const header = title!.parentElement!;
    // Icon, title, badge and description are direct children of one grid.
    expect(classes(header)).toContain("grid");
    expect(header.getAttribute("class")).toMatch(/grid-cols-\[auto_minmax\(0,1fr\)_auto\]/);

    const description = Array.from(header.children).find((child) =>
      (child.textContent || "").includes("All data stored locally")
    );
    expect(description, "description block should be a direct grid child").toBeTruthy();
    // Phone: spans all three columns. sm+: back in the title column.
    expect(classes(description)).toEqual(
      expect.arrayContaining(["col-span-3", "sm:col-span-1", "sm:col-start-2"])
    );

    // The icon chip and the badge sit in the title row on phones and span both rows from sm.
    const icon = header.firstElementChild!;
    expect(icon.querySelector("svg, .oi-icon, [class*=icon]")).not.toBeNull();
    expect(classes(icon)).toContain("sm:row-span-2");
    const badge = header.querySelector("[data-slot=badge]");
    expect(badge, "driver badge should be in the header grid").toBeTruthy();
    expect(classes(badge)).toEqual(expect.arrayContaining(["col-start-3", "row-start-1"]));
  });
});
