// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/shared/components/Icon", () => ({ default: () => null }));
vi.mock("@/shared/components", () => ({
  Button: ({
    children,
    size: _size,
    variant: _variant,
    icon: _icon,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: string;
    variant?: string;
    icon?: string;
  }) => <button {...props}>{children}</button>,
  Select: ({
    children,
    label,
    ...props
  }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) => (
    <label>
      {label}
      <select {...props}>{children}</select>
    </label>
  ),
  ActionBar: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  AutoGrid: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));
vi.mock("../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow", () => ({
  default: () => null,
  ModelVisibilityToolbar: () => null,
}));
vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/PassthroughModelsSection",
  () => ({ default: () => null })
);
vi.mock(
  "../../../src/app/(dashboard)/dashboard/providers/[id]/components/CompatibleModelsSection",
  () => ({ default: () => null })
);
const { default: ProviderModelsSection } =
  await import("../../../src/app/(dashboard)/dashboard/providers/[id]/components/ProviderModelsSection");
import type { ProviderModelsSectionProps } from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ProviderModelsSection";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
function props(connections: unknown[]): ProviderModelsSectionProps {
  return {
    providerId: "typesafe",
    providerAlias: "typesafe",
    providerStorageAlias: "typesafe",
    providerDisplayAlias: "typesafe",
    providerInfo: { name: "TypeSafe" },
    isCcCompatible: false,
    isAnthropicCompatible: false,
    isAnthropicProtocolCompatible: false,
    isManagedAvailableModelsProvider: false,
    compatibleSupportsModelImport: false,
    allowModelImport: true,
    models: [],
    modelMeta: { customModels: [] },
    modelAliases: {},
    syncedAvailableModels: [],
    compatibleFallbackModels: [],
    copied: null,
    onCopy: vi.fn(),
    onSetAlias: vi.fn(),
    onDeleteAlias: vi.fn(),
    fetchProviderModelMeta: vi.fn(),
    connections,
    selectedConnection: null,
    canImportModels: false,
    importingModels: false,
    handleImportModels: vi.fn(),
    isAutoSyncEnabled: false,
    togglingAutoSync: false,
    handleToggleAutoSync: vi.fn(),
    isAutoFetchModelsEnabled: false,
    togglingAutoFetchModels: false,
    handleToggleAutoFetchModels: vi.fn(),
    handleCompatibleImportWithProgress: vi.fn(),
    compatSavingModelId: null,
    togglingModelId: null,
    bulkVisibilityAction: null,
    clearingModels: false,
    modelFilter: "",
    testingModelId: null,
    modelTestStatus: {},
    onModelTestStatusChange: vi.fn(),
    testingAll: false,
    testProgress: null,
    autoHideFailed: false,
    visibilityFilter: "all",
    providerAliasEntries: [],
    setModelFilter: vi.fn(),
    setAutoHideFailed: vi.fn(),
    setVisibilityFilter: vi.fn(),
    saveModelCompatFlags: vi.fn(),
    handleToggleModelHidden: vi.fn(),
    handleBulkToggleModelHidden: vi.fn(),
    handleClearAllModels: vi.fn(),
    onTestModel: vi.fn(),
    handleTestAll: vi.fn(),
    effectiveModelNormalize: () => false,
    effectiveModelPreserveDeveloper: () => false,
    effectiveModelHidden: () => false,
    getUpstreamHeadersRecordForModel: () => ({}),
    t: (key: string) => key,
  };
}
const a = {
  id: "active-a",
  name: "Account A",
  provider: "typesafe",
  isActive: true,
  apiKey: "synthetic-never-display-provider-key",
};
const b = { id: "active-b", name: "Account B", provider: "typesafe", isActive: true };
const pickerName = "Select an active connection to discover decision models";

it("direct provider page discovers and imports its sole active connection without opening Edit", async () => {
  const fetchMock = vi.fn().mockImplementation(async () =>
    Response.json({
      models: [{ id: "jev-fixture", modelType: "decision", supportedEndpoints: ["systemone"] }],
    })
  );
  vi.stubGlobal("fetch", fetchMock);
  const input = props([a]);
  render(<ProviderModelsSection {...input} />);
  expect(fetchMock).not.toHaveBeenCalled();
  const discover = screen.getByRole("button", {
    name: "Discover decision models",
  }) as HTMLButtonElement;
  expect(discover.disabled).toBe(false);
  fireEvent.click(discover);
  await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
  expect(fetchMock.mock.calls[0][0]).toBe("/api/providers/active-a/models?kind=decision");
  await screen.findAllByText("jev-fixture");
  fireEvent.click(screen.getByRole("button", { name: "Import decision models" }));
  await waitFor(() => expect(input.fetchProviderModelMeta).toHaveBeenCalledOnce());
  expect(fetchMock.mock.calls[1][0]).toBe("/api/providers/active-a/sync-models?kind=decision");
  expect(fetchMock.mock.calls[1][1].method).toBe("POST");
  expect(input.selectedConnection).toBeNull();
  expect(document.body.textContent).not.toContain(a.apiKey);
});

