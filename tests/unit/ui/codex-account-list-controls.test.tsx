import React, { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ConnectionsListPanel from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionsListPanel";

vi.mock("@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionRow", () => ({
  default: ({
    connection,
    codexViewMode,
  }: {
    connection: { name: string };
    codexViewMode: string;
  }) => (
    <div data-testid="account-row" data-view={codexViewMode}>
      {connection.name}
    </div>
  ),
}));
const noop = () => {};
function Harness({ filter = "all", tagged = false }: { filter?: string; tagged?: boolean }) {
  const [page, setPage] = useState(0),
    [healthFilter, setHealthFilter] = useState(filter),
    [accountSearch, setAccountSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(new Set<string>());
  const connections = Array.from({ length: 1000 }, (_, i) => ({
    id: `account-${i}`,
    name: `Account ${i}`,
    priority: i + 1,
    isActive: i % 2 === 0,
    testStatus: "active",
    providerSpecificData: tagged ? { tag: "Team" } : {},
  }));
  const base: Record<string, unknown> = {
    connections,
    providerId: "codex",
    selectedIds,
    batchUpdating: null,
    batchRetesting: false,
    batchDeleting: false,
    batchTesting: false,
    page,
    healthFilter,
    accountSearch,
    PAGE_SIZE: 10,
    connProxyMap: {},
    quotaByConnectionId: { "account-3": { bankedResetCredits: 2 } },
    quotaRefreshingIds: new Set(),
    setSelectedIds,
    setPage,
    setHealthFilter,
    setAccountSearch,
    t: (key: string) => key,
  };
  const props = new Proxy(base, {
    get: (target, key: string) => (key in target ? target[key] : noop),
  }) as unknown as React.ComponentProps<typeof ConnectionsListPanel>;
  return (
    <>
      <ConnectionsListPanel {...props} />
      <output data-testid="selection-count">{selectedIds.size}</output>
    </>
  );
}
afterEach(cleanup);
describe("Codex account list controls", () => {
  it("paginates a thousand accounts and filters across the whole list", () => {
    render(<Harness />);
    expect(screen.getAllByTestId("account-row")).toHaveLength(10);
    fireEvent.click(screen.getAllByRole("button", { name: "Next page" })[0]);
    expect(screen.getAllByTestId("account-row")[0].textContent).toBe("Account 10");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Account 999" } });
    expect(screen.getAllByTestId("account-row")).toHaveLength(1);
    expect(screen.getByTestId("account-row").textContent).toBe("Account 999");
  });
  it("renders all matching accounts only when All is explicitly selected", () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("combobox", { name: "Per page" }));
    fireEvent.click(screen.getByRole("option", { name: "All", exact: true }));
    expect(screen.getAllByTestId("account-row")).toHaveLength(1000);
    expect(screen.getByRole("button", { name: "Next page" })).toHaveProperty("disabled", true);
  });
  it("shows only accounts with known credits and separates disabled accounts", () => {
    render(<Harness filter="reset_credits" />);
    expect(screen.getAllByTestId("account-row")).toHaveLength(1);
    expect(screen.getByTestId("account-row").textContent).toBe("Account 3");
    fireEvent.click(screen.getByRole("button", { name: "Inactive" }));
    expect(screen.getAllByTestId("account-row")[0].textContent).toBe("Account 1");
  });
});

describe("Tagged account page selection", () => {
  it("selects the visible page rather than every tagged account", () => {
    render(<Harness tagged />);
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByTestId("selection-count").textContent).toBe("10");
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByTestId("selection-count").textContent).toBe("20");
  });
});
