// @vitest-environment jsdom
// Description-mode coverage for the feature-flag cards (#12740). Adapted from the
// render-helper structure of #13189's FeatureFlagCard.test.tsx (retroamx) — that PR's
// simpler `title`-attribute hover fix was superseded by #12740's persisted clamp/full
// toggle, but the component-rendering approach is reused and extended here for the two
// display modes, localStorage persistence, and SSR/hydration safety.
import React from "react";
import { act } from "react";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// next-intl: no local mock — falls through to the real-EN-text default mock in
// tests/_setup/vitestUiPolyfills.ts, so assertions can match production copy.

const { default: FeatureFlagCard } =
  await import("@/app/(dashboard)/dashboard/settings/components/FeatureFlagCard");
const { default: FeatureFlagsGrid } =
  await import("@/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid");

type Flag = React.ComponentProps<typeof FeatureFlagCard>["flag"];

const LONG_DESCRIPTION =
  "A very long description that would normally overflow past two lines of text in the card and get visually cut off.";

function makeFlag(overrides: Partial<Flag> = {}): Flag {
  return {
    key: "SOME_FLAG",
    label: "Some Flag",
    description: LONG_DESCRIPTION,
    category: "runtime",
    type: "boolean",
    enumValues: null,
    effectiveValue: "false",
    source: "default",
    requiresRestart: false,
    ...overrides,
  };
}

const containers: HTMLElement[] = [];

function renderCard(flag: Flag, descriptionMode?: "clamp" | "full"): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(
      <FeatureFlagCard
        flag={flag}
        onToggle={() => {}}
        onReset={() => {}}
        saving={false}
        descriptionMode={descriptionMode}
      />
    );
  });
  return container;
}

function flagsResponse() {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      flags: [makeFlag()],
      summary: { total: 1, active: 0, inactive: 1, overriddenByDb: 0, overriddenByEnv: 0 },
    }),
    text: async () => "",
    headers: { get: () => null },
  } as unknown as Response;
}

async function settle(): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await Promise.resolve();
  });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  window.localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve(flagsResponse()))
  );
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  window.localStorage.clear();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("FeatureFlagCard", () => {
  it("renders the flag key", () => {
    const container = renderCard(makeFlag());
    expect(container.textContent).toContain("SOME_FLAG");
  });

  it("clamp mode (default) visually clamps the description but keeps the full text reachable via the kit tooltip", () => {
    const container = renderCard(makeFlag(), "clamp");

    const clamped = container.querySelector<HTMLElement>("p.line-clamp-2");
    expect(clamped).not.toBeNull();
    expect(clamped!.textContent).toBe(LONG_DESCRIPTION);
    // No hand-positioned panel revealed by CSS hover any more (UI review 2026-11-15, defect 16).
    expect(container.querySelector('[role="tooltip"]')).toBeNull();
    expect(container.querySelector(".absolute")).toBeNull();

    // The full text opens in the kit Tooltip (Radix: body portal, collision-aware), from the
    // keyboard too: the clamped paragraph is focusable and points at the tooltip while open.
    expect(clamped!.tabIndex).toBe(0);
    act(() => clamped!.focus());
    const tooltip = document.querySelector<HTMLElement>('[role="tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(container.contains(tooltip)).toBe(false);
    expect(tooltip!.textContent).toBe(LONG_DESCRIPTION);
    expect(clamped!.getAttribute("aria-describedby")).toBe(tooltip!.id);
  });

  it("full mode always expands the description and renders no clamp/tooltip", () => {
    const container = renderCard(makeFlag(), "full");

    expect(container.querySelector("p.line-clamp-2")).toBeNull();
    expect(container.querySelector('[role="tooltip"]')).toBeNull();
    expect(container.textContent).toContain(LONG_DESCRIPTION);
  });
});

// The kit Tabs (Radix) activate a trigger on a primary-button mousedown, not on click.
function activateTab(tab: HTMLElement): void {
  tab.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, button: 0 }));
  tab.dispatchEvent(new MouseEvent("click", { bubbles: true }));
}

