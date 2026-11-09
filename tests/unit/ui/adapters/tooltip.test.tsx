// @vitest-environment jsdom
import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const { default: Tooltip } = await import("@/shared/components/Tooltip");
const { default: InfoTooltip } = await import("@/shared/components/InfoTooltip");

afterEach(() => cleanup());

describe("Tooltip adapters → kit Tooltip (Radix)", () => {
  it("shows the content on focus with the requested side and multiline class", async () => {
    render(
      <Tooltip content="Help text" position="bottom" multiline delayMs={0}>
        <button type="button">Trigger</button>
      </Tooltip>
    );
    fireEvent.focus(screen.getByRole("button", { name: "Trigger" }));
    await act(async () => {});
    const tip = await screen.findByRole("tooltip");
    expect(tip.textContent).toContain("Help text");
    const content = tip.closest("[data-slot=tooltip-content]")!;
    expect(content.getAttribute("data-side")).toBe("bottom");
    expect(content.className).toContain("whitespace-normal");
  });

  it("shows the content on hover (pointer) with the default top side", async () => {
    render(
      <Tooltip content="Hover text" delayMs={0}>
        <button type="button">Hover me</button>
      </Tooltip>
    );
    const trigger = screen.getByRole("button", { name: "Hover me" });
    fireEvent.pointerMove(trigger, { pointerType: "mouse" });
    await act(async () => {});
    const tip = await screen.findByRole("tooltip");
    expect(tip.textContent).toContain("Hover text");
    expect(tip.closest("[data-slot=tooltip-content]")!.getAttribute("data-side")).toBe("top");
  });

  it("wraps a non-element child in a focusable span", () => {
    render(<Tooltip content="c">plain text</Tooltip>);
    expect(screen.getByText("plain text").getAttribute("tabindex")).toBe("0");
  });

  it("renders the child alone when there is no content", () => {
    render(
      <Tooltip content="">
        <button type="button">Bare</button>
      </Tooltip>
    );
    const bare = screen.getByRole("button", { name: "Bare" });
    expect(bare.getAttribute("data-state")).toBeNull();
    expect(bare.closest(".ci-tooltip")).toBeNull();
  });

  it("InfoTooltip renders an info icon with the text as accessible name", async () => {
    render(<InfoTooltip text="More about this" />);
    const trigger = screen.getByRole("button", { name: "More about this" });
    expect(trigger.querySelector("svg.oi-icon")).not.toBeNull();
    fireEvent.focus(trigger);
    await act(async () => {});
    expect((await screen.findByRole("tooltip")).textContent).toContain("More about this");
  });

  it("wraps a disabled trigger in a focusable span so hover and focus still open the tooltip", async () => {
    render(
      <Tooltip content="Why disabled" delayMs={0}>
        <button type="button" disabled>
          Import
        </button>
      </Tooltip>
    );
    const button = screen.getByRole("button", { name: "Import" });
    const wrapper = button.parentElement!;
    expect(wrapper.tagName).toBe("SPAN");
    expect(wrapper.getAttribute("tabindex")).toBe("0");
    expect(wrapper.className).toContain("inline-flex");
    expect(wrapper.getAttribute("data-slot")).toBe("tooltip-trigger");
    fireEvent.pointerMove(wrapper, { pointerType: "mouse" });
    await act(async () => {});
    expect((await screen.findByRole("tooltip")).textContent).toContain("Why disabled");
    fireEvent.keyDown(wrapper, { key: "Escape" });
    await act(async () => {});
    fireEvent.focus(wrapper);
    await act(async () => {});
    expect((await screen.findByRole("tooltip")).textContent).toContain("Why disabled");
  });
});
