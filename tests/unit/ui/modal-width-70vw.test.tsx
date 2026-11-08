// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: Modal } = await import("../../../src/shared/components/Modal");

const cleanups: Array<() => void> = [];

function renderModal(props: Partial<React.ComponentProps<typeof Modal>> = {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  act(() =>
    root.render(
      <Modal isOpen onClose={() => {}} title="Width" {...props}>
        body
      </Modal>
    )
  );
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  // The kit Dialog (Radix) portals its content to <body>, outside `container`.
  const dialogs = document.body.querySelectorAll<HTMLElement>('[role="dialog"]');
  return dialogs[dialogs.length - 1];
}

afterEach(() => {
  while (cleanups.length) cleanups.pop()!();
});

describe("Modal width", () => {
  it("defaults (md) to ~70% of the viewport from the sm breakpoint, full width below", () => {
    const dialog = renderModal();
    // Below `sm` the kit Dialog's own `calc(100vw - 3rem)` width applies (mobile gutter);
    // `max-w-none` lifts its 30rem cap so the dialog spans the full width minus the gutter.
    expect(dialog.className).toContain("max-w-none");
    expect(dialog.className).toContain("sm:w-[70vw]");
    expect(dialog.className).toContain("sm:max-w-[70vw]");
    expect(dialog.className).not.toContain("max-w-md");
  });

  it("uses 70vw for every non-sm size", () => {
    for (const size of ["lg", "xl", "full"] as const) {
      const dialog = renderModal({ size });
      expect(dialog.className, size).toContain("sm:w-[70vw]");
      expect(dialog.className, size).toContain("sm:max-w-[70vw]");
      expect(dialog.className, size).not.toMatch(/(^|\s)max-w-(md|lg|xl|4xl)(\s|$)/);
      cleanups.pop()!();
    }
  });

  it("keeps the sm (confirm/alert) dialog narrow", () => {
    const dialog = renderModal({ size: "sm" });
    expect(dialog.className).toContain("max-w-sm");
    expect(dialog.className).not.toContain("70vw");
  });
});
