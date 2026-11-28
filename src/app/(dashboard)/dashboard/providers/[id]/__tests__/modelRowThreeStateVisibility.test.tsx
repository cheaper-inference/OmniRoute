// @vitest-environment jsdom
//
// Three-state model visibility on the dashboard rows (`visible` | `combos_only` | `hidden`).
//
// The state exists because "hidden" is too blunt for an operator who wants a model reachable
// from a combo they compiled but absent from `/v1/models` and refused on a direct call. The UI
// contract therefore has to satisfy two things at once:
//
//  1. a row given only the legacy `isHidden` prop renders EXACTLY as before (no badge, no second
//     button), because several callers still pass only `onToggleHidden`;
//  2. a row given `visibilityMode` + `onSetVisibility` shows the third state distinctly — and
//     never as "hidden", since a combo still reaches it.

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ModelRow from "../components/ModelRow";
import PassthroughModelRow from "../components/PassthroughModelRow";
import { matchesVisibilityFilter } from "@/shared/utils/modelVisibility";

const t = ((key: string, values?: Record<string, unknown>) => {
  if (!values) return key;
  return Object.entries(values).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), key);
}) as (key: string, values?: Record<string, unknown>) => string;

// The rows render their labels through `providerText(t, key, fallback)`. This stub has no
// `t.has`, so the English fallback is what reaches the DOM — the same strings an operator sees
// when a locale has not been translated yet.
const COMBOS_ONLY_BADGE = "Combos only";
const HIDDEN_BADGE = "Hidden";

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(node: React.ReactNode): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(node);
  });
  roots.push({ root, el });
  return el;
}

function modelRowProps(overrides: Record<string, unknown> = {}) {
  return {
    model: { id: "gpt-4o-mini", source: "system" },
    fullModel: "openai/gpt-4o-mini",
    provider: "openai",
    onCopy: () => {},
    t,
    effectiveModelNormalize: () => false,
    effectiveModelPreserveDeveloper: () => false,
    saveModelCompatFlags: () => {},
    getUpstreamHeadersRecord: () => ({}),
    ...overrides,
  };
}

