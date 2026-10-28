// Test helpers for the shared `Select` adapter in kit mode (KEA-7886).
//
// With `options`, `src/shared/components/Select.tsx` renders the kit (Radix) Select: a
// `role="combobox"` trigger plus `role="option"` items in a portal, mounted only while
// open. There is no DOM `<select>`/`<option>`, so tests that used `fireEvent.change` or
// `select.options` go through these helpers instead. The adapter keeps the legacy values
// reachable: each item carries `data-value`, and the kit root (`[data-slot=select]`)
// carries the controlled `data-value`.
import { act, fireEvent } from "@testing-library/react";

// Radix Select calls these on open; jsdom does not implement them.
const proto = window.HTMLElement.prototype as unknown as Record<string, unknown>;
proto.hasPointerCapture ??= () => false;
proto.releasePointerCapture ??= () => {};
proto.setPointerCapture ??= () => {};
proto.scrollIntoView ??= () => {};

type Root = Document | Element;

function triggerOf(target: Element): HTMLElement {
  if (target.getAttribute("role") === "combobox") return target as HTMLElement;
  const trigger = target.querySelector<HTMLElement>("[data-slot=select-trigger]");
  if (!trigger) throw new Error("kitSelect: no kit Select trigger inside the given element");
  return trigger;
}

/** All kit Select triggers under `root` (document by default). */
export function kitSelectTriggers(root: Root = document): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>("[data-slot=select-trigger]"));
}

/** The kit Select trigger whose `<label>` (or aria-label) text contains `label`. */
export function kitSelectByLabel(label: string, root: Root = document): HTMLElement {
  const viaLabel = Array.from(root.querySelectorAll("label")).find((el) =>
    el.textContent?.includes(label)
  );
  const byFor = viaLabel?.htmlFor ? document.getElementById(viaLabel.htmlFor) : null;
  if (byFor?.getAttribute("role") === "combobox") return byFor;
  const byAria = kitSelectTriggers(root).find((el) =>
    el.getAttribute("aria-label")?.includes(label)
  );
  if (byAria) return byAria;
  throw new Error(`kitSelect: no kit Select labelled "${label}"`);
}

/** The controlled value the adapter was rendered with (legacy `<select>.value`). */
export function kitSelectValue(target: Element): string | null {
  return triggerOf(target).closest("[data-slot=select]")?.getAttribute("data-value") ?? null;
}

/** Opens the menu (keyboard path: no pointer capture needed in jsdom). */
export function openKitSelect(target: Element): HTMLElement {
  const trigger = triggerOf(target);
  act(() => {
    fireEvent.keyDown(trigger, { key: "Enter" });
  });
  return trigger;
}

/** Closes an open menu without choosing. */
export function closeKitSelect(target: Element) {
  const content = document.querySelector("[data-slot=select-content]");
  if (!content) return;
  act(() => {
    fireEvent.keyDown(content, { key: "Escape" });
  });
  void target;
}

/** The open menu's items as { value, label, disabled }. */
export function kitSelectItems() {
  return Array.from(document.querySelectorAll<HTMLElement>("[role=option]")).map((el) => ({
    value: el.getAttribute("data-value"),
    label: el.textContent ?? "",
    disabled: el.hasAttribute("data-disabled") || el.getAttribute("aria-disabled") === "true",
    element: el,
  }));
}

/** Opens the menu, reads its items, closes it again. */
export function kitSelectOptions(target: Element) {
  openKitSelect(target);
  const items = kitSelectItems();
  closeKitSelect(target);
  return items;
}

/** Equivalent of `fireEvent.change(select, { target: { value } })` for a kit Select. */
export function chooseKitSelectValue(target: Element, value: string) {
  openKitSelect(target);
  const item = document.querySelector<HTMLElement>(
    `[role=option][data-value="${value.replace(/["\\]/g, "\\$&")}"]`
  );
  if (!item) {
    const values = kitSelectItems().map((i) => i.value);
    closeKitSelect(target);
    throw new Error(`kitSelect: no option with value "${value}" (have: ${values.join(", ")})`);
  }
  act(() => {
    fireEvent.click(item);
  });
}
