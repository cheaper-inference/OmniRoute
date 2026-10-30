// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useRemoveFailedComboModels } from "../../../src/app/(dashboard)/dashboard/combos/useRemoveFailedComboModels";

// #14944: "Delete N failed model(s)" edits the combo, so it must ask first, keep at least
// one model, and only report success when the PUT was accepted.

type Hook = ReturnType<typeof useRemoveFailedComboModels>;
type Options = Parameters<typeof useRemoveFailedComboModels>[0];

const t = (key: string, values?: Record<string, string | number>) =>
  values ? `${key}:${JSON.stringify(values)}` : key;

const combo = {
  id: "combo-1",
  name: "free",
  models: [
    { id: "step-bad", kind: "model", model: "openai/gone" },
    { id: "step-good", kind: "model", model: "openai/gpt-4o-mini" },
  ],
};

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderHook(overrides: Partial<Options> = {}) {
  let latest: Hook | null = null;
  const options: Options = {
    combo,
    updateCombo: vi.fn().mockResolvedValue(true),
    onRemoved: vi.fn(),
    notify: { error: vi.fn(), success: vi.fn() },
    t,
    ...overrides,
  };
  function Wrapper() {
    const result = useRemoveFailedComboModels(options);
    React.useEffect(() => {
      latest = result;
    });
    return null;
  }
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(<Wrapper />));
  roots.push({ root, el });
  return {
    options,
    get: () => {
      if (!latest) throw new Error("hook did not render");
      return latest;
    },
  };
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal(
    "confirm",
    vi.fn(() => true)
  );
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
});

describe("useRemoveFailedComboModels", () => {
  it("asks, then saves the combo without the failed step", async () => {
    const hook = renderHook();
    await act(() => hook.get().removeFailedModels(["step-bad"]));

    expect(globalThis.confirm).toHaveBeenCalledWith(
      'removeErrorModelsConfirm:{"count":1,"name":"free"}'
    );
    expect(hook.options.updateCombo).toHaveBeenCalledWith("combo-1", {
      ...combo,
      models: [combo.models[1]],
    });
    expect(hook.options.onRemoved).toHaveBeenCalledTimes(1);
    expect(hook.options.notify.success).toHaveBeenCalledWith('errorModelsRemoved:{"count":1}');
    expect(hook.get().removing).toBe(false);
  });

  it("does nothing when the confirmation is declined", async () => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => false)
    );
    const hook = renderHook();
    await act(() => hook.get().removeFailedModels(["step-bad"]));

    expect(hook.options.updateCombo).not.toHaveBeenCalled();
    expect(hook.options.onRemoved).not.toHaveBeenCalled();
  });

  it("refuses to empty the combo", async () => {
    const hook = renderHook();
    await act(() => hook.get().removeFailedModels(["step-bad", "step-good"]));

    expect(hook.options.notify.error).toHaveBeenCalledWith("cannotRemoveAllModels");
    expect(globalThis.confirm).not.toHaveBeenCalled();
    expect(hook.options.updateCombo).not.toHaveBeenCalled();
  });

  it("reports when no top-level step matches (failures inside a nested combo)", async () => {
    const hook = renderHook();
    await act(() => hook.get().removeFailedModels(["nested-step"]));

    expect(hook.options.notify.error).toHaveBeenCalledWith("noErrorModelsFound");
    expect(hook.options.updateCombo).not.toHaveBeenCalled();
  });

  it("keeps the modal open and claims nothing when the save fails", async () => {
    const hook = renderHook({ updateCombo: vi.fn().mockResolvedValue(false) });
    await act(() => hook.get().removeFailedModels(["step-bad"]));

    expect(hook.options.onRemoved).not.toHaveBeenCalled();
    expect(hook.options.notify.success).not.toHaveBeenCalled();
    expect(hook.get().removing).toBe(false);
  });
});
