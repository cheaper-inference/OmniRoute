// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { default: Textarea } = await import("@/shared/components/Textarea");
const { default: Checkbox } = await import("@/shared/components/Checkbox");

afterEach(() => cleanup());

describe("Textarea / Checkbox adapters", () => {
  it("Textarea renders the kit textarea and the error styling", () => {
    const { getByLabelText } = render(<Textarea aria-label="Notes" error rows={3} />);
    const el = getByLabelText("Notes") as HTMLTextAreaElement;
    expect(el.tagName).toBe("TEXTAREA");
    expect(el.className).toContain("ci-textarea");
    expect(el.getAttribute("aria-invalid")).toBe("true");
    expect(el.rows).toBe(3);
  });

  // #18068: Textarea had no label, so callers wrapped it in a Field by hand.
  it("Textarea with a label renders the kit Field around it, hint and required marker", () => {
    const { getByRole, getByText, container } = render(
      <Textarea label="System prompt" hint="Sent first" required className="font-mono" />
    );
    // the aria-hidden asterisk stays out of the accessible name
    const el = getByRole("textbox", { name: "System prompt" }) as HTMLTextAreaElement;
    expect(el.tagName).toBe("TEXTAREA");
    expect(el.className).toContain("font-mono");
    expect(el.required).toBe(true);
    const hint = getByText("Sent first");
    expect(el.getAttribute("aria-describedby")).toBe(hint.id);
    expect(container.querySelector(".ci-field")).not.toBeNull();
    const marker = container.querySelector(".ci-field__required")!;
    expect(marker.getAttribute("aria-hidden")).toBe("true");
  });

  it("Textarea without a label stays a bare control", () => {
    const { container } = render(<Textarea aria-label="Raw" />);
    expect(container.querySelector(".ci-field")).toBeNull();
    expect(container.firstElementChild?.tagName).toBe("TEXTAREA");
  });

  it("Checkbox renders a labelled kit checkbox and fires onChange", () => {
    const onChange = vi.fn();
    const { getByLabelText } = render(<Checkbox label="Agree" onChange={onChange} />);
    const box = getByLabelText("Agree") as HTMLInputElement;
    expect(box.type).toBe("checkbox");
    expect(box.className).toContain("ci-checkbox__input");
    fireEvent.click(box);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(box.checked).toBe(true);
  });

  it("Checkbox without label is just the control (custom layouts)", () => {
    const { container } = render(<Checkbox aria-label="pick" />);
    expect(container.querySelector("label")).toBeNull();
    expect(container.querySelector("input[type=checkbox]")).not.toBeNull();
  });

  it("Checkbox forwards indeterminate to the kit's mixed state and clears it", () => {
    const { getByLabelText, rerender } = render(
      <Checkbox aria-label="all" checked={false} onChange={() => {}} indeterminate />
    );
    const box = getByLabelText("all") as HTMLInputElement;
    expect(box.indeterminate).toBe(true);
    expect(box.matches(":indeterminate")).toBe(true);
    rerender(
      <Checkbox aria-label="all" checked={false} onChange={() => {}} indeterminate={false} />
    );
    expect(box.indeterminate).toBe(false);
    expect(box.matches(":indeterminate")).toBe(false);
  });
});