function passthroughProps(overrides: Record<string, unknown> = {}) {
  return {
    modelId: "gpt-4o-mini",
    fullModel: "openai/gpt-4o-mini",
    provider: "openai",
    onCopy: () => {},
    t,
    effectiveModelNormalize: () => false,
    effectiveModelPreserveDeveloper: () => false,
    saveModelCompatFlags: () => {},
    getUpstreamHeadersRecord: () => ({}),
    ...overrides,
  };
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

describe("ModelRow three-state visibility", () => {
  it("renders a visible row with no visibility badge", () => {
    const el = render(<ModelRow {...modelRowProps()} />);
    expect(el.textContent).not.toContain(COMBOS_ONLY_BADGE);
    expect(el.textContent).not.toContain(HIDDEN_BADGE);
  });

  it("renders a combos_only row with its own badge, dashed border and no dimming", () => {
    const el = render(
      <ModelRow
        {...modelRowProps({
          model: { id: "m", visibilityMode: "combos_only" },
          onSetVisibility: vi.fn(),
        })}
      />
    );
    expect(el.textContent).toContain(COMBOS_ONLY_BADGE);
    expect(el.textContent).not.toContain(HIDDEN_BADGE);
    const card = el.querySelector(".border-dashed");
    expect(card, "combos_only is not hidden — a dashed border marks it apart").toBeTruthy();
    expect(card?.className).not.toContain("opacity-50");
  });

  it("renders a hidden row dimmed with the hidden badge", () => {
    const el = render(
      <ModelRow
        {...modelRowProps({ model: { id: "m", isHidden: true, visibilityMode: "hidden" } })}
      />
    );
    expect(el.textContent).toContain(HIDDEN_BADGE);
    expect(el.textContent).not.toContain(COMBOS_ONLY_BADGE);
    expect(el.querySelector(".border-dashed")).toBeNull();
    expect(el.querySelector(".opacity-50")).toBeTruthy();
  });

  it("keeps the pre-three-state markup when only the legacy handler is wired", () => {
    const el = render(
      <ModelRow
        {...modelRowProps({ model: { id: "m", isHidden: true }, onToggleHidden: vi.fn() })}
      />
    );
    // The badge comes from visibilityMode/isHidden either way; what must NOT appear is the
    // combos-only control, which has no handler to call.
    expect(el.querySelectorAll("button[aria-pressed]")).toHaveLength(0);
  });

  it("moves a visible row to combos_only through the pair button", () => {
    const onSetVisibility = vi.fn().mockResolvedValue(undefined);
    const el = render(<ModelRow {...modelRowProps({ onSetVisibility })} />);
    const combosButton = [...el.querySelectorAll("button")].find(
      (button) => button.getAttribute("aria-pressed") === "false"
    );
    expect(combosButton).toBeTruthy();
    act(() => combosButton!.click());
    expect(onSetVisibility).toHaveBeenCalledWith("gpt-4o-mini", "combos_only");
  });

  it("moves a combos_only row back to visible", () => {
    const onSetVisibility = vi.fn().mockResolvedValue(undefined);
    const el = render(
      <ModelRow
        {...modelRowProps({ model: { id: "m", visibilityMode: "combos_only" }, onSetVisibility })}
      />
    );
    const pressed = el.querySelector('button[aria-pressed="true"]');
    expect(pressed).toBeTruthy();
    act(() => (pressed as HTMLButtonElement).click());
    expect(onSetVisibility).toHaveBeenCalledWith("m", "visible");
  });

  it("the eye still toggles visible/hidden exactly as before", () => {
    const onSetVisibility = vi.fn().mockResolvedValue(undefined);
    const el = render(<ModelRow {...modelRowProps({ onSetVisibility })} />);
    const eye = [...el.querySelectorAll("button")].find(
      (button) => button.getAttribute("aria-label") === "Hide model"
    );
    expect(eye).toBeTruthy();
    act(() => eye!.click());
    expect(onSetVisibility).toHaveBeenCalledWith("gpt-4o-mini", "hidden");
  });

  it("disables the combos-only button on a hidden row", () => {
    const onSetVisibility = vi.fn().mockResolvedValue(undefined);
    const el = render(
      <ModelRow
        {...modelRowProps({
          model: { id: "m", isHidden: true, visibilityMode: "hidden" },
          onSetVisibility,
        })}
      />
    );
    const pressed = el.querySelector('button[aria-pressed="false"]');
    // The ui-kit Button keeps a deactivated tooltip button focusable, so the inactive state is
    // `aria-disabled` (and `disabled` only when there is no tooltip) — assert the ARIA contract,
    // not one of the two DOM spellings.
    expect(pressed?.getAttribute("aria-disabled")).toBe("true");
  });
});

describe("PassthroughModelRow three-state visibility", () => {
  it("renders a combos_only row distinctly from a hidden one", () => {
    const combosOnly = render(
      <PassthroughModelRow {...passthroughProps({ visibilityMode: "combos_only" })} />
    );
    expect(combosOnly.textContent).toContain(COMBOS_ONLY_BADGE);
    expect(combosOnly.querySelector(".border-dashed")).toBeTruthy();
    act(() => {});

    const hidden = render(<PassthroughModelRow {...passthroughProps({ isHidden: true })} />);
    expect(hidden.textContent).toContain(HIDDEN_BADGE);
    expect(hidden.querySelector(".opacity-50")).toBeTruthy();
  });

  it("moves to combos_only through the pair button", () => {
    const onSetVisibility = vi.fn().mockResolvedValue(undefined);
    const el = render(<PassthroughModelRow {...passthroughProps({ onSetVisibility })} />);
    const target = el.querySelector('button[aria-pressed="false"]');
    expect(target).toBeTruthy();
    act(() => (target as HTMLButtonElement).click());
    expect(onSetVisibility).toHaveBeenCalledWith("gpt-4o-mini", "combos_only");
  });
});

describe("the visibility filter separates the three states", () => {
  const modes = ["visible", "combos_only", "hidden"] as const;

  it("`all` keeps every row", () => {
    for (const mode of modes) expect(matchesVisibilityFilter("all", mode)).toBe(true);
  });

  it("each named filter selects exactly its own state — combos_only never counts as hidden", () => {
    expect(matchesVisibilityFilter("visible", "visible")).toBe(true);
    expect(matchesVisibilityFilter("visible", "combos_only")).toBe(false);

    expect(matchesVisibilityFilter("combos_only", "combos_only")).toBe(true);
    expect(matchesVisibilityFilter("combos_only", "hidden")).toBe(false);

    expect(matchesVisibilityFilter("hidden", "hidden")).toBe(true);
    expect(matchesVisibilityFilter("hidden", "combos_only")).toBe(false);
  });
});
