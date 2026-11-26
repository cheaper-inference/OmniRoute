// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect, afterEach, beforeAll, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ComboReferencePicker from "@/app/(dashboard)/dashboard/combos/ComboReferencePicker";

const options = [
  { id: "a", name: "alpha", strategy: "priority", stepCount: 1 },
  { id: "b", name: "beta", strategy: "round-robin", stepCount: 3 },
];

function openPicker({ getByRole }: ReturnType<typeof render>) {
  fireEvent.keyDown(getByRole("button", { name: "Combo Ref" }), { key: "ArrowDown" });
  return getByRole("combobox", { name: "Search" });
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
    const view = render(
      <ComboReferencePicker value="" onChange={() => {}} options={options} onAdd={() => {}} />
    );
    expect(view.getByRole("button", { name: "Combo Ref" })).toHaveTextContent(
      "Select combo to reference"
    );
    openPicker(view);
    expect(view.getByRole("option", { name: /^alpha\s*priority · 1 step$/ })).toBeInTheDocument();
    expect(
      view.getByRole("option", { name: /^beta\s*round-robin · 3 steps$/ })
    ).toBeInTheDocument();
  });

  it("reports the selected combo name and disables Add until one is chosen", () => {
    const onChange = vi.fn();
    const onAdd = vi.fn();
    const view = render(
      <ComboReferencePicker value="" onChange={onChange} options={options} onAdd={onAdd} />
    );
    const add = view.getByRole("button", { name: "Add combo reference" });
    expect(add).toBeDisabled();

    const query = openPicker(view);
    fireEvent.change(query, { target: { value: "beta ROUND-ROBIN" } });
    expect(onChange).not.toHaveBeenCalled();
    expect(view.queryByRole("option", { name: /alpha/ })).not.toBeInTheDocument();
    fireEvent.click(view.getByRole("option", { name: /^beta\s*round-robin/ }));
    expect(onChange).toHaveBeenCalledWith("beta");

    view.rerender(
      <ComboReferencePicker value="beta" onChange={onChange} options={options} onAdd={onAdd} />
    );
    expect(add).toBeEnabled();
    openPicker(view);
    fireEvent.click(view.getByRole("option", { name: /^beta\s*round-robin/ }));
    expect(onChange).toHaveBeenCalledTimes(1);
    fireEvent.click(add);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("displays an unavailable current name and keeps clear visible when filtering", () => {
    const onChange = vi.fn();
    const view = render(
      <ComboReferencePicker
        value="retired"
        onChange={onChange}
        options={options}
        onAdd={() => {}}
      />
    );
    expect(view.getByRole("button", { name: "Combo Ref" })).toHaveTextContent("retired");
    expect(view.getByRole("button", { name: "Add combo reference" })).toBeDisabled();
    const query = openPicker(view);
    expect(view.getByRole("option", { name: "retired" })).toHaveAttribute("aria-disabled", "true");
    fireEvent.change(query, { target: { value: "unmatched" } });
    fireEvent.click(view.getByRole("option", { name: "Select combo to reference" }));
    expect(onChange).toHaveBeenCalledExactlyOnceWith("");
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
