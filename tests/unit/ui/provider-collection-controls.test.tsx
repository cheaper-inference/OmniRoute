import React, { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  CollectionPagination,
  CollectionViewControls,
  CollectionLayout,
  type CollectionPageSize,
  type CollectionView,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ProviderCollectionControls";
import ConnectionRow from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow";
import type { ConnectionRowProps } from "@/app/(dashboard)/dashboard/providers/[id]/components/connectionRowTypes";
const noop = () => {};
afterEach(cleanup);
function Controls() {
  const [view, setView] = useState<CollectionView>("list"),
    [columns, setColumns] = useState(3),
    [size, setSize] = useState<CollectionPageSize>(10),
    [page, setPage] = useState(0);
  return (
    <>
      <CollectionViewControls
        view={view}
        onChange={setView}
        columns={columns}
        onColumnsChange={setColumns}
      />
      <CollectionPagination
        total={101}
        page={page}
        pageSize={size}
        onPage={setPage}
        onPageSize={setSize}
      />
      <output>
        {view}:{columns}:{size}
      </output>
    </>
  );
}
describe("Provider collection views and pagination", () => {
  it("offers list, cards and table while configuring cards independently", () => {
    render(<Controls />);
    fireEvent.click(screen.getByRole("button", { name: "Cards" }));
    expect(screen.getByRole("button", { name: "Cards" }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("combobox", { name: "Cards per row" }));
    fireEvent.click(screen.getByRole("option", { name: "4", exact: true }));
    expect(screen.getByRole("status").textContent).toBe("cards:4:10");
    fireEvent.click(screen.getByRole("button", { name: "Table", exact: true }));
    expect(screen.getByRole("status").textContent).toBe("table:4:10");
  });
  it("offers all requested sizes and collapses pagination for All", () => {
    render(<Controls />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByRole("button", { name: "Page 2" }).getAttribute("aria-current")).toBe(
      "page"
    );
    fireEvent.click(screen.getByRole("combobox", { name: "Per page" }));
    for (const value of ["10", "15", "20", "50", "100", "All"])
      expect(screen.getByRole("option", { name: value, exact: true })).toBeTruthy();
    fireEvent.click(screen.getByRole("option", { name: "All", exact: true }));
    expect(screen.getByRole("button", { name: "Next page" })).toHaveProperty("disabled", true);
    expect(screen.getByText("1–101 / 101")).toBeTruthy();
  });
  it("keeps an empty collection at zero and disables page navigation", () => {
    render(
      <CollectionPagination total={0} page={5} pageSize="all" onPage={noop} onPageSize={noop} />
    );
    expect(screen.getByText("0–0 / 0")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Previous page" })).toHaveProperty("disabled", true);
    expect(screen.getByRole("button", { name: "Next page" })).toHaveProperty("disabled", true);
  });
  it("renders semantic account table cells and retains actions and details", () => {
    const onEdit = vi.fn();
    const props = {
      connection: {
        id: "a",
        name: "Account A",
        provider: "codex",
        isActive: true,
        testStatus: "active",
      },
      isCodex: true,
      isOAuth: false,
      codexViewMode: "table",
      onRetest: noop,
      onToggleActive: noop,
      onEdit,
      onDelete: noop,
    } as ConnectionRowProps;
    render(
      <CollectionLayout
        view="table"
        columns={3}
        headers={["Account", "Status", "Quota", "Actions"]}
      >
        <ConnectionRow {...props} />
      </CollectionLayout>
    );
    expect(screen.getAllByRole("columnheader")).toHaveLength(4);
    expect(screen.getAllByRole("cell")).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(screen.getAllByRole("cell")).toHaveLength(5);
    fireEvent.click(screen.getByRole("button", { name: "Actions" }));
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledOnce();
  });
  for (const view of ["list", "cards", "table"] as const) {
    it(`renders one weekly bar for a weekly-only account in ${view} view`, () => {
      const props = {
        connection: {
          id: "weekly",
          provider: "codex",
          name: "Weekly account",
          isActive: true,
          testStatus: "active",
        },
        isCodex: true,
        isOAuth: false,
        codexViewMode: view,
        quotaCache: {
          quotas: {
            session: { used: 50, total: 100, windowSeconds: 604800, displayName: "Weekly" },
          },
        },
        onRetest: noop,
        onToggleActive: noop,
        onEdit: noop,
        onDelete: noop,
      } as ConnectionRowProps;
      render(
        <CollectionLayout
          view={view}
          columns={3}
          headers={["Account", "Status", "Quota", "Actions"]}
        >
          <ConnectionRow {...props} />
        </CollectionLayout>
      );
      expect(screen.getAllByRole("meter")).toHaveLength(1);
      expect(screen.getByRole("meter", { name: "7d" }).getAttribute("aria-valuenow")).toBe("50");
      expect(screen.queryByText("5h")).toBeNull();
    });
  }
});