it("multiple active accounts require an independent explicit choice and ignore modal edit state", async () => {
  const fetchMock = vi.fn().mockImplementation(async () => Response.json({ models: [] }));
  vi.stubGlobal("fetch", fetchMock);
  const input = props([
    a,
    b,
    { ...a, id: "disabled", isActive: false },
    { ...a, id: "foreign", provider: "openrouter" },
    { id: "unknown", provider: "typesafe" },
  ]);
  const { rerender } = render(<ProviderModelsSection {...input} />);
  const discover = screen.getByRole("button", {
    name: "Discover decision models",
  }) as HTMLButtonElement;
  expect(discover.disabled).toBe(true);
  const picker = screen.getByRole("combobox", { name: pickerName }) as HTMLSelectElement;
  expect([...picker.options].map((row) => row.value)).toEqual(["", a.id, b.id]);
  fireEvent.change(picker, { target: { value: b.id } });
  expect(fetchMock).not.toHaveBeenCalled();
  rerender(<ProviderModelsSection {...input} selectedConnection={a} />);
  expect((screen.getByRole("combobox", { name: pickerName }) as HTMLSelectElement).value).toBe(
    b.id
  );
  fireEvent.click(screen.getByRole("button", { name: "Discover decision models" }));
  await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
  expect(fetchMock.mock.calls[0][0]).toBe("/api/providers/active-b/models?kind=decision");
});

it("changing the native account aborts and ignores an old discovery without dispatching again", async () => {
  let finish!: () => void;
  let signal!: AbortSignal;
  const fetchMock = vi.fn((_url, init: RequestInit) => {
    signal = init.signal as AbortSignal;
    return new Promise<Response>((resolve) => {
      finish = () => resolve(Response.json({ models: [{ id: "late-account-a" }] }));
    });
  });
  vi.stubGlobal("fetch", fetchMock);
  render(<ProviderModelsSection {...props([a, b])} />);
  fireEvent.change(screen.getByRole("combobox", { name: pickerName }), { target: { value: a.id } });
  fireEvent.click(screen.getByRole("button", { name: "Discover decision models" }));
  fireEvent.change(screen.getByRole("combobox", { name: pickerName }), { target: { value: b.id } });
  expect(signal.aborted).toBe(true);
  await act(async () => finish());
  expect(screen.queryByText("late-account-a")).toBeNull();
  expect(fetchMock).toHaveBeenCalledOnce();
});

it.each([
  ["disabled", { ...a, isActive: false }],
  ["unknown activation", { id: a.id, provider: a.provider }],
  ["another provider", { ...a, provider: "openrouter" }],
])("a %s connection cannot be enabled by unrelated modal state", (_label, connection) => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  render(<ProviderModelsSection {...props([connection])} selectedConnection={a} />);
  for (const name of ["Discover decision models", "Import decision models"])
    expect((screen.getByRole("button", { name }) as HTMLButtonElement).disabled).toBe(true);
  expect(fetchMock).not.toHaveBeenCalled();
});

it.each(["disabled", "deleted", "foreign"])(
  "revoking a selected account as %s aborts its pending discovery without switching requests",
  async (change) => {
    let finish!: () => void;
    let signal!: AbortSignal;
    const fetchMock = vi.fn((_url, init: RequestInit) => {
      signal = init.signal as AbortSignal;
      return new Promise<Response>((resolve) => {
        finish = () => resolve(Response.json({ models: [{ id: "revoked-account-result" }] }));
      });
    });
    vi.stubGlobal("fetch", fetchMock);
    const input = props([a, b]);
    const { rerender } = render(<ProviderModelsSection {...input} />);
    fireEvent.change(screen.getByRole("combobox", { name: pickerName }), {
      target: { value: b.id },
    });
    fireEvent.click(screen.getByRole("button", { name: "Discover decision models" }));
    const connections =
      change === "deleted"
        ? [a]
        : [a, change === "disabled" ? { ...b, isActive: false } : { ...b, provider: "openrouter" }];
    rerender(<ProviderModelsSection {...input} connections={connections} selectedConnection={b} />);
    expect(signal.aborted).toBe(true);
    await act(async () => finish());
    expect(screen.queryByText("revoked-account-result")).toBeNull();
    expect((screen.getByRole("combobox", { name: pickerName }) as HTMLSelectElement).value).toBe(
      a.id
    );
    expect(fetchMock).toHaveBeenCalledOnce();
  }
);
