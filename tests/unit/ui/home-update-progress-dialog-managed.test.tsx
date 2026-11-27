// @vitest-environment jsdom
// A managed update that was rolled back or needs manual recovery is drawn as a prose outcome
// block, and a failed automatic recovery hides Retry (nothing may start again until the
// operator has acted).
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: UpdateProgressDialog } =
  await import("@/app/(dashboard)/dashboard/UpdateProgressDialog");

afterEach(cleanup);

const SLOW_RUNNER = { timeout: 15_000 };

const FORWARD = [
  { step: "managed-stop", status: "done", message: "stopped" },
  { step: "managed-snapshot", status: "done", message: "copied" },
  { step: "managed-install", status: "done", message: "installed" },
  { step: "managed-verify", status: "failed", message: "did not start" },
];

describe("update progress dialog, managed update outcomes", () => {
  it("shows the rollback as a prose alert, keeps Retry, and labels the managed steps", async () => {
    render(
      <UpdateProgressDialog
        phase="failed"
        steps={[
          ...FORWARD,
          { step: "managed-restore", status: "done", message: "restored" },
          {
            step: "recovery",
            status: "done",
            message: "Version 3.8.54 and its data were restored.",
          },
        ]}
        onDismiss={vi.fn()}
        onRetry={vi.fn()}
      />
    );
    const dialog = await screen.findByRole("dialog", { name: "updateFailedTitle" }, SLOW_RUNNER);
    expect(dialog.textContent).toContain("stepManagedStop");
    expect(dialog.textContent).toContain("stepManagedVerify");
    expect(dialog.textContent).toContain("stepManagedRestore");
    const alert = dialog.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain("Version 3.8.54 and its data were restored.");
    // The recovery row is an outcome, not a step row.
    expect(
      dialog.textContent?.match(/Version 3\.8\.54 and its data were restored\./g)
    ).toHaveLength(1);
    expect(screen.getByText("retryUpdate")).toBeTruthy();
    expect(screen.getByText("closeUpdate")).toBeTruthy();
  });

  it("hides Retry after a failed automatic recovery and shows the instructions", async () => {
    render(
      <UpdateProgressDialog
        phase="failed"
        steps={[
          ...FORWARD,
          { step: "managed-restore", status: "failed", message: "not restored" },
          {
            step: "recovery",
            status: "failed",
            message: "Manual recovery is required.\nStop OmniRoute: `omniroute stop`.",
          },
        ]}
        onDismiss={vi.fn()}
        onRetry={vi.fn()}
      />
    );
    const dialog = await screen.findByRole("dialog", { name: "updateFailedTitle" }, SLOW_RUNNER);
    expect(dialog.querySelector('[role="alert"]')?.textContent).toContain(
      "Manual recovery is required."
    );
    expect(screen.queryByText("retryUpdate")).toBeNull();
    expect(screen.getByText("closeUpdate")).toBeTruthy();
  });

  it("an ordinary failed update still offers Retry", async () => {
    render(
      <UpdateProgressDialog
        phase="failed"
        steps={[{ step: "error", status: "failed", message: "npm exited with 1" }]}
        onDismiss={vi.fn()}
        onRetry={vi.fn()}
      />
    );
    await screen.findByRole("dialog", { name: "updateFailedTitle" }, SLOW_RUNNER);
    expect(screen.getByText("retryUpdate")).toBeTruthy();
  });
});
