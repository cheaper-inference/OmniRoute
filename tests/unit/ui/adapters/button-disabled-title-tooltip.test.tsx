// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { tabTo } from "../../../_helpers/buttonTooltip";

// Owner decision (2026-11-14, follow-up of #19620): ~93 dashboard buttons carry their own
// NAME as `title` (icon-only Refresh, Move up, Test all…), and a native title shows on neither
// keyboard focus nor an inactive kit button (`pointer-events: none`).
//
// Since the kit `Button tooltip` (keak-ai/cheaper-inference-ui-kit#231) the adapter hands the
// title to the kit as `tooltip`: the button is its own tooltip trigger, with no wrapper element,
// in both states. An inactive button with a title is `aria-disabled="true"` instead of
// `disabled`, so it can still be hovered and focused; it runs no click.
//
// Focus opens the tooltip only when the user moved there with the keyboard: a dialog that
// focuses its first control on open must not pop that control's tooltip, which would then take
// the first Escape instead of the dialog.

const { default: Button } = await import("@/shared/components/Button");
const { default: ActionBar } = await import("@/shared/components/ActionBar");

afterEach(() => cleanup());

const tooltips = () => screen.queryAllByRole("tooltip");
// The tooltip opens after the kit's 300 ms delay; leave room for a loaded CI runner.
const findTooltip = () => screen.findByRole("tooltip", {}, { timeout: 5000 });

describe("Button adapter: title is the kit tooltip", () => {
  it("shows the title on keyboard focus of an enabled button, with no native title", async () => {
    render(<Button title="Copies the link">Copy</Button>);
    const button = screen.getByRole("button", { name: "Copy" });
    // One tooltip: the browser one is gone.
    expect(button.hasAttribute("title")).toBe(false);
    tabTo(button);
    await act(async () => {});
    expect((await findTooltip()).textContent).toContain("Copies the link");
  });

  it("shows no tooltip on a focus that code moved (a dialog opening or closing)", async () => {
    const onFocus = vi.fn();
    render(
      <Button title="Copy all" onFocus={onFocus}>
        Copy
      </Button>
    );
    const button = screen.getByRole("button", { name: "Copy" });
    // Enter opens a dialog, which then focuses its first control: not a navigation key.
    fireEvent.keyDown(document, { key: "Enter" });
    act(() => button.focus());
    fireEvent.keyUp(document, { key: "Enter" });
    await act(async () => {});
    expect(document.activeElement).toBe(button);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(tooltips()).toHaveLength(0);
    // Hover still shows it.
    fireEvent.pointerMove(button, { pointerType: "mouse" });
    await act(async () => {});
    expect((await findTooltip()).textContent).toContain("Copy all");
  });

  it("adds no element around the button (it is its own tooltip trigger)", () => {
    const { container } = render(
      <Button disabled={false} title="Test all">
        Test all
      </Button>
    );
    const button = screen.getByRole("button", { name: "Test all" });
    expect(button.parentElement).toBe(container);
    expect(button.getAttribute("data-slot")).toBe("button");
    expect(container.querySelector(".ci-tooltip")).toBeNull();
    expect(container.querySelector("span[data-slot=tooltip-trigger]")).toBeNull();
  });

  it("keeps a disabled titled button hoverable: aria-disabled, tooltip on hover, no click", async () => {
    const onClick = vi.fn();
    render(
      <Button
        size="icon-sm"
        icon="refresh"
        disabled
        title="Refresh"
        aria-label="Refresh"
        onClick={onClick}
      />
    );
    const button = screen.getByRole("button", { name: "Refresh" }) as HTMLButtonElement;
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.disabled).toBe(false);
    fireEvent.pointerMove(button, { pointerType: "mouse" });
    await act(async () => {});
    expect((await findTooltip()).textContent).toContain("Refresh");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("opens the tooltip on keyboard focus of a disabled button (it stays a tab stop)", async () => {
    render(<Button disabled title="Move up" aria-label="Move up" icon="arrow_upward" />);
    const button = screen.getByRole("button", { name: "Move up" });
    fireEvent.keyDown(document, { key: "Tab" });
    act(() => button.focus());
    fireEvent.keyUp(document, { key: "Tab" });
    expect(document.activeElement).toBe(button);
    await act(async () => {});
    expect((await findTooltip()).textContent).toContain("Move up");
  });

  it("keeps the same button node (and focus) when disabled toggles", () => {
    const { rerender } = render(
      <Button disabled={false} title="Refresh" aria-label="Refresh" icon="refresh" />
    );
    const before = screen.getByRole("button", { name: "Refresh" });
    before.focus();
    expect(document.activeElement).toBe(before);
    rerender(<Button disabled title="Refresh" aria-label="Refresh" icon="refresh" />);
    expect(document.activeElement).toBe(before);
    rerender(<Button disabled={false} title="Refresh" aria-label="Refresh" icon="refresh" />);
    expect(screen.getByRole("button", { name: "Refresh" })).toBe(before);
    expect(document.activeElement).toBe(before);
  });

  it("shows the title while a loading button is inactive", async () => {
    const onClick = vi.fn();
    render(<Button loading title="Ping now" aria-label="Ping now" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Ping now" });
    expect(button.getAttribute("aria-busy")).toBe("true");
    expect(button.getAttribute("aria-disabled")).toBe("true");
    fireEvent.pointerMove(button, { pointerType: "mouse" });
    await act(async () => {});
    expect((await findTooltip()).textContent).toContain("Ping now");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  // The native title used to name a button that has no text and no aria-label. The kit only
  // takes the tooltip as the name on its icon sizes, so the adapter names the others.
  it("names a button without text from its title, whatever the size", () => {
    render(
      <>
        <Button size="sm" icon="refresh" title="Refresh" />
        <Button size="icon-sm" icon="close" title="Close" />
        <Button size="sm" icon="edit" title="Opens the editor" aria-label="Edit" />
        <Button size="sm" icon="add" title="Adds a row">
          Add
        </Button>
      </>
    );
    expect(screen.getByRole("button", { name: "Refresh" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Close" })).toBeTruthy();
    // An explicit name wins, and visible text stays the name: the title only describes.
    expect(screen.getByRole("button", { name: "Edit" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Add" }).hasAttribute("aria-label")).toBe(false);
  });

  // ActionBar grows its direct children on phones (`[&>*]:grow`). With no wrapper the button
  // is that child again.
  it("is ActionBar's direct child, so the bar's grow rule reaches it", () => {
    const { container } = render(
      <ActionBar>
        <Button disabled={false} title="Test all">
          Test all
        </Button>
      </ActionBar>
    );
    const button = screen.getByRole("button", { name: "Test all" });
    expect(button.parentElement).toBe(container.firstElementChild);
    expect(button.parentElement!.className).toContain("[&>*]:grow");
  });

  it("leaves a button without a title untouched: native disabled, no tooltip", async () => {
    render(
      <>
        <Button disabled>Save</Button>
        <Button title="  ">Blank</Button>
      </>
    );
    const save = screen.getByRole("button", { name: "Save" }) as HTMLButtonElement;
    expect(save.disabled).toBe(true);
    expect(save.hasAttribute("aria-disabled")).toBe(false);
    const blank = screen.getByRole("button", { name: "Blank" });
    expect(blank.hasAttribute("title")).toBe(false);
    tabTo(blank);
    await act(async () => {});
    expect(tooltips()).toHaveLength(0);
  });
});
