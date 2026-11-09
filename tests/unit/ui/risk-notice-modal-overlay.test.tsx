// @vitest-environment jsdom
// RiskNoticeModal on the Modal adapter (KEA-7886, lote 7): Escape cancels, as the legacy dialog
// did; an overlay click does not (the legacy backdrop had no click handler, so a stray click
// outside never counted as a decision). The overlay positive control (the same dispatch closing
// a default Modal) lives in tests/unit/dashboard/batch/components/NewBatchWizard.test.tsx.
import React, { act } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

const { RiskNoticeModal } = await import("@/shared/components/RiskNoticeModal");

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});
afterEach(() => cleanup());

function renderNotice() {
  const onCancel = vi.fn();
  const onAccept = vi.fn();
  render(
    <RiskNoticeModal
      open
      title="Risky provider"
      body="Read this first"
      dontShowAgainKey="lote7-risk-test"
      onAccept={onAccept}
      onCancel={onCancel}
    />
  );
  return { onCancel, onAccept };
}

describe("RiskNoticeModal dismissal", () => {
  it("ignores an overlay click", async () => {
    const { onCancel, onAccept } = renderNotice();
    await screen.findByRole("dialog");
    const overlay = document.body.querySelector('[data-slot="dialog-overlay"]');
    expect(overlay).not.toBeNull();
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    act(() => {
      overlay!.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0 }));
      overlay!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onCancel).not.toHaveBeenCalled();
    expect(onAccept).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("cancels on Escape", async () => {
    const { onCancel } = renderNotice();
    const dialog = await screen.findByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
