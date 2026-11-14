// @vitest-environment jsdom
/**
 * #19620 "DataTable inside a Card (double frame)". The kit `DataTableShell` is itself the
 * table frame (`.ci-data-table__frame`: border + radius), and inside it the kit zeroes the
 * `Table` container border so there is one frame. A `Card` around it drew a second one.
 *
 * `framed={false}` follows the rule already recorded for analytics/usage (#19620 "kept on
 * purpose": the kit `Table` in a `Card`, no shell): the card is the frame, so the adapter
 * renders the kit loading region and a borderless table, without the shell.
 */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const { default: DataTable } = await import("@/shared/components/DataTable");
const { default: Card } = await import("@/shared/components/Card");

afterEach(() => cleanup());

const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
];
const data = [
  { id: 1, name: "openai", status: "ok" },
  { id: 2, name: "claude", status: "down" },
];

describe("DataTable framed={false} inside a Card", () => {
  it("draws no frame of its own: no shell, no frame element, borderless table container", () => {
    const { container } = render(
      <Card title="Runners">
        <DataTable
          columns={columns}
          data={data}
          renderCell={(r, c) => String(r[c.key])}
          framed={false}
        />
      </Card>
    );
    expect(container.querySelector("[data-slot=data-table-shell]")).toBeNull();
    expect(container.querySelector(".ci-data-table__frame")).toBeNull();
    const tableContainer = container.querySelector("[data-slot=table-container]")!;
    expect(tableContainer.className).toContain("border-0");
    expect(tableContainer.className).toContain("rounded-none");
    // Rows and headers still render.
    expect(screen.getAllByRole("columnheader").map((h) => h.textContent)).toEqual([
      "Name",
      "Status",
    ]);
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

  it("keeps the kit loading overlay and the empty state", () => {
    const { container, rerender } = render(
      <DataTable columns={columns} data={[]} renderCell={() => null} loading framed={false} />
    );
    expect(container.querySelector("[data-slot=table-loading-region]")).not.toBeNull();
    expect(screen.getByRole("status")).not.toBeNull();
    rerender(
      <DataTable
        columns={columns}
        data={[]}
        renderCell={() => null}
        emptyMessage="No rows"
        framed={false}
      />
    );
    expect(screen.getByText("No rows")).not.toBeNull();
  });

  it("still renders the shell frame by default (standalone tables keep their frame)", () => {
    const { container } = render(
      <DataTable columns={columns} data={data} renderCell={(r, c) => String(r[c.key])} />
    );
    expect(container.querySelector("[data-slot=data-table-shell]")).not.toBeNull();
    expect(container.querySelector(".ci-data-table__frame")).not.toBeNull();
  });
});
