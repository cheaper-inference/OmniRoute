// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComboTargetOptions } from "@/app/(dashboard)/dashboard/combos/ComboQuotaOnlyFallbackToggle";
import {
  applyQuotaOnlyFallbackConfig,
  setQuotaOnlyFallback,
} from "@/app/(dashboard)/dashboard/combos/comboQuotaOnlyFallback";
import type { ComboStep } from "@/lib/combos/steps";

const model = (name: string): ComboStep => ({ kind: "model", model: name });
const comboRef = (): ComboStep => ({ kind: "combo-ref", comboName: "child" });
const containers: Array<{ root: ReturnType<typeof createRoot>; element: HTMLDivElement }> = [];
const label = "Only advance on quota exhaustion";
const shortLabel = "quota-only fallback";

function renderOptions(strategy: string, entry: ComboStep) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  act(() => {
    root.render(
      <ComboTargetOptions
        strategy={strategy}
        entry={entry}
        index={0}
        hasPricing={false}
        translate={(key, fallback) =>
          key === "fallbackOnlyOnQuotaExhaustion"
            ? label
            : key === "fallbackOnlyOnQuotaExhaustionShort"
              ? shortLabel
              : fallback
        }
        onCheckedChange={vi.fn()}
      />
    );
  });
  containers.push({ root, element });
  return element;
}

afterEach(() => {
  for (const { root, element } of containers.splice(0)) {
    act(() => root.unmount());
    element.remove();
  }
});

describe("combo quota-only fallback state", () => {
  it("updates the selected model and combo-ref without mutating other steps", () => {
    const entries = [model("openai/first"), comboRef(), model("openai/last")];
    const modelEnabled = setQuotaOnlyFallback(entries, 0, true);
    const refEnabled = setQuotaOnlyFallback(modelEnabled, 1, true);

    expect(entries[0].fallbackOnlyOnQuotaExhaustion).toBeUndefined();
    expect(refEnabled[0].fallbackOnlyOnQuotaExhaustion).toBe(true);
    expect(refEnabled[1].fallbackOnlyOnQuotaExhaustion).toBe(true);
    expect(refEnabled[2]).toBe(entries[2]);
    expect(setQuotaOnlyFallback(refEnabled, 1, false)[1]).not.toHaveProperty(
      "fallbackOnlyOnQuotaExhaustion"
    );
  });

  it("ignores an invalid index instead of manufacturing a step", () => {
    const entries = [model("openai/first")];
    expect(setQuotaOnlyFallback(entries, 5, true)).toEqual(entries);
  });

  it("renders accessible human labels for priority models and combo refs only", () => {
    for (const entry of [model("openai/first"), comboRef()]) {
      const element = renderOptions("priority", entry);
      const checkbox = element.querySelector<HTMLInputElement>(`input[aria-label="${label}"]`);
      expect(checkbox).not.toBeNull();
      expect(checkbox?.checked).toBe(false);
      expect(element.textContent).toContain(shortLabel);
    }
    expect(renderOptions("weighted", model("openai/first")).querySelector("input")).toBeNull();
  });

  it("forces execute only for active priority combo refs and preserves dormant config", () => {
    const protectedRef = setQuotaOnlyFallback([comboRef()], 0, true);
    expect(applyQuotaOnlyFallbackConfig("priority", protectedRef, {})).toEqual({
      nestedComboMode: "execute",
    });
    expect(applyQuotaOnlyFallbackConfig("weighted", protectedRef, {})).toEqual({});
    expect(applyQuotaOnlyFallbackConfig("priority", [model("openai/first")], {})).toEqual({});
  });
});