describe("FeatureFlagsGrid — description mode toggle", () => {
  it("hydrates cleanly: SSR always renders clamp mode, and a persisted 'full' preference is applied only after mount, with no React hydration-mismatch warning", async () => {
    window.localStorage.setItem("ff-card-description-mode", "full");

    // Server render never touches localStorage (it's read inside a useEffect), so the
    // SSR markup must reflect the "clamp" default regardless of what is persisted.
    const ssrHtml = renderToString(<FeatureFlagsGrid />);
    // The mode control is a filter, so the segmented control is a radiogroup (#19620).
    expect(ssrHtml).toContain('aria-checked="true"');

    const container = document.createElement("div");
    container.innerHTML = ssrHtml;
    document.body.appendChild(container);
    containers.push(container);
    expect(container.querySelector('[role="radio"][aria-checked="true"]')?.textContent).toBe(
      "On hover"
    );

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    let root: Root | undefined;
    await act(async () => {
      root = hydrateRoot(container, <FeatureFlagsGrid />);
      await Promise.resolve();
      await Promise.resolve();
    });
    await settle();

    const hydrationWarnings = errorSpy.mock.calls.filter((call) =>
      String(call[0]).toLowerCase().includes("hydrat")
    );
    expect(hydrationWarnings).toHaveLength(0);
    errorSpy.mockRestore();

    // After the post-mount effect reads localStorage, the persisted "full" mode applies.
    const fullButton = Array.from(container.querySelectorAll('button[role="radio"]')).find(
      (el) => el.textContent === "Full text"
    );
    expect(fullButton?.getAttribute("aria-checked")).toBe("true");

    act(() => root?.unmount());
  });

  it("persists the description mode to localStorage when the toggle is used", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    containers.push(container);

    const root = createRoot(container);
    await act(async () => {
      root.render(<FeatureFlagsGrid />);
    });
    await settle();

    // Default is "clamp" and is written on mount too.
    expect(window.localStorage.getItem("ff-card-description-mode")).toBe("clamp");

    const fullButton = Array.from(container.querySelectorAll('button[role="radio"]')).find(
      (el) => el.textContent === "Full text"
    ) as HTMLButtonElement;
    expect(fullButton).toBeTruthy();

    await act(async () => {
      activateTab(fullButton);
    });
    await settle();

    expect(window.localStorage.getItem("ff-card-description-mode")).toBe("full");
    expect(fullButton.getAttribute("aria-checked")).toBe("true");

    const clampButton = Array.from(container.querySelectorAll('button[role="radio"]')).find(
      (el) => el.textContent === "On hover"
    ) as HTMLButtonElement;
    await act(async () => {
      activateTab(clampButton);
    });
    await settle();

    expect(window.localStorage.getItem("ff-card-description-mode")).toBe("clamp");

    act(() => root.unmount());
  });
});

function resetButton(container: HTMLElement, label: string): HTMLButtonElement | null {
  const match = Array.from(container.querySelectorAll("button")).find(
    (button) => button.getAttribute("aria-label") === `Reset ${label} to default`
  );
  return (match as HTMLButtonElement | undefined) ?? null;
}

function renderWithHandlers(
  flag: Flag,
  handlers: { onToggle?: (key: string, value: string) => void; onReset?: (key: string) => void } = {},
  saving = false
): { container: HTMLElement; root: Root } {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  act(() => {
    root.render(
      <FeatureFlagCard
        flag={flag}
        onToggle={handlers.onToggle ?? (() => {})}
        onReset={handlers.onReset ?? (() => {})}
        saving={saving}
        descriptionMode="full"
      />
    );
  });
  return { container, root };
}

