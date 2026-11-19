// @vitest-environment jsdom
//
// The Compare button opens the model-intelligence panel in the grid's place: the panel renders
// in the page flow (not as a hand-positioned overlay) and the model grid stays mounted but hidden
// until the panel is closed.

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const MODEL_ID = "some-model";

vi.mock("../components/ModelRow", () => ({
  default: () => <div data-testid="model-row" />,
  ModelVisibilityToolbar: (props: { onCompare?: () => void; compareDisabled?: boolean }) => (
    <button
      type="button"
      data-testid="compare"
      disabled={props.compareDisabled}
      onClick={props.onCompare}
    />
  ),
}));

vi.mock("../components/ModelIntelligencePanel", () => ({
  default: (props: { providerId: string; providerName: string; onClose: () => void }) => (
    <div data-testid="intelligence-panel" data-provider={props.providerId}>
      {props.providerName}
      <button type="button" data-testid="close-panel" onClick={props.onClose} />
    </div>
  ),
}));

import ProviderModelsSection, {
  type ProviderModelsSectionProps,
} from "../components/ProviderModelsSection";

const t = ((key: string) => key) as ProviderModelsSectionProps["t"];

function buildProps(): ProviderModelsSectionProps {
  return {
    providerId: "openai",
    providerAlias: "openai",
    providerStorageAlias: "openai",
    providerDisplayAlias: "openai",
    providerInfo: { name: "OpenAI" },
    isCcCompatible: false,
    isAnthropicCompatible: false,
    isAnthropicProtocolCompatible: false,
    isManagedAvailableModelsProvider: false,
    compatibleSupportsModelImport: false,
    allowModelImport: false,
    models: [{ id: MODEL_ID }],
    modelMeta: { customModels: [], modelCompatOverrides: [] },
    modelAliases: {},
    syncedAvailableModels: [{ id: MODEL_ID }],
    compatibleFallbackModels: [],
    copied: null,
    onCopy: vi.fn(),
    onSetAlias: vi.fn().mockResolvedValue(undefined),
    onDeleteAlias: vi.fn().mockResolvedValue(undefined),
    fetchProviderModelMeta: vi.fn().mockResolvedValue(undefined),
    connections: [],
    selectedConnection: null,
    canImportModels: false,
    importingModels: false,
    handleImportModels: vi.fn().mockResolvedValue(undefined),
    isAutoSyncEnabled: false,
    togglingAutoSync: false,
    handleToggleAutoSync: vi.fn().mockResolvedValue(undefined),
    isAutoFetchModelsEnabled: false,
    togglingAutoFetchModels: false,
    handleToggleAutoFetchModels: vi.fn().mockResolvedValue(undefined),
    handleCompatibleImportWithProgress: vi.fn().mockResolvedValue(undefined),
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
    saveModelCompatFlags: vi.fn().mockResolvedValue(undefined),
    handleToggleModelHidden: vi.fn().mockResolvedValue(undefined),
    handleBulkToggleModelHidden: vi.fn().mockResolvedValue(undefined),
    handleClearAllModels: vi.fn().mockResolvedValue(undefined),
    onTestModel: vi.fn().mockResolvedValue(undefined),
    handleTestAll: vi.fn().mockResolvedValue(undefined),
    effectiveModelNormalize: () => false,
    effectiveModelPreserveDeveloper: () => false,
    effectiveModelHidden: () => false,
    getUpstreamHeadersRecordForModel: () => ({}),
    t,
  } as ProviderModelsSectionProps;
}

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: ProviderModelsSectionProps) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ProviderModelsSection {...props} />);
  });
  roots.push({ root, el });
}

function gridWrapper(): HTMLElement | null {
  const row = document.querySelector('[data-testid="model-row"]');
  // ModelRow → AutoGrid → wrapper that is hidden while the panel is open.
  return row?.parentElement?.parentElement ?? null;
}

function click(testId: string) {
  const el = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null;
  expect(el).not.toBeNull();
  act(() => el?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.clearAllMocks();
});

describe("ProviderModelsSection intelligence panel", () => {
  it("shows the panel in the grid's place and restores the grid on close", () => {
    render(buildProps());

    expect(document.querySelector('[data-testid="intelligence-panel"]')).toBeNull();
    expect(gridWrapper()?.hidden).toBe(false);

    click("compare");
    const panel = document.querySelector('[data-testid="intelligence-panel"]');
    expect(panel?.getAttribute("data-provider")).toBe("openai");
    expect(panel?.textContent).toContain("OpenAI");
    // The grid stays mounted (per-row state survives) but is hidden while the panel is open.
    expect(document.querySelector('[data-testid="model-row"]')).not.toBeNull();
    expect(gridWrapper()?.hidden).toBe(true);

    click("close-panel");
    expect(document.querySelector('[data-testid="intelligence-panel"]')).toBeNull();
    expect(gridWrapper()?.hidden).toBe(false);
  });
});
