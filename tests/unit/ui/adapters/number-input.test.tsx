// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const intl = vi.hoisted(() => ({ locale: "en" }));
vi.mock("next-intl", () => ({
  useLocale: () => intl.locale,
  useTranslations: () => (key: string) => key,
}));

const { default: NumberInput, whenNumber } = await import("@/shared/components/NumberInput");
const barrel = await import("@/shared/components");

afterEach(() => {
  cleanup();
  intl.locale = "en";
});

const type = (input: HTMLElement, value: string) => fireEvent.change(input, { target: { value } });

describe("NumberInput adapter → kit Field + NumberInput", () => {
  it("renders the kit number field under a label, with the hint linked", () => {
    const { getByLabelText, getByText, container } = render(
      <NumberInput id="rpm" label="Requests per minute" hint="1 or more" value={60} min={1} />
    );
    const input = getByLabelText("Requests per minute") as HTMLInputElement;
    expect(input.className).toContain("ci-input");
    expect(input.className).toContain("ci-number-input");
    // A text field with a numeric keyboard, not type="number": no wheel changes, comma accepted.
    expect(input.type).toBe("text");
    expect(input.inputMode).toBe("numeric");
    expect(input.value).toBe("60");
    expect(getByText("1 or more").id).toBe("rpm-hint");
    expect(input.getAttribute("aria-describedby")).toBe("rpm-hint");
    expect(container.querySelector("[data-slot=field]")).not.toBeNull();
  });

  it("suffix becomes the kit unit inside the field and describes it", () => {
    const { getByLabelText, container } = render(
      <NumberInput id="t" label="Timeout" hint="h" suffix="ms" value={500} />
    );
    const unit = container.querySelector(".ci-number-input__unit")!;
    expect(unit.textContent).toBe("ms");
    expect(unit.closest(".ci-input-shell")).not.toBeNull();
    const describedBy = getByLabelText("Timeout").getAttribute("aria-describedby")!.split(" ");
    expect(describedBy).toContain(unit.id);
    expect(describedBy).toContain("t-hint");
  });

  it("error wins over the hint, marks the field invalid and is announced", () => {
    const { getByLabelText, getByRole, queryByText } = render(
      <NumberInput id="k" label="Limit" hint="h" error="Too high" value={5} />
    );
    const input = getByLabelText("Limit");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toBe("k-error");
    expect(getByRole("alert").textContent).toBe("Too high");
    expect(getByRole("alert").id).toBe("k-error");
    expect(queryByText("h")).toBeNull();
  });

  it("reports numbers as the person types and null for an empty field", () => {
    const onValueChange = vi.fn();
    const { getByLabelText } = render(
      <NumberInput label="Steps" defaultValue={3} min={0} onValueChange={onValueChange} />
    );
    const input = getByLabelText("Steps");
    type(input, "12");
    type(input, "");
    expect(onValueChange.mock.calls).toEqual([[12], [null]]);
  });

  it("keeps what was typed until the field is left, then brings it into min/max and commits once", () => {
    const onValueChange = vi.fn();
    const onValueCommit = vi.fn();
    const { getByLabelText } = render(
      <NumberInput
        label="Cooldown"
        defaultValue={1000}
        min={0}
        max={300000}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
      />
    );
    const input = getByLabelText("Cooldown") as HTMLInputElement;
    type(input, "99999999");
    expect(input.value).toBe("99999999");
    expect(onValueCommit).not.toHaveBeenCalled();
    fireEvent.blur(input);
    expect(input.value).toBe("300000");
    expect(onValueChange).toHaveBeenLastCalledWith(300000);
    expect(onValueCommit.mock.calls).toEqual([[300000]]);
  });

  it("shows the decimal separator of the app locale and accepts both separators", () => {
    intl.locale = "pt-BR";
    const onValueChange = vi.fn();
    const { getByLabelText } = render(
      <NumberInput label="Peso" value={0.7} step={0.1} min={0} onValueChange={onValueChange} />
    );
    const input = getByLabelText("Peso") as HTMLInputElement;
    expect(input.value).toBe("0,7");
    expect(input.inputMode).toBe("decimal");
    type(input, "0.5");
    expect(onValueChange).toHaveBeenLastCalledWith(0.5);
  });

  it("a caller locale wins over the app locale", () => {
    intl.locale = "pt-BR";
    const { getByLabelText } = render(
      <NumberInput label="Weight" value={0.7} step={0.1} locale="en" />
    );
    expect((getByLabelText("Weight") as HTMLInputElement).value).toBe("0.7");
  });

  it("className lands on the Field wrapper and inputClassName on the <input>", () => {
    const { getByLabelText } = render(
      <NumberInput label="Port" value={1} className="w-24 shrink-0" inputClassName="text-right" />
    );
    const input = getByLabelText("Port");
    const field = input.closest<HTMLElement>("[data-slot=field]")!;
    expect(field.className).toContain("w-24");
    expect(field.className).not.toContain("text-right");
    expect(input.className).toContain("text-right");
    expect(input.className).not.toContain("w-24");
  });

  it("required keeps the marker out of the accessible name", () => {
    const { getByRole, container } = render(<NumberInput label="Count" value={1} required />);
    const input = getByRole("textbox", { name: "Count" }) as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(container.querySelector(".ci-field__required")?.getAttribute("aria-hidden")).toBe(
      "true"
    );
  });

  it("forwards size, the ref and data attributes to the native input; no label, no <label>", () => {
    const ref = React.createRef<HTMLInputElement>();
    const { container } = render(
      <NumberInput ref={ref} aria-label="Cutoff" data-testid="cutoff" size="xs" value={2} />
    );
    expect(container.querySelector("label")).toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.getAttribute("data-testid")).toBe("cutoff");
    expect(ref.current?.getAttribute("data-size")).toBe("xs");
    expect(ref.current?.getAttribute("aria-label")).toBe("Cutoff");
  });

  it("whenNumber skips the empty field for owners whose state is a plain number", () => {
    const apply = vi.fn();
    const handler = whenNumber(apply);
    handler(null);
    handler(0);
    handler(42);
    expect(apply.mock.calls).toEqual([[0], [42]]);
  });

  it("is exported from the shared components barrel", () => {
    expect(barrel.NumberInput).toBe(NumberInput);
  });
});
