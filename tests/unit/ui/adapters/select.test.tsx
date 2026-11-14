// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const { default: Select } = await import("@/shared/components/Select");
const OPTIONS = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
];

beforeAll(() => {
  // Radix Select calls these on open; jsdom does not implement them.
  const proto = window.HTMLElement.prototype as unknown as Record<string, unknown>;
  proto.hasPointerCapture ??= () => false;
  proto.releasePointerCapture ??= () => {};
  proto.scrollIntoView ??= () => {};
  // Warm the Radix/kit render path once so the first test does not pay the cold JIT cost
  // against the 5 s per-test timeout on a loaded host.
  render(<Select options={OPTIONS} value="a" onChange={() => {}} />);
  cleanup();
});

afterEach(() => cleanup());

function openKitSelect(trigger: HTMLElement) {
  // Radix opens on keyboard (Enter/Space/ArrowDown) without needing pointer capture.
  fireEvent.keyDown(trigger, { key: "Enter" });
}

describe("Select adapter", () => {
  it("with options renders the kit Select trigger with the label and current value", () => {
    const { getByRole, getByText } = render(
      <Select id="s" label="Mode" options={OPTIONS} value="b" onChange={() => {}} />
    );
    expect(getByText("Mode").tagName).toBe("LABEL");
    const trigger = getByRole("combobox", { name: "Mode" });
    expect(trigger.className).toContain("ci-select");
    expect(trigger.id).toBe("s");
    expect(trigger.textContent).toContain("Beta");
  });

  it("synthesizes a legacy onChange({target:{value,name}}) from onValueChange", () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Select name="mode" options={OPTIONS} value="a" onChange={onChange} />
    );
    openKitSelect(getByRole("combobox"));
    fireEvent.click(getByRole("option", { name: "Beta" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "b", name: "mode" }),
        currentTarget: expect.objectContaining({ value: "b", name: "mode" }),
      })
    );
  });

  it("with <option> children keeps a native <select> (styled), error and hint", () => {
    const { getByLabelText, getByText } = render(
      <Select id="n" label="Native" error="Pick one" hint="h">
        <option value="x">X</option>
      </Select>
    );
    const el = getByLabelText("Native") as HTMLSelectElement;
    expect(el.tagName).toBe("SELECT");
    expect(el.className).toContain("ci-native-select__control");
    expect(el.closest("[data-slot='native-select']")?.hasAttribute("data-invalid")).toBe(true);
    expect(el.getAttribute("aria-invalid")).toBe("true");
    expect(el.getAttribute("aria-describedby")).toBe("n-error");
    expect(getByText("Pick one").id).toBe("n-error");
    expect(getByText("Pick one").getAttribute("role")).toBe("alert");
    // legacy parity: with <option> children no placeholder option is injected
    expect(Array.from(el.options).map((o) => o.value)).toEqual(["x"]);
  });

  it("native mode forwards the real change event and extra props to the <select>", () => {
    // read the value at call time: the controlled <select> snaps back to "x" afterwards
    const seen: string[] = [];
    const onChange = vi.fn((e: React.ChangeEvent<HTMLSelectElement>) => {
      seen.push(e.target.value);
    });
    const { getByTestId } = render(
      <Select data-testid="nat" value="x" onChange={onChange} compact>
        <option value="x">X</option>
        <option value="y">Y</option>
      </Select>
    );
    const el = getByTestId("nat") as HTMLSelectElement;
    expect(el.closest("[data-slot='native-select']")?.getAttribute("data-size")).toBe("sm");
    fireEvent.change(el, { target: { value: "y" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target).toBe(el);
    expect(seen).toEqual(["y"]);
  });

  it("native renders the kit NativeSelect from options, with the legacy onChange shape", () => {
    // React resets a controlled <select> right after the handler: read the event inside it.
    const onChange = vi.fn((event: React.ChangeEvent<HTMLSelectElement>) => ({
      value: event.target.value,
      name: event.target.name,
    }));
    const { getByRole, container } = render(
      <Select native label="Mode" name="mode" options={OPTIONS} value="b" onChange={onChange} />
    );
    const select = getByRole("combobox", { name: "Mode" }) as HTMLSelectElement;
    expect(select.tagName).toBe("SELECT");
    expect(select.closest(".ci-native-select")).not.toBeNull();
    expect(container.querySelector(".ci-select__trigger")).toBeNull();
    expect(Array.from(select.options).map((option) => [option.value, option.text])).toEqual([
      ["a", "Alpha"],
      ["b", "Beta"],
    ]);
    expect(select.value).toBe("b");
    // A real <select> submits by itself: no adapter hidden input.
    expect(container.querySelector('input[type="hidden"]')).toBeNull();

    fireEvent.change(select, { target: { value: "a" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.results[0].value).toEqual({ value: "a", name: "mode" });
  });

  it("native shows the disabled placeholder only while nothing is selected", () => {
    const { getByRole, rerender } = render(
      <Select
        native
        aria-label="Mode"
        placeholder="Pick one"
        options={OPTIONS}
        value=""
        onChange={() => {}}
      />
    );
    let select = getByRole("combobox") as HTMLSelectElement;
    expect(select.options[0].text).toBe("Pick one");
    expect(select.options[0].disabled).toBe(true);
    expect(select.value).toBe("");

    rerender(
      <Select
        native
        aria-label="Mode"
        placeholder="Pick one"
        options={OPTIONS}
        value="a"
        onChange={() => {}}
      />
    );
    select = getByRole("combobox") as HTMLSelectElement;
    expect(Array.from(select.options).map((option) => option.value)).toEqual(["a", "b"]);
  });

  it("native keeps an uncontrolled placeholder selected instead of the first option", () => {
    const { getByRole } = render(
      <Select native aria-label="Mode" placeholder="Pick one" options={OPTIONS} />
    );
    expect((getByRole("combobox") as HTMLSelectElement).value).toBe("");
  });

  it("native keeps placeholderDisabled={false} pickable as the '' value", () => {
    const onChange = vi.fn((event: React.ChangeEvent<HTMLSelectElement>) => event.target.value);
    const { getByRole } = render(
      <Select
        native
        aria-label="Provider"
        placeholder="All"
        placeholderDisabled={false}
        options={OPTIONS}
        value="a"
        onChange={onChange}
      />
    );
    const select = getByRole("combobox") as HTMLSelectElement;
    expect(select.options[0].value).toBe("");
    expect(select.options[0].text).toBe("All");
    expect(select.options[0].disabled).toBe(false);
    fireEvent.change(select, { target: { value: "" } });
    expect(onChange.mock.results[0].value).toBe("");
  });

  it("native does not add a placeholder when an option already has the empty value", () => {
    const { getByRole } = render(
      <Select
        native
        aria-label="Status"
        options={[{ value: "", label: "Any" }, ...OPTIONS]}
        value=""
        onChange={() => {}}
      />
    );
    const select = getByRole("combobox") as HTMLSelectElement;
    expect(Array.from(select.options).map((option) => option.text)).toEqual([
      "Any",
      "Alpha",
      "Beta",
    ]);
  });

  it("native honours disabled options, compact, error and hint", () => {
    const { getByRole, container } = render(
      <Select
        native
        compact
        id="n"
        label="Mode"
        error="bad"
        options={[OPTIONS[0], { value: "c", label: "Gamma", disabled: true }]}
        value="a"
        onChange={() => {}}
      />
    );
    const select = getByRole("combobox", { name: "Mode" }) as HTMLSelectElement;
    expect(select.options[1].disabled).toBe(true);
    expect(select.getAttribute("aria-invalid")).toBe("true");
    expect(select.getAttribute("aria-describedby")).toBe("n-error");
    expect(container.querySelector(".ci-native-select")?.getAttribute("data-size")).toBe("sm");
  });

  it("without native, options still render the Radix menu", () => {
    const { container } = render(<Select options={OPTIONS} value="a" onChange={() => {}} />);
    expect(container.querySelector("select.ci-native-select__control")).toBeNull();
    expect(container.querySelector(".ci-native-select")).toBeNull();
  });

  it("items keep the legacy option values as data-value; the root mirrors the value", () => {
    const { getByRole, container } = render(
      <Select
        options={[
          { value: "", label: "Auto" },
          ...OPTIONS,
          { value: "c", label: "Gamma", disabled: true },
        ]}
        value=""
        onChange={() => {}}
      />
    );
    expect(container.querySelector("[data-slot=select]")?.getAttribute("data-value")).toBe("");
    openKitSelect(getByRole("combobox"));
    const items = Array.from(document.querySelectorAll("[role=option]"));
    expect(items.map((el) => el.getAttribute("data-value"))).toEqual(["", "a", "b", "c"]);
    expect(items[3].hasAttribute("data-disabled")).toBe(true);
  });

  it("placeholder renders when no value is selected", () => {
    const { getByRole } = render(
      <Select options={OPTIONS} placeholder="Choose…" value="" onChange={() => {}} />
    );
    expect(getByRole("combobox").textContent).toContain("Choose…");
  });

  it("an option whose value is the empty string is selectable and reports value ''", () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Select
        label="Tier"
        options={[{ value: "", label: "Auto" }, ...OPTIONS]}
        value=""
        onChange={onChange}
      />
    );
    const trigger = getByRole("combobox", { name: "Tier" });
    // value "" shows the "Auto" option, not the placeholder
    expect(trigger.textContent).toContain("Auto");
    cleanup();
    // picking the "" option from another value reports "" (sentinel mapped back)
    const view = render(
      <Select
        label="Tier"
        options={[{ value: "", label: "Auto" }, ...OPTIONS]}
        value="b"
        onChange={onChange}
      />
    );
    openKitSelect(view.getByRole("combobox", { name: "Tier" }));
    fireEvent.click(view.getByRole("option", { name: "Auto" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("");
  });

  it("inside a form, options mode submits its own hidden input with the legacy value", () => {
    const { container, rerender } = render(
      <form>
        <Select
          name="tier"
          options={[{ value: "", label: "Auto" }, ...OPTIONS]}
          value=""
          onChange={() => {}}
        />
      </form>
    );
    const form = container.querySelector("form")!;
    expect(new FormData(form).getAll("tier")).toEqual([""]);
    rerender(
      <form>
        <Select
          name="tier"
          options={[{ value: "", label: "Auto" }, ...OPTIONS]}
          value="b"
          onChange={() => {}}
        />
      </form>
    );
    expect(new FormData(form).getAll("tier")).toEqual(["b"]);
  });

  it("merges a caller's aria-describedby with the hint/error ids (both modes)", () => {
    const { getByRole, rerender } = render(
      <Select
        id="m"
        aria-describedby="ext"
        hint="h"
        options={OPTIONS}
        value="a"
        onChange={() => {}}
      />
    );
    expect(getByRole("combobox").getAttribute("aria-describedby")).toBe("ext m-hint");
    rerender(
      <Select id="m" aria-describedby="ext" error="bad" value="x" onChange={() => {}}>
        <option value="x">X</option>
      </Select>
    );
    expect(getByRole("combobox").getAttribute("aria-describedby")).toBe("ext m-error");
  });

  it("an empty-string label renders no <label> element", () => {
    const { container } = render(
      <Select label="" options={OPTIONS} value="a" onChange={() => {}} />
    );
    expect(container.querySelector("label")).toBeNull();
  });

  it("placeholderDisabled={false} keeps the placeholder pickable as the '' value", () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Select
        label="Provider"
        options={OPTIONS}
        placeholder="All providers"
        placeholderDisabled={false}
        value="a"
        onChange={onChange}
      />
    );
    openKitSelect(getByRole("combobox", { name: "Provider" }));
    fireEvent.click(getByRole("option", { name: "All providers" }));
    expect(onChange.mock.calls.at(-1)?.[0].target.value).toBe("");
  });

  it("aria-label names an unlabelled kit select; compact maps to the kit sm size", () => {
    const { getByRole, container } = render(
      <Select aria-label="My app uses" options={OPTIONS} value="a" onChange={() => {}} compact />
    );
    expect(getByRole("combobox", { name: "My app uses" })).toBeTruthy();
    expect(container.querySelector("[data-slot=select]")?.getAttribute("data-size")).toBe("sm");
  });

  it("required marks the label without leaking the asterisk into the accessible name", () => {
    const { getByRole } = render(
      <Select label="Mode" options={OPTIONS} value="a" onChange={() => {}} required />
    );
    expect(getByRole("combobox", { name: "Mode" })).toBeTruthy();
  });
});
