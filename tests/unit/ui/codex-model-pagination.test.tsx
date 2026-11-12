// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProviderModelsSection, {
  type ProviderModelsSectionProps,
} from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/ProviderModelsSection";

vi.mock("../../../src/app/(dashboard)/dashboard/providers/[id]/components/ModelRow", () => ({
  default: ({ model }: { model: { id: string } }) => <div data-model-row>{model.id}</div>,
  ModelVisibilityToolbar: () => null,
}));

const noop = () => {};
function fixture(): ProviderModelsSectionProps {
  const models = Array.from({ length: 1000 }, (_, i) => ({
    id: `model-${String(i).padStart(4, "0")}`,
  }));
  return {
    providerId: "codex",
    providerAlias: "cx",
    providerStorageAlias: "codex",
    providerDisplayAlias: "cx",
    providerInfo: { name: "Codex" },
    isCcCompatible: false,
    isAnthropicCompatible: false,
    isAnthropicProtocolCompatible: false,
    isManagedAvailableModelsProvider: false,
    compatibleSupportsModelImport: false,
    allowModelImport: false,
    models,
    modelMeta: { customModels: [], modelCompatOverrides: [] },
    modelAliases: {},
    syncedAvailableModels: models,
    compatibleFallbackModels: [],
    copied: null,
    onCopy: noop,
    fetchProviderModelMeta: noop,
    connections: [],
    selectedConnection: null,
    canImportModels: false,
    importingModels: false,
    handleImportModels: noop,
    isAutoSyncEnabled: false,
    togglingAutoSync: false,
    handleToggleAutoSync: noop,
    isAutoFetchModelsEnabled: false,
    togglingAutoFetchModels: false,
    handleToggleAutoFetchModels: noop,
    handleCompatibleImportWithProgress: noop,
    compatSavingModelId: null,
    togglingModelId: null,
    bulkVisibilityAction: null,
    clearingModels: false,
    modelFilter: "",
    testingModelId: null,
    modelTestStatus: {},
    onModelTestStatusChange: noop,
    testingAll: false,
    testProgress: null,
    autoHideFailed: false,
    visibilityFilter: "all",
    providerAliasEntries: [],
    setModelFilter: noop,
    setAutoHideFailed: noop,
    setVisibilityFilter: noop,
    saveModelCompatFlags: noop,
    handleToggleModelHidden: noop,
    handleBulkToggleModelHidden: noop,
    handleClearAllModels: noop,
    onTestModel: noop,
    handleTestAll: noop,
    effectiveModelNormalize: () => false,
    effectiveModelPreserveDeveloper: () => false,
    effectiveModelHidden: () => false,
    getUpstreamHeadersRecordForModel: () => ({}),
    t: (key: string) => key,
  } as ProviderModelsSectionProps;
}

let el: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  el = document.createElement("div");
  document.body.appendChild(el);
  root = createRoot(el);
});
afterEach(() => {
  act(() => root.unmount());
  el.remove();
});

describe("Codex catalog pagination with 1,000 models", () => {
  it("mounts 25 model rows and navigates to the next set", () => {
    act(() => root.render(<ProviderModelsSection {...fixture()} />));
    expect(el.querySelectorAll("[data-model-row]")).toHaveLength(25);
    expect(el.querySelector("[data-model-row]")?.textContent).toBe("model-0000");
    const next = el.querySelector<HTMLButtonElement>('[aria-label="Next page"]')!;
    expect(next).not.toBeNull();
    act(() => next.click());
    expect(el.querySelectorAll("[data-model-row]")).toHaveLength(25);
    expect(el.querySelector("[data-model-row]")?.textContent).toBe("model-0025");
  });

  it("resets pagination when a search narrows the results", () => {
    const props = fixture();
    act(() => root.render(<ProviderModelsSection {...props} />));
    act(() => el.querySelector<HTMLButtonElement>('[aria-label="Next page"]')!.click());
    act(() => root.render(<ProviderModelsSection {...props} modelFilter="model-0999" />));
    expect(el.querySelectorAll("[data-model-row]")).toHaveLength(1);
    expect(el.querySelector("[data-model-row]")?.textContent).toBe("model-0999");
    expect(el.querySelector<HTMLButtonElement>('[aria-label="Previous page"]')?.disabled).toBe(
      true
    );
  });
});

describe("Codex catalog page size", () => {
  it("allows All without changing the default bounded page", () => {
    const mounted = render(<ProviderModelsSection {...fixture()} />);
    expect(mounted.container.querySelectorAll("[data-model-row]")).toHaveLength(25);
    fireEvent.click(screen.getByRole("combobox", { name: "Per page" }));
    fireEvent.click(screen.getByRole("option", { name: "All", exact: true }));
    expect(mounted.container.querySelectorAll("[data-model-row]")).toHaveLength(1000);
    expect(screen.getByRole("button", { name: "Next page" })).toHaveProperty("disabled", true);
    cleanup();
  });
});
