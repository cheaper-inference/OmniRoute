// @vitest-environment jsdom
import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
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

// Since kit 0.0.87 the toast cards carry no live role: the Toaster announces each toast once
// through two persistent live regions, assertive for errors and polite for the rest, so the
// announcement survives a modal dialog that hides everything else.
const announcer = (politeness: "polite" | "assertive") =>
  document.querySelector<HTMLElement>(`[data-slot="toaster-announcer"][aria-live="${politeness}"]`);
const toasts = () => Array.from(document.querySelectorAll<HTMLElement>(".ci-toast"));
const toastWith = async (text: string) =>
  waitFor(() => {
    const card = toasts().find((el) => el.textContent?.includes(text));
    if (!card) throw new Error(`no toast with "${text}"`);
    return card;
  });

describe("NotificationToast → kit Toaster bridge", () => {
  it("mirrors store notifications into kit toasts, announces errors assertively, and removes them", async () => {
    render(<NotificationToast />);
    let id = 0;
    act(() => {
      id = useNotificationStore.getState().error("Boom", "Save failed");
    });
    const card = await toastWith("Save failed");
    expect(card.textContent).toContain("Boom");
    expect(card.getAttribute("data-variant")).toBe("error");
    expect(card.closest(".ci-toaster--top-right")).not.toBeNull();
    await waitFor(() => expect(announcer("assertive")?.textContent).toContain("Save failed"));
    expect(announcer("assertive")?.textContent).toContain("Boom");
    expect(announcer("polite")?.textContent).toBe("");
    act(() => useNotificationStore.getState().removeNotification(id));
    await act(async () => {});
    expect(toasts()).toHaveLength(0);
  });

  it("success is announced politely and an object message is coerced (toToastText)", async () => {
    render(<NotificationToast />);
    act(() => {
      useNotificationStore.getState().success({ message: "Saved" } as unknown as string);
    });
    const card = await toastWith("Saved");
    expect(card.getAttribute("data-variant")).toBe("success");
    await waitFor(() => expect(announcer("polite")?.textContent).toContain("Saved"));
    expect(announcer("assertive")?.textContent).toBe("");
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
    const card = await toastWith("New version available");
    expect(card.getAttribute("data-variant")).toBe("info");
    // A store-only re-render (another notification) must not duplicate the first toast.
    act(() => {
      useNotificationStore.getState().warning("Careful");
    });
    await toastWith("Careful");
    expect(toasts()).toHaveLength(2);
    expect(toasts().filter((el) => el.textContent?.includes("New version available"))).toHaveLength(
      1
    );
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
    // Radix hides everything outside the dialog except live regions that exist when it opens;
    // the Toaster's announcers are mounted before the dialog, so they stay exposed.
    await waitFor(() => expect(announcer("assertive")?.textContent).toContain("Save failed"));
    expect(announcer("assertive")?.closest('[aria-hidden="true"]')).toBeNull();
    act(() => {
      useNotificationStore.getState().success("Saved");
    });
    await waitFor(() => expect(announcer("polite")?.textContent).toContain("Saved"));
    expect(announcer("polite")?.closest('[aria-hidden="true"]')).toBeNull();
  });
});
