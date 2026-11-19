// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { default: PresetSlider } = await import("@/shared/components/PresetSlider");

afterEach(() => cleanup());

const PRESETS = [
  { label: "Low", value: 10 },
  { label: "High", value: 90 },
];

describe("PresetSlider adapter → kit Slider", () => {
  it("renders the range input with preset shortcuts and reports onChange", () => {
    const onChange = vi.fn();
    const { container, getByRole } = render(
      <PresetSlider value={40} onChange={onChange} presets={PRESETS} />
    );
    const input = container.querySelector<HTMLInputElement>('input[type="range"]')!;
    expect(input.value).toBe("40");
    expect(container.querySelector("output")?.textContent).toBe("40");
    fireEvent.click(getByRole("button", { name: "High" }));
    expect(onChange).toHaveBeenCalledWith(90);
  });

  // #18068: label/formatValue were missing, so the combos editor used the kit Slider directly.
  it("forwards label and formatValue to the kit slider", () => {
    const { getByLabelText, container } = render(
      <PresetSlider
        value={0.7}
        onChange={() => {}}
        presets={[]}
        min={0}
        max={2}
        step={0.1}
        label="Temperature"
        formatValue={(value) => value.toFixed(1)}
      />
    );
    const input = getByLabelText("Temperature") as HTMLInputElement;
    expect(input.type).toBe("range");
    expect(container.querySelector("output")?.textContent).toBe("0.7");
  });
});
