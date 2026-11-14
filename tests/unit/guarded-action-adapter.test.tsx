import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import GuardedAction from "@/shared/components/GuardedAction";

// Decision 4 (2026-11-14): a disabled kit button has `pointer-events: none`, so a `title`
// explaining why it is disabled never shows. GuardedAction keeps the button reachable and
// explains the reason instead. These cases pin the adapter's contract.

afterEach(cleanup);

describe("GuardedAction adapter", () => {
  it("while blocked: stays focusable, looks inactive, explains the reason and swallows the click", () => {
    const onClick = vi.fn();
    const onBlocked = vi.fn();
    render(
      <GuardedAction
        variant="secondary"
        reason="Enter a judge model first"
        title="general hint"
        onClick={onClick}
        onBlocked={onBlocked}
      >
        Verify
      </GuardedAction>
    );
    const button = screen.getByRole("button", { name: "Verify" });
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("data-blocked", "true");
    // The reason replaces the native title, so the browser tooltip does not stack on the kit one.
    expect(button).not.toHaveAttribute("title");
    expect(button).toHaveAccessibleDescription("Enter a judge model first");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(onBlocked).toHaveBeenCalledTimes(1);
  });

  it("while available: runs onClick and keeps the general title", () => {
    const onClick = vi.fn();
    render(
      <GuardedAction reason={undefined} title="Add a column" onClick={onClick}>
        Add
      </GuardedAction>
    );
    const button = screen.getByRole("button", { name: "Add" });
    expect(button).not.toHaveAttribute("aria-disabled");
    expect(button).not.toHaveAttribute("data-blocked");
    expect(button).toHaveAttribute("title", "Add a column");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("a blank reason counts as available", () => {
    const onClick = vi.fn();
    render(
      <GuardedAction reason="   " onClick={onClick}>
        Go
      </GuardedAction>
    );
    fireEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("a busy action stays natively disabled, like Button", () => {
    render(<GuardedAction disabled>Busy</GuardedAction>);
    expect(screen.getByRole("button", { name: "Busy" })).toBeDisabled();
  });

  it("maps the legacy variant and size vocabulary onto the kit button", () => {
    render(
      <GuardedAction variant="destructive-ghost" size="icon-sm" icon="delete" aria-label="Delete" />
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveAttribute("data-variant", "destructive-ghost");
    expect(button).toHaveAttribute("data-size", "icon-sm");
  });

  it("primary maps to the kit default variant", () => {
    render(<GuardedAction>Save</GuardedAction>);
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("data-variant", "default");
  });
});
