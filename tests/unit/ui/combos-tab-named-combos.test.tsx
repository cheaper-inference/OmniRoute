// @vitest-environment jsdom
//
// The API key Access page saves combo/* plus the combos the key names (a named combo's
// targets skip the key's blockedModels). Under "All" the Combos tab must show those names,
// let each be removed, and keep them when the user switches Restrict -> All.
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values && typeof values.count === "number" ? `${key}:${values.count}` : key,
}));

const { default: CombosTab } =
  await import("../../../src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/CombosTab");

type Props = React.ComponentProps<typeof CombosTab>;

const LOADED_COMBOS = [
  { name: "codex-sol", models: ["a"] },
  { name: "claude-opus-5.5", models: ["b"] },
];

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(formState: { allowAllCombos: boolean; selectedCombos: string[] }) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  const handlers = {
    setAllowAllCombos: vi.fn(),
    setSelectedCombos: vi.fn(),
    toggleCombo: vi.fn(),
    setAllowAutoCombos: vi.fn(),
    setAllowCcDiscoveryAliases: vi.fn(),
  };
  const state = {
    allowAutoCombos: false,
    allowCcDiscoveryAliases: false,
    ...formState,
  } as unknown as Props["formState"];
  act(() => {
    root.render(<CombosTab formState={state} allCombos={LOADED_COMBOS} {...handlers} />);
  });
  containers.push({ root, el });
  return { el, ...handlers };
}

function namedChips(el: HTMLElement): string[] {
  return Array.from(el.querySelectorAll('[data-testid="named-combo-under-all"]')).map(
    (chip) => chip.textContent ?? ""
  );
}

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
});

describe("Access page Combos tab: named combos under All", () => {
  it("shows the named combos with the blocked-models note and removes one on click", () => {
    const { el, setSelectedCombos } = render({
      allowAllCombos: true,
      selectedCombos: ["codex-sol", "claude-opus-5.5"],
    });

    expect(namedChips(el)).toEqual(["codex-sol", "claude-opus-5.5"]);
    expect(el.textContent).toContain("namedCombosSkipBlockedModels:2");

    const chip = el.querySelector('[data-testid="named-combo-under-all"]')!;
    const removeButton = chip.parentElement!.querySelector("button")!;
    act(() => removeButton.click());
    expect(setSelectedCombos).toHaveBeenCalledWith(["claude-opus-5.5"]);
  });

  it("shows nothing extra under All when the key names no combo", () => {
    const { el } = render({ allowAllCombos: true, selectedCombos: [] });
    expect(namedChips(el)).toEqual([]);
    expect(el.textContent).not.toContain("namedCombosSkipBlockedModels");
  });

  it("keeps the selection when switching Restrict -> All", () => {
    const { el, setAllowAllCombos, setSelectedCombos } = render({
      allowAllCombos: false,
      selectedCombos: ["codex-sol"],
    });
    expect(namedChips(el)).toEqual([]);

    const allButton = Array.from(el.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "all"
    )!;
    act(() => allButton.click());
    expect(setAllowAllCombos).toHaveBeenCalledWith(true);
    expect(setSelectedCombos).not.toHaveBeenCalled();
  });
});
