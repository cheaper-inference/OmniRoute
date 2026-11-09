// @vitest-environment jsdom
import React from "react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { default: Toggle } = await import("@/shared/components/Toggle");

afterEach(() => cleanup());

describe("Toggle adapter → kit Switch", () => {
  it("renders a role=switch with label/description and reports onChange(boolean)", () => {
    const onChange = vi.fn();
    const { getByRole, getByText } = render(
      <Toggle checked={false} onChange={onChange} label="Debug" description="Verbose logs" />
    );
    const sw = getByRole("switch", { name: "Debug" });
    expect(sw.getAttribute("aria-checked") ?? String((sw as HTMLInputElement).checked)).toBe(
      "false"
    );
    expect(sw.className).toContain("ci-switch__input");
    expect(getByText("Verbose logs")).not.toBeNull();
    // the description is announced as a description, not folded into the name
    expect(sw.getAttribute("aria-describedby")).toBe(getByText("Verbose logs").id);
    fireEvent.click(sw);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("ariaLabel names an unlabelled switch; disabled blocks changes", () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Toggle checked onChange={onChange} ariaLabel="Enable" disabled />
    );
    const sw = getByRole("switch", { name: "Enable" }) as HTMLInputElement;
    expect(sw.disabled).toBe(true);
    fireEvent.click(sw);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("keeps the legacy aria-checked / aria-label contract on the switch", () => {
    const { getByRole, rerender } = render(<Toggle checked onChange={() => {}} label="Store" />);
    const sw = getByRole("switch") as HTMLInputElement;
    expect(sw.getAttribute("aria-checked")).toBe("true");
    expect(sw.checked).toBe(true);
    expect(sw.getAttribute("aria-label")).toBe("Store");
    rerender(<Toggle checked={false} onChange={() => {}} label="Store" />);
    expect(sw.getAttribute("aria-checked")).toBe("false");
    expect(sw.checked).toBe(false);
  });

  it("falls back to title for the name of an unlabelled switch and keeps the title", () => {
    const { getByRole } = render(<Toggle onChange={() => {}} title="Disable provider" />);
    const sw = getByRole("switch", { name: "Disable provider" });
    expect(sw.getAttribute("title")).toBe("Disable provider");
  });

  it("xs/sm sizes render the kit sm switch, md/lg the default; className reaches the root", () => {
    const { container, rerender } = render(
      <Toggle onChange={() => {}} ariaLabel="x" size="sm" className="ml-auto" />
    );
    const root = () => container.firstElementChild as HTMLElement;
    expect(root().getAttribute("data-size")).toBe("sm");
    expect(root().className).toContain("ci-switch--size-sm");
    expect(root().className).toContain("ml-auto");
    expect(root().className).not.toContain("ci-switch--compact");
    rerender(<Toggle onChange={() => {}} ariaLabel="x" size="xs" />);
    expect(root().getAttribute("data-size")).toBe("sm");
    rerender(<Toggle onChange={() => {}} label="Row" size="sm" />);
    expect(root().getAttribute("data-size")).toBe("sm");
    expect(root().className).toContain("ci-switch--size-sm");
    for (const size of ["md", "lg"] as const) {
      rerender(<Toggle onChange={() => {}} ariaLabel="x" size={size} />);
      expect(root().getAttribute("data-size")).toBe("default");
      expect(root().className).toContain("ci-switch--size-default");
      expect(root().className).not.toContain("ci-switch--size-sm");
      expect(root().className).not.toContain("ci-switch--compact");
    }
  });

  it("a disabled switch is dimmed by the kit, with or without a label row", () => {
    const { container, rerender } = render(<Toggle disabled onChange={() => {}} ariaLabel="x" />);
    // the bare control carries the kit's standalone-disabled hooks (data-slot + data-disabled)
    const control = container.firstElementChild as HTMLElement;
    expect(control.className).toContain("ci-switch__control");
    expect(control.getAttribute("data-slot")).toBe("switch");
    expect(control.getAttribute("data-disabled")).toBe("true");
    expect(control.className).not.toContain("opacity-50");
    rerender(<Toggle onChange={() => {}} ariaLabel="x" />);
    expect((container.firstElementChild as HTMLElement).getAttribute("data-disabled")).toBeNull();
    // a labelled row is dimmed by the kit itself (data-disabled → opacity .48)
    rerender(<Toggle disabled onChange={() => {}} label="L" />);
    const row = container.firstElementChild as HTMLElement;
    expect(row.getAttribute("data-disabled")).toBe("true");
    expect(row.className).not.toContain("opacity-50");
  });

  it("the kit stretches the transparent input over the control and dims a bare disabled switch", () => {
    const css = readFileSync(path.resolve(process.cwd(), "packages/ui-kit/src/ci-ui.css"), "utf8");
    const ruleOf = (selector: string) => {
      const at = css.indexOf(`${selector} {`);
      expect(at).toBeGreaterThan(-1);
      return css.slice(at, css.indexOf("}", at));
    };
    const input = ruleOf("  .ci-switch__input");
    expect(input).toMatch(/inset:\s*0/);
    expect(input).toMatch(/width:\s*100%/);
    expect(input).toMatch(/height:\s*100%/);
    expect(input).toMatch(/z-index:\s*1/);
    const sm = ruleOf("  .ci-switch--size-sm .ci-switch__input");
    expect(sm).toMatch(/width:\s*100%/);
    expect(sm).toMatch(/height:\s*100%/);
    expect(ruleOf('  .ci-switch__control[data-slot="switch"][data-disabled="true"]')).toMatch(
      /opacity:\s*0\.48/
    );
    // the OmniRoute workarounds are gone from globals.css
    const globals = readFileSync(path.resolve(process.cwd(), "src/app/globals.css"), "utf8");
    expect(globals).not.toContain(".ci-switch--compact");
    expect(globals).not.toContain(".ci-switch__control > .ci-switch__input");
  });
});
