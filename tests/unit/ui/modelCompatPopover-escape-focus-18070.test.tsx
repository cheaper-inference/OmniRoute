// @vitest-environment jsdom
// #18070 — the compat popover closes on Escape and returns focus to its trigger, and the
// trigger exposes the open state (aria-expanded) and the panel it controls.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelCompatPopover from "@/app/(dashboard)/dashboard/providers/[id]/components/ModelCompatPopover";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

let container: HTMLDivElement;
let root: Root;

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
  });
}

function trigger() {
  return container.querySelector("button") as HTMLButtonElement;
}

function panel() {
  return document.querySelector('[role="dialog"]') as HTMLElement | null;
}

async function renderAndOpen() {
  act(() => {
    root.render(
      <ModelCompatPopover
        t={(key) => key}
        providerId="openai"
        modelId="gpt-test"
        effectiveModelNormalize={() => false}
        effectiveModelPreserveDeveloper={() => true}
        getUpstreamHeadersRecord={() => ({})}
        onCompatPatch={vi.fn()}
      />
    );
  });
  expect(trigger().getAttribute("aria-expanded")).toBe("false");
  trigger().focus();
  await act(async () => trigger().click());
  await flushEffects();
}

function pressEscape(target: EventTarget) {
  target.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
}

describe("ModelCompatPopover — Escape and focus return (#18070)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, status: 200, json: async () => ({}) }) as Response)
    );
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("names the open panel as a dialog controlled by the trigger", async () => {
    await renderAndOpen();
    const dialog = panel();
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute("aria-label")).toBe("compatAdjustmentsTitle");
    expect(trigger().getAttribute("aria-expanded")).toBe("true");
    expect(trigger().getAttribute("aria-controls")).toBe(dialog?.id);
  });

  it("Escape from inside the panel closes it and focuses the trigger", async () => {
    await renderAndOpen();
    const field = panel()?.querySelector("input, select") as HTMLElement;
    expect(field).toBeTruthy();
    field.focus();

    await act(async () => pressEscape(field));
    await flushEffects();

    expect(panel()).toBeNull();
    expect(trigger().getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger());
  });

  it("Escape with focus on the trigger closes the panel", async () => {
    await renderAndOpen();
    await act(async () => pressEscape(trigger()));
    await flushEffects();
    expect(panel()).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });

  it("an outside press (pointerdown) closes the panel without moving focus to the trigger", async () => {
    await renderAndOpen();
    const outside = document.createElement("input");
    document.body.appendChild(outside);
    outside.focus();
    await act(async () => {
      // The kit Popover (Radix) listens for outside presses from the next task on and dismisses
      // on the click that ends a primary-button press.
      await new Promise((resolve) => setTimeout(resolve, 0));
      outside.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
      outside.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();
    expect(panel()).toBeNull();
    expect(document.activeElement).toBe(outside);
  });
});
