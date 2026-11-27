// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeAll, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ComboReferencePicker from "@/app/(dashboard)/dashboard/combos/ComboReferencePicker";

function t(key: string): string {
  return key === "reviewSteps" ? "Steps" : key;
}
t.has = () => false;

const options = [
  { id: "a", name: "alpha", strategy: "priority", stepCount: 1 },
  { id: "b", name: "beta", strategy: "round-robin", stepCount: 3 },
];

// The searchable adapter opens from a labelled button and exposes a search combobox
// plus role="option" items, rather than a native select.
function openPicker(getByRole) {
  fireEvent.keyDown(getByRole("button", { name: "Reference another combo" }), { key: "Enter" });
}

beforeAll(() => {
  // Radix Select calls these on open; jsdom does not implement them.
  const proto = window.HTMLElement.prototype as unknown as Record<string, unknown>;
  proto.hasPointerCapture ??= () => false;
  proto.releasePointerCapture ??= () => {};
  proto.scrollIntoView ??= () => {};
});

describe("ComboReferencePicker", () => {
  afterEach(() => {
    cleanup();
  });

  it("lists the referenceable combos with strategy and step count", () => {
    const { getByRole, getAllByRole } = render(
      <ComboReferencePicker t={t} value="" onChange={() => {}} options={options} onAdd={() => {}} />
    );
    expect(getByRole("button", { name: "Reference another combo" }).textContent).toContain(
      "Select an existing combo to reference"
    );
    openPicker(getByRole);
    const labels = getAllByRole("option").map((option) => option.getAttribute("aria-label"));
    expect(labels).toEqual(["alpha priority · Steps: 1", "beta round-robin · Steps: 3"]);
  });

  it("reports the selected combo name and disables Add until one is chosen", () => {
    const onChange = vi.fn();
    const onAdd = vi.fn();
    const { getByRole, rerender } = render(
      <ComboReferencePicker t={t} value="" onChange={onChange} options={options} onAdd={onAdd} />
    );
    const button = getByRole("button", { name: "Add combo ref" }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);

    openPicker(getByRole);
    fireEvent.change(getByRole("combobox", { name: "Search" }), {
      target: { value: "round-robin" },
    });
    expect(onChange).not.toHaveBeenCalled();
    expect(button.disabled).toBe(true);
    fireEvent.click(getByRole("option", { name: "beta round-robin · Steps: 3" }));
    expect(onChange).toHaveBeenCalledWith("beta");

    rerender(
      <ComboReferencePicker
        t={t}
        value="beta"
        onChange={onChange}
        options={options}
        onAdd={onAdd}
      />
    );
    const enabled = getByRole("button", { name: "Add combo ref" }) as HTMLButtonElement;
    expect(enabled.disabled).toBe(false);
    fireEvent.click(enabled);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("stays hidden for jev combos in the combo builder", () => {
    const source = readFileSync(
      resolve(process.cwd(), "src/app/(dashboard)/dashboard/combos/page.tsx"),
      "utf8"
    );
    const at = source.indexOf("<ComboReferencePicker");
    expect(at).toBeGreaterThan(0);
    expect(source.slice(Math.max(0, at - 60), at)).toContain('strategy !== "jev"');
  });
});
