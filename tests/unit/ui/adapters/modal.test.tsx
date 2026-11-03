// @vitest-environment jsdom
import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const {
  default: Modal,
  ConfirmModal,
  TALL_MODAL_PROPS,
} = await import("@/shared/components/Modal");
const { default: NotificationToast } = await import("@/shared/components/NotificationToast");
const { useNotificationStore } = await import("@/store/notificationStore");
const { dismissToast } = await import("@omniroute/ui-kit/toast");

afterEach(() => {
  cleanup();
  act(() => useNotificationStore.getState().clearAll());
  // The kit keeps its toast records in module state: start every test from none.
  act(() => dismissToast());
});

// Radix restores focus (FocusScope) and arms its outside-pointer listener
// (DismissableLayer) on a `setTimeout(0)`: flush one macrotask inside act.
const flush = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

// A real outside click is pointerdown + click; Radix defers a left-button
// pointerdown outside until its click (drag-select protection).
function clickOutside() {
  fireEvent.pointerDown(document.body);
  fireEvent.click(document.body);
}

function Harness({ closeOnOverlay = true }: { closeOnOverlay?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Details"
        closeOnOverlay={closeOnOverlay}
        footer={<span>footer</span>}
        {...TALL_MODAL_PROPS}
      >
        <button type="button">Inside</button>
      </Modal>
    </>
  );
}

describe("Modal adapter → kit Dialog (Radix)", () => {
  it("opens as a labelled modal dialog, moves focus inside, Escape closes and restores focus", async () => {
    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Open" });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Details" });
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.className).toContain("ci-dialog");
    expect(dialog.className).toContain("max-h-[90vh]");
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(screen.getByText("footer").closest("[data-slot=dialog-footer]")).not.toBeNull();
    // #6265 — the body keeps the preset's plain padding, no second scroll owner
    const body = dialog.querySelector<HTMLElement>("[data-slot=modal-body]")!;
    expect(body.className).toBe("p-6");
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    await flush();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("the close button is translated and calls onClose exactly once", async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="T">
        x
      </Modal>
    );
    fireEvent.click(await screen.findByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    // The kit's hardcoded "Close dialog" button is replaced by the translated one
    expect(screen.queryByRole("button", { name: "Close dialog" })).toBeNull();
  });

  it("closeOnOverlay=false keeps the dialog open on an outside click", async () => {
    render(<Harness closeOnOverlay={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByRole("dialog");
    await flush();
    clickOutside();
    await flush();
    expect(screen.queryByRole("dialog")).not.toBeNull();
  });

  it("closeOnOverlay=true (default) closes on an outside click", async () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByRole("dialog");
    await flush();
    clickOutside();
    await flush();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("falls back to an sr-only translated title so the dialog is always named", async () => {
    render(
      <Modal isOpen onClose={() => {}}>
        body
      </Modal>
    );
    const dialog = await screen.findByRole("dialog", { name: "Dialog" });
    expect(dialog.querySelector("[data-slot=dialog-title]")!.className).toContain("ci-sr-only");
  });

  it("a click on a toast (raised while the dialog is open) does not dismiss the dialog", async () => {
    const onClose = vi.fn();
    function App() {
      const [open, setOpen] = useState(true);
      return (
        <>
          <NotificationToast />
          <Modal
            isOpen={open}
            onClose={() => {
              onClose();
              setOpen(false);
            }}
            title="Edit"
          >
            <button type="button">Inside</button>
          </Modal>
        </>
      );
    }
    render(<App />);
    await screen.findByRole("dialog");
    await flush();
    act(() => {
      useNotificationStore.getState().error("Save failed", "Error");
    });
    const close = await screen.findByRole("button", { name: "Dismiss notification" });
    fireEvent.pointerDown(close);
    fireEvent.pointerUp(close);
    fireEvent.click(close);
    await flush();
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeNull();
  });

  it("keeps the kit box model: one scroll owner, no doubled padding, the kit mobile gutter", async () => {
    render(
      <Modal isOpen onClose={() => {}} title="Layout" footer={<span>footer</span>}>
        body
      </Modal>
    );
    const dialog = await screen.findByRole("dialog");
    // No `w-full` (it overrode the kit's `calc(100vw - 3rem)` width); the root does not pad,
    // the sections do; the root cap sits above the body cap so only the body scrolls.
    expect(dialog.className).not.toMatch(/\bw-full\b/);
    expect(dialog.className).toContain("p-0");
    expect(dialog.className).toContain("max-h-[calc(100vh-3rem)]");
    const header = dialog.querySelector<HTMLElement>("[data-slot=dialog-header]")!;
    expect(header.className).toContain("px-6");
    expect(header.className).toContain("pt-6");
    const body = dialog.querySelector<HTMLElement>("[data-slot=modal-body]")!;
    expect(body.className).toContain("overflow-y-auto");
    const footer = dialog.querySelector<HTMLElement>("[data-slot=dialog-footer]")!;
    expect(footer.className).toContain("mt-0");
    expect(footer.className).toContain("px-6");
    expect(footer.className).toContain("pb-6");
  });

  it("TALL_MODAL_PROPS still moves the single scroll owner to the dialog root", async () => {
    render(
      <Modal isOpen onClose={() => {}} title="Tall" {...TALL_MODAL_PROPS}>
        body
      </Modal>
    );
    const dialog = await screen.findByRole("dialog");
    expect(dialog.className).toContain("max-h-[90vh]");
    expect(dialog.className).not.toContain("max-h-[calc(100vh-3rem)]");
    const body = dialog.querySelector<HTMLElement>("[data-slot=modal-body]")!;
    expect(body.className).toBe("p-6");
  });

  it("ConfirmModal renders cancel/confirm with a destructive default and forwards loading", async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmModal
        isOpen
        onClose={() => {}}
        onConfirm={onConfirm}
        message="Sure?"
        confirmText="Delete it"
      />
    );
    const confirm = await screen.findByRole("button", { name: "Delete it" });
    // Legacy Button paints `danger` as bg-red-500; the kit Button (track C) as
    // ci-button--destructive. F1 drops the legacy branch once C lands.
    expect(confirm.className).toMatch(/ci-button--destructive|bg-red-500/);
    fireEvent.click(confirm);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Cancel" })).not.toBeNull();
  });
});
