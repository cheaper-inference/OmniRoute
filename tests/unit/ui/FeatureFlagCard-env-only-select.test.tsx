// @vitest-environment jsdom
// The kit Select renders through a Radix portal, and portal teardown across several
// roots in one jsdom document throws "The node to be removed is not a child of this
// node". Vitest isolates per file, so the select cases live here on their own.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const { default: FeatureFlagCard } =
  await import("@/app/(dashboard)/dashboard/settings/components/FeatureFlagCard");

type Flag = React.ComponentProps<typeof FeatureFlagCard>["flag"];

const containers: HTMLElement[] = [];
const roots: Root[] = [];

const pointerCapture = {
  has: Element.prototype.hasPointerCapture,
  set: Element.prototype.setPointerCapture,
  release: Element.prototype.releasePointerCapture,
  scroll: Element.prototype.scrollIntoView,
};

function withPointerCapture() {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
  // jsdom has no layout, so Radix's scroll-into-view on highlight throws without this.
  Element.prototype.scrollIntoView = () => {};
}

function restorePointerCapture() {
  if (pointerCapture.has) Element.prototype.hasPointerCapture = pointerCapture.has;
  else delete (Element.prototype as Partial<Element>).hasPointerCapture;
  if (pointerCapture.set) Element.prototype.setPointerCapture = pointerCapture.set;
  else delete (Element.prototype as Partial<Element>).setPointerCapture;
  if (pointerCapture.release) Element.prototype.releasePointerCapture = pointerCapture.release;
  else delete (Element.prototype as Partial<Element>).releasePointerCapture;
  if (pointerCapture.scroll) Element.prototype.scrollIntoView = pointerCapture.scroll;
  else delete (Element.prototype as Partial<Element>).scrollIntoView;
}

const ENUM_FLAG = {
  type: "enum" as const,
  enumValues: ["policy-a", "policy-b"],
  effectiveValue: "policy-b",
};

function makeFlag(overrides: Partial<Flag> = {}): Flag {
  return {
    key: "SOME_FLAG",
    label: "Some Enum",
    description: "An enum flag",
    category: "runtime",
    enumValues: null,
    effectiveValue: "policy-b",
    source: "default",
    requiresRestart: false,
    ...overrides,
  };
}

function renderEnum(
  flag: Flag,
  onToggle: (key: string, value: string) => void,
  saving = false
): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root: Root = createRoot(container);
  roots.push(root);
  act(() => {
    root.render(
      <FeatureFlagCard
        flag={flag}
        onToggle={onToggle}
        onReset={() => {}}
        saving={saving}
        descriptionMode="full"
      />
    );
  });
  return container;
}

const actGlobal = (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean })
  .IS_REACT_ACT_ENVIRONMENT;

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  // Unmount through React so Radix disposes its own portal; removing the container out
  // from under a live root leaves listeners and focus guards on document. Each step is
  // guarded so one throwing unmount cannot skip the rest of the cleanup.
  const unmountErrors: unknown[] = [];
  while (roots.length > 0) {
    const root = roots.pop()!;
    try {
      act(() => root.unmount());
    } catch (error) {
      // Keep going so the rest of the cleanup still runs, then fail the test: a teardown
      // regression that left a portal behind must not pass quietly.
      unmountErrors.push(error);
    }
  }
  while (containers.length > 0) containers.pop()?.remove();
  restorePointerCapture();
  const globals = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
  if (actGlobal === undefined) delete globals.IS_REACT_ACT_ENVIRONMENT;
  else globals.IS_REACT_ACT_ENVIRONMENT = actGlobal;
  vi.clearAllMocks();

  if (unmountErrors.length > 0) {
    throw new Error(`unmount failed for ${unmountErrors.length} root(s): ${String(unmountErrors[0])}`);
  }
});

function pointerDownMouse(element: HTMLElement) {
  act(() => {
    element.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, button: 0, pointerType: "mouse" })
    );
  });
}

function optionsNow(): HTMLElement[] {
  return Array.from(document.querySelectorAll('[role="option"]')) as HTMLElement[];
}

