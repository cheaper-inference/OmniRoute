// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

// Owner decision (2026-11-14, follow-up of #19620): ~93 dashboard buttons carry their own
// NAME as `title` (icon-only Refresh, Move up, Test all…). The kit gives a disabled button
// `pointer-events: none`, so that native title never shows while the button is disabled.
// The Button adapter now routes the title through the Tooltip adapter whenever the button is
// inactive, keeping the native title while it is enabled (one tooltip at a time).

const { default: Button } = await import("@/shared/components/Button");
const { default: ActionBar } = await import("@/shared/components/ActionBar");

afterEach(() => cleanup());

const tooltips = () => screen.queryAllByRole("tooltip");
// The tooltip opens after the adapter's 300 ms delay; leave room for a loaded CI runner.
const findTooltip = () => screen.findByRole("tooltip", {}, { timeout: 5000 });

describe("Button adapter: the title stays visible when the button is disabled", () => {
  it("shows the title in a tooltip when a disabled button's wrapper is hovered", async () => {
    render(<Button size="icon-sm" icon="refresh" disabled title="Refresh" aria-label="Refresh" />);
    const button = screen.getByRole("button", { name: "Refresh" });
    const trigger = button.closest("[data-slot=tooltip-trigger]") as HTMLElement | null;
    expect(trigger, "the disabled button needs a tooltip trigger around it").not.toBeNull();
    expect(trigger).not.toBe(button);
    fireEvent.pointerMove(trigger!, { pointerType: "mouse" });
    await act(async () => {});
    const tip = await findTooltip();
    expect(tip.textContent).toContain("Refresh");
  });

  it("opens the tooltip on keyboard focus of a disabled button (the wrapper is focusable)", async () => {
    render(<Button disabled title="Move up" aria-label="Move up" icon="arrow_upward" />);
    const trigger = screen
      .getByRole("button", { name: "Move up" })
      .closest("[data-slot=tooltip-trigger]") as HTMLElement;
    expect(trigger.getAttribute("tabindex")).toBe("0");
    fireEvent.focus(trigger);
    await act(async () => {});
    expect((await findTooltip()).textContent).toContain("Move up");
  });

  it("keeps a single (native) tooltip while the same button is enabled", async () => {
    render(<Button disabled={false} title="Test all" icon="play_arrow" />);
    const button = screen.getByRole("button", { name: "Test all" });
    // Native title kept: accessible name/description and the browser tooltip are unchanged.
    expect(button.getAttribute("title")).toBe("Test all");
    const trigger = button.closest("[data-slot=tooltip-trigger]") as HTMLElement;
    // No extra tab stop next to an enabled button.
    expect(trigger.hasAttribute("tabindex")).toBe(false);
    fireEvent.pointerMove(trigger, { pointerType: "mouse" });
    fireEvent.focus(button);
    await act(async () => {});
    expect(tooltips()).toHaveLength(0);
  });

  it("keeps the same button node (and focus) when disabled toggles", () => {
    const { rerender } = render(
      <Button disabled={false} title="Refresh" aria-label="Refresh" icon="refresh" />
    );
    const before = screen.getByRole("button", { name: "Refresh" });
    before.focus();
    expect(document.activeElement).toBe(before);
    rerender(<Button disabled title="Refresh" aria-label="Refresh" icon="refresh" />);
    rerender(<Button disabled={false} title="Refresh" aria-label="Refresh" icon="refresh" />);
    expect(screen.getByRole("button", { name: "Refresh" })).toBe(before);
    expect(document.activeElement).toBe(before);
  });

  it("shows the title while a loading button is inactive", async () => {
    render(<Button loading title="Ping now" aria-label="Ping now" />);
    const trigger = screen
      .getByRole("button", { name: "Ping now" })
      .closest("[data-slot=tooltip-trigger]") as HTMLElement;
    fireEvent.pointerMove(trigger, { pointerType: "mouse" });
    await act(async () => {});
    expect((await findTooltip()).textContent).toContain("Ping now");
  });

  it("leaves a button that can never be disabled untouched (native title, no wrapper)", () => {
    render(<Button title="Copy">Copy</Button>);
    const button = screen.getByRole("button", { name: "Copy" });
    expect(button.getAttribute("title")).toBe("Copy");
    expect(button.closest("[data-slot=tooltip-trigger]")).toBeNull();
    expect(button.closest(".ci-tooltip")).toBeNull();
  });

  // CodeRabbit on #20220: ActionBar grows its direct children on phones (`[&>*]:grow`). The
  // wrapper must stay a box that takes that rule and hand the growth down to the button; a
  // `display: contents` wrapper would let the rule miss every box in the chain.
  it("keeps ActionBar's direct-child grow reaching the button through the wrapper", () => {
    render(
      <ActionBar>
        <Button disabled={false} title="Test all">
          Test all
        </Button>
      </ActionBar>
    );
    const button = screen.getByRole("button", { name: "Test all" });
    const trigger = button.parentElement!;
    const outer = trigger.parentElement!;
    expect(trigger.getAttribute("data-slot")).toBe("tooltip-trigger");
    expect(outer.classList.contains("ci-tooltip")).toBe(true);
    // The ActionBar's flex item is the outer wrapper, and it is a real box.
    expect(outer.parentElement!.className).toContain("[&>*]:grow");
    expect(outer.classList.contains("contents")).toBe(false);
    // Each wrapper passes the growth to its only child, down to the button.
    expect(outer.className).toContain("[&>*]:grow");
    expect(trigger.className).toContain("[&>*]:grow");
  });

  it("does not wrap a disabled button without a title", () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" }).closest(".ci-tooltip")).toBeNull();
  });
});
