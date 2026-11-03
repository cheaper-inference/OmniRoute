// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// The combo preview used to build only from `languagePacks[0]`, so a locale-gated style
// (terse-cjk → zh) whose pack was not first rendered nothing and looked dead. The preview
// now renders one block per selected pack, so the zh pack shows the 文言 text.

const containers: HTMLElement[] = [];
const roots: Array<{ unmount: () => void }> = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => {
    root.render(ui);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(async () => {
  vi.restoreAllMocks();
  await act(async () => {
    while (roots.length > 0) roots.pop()?.unmount();
  });
  for (let i = 0; i < 10; i++) await Promise.resolve();
  while (containers.length > 0) containers.pop()?.remove();
  document.body.innerHTML = "";
});

async function flush() {
  await act(async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  });
}

function setupFetchMock() {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  vi.spyOn(globalThis, "fetch").mockImplementation(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      void init;
      if (url.includes("/api/context/combos/") && url.includes("/assignments"))
        return json({ assignments: [] });
      if (url.includes("/api/context/combos")) return json({ combos: [] });
      if (url.includes("/api/combos")) return json({ combos: [] });
      if (url.includes("/api/compression/language-packs"))
        return json({
          packs: [
            { language: "en", ruleCount: 1 },
            { language: "zh", ruleCount: 2 },
          ],
        });
      if (url.includes("/api/settings/compression"))
        return json({ activeComboId: null, enabled: true });
      return json({}, 404);
    }
  );
}

describe("NamedCombosManager — output-style preview language", () => {
  async function render() {
    const { default: CompressionCombosPageClient } =
      await import("../../../src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient");
    let container!: HTMLElement;
    await act(async () => {
      container = mount(<CompressionCombosPageClient />);
    });
    await flush();
    return container;
  }

  it("renders the 文言 block once the zh pack is selected, even when zh is not packs[0]", async () => {
    setupFetchMock();
    const container = await render();

    // Default packs are ["en"], so the zh-gated row is not offered yet.
    expect(container.querySelector('[data-testid="combo-output-style-toggle-terse-cjk"]')).toBeNull();

    const zhPack = Array.from(container.querySelectorAll("input[type=checkbox]")).find(
      (box) => (box.closest("label")?.textContent ?? "").trim().startsWith("zh")
    ) as HTMLInputElement;
    expect(zhPack).toBeTruthy();
    await act(async () => {
      zhPack.click();
    });
    await flush();

    const toggle = container.querySelector(
      '[data-testid="combo-output-style-toggle-terse-cjk"]'
    ) as HTMLInputElement;
    expect(toggle).toBeTruthy();
    await act(async () => {
      toggle.click();
    });
    await flush();

    const preview = container.querySelector('[data-testid="combo-output-styles-preview"]');
    expect(preview?.textContent).toContain("文言");
  });
});
