// @vitest-environment jsdom
import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { default: NotificationToast, toToastText } =
  await import("@/shared/components/NotificationToast");
const { useNotificationStore } = await import("@/store/notificationStore");
const { default: Modal } = await import("@/shared/components/Modal");
const { dismissToast } = await import("@omniroute/ui-kit/toast");

afterEach(() => {
  cleanup();
  act(() => useNotificationStore.getState().clearAll());
  // The kit keeps its toast records in module state: start every test from none.
  act(() => dismissToast());
});

describe("NotificationToast → kit Toaster bridge", () => {
  it("mirrors store notifications into kit toasts with the right role, and removes them", async () => {
    render(<NotificationToast />);
    let id = 0;
    act(() => {
      id = useNotificationStore.getState().error("Boom", "Save failed");
    });
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("Save failed");
    expect(alert.textContent).toContain("Boom");
    expect(alert.getAttribute("data-variant")).toBe("error");
    expect(alert.closest(".ci-toaster--top-right")).not.toBeNull();
    act(() => useNotificationStore.getState().removeNotification(id));
    await act(async () => {});
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("success uses role=status and an object message is coerced (toToastText)", async () => {
    render(<NotificationToast />);
    act(() => {
      useNotificationStore.getState().success({ message: "Saved" } as unknown as string);
    });
    const status = await screen.findByRole("status");
    expect(status.textContent).toContain("Saved");
    expect(status.getAttribute("data-variant")).toBe("success");
    expect(toToastText({ message: "x" })).toBe("x");
    expect(toToastText(null)).toBe("");
  });

  it("shows each notification once and exposes onClick as a translated action", async () => {
    render(<NotificationToast />);
    const onClick = vi.fn();
    act(() => {
      useNotificationStore.getState().addNotification({
        type: "info",
        message: "New version available",
        duration: 0,
        onClick,
      });
    });
    const status = await screen.findByRole("status");
    expect(status.getAttribute("data-variant")).toBe("info");
    // A store-only re-render (another notification) must not duplicate the first toast.
    act(() => {
      useNotificationStore.getState().warning("Careful");
    });
    await act(async () => {});
    expect(screen.getAllByRole("status")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("a toast raised while a Modal is open stays exposed to assistive tech", async () => {
    function App() {
      const [open] = useState(true);
      return (
        <>
          <NotificationToast />
          <Modal isOpen={open} onClose={() => {}} title="Edit">
            <button type="button">Inside</button>
          </Modal>
        </>
      );
    }
    render(<App />);
    await screen.findByRole("dialog");
    await act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));
    act(() => {
      useNotificationStore.getState().error("Save failed", "Error");
    });
    const alert = await screen.findByRole("alert");
    // Radix hides everything outside the dialog except live regions that exist when it opens.
    expect(alert.closest('[aria-hidden="true"]')).toBeNull();
    expect(alert.getAttribute("role")).toBe("alert");
    act(() => {
      useNotificationStore.getState().success("Saved");
    });
    const status = await screen.findByRole("status");
    expect(status.closest('[aria-hidden="true"]')).toBeNull();
  });
});
