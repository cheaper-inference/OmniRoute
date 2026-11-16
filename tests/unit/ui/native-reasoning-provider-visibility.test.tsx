// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { test, expect, vi, afterEach } from "vitest";
import ProviderModelsSection, {
  type ProviderModelsSectionProps,
} from "@/app/(dashboard)/dashboard/providers/[id]/components/ProviderModelsSection";
import { withNativeReasoningFamilies } from "@omniroute/open-sse/services/nativeReasoningFamilies";
vi.mock("@/shared/components", async () => ({
  ...(await import("../../helpers/sharedComponentStubs")).formStubs,
  ActionBar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AutoGrid: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/app/(dashboard)/dashboard/providers/[id]/components/ModelRow", () => ({
  default: ({
    fullModel,
    model,
    onToggleHidden,
  }: {
    fullModel: string;
    model: { id: string; isHidden: boolean };
    onToggleHidden: (id: string, hidden: boolean) => void;
  }) => (
    <span data-model={fullModel} data-hidden={String(model.isHidden)}>
      {fullModel}
      <button onClick={() => onToggleHidden(model.id, false)}>Enable</button>
    </span>
  ),
  ModelVisibilityToolbar: () => null,
}));
vi.mock("@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderContextOverrides", () => ({
  useProviderContextOverrides: () => ({
    contextOverrides: {},
    savingContextModelId: null,
    saveContextWindowOverride: vi.fn(),
  }),
}));
let root: ReturnType<typeof createRoot> | undefined;
let container: HTMLElement;
afterEach(() => {
  if (root) act(() => root!.unmount());
  container?.remove();
  vi.unstubAllGlobals();
  root = undefined;
});
const catalog = withNativeReasoningFamilies("antigravity", [
  { id: "gemini-4-hydrogen-low" },
  { id: "gemini-4-hydrogen-high" },
]);
function props(provider: string): ProviderModelsSectionProps {
  return {
    providerId: provider,
    providerAlias: provider,
    providerStorageAlias: provider,
    providerDisplayAlias: provider,
    providerInfo: { name: provider },
    models: catalog.map(({ id }) => ({ id })),
    syncedAvailableModels: catalog,
    modelAliases: {},
    modelMeta: { customModels: [] },
    connections: [],
    providerAliasEntries: [],
    modelFilter: "",
    visibilityFilter: "all",
    modelTestStatus: {},
    effectiveModelHidden: () => false,
    effectiveModelNormalize: () => false,
    effectiveModelPreserveDeveloper: () => false,
    t: (key: string) => key,
  } as ProviderModelsSectionProps;
}
async function render(provider: string) {
  await act(async () => {
    root!.render(<ProviderModelsSection {...props(provider)} />);
  });
}
test("provider pages persist separate controls and hide fixed rows without losing virtual families", async () => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  const settings: Record<string, boolean> = {};
  let fail = false;
  const patches: unknown[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, options?: RequestInit) => {
      if (options?.method === "PATCH") {
        const patch = JSON.parse(String(options.body));
        patches.push(patch);
        if (fail) return new Response("", { status: 500 });
        Object.assign(settings, patch);
      }
      return Response.json(settings);
    })
  );
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await render("antigravity");
  const checkbox = () => container.querySelector('input[type="checkbox"]') as HTMLInputElement;
  expect(checkbox()).toBeTruthy();
  expect(checkbox().disabled).toBe(false);
  expect(container.querySelectorAll("[data-model]")).toHaveLength(3);
  await act(async () => checkbox().click());
  expect(patches).toEqual([{ antigravityHideForcedReasoningModels: true }]);
  expect(container.querySelectorAll("[data-model]")).toHaveLength(1);
  expect(container.textContent).toContain("antigravity/gemini-4-hydrogen");
  await render("agy");
  expect(checkbox().checked).toBe(false);
  await act(async () => checkbox().click());
  expect(patches.at(-1)).toEqual({ agyHideForcedReasoningModels: true });
  fail = true;
  await act(async () => checkbox().click());
  expect(checkbox().checked).toBe(true);
  expect(container.querySelector('[role="alert"]')).toBeTruthy();
  fail = false;
  await render("antigravity");
  expect(checkbox().checked).toBe(true);
  await render("openai");
  expect(checkbox()).toBeNull();
});

test("a family inherits hidden variants and enabling it enables its concrete choices", async () => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({}))
  );
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  const bulk = vi.fn(async () => {});
  await act(async () =>
    root!.render(
      <ProviderModelsSection
        {...props("antigravity")}
        effectiveModelHidden={(id) => id.endsWith("-low") || id.endsWith("-high")}
        handleBulkToggleModelHidden={bulk}
      />
    )
  );
  const family = container.querySelector('[data-model="antigravity/gemini-4-hydrogen"]')!;
  expect(family.getAttribute("data-hidden")).toBe("true");
  await act(async () => (family.querySelector("button") as HTMLButtonElement).click());
  expect(bulk).toHaveBeenCalledWith(
    "antigravity",
    ["gemini-4-hydrogen", "gemini-4-hydrogen-low", "gemini-4-hydrogen-high"],
    false
  );
});
