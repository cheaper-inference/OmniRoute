// @vitest-environment jsdom
import React, { useState } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Checkbox } from "../../../packages/ui-kit/src/checkbox";

afterEach(() => cleanup());

// The bare branch (no label/description/card) rendered the control without a
// <label htmlFor>, so clicks on the decorative box never reached the native
// input — the dashboard's provider/model selection checkboxes went dead when
// the API key editor migrated to this component (v3.8.53). Local kit patch,
// documented in packages/ui-kit/PATCHES.md (#19961).
describe("kit Checkbox in bare layout (no label prop)", () => {
  it("toggles when the decorative box is clicked", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Checkbox aria-label="deepseek model access" onChange={onChange} />
    );
    const box = container.querySelector(".ci-checkbox__box");
    expect(box, "decorative box must render").toBeTruthy();
    fireEvent.click(box as Element);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
  });

  it("toggles when the control wrapper around the input is clicked", () => {
    const onChange = vi.fn();
    const { container } = render(<Checkbox aria-label="qwen model access" onChange={onChange} />);
    const control = container.querySelector(".ci-checkbox__control");
    expect(control, "control wrapper must render").toBeTruthy();
    fireEvent.click(control as Element);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
  });

  it("wraps only the control in a label tied to the input id", () => {
    const { container } = render(<Checkbox aria-label="glm model access" className="shrink-0" />);
    const label = container.firstElementChild as HTMLLabelElement;
    expect(label.tagName).toBe("LABEL");
    const input = screen.getByRole("checkbox", { name: "glm model access" }) as HTMLInputElement;
    expect(input.id).not.toBe("");
    expect(label.htmlFor).toBe(input.id);
    expect(label.children).toHaveLength(1);
    expect(label.firstElementChild?.className).toBe("ci-checkbox__control shrink-0");
    expect(container.querySelector(".ci-checkbox__text")).toBeNull();
  });

  it("a clicked box toggles exactly once per click in controlled mode", () => {
    const onCheckedChange = vi.fn();
    function Controlled() {
      const [checked, setChecked] = useState(false);
      return (
        <Checkbox
          aria-label="kimi model access"
          checked={checked}
          onCheckedChange={(next) => {
            onCheckedChange(next);
            setChecked(next === true);
          }}
        />
      );
    }
    const { container } = render(<Controlled />);
    const box = container.querySelector(".ci-checkbox__box") as Element;
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(box);
    expect(input.checked).toBe(true);
    fireEvent.click(box);
    expect(input.checked).toBe(false);
    expect(onCheckedChange.mock.calls).toEqual([[true], [false]]);
  });

  it("a disabled bare checkbox ignores clicks on the box", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Checkbox aria-label="minimax model access" disabled onChange={onChange} />
    );
    fireEvent.click(container.querySelector(".ci-checkbox__box") as Element);
    expect(onChange).not.toHaveBeenCalled();
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(false);
  });
});
