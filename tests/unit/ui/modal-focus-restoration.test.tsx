// @vitest-environment jsdom
import React, { act, useState } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: Modal, ConfirmModal } = await import("../../../src/shared/components/Modal");

const cleanups: Array<() => void> = [];

// The kit Dialog (Radix FocusScope) restores focus to the opener on a
// `setTimeout(0)` after the dialog unmounts — flush one macrotask inside act.
const flush = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

function Harness({ autoFocusField = false }: { autoFocusField?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open details
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Details">
        {autoFocusField ? <input aria-label="Key name" autoFocus /> : "Modal body"}
      </Modal>
    </>
  );
}

function renderHarness(props: { autoFocusField?: boolean } = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(<Harness {...props} />));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

// The dialog is portaled to document.body (Radix), not rendered inside the container.
const getDialog = () => document.body.querySelector<HTMLElement>('[role="dialog"]');

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
  vi.restoreAllMocks();
});

describe("shared Modal focus restoration", () => {
  it("returns focus to the trigger after Escape closes the dialog", async () => {
    const container = renderHarness();
    const trigger = container.querySelector<HTMLButtonElement>("button")!;

    act(() => {
      trigger.focus();
      trigger.click();
    });

    const dialog = getDialog()!;
    expect(dialog).not.toBeNull();
    act(() => {
      dialog.querySelector<HTMLButtonElement>("button")!.focus();
    });
    expect(document.activeElement).not.toBe(trigger);

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    await flush();

    expect(getDialog()).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("returns focus after the close button dismisses the dialog", async () => {
    const container = renderHarness();
    const trigger = container.querySelector<HTMLButtonElement>("button")!;

    act(() => {
      trigger.focus();
      trigger.click();
    });

    const closeButton = getDialog()!.querySelector<HTMLButtonElement>("button")!;
    act(() => {
      closeButton.focus();
      closeButton.click();
    });
    await flush();

    expect(getDialog()).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  // F4 (F1 checkpoint pendência): a field with autoFocus takes focus during the commit, before
  // Radix's FocusScope mounts; FocusScope then skips onOpenAutoFocus (focus is already inside),
  // so the opener was never captured and Escape dropped focus on <body> ("Create API Key").
  it("returns focus to the trigger when a field inside the dialog has autoFocus", async () => {
    const container = renderHarness({ autoFocusField: true });
    const trigger = container.querySelector<HTMLButtonElement>("button")!;

    act(() => {
      trigger.focus();
      trigger.click();
    });

    const field = getDialog()!.querySelector<HTMLInputElement>("input")!;
    expect(document.activeElement).toBe(field);

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    await flush();

    expect(getDialog()).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  // Review M-5: the useState-initializer path (dialog mounted already open, e.g. `{show && <Modal isOpen />}`).
  it("returns focus to the opener when the dialog mounts already open with an autoFocus field", async () => {
    function Conditional() {
      const [show, setShow] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setShow(true)}>
            Open
          </button>
          {show && (
            <Modal isOpen onClose={() => setShow(false)} title="Mounted open">
              <input aria-label="Name" autoFocus />
            </Modal>
          )}
        </>
      );
    }
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(<Conditional />));
    cleanups.push(() => {
      act(() => root.unmount());
      container.remove();
    });
    const trigger = container.querySelector<HTMLButtonElement>("button")!;
    act(() => {
      trigger.focus();
      trigger.click();
    });
    expect(document.activeElement).toBe(getDialog()!.querySelector("input"));
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    await flush();
    expect(getDialog()).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  // Review M-5: a ConfirmModal opened from inside a Modal returns focus to the inner opener.
  it("returns focus to the button inside the outer dialog when a nested ConfirmModal closes", async () => {
    function Nested() {
      const [outer, setOuter] = useState(false);
      const [inner, setInner] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOuter(true)}>
            Open outer
          </button>
          <Modal isOpen={outer} onClose={() => setOuter(false)} title="Outer">
            <button type="button" onClick={() => setInner(true)}>
              Delete
            </button>
          </Modal>
          <ConfirmModal
            isOpen={inner}
            onClose={() => setInner(false)}
            onConfirm={() => setInner(false)}
            message="Sure?"
          />
        </>
      );
    }
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(<Nested />));
    cleanups.push(() => {
      act(() => root.unmount());
      container.remove();
    });
    act(() => container.querySelector<HTMLButtonElement>("button")!.click());
    await flush();
    const del = [
      ...document.body.querySelectorAll<HTMLButtonElement>('[role="dialog"] button'),
    ].find((b) => b.textContent === "Delete")!;
    act(() => {
      del.focus();
      del.click();
    });
    await flush();
    expect(document.body.querySelectorAll('[role="dialog"]').length).toBe(2);
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    await flush();
    expect(document.body.querySelectorAll('[role="dialog"]').length).toBe(1);
    expect(document.activeElement).toBe(del);
  });

  it("does not try to focus an opener that was removed while the dialog was open", async () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();
    const focusSpy = vi.spyOn(trigger, "focus");

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    let isOpen = true;
    const renderModal = () => {
      root.render(
        <Modal
          isOpen={isOpen}
          onClose={() => {
            isOpen = false;
            renderModal();
          }}
          title="Details"
        >
          Modal body
        </Modal>
      );
    };

    act(renderModal);
    focusSpy.mockClear();
    trigger.remove();

    expect(() => {
      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      });
    }).not.toThrow();
    await flush();

    expect(getDialog()).toBeNull();
    expect(focusSpy).not.toHaveBeenCalled();
    // Focusing a detached element is a no-op: focus must not end up on the removed opener.
    expect(document.activeElement).not.toBe(trigger);
    expect(document.activeElement).toBe(document.body);
    act(() => root.unmount());
    container.remove();
  });
});
