// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { chooseKitSelectValue, kitSelectValue } from "../../../helpers/kitSelect";

const { default: DataTable } = await import("@/shared/components/DataTable");
const { default: FilterPills } = await import("@/shared/components/FilterPills");
const { default: PresetSlider } = await import("@/shared/components/PresetSlider");
const { default: ColumnToggle } = await import("@/shared/components/ColumnToggle");
const { default: FilterBar } = await import("@/shared/components/FilterBar");

afterEach(() => cleanup());

const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
];
const data = [
  { id: 1, name: "openai", status: "ok" },
  { id: 2, name: "claude", status: "down" },
];

describe("DataTable family adapters", () => {
  it("DataTable renders kit table rows, marks the selected row and handles row click", () => {
    const onRowClick = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        renderCell={(r, c) => String(r[c.key])}
        onRowClick={onRowClick}
        selectedId={2}
      />
    );
    expect(screen.getByRole("table").className).toContain("ci-table");
    // Narrow tables keep their auto width (overrides the kit's 40rem floor).
    expect(screen.getByRole("table").className).toContain("min-w-0");
    expect(screen.getAllByRole("columnheader").map((h) => h.textContent)).toEqual([
      "Name",
      "Status",
    ]);
    const rows = screen.getAllByRole("row").slice(1);
    expect(rows[1].getAttribute("aria-selected")).toBe("true");
    expect(rows[1].getAttribute("data-state")).toBe("selected");
    expect(rows[0].className).toContain("cursor-pointer");
    fireEvent.click(rows[0]);
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it("DataTable shows the loading region and the empty state", () => {
    const { rerender } = render(
      <DataTable columns={columns} data={[]} renderCell={() => null} loading />
    );
    expect(screen.getByRole("status")).not.toBeNull();
    rerender(
      <DataTable columns={columns} data={[]} renderCell={() => null} emptyMessage="No rows" />
    );
    expect(screen.getByText("No rows")).not.toBeNull();
  });

  it("FilterPills are toggle buttons with aria-pressed", () => {
    const onChange = vi.fn();
    render(
      <FilterPills
        aria-label="Status"
        value="ok"
        onChange={onChange}
        options={[
          { value: "ok", label: "OK", count: 2 },
          { value: "down", label: "Down" },
        ]}
      />
    );
    const ok = screen.getByRole("button", { name: /OK/ });
    expect(ok.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: /Down/ }));
    expect(onChange).toHaveBeenCalledWith("down");
  });

  it("PresetSlider renders the kit slider with preset buttons", () => {
    const onChange = vi.fn();
    render(
      <PresetSlider
        value={50}
        onChange={onChange}
        presets={[
          { label: "Low", value: 10 },
          { label: "High", value: 90 },
        ]}
      />
    );
    expect(screen.getByRole("slider")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "High" }));
    expect(onChange).toHaveBeenCalledWith(90);
  });

  it("ColumnToggle opens a menu with a checkbox item per column", async () => {
    const onToggle = vi.fn();
    render(
      <ColumnToggle columns={columns} visible={{ name: true, status: false }} onToggle={onToggle} />
    );
    fireEvent.pointerDown(screen.getByRole("button", { name: "Toggle columns" }), {
      button: 0,
      ctrlKey: false,
    });
    fireEvent.click(screen.getByRole("button", { name: "Toggle columns" }));
    const items = await screen.findAllByRole("menuitemcheckbox");
    expect(items.map((i) => i.getAttribute("aria-checked"))).toEqual(["true", "false"]);
    fireEvent.click(items[1]);
    expect(onToggle).toHaveBeenCalledWith("status");
  });

  it("FilterBar searches, filters through selects and clears everything", () => {
    const onSearchChange = vi.fn();
    const onFilterChange = vi.fn();
    render(
      <FilterBar
        searchValue="op"
        onSearchChange={onSearchChange}
        filters={[{ key: "status", label: "Status", options: ["ok", "down"] }]}
        activeFilters={{ status: "ok" }}
        onFilterChange={onFilterChange}
      />
    );
    const search = screen.getByRole("searchbox", { name: "Search" });
    fireEvent.change(search, { target: { value: "cl" } });
    expect(onSearchChange).toHaveBeenCalledWith("cl");
    // FilterBar passes `options`, so the shared Select is the kit (Radix) Select (track C).
    const select = screen.getByRole("combobox", { name: "Status" });
    expect(kitSelectValue(select)).toBe("ok");
    chooseKitSelectValue(select, "down");
    expect(onFilterChange).toHaveBeenCalledWith("status", "down");
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(onSearchChange).toHaveBeenLastCalledWith("");
    expect(onFilterChange).toHaveBeenLastCalledWith("status", "");
  });
});