describe("FeatureFlagCard — environment-only flags", () => {
  it("disables the switch and says where the value comes from", () => {
    const onToggle = vi.fn();
    const { container, root } = renderWithHandlers(
      makeFlag({ envOnly: true, source: "env", effectiveValue: "true", label: "Env Only Flag" }),
      { onToggle }
    );

    const toggle = container.querySelector('input[role="switch"]') as HTMLInputElement | null;
    expect(toggle).not.toBeNull();
    expect(toggle!.disabled).toBe(true);
    expect(toggle!.checked).toBe(true);
    expect(container.textContent).toContain(
      "Read from the deployment environment. The dashboard cannot change it."
    );

    // `disabled` blocks activation at the control. The server-side refusal is covered
    // by the API test in this stack (env-only-feature-flags), so no component-level
    // guard is needed; one added here proved unreachable under injection.
    act(() => toggle!.click());
    expect(onToggle).not.toHaveBeenCalled();

    act(() => root.unmount());
  });

  it("leaves a dashboard-editable flag clickable", () => {
    const onToggle = vi.fn();
    const { container, root } = renderWithHandlers(
      makeFlag({ source: "db", effectiveValue: "false", label: "Editable Flag" }),
      { onToggle }
    );

    const toggle = container.querySelector('input[role="switch"]') as HTMLInputElement | null;
    expect(toggle).not.toBeNull();
    expect(toggle!.disabled).toBe(false);
    expect(container.textContent).not.toContain("Read from the deployment environment");

    act(() => toggle!.click());
    expect(onToggle).toHaveBeenCalledWith("SOME_FLAG", "true");

    act(() => root.unmount());
  });

  it("offers no reset for an environment-only flag, and resets an editable one by name", () => {
    const onReset = vi.fn();
    const locked = renderWithHandlers(
      makeFlag({ envOnly: true, source: "env", configuredSource: "db", label: "Env Only Flag" }),
      { onReset }
    );
    expect(resetButton(locked.container, "Env Only Flag")).toBeNull();
    expect(onReset).not.toHaveBeenCalled();
    act(() => locked.root.unmount());

    const editable = renderWithHandlers(
      makeFlag({ source: "db", configuredSource: "db", label: "Editable Flag" }),
      { onReset }
    );
    const button = resetButton(editable.container, "Editable Flag");
    expect(button).not.toBeNull();
    expect(onReset).not.toHaveBeenCalled();
    act(() => button!.click());
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onReset).toHaveBeenCalledWith("SOME_FLAG");
    act(() => editable.root.unmount());
  });
});

describe("FeatureFlagCard — save in flight", () => {
  it("disables an editable switch while a save is running", () => {
    const onToggle = vi.fn();
    const { container, root } = renderWithHandlers(
      makeFlag({ source: "db", effectiveValue: "false", label: "Saving Flag" }),
      { onToggle },
      true
    );

    const toggle = container.querySelector('input[role="switch"]') as HTMLInputElement | null;
    expect(toggle).not.toBeNull();
    expect(toggle!.disabled).toBe(true);
    act(() => toggle!.click());
    expect(onToggle).not.toHaveBeenCalled();

    act(() => root.unmount());
  });
});

