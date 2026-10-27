// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import type { CatalogModelRow } from "../../../src/app/(dashboard)/dashboard/models/modelCatalogUtils";
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/shared/components/ProviderIcon", () => ({ default: () => <span /> }));
vi.mock("@omniroute/ui-kit/data-table-shell", () => ({
  SortableTableHead: ({ children }: { children: React.ReactNode }) => <th>{children}</th>,
  DataTableFooter: ({
    metadata,
    pagination,
  }: {
    metadata: React.ReactNode;
    pagination: React.ReactNode;
  }) => (
    <div>
      {metadata}
      {pagination}
    </div>
  ),
}));
vi.mock("@/shared/components", () => ({
  Button: ({
    children,
    size: _size,
    variant: _variant,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: string; variant?: string }) => (
    <button {...props}>{children}</button>
  ),
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  Checkbox: ({
    indeterminate: _indeterminate,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & { indeterminate?: boolean }) => (
    <input type="checkbox" {...props} />
  ),
  Input: ({
    label,
    icon: _icon,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: string }) => (
    <label>
      {label}
      <input {...props} />
    </label>
  ),
  Select: ({
    label,
    children,
    ...props
  }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) => (
    <label>
      {label}
      <select {...props}>{children}</select>
    </label>
  ),
}));
const { default: ModelCatalogTable } =
  await import("../../../src/app/(dashboard)/dashboard/models/ModelCatalogTable");
const { default: ModelCatalogFilters } =
  await import("../../../src/app/(dashboard)/dashboard/models/ModelCatalogFilters");
beforeEach(() => {
  // jsdom has no layout observer; geometry is outside these dispatch-control assertions.
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const rows: CatalogModelRow[] = [
  {
    id: "native-fixture",
    name: "Native fixture",
    providerId: "typesafe",
    provider: "TypeSafe",
    type: "decision",
    supported_endpoints: ["systemone"],
    pricing_status: "unknown",
    decision_primitives: ["choice"],
  },
  {
    id: "chat-fixture",
    name: "Chat fixture",
    providerId: "fixture",
    provider: "Fixture",
    type: "chat",
    supported_endpoints: ["chat"],
    context_length: 1234,
  },
];
const labels = {
  provider: "provider",
  model: "model",
  type: "type",
  capabilities: "capabilities",
  context: "context",
  output: "output",
  flags: "flags",
  custom: "custom",
  free: "free",
};

it("decision rows retain unknown metadata and cannot launch generic chat health tests", () => {
  const onTest = vi.fn();
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  render(
    <ModelCatalogTable
      rows={rows}
      sortField="provider"
      sortDirection="asc"
      onSort={vi.fn()}
      page={1}
      pageCount={1}
      startIndex={0}
      totalCount={2}
      loading={false}
      error={false}
      onPrevious={vi.fn()}
      onNext={vi.fn()}
      labels={labels}
      onTestModel={onTest}
      onToggleSelect={vi.fn()}
      onToggleSelectAll={vi.fn()}
    />
  );
  const nativeRow = screen.getByText("Native fixture").closest("tr")!;
  expect(within(nativeRow).getByText("decisionType")).toBeTruthy();
  expect(within(nativeRow).getByText("decisionAccessUnverified")).toBeTruthy();
  expect(within(nativeRow).getByText("decisionPricingUnknown")).toBeTruthy();
  expect(within(nativeRow).queryByRole("checkbox")).toBeNull();
  const nativeTest = within(nativeRow).getByRole("button", { name: "test" }) as HTMLButtonElement;
  expect(nativeTest.disabled).toBe(true);
  fireEvent.click(nativeTest);
  expect(onTest).not.toHaveBeenCalled();
  const chatRow = screen.getByText("Chat fixture").closest("tr")!;
  fireEvent.click(within(chatRow).getByRole("button", { name: "test" }));
  expect(onTest).toHaveBeenCalledExactlyOnceWith("fixture", "chat-fixture");
  expect(fetchMock).not.toHaveBeenCalled();
});

it("the explicit decision filter remains available before any native model is loaded", () => {
  const onChange = vi.fn();
  render(
    <ModelCatalogFilters
      filters={{ query: "", providerId: "all", type: "all" }}
      onChange={onChange}
      onClear={vi.fn()}
      providerOptions={[]}
      typeOptions={["chat"]}
      subtypeOptions={[]}
      capabilityOptions={[]}
      hasActiveFilters={false}
      totalCount={0}
    />
  );
  const type = screen.getByLabelText("type");
  expect(within(type).getByRole("option", { name: "decisionType" })).toBeTruthy();
  fireEvent.change(type, { target: { value: "decision" } });
  expect(onChange).toHaveBeenCalledWith({ type: "decision" });
});
