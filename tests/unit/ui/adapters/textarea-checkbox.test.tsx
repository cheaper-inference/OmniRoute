// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
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

  // Kit `input-mono-xs-ime`: `font-mono` has no effect on a <textarea>, so the code font is a prop.
  it("Textarea mono sets the kit code font, with and without a label", () => {
    const { getByLabelText, getByRole, rerender } = render(<Textarea aria-label="JSON" mono />);
    const bare = getByLabelText("JSON");
    expect(bare.className).toContain("ci-textarea--mono");
    expect(bare.getAttribute("spellcheck")).toBe("false");
    expect(bare.getAttribute("autocapitalize")).toBe("none");
    rerender(<Textarea label="Headers" mono spellCheck />);
    const labelled = getByRole("textbox", { name: "Headers" });
    expect(labelled.className).toContain("ci-textarea--mono");
    expect(labelled.getAttribute("spellcheck")).toBe("true");
    rerender(<Textarea aria-label="JSON" />);
    expect(getByLabelText("JSON").className).not.toContain("ci-textarea--mono");
  });

  it("Textarea declares mono in its own props", () => {
    const source = readFileSync(join(process.cwd(), "src/shared/components/Textarea.tsx"), "utf8");
    expect(source).toMatch(/\bmono\?: boolean;/);
    expect(source).toMatch(/\bmono=\{mono\}/);
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

  // #19961: the bare control is wrapped in a <label htmlFor> (and nothing else), so clicks on
  // the decorative box reach the native input in custom layouts.
  it("Checkbox without label is just the control (custom layouts), label-wrapped", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Checkbox aria-label="pick" className="shrink-0" onChange={onChange} />
    );
    const labels = container.querySelectorAll("label");
    expect(labels).toHaveLength(1);
    const label = labels[0];
    expect(container.firstElementChild).toBe(label);
    const input = container.querySelector("input[type=checkbox]") as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.id).not.toBe("");
    expect(label.htmlFor).toBe(input.id);
    // the label wraps only the control: no kit row class, no text block
    expect(label.className).toBe("");
    expect(label.hasAttribute("data-slot")).toBe(false);
    expect(label.children).toHaveLength(1);
    const control = label.firstElementChild as HTMLElement;
    expect(control.classList.contains("ci-checkbox__control")).toBe(true);
    expect(control.classList.contains("shrink-0")).toBe(true);
    expect(container.querySelector(".ci-checkbox__text")).toBeNull();
    expect(container.querySelector(".ci-checkbox")).toBeNull();
    fireEvent.click(container.querySelector(".ci-checkbox__box")!);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.checked).toBe(true);
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
