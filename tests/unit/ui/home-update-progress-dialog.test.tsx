// @vitest-environment jsdom
// The home "update in progress" overlay was a hand-made `fixed inset-0 z-[999]` box: no dialog
// role, no aria-modal, no focus trap. It is now the `Modal` adapter (kit Dialog), which cannot
// be dismissed while the update runs.
import React from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: UpdateProgressDialog } =
  await import("@/app/(dashboard)/dashboard/UpdateProgressDialog");

afterEach(cleanup);

// Testing Library waits 1 s by default; a loaded runner needs more to mount the kit dialog.
const SLOW_RUNNER = { timeout: 15_000 };

// Radix arms its outside-pointer listener on a `setTimeout(0)`: flush one macrotask inside act.
const flush = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

function clickOutside() {
  fireEvent.pointerDown(document.body);
  fireEvent.click(document.body);
}

const RUNNING_STEPS = [
  { step: "install", status: "done", message: "installed" },
  { step: "rebuild", status: "running", message: "rebuilding" },
  { step: "restart", status: "pending", message: "waiting" },
];

describe("home update progress dialog", () => {
  it("renders nothing while no update is running", () => {
    render(<UpdateProgressDialog phase="idle" steps={[]} onDismiss={vi.fn()} onRetry={vi.fn()} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("is a labelled modal dialog that holds focus and ignores Escape and outside clicks while running", async () => {
    const onDismiss = vi.fn();
    render(
      <>
        <button type="button">Behind</button>
        <UpdateProgressDialog
          phase="running"
          steps={RUNNING_STEPS}
          onDismiss={onDismiss}
          onRetry={vi.fn()}
        />
      </>
    );
    const dialog = await screen.findByRole("dialog", { name: "updatingTitle" }, SLOW_RUNNER);
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.className).toContain("ci-dialog");
    await flush();
    expect(dialog.contains(document.activeElement)).toBe(true);
    // No way out while the update runs: no close button, no action buttons.
    expect(dialog.querySelectorAll("button")).toHaveLength(0);
    expect(dialog.querySelector('[role="status"]')?.textContent).toContain("restartNotice");
    // The step rows keep their translated labels and server messages.
    expect(dialog.textContent).toContain("stepInstallPackage");
    expect(dialog.textContent).toContain("stepRebuildNativeModules");
    expect(dialog.textContent).toContain("rebuilding");

    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    await flush();
    clickOutside();
    await flush();
    expect(onDismiss).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "updatingTitle" })).toBe(dialog);
  });

  it("offers close and retry once the update failed; Escape closes, an outside click does not", async () => {
    const onDismiss = vi.fn();
    const onRetry = vi.fn();
    render(
      <UpdateProgressDialog
        phase="failed"
        steps={[
          { step: "install", status: "failed", message: "npm exited 1" },
          { step: "error", status: "failed", message: "boom" },
        ]}
        onDismiss={onDismiss}
        onRetry={onRetry}
      />
    );
    const dialog = await screen.findByRole("dialog", { name: "updateFailedTitle" }, SLOW_RUNNER);
    await flush();
    expect(dialog.textContent).toContain("boom");
    // The synthetic "error" step is shown as the error message, not as a step row.
    expect(dialog.textContent).not.toContain("stepError");

    clickOutside();
    await flush();
    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "retryUpdate" }));
    expect(onRetry).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "closeUpdate" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(dialog, { key: "Escape" });
    await flush();
    expect(onDismiss).toHaveBeenCalledTimes(2);
  });

  it("offers only the reload action once the update is done, and Escape does not dismiss", async () => {
    const onDismiss = vi.fn();
    render(
      <UpdateProgressDialog
        phase="done"
        steps={[
          { step: "install", status: "done", message: "ok" },
          { step: "complete", status: "done", message: "Updated to 9.9.9" },
        ]}
        onDismiss={onDismiss}
        onRetry={vi.fn()}
      />
    );
    const dialog = await screen.findByRole("dialog", { name: "updateCompleteTitle" }, SLOW_RUNNER);
    await flush();
    expect(dialog.textContent).toContain("Updated to 9.9.9");
    expect(screen.queryByRole("button", { name: "retryUpdate" })).toBeNull();

    fireEvent.keyDown(dialog, { key: "Escape" });
    await flush();
    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "reloadNow" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe("HomePageClient no longer draws its own overlay", () => {
  const source = readFileSync(
    join(process.cwd(), "src/app/(dashboard)/dashboard/HomePageClient.tsx"),
    "utf8"
  );

  it("has no hand-made full-screen layer and mounts the dialog component", () => {
    expect(source).not.toMatch(/fixed inset-0/);
    expect(source).not.toMatch(/z-\[999\]/);
    expect(source).toMatch(/<UpdateProgressDialog\b/);
  });
});
