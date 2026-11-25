// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const { default: Input } = await import("@/shared/components/Input");

afterEach(() => cleanup());

describe("Input adapter → kit Field + Input", () => {
  it("renders label, hint and the kit input with aria-describedby", () => {
    const { getByLabelText, getByText } = render(
      <Input id="email" label="Email" hint="We never share it" />
    );
    const input = getByLabelText("Email") as HTMLInputElement;
    expect(input.className).toContain("ci-input");
    expect(input.getAttribute("aria-describedby")).toBe("email-hint");
    expect(getByText("We never share it").id).toBe("email-hint");
  });

  it("error wins over hint, marks aria-invalid and uses the kit error styling", () => {
    const { getByLabelText, getByRole, getByText, queryByText } = render(
      <Input id="k" label="Key" hint="h" error="Required" />
    );
    const input = getByLabelText("Key");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toBe("k-error");
    expect(input.className).toContain("ci-input--error");
    expect(getByText("Required").id).toBe("k-error");
    // legacy parity: the error message is announced (role="alert" on the legacy <p>)
    expect(getByRole("alert").textContent).toBe("Required");
    expect(queryByText("h")).toBeNull();
  });

  it("icon prop renders a leading <Icon> inside the kit shell", () => {
    const { container } = render(<Input icon="search" aria-label="Search" />);
    expect(container.querySelector(".ci-input-shell svg.oi-icon")).not.toBeNull();
  });

  it("keeps the Caps Lock warning for password fields", () => {
    const { getByLabelText, getByText } = render(
      <Input id="pw" type="password" label="Password" />
    );
    const input = getByLabelText("Password");
    fireEvent.focus(input);
    // DTL builds the event with `new KeyboardEvent(type, init)`, so the EventModifierInit
    // flag is the only thing jsdom's getModifierState("CapsLock") reads.
    fireEvent.keyDown(input, { key: "a", modifierCapsLock: true });
    expect(getByText("Caps Lock is on").id).toBe("pw-capslock");
    expect(input.getAttribute("aria-describedby")).toContain("pw-capslock");
  });

  it("required adds the kit asterisk and the native attribute", () => {
    const { getByLabelText, container } = render(<Input id="n" label="Name" required />);
    expect((getByLabelText(/Name/) as HTMLInputElement).required).toBe(true);
    expect(container.querySelector(".ci-field__required")).not.toBeNull();
  });

  it("keeps the required marker out of the accessible name (screen readers hear the label)", () => {
    const { getByRole, container } = render(<Input id="e" label="Email" type="email" required />);
    const input = getByRole("textbox", { name: "Email" }) as HTMLInputElement;
    expect(input.id).toBe("e");
    expect(input.required).toBe(true);
    const marker = container.querySelector(".ci-field__required");
    expect(marker?.textContent).toBe("*");
    expect(marker?.getAttribute("aria-hidden")).toBe("true");
  });

  it("className lands on the Field wrapper and inputClassName on the <input>, never crossed", () => {
    const { getByLabelText } = render(
      <Input id="u" label="URL" className="flex-1 md:col-span-2" inputClassName="text-xs" />
    );
    const input = getByLabelText("URL");
    const field = input.closest<HTMLElement>("[data-slot=field]")!;
    expect(field.className).toContain("ci-field");
    expect(field.className).toContain("flex-1");
    expect(field.className).toContain("md:col-span-2");
    expect(field.className).not.toContain("text-xs");
    expect(input.className).toContain("ci-input");
    expect(input.className).toContain("text-xs");
    expect(input.className).not.toContain("flex-1");
    expect(input.className).not.toContain("md:col-span-2");
  });

  it("inputClassName reaches the <input> inside the icon shell too, not the shell", () => {
    const { container } = render(<Input icon="search" className="w-64" inputClassName="text-xs" />);
    const input = container.querySelector("input")!;
    const shell = container.querySelector<HTMLElement>(".ci-input-shell")!;
    expect(input.className).toContain("text-xs");
    expect(shell.className).not.toContain("text-xs");
    expect(shell.className).not.toContain("w-64");
    expect(container.querySelector<HTMLElement>("[data-slot=field]")!.className).toContain("w-64");
  });

  it("forwards a ref to the native <input>", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input id="q" aria-label="Query" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.id).toBe("q");
  });

  it("an empty-string label renders no <label> element", () => {
    const { container } = render(<Input label="" aria-label="Q" />);
    expect(container.querySelector("label")).toBeNull();
  });

  // #18068: the adapter dropped the kit's `size` and had no trailing slot.
  it("forwards size=sm to the kit input and renders a trailing icon or suffix", () => {
    const { getByLabelText, container, rerender } = render(
      <Input aria-label="Timeout" size="sm" suffix="ms" />
    );
    const input = getByLabelText("Timeout");
    expect(input.getAttribute("data-size")).toBe("sm");
    expect(input.className).toContain("ci-input--sm");
    const shell = container.querySelector(".ci-input-shell")!;
    expect(shell.className).toContain("ci-input-shell--sm");
    const slots = shell.querySelectorAll(".ci-input-shell__icon");
    expect(slots).toHaveLength(1);
    // the trailing slot comes after the control and stays out of the accessible name
    expect(shell.lastElementChild).toBe(slots[0]);
    expect(slots[0].textContent).toBe("ms");
    expect(slots[0].getAttribute("aria-hidden")).toBe("true");
    rerender(<Input aria-label="Timeout" icon="search" trailingIcon="close" />);
    const icons = container.querySelectorAll(".ci-input-shell__icon");
    expect(icons).toHaveLength(2);
    expect(icons[1].querySelector("svg.oi-icon")).not.toBeNull();
    expect(getByLabelText("Timeout").getAttribute("data-size")).toBe("default");
  });

  // Kit `input-mono-xs-ime`: the 32px `xs` control replaces `inputClassName="h-8 text-xs"`.
  it("forwards size=xs to the kit input and to its icon shell", () => {
    const { getByLabelText, container, rerender } = render(<Input aria-label="Port" size="xs" />);
    const bare = getByLabelText("Port");
    expect(bare.getAttribute("data-size")).toBe("xs");
    expect(bare.className).toContain("ci-input--xs");
    rerender(<Input aria-label="Port" size="xs" icon="search" />);
    expect(container.querySelector(".ci-input-shell")!.className).toContain("ci-input-shell--xs");
    expect(getByLabelText("Port").className).toContain("ci-input--xs");
  });

  // `font-mono` has no effect on an <input> (ci-typography.css), so the code font is a prop.
  it("mono sets the kit code font and turns text assistance off, unless the caller asks for it", () => {
    const { getByLabelText, rerender } = render(<Input aria-label="Key" mono />);
    const input = getByLabelText("Key");
    expect(input.className).toContain("ci-input--mono");
    expect(input.getAttribute("spellcheck")).toBe("false");
    expect(input.getAttribute("autocapitalize")).toBe("none");
    expect(input.getAttribute("autocorrect")).toBe("off");
    rerender(<Input aria-label="Key" mono spellCheck />);
    expect(getByLabelText("Key").getAttribute("spellcheck")).toBe("true");
    rerender(<Input aria-label="Key" />);
    expect(getByLabelText("Key").className).not.toContain("ci-input--mono");
    expect(getByLabelText("Key").hasAttribute("spellcheck")).toBe(false);
  });

  // The rest spread would carry `mono` at run time; the prop has to be typed for callers.
  it("declares mono and the xs size in its own props", () => {
    const source = readFileSync(join(process.cwd(), "src/shared/components/Input.tsx"), "utf8");
    expect(source).toMatch(/\bmono\?: boolean;/);
    expect(source).toMatch(/\bmono=\{mono\}/);
    expect(source).toMatch(/`xs`/);
  });
});
