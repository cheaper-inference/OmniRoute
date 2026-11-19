// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.has = () => false;
    return t;
  },
}));

const { default: ModelSelectModal } = await import("@/shared/components/ModelSelectModal");
const roots: Root[] = [];

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url === "/api/provider-nodes"
          ? { nodes: [] }
          : url === "/api/provider-models"
            ? { models: {} }
            : { combos: [] },
    }))
  );
});
afterEach(async () => {
  await act(async () => {
    roots.splice(0).forEach((root) => root.unmount());
  });
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

async function render(includeWebTargets: boolean, onSelect = vi.fn()) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push(root);
  await act(async () => {
    root.render(
      <ModelSelectModal
        isOpen
        onClose={() => {}}
        onSelect={onSelect}
        showCombos={false}
        keepOpenOnSelect
        includeWebTargets={includeWebTargets}
        activeProviders={[
          { provider: "serper-search", id: "a" },
          { provider: "tavily-search", id: "b" },
        ]}
      />
    );
  });
  return document.body.querySelector<HTMLElement>('[role="dialog"]')!;
}

it("shows and selects configured search services without a model catalog", async () => {
  const onSelect = vi.fn();
  const dialog = await render(true, onSelect);
  expect(dialog.textContent).toContain("Serper Search");
  expect(dialog.textContent).toContain("Tavily Search");
  const search = [...dialog.querySelectorAll("button")].find((button) =>
    button.textContent?.includes("Web search")
  );
  expect(search).toBeDefined();
  await act(async () => {
    search!.click();
  });
  expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ value: "serper-search/web" }));
  const tavily = [...dialog.querySelectorAll("button")].find((button) =>
    button.textContent?.includes("Web search / Page extraction")
  );
  await act(async () => {
    tavily!.click();
  });
  expect(onSelect).toHaveBeenLastCalledWith(
    expect.objectContaining({ value: "tavily-search/web" })
  );
});

it("keeps web operations out of chat-only selectors and chat probe controls", async () => {
  const dialog = await render(false);
  expect(dialog.textContent).not.toContain("Serper Search");
  expect(dialog.textContent).not.toContain("Tavily Search");
});

it("does not offer chat probes for web operation groups", async () => {
  const dialog = await render(true);
  expect(
    dialog.querySelector('[data-testid="model-select-provider-checkbox-serper-search"]')
  ).toBeNull();
  expect(
    dialog.querySelector('[data-testid="model-select-provider-checkbox-tavily-search"]')
  ).toBeNull();
});

it("honors hidden operation entries from provider-model settings", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => ({
      ok: true,
      json: async () =>
        url === "/api/provider-nodes"
          ? { nodes: [] }
          : url === "/api/provider-models"
            ? { models: {}, hiddenModelsByProvider: { "serper-search": ["web"] } }
            : { combos: [] },
    }))
  );
  const dialog = await render(true);
  expect(dialog.textContent).not.toContain("Serper Search");
  expect(dialog.textContent).toContain("Tavily Search");
});
