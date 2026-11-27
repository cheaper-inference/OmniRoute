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
    const close = await screen.findByRole("button", { name: "Close" });
    // It is the kit Dialog's own close button, named through `closeLabel`: one button, not a
    // second one next to the kit's English "Close dialog".
    expect(close.className).toBe("ci-dialog__close");
    expect(screen.getAllByRole("button")).toEqual([close]);
    expect(screen.queryByRole("button", { name: "Close dialog" })).toBeNull();
    fireEvent.click(close);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("the kit close button comes after the content, and the header keeps clear of it", async () => {
    render(
      <Modal isOpen onClose={() => {}} title="Order" footer={<button type="button">Save</button>}>
        <button type="button">Inside</button>
      </Modal>
    );
    const dialog = await screen.findByRole("dialog");
    expect(
      screen.getAllByRole("button").map((b) => b.getAttribute("aria-label") ?? b.textContent)
    ).toEqual(["Inside", "Save", "Close"]);
    // Focus starts on the first control of the content, not on Close.
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Inside" }));
    const header = dialog.querySelector<HTMLElement>("[data-slot=dialog-header]")!;
    expect(header.className).toContain("pe-14");
    expect(header.querySelector("button")).toBeNull();
  });

  it("showCloseButton={false} renders no close button and reserves no room for one", async () => {
    render(
      <Modal isOpen onClose={() => {}} title="Busy" showCloseButton={false}>
        body
      </Modal>
    );
    const dialog = await screen.findByRole("dialog");
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
    expect(dialog.querySelector(".ci-dialog__close")).toBeNull();
    const header = dialog.querySelector<HTMLElement>("[data-slot=dialog-header]")!;
    expect(header.className).not.toMatch(/\bpe-\d/);
  });

  it("compactHeader pulls the kit close button into the short header", async () => {
    render(
      <Modal isOpen onClose={() => {}} title="Compact" compactHeader>
        body
      </Modal>
    );
    const dialog = await screen.findByRole("dialog");
    // The kit close button is the dialog's only direct <button> child.
    expect(dialog.className).toContain("[&>button]:top-0.5");
    expect(dialog.className).toContain("[&>button]:end-2");
    expect([...dialog.children].filter((el) => el.tagName === "BUTTON")).toEqual([
      screen.getByRole("button", { name: "Close" }),
    ]);
    const header = dialog.querySelector<HTMLElement>("[data-slot=dialog-header]")!;
    expect(header.className).toContain("py-2.5");
    expect(header.className).toContain("pe-12");
  });

  it("size=full fills the kit's fixed-height dialog: column layout, the body takes the rest", async () => {
    const { rerender } = render(
      <Modal isOpen onClose={() => {}} title="Full" size="full" footer={<span>footer</span>}>
        body
      </Modal>
    );
    const dialog = await screen.findByRole("dialog");
    expect(dialog.getAttribute("data-size")).toBe("full");
    expect(dialog.className).toContain("flex");
    expect(dialog.className).toContain("flex-col");
    // The kit sets the height and its cap for this size: no host cap on top.
    expect(dialog.className).not.toContain("max-h-");
    const body = dialog.querySelector<HTMLElement>("[data-slot=modal-body]")!;
    expect(body.className).toBe("p-6 flex-1 min-h-0 overflow-y-auto");

    // A caller body keeps its own classes and still grows into the fixed height.
    rerender(
      <Modal isOpen onClose={() => {}} title="Full" size="full" bodyClassName="p-0">
        body
      </Modal>
    );
    expect(dialog.querySelector<HTMLElement>("[data-slot=modal-body]")!.className).toBe(
      "flex-1 p-0"
    );
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
    expect(dialog.className).not.toContain("flex-col");
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

describe("ConfirmModal → kit AlertDialog", () => {
  function Confirm(props: Partial<React.ComponentProps<typeof ConfirmModal>>) {
    return (
      <ConfirmModal isOpen onClose={() => {}} onConfirm={() => {}} message="Sure?" {...props} />
    );
  }

  it("is a named, described alert dialog that starts on the safe answer", async () => {
    render(<Confirm title="Delete key" />);
    const dialog = await screen.findByRole("alertdialog", { name: "Delete key" });
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.className).toContain("max-w-sm");
    const description = dialog.querySelector("[data-slot=dialog-description]")!;
    expect(description.textContent).toBe("Sure?");
    expect(dialog.getAttribute("aria-describedby")).toBe(description.id);
    await flush();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Cancel" }));
  });

  it("falls back to the translated title and action labels", async () => {
    render(<Confirm />);
    expect(await screen.findByRole("alertdialog", { name: "Confirm" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "Confirm" })).not.toBeNull();
  });

  it.each([
    ["danger", "destructive"],
    ["warning", "warning"],
    ["primary", "default"],
    ["secondary", "default"],
    ["outline", "default"],
  ] as const)("paints variant %s as the %s action", async (variant, tone) => {
    render(<Confirm variant={variant} confirmText="Go" />);
    const action = await screen.findByRole("button", { name: "Go" });
    expect(action.getAttribute("data-variant")).toBe(tone);
    expect(screen.getByRole("button", { name: "Cancel" }).getAttribute("data-variant")).toBe(
      "outline"
    );
  });

  it("Cancel and Escape each call onClose once; an outside click does nothing", async () => {
    const onClose = vi.fn();
    render(<Confirm onClose={onClose} />);
    await screen.findByRole("alertdialog");
    await flush();
    clickOutside();
    await flush();
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    await flush();
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("the action never closes by itself: the caller decides through isOpen", async () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    render(<Confirm onClose={onClose} onConfirm={onConfirm} confirmText="Go" />);
    fireEvent.click(await screen.findByRole("button", { name: "Go" }));
    await flush();
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith();
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).not.toBeNull();
  });

  it("holds the dialog while an async onConfirm runs, then releases it", async () => {
    let finish!: () => void;
    const onClose = vi.fn();
    const onConfirm = vi.fn(() => new Promise<void>((resolve) => (finish = resolve)));
    render(<Confirm onClose={onClose} onConfirm={onConfirm} confirmText="Go" />);
    const action = (await screen.findByRole("button", { name: "Go" })) as HTMLButtonElement;
    const cancel = screen.getByRole("button", { name: "Cancel" }) as HTMLButtonElement;

    fireEvent.click(action);
    await flush();
    expect(action.getAttribute("aria-busy")).toBe("true");
    expect(action.disabled).toBe(true);
    expect(cancel.disabled).toBe(true);
    fireEvent.click(action);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).not.toBeNull();

    await act(async () => finish());
    expect(action.getAttribute("aria-busy")).toBeNull();
    expect(action.disabled).toBe(false);
    expect(cancel.disabled).toBe(false);
    expect(screen.queryByRole("alertdialog")).not.toBeNull();
  });

  it("releases the dialog when an async onConfirm rejects", async () => {
    const swallow = vi.fn();
    process.once("unhandledRejection", swallow);
    render(<Confirm onConfirm={() => Promise.reject(new Error("nope"))} confirmText="Go" />);
    const action = (await screen.findByRole("button", { name: "Go" })) as HTMLButtonElement;
    fireEvent.click(action);
    await flush();
    process.off("unhandledRejection", swallow);
    expect(action.disabled).toBe(false);
    expect((screen.getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(
      false
    );
  });

  it("the caller's loading disables Cancel too, and Escape still gets out", async () => {
    const onClose = vi.fn();
    render(<Confirm loading onClose={onClose} confirmText="Go" />);
    const action = (await screen.findByRole("button", { name: "Go" })) as HTMLButtonElement;
    expect(action.getAttribute("aria-busy")).toBe("true");
    expect(action.disabled).toBe(true);
    expect((screen.getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(
      true
    );
    await flush();
    // Focus cannot start on a disabled Cancel, and must never start on the action.
    expect(document.activeElement).toBe(screen.getByRole("alertdialog"));
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    await flush();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("returns focus to the opener of a controlled confirmation", async () => {
    function App() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Ask
          </button>
          <ConfirmModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
            message="Sure?"
            confirmText="Go"
          />
        </>
      );
    }
    render(<App />);
    const opener = screen.getByRole("button", { name: "Ask" });
    opener.focus();
    fireEvent.click(opener);
    fireEvent.click(await screen.findByRole("button", { name: "Go" }));
    await flush();
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
  });

  it("a click on a toast does not dismiss the confirmation", async () => {
    const onClose = vi.fn();
    render(
      <>
        <NotificationToast />
        <Confirm onClose={onClose} />
      </>
    );
    await screen.findByRole("alertdialog");
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
    expect(screen.queryByRole("alertdialog")).not.toBeNull();
  });
});