describe("FeatureFlagCard — the lock follows envOnly, not the resolved source", () => {
  // A registry that locked only when `source === "env"` would still pass a suite whose
  // fixtures all pair envOnly with source "env". These cases pin the real rule.
  const CASES: Array<{ name: string; flag: Partial<Flag>; locked: boolean; reset: boolean }> = [
    { name: "envOnly, environment variable absent (source default)", flag: { envOnly: true, source: "default" }, locked: true, reset: false },
    { name: "envOnly, stale stored row reported (source db)", flag: { envOnly: true, source: "db", configuredSource: "db" }, locked: true, reset: false },
    { name: "envOnly, resolved from the environment", flag: { envOnly: true, source: "env" }, locked: true, reset: false },
    { name: "explicitly envOnly false", flag: { envOnly: false, source: "db" }, locked: false, reset: true },
    { name: "not envOnly, value coming from env", flag: { source: "env" }, locked: false, reset: false },
    { name: "not envOnly, value coming from a stored row", flag: { source: "db", configuredSource: "db" }, locked: false, reset: true },
    { name: "not envOnly, env wins but a stored row is configured", flag: { source: "env", configuredSource: "db" }, locked: false, reset: true },
    { name: "not envOnly, legacy row reported without configuredSource", flag: { source: "db" }, locked: false, reset: true },
  ];

  for (const testCase of CASES) {
    it(`treats "${testCase.name}" as ${testCase.locked ? "locked" : "editable"}`, () => {
      const onToggle = vi.fn();
      const onReset = vi.fn();
      const { container, root } = renderWithHandlers(
        makeFlag({ effectiveValue: "true", label: "Case Flag", ...testCase.flag }),
        { onToggle, onReset }
      );

      const toggle = container.querySelector('input[role="switch"]') as HTMLInputElement | null;
      expect(toggle).not.toBeNull();
      expect(toggle!.disabled).toBe(testCase.locked);
      expect(container.textContent.includes("Read from the deployment environment")).toBe(
        testCase.locked
      );
      // Expected reset state is spelled out per case, not recomputed from the same
      // expression the component uses; a predicate that drifts fails the table.
      expect(resetButton(container, "Case Flag") !== null).toBe(testCase.reset);

      act(() => toggle!.click());
      if (testCase.locked) expect(onToggle).not.toHaveBeenCalled();
      else expect(onToggle).toHaveBeenCalledWith("SOME_FLAG", "false");

      act(() => root.unmount());
    });
  }
});

describe("FeatureFlagsGrid — environment-only flags", () => {
  it("locks the control the grid renders for an envOnly flag", async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      // Anything other than the documented load is a failure, not a silent second pass:
      // a write on mount would otherwise be served the same list payload.
      const method = init?.method ?? "GET";
      if (String(input) !== "/api/settings/feature-flags" || method !== "GET") {
        return Promise.reject(new Error(`unexpected request: ${method} ${String(input)}`));
      }
      return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            flags: [
              // Same resolved source, only envOnly differs: a grid that derived the lock
              // from `source` would pass the old fixture and fail this one.
              makeFlag({ key: "PRICING_SYNC_ENABLED", label: "Pricing Sync", envOnly: true, source: "env" }),
              makeFlag({ key: "EDITABLE_FLAG", label: "Editable Flag", envOnly: false, source: "env", effectiveValue: "true" }),
            ],
            summary: { total: 2, active: 1, inactive: 1, overriddenByDb: 1, overriddenByEnv: 1 },
          }),
      } as Response);
    });
    vi.stubGlobal("fetch", fetchMock);

    const container = document.createElement("div");
    document.body.appendChild(container);
    containers.push(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(<FeatureFlagsGrid />);
    });
    await settle();

    const groups = Array.from(container.querySelectorAll('[role="group"]')) as HTMLElement[];
    const lockedGroup = groups.find((group) => group.getAttribute("aria-label") === "Pricing Sync");
    const editableGroup = groups.find((group) => group.getAttribute("aria-label") === "Editable Flag");
    expect(lockedGroup).toBeTruthy();
    expect(editableGroup).toBeTruthy();

    const lockedSwitch = lockedGroup!.querySelector('input[role="switch"]') as HTMLInputElement | null;
    const editableSwitch = editableGroup!.querySelector('input[role="switch"]') as HTMLInputElement | null;
    expect(lockedSwitch!.disabled).toBe(true);
    expect(editableSwitch!.disabled).toBe(false);
    expect(lockedGroup!.textContent).toContain(
      "Read from the deployment environment. The dashboard cannot change it."
    );
    // The panel loads through the documented endpoint; a path or method change breaks here.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/settings/feature-flags");

    act(() => root.unmount());
  });
});
