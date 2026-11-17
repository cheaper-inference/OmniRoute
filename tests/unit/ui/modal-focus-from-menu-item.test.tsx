// @vitest-environment jsdom
import React, { act, useState } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@omniroute/ui-kit/dropdown-menu";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: Modal } = await import("../../../src/shared/components/Modal");

// #18068: a Modal opened from a DropdownMenuItem captured the menu item as its opener. The item
// leaves the DOM when the menu closes, so on close the dialog had nothing to return focus to and
// focus fell on <body>. It must land on the menu's trigger instead.

const cleanups: Array<() => void> = [];
const flush = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

function MenuHarness() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button">Row actions</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit entry">
        <input aria-label="Name" />
      </Modal>
    </>
  );
}

const getDialog = () => document.body.querySelector<HTMLElement>('[role="dialog"]');

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
});

describe("shared Modal opened from a DropdownMenuItem", () => {
  it("returns focus to the menu trigger when the dialog closes", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(<MenuHarness />));
    cleanups.push(() => {
      act(() => root.unmount());
      container.remove();
    });

    const trigger = container.querySelector<HTMLButtonElement>("button")!;
    act(() => {
      trigger.focus();
      trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    await flush();
    const item = document.body.querySelector<HTMLElement>('[role="menuitem"]');
    expect(item).not.toBeNull();
    act(() => item!.focus());
    expect(document.activeElement).toBe(item);

    act(() => {
      item!.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    await flush();
    expect(getDialog()).not.toBeNull();
    expect(document.body.querySelector('[role="menuitem"]')).toBeNull();

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    await flush();

    expect(getDialog()).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
