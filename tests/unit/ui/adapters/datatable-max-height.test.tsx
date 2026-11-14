// @vitest-environment jsdom
/**
 * #19620 / kit 0.0.116 (keak-ai/cheaper-inference-ui-kit#203): the DataTable adapter used to
 * scroll rows in its own `<div style={{ maxHeight, overflow: "auto" }}>`. That wrapper never
 * took focus, so keyboard users could not scroll a tall table (WCAG 2.1.1), and it needed a
 * sticky-header patch on every header cell. The kit Table now takes `maxHeight`: the capped
 * container scrolls, pins the header and becomes a named tab stop while it overflows.
 */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

const { default: DataTable } = await import("@/shared/components/DataTable");

// jsdom does no layout: make every element report content taller than its box, so the kit
// sees the capped container as overflowing (as a browser does for a tall table).
const restore: Array<() => void> = [];
beforeAll(() => {
  for (const [prop, value] of [
    ["scrollHeight", 2000],
    ["clientHeight", 320],
  ] as const) {
    const original = Object.getOwnPropertyDescriptor(HTMLElement.prototype, prop);
    Object.defineProperty(HTMLElement.prototype, prop, { configurable: true, get: () => value });
    restore.push(() => {
      if (original) Object.defineProperty(HTMLElement.prototype, prop, original);
    });
  }
});
afterAll(() => restore.forEach((fn) => fn()));
afterEach(() => cleanup());

const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
];
const data = Array.from({ length: 40 }, (_, i) => ({ id: i, name: `row-${i}`, status: "ok" }));

describe("DataTable scrolls vertically through the kit Table maxHeight", () => {
  it("makes the capped kit container a named tab stop, with no scroll wrapper of its own", () => {
    const { container } = render(
      <DataTable
        label="Recent runs"
        columns={columns}
        data={data}
        renderCell={(r, c) => String(r[c.key])}
        maxHeight="320px"
      />
    );
    const scroller = container.querySelector<HTMLElement>("[data-slot=table-container]")!;
    expect(scroller.hasAttribute("data-capped")).toBe(true);
    expect(scroller.style.getPropertyValue("--ci-table-max-height")).toBe("320px");
    expect(scroller.className).not.toContain("overflow-visible");
    // Focusable while it overflows, and named by the adapter's label.
    expect(scroller.tabIndex).toBe(0);
    expect(screen.getByRole("region", { name: "Recent runs" })).toBe(scroller);
    // No adapter-owned scroll box around the table any more.
    expect(container.querySelector("[style*='overflow']")).toBeNull();
  });

  it("leaves pinning the header to the kit (no sticky patch on the header cells)", () => {
    render(
      <DataTable
        label="Runners"
        columns={columns}
        data={data}
        renderCell={(r, c) => String(r[c.key])}
      />
    );
    for (const head of screen.getAllByRole("columnheader")) {
      expect(head.className).not.toContain("sticky");
      expect(head.className).toContain("whitespace-nowrap");
    }
    // The default cap still applies.
    const scroller = screen.getByRole("region", { name: "Runners" });
    expect(scroller.style.getPropertyValue("--ci-table-max-height")).toBe("calc(100vh - 320px)");
  });

  it("keeps the borderless container when a Card frames the table", () => {
    const { container } = render(
      <DataTable
        label="Tasks"
        framed={false}
        columns={columns}
        data={data}
        renderCell={(r, c) => String(r[c.key])}
      />
    );
    const scroller = container.querySelector<HTMLElement>("[data-slot=table-container]")!;
    expect(scroller.hasAttribute("data-capped")).toBe(true);
    expect(scroller.className).toContain("border-0");
    expect(scroller.className).toContain("rounded-none");
  });
});
