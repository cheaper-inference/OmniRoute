// @vitest-environment jsdom
//
// Catalog models of native providers get the same capability controls as the
// compatible/passthrough rows (CodeRabbit #19947): the vision-capable badge +
// override checkbox and the max output token editor. Saves go through
// PUT /api/provider-models under the CANONICAL provider id — the key the PUT
// guard validates — never under the storage alias.

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../components/ModelCompatPopover", () => ({ default: () => null }));

const notifyError = vi.fn();
const notifySuccess = vi.fn();
vi.mock("@/store/notificationStore", () => ({
  useNotificationStore: () => ({ error: notifyError, success: notifySuccess }),
}));

import ProviderModelsSection, {
  type ProviderModelsSectionProps,
} from "../components/ProviderModelsSection";

const t = ((key: string) => key) as ProviderModelsSectionProps["t"];
const PROVIDER_ID = "kilo-gateway";
const STORAGE_ALIAS = "kg";
const MODEL_ID = "some-model";

function buildProps(overrides: Partial<ProviderModelsSectionProps> = {}) {
  return {
    providerId: PROVIDER_ID,
    providerAlias: STORAGE_ALIAS,
    providerStorageAlias: STORAGE_ALIAS,
    providerDisplayAlias: STORAGE_ALIAS,
    providerInfo: { name: "Kilo Gateway" },
    isCcCompatible: false,
    isAnthropicCompatible: false,
    isAnthropicProtocolCompatible: false,
    isManagedAvailableModelsProvider: false,
    compatibleSupportsModelImport: false,
    allowModelImport: true,
    models: [{ id: MODEL_ID, name: "Some Model", source: "system" }],
    modelMeta: { customModels: [], modelCompatOverrides: [] },
    modelAliases: {},
    syncedAvailableModels: [],
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
    ...overrides,
  } as ProviderModelsSectionProps;
}

type FetchCall = { url: string; init?: RequestInit };
let calls: FetchCall[] = [];
let visionOverrides: Array<{ id: string; supportsVision: boolean }> = [];
let outputOverrides: Array<{ modelId: string; maxOutputTokenOverride: number }> = [];

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

async function render(props: ProviderModelsSectionProps) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<ProviderModelsSection {...props} />);
  });
  roots.push({ root, el });
  return el;
}

const setInputValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

const putBodies = () =>
  calls
    .filter((c) => c.init?.method === "PUT")
    .map((c) => JSON.parse(String(c.init?.body)) as Record<string, unknown>);

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  calls = [];
  visionOverrides = [];
  outputOverrides = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      calls.push({ url: String(url), init });
      if (init?.method === "PUT") {
        const body = JSON.parse(String(init.body));
        if ("supportsVision" in body) {
          visionOverrides =
            body.supportsVision == null
              ? []
              : [{ id: body.modelId, supportsVision: Boolean(body.supportsVision) }];
        }
        if ("maxOutputTokenOverride" in body) {
          outputOverrides =
            body.maxOutputTokenOverride == null
              ? []
              : [
                  {
                    modelId: body.modelId,
                    maxOutputTokenOverride: Number(body.maxOutputTokenOverride),
                  },
                ];
        }
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }
      return new Response(
        JSON.stringify({
          models: [],
          modelCompatOverrides: visionOverrides,
          modelOutputOverrides: outputOverrides,
        }),
        { status: 200 }
      );
    })
  );
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ProviderModelsSection catalog capability controls", () => {
  it("shows the vision badge from the override metadata and mounts the checkbox", async () => {
    visionOverrides = [{ id: MODEL_ID, supportsVision: true }];
    const el = await render(buildProps());
    const get = calls.find((c) => !c.init?.method || c.init.method === "GET");
    expect(get?.url).toBe(`/api/provider-models?provider=${PROVIDER_ID}`);
    expect(el.textContent).toContain("visionCapableLabel");
    // The override checkbox is the editing affordance (kit Checkbox input).
    expect(el.querySelector('input[aria-label="visionCapableLabel"]')).not.toBeNull();
  });

  it("toggling the vision checkbox PUTs supportsVision under the canonical provider id", async () => {
    const el = await render(buildProps());
    const checkbox = el.querySelector('input[aria-label="visionCapableLabel"]') as HTMLInputElement;
    expect(checkbox).not.toBeNull();
    await act(async () => {
      checkbox.click();
    });
    const body = putBodies().find((b) => "supportsVision" in b);
    expect(body).toEqual({ provider: PROVIDER_ID, modelId: MODEL_ID, supportsVision: true });
    // The confirmed write is reflected after the refresh read.
    expect(el.textContent).toContain("visionCapableLabel");
  });

  it("shows the persisted max output token override and saves an edited value", async () => {
    outputOverrides = [{ modelId: MODEL_ID, maxOutputTokenOverride: 4096 }];
    const el = await render(buildProps());
    // Value badge from GET modelOutputOverrides.
    expect(el.textContent).toContain("4,096");
    const edit = [...el.querySelectorAll("button")].find(
      (b) => b.getAttribute("title") === "maxOutputTokenOverrideLabel"
    );
    expect(edit).toBeDefined();
    act(() => edit!.click());
    const input = el.querySelector(
      'input[aria-label="maxOutputTokenOverrideLabel"]'
    ) as HTMLInputElement;
    await act(async () => setInputValue(input, "8192"));
    await act(async () => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    const body = putBodies().find((b) => "maxOutputTokenOverride" in b);
    expect(body).toEqual({
      provider: PROVIDER_ID,
      modelId: MODEL_ID,
      maxOutputTokenOverride: 8192,
    });
    // Refreshed from the server after the save.
    expect(el.textContent).toContain("8,192");
    expect(notifySuccess).toHaveBeenCalled();
  });

  it("renders a clean row without the capability badges when no overrides exist", async () => {
    const el = await render(buildProps());
    // No persisted vision verdict -> no badge (the checkbox stays as the opt-in affordance).
    expect(el.querySelectorAll('input[aria-label="visionCapableLabel"]')).toHaveLength(1);
    expect(el.textContent).not.toContain("4,096");
    expect(
      [...el.querySelectorAll("button")].some(
        (b) => b.getAttribute("title") === "maxOutputTokenOverrideLabel"
      )
    ).toBe(true);
    expect(putBodies()).toEqual([]);
  });
});