it("keeps a locked select closed through mouse, click and keyboard input", () => {
  withPointerCapture();
  const onToggle = vi.fn();
  const container = renderEnum(
    makeFlag({ ...ENUM_FLAG, envOnly: true, source: "env", label: "Env Only Enum" }),
    onToggle
  );

  const trigger = container.querySelector('[role="combobox"]') as HTMLElement | null;
  expect(trigger).not.toBeNull();
  expect(trigger!.hasAttribute("data-disabled")).toBe(true);
  // The kit marks the trigger natively disabled as well; a marker-only regression
  // would leave the control focusable, so both are pinned.
  expect(trigger!.hasAttribute("disabled")).toBe(true);
  expect(trigger!.textContent).toContain("policy-b");
  expect(container.textContent).toContain(
    "Read from the deployment environment. The dashboard cannot change it."
  );

  // Each gesture is checked on its own: a trigger that honours only some of them would
  // still open on the path this misses if they were batched.
  pointerDownMouse(trigger!);
  expect(optionsNow()).toHaveLength(0);

  act(() => trigger!.click());
  expect(optionsNow()).toHaveLength(0);

  for (const key of ["Enter", " ", "ArrowDown"]) {
    act(() => trigger!.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true })));
    expect(optionsNow()).toHaveLength(0);
  }
  expect(onToggle).not.toHaveBeenCalled();
});

it("opens an editable select on the mouse path and reports the picked value once", () => {
  withPointerCapture();
  const onToggle = vi.fn();
  const container = renderEnum(
    makeFlag({ ...ENUM_FLAG, source: "db", label: "Editable Enum" }),
    onToggle
  );

  const trigger = container.querySelector('[role="combobox"]') as HTMLElement | null;
  expect(trigger!.hasAttribute("data-disabled")).toBe(false);

  pointerDownMouse(trigger!);
  const options = optionsNow();
  expect(options).toHaveLength(2);
  const optionA = options.find((option) => (option.textContent ?? "").includes("policy-a"));
  expect(optionA).toBeTruthy();
  act(() => optionA!.click());
  expect(onToggle).toHaveBeenCalledTimes(1);
  expect(onToggle).toHaveBeenCalledWith("SOME_FLAG", "policy-a");
});

it("leaves an explicitly not-envOnly select editable", () => {
  withPointerCapture();
  const onToggle = vi.fn();
  const container = renderEnum(
    makeFlag({ ...ENUM_FLAG, envOnly: false, source: "db", label: "Not Env Only" }),
    onToggle
  );

  const trigger = container.querySelector('[role="combobox"]') as HTMLElement | null;
  expect(trigger!.hasAttribute("data-disabled")).toBe(false);
  pointerDownMouse(trigger!);
  const options = optionsNow();
  expect(options).toHaveLength(2);
  const optionA = options.find((option) => (option.textContent ?? "").includes("policy-a"));
  act(() => optionA!.click());
  expect(onToggle).toHaveBeenCalledWith("SOME_FLAG", "policy-a");
});

it("opens an editable select from the keyboard", () => {
  withPointerCapture();
  const onToggle = vi.fn();
  const container = renderEnum(
    makeFlag({ ...ENUM_FLAG, source: "env", label: "Editable From Env" }),
    onToggle
  );

  const trigger = container.querySelector('[role="combobox"]') as HTMLElement | null;
  expect(trigger!.hasAttribute("data-disabled")).toBe(false);

  act(() => {
    trigger!.focus();
    trigger!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
  });
  expect(document.querySelector('[role="listbox"]')).not.toBeNull();

  // Keyboard *commit* is not observable here: Radix moves the highlight with layout
  // measurements, and jsdom reports none, so Enter has nothing to activate. The commit
  // path itself is shared with the pointer case above (the same onValueChange handler).
  // Nothing is asserted about highlighting: a jsdom or Radix change there must not
  // red this test.
  expect(onToggle).not.toHaveBeenCalled();
});

it("locks an envOnly select even when its resolved source is default", () => {
  withPointerCapture();
  const onToggle = vi.fn();
  const container = renderEnum(
    makeFlag({ ...ENUM_FLAG, envOnly: true, source: "default", label: "Env Only Default" }),
    onToggle
  );

  const trigger = container.querySelector('[role="combobox"]') as HTMLElement | null;
  expect(trigger!.hasAttribute("data-disabled")).toBe(true);
  pointerDownMouse(trigger!);
  expect(optionsNow()).toHaveLength(0);
  expect(onToggle).not.toHaveBeenCalled();
});

it("disables the select while a save is in flight", () => {
  withPointerCapture();
  const onToggle = vi.fn();
  const container = renderEnum(
    makeFlag({ ...ENUM_FLAG, source: "db", label: "Saving Enum" }),
    onToggle,
    true
  );

  const trigger = container.querySelector('[role="combobox"]') as HTMLElement | null;
  expect(trigger!.hasAttribute("data-disabled")).toBe(true);
  expect(trigger!.hasAttribute("disabled")).toBe(true);

  pointerDownMouse(trigger!);
  expect(optionsNow()).toHaveLength(0);
  act(() => trigger!.click());
  expect(optionsNow()).toHaveLength(0);
  act(() => trigger!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })));
  expect(optionsNow()).toHaveLength(0);
  expect(onToggle).not.toHaveBeenCalled();
});
