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

  it("xs/sm sizes use the compact extension; className reaches the root", () => {
    const { container, rerender } = render(
      <Toggle onChange={() => {}} ariaLabel="x" size="sm" className="ml-auto" />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("ci-switch--compact");
    expect(root.className).toContain("ml-auto");
    rerender(<Toggle onChange={() => {}} ariaLabel="x" size="md" />);
    expect((container.firstElementChild as HTMLElement).className).not.toContain(
      "ci-switch--compact"
    );
  });

  it("a disabled switch without a label row is dimmed like the legacy toggle", () => {
    const { container, rerender } = render(<Toggle disabled onChange={() => {}} ariaLabel="x" />);
    expect((container.firstElementChild as HTMLElement).className).toContain("opacity-50");
    rerender(<Toggle onChange={() => {}} ariaLabel="x" />);
    expect((container.firstElementChild as HTMLElement).className).not.toContain("opacity-50");
    // a labelled row is dimmed by the kit itself (data-disabled → opacity .48)
    rerender(<Toggle disabled onChange={() => {}} label="L" />);
    const row = container.firstElementChild as HTMLElement;
    expect(row.getAttribute("data-disabled")).toBe("true");
    expect(row.className).not.toContain("opacity-50");
  });

  it("globals.css stretches the transparent input over the control (unlabelled switches stay clickable)", () => {
    const css = readFileSync(path.resolve(process.cwd(), "src/app/globals.css"), "utf8");
    const at = css.indexOf(".ci-switch__control > .ci-switch__input {");
    expect(at).toBeGreaterThan(-1);
    const rule = css.slice(at, css.indexOf("}", at));
    expect(rule).toMatch(/inset:\s*0/);
    expect(rule).toMatch(/width:\s*100%/);
    expect(rule).toMatch(/height:\s*100%/);
  });
});
