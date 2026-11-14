// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Checkbox } from "../../../packages/ui-kit/src/checkbox";

afterEach(() => cleanup());

// The bare branch (no label/description/card) renders the control without a
// <label htmlFor>, so clicks on the decorative box never reach the native
// input — the dashboard's provider/model selection checkboxes went dead when
// the permission lists migrated to this component (v3.8.53).
describe("kit Checkbox in bare layout (no label prop)", () => {
  it("toggles when the decorative box is clicked", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Checkbox aria-label="deepseek model access" onChange={onChange} />,
    );
    const box = container.querySelector(".ci-checkbox__box");
    expect(box, "decorative box must render").toBeTruthy();
    fireEvent.click(box as Element);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
  });

  it("toggles when the control wrapper around the input is clicked", () => {
    const onChange = vi.fn();
    const { container } = render(
      <Checkbox aria-label="qwen model access" onChange={onChange} />,
    );
    const control = container.querySelector(".ci-checkbox__control");
    expect(control, "control wrapper must render").toBeTruthy();
    fireEvent.click(control as Element);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
  });
});
