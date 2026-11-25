// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const { default: Notice } = await import("@/shared/components/Notice");
const barrel = await import("@/shared/components");

afterEach(() => cleanup());

// Kit `alert-compact-empty-inline`: the compact notice for dialogs, table rows and nested panels,
// in place of hand-made `rounded border bg-warning/10 p-3 text-xs` boxes.
describe("Notice adapter → kit Alert size=sm, never dismissible", () => {
  it("renders the compact kit alert with its message and no dismiss button", () => {
    render(<Notice>Saved keys are not shown again.</Notice>);
    const notice = screen.getByRole("status");
    expect(notice.getAttribute("data-slot")).toBe("alert");
    expect(notice.getAttribute("data-size")).toBe("sm");
    expect(notice.getAttribute("data-variant")).toBe("default");
    expect(notice.className).toContain("ci-alert");
    expect(notice.textContent).toBe("Saved keys are not shown again.");
    expect(notice.querySelector(".ci-alert__dismiss")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("keeps the message when an icon or a title is set (the kit drops children there)", () => {
    const { rerender } = render(
      <Notice variant="warning" icon="warning">
        The proxy is unreachable.
      </Notice>
    );
    let notice = screen.getByRole("status");
    expect(notice.getAttribute("data-variant")).toBe("warning");
    expect(notice.querySelector(".ci-alert__icon svg.oi-icon")).not.toBeNull();
    expect(notice.querySelector("[data-slot=alert-description]")?.textContent).toBe(
      "The proxy is unreachable."
    );
    rerender(
      <Notice variant="info" title="Heads up">
        Limits reset at midnight.
      </Notice>
    );
    notice = screen.getByRole("status");
    expect(notice.querySelector("[data-slot=alert-title]")?.textContent).toBe("Heads up");
    expect(notice.querySelector("[data-slot=alert-description]")?.textContent).toBe(
      "Limits reset at midnight."
    );
    expect(notice.querySelector(".ci-alert__icon")).toBeNull();
  });

  it("critical is announced as an alert; the others are a status", () => {
    const { rerender } = render(<Notice variant="critical">Save failed.</Notice>);
    expect(screen.getByRole("alert").textContent).toBe("Save failed.");
    rerender(<Notice variant="success">Saved.</Notice>);
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("status").getAttribute("data-variant")).toBe("success");
  });

  it("forwards layout, actions, className and other attributes to the kit alert", () => {
    render(
      <Notice
        variant="warning"
        layout="inline"
        className="mt-2"
        data-testid="quota-notice"
        actions={<button type="button">Retry</button>}
      >
        Quota is low.
      </Notice>
    );
    const notice = screen.getByTestId("quota-notice");
    expect(notice.getAttribute("data-layout")).toBe("inline");
    expect(notice.getAttribute("data-size")).toBe("sm");
    expect(notice.className).toContain("mt-2");
    expect(notice.querySelector("[data-slot=alert-actions] button")?.textContent).toBe("Retry");
    // The only button is the caller's action: a notice has no dismiss control.
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("is exported from the shared components barrel", () => {
    expect(barrel.Notice).toBe(Notice);
  });
});
