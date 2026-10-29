// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { DataTableRow } from "../../../src/shared/components/DataTable";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: DataTable } = await import("../../../src/shared/components/DataTable");

const cleanups: Array<() => void> = [];
const columns = [{ key: "name", label: "Name" }];
const data: DataTableRow[] = [{ id: "row-1", name: "Alpha" }];

function renderTable(props: { loading?: boolean; rows?: DataTableRow[] } = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <DataTable
        columns={columns}
        data={props.rows ?? data}
        loading={props.loading}
        renderCell={(row) => String(row.name)}
      />
    );
  });
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
});

describe("DataTable loading state accessibility", () => {
  it("marks the loading container as a busy status region", () => {
    const container = renderTable({ loading: true });
    const status = container.querySelector<HTMLDivElement>('[role="status"]')!;

    expect(status).not.toBeNull();
    // KEA-7886: the kit BrandLoader is the status region (role="status" is an implicit
    // aria-live="polite" region). It must carry the loading label and stay exposed to
    // assistive technology even though the retained rows beside it are aria-hidden.
    expect(status.getAttribute("aria-label")).toBe("loading");
    expect(status.closest('[aria-hidden="true"]')).toBeNull();
    expect(status.getAttribute("aria-busy")).toBe("true");
  });

  it("hides the decorative spinner glyph from assistive technology", () => {
    const container = renderTable({ loading: true });
    // KEA-7886: the decorative glyph is the kit loader artwork (an SVG), not the ⏳ emoji.
    const glyph = container.querySelector<SVGElement>('[role="status"] svg')!;

    expect(glyph).not.toBeNull();
    expect(glyph.getAttribute("aria-hidden")).toBe("true");
  });

  it("leaves only the loading label as readable text in the status region", () => {
    const container = renderTable({ loading: true });
    const status = container.querySelector<HTMLDivElement>('[role="status"]')!;
    const readable = [...status.childNodes]
      .filter(
        (node) =>
          !(node instanceof Element) ||
          (node.getAttribute("aria-hidden") !== "true" && node.tagName !== "STYLE")
      )
      .map((node) => node.textContent ?? "")
      .join("")
      .trim();

    expect(readable).toBe("loading");
    expect(readable).not.toContain("⏳");
  });

  it("keeps the spinner animation and layout untouched", () => {
    const container = renderTable({ loading: true });
    const status = container.querySelector<HTMLDivElement>('[role="status"]')!;

    // KEA-7886: layout and animation now belong to the kit — a centred overlay over the
    // table region holding the animated BrandLoader (styled by ci-ui.css, not inline styles).
    const overlay = container.querySelector('[data-slot="table-loading-overlay"]')!;
    expect(overlay).not.toBeNull();
    expect(overlay.className).toContain("ci-table-loading-overlay");
    expect(overlay.contains(status)).toBe(true);
    expect(status.className).toContain("ci-brand-loader");
    expect(status.getAttribute("data-phase")).toBe("loading");
  });

  it("renders no table while loading", () => {
    const container = renderTable({ loading: true });

    // KEA-7886: the kit keeps the previous rows under the overlay (scroll position survives),
    // but they are hidden from assistive technology and not interactive while loading.
    const content = container.querySelector<HTMLElement>('[data-slot="table-loading-content"]')!;
    expect(content.getAttribute("aria-hidden")).toBe("true");
    expect(content.hasAttribute("inert")).toBe(true);
    expect(
      container.querySelector('table:not([data-slot="table-loading-content"] table)')
    ).toBeNull();
  });

  it("does not expose a status region once rows have rendered", () => {
    const container = renderTable();

    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector('[aria-busy="true"]')).toBeNull();
    expect(container.querySelector("tbody tr")).not.toBeNull();
  });

  it("does not expose a status region for the empty state", () => {
    const container = renderTable({ rows: [] });

    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector('[aria-busy="true"]')).toBeNull();
    expect(container.textContent).toContain("noData");
  });

  it("prefers the loading state over the empty state", () => {
    const container = renderTable({ loading: true, rows: [] });

    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).toContain("loading");
    expect(container.textContent).not.toContain("noData");
  });
});
